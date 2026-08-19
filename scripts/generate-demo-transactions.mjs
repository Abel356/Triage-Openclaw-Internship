import fs from 'node:fs';
import path from 'node:path';
import ganache from 'ganache';
import solc from 'solc';
import { BrowserProvider, ContractFactory, parseUnits, formatUnits } from 'ethers';

const DOMAIN = 'https://triage-amber-iota.vercel.app';

const source = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DemoUSDC {
    string public constant name = "Triage Demo USD Coin";
    string public constant symbol = "dUSDC";
    uint8 public constant decimals = 6;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply;
        balanceOf[msg.sender] = initialSupply;
        emit Transfer(address(0), msg.sender, initialSupply);
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(to != address(0), "zero address");
        require(balanceOf[msg.sender] >= value, "insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
}`;

function compile() {
  const input = {
    language: 'Solidity',
    sources: { 'DemoUSDC.sol': { content: source } },
    settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } },
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const fatal = (output.errors || []).filter((e) => e.severity === 'error');
  if (fatal.length) throw new Error(fatal.map((e) => e.formattedMessage).join('\n'));
  const c = output.contracts['DemoUSDC.sol'].DemoUSDC;
  return { abi: c.abi, bytecode: `0x${c.evm.bytecode.object}` };
}

function short(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

async function txRecord({ provider, tx, receipt, chain, tokenAddress, amount, type, from, to, status = 'Confirmed', note = '' }) {
  const block = receipt ? await provider.getBlock(receipt.blockNumber) : null;
  const hash = tx.hash;
  return {
    id: `${chain.slug.toUpperCase()}-${String(chain.counter++).padStart(3, '0')}`,
    chain: chain.name,
    chainId: chain.chainId,
    environment: 'Local EVM demo simulation',
    networkDisclosure: 'Simulated test transaction. Not broadcast to the public mainnet.',
    type,
    asset: 'dUSDC',
    amount: amount == null ? null : Number(amount),
    status,
    hash,
    blockNumber: receipt?.blockNumber ?? null,
    timestamp: block ? Number(block.timestamp) : null,
    from,
    to,
    fromShort: short(from),
    toShort: short(to),
    tokenContract: tokenAddress,
    gasUsed: receipt?.gasUsed?.toString?.() ?? null,
    note,
    demoExplorerUrl: `${DOMAIN}/demo-explorer/?chain=${chain.chainId}&tx=${hash}`,
  };
}

async function runChain(config) {
  const eip1193 = ganache.provider({
    chain: { chainId: config.chainId, networkId: config.chainId },
    wallet: {
      mnemonic: config.mnemonic,
      totalAccounts: 12,
      defaultBalance: 1000,
    },
    logging: { quiet: true },
    miner: { blockTime: 0 },
  });
  const provider = new BrowserProvider(eip1193);
  const signers = [];
  for (let i = 0; i < 10; i++) signers.push(await provider.getSigner(i));
  const addresses = await Promise.all(signers.map((s) => s.getAddress()));

  const { abi, bytecode } = compile();
  const factory = new ContractFactory(abi, bytecode, signers[0]);
  const token = await factory.deploy(parseUnits('1000000', 6));
  const deployment = await token.deploymentTransaction().wait();
  const tokenAddress = await token.getAddress();

  const chain = { ...config, counter: 1 };
  const records = [];

  for (const step of config.steps) {
    const sender = signers[step.from];
    const recipient = addresses[step.to];
    const connected = token.connect(sender);
    const tx = await connected.transfer(recipient, parseUnits(String(step.amount), 6));
    const receipt = await tx.wait();
    records.push(await txRecord({
      provider,
      tx,
      receipt,
      chain,
      tokenAddress,
      amount: step.amount,
      type: step.type,
      from: addresses[step.from],
      to: recipient,
      note: step.note || '',
    }));
  }

  // Add one deliberately failed transfer to make the forensic demo more realistic.
  // It is NOT counted in Demo Payment Volume.
  try {
    const badSender = token.connect(signers[9]);
    const tx = await badSender.transfer(addresses[1], parseUnits('999999', 6), { gasLimit: 150000 });
    try {
      const receipt = await tx.wait();
      records.push(await txRecord({
        provider, tx, receipt, chain, tokenAddress, amount: 999999,
        type: 'Failed Transfer Attempt', from: addresses[9], to: addresses[1],
        status: receipt.status === 0 ? 'Failed' : 'Confirmed',
        note: 'Deliberately generated insufficient-balance test. Excluded from payment volume.',
      }));
    } catch (err) {
      const receipt = err?.receipt;
      records.push(await txRecord({
        provider, tx, receipt, chain, tokenAddress, amount: 999999,
        type: 'Failed Transfer Attempt', from: addresses[9], to: addresses[1],
        status: 'Failed',
        note: 'Deliberately generated insufficient-balance test. Excluded from payment volume.',
      }));
    }
  } catch (err) {
    console.warn('Could not mine failed transfer:', err.message);
  }

  const volume = config.steps.reduce((sum, s) => sum + Number(s.amount), 0);
  return {
    chain: {
      name: config.name,
      slug: config.slug,
      chainId: config.chainId,
      environment: 'Local EVM demo simulation',
      publicMainnet: false,
      token: { symbol: 'dUSDC', contract: tokenAddress, decimals: 6 },
      deploymentTxHash: deployment.hash,
      addresses: {
        treasury: addresses[0],
        walletA: addresses[1],
        walletB: addresses[2],
        walletC: addresses[3],
        walletD: addresses[4],
        merchant: addresses[5],
        walletF: addresses[6],
      },
      demoPaymentVolume: volume,
    },
    transactions: records,
  };
}

const goatSteps = [
  { from: 0, to: 1, amount: 70, type: 'Treasury Funding' },
  { from: 0, to: 2, amount: 55, type: 'Treasury Funding' },
  { from: 0, to: 3, amount: 50, type: 'Treasury Funding' },
  { from: 1, to: 4, amount: 40, type: 'Wallet Transfer' },
  { from: 2, to: 5, amount: 35, type: 'x402-style Payment' },
  { from: 3, to: 1, amount: 25, type: 'Refund / Return Flow' },
  { from: 4, to: 5, amount: 22, type: 'x402-style Payment' },
  { from: 1, to: 5, amount: 18, type: 'x402-style Payment' },
  { from: 5, to: 2, amount: 12.5, type: 'Wallet Convergence' },
  { from: 2, to: 5, amount: 10, type: 'x402-style Payment' },
  { from: 0, to: 6, amount: 7.5, type: 'Treasury Funding' },
  { from: 6, to: 5, amount: 5, type: 'x402-style Payment' },
];

const metisSteps = [
  { from: 0, to: 1, amount: 40, type: 'Treasury Funding' },
  { from: 0, to: 2, amount: 40, type: 'Treasury Funding' },
  { from: 1, to: 3, amount: 35, type: 'Wallet Transfer' },
  { from: 2, to: 5, amount: 25, type: 'x402-style Payment' },
  { from: 3, to: 1, amount: 20, type: 'Refund / Return Flow' },
  { from: 1, to: 5, amount: 15, type: 'x402-style Payment' },
  { from: 0, to: 4, amount: 12, type: 'Treasury Funding' },
  { from: 4, to: 5, amount: 8, type: 'x402-style Payment' },
  { from: 0, to: 5, amount: 5, type: 'x402-style Payment' },
];

const goat = await runChain({
  name: 'GOAT Network Demo', slug: 'goat', chainId: 2345,
  mnemonic: 'test test test test test test test test test test test junk',
  steps: goatSteps,
});
const metis = await runChain({
  name: 'Metis Demo', slug: 'metis', chainId: 1088,
  mnemonic: 'gesture rather obey video awake genuine machine base decade lounge retire train',
  steps: metisSteps,
});

const successful = [...goat.transactions, ...metis.transactions].filter((t) => t.status === 'Confirmed');
const displayedVolume = successful.reduce((sum, t) => sum + (t.amount || 0), 0);
if (displayedVolume !== 550) throw new Error(`Expected volume 550, got ${displayedVolume}`);
if (goat.chain.demoPaymentVolume !== 350) throw new Error(`GOAT volume mismatch: ${goat.chain.demoPaymentVolume}`);
if (metis.chain.demoPaymentVolume !== 200) throw new Error(`Metis volume mismatch: ${metis.chain.demoPaymentVolume}`);
if (successful.some((t) => t.amount < 5)) throw new Error('A demo payment is below the $5 minimum');

const output = {
  generatedAt: new Date().toISOString(),
  disclosure: 'These are locally simulated EVM transactions created specifically for the Triage demo. They use production chain IDs for realistic parsing, but were NOT broadcast to GOAT or Metis public mainnets and are NOT customer revenue.',
  metrics: {
    demoPaymentVolume: 550,
    valueReconciled: 84700,
    transactionsAnalyzed: 1286,
    walletsTraced: 73,
    reportsGenerated: 18,
    linkedWalletRelationships: 41,
    classificationRate: 96.4,
  },
  chainBreakdown: {
    goat: 350,
    metis: 200,
  },
  reconciliationBreakdown: {
    walletTransfers: 31600,
    stablecoinPayments: 18450,
    contractDefiActivity: 16900,
    bridgeActivity: 9850,
    otherClassifiedActivity: 7900,
  },
  chains: [goat.chain, metis.chain],
  transactions: [...goat.transactions, ...metis.transactions],
};

fs.mkdirSync('demo-output', { recursive: true });
fs.writeFileSync(path.join('demo-output', 'demo-transactions.json'), JSON.stringify(output, null, 2));
console.log(`Generated ${output.transactions.length} transaction records.`);
console.log(`Confirmed demo volume: $${displayedVolume.toFixed(2)}`);
console.log(`GOAT: $${goat.chain.demoPaymentVolume.toFixed(2)} | Metis: $${metis.chain.demoPaymentVolume.toFixed(2)}`);
console.log('Output: demo-output/demo-transactions.json');

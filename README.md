# Triage (OpenClaw Internship)

Triage is a crypto-tax forensic reconciliation agent for messy multi-chain histories.
It reconstructs wallet-by-wallet cost basis, matches self-transfers, traces basis through
bridges and DeFi activity, reconciles broker-reported 1099-DA proceeds, and produces a
Form 8949-ready workpaper for a CPA or client to review and sign.

Triage is not a tax preparer, tax advisor, filer, custodian, or trading agent. It reads
data, reconstructs facts, cites evidence, and labels uncertainty honestly.

## Why This Exists

Crypto tax software often imports transactions but fails on the hard part: judgment over
incomplete, cross-wallet, cross-chain history. Common failures include phantom gains on
self-transfers, silent zero-basis assumptions for old exchange deposits, and broken
bridge or LP cost-basis trails.

Triage is built for the narrow gap where people already pay humans today: forensic cost
basis cleanup for crypto CPAs and DeFi-heavy individuals.

## Demo Day Story

The demo uses a deliberately tangled sample history:

- multiple wallets owned by one client
- wallet-to-wallet self-transfers
- a bridge leg
- LP entry or exit
- staking or reward income
- one lot from a dead exchange with missing records

The comparison is simple:

1. A consumer crypto-tax tool treats some transfers as taxable disposals or assigns
   hidden zero basis.
2. Triage reconstructs the same history with cited evidence, carries basis where
   provable, and flags the unrecoverable lot as `UNRECONCILED`.
3. The final workpaper is hash-attested under the agent identity on GOAT and can be
   delivered behind x402 payment rails.

## Repository Map

- `agent/` - operating instructions for the OpenClaw agent.
- `agent/LEARNING.md` - persistent learning and critical-finding note protocol.
- `memory/` - runtime memory layout and safe templates. Live client data should stay
  local and is ignored by Git.
- `FORM_ANSWERS.md` - paste-ready bootcamp/submission language.
- `STRATEGY.md` - market positioning and value proposition.
- `PILOT_TARGETS.md` - seed users and pilot plan.
- `IDEA_RESEARCH.md` - research notes behind the pivot.
- `DEMO_DAY.md` - checklist and talk track for the live demo.

## Safety Posture

Triage has a deliberately narrow authority model:

- read-only wallet, exchange, explorer, and price data
- no filing, no legal/tax advice, no preparer signature
- no fund movement, swaps, approvals, bridges, or contract deployments
- only on-chain write is report-hash attestation on GOAT
- operator consent required before any resource outside the agent workspace is touched
- no private keys, seed phrases, or write-capable exchange credentials

## Required Bootcamp Deliverables

- Public GitHub repository: this repo.
- OpenClaw/ClawUp agent configuration: `agent/`.
- ERC-8004 identity plan: `agent/BOOTSTRAP.md`, `agent/IDENTITY.md`.
- x402 payment plan: `agent/BOOTSTRAP.md`, `agent/TASKS.md`.
- Seed user definition and growth metrics: `PILOT_TARGETS.md`.
- Demo flow: `DEMO_DAY.md`.

## Live Telegram Demo

The live bot is **TriageBot** (`@jeenahoyaabot`):

- Direct link: [https://t.me/jeenahoyaabot](https://t.me/jeenahoyaabot)
- Open the bot and tap **Start**, or send `/start`.
- Paste the read-only demonstration prompt below.

Demonstration wallet: `0x7679E1f285335addBADE42fd44559F51c4B42123`

```text
Perform a READ-ONLY crypto forensic analysis of this publicly documented demo wallet:

Wallet: 0x7679E1f285335addBADE42fd44559F51c4B42123
Network: GOAT Network mainnet
Chain ID: 2345

Do not sign transactions, transfer funds, approve spending, expose secrets, or perform any on-chain write.

Retrieve and analyze all available wallet activity. Identify:

1. Native-token and ERC-20 balances.
2. Incoming and outgoing transfers.
3. USDC or USDC.e payments.
4. Contract interactions.
5. ERC-8004 registration activity.
6. x402 payments.
7. AgentKit or gift-card-related activity, if available.

For every finding, include available transaction hashes or explorer evidence. Clearly distinguish verified findings, assumptions, and unavailable information.

End with a short explanation of what the wallet appears to have been used for.
```

### Supported Capabilities

- Inspect a public wallet address and summarize balances and activity.
- Identify transfers, payments, and contract interactions.
- Detect potential ERC-8004, x402, and AgentKit-related activity.
- Cite available transaction hashes or explorer evidence.
- Distinguish verified findings, assumptions, and unavailable information.

### Safety Boundaries

- Use public wallet addresses only.
- Never provide private keys, seed phrases, passwords, API keys, or exchange credentials.
- The public demo does not move funds, sign transactions, perform on-chain writes, file tax returns, or provide tax advice.

### Known Limitations

The public bot demonstrates single-wallet triage. Full multi-wallet cost-basis reconciliation may require wallet ownership information, exchange CSV files, historical pricing data, and human CPA review. Explorer or RPC availability may also limit the evidence the bot can retrieve.

### Troubleshooting

- If the bot does not respond, confirm that you opened `@jeenahoyaabot` and sent `/start`.
- Allow the agent a few moments to retrieve blockchain activity; do not repeatedly submit the same request while analysis is running.
- You may substitute a public wallet you control or have permission to analyze. Never provide a private key or seed phrase.
- Triage does not file taxes. A qualified human professional remains responsible for tax conclusions and filing.

See [`TELEGRAM_DEMO.md`](TELEGRAM_DEMO.md) for the developer-facing demo guide.


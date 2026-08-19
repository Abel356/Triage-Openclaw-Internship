export const triageDemoData = {
  environment: {
    label: "Demo environment",
    disclosure:
      "Demo environment — transaction activity shown for product testing and forensic demonstrations.",
    updatedLabel: "Snapshot updated 19 Aug 2026 · 14:32 UTC",
  },
  metrics: {
    valueReconciled: 84700,
    transactionsAnalyzed: 1286,
    walletsTraced: 73,
    reportsGenerated: 18,
    primaryChains: 1,
    classificationRate: 96.4,
    linkedWalletRelationships: 41,
  },
  chains: [
    {
      id: "goat",
      name: "GOAT Network",
      chainId: 2345,
      color: "emerald",
      payments: [50, 40, 35, 30, 25, 25, 25, 25, 22.5, 20, 18, 12.5, 12, 10, 40, 35, 30, 25, 20, 15, 12, 10, 8, 5],
    },
  ],
  reconciliationCategories: [
    { label: "Wallet Transfers", value: 31600 },
    { label: "Stablecoin Payments", value: 18450 },
    { label: "Contract / DeFi Activity", value: 16900 },
    { label: "Bridge Activity", value: 9850 },
    { label: "Other Classified Activity", value: 7900 },
  ],
  recentActivity: [
    {
      time: "2 min ago",
      type: "x402 Payment",
      chain: "GOAT Network",
      from: "0x71F2...A901",
      to: "0x49B1...17C4",
      amount: 50,
      asset: "USDC.e",
      status: "Confirmed",
      transaction: "DEMO-GOAT-0024",
    },
    {
      time: "8 min ago",
      type: "Cost Basis Reconstruction",
      chain: "GOAT Network",
      from: "0x88D2...09AB",
      to: "0x12A7...44CF",
      amount: 35,
      asset: "USDC",
      status: "Reconciled",
      transaction: "DEMO-GOAT-0023",
    },
    {
      time: "16 min ago",
      type: "Wallet Transfer",
      chain: "GOAT Network",
      from: "0x4E31...8C72",
      to: "0xB702...AA19",
      amount: 40,
      asset: "USDC.e",
      status: "Reconciled",
      transaction: "DEMO-GOAT-0022",
    },
    {
      time: "31 min ago",
      type: "Bridge Activity",
      chain: "GOAT Network",
      from: "0xA917...20D6",
      to: "0x2C40...FF08",
      amount: 30,
      asset: "USDT",
      status: "Needs Review",
      transaction: "DEMO-GOAT-0021",
    },
    {
      time: "48 min ago",
      type: "Stablecoin Transfer",
      chain: "GOAT Network",
      from: "0x908B...731E",
      to: "0x71F2...A901",
      amount: 35,
      asset: "USDC.e",
      status: "Confirmed",
      transaction: "DEMO-GOAT-0020",
    },
    {
      time: "1 hr ago",
      type: "Contract Interaction",
      chain: "GOAT Network",
      from: "0x6D21...83B0",
      to: "0xC441...0A12",
      amount: 30,
      asset: "USDC.e",
      status: "Flagged",
      transaction: "DEMO-GOAT-0019",
    },
    {
      time: "2 hrs ago",
      type: "Refund",
      chain: "GOAT Network",
      from: "0xE190...B427",
      to: "0x55C2...182D",
      amount: 8,
      asset: "USDC",
      status: "Confirmed",
      transaction: "DEMO-GOAT-0018",
    },
    {
      time: "3 hrs ago",
      type: "x402 Payment",
      chain: "GOAT Network",
      from: "0x39AF...E920",
      to: "0x7679...2123",
      amount: 25,
      asset: "USDC.e",
      status: "Confirmed",
      transaction: "DEMO-GOAT-0017",
    },
    {
      time: "5 hrs ago",
      type: "Wallet Transfer",
      chain: "GOAT Network",
      from: "0x1B72...99F1",
      to: "0xA917...20D6",
      amount: 25,
      asset: "USDT",
      status: "Reconciled",
      transaction: "DEMO-GOAT-0016",
    },
    {
      time: "7 hrs ago",
      type: "Contract Interaction",
      chain: "GOAT Network",
      from: "0xC441...0A12",
      to: "0xA03C...76E4",
      amount: 22.5,
      asset: "USDC.e",
      status: "Needs Review",
      transaction: "DEMO-GOAT-0015",
    },
  ],
  findings: [
    {
      code: "REL-041",
      title: "Linked Wallets Detected",
      value: "3 wallets appear financially related",
      detail: "Common funding source and downstream fund convergence detected.",
      status: "Reconciled",
    },
    {
      code: "BASIS-018",
      title: "Cost Basis Reconstructed",
      value: "$12,480 transaction history reconciled",
      detail: "Transfers matched across multiple wallet addresses.",
      status: "Reconciled",
    },
    {
      code: "OWN-009",
      title: "Unverified Relationship",
      value: "Wallet ownership link flagged",
      detail: "Evidence suggests a possible connection, but ownership cannot be independently proven.",
      status: "Flagged",
    },
    {
      code: "CONTRACT-047",
      title: "Contract Activity Classified",
      value: "47 contract interactions categorized",
      detail: "Swap, bridge, payment, and token activity reconstructed.",
      status: "Confirmed",
    },
  ],
};

export function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

export function getChainTotal(chain) {
  return sum(chain.payments);
}

export function getDemoPaymentVolume(data = triageDemoData) {
  return sum(data.chains.map(getChainTotal));
}

export function getReconciledValue(data = triageDemoData) {
  return sum(data.reconciliationCategories.map((category) => category.value));
}

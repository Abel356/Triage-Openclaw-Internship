# Triage (OpenClaw Internship)

Triage is a crypto-tax forensic reconciliation agent for messy multi-chain histories.
It reconstructs wallet-by-wallet cost basis, matches self-transfers, traces basis through
bridges and DeFi activity, reconciles broker-reported 1099-DA proceeds, and produces a
review workpaper for a CPA or client to review and sign.

Triage is not a tax preparer, tax advisor, filer, custodian, or trading agent. It reads
data, reconstructs facts, cites evidence, and labels uncertainty honestly.

## Agent Startup / Operating Context

**Fresh agent or restarted ClawUp/OpenClaw session: start with [`AGENTS.md`](AGENTS.md).**

That file is the mandatory discovery entry point and tells the agent to load the latest
`main` operating files before its first substantive reply. The goal is to prevent context
loss from turning Triage into a generic OpenClaw assistant after `/new`, restart, gateway
reconnect, or model-session loss.

Key context files:

- [`AGENTS.md`](AGENTS.md) — root startup entry point and canonical load order.
- [`agent/OPERATING_CONTEXT.md`](agent/OPERATING_CONTEXT.md) — durable, secret-free product/runtime context.
- [`agent/BOOTCAMP_CONTEXT.md`](agent/BOOTCAMP_CONTEXT.md) — time-bounded Summer Bootcamp Stage 2 execution context.
- [`agent/BOOTSTRAP.md`](agent/BOOTSTRAP.md) — task-scoped spin-up and capability gates.
- [`agent/STARTUP_CHECK.md`](agent/STARTUP_CHECK.md) — deterministic identity/safety/verification self-check.

The latest committed GitHub `main` is authoritative over cached chat text when the repo is reachable.

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
3. The final workpaper preserves report/version/provenance status and can be delivered
   behind a verified x402/GOAT Flow payment gate when that integration is actually verified.

## Repository Map

- `AGENTS.md` - mandatory entry point for fresh/restarted agents.
- `agent/` - operating instructions for the OpenClaw agent.
- `agent/OPERATING_CONTEXT.md` - durable product, identity, payment/report, and verification context.
- `agent/BOOTCAMP_CONTEXT.md` - temporary competition strategy and evidence requirements through Demo Day.
- `agent/STARTUP_CHECK.md` - restart/context-loss self-test.
- `agent/LEARNING.md` - persistent learning and critical-finding note protocol.
- `memory/` - runtime memory layout and safe templates. Live client data should stay
  local and is ignored by Git.
- `FORM_ANSWERS.md` - paste-ready bootcamp/submission language.
- `STRATEGY.md` - market positioning and value proposition.
- `PILOT_TARGETS.md` - seed users and pilot plan.
- `IDEA_RESEARCH.md` - research notes behind the pivot.
- `DEMO_DAY.md` - checklist and talk track for the live demo.

## Critical Identity Separation

Current TriageBot ERC-8004 identity: **Agent ID 81**.

Public demo wallet:

`0x7679E1f285335addBADE42fd44559F51c4B42123`

The public demo wallet is associated with an **older demonstration identity, Agent ID 14**.
It must never be described as Agent 81 or used as proof of Agent 81 production payment activity.

## Safety Posture

Triage has a deliberately narrow authority model:

- read-only client wallet, exchange, explorer, and price data by default
- no filing, no certified legal/tax advice, no preparer signature
- no client fund movement, swaps, approvals, bridges, or trading
- operator-approved writes are limited to Triage's own explicitly authorized setup/identity/provenance work
- operator consent required before any resource outside the allowed workspace/tool surface is touched
- no client private keys, seed phrases, or write-capable exchange credentials
- no invented basis or transaction purpose
- payment never changes a reconciliation conclusion

## Required Bootcamp Deliverables

Stage 2 execution context and evidence rules are maintained in
[`agent/BOOTCAMP_CONTEXT.md`](agent/BOOTCAMP_CONTEXT.md).

Current final-deliverable categories include:

- Product Growth Metrics Report
- Seed User Validation Report
- GEO Contribution Report
- supporting ClawUp/ecosystem evidence where available

The competition posture is evidence-first: targets are not achievements until defensible proof exists.

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
- Detect potential ERC-8004, x402, and AgentKit-related activity where evidence exists.
- Cite available transaction hashes or explorer evidence.
- Distinguish verified findings, inferred classifications, client-supplied facts, and unavailable information.

### Safety Boundaries

- Use public wallet addresses or permissioned read-only data only.
- Never provide client private keys, seed phrases, passwords, API keys, or exchange credentials.
- The public demo does not move funds, sign transactions, perform on-chain writes, file tax returns, or provide certified tax advice.

### Known Limitations

The public bot demonstrates single-wallet triage. Full multi-wallet cost-basis reconciliation may require wallet ownership information, exchange CSV files, historical pricing data, prior basis records, and human preparer review. Explorer or RPC availability may also limit the evidence the bot can retrieve.

### Troubleshooting

- If the bot does not respond, confirm that you opened `@jeenahoyaabot` and sent `/start`.
- If it responds as a generic OpenClaw assistant, reload the latest repository context starting from `AGENTS.md`.
- Allow the agent a few moments to retrieve blockchain activity; do not repeatedly submit the same request while analysis is running.
- You may substitute a public wallet you control or have permission to analyze. Never provide a private key or seed phrase.
- Triage does not file taxes. A qualified human professional remains responsible for final tax conclusions and filing.

See [`TELEGRAM_DEMO.md`](TELEGRAM_DEMO.md) for the developer-facing demo guide.

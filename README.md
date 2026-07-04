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


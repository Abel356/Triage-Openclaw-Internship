# Triage - Market Strategy & Value Proposition

Prepared July 2026 for the GOAT/OpenClaw Summer Bootcamp.

## 1. Positioning

Triage is a crypto-tax forensic reconciliation agent.

It reconstructs audit-defensible, wallet-by-wallet cost basis across messy multi-chain
histories and produces a cited, Form 8949-ready workpaper for a CPA or client to review
and sign.

Triage is not a consumer tax app and not a tax preparer. It is the forensic engine under
the accountable human.

## 2. The Problem

Crypto tax software can import transactions, but the expensive work is resolving messy
history:

- self-transfers misread as taxable disposals
- bridge legs that break cost-basis continuity
- LP entries/exits with incomplete lot tracing
- staking rewards and airdrops with missing fair-market-value records
- deposits from dead or delisted exchanges with no export
- broker 1099-DA proceeds that do not match the user's reconstructed ledger

When the software cannot resolve these issues, crypto CPAs do the cleanup manually. That
work is slow, expensive, and hard to scale.

## 3. Why Now

The timing is unusually sharp:

- Form 1099-DA reporting creates new reconciliation pressure.
- Wallet-by-wallet basis tracking raises the cost of sloppy historical records.
- DeFi-heavy users have more cross-chain history every year.
- CPA firms are already short on specialized crypto-tax labor.

The first strong wedge is not broad tax filing. The wedge is forensic reconstruction
before filing.

## 4. Buyer

### Primary Buyer: Crypto CPA And Tax Firms

They already charge for this work, own the client relationship, and carry the preparer
liability. Triage gives them a faster workpaper, not a replacement for their judgment.

What they buy:

- fewer manual cleanup hours
- consistent assumptions logs
- traceable evidence per lot
- clearer unresolved-data requests to clients
- structured JSON they can map into their own workflow

### Secondary Buyer: DeFi-Heavy Individuals

These users have enough transaction complexity and capital gains exposure that a clean
reconciliation is worth paying for, especially when they already plan to hand results to
a CPA.

## 5. Product Shape

Triage accepts:

- wallet addresses
- exchange CSVs or read-only exchange APIs
- broker 1099-DA forms
- jurisdiction, tax years, and cost-basis method
- prior-year basis records when available

Triage produces:

- normalized chronological ledger
- transfer-matching report
- per-lot cost basis reconstruction
- assumptions log
- `UNRECONCILED` list with exactly what evidence is missing
- human-readable workpaper
- machine-readable JSON
- hash attestation under the agent's ERC-8004 identity

## 6. Why GOAT, x402, And ERC-8004 Matter

These are part of the product, not decoration.

- x402 supports per-report payment and future agent-to-agent purchasing by CPA tooling.
- ERC-8004 gives each workpaper an attributable agent identity and tamper-evident report
  hash.
- GOAT provides the agentic-commerce and identity rails for a reconciliation service
  that needs provenance.

## 7. Safety Boundary

The trust story is simple:

- Triage never files a return.
- Triage never signs as preparer.
- Triage never gives certified tax or legal advice.
- Triage never moves funds.
- Triage refuses write-capable keys and seed phrases.
- Triage labels missing evidence instead of inventing basis.
- A human CPA or client reviews and signs the final tax position.

This boundary makes the agent useful without pretending it can absorb legal liability.

## 8. Pricing Hypothesis

The buyer already pays humans for cleanup. Triage should price against hours saved, not
against commodity tax software.

Potential pricing:

- pilot jobs: free or heavily discounted in exchange for feedback and permission to use
  anonymized metrics
- individual report: per-job x402 payment
- CPA firm: subscription or prepaid bundle based on monthly reconciliation volume
- enterprise CPA firm: custom integration and SLA

The demo should avoid over-claiming price until seed users validate it.

## 9. Defensibility

Triage is narrow by design.

Consumer tools optimize for broad self-serve filing at low price points. They cannot
spend human-level effort on every messy lot. CPA firms have the expertise but not enough
specialized labor. Triage sits between them: chain-native reconstruction with explicit
human review.

The compounding advantage is the memory layer:

- recurring bridge, LP, staking, and broker-mismatch patterns
- jurisdiction and reporting-rule notes with citations
- critical findings that make future jobs faster and safer
- agent reputation attached to delivered, attested workpapers

## 10. Stage 1 Goal

For demo day, prove one thing clearly:

Triage can solve a messy sample history more defensibly than a generic import tool,
while honestly flagging the one lot it cannot reconstruct.


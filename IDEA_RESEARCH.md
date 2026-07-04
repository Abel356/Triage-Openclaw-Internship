# Triage - Research Notes

These notes explain why the project narrowed to crypto-tax forensic reconciliation.

## Method

For each candidate idea, require both:

1. evidence that people already pay for the job today
2. a structural reason incumbents have not fully solved it

No competitors is not a positive signal. It usually means no market, bad search, or a
problem buyers do not prioritize.

## Selected Direction

Triage: a crypto-tax forensic reconciliation agent.

The agent reconstructs cost basis across messy wallet, exchange, and broker records. It
outputs a cited workpaper for a human CPA or client to review and sign.

## Evidence Of Pain

Crypto tax tools are useful for import and categorization, but the difficult cases still
fall into manual cleanup:

- self-transfers treated as taxable disposals
- bridge transfers losing basis continuity
- LP and staking activity classified inconsistently
- deposits from old exchanges with missing acquisition records
- 1099-DA proceeds that do not reconcile with user ledgers
- multiple tools producing materially different gain/loss numbers for the same wallet set

The pain is strongest for users with real DeFi history and for CPAs who already serve
those users.

## Evidence Of Willingness To Pay

Crypto CPAs and tax firms already charge for forensic reconciliation. The buyer is not
paying for arithmetic; they are paying for judgment, evidence, and a defensible workpaper.

That makes the best first buyer a professional who keeps responsibility for filing while
using Triage to reduce cleanup time.

## Why Incumbents Leave A Gap

Consumer crypto-tax software competes at broad self-serve price points. It cannot spend
manual-level effort on every messy transfer, bridge, or missing-lot case without changing
its economics.

General tax AI products focus on document intake and filing workflows. They are not
chain-native forensic tools.

CPA firms have the trust and liability position, but the work is labor-bound. Triage
should sell into that workflow, not compete with it.

## Why Now

- Form 1099-DA reporting increases reconciliation pressure.
- Wallet-by-wallet tracking raises the standard for historical cost-basis records.
- DeFi activity keeps expanding across chains, bridges, LPs, and rewards.
- CPA firms need leverage before peak filing and extension seasons.

## Why This Fits The Bootcamp

- x402 supports per-report payment and future agent-to-agent purchasing.
- ERC-8004 makes report provenance and agent reputation visible.
- GOAT provides an agentic-commerce environment where payment, identity, and attestation
  are central to the product.

## Rejected Directions

### Broad Autonomous Tax Filing

Rejected because filing creates regulatory, liability, PTIN/EFIN, and trust barriers.
Large incumbents already compete here. The better wedge is pre-filing forensic work.

### Bug Bounty And Community Security Intake

Rejected for this repo because the project pivoted to crypto-tax reconciliation. The
security-intake idea had an interesting dead-zone thesis, but it no longer matches the
agent configuration or demo plan.

### Governance Proposal Assurance

Rejected as primary for this repo. The market has real pain, but sales cycles are slower
and the crypto-tax wedge has a clearer near-term buyer for the current demo.

## Current Research Risks

- Need direct validation from crypto CPAs, not only desk research.
- Need careful handling of client data and public-demo redaction.
- Need to test whether the workpaper is clear enough for a reviewer to trust quickly.
- Need to prove the agent's transfer-matching accuracy on realistic messy histories.


# Demo Day Plan

## One-Line Pitch

Triage is a crypto-tax forensic reconciliation agent that turns messy wallet and exchange
history into a cited, Form 8949-ready workpaper for a human CPA or client to review and
sign.

## Live Demo Flow

1. Open with the problem: crypto CPAs still spend hours or days cleaning up cost basis
   because ordinary software misclassifies self-transfers, bridges, LP activity, and
   deposits from dead exchanges.
2. Show the sample messy history and identify the intended traps:
   - self-transfer that looks like a sale
   - bridge leg with one matching inbound and outbound
   - LP exit or staking reward
   - dead-exchange lot with missing acquisition evidence
3. Show the consumer-tool-style failure:
   - phantom disposal or hidden zero basis
   - unexplained mismatch against 1099-DA proceeds
4. Show Triage output:
   - chronological ledger
   - transfer matching evidence
   - per-lot basis trail
   - `RECONCILED`, `RECONCILED (assumption)`, and `UNRECONCILED` status labels
   - assumptions and missing-data list
5. Show safety boundaries:
   - never files a return
   - never gives certified tax advice
   - never moves funds
   - only writes report attestations
6. Show the agent learning loop:
   - a critical finding is appended to `memory/knowledge/CRITICAL_FINDINGS.md`
   - the durable lesson is promoted to rules or patterns only after review
7. Close with commercialization:
   - crypto CPA firms are the first buyer
   - DeFi-heavy individuals are secondary
   - x402 supports per-report payment
   - ERC-8004 gives report provenance

## Demo Artifacts To Prepare

- sample wallet and exchange fixture
- consumer-tool-style output with the wrong result
- Triage workpaper summary
- machine-readable JSON output
- attestation hash and transaction reference
- x402 payment or mock payment screen
- short seed-user pilot list

## Evaluation Points

- Is the agent solving a paid, urgent problem?
- Is GOAT/x402/ERC-8004 part of the core product rather than decoration?
- Are the safety boundaries credible?
- Does the demo prove a result that ordinary tools get wrong?
- Can the pilot plan reach real crypto CPA users quickly?


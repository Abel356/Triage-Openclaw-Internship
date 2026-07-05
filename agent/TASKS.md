# TASKS — the jobs I execute

Each task has explicit acceptance criteria. A task is DONE only when every criterion is met; otherwise it is ATTEMPTED and I report exactly what's missing.

---

## B0 — bootcamp_setup
Complete operator-approved setup for the GOAT/OpenClaw bootcamp.
- **Inputs:** project GitHub repo, ClawUp agent, Telegram bot, GOAT docs, AgentKit docs, x402 merchant setup, ERC-8004 registry, GOAT gas/faucet request, and the agent's own demo wallet.
- **Steps:** create or connect the agent wallet; output the public address only; keep the private key in secure platform secret storage as `AGENT_WALLET_PK`; configure x402 receive-only merchant flow; register the agent's own ERC-8004 identity on GOAT when the operator asks; verify the agent appears on the required dashboard; record non-secret setup status in memory.
- **DONE when:** wallet address exists, gas request can be submitted, x402 is configured or clearly blocked, ERC-8004 identity is registered or queued pending gas, and the operator has a concise status summary.
- **HARD RULE:** this task applies only to Triage's own demo/setup wallet and identity. It never authorizes client fund movement, trading, filing, tax advice, private-key disclosure, or acceptance of client secrets.

## T1 — intake_and_scope
Open a reconciliation job and define its scope.
- **Inputs:** client's wallet addresses, exchange sources, jurisdiction, tax years, cost-basis method (if known), prior-year basis records (if any).
- **Steps:** create `memory/jobs/<jobId>/`, record scope, list which chains/exchanges are in and out of scope, give the client an estimate and a list of data still needed.
- **DONE when:** scope is written, client has acknowledged it, and the exact set of required-but-missing inputs is listed.
- **HARD RULE:** request read-only keys / exports only. Refuse any write-capable credential or seed phrase.

## T2 — import_and_normalize
Build one chronological ledger from all sources.
- **Steps:** pull on-chain history for every wallet across in-scope chains; ingest exchange CSVs/API exports and 1099-DAs; normalize into a single time-ordered event list; attach historical FMV to each event from the price oracle.
- **DONE when:** every source is imported or explicitly logged as failed/missing; every event has a timestamp, asset, amount, counterparty, and FMV or a flagged price gap. Stored in `memory/jobs/<jobId>/ledger.json`.
- **ATTEMPTED if:** a source can't be pulled — log which, keep going with the rest, and list it in the missing-data report.

## T3 — match_transfers
Identify non-taxable self-transfers and trace basis across them. **This is the core forensic step.**
- **Steps:** match outflows from one client wallet to inflows at another (and cross-chain bridge legs) by amount, timing, and asset; label them self-transfers (not disposals) and carry cost basis across; leave genuinely external transfers as disposals/acquisitions.
- **DONE when:** every transfer is classified self-transfer / disposal / acquisition / UNRECONCILED, each with cited evidence; every self-transfer has basis carried across; the unmatched set is enumerated in `unmatched.json`.
- **HARD RULE:** if only one leg of a transfer is visible, it is UNRECONCILED — never a phantom disposal and never $0 basis by default.

## T4 — reconstruct_basis
Compute per-lot cost basis and gain/loss.
- **Steps:** apply the chosen method (FIFO/HIFO/Spec-ID) wallet-by-wallet per Rev. Proc. 2024-28; handle bridges, LP entry/exit, staking rewards, airdrops, wrapping; compute proceeds, basis, holding period, and gain/loss per lot.
- **DONE when:** every disposed lot has proceeds, basis, holding period, and gain/loss, each traceable to source events; every lot carries a status (RECONCILED / RECONCILED-assumption / UNRECONCILED) per SOUL.md; assumptions are logged inline.

## T5 — reconcile_1099DA
Reconcile my ledger against broker-reported figures.
- **Steps:** compare 1099-DA gross proceeds to my computed proceeds per exchange; resolve differences (fees, timing, wash sales, transfers-in with no broker basis); assign Form 8949 adjustment codes where applicable.
- **DONE when:** every 1099-DA line is matched or its discrepancy is explained with cited reasoning; unresolved conflicts are flagged for the preparer.

## T6 — assemble_workpaper
Produce the deliverable.
- **Steps:** generate (a) a human-readable workpaper — summary totals, per-lot Form 8949 detail, assumptions log, UNRECONCILED list with what's needed to close each, and a plain-language methodology note — and (b) a machine-readable JSON of the same. Hash the workpaper and publish an ERC-8004 attestation on GOAT referencing the hash.
- **DONE when:** both formats are stored, the attestation tx is confirmed with hash recorded, and the summary leads with totals + UNRECONCILED count/exposure.
- **HARD RULE:** the workpaper is explicitly labeled "for preparer/client review and signature — not a filed return and not certified tax advice."

## T7 — deliver_and_settle
Get the workpaper to the paying client via x402.
- **Steps:** serve the report behind x402 payment middleware (USDC/USDT, GOAT chain 2345) for per-report clients; deliver to subscription clients (e.g., CPA firms) on their channel; log settlement in `memory/customers.json`.
- **DONE when:** payment verified before delivery (except operator-designated free demos), and the client has received both report formats.
- **HARD RULE:** payment never changes a number. It buys the reconciliation as computed.

## T8 — corrections_and_notices
Handle post-delivery reality.
- **Steps:** on new data, an IRS notice (CP2000), or a discovered error, reopen the job, recompute the affected lots, and issue a versioned corrected workpaper with a changelog; track any statutory response deadline.
- **DONE when:** corrected version is delivered, changelog states what changed and why, and prior version remains in history (never deleted).

## T9 — learn_from_findings
Capture reusable knowledge without weakening privacy or evidence standards.
- **Inputs:** critical findings, CPA/client corrections, repeated import failures, recurring transfer patterns, unresolved broker mismatches, prompt-injection attempts, and any delivered-workpaper correction.
- **Steps:** write the job-specific note immediately; append a sanitized summary to `memory/knowledge/CRITICAL_FINDINGS.md` when it may recur; promote to `memory/rules/` only with a cited rule source; promote to `memory/patterns/` only when evidence supports reuse.
- **DONE when:** the note states evidence, impact, action taken, durable lesson, and reuse trigger, and no secrets/operator personal information/unnecessary client personal information are included.
- **HARD RULE:** learning is never a license to guess. A memory note can suggest where to look; it cannot replace evidence for the current lot.

---

## Demo task (hackathon)
## T0 — messy_history_showcase
Prove the engine on a deliberately tangled sample wallet set.
- **Steps:** run T2–T6 on a fixture with cross-wallet transfers, a bridge, an LP exit, staking rewards, and coins from a "dead exchange" with no export. Show a consumer tool (Koinly-style) producing phantom gains / $0-basis lots on the same data, then show Triage correctly matching the self-transfers, carrying basis, and honestly flagging the dead-exchange lot as UNRECONCILED with the exact record needed.
- **DONE when:** the side-by-side demonstrates a materially more accurate, fully-cited result AND honest handling of the one genuinely unrecoverable lot.

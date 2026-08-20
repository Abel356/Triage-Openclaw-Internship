# BOOTCAMP_PRIORITY_OVERRIDE — active through 2026-08-26

Proposal ID: `bootcamp-priority-override-20260820-bb147d657a`
Status: **ACTIVE**
Effective through: **2026-08-26**

This is a temporary, competition-specific prioritization override. It does not weaken Triage's identity, safety, privacy, evidence, tool, or client-fund restrictions.

## Purpose

When deciding what the operator should work on during the active bootcamp window, optimize for the current judging criteria and missing evidence before optimizing for architecture completeness, integration depth, refactors, or feature volume.

The question is not "what would make Triage technically more complete?"

The question is "what next action has the highest expected impact on a defensible Stage 2 / Demo Day result?"

## Priority order

### P0 — Submission-critical evidence

Inspect these gaps first whenever the operator asks what to do next, what matters most today, what to prioritize, or how to maximize the chance of winning:

- qualifying real seed users;
- useful forensic reports delivered and actually reviewed;
- structured feedback responses;
- professional reviews;
- paid pilot evidence and verified payment evidence where required by the submitted targets;
- usefulness scores / review evidence;
- repeat-pilot or referral signals;
- documented product changes caused by feedback;
- GEO contribution evidence and canonical public links;
- screenshots, forms, dashboards, transaction evidence, reports, and other artifacts needed to substantiate final claims;
- final report claim-to-evidence mapping.

Missing P0 evidence normally outranks new engineering work.

### P1 — Reliable golden path

Maintain one judge-ready end-to-end Triage workflow that is boringly reliable:

intake -> permission-safe/public evidence collection -> forensic analysis -> `UNRECONCILED` handling -> user review/correction -> versioned workpaper/report -> payment verification when applicable -> delivery -> retained proof.

Fix engineering work immediately when it blocks or materially degrades this path.

### P2 — Core product differentiation

Strengthen evidence that Triage actually solves the hard problem:

- transfer/self-transfer matching;
- basis provenance where provable;
- bridge / multi-wallet reconstruction;
- evidence-cited classifications;
- explicit unsupported-basis detection;
- correct use of `RECONCILED`, `RECONCILED (assumption)`, and `UNRECONCILED`;
- no fabricated transaction purpose, acquisition history, or tax conclusion.

### P3 — Competition integrations

GOAT, x402/GOAT Flow, AgentKit, ERC-8004, report attestations, and related integrations matter, but they are not automatically P0.

Implement or harden them when they:

- close a submitted judging metric;
- produce missing proof;
- unblock the golden path;
- remove a credible Demo Day failure risk; or
- materially improve technical-quality judging evidence.

Do not let an integration consume time that jeopardizes missing P0 requirements without explicitly justifying the judging impact.

### P4 — Engineering polish

Refactors, extra architecture, nonessential security polish, new chains, new features, cosmetic redesign, speculative infrastructure, and developer convenience are last during the final window unless they remove a concrete P0/P1 blocker or serious live-demo/security risk.

## Mandatory ranking self-check

Before recommending a next step during this active window, ask internally:

1. What P0 evidence is still missing or unverified?
2. Does this proposed engineering task directly close one of those gaps, unblock P1, or prevent a material judging/demo failure?
3. If not, why is it being ranked above the missing evidence?

If the top recommendation is primarily engineering work while required bootcamp evidence remains incomplete, explicitly justify why that engineering work has greater expected judging impact. If there is no strong justification, move the engineering task below the evidence work.

## Examples

Bad default ranking:

1. deepen x402 integration;
2. refactor payment code;
3. security polish;
4. collect user evidence later.

Better default ranking when evidence is incomplete:

1. close qualifying report / feedback / professional-review gaps;
2. preserve one reliable judge-ready workflow;
3. capture proof and map claims to artifacts;
4. strengthen the forensic differentiation judges can see;
5. harden x402 / GOAT / AgentKit only to the level required for verified judging evidence and demo reliability.

## Conflict / precedence

This override controls **prioritization and ranking decisions only** during its active window.

It never overrides:

1. platform/system safety requirements;
2. stricter Triage security/privacy/tool restrictions;
3. the operator's current explicit instruction;
4. Triage's durable identity and forensic-integrity rules.

For bootcamp prioritization, it should be read together with `BOOTCAMP_CONTEXT.md`. Where an older backlog, cached chat, implementation handoff, or generic task list conflicts with this file's P0-P4 ordering, this current override wins for ranking next actions.

## Expiry

After 2026-08-26, do not continue applying this as current strategy without operator review. Preserve it as historical bootcamp context or replace it with the next operating-priority file.

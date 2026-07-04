# Runtime Memory

This folder defines where Triage stores runtime memory. Live client data, raw imports,
generated workpapers, and payment records should stay local and are ignored by Git.

Safe-to-commit files in this folder are templates and empty knowledge indexes only.

## Layout

- `clients.json` - local client records. Ignored by Git.
- `customers.json` - local x402 purchaser/subscriber records. Ignored by Git.
- `jobs/<jobId>/` - raw imports, normalized ledgers, assumptions, findings, workpapers,
  JSON outputs, and attestation hashes. Ignored by Git.
- `knowledge/CRITICAL_FINDINGS.md` - sanitized append-only index of important lessons.
- `rules/` - jurisdiction rule notes with citations.
- `patterns/` - reusable reconciliation patterns.

Do not commit live client data or raw source documents.


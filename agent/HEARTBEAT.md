# HEARTBEAT — cadence

Reconciliation is job-driven, not clock-driven: most ticks check for new work and advance in-flight jobs. Cadence tightens near tax deadlines and when an IRS notice has a response clock.

## Schedules

| Cycle | Interval | What runs |
|---|---|---|
| Intake check | every 5 min | look for new reconciliation requests (Telegram/API); create a job folder and acknowledge with scope + estimate |
| Job pipeline | continuous | advance in-flight jobs through the pipeline (import → normalize → match transfers → reconstruct basis → workpaper); target turnaround stated per job, not per tick |
| Long-import watch | every 10 min while active | large multi-year, multi-chain imports run as background pulls; report progress, never block other jobs |
| Deadline mode | daily during Jan 1–Apr 15 and the Oct extension window | prioritize jobs with an imminent filing deadline; surface any job at risk of missing it to the operator |
| Notice clock | every 6 h when any job is tied to an IRS notice (CP2000 etc.) | track the statutory response deadline; escalate if a job is within 5 business days of it |
| Daily digest | 09:00 operator local time | one message: jobs opened/closed, in-flight status, revenue, gas balance, anything blocked on client data |
| Self-audit | daily 03:00 UTC | re-verify delivered workpapers against stored attestations; flag any drift |
| Learning review | after every completed job and daily during active pilots | ensure critical findings, assumptions, corrections, and reusable patterns were captured under `LEARNING.md` |

## Rules
- A reconciliation is never rushed to hit a tick. If data is missing, I pause the job and request it — I do not fabricate basis to appear "done."
- Off-season (post-April through September, excluding the Oct window) I run the same pipeline at lower intensity; year-round demand is extensions, amended returns, notices, quarterly estimates, and non-tax basis requests.
- No heartbeat triggers any on-chain write except attestation publishing already approved in TASKS.md.
- Two consecutive failures of any cycle = incident → alert operator; I do not silently retry forever.
- A learning review can write only sanitized notes inside `memory/`; it never reads outside the workspace and never changes a delivered workpaper silently.

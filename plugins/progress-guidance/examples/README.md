# Examples

Self-contained *fictional* examples demonstrating the progress-guidance format. None of these reflect a real production project — domain names, file paths, metrics, and decisions are *all illustrative*.

## svc-migration

A fictional service-migration project (e.g. splitting a payments domain off a monolith DB). Demonstrates:

- `svc-migration/svc-migration-status.md` — status core: next-session entry, origin, north-star table with `근거` + `시스템 영향` columns, pessimistic re-score.
- `svc-migration/svc-migration-status/03-2026-01-15-baseline.md` — phase log for an *infrastructure-only* phase. Shows the explicit "this does not move §북극성, it enables future phases" call-out.
- `svc-migration/svc-migration-status/04-2026-01-22-dual-write.md` — phase log for *substantive* progress. Shows how evidence, system-impact, and pessimistic self-rescore combine.
- `svc-migration/svc-migration-pipeline.md` — pipeline core: 7-stage migration framework + project mapping with `근거` column.

## How to use these examples

When starting a new domain:

1. Skim both core files of `svc-migration` to absorb the rhythm and section structure.
2. Open one of the phase files to see how a single cycle is logged — note the §시스템 영향 + §비관 재채점 sections.
3. Copy the `templates/` files (not the examples) to start your domain — examples are *reading-only* references.
4. When you're unsure how to format a particular block, refer back to the matching section of `svc-migration`.

## What to imitate

- Inline tables with explicit columns: `근거`, `시스템 영향`, `반례/근거`.
- Phase files self-contained — a fresh reader landing in `04-…-dual-write.md` should not need to read other files for context.
- §시스템 영향 always answers "what changed *observably* at the system level — was anyone outside this PR affected?".
- §비관 재채점 always names a specific stricter reviewer assumption and admits at least one gap.

## What NOT to imitate

- The fictional metrics (`p95 800ms`, `1.2B rows`) — replace with real measured values from your domain.
- The 7-stage pipeline structure — your domain needs its own stages. The *4-block-per-stage* rhythm is what to keep, not the 7 specific stages.
- The 2026-01 dates — those are illustrative only.

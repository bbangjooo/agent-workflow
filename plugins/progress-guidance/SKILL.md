---
name: progress-guidance
description: Guide long-running multi-session projects with a paired status-log + methodology-pipeline doc pair. Every cycle critically re-judges progress against the project's north star — every claim must carry both *evidence* and a *system-impact* analysis. Each new phase becomes its own file; core docs only carry indices.
---

# progress-guidance — Paired Methodology + Critical-Progress Skill

A discipline for projects that span many sessions. Two paired docs, evidence-required, system-impact-judged, pessimistically re-scored every cycle.

## When this skill activates

- User says "이어서 작업", "다음 사이클", "phase 추가", "북극성", "갭 분석", "비관 평가", "진행상황 갱신", "근거 정리", "시스템 영향"
- User invokes `/progress-guidance` explicitly
- Project has `docs/<domain>-status.md` + `docs/<domain>-pipeline.md` (or is about to start one)
- User asks to apply a "status + pipeline" doc-pair format to a new domain

## Core doctrine (six rules)

### 1. Two paired documents (mandatory)

Every project under this skill maintains *two* docs evolving in lockstep:

- **status** (`docs/<domain>-status.md`) — *moves with time*. Origin → decision chain → phase logs → north-star vs current gap → next priorities.
- **pipeline** (`docs/<domain>-pipeline.md`) — *near-static methodology*. The N-stage standard pipeline for the domain + a final §"이 프로젝트가 위 틀에 얼마나 부합하는가" mapping table that scores the project against the framework.

These cite each other and never drift.

### 2. Critical evaluation is always-on

Cheering is forbidden. Progress is evaluated *pessimistically* every cycle:

- Every "X improved" requires before/after numbers and how they were measured.
- Code shipped ≠ outcome moved. A phase that ships code without moving a §북극성 row is suspect — escalate.
- Every cycle must produce a *pessimistic re-score*. A cycle with zero downgrades is suspect — really nothing got worse under stricter review?

### 3. Sectioned-file structure (file size discipline)

Both docs are *core index files*. Long content goes into per-section files referenced by the core.

```
docs/
├── <domain>-status.md                   # Core — §0, §1, §North-Star, §LOC, §sync-check inline
├── <domain>-status/
│   ├── 03-M1-implementation.md          # Each substantive § = its own file
│   ├── 04-2026-05-03-rescan.md
│   └── 14-pessimistic-rescore.md
├── <domain>-pipeline.md                 # Core — §0 overview, §1-§N stages, §mapping
└── <domain>-pipeline/
    └── 03-data-feature-prep.md          # Optional: only when a stage exceeds ~200 lines
```

Rules:

- Any top-level § whose body exceeds ~200 lines becomes its own file.
- Core file keeps a 5-15 line summary + `→ Detail: [...](...)` link.
- Core *always* renders inline (never hidden in sub-files): §0 next-session entry, §North-Star table, §pessimistic re-score, §LOC summary, §pipeline-mapping. These are read first by every fresh session.
- Per-section files start with their own §<NN>.0 micro-TL;DR so a reader landing there directly has context.
- Naming: `<NN>-<slug>.md` matching the § number. Date-tagged: `04-2026-05-03-<slug>.md`.

### 4. Sync rule (status ↔ pipeline)

Updating one doc requires checking the other in the same session:

- status §North-Star changed → pipeline §mapping re-evaluated.
- pipeline §mapping changed → status §pessimistic re-score reflects it.
- New external reference cited in either → mirror in the other.
- New § in status → consider whether pipeline gains a new stage / sub-stage.

Single-doc updates are a defect. Flag and fix the drift before closing.

### 5. Evidence is mandatory for every claim ★

Every row of every table that asserts state, progress, or score carries a `근거` column.

Accepted evidence types (strongest → weakest):

1. **Reproducible measurement** — file path + command + numeric output. e.g. `wc -l file.py → 421`.
2. **Test result** — test name + pass/fail + commit. e.g. `test_dsr_floor PASS @ commit abc123`.
3. **Code reference** — file path + line range. e.g. `svc/payments/writer.py:42-180`.
4. **External / OOS validation** — paper / live data / out-of-sample number with date.
5. **Decision quote** — verbatim user statement + date.

Refused as evidence (cycle stays open):

- "I think", "looks like", "should be", "probably"
- LOC alone — LOC ships code; it does not move outcomes. Always pair LOC with a measurement.
- Vague pronouns — "we improved X". Without a number, "improved" is unverifiable.
- Future tense — "will work in OOS". If unmeasured, mark the row 가설, not progress.

A row missing the `근거` column is a *defect*. Refuse to close until evidence is added or the claim is downgraded with `evidence pending: <reason>`.

### 6. System-impact analysis (mandatory) ★

Beyond evidence, every progress claim must answer *what changes at the system level* — observably.

For each phase report (status §<NN>.6) and each §북극성 row (`시스템 영향` column):

- 이 phase 이전 vs 이후의 *관찰 가능한* 시스템 상태 차이
- 새로 가능해진 행동 (구체)
- 더 이상 불가능해진 행동
- downstream 영향 (다른 component / 다른 사용자 / 다른 process)
- 사용자/외부 관찰자에게 보일까? — 보이면 어떻게, 안 보이면 *왜 그래도 의미가 있나*

A phase that produces *no* observable system change is suspect:

- **Plumbing/infrastructure-only** — acceptable, *but mark explicitly*: "infrastructure-only — does not move §북극성. Enables future phases X/Y."
- **Refactor with no behavior delta** — acceptable, but the claim "improved" must cite a non-behavior measurement (e.g. test coverage delta, build time).
- **Cosmetic** — flag and reconsider whether to include in the cycle.

**근거** answers *did this happen?* — **시스템 영향** answers *does it matter?* Both required, not one.

## Bootstrap rule (run before any progress work)

If either doc is missing or has fewer than 4 substantive sections, **stop and bootstrap before doing anything else**.

1. Confirm domain name with user. Convention: `<domain>-status.md` + `<domain>-pipeline.md`.
2. Copy `templates/status-core.md` → `docs/<domain>-status.md`. Fill §0–§2 (next-session entry / user goal / decision chain). The §1.4 진짜 목표 line is required and must be a single sentence.
3. Copy `templates/pipeline-core.md` → `docs/<domain>-pipeline.md`. Identify the N standard stages — consult external references before guessing.
4. Fill the final pipeline §"이 프로젝트가 위 틀에 얼마나 부합하는가" mapping table with ◎/○/△/✗ + one-line evidence per stage. Initial scores are mostly ✗ — that's expected.
5. Cross-reference: status §1.3 외부 컨텍스트 ↔ pipeline §0 references must point to the same sources.
6. Verify with the user that both docs accurately capture *what we're achieving and how we'll judge it*.

A skipped bootstrap = no anchor for critical evaluation. Do not skip.

## Iteration protocol (one work session)

1. **Open** — read status §0, then status §North-Star, then the pipeline stage(s) the work touches.
2. **Plan** — confirm the work moves a specific §North-Star row. If you cannot identify which row, escalate.
3. **Work** — execute. Save artifacts where pipeline §code-perspective points.
4. **Append a new phase file** — `docs/<domain>-status/<NN>-<YYYY-MM-DD>-<slug>.md` from `templates/status-section.md`. Required sections: scope, what was built (with evidence), validation, system impact, residual issues.
5. **Update status core inline** — §LOC summary, §0 next-session entry, §North-Star table (refreshed `현재` + `근거` + `시스템 영향`), §pessimistic re-score, §phase index row.
6. **Sync pipeline core** — re-rate affected stage(s) in §mapping. If a new mistake/signal was learned, append to that stage's §X.3 / §X.2.
7. **Verify** — both docs touched; §0 next-session entry alone would orient a fresh reader who has never seen this project.

## Critical-evaluation checklist (mandatory each cycle)

- [ ] §North-Star table — at least one row's `현재` value changed *with measured evidence* (not assertion).
- [ ] §North-Star table — every row has non-empty `근거` and `시스템 영향` columns. Empty cells flagged `evidence pending: <reason>`.
- [ ] §Pessimistic re-score — at least one row was re-justified or downgraded. Downgrades cite a *specific* stricter reviewer assumption.
- [ ] No goal marked ✅ on the basis of "code shipped" alone — every ✅ has an outcome metric AND a system-impact note.
- [ ] Every new feature this cycle maps to a §North-Star row. Orphans flagged "scope creep?" in §residual issues.
- [ ] §0.3 next-action decision tree is *single-leveraged-action first*, not a flat to-do list.
- [ ] Pipeline §mapping table reviewed for affected stage(s). Re-rating happened or was explicitly judged unnecessary.
- [ ] No phase report claims progress without answering *"what changed observably at the system level?"*.

## Anti-patterns (refuse / flag)

- **Single-doc projects** — status only or pipeline only. The pair is the discipline.
- **Drifted pair** — phase 18 in status; pipeline §mapping last touched at phase 6. Refuse new phases until reconciled.
- **Goal creep without re-anchoring** — adding a §북극성 row without explaining what triggered the change. Trigger belongs in §Decision chain.
- **Append-only without splits** — file passes 1500 lines. Split before then.
- **Cheerleading log** — phase reports without LOC / test results / metrics.
- **Disconnected references** — pipeline cites paper X, status cites talk Y, never reconcile.
- **Universal optimism** — every cycle every stage stays ≥ previous score. Real progress includes setbacks.
- **Evidence-free progress** — "X improved" without a number. Reject.
- **Invisible progress** — code shipped but no observable system change. Either label `infrastructure-only` or reconsider.

## Templates (in `templates/`)

- `status-core.md` — start here for the status doc
- `status-section.md` — copy per phase
- `pipeline-core.md` — start here for the pipeline doc
- `pipeline-stage.md` — copy per pipeline stage when depth exceeds ~200 lines

## Reference example

`examples/svc-migration/` — a fictional service-migration project demonstrating the format end-to-end. All metrics, decisions, and file paths are illustrative. Copy *templates/* (not examples) when starting a new domain; read examples to absorb the rhythm.

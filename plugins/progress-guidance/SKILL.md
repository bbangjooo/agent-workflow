---
name: progress-guidance
description: Guide long-running multi-session projects with a paired status-log + methodology-pipeline doc pair. Every cycle re-projects the system end-state, re-injects it into the next phase's plan, and advances a user-anchored milestone checkpoint chain (M_1 → M_2 → ... → §종착지). Every claim carries *evidence*, *system-impact*, *end-state delta*, and *milestone position*. Each new phase becomes its own file; core docs only carry indices. Milestone definition is mandatorily user-interactive at bootstrap.
---

# progress-guidance — Paired Methodology + Critical-Progress Skill

A discipline for projects that span many sessions. Two paired docs, evidence-required, system-impact-judged, milestone-anchored, pessimistically re-scored every cycle.

## When this skill activates

- User says "이어서 작업", "다음 사이클", "phase 추가", "북극성", "갭 분석", "비관 평가", "진행상황 갱신", "근거 정리", "시스템 영향", "종착지", "비전 재투영", "end-state", "프로젝트 모양"
- User invokes `/progress-guidance` explicitly
- Project has `docs/<domain>-status.md` + `docs/<domain>-pipeline.md` (or is about to start one)
- User asks to apply a "status + pipeline" doc-pair format to a new domain

## Core doctrine (ten rules)

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

### 7. Projected end-state — re-envision and re-inject every cycle ★

§북극성이 *지표*라면, 종착지(end-state)는 *시스템 모양*. "이 프로젝트가 끝났을 때 시스템은 무엇이고, 무엇을 가능하게 하는가"의 현재 최선의 그림. 매 cycle 다시 그리고, 다음 cycle 시작 시 다시 주입한다.

**위치**: `pipeline.md §종착지 시스템 모양` (도해 + 가능해진 행동 + 의도적 제외 + 비전 vs 현재 표 + 변경 이력).

**왜 필요한가**: 각 phase는 자기 §북극성 행만 보고 좁게 굴러간다. 누군가 매 cycle "전체가 어떤 모양으로 수렴하는가"를 다시 그리지 않으면, phase 결과가 누적되어도 종착지가 흐려진 채 path-dependent 하게 흘러간다. §매핑 표는 단계 점수일 뿐 *시스템 모양*이 아니다.

**Re-projection (사이클 닫을 때)**: 이번 phase 결과를 반영해 §종착지 §N.4 비전 vs 현재 표를 갱신하고, §N.5 변경 이력에 이번 cycle 행을 추가한다. 추가/구체화/축소/no-change 중 하나로 분류 명시.

**Re-injection (다음 사이클 열 때)**: 새 phase의 step 1 (Open) 에서 §종착지를 무조건 읽고, step 3 (critic generate) 프롬프트에 §종착지 현재 상태를 컨텍스트로 주입한다. critic은 매 cycle "이 phase 결과가 종착지 비전을 어떻게 구체화/축소/변경하는가"를 묻는 `end-state-positioning` 질문을 ≥1개 강제 포함.

**Vision-loosening 차단**: 종착지에서 항목이 *축소* 방향으로 변경되면 status §Decision chain에 trigger 항목이 있어야 한다. 없으면 post-hoc relaxation — auditor Pass 3에서 Severity-1.

**Vision-stagnation 의심**: §N.5 변경 이력이 ≥3 cycle 연속 no-change 면 의심 신호. 정말 phase 결과가 비전을 한 번도 흔들지 않았나, 아니면 phase가 비전과 무관하게 굴러간 것인가? auditor Pass 3에서 Severity-2 (≥3 cycle 연속), Severity-1 (≥5 cycle 연속).

비전 자체가 새 cheerleading 출구가 되지 않도록: §종착지도 §북극성처럼 *근거 기반·다운그레이드 가능*. 비관 재채점 대상에 포함된다.

### 8. Milestones — user-anchored checkpoint chain ★

§북극성 = *지표* (metric). §종착지 = *시스템 모양* (end-state shape). **마일스톤 = 종착지 도달 경로 위 시간순 체크포인트 (M_1 → M_2 → ... → M_N → §종착지)**. 매 phase 의 본 임무는 *active M_i.j* 의 exit criterion conjunct 를 닫는 것.

**왜 분리했나**: phase 가 §종착지 에 직접 비교되면 "결과가 종착지에 별로 안 닿았다" 가 매 cycle 반복되고 *닫힘 감각* 이 없다. 마일스톤은 종착지 도달 *경로* 의 mile post — phase 진척이 의미 있는 단위로 누적된다.

**모델 = checkpoint, NOT partition**: M_i 는 M_{i+1} 의 *prerequisite* (logical/technical dependency, 단순 시간 순서 아님). M-set 합집합이 §종착지 §N.2 가능해진 행동 list 를 *exhaust* 해야 한다 — 단, partition 처럼 disjoint 일 필요는 없다 (sub-checkpoint 가 같은 §N.2 행동을 부분 cover 가능).

**2-level 허용**: M_i 가 크면 sub-checkpoint M_i.j (alphabetical: M1-A, M1-B, ...) 로 분해. M_i 안의 sub 들은 *partition 스타일* (disjoint, parallel 가능). M-level 은 sequential, sub-level 은 parallel.

**Exit criterion = AND-conjunction**: 각 M_i (또는 M_i.j) 의 exit criterion 은 *측정 가능 conjunct 들의 AND*. 예: `M1 close = (북극성 행1 ≥ 1.5/2) ∧ (북극성 행2 ≥ 2.5/4) ∧ (CSV cache 30 종목 reproducible)`. 단일 trigger 로 close 청구하면 자축 출구. 모든 conjunct 가 §북극성 evidence 또는 reproducible measurement 로 ✅/❌ 판정 가능해야 한다.

**User-anchored**: M 정의는 *사용자가 결정*. 스킬은 M 후보를 자체 판단으로 박지 않는다 — 사용자 dialogue 에서 elicit. 애매한 boundary / ordering / conjunction membership 은 모두 explicit 옵션 + recommendation 으로 사용자에게 선택받는다 (자동 결정 금지).

**Phase ↔ M.j 매핑 강제**: iteration step 2 Plan 에서 phase 는 *어느 M_i.j 의 어느 conjunct* 를 *advance / close* 하는지 명시. 매핑 못 하면 scope creep.

**Prerequisite gate**: M_i 가 close 되기 전 M_{i+1} 작업을 시작하면 status §Decision chain 에 *명시적 gate-bypass* trigger 가 있어야 한다. 없으면 auditor Pass 7 Severity-1.

**Exit weakening 차단**: M_i exit criterion 의 conjunct 정의를 cycle 도중 약화 (임계 ↓ / conjunct 제거 / 측정 방식 변경) 하면 §Decision chain trigger 必 + 1급 객체 retrospection (Rule 9) 재실행. 없으면 auditor Pass 7 Severity-1 (vision-loosening 의 마일스톤 판).

**3-cycle 정체 룰**: M_i.j 가 ≥3 cycle 같은 conjunct 에서 ✅ 못 받으면 critic 자동 FAIL. 우회 경로 모색 / M_i.j 정의 amendment / §북극성 행 자체 re-anchor 셋 중 하나.

**위치**: pipeline `§N+1 마일스톤 체크포인트 체인` (정적 정의) + status `§2.3 마일스톤 진척` (동적 상태) + phase 파일 `§<NN>.6.4 마일스톤 진척 청구`.

### 9. 1급 객체 회고 — retrospective satisfaction check ★

§북극성 행 / §종착지 §N.4 영역 / M chain — 이 셋이 본 스킬의 *1급 객체*. **이들을 정의 또는 amend 할 때마다 별도 retrospective 단계 필수.** 작성한 정의가 사용자 §1.4 진짜 목표를 *진짜로* 만족시키는지 commit 전에 묻는다.

**왜 메타룰인가**: 1급 객체는 한 번 박히면 이후 모든 cycle 의 측정 기준이 된다. 정의 단계에서 *"이 정의로 사용자 요구사항이 진짜 만족되나?"* 를 묻지 않으면, 5 cycle 뒤에 깨달은 mismatch 는 correction phase 비용을 치러야 풀린다. critic 의 per-row vetting (measurable / falsifiable 등) 과는 *질적으로 다른* system-level 점검 — 항목 *집합* 이 사용자 요구를 cover/exhaust/faithful 하게 잡나.

**Retrospection 3 질문 (1급 객체 항목별)**:

- **Coverage**: 이 항목이 *§1.4 진짜 목표의 어느 substring* 또는 *§종착지 §N.2 가능해진 행동의 어느 줄* 을 충족시키나? 매핑 제로면 항목이 잘못 들어왔거나 §1.4 / §종착지가 부족.
- **Sufficiency**: 모든 1급 객체 항목 *합집합* 이 §1.4 / §종착지 §N.2 list 를 *exhaust* 하나? 빠진 부분 = 새 항목 (M 또는 §북극성 행) 추가 필요.
- **Faithfulness**: 항목 정의의 *측정 방식* 이 §1.4 의 진짜 의도를 잡나, 아니면 측정 편의로 정한 proxy 인가?

**사용자 상호작용 강제**: 위 셋 중 어느 것이라도 답이 ambiguous 하면 — 스킬이 사용자에게 *explicit 옵션 + recommendation* 을 제시하고 선택받는다. **자동 결정 금지**. 예:

- "M2 의 exit criterion 에 paper-trading artifact 6종 모두 포함할까, 4종만 포함하고 2종은 M3 으로 미룰까?"
- "§북극성 행 5 의 측정 단위가 §1.4 의 'multi-agent factory' 를 잡는가, 아니면 코드 라인수 proxy 인가?"
- "§종착지 §N.2 행동 'alpha 자동 promote' 가 어느 M 의 exit conjunct 인가?"

**진입 트리거**:

- Bootstrap step 7.5 (1급 객체 첫 정의 직후, 모두 함께 retrospect)
- Correction phase 작성 (§1.4 / §북극성 / §종착지 §N.4 / M chain 변경)
- 새 §북극성 행 추가 (§Decision chain entry 만으론 부족 — retro 도 必)
- M chain amendment (M 추가/제거/순서 변경/exit conjunct 변경)

**기록**: `docs/<domain>-status/00-bootstrap-retro.md` (bootstrap) 또는 correction phase file 의 `§<NN>.5.7 retrospection` 절. 사용자 verbatim 응답 인용 必.

**Skip 금지**: retrospection 기록 없이 1급 객체 변경 commit 하면 auditor Pass 7 가 다음 cycle 에서 Severity-1.

### 10. Claim mode + Requirement-Result Divergence ★

모든 측정 청구는 *몇 등급의 증거*를 청구하는지 명시한다. 그리고 요구사항(가설/기준/의도된 결과)과 실제 측정값이 다르게 나오면 — **침묵 흡수 금지**. 명시 분류가 없으면 §북극성/§종착지가 자기충족적으로 회전한다.

**두 모드 (모든 phase 의 §<NN>.6.7 에 명시 — `MIXED` 시 청구 행 단위로 분리)**:

- **CONFIRMATORY** — "이 측정이 가설/기준을 *검증*했다." 가설/기준이 *데이터를 보기 전*에 commit 된 상태에서, 사전에 못 본 데이터로 측정한 결과만 이 등급 가능. 증거: pre-spec 의 commit hash + timestamp 가 첫 데이터 노출 commit 보다 이른지 git 으로 검증 가능. 검증 못 하면 EXPLORATORY 로 자동 강등.
- **EXPLORATORY** — "이 측정이 가설/기준을 *제안*했다." 데이터를 보고 가설/기준을 정했거나 사후 조정한 모든 청구. 결론은 "X 가 시사됨, 추후 confirmatory 검증 필요" 까지만. **금지 단어**: "증명", "확인됨", "검증됨", "정량 증명", "proven", "confirmed". 다음 cycle 에 holdout / 새 데이터 / 사전 commit 된 기준 위에서 재측정 plan 을 §<NN>.10 에 명시.

**막아야 할 핵심 패턴**: 데이터를 보고 가설/기준을 (의식적으로든 무의식적으로든) 조정한 결과를 confirmatory 등급으로 청구하는 것 (HARKing / p-hacking / cherry-pick). 이게 progress-guidance 에서 가장 자주 새는 누설 경로 — 지표는 움직였다고 보이지만 실제로는 자기 데이터에 자기 기준을 맞춘 것.

**Requirement-Result Divergence (조건부 §<NN>.6.8)**: §<NN>.1 의 의도/요구사항/예상치와 §<NN>.3 측정값이 의미 있게 다르면 (수치적 큰 차이 / 가설 기각 / 기준 대량 미달 / 등) 세 갈래 중 하나로 명시 분류:

- **REQUIREMENT-WRONG** — 요구사항/기준/의도가 실제 의도를 못 잡았음 (측정 편의로 정한 임계, §1.4 와 어긋난 가설, 사후에 보니 §북극성 행 정의 자체가 부적합 등). **다음 cycle 시작 전 correction phase 필수** — §<NN>.10 에 트리거 명시.
- **RESULT-INVALID** — 측정/데이터 품질 문제 (look-ahead bias, sample 누락, pipeline 버그, 비교군 실수 등). **청구 철회**. §<NN>.7 §북극성 갱신에 이 phase 의 측정값을 반영하지 말 것. 다시 측정.
- **GENUINE-FINDING** — 측정은 정상, 결과가 예상과 다른 진짜 발견. **청구는 EXPLORATORY 등급으로만 가능** (위 모드 규칙 적용). 다음 cycle 에 새 데이터/holdout 으로 confirmatory 검증 plan 을 §<NN>.10 에 명시.

세 갈래 중 *어느 것에도* 분류하지 않은 채 §북극성/§종착지를 갱신하면 = 셋 다인 척 / 하나도 아닌 척 으로 흘러가는 것. auditor Pass 6 가 Severity-1.

**자기진단 한 줄**: "이번 phase 의 청구가 confirmatory 등급으로 통과되려면, 데이터를 보기 전 어느 commit 이 가설/기준을 박아두었나?" — 답을 못 대면 EXPLORATORY 가 정직.

## Bootstrap rule (run before any progress work)

If either doc is missing or has fewer than 4 substantive sections, **stop and bootstrap before doing anything else**.

1. Confirm domain name with user. Convention: `<domain>-status.md` + `<domain>-pipeline.md`.
2. Copy `templates/status-core.md` → `docs/<domain>-status.md`. Fill §0–§2 (next-session entry / user goal / decision chain). The §1.4 진짜 목표 line is required and must be a single sentence.
3. Copy `templates/pipeline-core.md` → `docs/<domain>-pipeline.md`. Identify the N standard stages — consult external references before guessing.
4. Fill the final pipeline §"이 프로젝트가 위 틀에 얼마나 부합하는가" mapping table with ◎/○/△/✗ + one-line evidence per stage. Initial scores are mostly ✗ — that's expected.
5. **Draft pipeline §종착지 시스템 모양 (Cycle 0)** — initial vision: 도해 + 가능해진 행동 + 의도적 제외. Cycle 0 entry in §N.5 변경 이력. Vague is acceptable initially — it will be sharpened phase-by-phase. *Empty* is not.
6. Cross-reference: status §1.3 외부 컨텍스트 ↔ pipeline §0 references must point to the same sources.
6.5. **Milestone elicitation (user-interactive, mandatory)** — §1.4 진짜 목표 → 종착지까지 직선이 아니다. Ask the user explicitly (Korean): "§1.4 진짜 목표를 종착지에 도달하기 위한 *N개 마일스톤 시퀀스* 로 나눠주세요. 각 M_i 는 다음 셋을 갖춰야 합니다: (1) 이름 / 한 줄 정의, (2) close 의 exit criterion — §북극성 행 evidence 또는 재현 가능 측정과 결합 가능한 *AND-conjunction*, (3) 왜 M_{i-1} close 가 prerequisite 인가 (logical/technical dependency, 단순 시간 순서 아님)." 사용자 응답을 verbatim 으로 pipeline `§N+1 마일스톤 체크포인트 체인` + status `§2.3 마일스톤 진척` 에 옮긴다. **Ambiguity 는 모두 사용자 dialogue** — boundary / ordering / conjunction membership 이 모호하면 explicit 옵션 + recommendation 을 제시하고 선택받는다 (자동 결정 금지). M_i 가 큰 경우 sub-checkpoint M_i.j (alphabetical) 로 분해 — 이 분해도 사용자 동의 하에. Cross-validate: 모든 §종착지 §N.2 가능해진 행동 줄이 *최소 한 M_i exit conjunct* 에 의해 covered 되어야 한다 (Rule 8 `M-set exhaust §종착지 §N.2`). 빠진 줄 발견 시 사용자에게 가져가 amend.
7. **Critic bootstrap pass (mandatory)** — invoke `progress-critic` in `bootstrap` mode against the freshly-drafted §북극성 표 + §1.4 진짜 목표 + §종착지 cycle-0 + **§N+1 마일스톤 체크포인트 체인**. The agent returns ≤8 sharp questions challenging the *definitions* across the three 1급 객체 sets (existing categories: measurable / falsifiable / proxy-vs-real / vision-aligned / reachable-but-non-trivial / independently-verifiable; **new milestone categories**: milestone-coverage / milestone-necessity-ordering / milestone-prerequisite-realism / milestone-exit-measurability). Save them to `docs/<domain>-status/00-bootstrap.critic.md`. Fill each `**Response:**` block (DIRECT / REVISED / LIMITATION), revising §북극성 / §1.4 / §종착지 / §N+1 M chain as needed. Re-invoke `progress-critic` in `bootstrap-verify` mode. Bootstrap does **not** advance to step 7.5 until the verifier returns `VERDICT: PASS`. See §Bootstrap critic pass below.
7.5. **1급 객체 retrospective satisfaction check (user-interactive, mandatory)** — Rule 9 메타룰 발동. Critic 의 per-row vetting 이 끝났어도 *system-level* 점검은 별개. §북극성 행 + §종착지 §N.4 영역 + §N+1 M chain 셋을 *함께* 들고 사용자에게 가서 다음 셋을 묻는다:
    - **Coverage**: 각 1급 객체 항목이 §1.4 substring 또는 §종착지 §N.2 행동의 *어느 줄* 을 충족시키나? 매핑 표를 사용자와 함께 작성.
    - **Sufficiency**: 1급 객체 *합집합* 이 §1.4 / §종착지 §N.2 list 를 exhaust 하나? 빠진 부분이 있다면 어떻게 채울까 (M 추가 / §북극성 행 추가 / §종착지 §N.2 행동 정정)?
    - **Faithfulness**: 항목 정의의 *측정 방식* 이 §1.4 의 진짜 의도를 잡나, proxy 인가? 사용자가 측정 방식을 어떻게 받아들이나?
    
    위 셋에서 ambiguity 가 발견되면 — *자동 결정하지 말고* — 사용자에게 explicit 옵션 + recommendation 을 제시하고 선택받는다. 사용자 응답은 verbatim 으로 `docs/<domain>-status/00-bootstrap-retro.md` 에 인용. retro 파일 구조:
    
    ```
    # Bootstrap Retrospective — <domain> (<date>)
    
    ## Coverage 매핑 (1급 객체 ↔ §1.4 / §종착지 §N.2)
    | 1급 객체 항목 | §1.4 substring | §종착지 §N.2 줄 | 사용자 verdict |
    |---|---|---|---|
    
    ## Sufficiency 점검
    - 빠진 §1.4 측면: <있다면 — 사용자가 채우기로 한 방식 인용>
    - 빠진 §종착지 §N.2 행동: <있다면 — 사용자가 채우기로 한 방식 인용>
    
    ## Faithfulness 점검 (proxy 의심 항목)
    - <항목>: 측정 방식 = <...>, 사용자 verdict = <"진짜 잡는다" / "proxy 지만 받아들인다 — 사유" / "amend 필요">
    
    ## 사용자 결정 (ambiguity 처리)
    - <질문>: 옵션 A / B / C / 사용자 선택 = <verbatim>
    
    ## Commit
    - 위 결정에 따라 §북극성 / §종착지 / §N+1 M chain 갱신 완료. 각 변경의 source 는 본 retro 파일 인용.
    ```
    
    Skip 금지 — retro 파일 없이 step 8 진입하면 첫 cycle audit 에서 즉시 Severity-1.
8. Verify with the user that all four anchors accurately capture the project: §1.4 진짜 목표, §북극성 표, §종착지 시스템 모양, §N+1 마일스톤 체크포인트 체인 — *그리고* 이 넷이 retro 결과대로 사용자 요구사항을 만족시키는지를 한 번 더 확인.

A skipped bootstrap = no anchor for critical evaluation. Do not skip.

## Bootstrap critic pass (one-time — at Bootstrap step 7)

The cycle-time critic vets *phase claims*. The bootstrap critic vets the *initial north-star definition itself*. A north-star that is unmeasurable, a proxy, or unmapped to §종착지 means every future cycle measures the wrong thing — by the time a cycle-time critic catches it, the project has spent N sessions chasing the wrong target. Bootstrap-time vetting is cheap; deferred vetting is not.

**Two invocations at Bootstrap step 7, same agent:**

### Step 7a — bootstrap (generate)

```
Agent(
  subagent_type: "progress-critic",
  description: "Critic — bootstrap questions",
  prompt: "MODE: bootstrap
    domain: <domain>
    status path: docs/<domain>-status.md
    pipeline path: docs/<domain>-pipeline.md"
)
```

The agent returns markdown text (≤8 closed questions, each tagged by category, each with an empty `**Response:**` block). Categories include the original six (measurable / falsifiable / proxy-vs-real / vision-aligned / reachable-but-non-trivial / independently-verifiable) **plus four milestone categories** (milestone-coverage / milestone-necessity-ordering / milestone-prerequisite-realism / milestone-exit-measurability — Rule 8). Save this to `docs/<domain>-status/00-bootstrap.critic.md` exactly as returned.

### Step 7b — bootstrap-verify

Fill in each `**Response:**` block in the bootstrap critic file. Each response must be one of:

- **DIRECT** — the question is *already* addressed by the docs as drafted; cite the specific section/row that answers it.
- **REVISED** — §북극성 / §1.4 / §종착지 / §N+1 M chain was revised in response to the question; describe the change and cite the current state.
- **LIMITATION** — acknowledged gap, with a link to a §residual issues entry (in status) or §Decision chain entry naming the gap and a deferral trigger.

Then invoke:

```
Agent(
  subagent_type: "progress-critic",
  description: "Critic — bootstrap verify",
  prompt: "MODE: bootstrap-verify
    domain: <domain>
    status path: docs/<domain>-status.md
    pipeline path: docs/<domain>-pipeline.md
    critic file: docs/<domain>-status/00-bootstrap.critic.md"
)
```

**Outcomes:**

- `VERDICT: PASS` — proceed to Bootstrap step 7.5 (1급 객체 retrospective).
- `VERDICT: FAIL` — fix unaddressed questions and re-invoke. The critic will not invent new questions on re-runs (closed set), so fixes converge.

### Foundation categories (no LIMITATION at bootstrap)

`vision-aligned`, `proxy-vs-real`, `milestone-coverage`, `milestone-prerequisite-realism` cannot be answered with `LIMITATION` at bootstrap. Deferring foundation means the project runs on an unanchored north-star OR a non-reachable milestone chain. The only acceptable responses for these four categories are DIRECT (already addressed) or REVISED (fixed now). Other categories may LIMITATION with a §residual entry.

## Iteration protocol (one work session)

1. **Open — re-inject end-state** — read status §0, then status §North-Star, then **`pipeline.md §종착지 시스템 모양` in full** (도해 + 가능해진 행동 + 의도적 제외 + §N.4 비전 vs 현재 + §N.5 변경 이력). Then read the pipeline stage(s) the work touches. The §종착지 view is the lens through which Plan and the critic prompt are written — not optional context.
2. **Plan — three anchors mandatory**:
   - (a) Which §North-Star row(s) the phase moves
   - (b) Which §종착지 §N.4 영역 the row belongs under, with reshape kind (구체화 / 검증 / 축소 / 신규 추가)
   - (c) **Which active M_i.j the phase advances or closes, and which exit criterion conjunct(s) it satisfies** (Rule 8). State explicitly: "이 phase 는 M_<i>.<j> 의 conjunct <name> 를 <advance / close> 한다." If the phase advances M_{i+1} while M_i is still open, status §Decision chain must contain a *gate-bypass* trigger entry in this cycle (named here, not deferred). If you cannot map all three (a)+(b)+(c), escalate — phase without milestone position is scope creep until proven otherwise.
3. **Critic — generate (mandatory)** — invoke `progress-critic` in `generate` mode. The prompt must include the current §종착지 snapshot and the phase's claimed §종착지 영역 from step 2. The critic returns ≤8 questions, *with at least one in the `end-state-positioning` category* asking how this phase will reshape the projected end-state. Save the returned questions to `docs/<domain>-status/<NN>-<slug>.critic.md`. See §Cycle critic pass below.
4. **Work** — execute. Save artifacts where pipeline §code-perspective points. Keep the critic questions visible — they shape what to measure, not just what to build.
5. **Append a new phase file** — `docs/<domain>-status/<NN>-<YYYY-MM-DD>-<slug>.md` from `templates/status-section.md`. Required sections: scope, what was built (with evidence), validation, system impact, **milestone progress claim (§<NN>.6.4 — advance / close 라벨 + 영향 받은 M_i.j conjunct + close 라면 conjunction 만족 evidence + prerequisite gate 상태)**, **end-state delta (§<NN>.6.5)**, **intent-execution reconciliation (§<NN>.6.6 — `MATCH` / `PIVOT` / `DRIFT` 라벨)**, **claim mode (§<NN>.6.7 — `CONFIRMATORY` / `EXPLORATORY` / `MIXED` 라벨 + 증거)**, **requirement-result divergence (§<NN>.6.8 — 조건부: §<NN>.1 예상과 §<NN>.3 측정값이 의미 있게 다르면 `REQUIREMENT-WRONG` / `RESULT-INVALID` / `GENUINE-FINDING` 중 하나로 분류)**, residual issues.
6. **Critic — verify (mandatory)** — fill in each `**Response:**` block in the `<NN>-<slug>.critic.md` file (DIRECT / LIMITATION / OUT-OF-SCOPE per the rules). Then re-invoke `progress-critic` in `verify` mode. The cycle does not advance to step 7 until critic returns `VERDICT: PASS`. On `VERDICT: FAIL`, fix the unaddressed questions and re-invoke.
7. **Update status core inline** — §LOC summary, §0 next-session entry, §North-Star table (refreshed `현재` + `근거` + `시스템 영향`), **§2.3 마일스톤 진척 (active M_i.j 갱신, conjunct progress 갱신, phase ↔ M.j 매핑 행 추가)**, §pessimistic re-score, §phase index row.
8. **Sync pipeline core** — re-rate affected stage(s) in §mapping. If a new mistake/signal was learned, append to that stage's §X.3 / §X.2.
9. **Re-project end-state (mandatory)** — open `pipeline.md §종착지 시스템 모양`. Update §N.1 도해 / §N.2 가능해진 행동 / §N.3 의도적 제외 if this phase changed any of them. Refresh §N.4 비전 vs 현재 표 (현재 칼럼). Append a row to §N.5 변경 이력 — *every cycle gets a row*, classified as 추가 / 구체화 / 축소 / no-change with the trigger. **축소 방향 변경은 status §Decision chain 의 trigger 항목과 짝이 맞아야 한다.** Confirm the phase file's §<NN>.6.5 end-state delta narrates the same change. **§N+1 마일스톤 체크포인트 체인 도 검토** — M chain *정의* 가 amend 됐다면 (Rule 8 exit weakening / 새 conjunct 등) §N+1.5 변경 이력에 행 추가 + Rule 9 retrospection 재실행 (correction phase 절차). 정의 변경 없이 *진척만* 변했다면 status §2.3 만 갱신 (정의 doc 은 unchanged).
10. **Self-check** — both docs touched; §종착지 §N.5 has a new row for this cycle; §0 next-session entry alone would orient a fresh reader who has never seen this project; **active M_i.j 가 §0 에서 즉시 보이는가**.
11. **Audit pass (mandatory)** — invoke `progress-auditor` via the Agent tool. The cycle is **not closed** until the auditor returns `VERDICT: PASS`. On `VERDICT: FAIL`, address every Severity-1 finding listed and re-invoke. The auditor now runs **seven passes** (Schema / Reproducibility / Drift / Linguistic-weakness / Intent-Execution drift / Claim-mode integrity / Milestone-discipline integrity). See §Audit pass below.

## Cycle critic pass (substantive — at iteration steps 3 and 6)

The discipline auditor (§Audit pass) checks whether what was written is honest and well-formed. The critic checks something different: **whether the right questions were asked at all**. A phase can be impeccably documented and still measure the wrong thing or mistake a proxy for the §북극성. The critic is the outsider who has not yet been convinced.

**Two invocations per cycle, same agent:**

### Step 3 — generate

```
Agent(
  subagent_type: "progress-critic",
  description: "Critic — generate questions",
  prompt: "MODE: generate
    domain: <domain>
    phase number: <NN>
    phase slug: <slug>
    target §북극성 rows: <comma-separated row labels>
    planned scope: <one-paragraph description from step 2>
    target M_i.j: <which milestone(s) this phase advances/closes>
    target conjunct: <which exit criterion conjunct(s) this phase satisfies>
    advance-or-close: <advance | close>"
)
```

The agent returns markdown text (≤8 closed questions, each tagged by category, each with an empty `**Response:**` block). Categories include the existing set (counterfactual / proxy-vs-real / sample-dependence / overfitting / survivorship / boundary / external-validation / measurement-gap / end-state-positioning / claim-mode-discipline / divergence-diagnosis) **plus a new `milestone-positioning` category** (Rule 8) — at least one question must carry this category, asking whether the phase truly advances/closes the named M_i.j conjunct or is a hidden gate-bypass / orphaned-from-milestone / premature-close. Save this to `docs/<domain>-status/<NN>-<slug>.critic.md` exactly as returned. These questions stand for the rest of the cycle — no new questions get added later.

### Step 6 — verify

After the phase file is drafted, fill in each `**Response:**` block in the critic file. Each response must be one of:

- **DIRECT** — concrete evidence (command + output, file path + lines, commit hash, test name, numeric measurement). The critic will Bash-run / Read your evidence to confirm.
- **LIMITATION** — acknowledged unresolved gap + a link to a §residual issues entry in the phase file describing what's missing and why.
- **OUT-OF-SCOPE** — justification citing which §북극성 row this question belongs to instead, or explaining why the question doesn't apply to this row's claim.

Then invoke:

```
Agent(
  subagent_type: "progress-critic",
  description: "Critic — verify responses",
  prompt: "MODE: verify
    domain: <domain>
    phase number: <NN>
    phase slug: <slug>
    critic file: docs/<domain>-status/<NN>-<slug>.critic.md
    phase file: docs/<domain>-status/<NN>-<date>-<slug>.md"
)
```

**Outcomes:**

- `VERDICT: PASS` — proceed to step 7.
- `VERDICT: FAIL` — fix unaddressed questions and re-invoke. The critic will not invent new questions on re-runs (closed set), so fixes converge.

### 3-cycle limitation rule (auto-FAIL)

The critic checks the previous 2 cycles' `*.critic.md` files. If a question's category for the same §북극성 row was answered as `LIMITATION` in ≥2 prior cycles AND is again `LIMITATION` this cycle, the question **auto-fails** regardless of format. Required fix is one of:

- Upgrade this cycle's response to `DIRECT` (do the measurement now).
- Amend status §Decision chain to **re-anchor or downgrade the §북극성 row itself**. Three cycles of "we'll get to it" means the row as defined isn't reachable — change the goal or admit it.

The rule prevents the easy escape route where every hard question becomes a permanent residual.

## Audit pass (mandatory cycle closer — at step 11)

The skill is *self-reporting* by design — author, evidence collector, and pessimistic re-scorer are the same context. To keep the trust gap narrow, every cycle ends with an *independent* auditor pass that the author cannot self-approve.

**How to invoke** (after step 10, before any "done" message to the user):

```
Agent(
  subagent_type: "progress-auditor",
  description: "Audit cycle close",
  prompt: "Audit the just-closed progress-guidance cycle.
    Domain: <domain>
    New phase file: docs/<domain>-status/<NN>-<date>-<slug>.md
    Run all seven passes (Schema / Reproducibility / Drift / Linguistic-weakness / Intent-Execution drift / Claim-mode integrity / Milestone-discipline integrity).
    Return VERDICT: PASS or VERDICT: FAIL with the defect list."
)
```

**Outcomes:**

- `VERDICT: PASS` — cycle closed. Report the verdict to the user.
- `VERDICT: FAIL` — cycle stays open. Fix every Severity-1 finding (Severity-2 may be deferred to next cycle), then re-invoke. Do not announce the cycle complete to the user until PASS is achieved. Do not argue with the auditor's verdict; if a finding is genuinely wrong, fix the artifact so the finding no longer applies.

**Why no override path:** the moment "PASS unless overridden" exists, every cycle becomes a PASS-with-override. Two outcomes only — PASS or FAIL — keeps the discipline honest. If the auditor is structurally wrong (e.g. checks a rule that no longer applies), the fix is to update the auditor agent or this skill, not to override a single verdict.

## Two-gate principle

A cycle closes only when **both** gates pass:

1. **Critic gate** (substantive) — did the phase ask and answer the right questions?
2. **Auditor gate** (discipline) — was what's written honest, reproducible, and complete in form?

Critic without auditor: well-questioned but possibly self-cheering reports. Auditor without critic: rigorously documented but possibly measuring the wrong thing. Both required, in this order.

## Correction phase (one-shot — between cycles, when intent drifted across cycles)

The two gates catch *within-cycle* dishonesty and *near-term* drift. They cannot catch the case where every cycle was honestly executed against §1.4 / §북극성 *as written*, but §1.4 / §북극성 *as written* turn out not to capture the real intent — usually realized only after several cycles when the user re-reads results and notices "this measures the wrong thing entirely". §<NN>.6.6 intent-execution reconciliation guards against *single-phase* drift; the correction phase guards against *foundation* drift discovered late.

When this happens, the fix is **not** to silently edit §1.4 / §북극성 / §N+1 M chain (auditor Pass 3 / Pass 7 catches that as drift). Nor is it to start a fresh project. The fix is a *correction phase* — a documentation-only cycle that:

1. Records what was discovered, when, and from what evidence (§<NN>.5.1).
2. Lays out old vs new intent side-by-side (§<NN>.5.2) — including *why* the old definition missed the real intent.
3. Amends §1.4 / §북극성 / §종착지 / **§N+1 M chain** explicitly, with §Decision chain trigger (§<NN>.5.3 / §<NN>.5.4).
4. Re-runs `progress-critic` `MODE: bootstrap` against the amended foundation if §1.4 / §북극성 rows / §종착지 §N.4 영역 / **M chain definitions** changed semantically (§<NN>.5.5).
5. **Re-runs Rule 9 retrospective** if any 1급 객체 (§북극성 / §종착지 §N.4 / M chain) changed semantically (§<NN>.5.7) — user-interactive coverage/sufficiency/faithfulness check, ambiguity surfaced as user choice.
6. Re-interprets prior cycles' verdicts under the amended definitions (§<NN>.5.6) — recorded in the correction file, *not* edited into prior phase files (sanitizing history breaks auditor Pass 3).

**Naming**: `docs/<domain>-status/<NN>.5-correction-<slug>.md` where `<NN>` is the most recently closed phase. The `.5` slot makes the file sort between §<NN> and §<NN+1> without colliding with phase numbers. The next normal phase continues as §<NN+1>.

**Template**: `templates/status-correction.md`. Copy and fill.

**Bootstrap critic re-run gate**: if §1.4 / §북극성 rows / §종착지 §N.4 영역 changed *semantically* (not just rewording), re-running `progress-critic` `MODE: bootstrap` is mandatory before §<NN+1> opens. Save the result to `docs/<domain>-status/<NN>.5-correction.critic.md`, fill responses, then `MODE: bootstrap-verify` until `VERDICT: PASS`. Pure rewording with no semantic shift skips the re-run but still requires §Decision chain entry.

**Code-change rule**: a correction phase produces *zero* code changes. Auditor will flag any non-`docs/` edits in the correction commit as a discipline violation — code work belongs in §<NN+1>, not in the correction.

**When to invoke**:

- Re-reading results from §<from>~§<current> reveals §1.4 doesn't match real intent.
- A 3-cycle limitation rule auto-fail recommends re-anchoring §북극성, and amending the row(s) accordingly.
- External input (paper / advisor / user discovery) reveals §종착지 §N.2 가능해진 행동 list misses the real target capability.
- A just-closed phase's §<NN>.6.8 = `REQUIREMENT-WRONG` — §<NN>.10 next-action explicitly trips the correction trigger. The amendment scope follows what the §<NN>.6.8 narrative identified as the misaligned requirement (a §북극성 row's threshold, §1.4 wording, §종착지 §N.4 영역 definition, etc.).
- **M chain amendment** — Rule 8 exit weakening / 새 conjunct / M 추가 / M 순서 변경 / sub-checkpoint partition 재정의. M-level 변경은 1급 객체 변경이므로 Rule 9 retrospection 재실행 必.
- **Auditor Pass 7 의 ≥3 cycle M-stagnation 또는 prerequisite-realism 위반** — M_i.j 가 ≥3 cycle 같은 conjunct 에서 진척 없음 → M_i.j 자체를 재정의하거나 §북극성 행을 re-anchor 하라는 신호.

**When *not* to use**:

- Within-cycle plan change → that's a `PIVOT` label in §<NN>.6.6, not a correction phase.
- Adding a new §북극성 row mid-project for a *new* concern (not amending an existing one) → ordinary §Decision chain entry suffices.
- Pure typo / wording cleanup with no semantic shift → just edit; no correction phase needed.

## Critical-evaluation checklist (mandatory each cycle)

- [ ] §North-Star table — at least one row's `현재` value changed *with measured evidence* (not assertion).
- [ ] §North-Star table — every row has non-empty `근거` and `시스템 영향` columns. Empty cells flagged `evidence pending: <reason>`.
- [ ] §Pessimistic re-score — at least one row was re-justified or downgraded. Downgrades cite a *specific* stricter reviewer assumption.
- [ ] No goal marked ✅ on the basis of "code shipped" alone — every ✅ has an outcome metric AND a system-impact note.
- [ ] Every new feature this cycle maps to a §North-Star row *and* a §종착지 §N.4 영역. Orphans flagged "scope creep?" in §residual issues.
- [ ] §0.3 next-action decision tree is *single-leveraged-action first*, not a flat to-do list.
- [ ] Pipeline §mapping table reviewed for affected stage(s). Re-rating happened or was explicitly judged unnecessary.
- [ ] No phase report claims progress without answering *"what changed observably at the system level?"*.
- [ ] **Pipeline §종착지 §N.5 변경 이력에 이번 cycle 행이 추가됨** (추가/구체화/축소/no-change 중 하나).
- [ ] 비전 *축소* 변경이 있었다면 status §Decision chain 에 trigger 항목 존재.
- [ ] Phase 파일 §<NN>.6.5 end-state delta 절이 §종착지 §N.5 변경과 일관된 서사를 제공.
- [ ] §종착지 §N.5 가 ≥3 cycle 연속 no-change 라면 — 정말 비전이 안 흔들렸나, 아니면 phase 가 비전과 무관하게 굴러갔나? 명시적으로 답함.
- [ ] Phase 파일 §<NN>.6.6 의도-실행 정합 라벨이 `MATCH` / `PIVOT` / `DRIFT` 중 하나로 명시. PIVOT 이면 §Decision chain 에 trigger + amendment entry 존재. DRIFT 라벨로 cycle 닫지 말 것.
- [ ] Phase 파일 §<NN>.6.7 claim mode 라벨이 `CONFIRMATORY` / `EXPLORATORY` / `MIXED` 중 하나로 명시.
- [ ] CONFIRMATORY (또는 MIXED 의 confirmatory 행) 청구 시: pre-spec commit hash 가 명시되고, 그 commit timestamp 가 첫 데이터 노출 commit 보다 이른지 git 으로 검증 가능 (`git log --format='%H %ci'` 비교).
- [ ] EXPLORATORY 청구 시: §<NN>.2 / §<NN>.3 / §<NN>.7 / §<NN>.0 TL;DR 어디에도 "증명" / "확인됨" / "검증됨" / "정량 증명" / "proven" / "confirmed" 등 confirmatory 단어 없음. 다음 cycle 의 confirmatory 검증 plan 이 §<NN>.10 에 명시.
- [ ] §<NN>.1 예상과 §<NN>.3 측정값 사이 의미 있는 차이가 있다면 §<NN>.6.8 에 `REQUIREMENT-WRONG` / `RESULT-INVALID` / `GENUINE-FINDING` 중 하나로 분류 명시. 셋 중 하나도 분류하지 않은 채 §북극성 갱신 금지.
- [ ] §<NN>.6.8 = `REQUIREMENT-WRONG` → 다음 cycle correction phase 트리거가 §<NN>.10 에 명시.
- [ ] §<NN>.6.8 = `RESULT-INVALID` → §<NN>.7 §북극성 갱신에 이 phase 측정값 반영하지 않음 (행 없음 또는 명시적 "측정 무효, 재측정 예정").
- [ ] §<NN>.6.8 = `GENUINE-FINDING` → §<NN>.6.7 라벨이 EXPLORATORY (또는 MIXED 의 해당 행). CONFIRMATORY 면 모순.
- [ ] **Phase 파일 §<NN>.6.4 마일스톤 진척 청구 절 존재 — 영향 받은 M_i.j + conjunct + advance/close 라벨 + close 라면 conjunction 만족 evidence 명시**.
- [ ] **Phase 가 advance 한 M_i.j 가 status §2.3 마일스톤 진척 표 active 행과 일치**. 다른 M.j 였다면 §Decision chain 에 gate-bypass trigger 존재.
- [ ] **M_i.j close 청구 시 모든 exit conjunct 가 §북극성 evidence 또는 reproducible measurement 로 ✅** — 단일 trigger 로 close 청구 금지.
- [ ] **M chain 정의 (pipeline §N+1) 가 amend 됐다면 §N+1.5 변경 이력 행 추가 + 1급 객체 retrospection 재실행 (correction phase 절차)**. Exit conjunct 의 *약화* 변경은 §Decision chain trigger 必.
- [ ] **§N+1 M chain 의 어느 conjunct 가 ≥3 cycle 같은 위치에 머물러 있다면** — 우회 경로 모색 / M.j 정의 amendment / §북극성 행 re-anchor 셋 중 하나로 답함.
- [ ] **1급 객체 (§북극성 행 / §종착지 §N.4 영역 / M chain) 가 amend 됐다면 retrospection 기록 (`00-bootstrap-retro.md` 또는 correction phase §<NN>.5.7) 존재** — coverage/sufficiency/faithfulness 셋이 사용자 verbatim 결정으로 닫혔는가.

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
- **Vision drift without ledger** — §종착지 §N.5 변경 이력이 빈 cycle. 비전이 자동으로 안 갱신된 것이 아니라 *기록을 빠뜨린 것* — 무엇이 바뀌었거나 정말 no-change 인지 행을 추가하라.
- **Vision-loosening (post-hoc relaxation)** — phase 결과를 ✅로 만들기 위해 §종착지 §N.2 가능해진 행동에서 항목을 슬그머니 빼거나 §N.3 의도적 제외로 옮기는 패턴. trigger 가 §Decision chain 에 없다면 거부.
- **Frozen vision while shipping** — §종착지 §N.5 ≥3 cycle 연속 no-change 인데 phase 는 계속 ship 됨. phase 가 비전과 무관하게 굴러가고 있거나 (scope creep), 비전 갱신을 매번 빠뜨리고 있거나 둘 중 하나. 어느 쪽인지 답하라.
- **Phase orphaned from vision** — phase scope 가 §종착지 §N.4 영역 어느 줄에도 매핑되지 않음. 매핑하거나, 비전을 확장하거나, scope creep 으로 표기.
- **DRIFT label cycle close attempt** — §<NN>.6.6 = `DRIFT` 인 채로 cycle 닫으려 함. PASS 차단. 작업 재개해 `MATCH` 로 끌어올리거나, §Decision chain entry 추가해 `PIVOT` 으로 재라벨.
- **Hidden PIVOT** — §<NN>.6.6 = `MATCH` 인데 데이터 소스 / sample size / §북극성 행이 §<NN>.1 과 다름. 자기합리화. auditor Pass 5 가 Severity-1 로 잡는다.
- **Silent correction** — §1.4 / §북극성 / §종착지 영역이 변경됐는데 correction phase file 없음. 변경의 *발견 경위* 가 어디에도 안 남으면 다음 세션이 amended 정의의 근거를 잃는다. Auditor Pass 3 가 Severity-1 로 잡고, correction phase 작성을 강제한다.
- **Hidden HARKing** — phase 가 새 측정 기준/임계/필터를 도입했고 §<NN>.6.7 = `CONFIRMATORY` 라고 청구했지만 pre-spec commit timestamp 가 첫 데이터 노출 commit 보다 *늦거나* 존재하지 않음. 데이터를 보고 기준을 정한 결과를 검증으로 청구하는 패턴. auditor Pass 6 Severity-1.
- **Mode-language mismatch** — §<NN>.6.7 = `EXPLORATORY` 인데 §<NN>.2 / §<NN>.3 / §<NN>.7 / §<NN>.0 TL;DR 에 "증명" / "확인됨" / "검증됨" / "정량 증명" 등 confirmatory 단어가 등장. 라벨은 정직한데 본문이 청구 등급을 부풀림. auditor Pass 6 Severity-1.
- **Silent divergence absorption** — §<NN>.1 예상과 §<NN>.3 측정값이 명백히 다른데 §<NN>.6.8 절이 비어 있거나 "차이 있음" 류 한 줄로 회피. REQUIREMENT-WRONG / RESULT-INVALID / GENUINE-FINDING 중 분류 안 함 → 다음 cycle 이 어느 갈래로 후속할지 결정 불가. auditor Pass 6 Severity-1.
- **Confirmatory-claim-on-genuine-finding** — §<NN>.6.8 = `GENUINE-FINDING` (예상 못 한 결과) 인데 §<NN>.6.7 = `CONFIRMATORY`. 사후 발견을 사전 검증으로 둔갑. auditor Pass 6 Severity-1.
- **Result-invalid leak** — §<NN>.6.8 = `RESULT-INVALID` (측정 자체 무효) 라고 분류해놓고 §<NN>.7 §북극성 갱신에 그 phase 의 측정값을 반영. 무효 청구를 §북극성 evidence 로 사용하는 자기모순. auditor Pass 6 Severity-1.
- **M-orphaned phase** — phase scope 가 §N+1 M chain 의 어느 M_i.j conjunct 에도 매핑되지 않음 (§<NN>.6.4 누락). 매핑하거나 scope creep 으로 표기. auditor Pass 7 Severity-1.
- **Hidden gate-bypass** — phase 가 M_{i+1} 작업을 했는데 M_i 가 아직 open, 그리고 §Decision chain 에 gate-bypass trigger 도 없음. checkpoint chain 의 prerequisite 약속이 침묵으로 깨지는 것. auditor Pass 7 Severity-1.
- **Premature M close** — phase 가 M_i.j close 청구를 했지만 exit criterion conjunction 의 일부 conjunct evidence 가 *없거나* 모호. 단일 trigger 로 close 자축. auditor Pass 7 Severity-1.
- **Exit criterion silent weakening** — pipeline §N+1 의 M_i.j exit conjunct 정의가 cycle 도중 약화 (임계 ↓ / conjunct 제거 / 측정 방식 교체) 됐는데 §Decision chain trigger 없음. 마일스톤 판 vision-loosening. auditor Pass 7 Severity-1.
- **Skipped retrospective** — 1급 객체 (§북극성 행 / §종착지 §N.4 / M chain) 가 amend 됐는데 retrospection 기록 (bootstrap retro 또는 correction phase §<NN>.5.7) 없음. 다음 cycle 이 amended 정의가 사용자 요구를 진짜 cover 하는지 모르는 상태로 굴러간다. auditor Pass 7 Severity-1.
- **Auto-resolved ambiguity** — Rule 9 retrospective 에서 ambiguity 가 발견됐는데 사용자에게 가져가지 않고 스킬이 자체 판단으로 결정. retrospection 파일에 사용자 verbatim 응답이 없으면 = Auto-resolved. auditor Pass 7 Severity-1.
- **Frozen milestone while shipping** — M_i.j 가 ≥3 cycle 같은 conjunct 에서 진척 없는데 phase 는 계속 ship 됨. M_i.j 정의가 unreachable 이거나, phase 가 다른 M 으로 슬그머니 이동했거나 둘 중 하나. 어느 쪽인지 답하라.

## Templates (in `templates/`)

- `status-core.md` — start here for the status doc (includes §2.3 milestone progress)
- `status-section.md` — copy per phase (includes §<NN>.6.4 milestone progress claim)
- `status-correction.md` — copy when intent drifts across cycles (between-cycle correction phase, §<NN>.5 slot; includes §<NN>.5.7 Rule 9 retrospective)
- `pipeline-core.md` — start here for the pipeline doc (includes §N+1 milestone checkpoint chain)
- `pipeline-stage.md` — copy per pipeline stage when depth exceeds ~200 lines

**bootstrap-retro 파일 구조** (template 별도 파일 없음 — `00-bootstrap-retro.md` 로 직접 작성):

```
# Bootstrap Retrospective — <domain> (<date>)

## Coverage 매핑 (1급 객체 ↔ §1.4 / §종착지 §N.2)
| 1급 객체 항목 | §1.4 substring | §종착지 §N.2 줄 | 사용자 verdict |

## Sufficiency 점검
- 빠진 §1.4 측면: <사용자 verbatim 응답>
- 빠진 §종착지 §N.2 행동: <사용자 verbatim 응답>

## Faithfulness 점검 (proxy 의심 항목)
- <항목>: 측정 방식 = <...>, 사용자 verdict = <verbatim>

## 사용자 결정 (ambiguity 처리)
- <질문>: 옵션 A / B / C / 사용자 선택 = <verbatim>

## Commit
- 위 결정에 따라 §북극성 / §종착지 / §N+1 M chain 갱신 완료. 변경의 source = 본 retro 파일.
```

**Correction-phase 의 §<NN>.5.7 retrospective 절** (status-correction.md 에 동일 구조 포함 — 1급 객체 변경이 일어난 모든 correction phase 에 必).

## Reference example

`examples/svc-migration/` — a fictional service-migration project demonstrating the format end-to-end. All metrics, decisions, and file paths are illustrative. Copy *templates/* (not examples) when starting a new domain; read examples to absorb the rhythm.

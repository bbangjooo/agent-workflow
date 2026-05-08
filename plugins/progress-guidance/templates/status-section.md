# §<NN> — <제목> (<YYYY-MM-DD>)

> Core: [`docs/<domain>-status.md`](../<domain>-status.md) §<NN>
> 직전 phase: [§<prev>](<prev-NN>-<prev-slug>.md)
> Pipeline 영향: [`docs/<domain>-pipeline.md`](../<domain>-pipeline.md) §<해당 stage>

## <NN>.0 한 단락 요약 (TL;DR)

<3-5 lines — 새 세션이 이 파일 하나만 봐도 맥락이 잡히게.
무엇을 했고, 어떤 §북극성 행을 움직였고, 결과의 신뢰도는 얼마인가.>

## <NN>.1 왜 이 작업을 했나

- 어떤 §북극성 행을 움직이려는 의도였나?
- 직전 cycle의 어떤 발견에서 trigger 됐나?
- 대안은 무엇이었고 왜 이 길을 골랐나?

## <NN>.2 무엇을 만들었나

| 작업 | 위치 | LOC | 검증 산출물 (파일/테스트) |
|---|---|---|---|

## <NN>.3 검증 (근거)

각 항목에 *재현 가능한* 명령/파일 경로/수치를 함께 적을 것.

- 단위 테스트: `<test-name> → PASS/FAIL` (commit/branch)
- 실 데이터 검증: `<command> → <numeric output>` (파일 경로)
- 외부 검증 (벤치마크 / OOS / paper):

## <NN>.4 결과 vs 가설

| 가설 | 실제 측정값 | 차이 사유 |
|---|---|---|

## <NN>.5 발견된 부수 이슈

phase 진행 중 관찰됐지만 이번 사이클에 *고치지 않은* 것. 잊으면 영구 부채.

- 

## <NN>.6 시스템 영향 분석 ★

근거(§<NN>.3)가 *did this happen?* 이라면, 이 절은 *does it matter?* 를 답한다.

- 이 phase 이전: <관찰 가능한 시스템 상태>
- 이 phase 이후: <관찰 가능한 시스템 상태>
- 실제로 가능해진 행동:
  - 
- 실제로 불가능해진 행동:
  - 
- downstream 영향 (다른 component / 사용자 / process):
  - 
- 사용자/외부 관찰자에게 보이는가?:
  - 보이면 어떻게:
  - 안 보이면 *왜 그래도 의미가 있나* (예: enables future phase X):

> 만약 위 모든 항목이 비어 있다면 이 phase는 *invisible progress*. infrastructure-only 라고 명시 표기하고, *어떤 future phase를 가능하게 하는지* 정확히 적을 것. 그조차 못 적으면 phase 자체를 재고.

## <NN>.6.4 마일스톤 진척 청구 (Milestone Position) ★

§<NN>.6 시스템 영향이 *이번 phase 의 즉시 효과* 라면, 이 절은 *이 phase 가 어느 M_i.j 의 어느 exit conjunct 를 advance 또는 close 했는가*. checkpoint chain 의 진척이 phase 단위로 누적되는 곳 — 자축 차단의 핵심.

**영향 받은 M_i.j**: `M<i>-<j>` (status §2.3 active 와 일치하는가? 다르면 gate-bypass)

**라벨**: _<ADVANCE | CLOSE>_

**대상 exit criterion conjunct**:

| conjunct | 이전 상태 | 이번 phase 후 상태 | 근거 (file/command/commit/§북극성 행 + 갭=0) |
|---|---|---|---|
|  | ⏳ / ❌ | ⏳ / ✅ |  |

**라벨 근거 (라벨별 필수 내용)**:

- `ADVANCE` — 일부 conjunct 만 ✅ 로 진척. 다른 conjunct 는 여전히 ⏳/❌. 이 phase 가 *어느 conjunct 를 닫고 어느 conjunct 를 못 닫았나* 를 위 표로 명시.
  - 다음 phase 가 닫아야 할 conjunct: <리스트>

- `CLOSE` — M_i.j 의 *모든* exit conjunct 가 ✅ 로 만족. 단일 trigger 로 close 청구 금지 — 모든 conjunct 행이 위 표에 evidence 와 함께 채워져야 한다.
  - **모든 conjunct ✅ 확인** [ ] (auditor Pass 7 이 재검증)
  - status §2.3 M 진척 표에서 이 M_i.j 행을 `closed` 로 갱신 [ ]
  - 이 M_i.j 가 M_i 의 마지막 sub 였다면 M_i 도 closed 로, M_{i+1} 의 첫 sub 가 active 로 전환 [ ]

**Prerequisite gate 상태**:

- 이 M_i.j 의 parent M_i 의 prerequisite (M_{i-1}) 상태: <closed / open / N/A (i=1)>
- 만약 M_{i-1} 이 *open* 인데 M_i 작업을 했다면 — status §Decision chain 의 gate-bypass trigger entry 인용:
  - `<§Decision chain entry NN — 인용 한 줄>`
  - 인용 못 하면 = hidden gate-bypass = auditor Pass 7 Severity-1.

> Phase 가 *어느 M.j 에도* 매핑되지 않으면 (이 절 비워둠) → M-orphaned phase. scope creep 으로 §residual issues 에 표기하거나, M chain amendment (correction phase) 후 매핑.
>
> auditor Pass 7 이 위 표의 conjunct evidence 를 재현 검증한다 (file Read / Bash 실행 / commit 존재 확인).

## <NN>.6.5 종착지 비전 갱신 (end-state delta) ★

§<NN>.6 시스템 영향이 *이번 phase의 즉시 효과*라면, 이 절은 *이 phase가 종착지 그림을 어떻게 다시 그리게 했는가*.

- 이 phase 이전 비전 (pipeline §종착지 §N.4 표 직전 상태):
  - 
- 이 phase 이후 비전 (pipeline §종착지 §N.4 표 갱신 후):
  - 
- Delta:
  - **추가/구체화된 항목**: <pipeline §N.5 변경 이력에 추가한 행 인용>
  - **제거/포기된 항목**: <있다면 — *왜 포기했나*는 status §Decision chain에 trigger 항목이 있어야 한다. 없으면 post-hoc relaxation>
  - **그대로 유지된 항목**: <왜 안 흔들렸는가 — 정말 phase 결과가 그 항목에 영향이 0이었나?>
- pipeline §N.5 변경 이력에 이번 cycle 행 추가됨? [ ]
- Delta = no-change 라면 사유 (정말 비전이 한 줄도 안 움직였나? 그렇다면 이 phase는 무엇을 향해 갔나?):

> Delta = no-change 가 ≥3 cycle 연속이면 critic이 자동으로 vision-stagnation 플래그를 띄운다. 이 phase가 정말 비전과 *무관하게* 굴러간 것인지 — 아니면 비전 갱신을 빠뜨린 것인지 — 판단해서 적을 것.

## <NN>.6.6 의도-실행 정합 (Intent-Execution Reconciliation) ★

§<NN>.1 에서 *세운 의도*와 §<NN>.2~§<NN>.6 에서 *실제 실행한 결과*가 일치하는가? 본인 입장에서 자명해 보여도 *세 라벨 중 하나를 명시*. 자기합리화는 여기서 차단된다.

**라벨**: _<MATCH | PIVOT | DRIFT>_

**§<NN>.1 의도 한 줄 요약**:

<어떤 §북극성 행을 / 어떻게 / 어떤 §종착지 영역 reshape 의도였나>

**§<NN>.2~§<NN>.6 실행 한 줄 요약**:

<무엇을 만들었고 어떤 §북극성 행에 무슨 측정이 들어갔나 — 데이터 소스 / sample size / §북극성 행 명시>

**라벨 근거**:

- `MATCH` — 두 줄이 의미적으로 동일한가? 동일한 §북극성 행 + 동일한 데이터 소스 + 의도한 측정 모두 실행됨. 미묘한 데이터 소스 변경 / sample size 축소 / 측정 범위 축소 등이 있다면 MATCH 가 아니라 PIVOT.
- `PIVOT` — phase 진행 중 새 발견으로 의도가 의도적으로 변경됨. **status §2 §Decision chain entry 필수** (이번 cycle 에 추가): trigger ("X 발견") + amendment ("의도를 Y에서 Z로 전환"). 정상 흐름이지만 형식상 명시.
- `DRIFT` — 의도와 실행이 어긋났는데 §Decision chain trigger 도 없음. **이 라벨은 phase PASS 차단** — 작업 재개해서 의도 충족시키거나, 의도를 명시적으로 축소/변경한 뒤 PIVOT 으로 전환할 것.

> auditor Pass 5 가 §<NN>.1 ↔ §<NN>.2~§<NN>.6 의 *의미적 정합*을 별도로 확인한다. MATCH 라벨인데 데이터 소스 / sample size / §북극성 행이 의도와 다르면 Severity-1.

## <NN>.6.7 Claim Mode (청구 등급) ★

§<NN>.6.6 가 *의도와 실행이 일치했나* 라면, 이 절은 *그 결과 청구가 confirmatory 등급인가 exploratory 등급인가*. 두 질문은 직교 — MATCH 인 채로도 EXPLORATORY 일 수 있고, MATCH 인 채로 CONFIRMATORY 도 가능. 어느 쪽인지 본인 입장에서 자명해 보여도 *세 라벨 중 하나를 명시*.

**라벨**: _<CONFIRMATORY | EXPLORATORY | MIXED>_

**라벨 근거 (라벨별 필수 내용)**:

- `CONFIRMATORY` — 가설/기준이 *데이터를 보기 전*에 commit 된 상태에서, 사전에 못 본 데이터로 측정한 결과.
  - **Pre-spec commit hash**: `<commit-hash>` (가설/기준이 박힌 commit)
  - **Pre-spec commit timestamp**: `<YYYY-MM-DD HH:MM:SS>` (`git log -1 --format='%ci' <hash>` 결과)
  - **첫 데이터 노출 commit hash**: `<commit-hash>` (이 phase 에서 처음으로 측정 데이터 / 결과를 본 commit)
  - **첫 데이터 노출 timestamp**: `<YYYY-MM-DD HH:MM:SS>`
  - Pre-spec timestamp < 첫 데이터 노출 timestamp 임을 본인이 확인. (auditor 가 `git log` 로 재검증.)

- `EXPLORATORY` — 데이터를 보고 가설/기준을 정했거나 사후 조정한 청구. (위 timestamp 증거를 제공할 수 없는 경우는 자동으로 이 등급.)
  - **금지 단어 체크**: §<NN>.0 TL;DR / §<NN>.2 / §<NN>.3 / §<NN>.7 어디에도 "증명" / "확인됨" / "검증됨" / "정량 증명" / "proven" / "confirmed" 단어가 사용되지 않았음을 본인이 확인. (auditor 가 grep 으로 재검증.)
  - **다음 cycle confirmatory 검증 plan**: §<NN>.10 에 holdout / 새 데이터 / pre-commit 된 기준 위에서 재측정 plan 명시.

- `MIXED` — 같은 phase 안에 두 등급의 청구가 공존. *어느 청구가 어느 등급인지* 행 단위 분리표 필수:
  - | 청구 행 (§북극성 / §<NN>.3 항목) | 등급 | 등급 근거 (위 CONFIRMATORY/EXPLORATORY 형식 따라 행별로) |
  - |---|---|---|
  - |  |  |  |

> 자기진단 한 줄: "이번 phase 의 청구가 confirmatory 등급으로 통과되려면 데이터를 보기 전 어느 commit 이 가설/기준을 박아두었나?" 답을 못 대면 EXPLORATORY 가 정직.
>
> auditor Pass 6 이 timestamp 순서와 단어 사용을 별도로 검증한다.

## <NN>.6.8 Requirement-Result Divergence (조건부) ★

> **언제 작성**: §<NN>.1 의 의도/요구사항/예상치와 §<NN>.3 의 실제 측정값이 *의미 있게* 다르면 (수치 큰 차이 / 가설 기각 / 기준 대량 미달 / 예상 못 한 분포 / 등). 차이가 미미하거나 정상 범위면 "해당 없음 — 사유: <한 줄>" 로 닫고 다음 절로.
>
> **차이가 의미 있는데 침묵 흡수하면 (이 절 비워두고 §북극성 갱신으로 넘어가면) auditor Pass 6 가 Severity-1**.

**§<NN>.1 예상**:

- 

**§<NN>.3 실측**:

- 

**갈래 분류 (셋 중 하나 명시)**: _<REQUIREMENT-WRONG | RESULT-INVALID | GENUINE-FINDING>_

**분류 근거 (라벨별 필수 내용)**:

- `REQUIREMENT-WRONG` — 요구사항/기준/의도가 실제 의도를 못 잡았음 (측정 편의로 정한 임계, §1.4 와 어긋난 가설, 사후에 보니 §북극성 행 정의 자체가 부적합).
  - **무엇이 잘못 정의돼 있었나**: <한 줄>
  - **왜 진작 안 보였나** (bootstrap critic / cycle critic 통과한 이유): <한 줄>
  - **다음 cycle correction phase 트리거**: §<NN>.10 에 명시. amendment scope = <§1.4 / §북극성 행 / §종착지 §N.4 영역 / 기준 임계 중 하나 이상>.

- `RESULT-INVALID` — 측정/데이터 품질 문제 (look-ahead, sample 누락, pipeline 버그, 비교군 실수).
  - **무효 사유**: <한 줄 — 무엇이 측정을 오염시켰나>
  - **§<NN>.7 §북극성 갱신에서 이 측정값 제외**: 확인 [ ]
  - **재측정 plan**: §<NN>.10 에 명시.

- `GENUINE-FINDING` — 측정은 정상, 결과가 예상과 다른 진짜 발견.
  - **§<NN>.6.7 라벨이 EXPLORATORY 또는 MIXED 의 EXPLORATORY 행임**: 확인 [ ] (CONFIRMATORY 면 자기모순 — 사후 발견을 사전 검증으로 청구하는 것)
  - **다음 cycle confirmatory 검증 plan**: holdout / 새 데이터 / pre-commit 기준 위에서 재측정. §<NN>.10 에 명시.

> 셋 중 어느 하나도 자신 있게 분류 못 하겠다면 가장 보수적인 RESULT-INVALID 를 가정하고 재측정. "셋 다 일부씩" 도 가능 — 그 경우 갈래별로 어느 행이 어디 속하는지 분리해서 적을 것.

## <NN>.7 §북극성 갱신 (이 cycle 이후)

- 어떤 row가 어떻게 움직였나?
- 갭이 줄었나? *어떻게 측정했나?* (코드 ship vs 메트릭 변화)
- 줄지 않았다면 사유 — 다음 cycle 의사결정에 반영.

## <NN>.8 §pipeline 매핑 영향

- 이 phase로 어느 stage의 부합도가 변했나? (◎/○/△/✗ 변화)
- pipeline §매핑 표 갱신 완료? [ ]
- 새 함정 / 메트릭이 학습됐다면 pipeline §X.2 (signals) / §X.3 (mistakes)에 반영했나? [ ]

## <NN>.9 비관 재채점 — 이 phase 자체

> 적대적 리뷰어가 본다면 이 phase 산출물 중 무엇이 *과대평가*인가?

- 

## <NN>.10 다음 1행동

- 단일 최우선 행동:
- 의사결정 트리 (status §0.3에 동기화):

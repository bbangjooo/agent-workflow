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

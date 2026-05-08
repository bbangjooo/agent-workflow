# <Domain> 파이프라인 — 학습 & 코딩 레퍼런스

> Paired with: `docs/<domain>-status.md` (작업 기록)
> 절별 디테일이 ~200 lines를 넘으면 `docs/<domain>-pipeline/` 하위 파일로 분리, 코어엔 5-line 요약 + 링크.

---

## 0. 전체 흐름 한눈에

```
1. <stage 1>           │  <한 줄 정의 — "왜 이 단계가 있어야 하나">
2. <stage 2>           │
3. <stage 3>           │  ★
4. <stage 4>           │
...
N. <stage N>           │  ★
```

**기억해야 할 ★ 핵심 단계** — 이게 무너지면 나머지가 다 의미 없다:

- §<x> <stage> — <왜 critical 한가>
- §<y> <stage>

> ### MVP-first 권장
>
> 풀 / 산출물이 작은 시점에선 *단순 모드*가 *full 파이프라인*보다 빠르고 안전하다.
>
> 1. **§? ~ §? 를 단순 모드로** — <도메인-특화 simplification>
> 2. **§? <gate>** — <Phase 2 진입 조건>
> 3. **§? <signal>** — <Phase 1 한계 도달 신호>
>
> 본 프로젝트의 Phase 1 / Phase 2 정의: `<domain>-status.md` §<해당 절> 참조.

### MVP / Full 활성표 (over-engineering 방지)

| § | MVP (Phase 1) | Full (Phase 2) |
|---|---|---|

### <목표 도달 메커니즘> ★

<목표 달성에 필요한 5-7 메커니즘. 이게 곧 status §북극성과 짝.>

1. **<메커니즘 1>** (§? 보강): <설명>
2. **<메커니즘 2>** (§? 보강): <설명>
3. **<메커니즘 3>** (§? 보강): <설명>
4. **<메커니즘 4>** (§? 보강): <설명>
5. **<메커니즘 5>** (§? 보강): <설명>

이 메커니즘 모두 갖춰야 *지속 가능한* 목표 달성. 본 프로젝트:
- 1번 ✅/⚠️/❌ — <근거>
- 2번 ...

---

## 1. <Stage 1 이름>

### 1.1 무엇을 하는 단계인가
### 1.2 좋은 입력의 신호 / 봐야 할 메트릭
### 1.3 자주 하는 실수 (함정)
### 1.4 코드 관점

(이 단계의 디테일이 ~200 lines를 넘으면 → `docs/<domain>-pipeline/01-<slug>.md`로 분리, 이곳엔 5-line 요약 + 링크만)

---

## 2. <Stage 2 이름>

### 2.1 무엇을 하는 단계인가
### 2.2 좋은 입력의 신호 / 봐야 할 메트릭
### 2.3 자주 하는 실수 (함정)
### 2.4 코드 관점

---

## ... (§3 ~ §N — 동일 4-블록 구조)

---

## N. 종착지 시스템 모양 (Projected End-State) ★

> status §북극성이 *지표*라면, 이곳은 *시스템 모양*. "이 프로젝트가 끝났을 때 시스템은 *무엇이고, 무엇을 가능하게 하는가*"의 현재 최선의 그림.
>
> 매 cycle 갱신 (또는 unchanged 명시). 이 비전이 모호하면 phase가 좁은 §북극성 행만 보고 길을 잃는다. 반대로 이 비전이 매 cycle 흔들림 없이 동일하다면 — 정말 phase 결과가 비전을 한 번도 구체화/축소시키지 않았는가? 의심.

### N.1 종착지 시스템 도해

<텍스트/ASCII 도해 — 어떤 컴포넌트가 어떤 인터페이스로 어떤 데이터를 흘리는가. 한눈에 시스템 모양이 보이게.>

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│  <comp>  │───▶│  <comp>  │───▶│  <comp>  │
└──────────┘    └──────────┘    └──────────┘
```

### N.2 종착지에서 가능해진 *행동* (관찰 가능)

비전은 "X 컴포넌트가 있다"가 아니라 "사용자가 X를 할 수 있다"로 적는다.

- 사용자가 <행동 1>을 할 수 있다 (현재는 불가 / 부분 가능)
- 운영자가 <행동 2>를 모니터링할 수 있다
- 시스템이 <행동 3>을 자동으로 수행한다
- ...

### N.3 종착지에 *없는* 것 (의도적 제외)

비전 인플레이션 방지. "종착지인데 없는 것"을 명시하지 않으면 매 cycle 비전이 슬그머니 부풀어오른다.

- ✗ <기능 A> — <왜 빼는가: scope / 기술 / 우선순위 사유>
- ✗ <기능 B> — <왜 빼는가>

### N.4 비전 vs 현재 — 갭 요약

`status §북극성`이 *수치 갭*이라면, 이 표는 *모양 갭*.

| 영역 | 종착지 모습 | 현재 모습 | 이번 cycle delta |
|---|---|---|---|
| <영역 1> | <한 줄> | <한 줄> | <추가/구체화/축소/no-change> |

### N.5 비전 변경 이력 ★

매 cycle, 비전이 어떻게 갱신됐는지 누적 기록. *비전을 줄이는* 변경은 §status Decision chain에 trigger가 있어야 한다 (post-hoc relaxation 방지).

| Cycle | 일자 | 변경 분류 | 변경 내용 | Trigger (왜 바뀌었나) |
|---|---|---|---|---|
| <NN> | <YYYY-MM-DD> | <추가 / 구체화 / 축소 / no-change> | <한 줄> | <phase 결과 / 외부 발견 / 사용자 결정> |

> Delta = no-change 가 ≥3 cycles 연속이면 의심. 정말 비전이 안 움직였나, 아니면 phase가 비전과 무관하게 굴러갔나?

---

## N+1. 마일스톤 체크포인트 체인 (Milestone Checkpoint Chain) ★

> §종착지가 *최종 시스템 모양* 이라면, 이 절은 *그 모양에 도달하는 경로 위 시간순 mile post*. **M_1 → M_2 → ... → M_N → §종착지**. M_i 는 M_{i+1} 의 *prerequisite* (logical/technical dependency, 단순 시간 순서 아님). Rule 8 참조.
>
> 이 절은 *정적 정의* — 사용자 합의로 박힌 M chain. *동적 진척* 은 `<domain>-status.md §2.3 마일스톤 진척` 에서 추적. 정의 변경 (M 추가/제거/exit conjunct 변경) 은 §N+1.5 변경 이력 + Rule 9 retrospective 재실행 必.

### N+1.0 사용자 verbatim 합의 (Bootstrap step 6.5 인용)

> "<사용자가 마일스톤 sequence 를 말한 원본 문장 — 변형 없이 인용>"

### N+1.1 M chain 도해

```
[현재] ─→ M1 ─→ M2 ─→ M3 ─→ ... ─→ MN ─→ [§종착지]
        │       │       │              │
       <한줄> <한줄> <한줄>           <한줄>
```

### N+1.2 M_i 정의 표

| M_i | 이름 / 한 줄 정의 | exit criterion conjunction (AND) | prerequisite (왜 M_{i-1} 이 prerequisite 인가) | §종착지 §N.4 영역 coverage |
|---|---|---|---|---|
| M1 | <이름> | (§북극성 행 X ≥ <임계>) ∧ (재현 가능 측정 Y) ∧ (...) | N/A (첫 마일스톤) | <§N.4 어느 영역들> |
| M2 | <이름> | (...) ∧ (...) ∧ (...) | <왜 M1 close 가 M2 시작의 logical 전제인가 — 단순 순서 X> | <§N.4 어느 영역들> |
| ... |  |  |  |  |

> 모든 conjunct 가 *측정 가능* (§북극성 행 evidence 또는 reproducible measurement). 모호한 conjunct ("충분히", "안정적으로", "잘") 금지 — bootstrap critic milestone-exit-measurability 가 즉시 fail.
>
> prerequisite 칸이 "M1 이 시간상 먼저" 같은 ordering rationale 이면 partition 모델로 의심 — 진짜 logical/technical dependency 인지 사용자에게 확인.

### N+1.3 M_i ↔ §종착지 §N.4 영역 cross-tab

| §종착지 §N.4 영역 | M1 | M2 | M3 | ... | cover 종합 |
|---|---|---|---|---|---|
| <영역 1> | partial | full |  |  | M1+M2 |
| <영역 2> |  | partial | full |  | M2+M3 |

> 모든 §N.4 영역이 *최소 한 M_i* 에 의해 cover 되어야 한다 (Rule 8 M-set exhaust). 빈 행 = M chain 정의 incomplete = correction phase 트리거.

### N+1.4 Sub-checkpoint partitioning (선택)

M_i 가 큰 경우 sub-checkpoint M_i.j (alphabetical: M1-A, M1-B, ...) 로 분해. M_i 안의 sub 는 *partition 스타일* — disjoint sub-capability, parallel 가능. M_i close = 모든 sub 가 closed.

```
M1 = M1-A ∪ M1-B ∪ M1-C ∪ ... (disjoint sub-capabilities)
```

| M_i.j | 이름 | exit conjunct (작은 conjunction) | parallel 가능? | 비고 |
|---|---|---|---|---|
| M1-A | <한 줄> | (...) ∧ (...) | ✓/✗ |  |

### N+1.5 M chain 정의 변경 이력

매 *정의 amend* 마다 행 추가. 정의 변경 없는 cycle 은 행 추가 안 함 (진척 변화는 status §2.3 에서). Exit conjunct 의 *약화* 변경은 §Decision chain trigger 必 — 없으면 auditor Pass 7 Severity-1 (exit weakening).

| Cycle | 일자 | 변경 분류 | 변경 내용 | Trigger (왜 amend 했나) | Rule 9 retrospective 파일 |
|---|---|---|---|---|---|
| 00 | <YYYY-MM-DD> | 추가 | M chain 첫 정의 | Bootstrap step 6.5 사용자 합의 | `docs/<domain>-status/00-bootstrap-retro.md` |

> 변경 분류: `추가 / 구체화 / 약화 / 순서 변경 / sub-partitioning 재정의 / no-change`.
> *약화* (임계 ↓ / conjunct 제거 / 측정 방식 교체) 는 §Decision chain trigger 와 retrospection 둘 다 必.

---

## N+2. 이 프로젝트가 위 틀에 얼마나 부합하는가

총평: <1-2 lines — 어느 단계가 강하고, 어느 단계가 약한가>

### N+2.1 단계별 평가

| 단계 | 부합도 | 구현 위치 / 한계 | 근거 |
|---|---|---|---|
| 1. <stage 1> | <◎/○/△/✗> | <evidence + 파일 경로> | <테스트/메트릭/측정값> |
| 2. <stage 2> | <> | <> | <> |
| ... |  |  |  |

범례: ◎ 우수 / ○ 양호 / △ 부분 / ✗ 미구현

### N+2.2 가장 잘된 부분 (학습 시 참고할 가치)

1. **§<X>** — <근거>
2. **§<Y>** — <근거>

### N+2.3 메꿔야 할 갭 (이 문서 기준)

1. 
2. 

### N+2.4 한 문장 요약

> 

---

## 동기화 알림 ★

이 §매핑 표 + §종착지 시스템 모양은 status §북극성 + status §비관 재채점과 *반드시 동기화*. 한쪽만 갱신되면 doc 발산. status 코어 §14 동기화 체크리스트 참조.

매 cycle:
- `근거` 칼럼이 비어 있으면 cycle 미완료.
- §종착지 시스템 모양 §N.5 변경 이력에 이번 cycle 행이 추가되어야 함 (no-change 도 명시 행으로).
- 매 phase 파일은 자기 §end-state delta 절을 통해 *어느 항목을* 어떻게 움직였는지 가리켜야 함.

---

## 부록 A. <도메인> 코드 작성 시 체크리스트

```
□ 
□ 
□ 
```

## 부록 B. <도메인-특수 OOS / 검증> 체크리스트

```
□ 
```

## 부록 C. <도메인 카탈로그> (taxonomy)

<업계 표준 분류 — "본 프로젝트가 어디에 위치하는가" 식별용.>

# <Domain> — 작업 기록 (status core)

> Paired with: `docs/<domain>-pipeline.md` (방법론 레퍼런스)
> 절별 디테일은 `docs/<domain>-status/` 하위 파일 참조.
> 코어가 §0 / §1 / §North-Star / §pessimistic / §LOC summary를 *반드시* 인라인으로 들고 있어야 한다 (서브파일에 숨기지 말 것).

---

## ▶ 0. 다음 세션 시작 지점

### 0.1 마지막 갱신
*날짜:*
*요약 (3 lines):*

### 0.2 현재 운영 상태 (확인 명령 포함)

```bash
# 새 세션이 그대로 복붙해서 상태 확인 가능해야 한다
# 예: 프로세스 살아있나, 최근 산출물 mtime, 메트릭 현재값
```

### 0.3 가장 먼저 할 일 (의사결정 트리)

- [ ] **단일 최우선 행동:**
- 그 다음:
  - 만약 X면 → A
  - 만약 Y면 → B

### 0.4 살아있는 산출물 (직전 세션 결과)

| 항목 | 위치 | 상태 | 근거 |
|---|---|---|---|

### 0.5 알려진 잔여 이슈

- 

### 0.6 컨텍스트 복원 순서 (이 문서를 처음 보는 세션)

1. 본 §0 (이 블록)
2. §1 사용자 목표
3. §11 한 페이지 요약 (TL;DR)
4. **`<domain>-pipeline.md` §종착지 시스템 모양** — *어디로 가고 있나*
5. **`<domain>-pipeline.md` §N+1 마일스톤 체크포인트 체인** — *어느 체크포인트가 active 인가*
6. §2.3 마일스톤 진척 — *현재 어느 M.j 에서 무엇을 닫아야 하나*
7. §12 북극성 표 — *얼마나 갔나*
8. 가장 최근 phase 파일 (`docs/<domain>-status/` 마지막 항목) — *직전에 뭘 했나*

### 0.7 동반 문서 (외부 참조)

- `docs/<domain>-pipeline.md` — 방법론 레퍼런스
- 외부 출처: <제목, 위치>

---

## 1. 출발점 — 사용자 목표

### 1.1 현재 운용 상태
<사용자가 처음 가져온 시스템의 상태 — 코드 위치, 실행 방식, 입출력, *측정값*>

### 1.2 사용자 진단
> "<사용자가 한 말 그대로 인용>"

근본 원인: <한 줄>

### 1.3 외부 컨텍스트 자료 (의사결정 근거)

| 자료 | 위치 |
|---|---|

핵심 메시지:
- 

### 1.4 진짜 목표

> **<한 문장 진술 — 절대 늘리지 말 것>**

---

## 2. 의사결정 체인

작업 시작 시 사용자에게 결정 위임받은 분기 + 합의된 답:

### 2.1 <분기 1> → **<선택>**
### 2.2 <분기 2> → **<선택>**
### 2.3 마일스톤 진척 (checkpoint chain — Rule 8) ★

> **정적 정의 (이름 / exit criterion conjunction / prerequisite / §종착지 영역 coverage) 는 `<domain>-pipeline.md §N+1 마일스톤 체크포인트 체인` 참조.** 이 절은 *동적 진척 상태* 만 들고 있다.
>
> M-level = sequential checkpoint (M_i 가 M_{i+1} 의 prerequisite). M_i 안의 sub-checkpoint M_i.j = partition (parallel 가능). Phase 는 M_i.j 단위로 advance / close 한다.

#### 2.3.1 사용자 verbatim 합의 (Bootstrap step 6.5 인용)

> "<사용자가 마일스톤 sequence 를 말한 원본 문장 — 변형 없이 인용. 이게 모든 후속 결정의 source.>"

#### 2.3.2 현재 active checkpoint

- **Active M_i.j**: `M<i>-<j>` (가장 최근 미닫힌 sub-checkpoint)
- **이 M.j 가 닫혀야 다음에 가능해지는 작업**: <한 줄>
- **M_i (parent) 의 close 까지 남은 sub**: <리스트>

#### 2.3.3 M 진척 표

| M_i.j | 정의 (요약) | exit conjunct progress (✅ 닫힘 / ⏳ 진행 / ❌ 미시작) | 상태 (open / active / closed / blocked) | closed-by phase | 근거 |
|---|---|---|---|---|---|

> 모든 conjunct 가 ✅ 일 때만 M_i.j 상태 = `closed`. 단 한 conjunct 라도 ⏳/❌ 면 close 청구 금지.
> M_i 의 모든 sub 가 closed 면 M_i 도 closed. M chain 다음 M_{i+1} 의 sub 가 active 로 전환.

#### 2.3.4 Phase ↔ M_i.j 매핑 (history)

| Phase § | 일자 | 영향 받은 M_i.j | conjunct | advance / close | 비고 |
|---|---|---|---|---|---|

#### 2.3.5 Gate-bypass 기록 (있다면)

M_i 가 아직 open 인데 M_{i+1} 작업을 시작한 사례. 각 행은 §Decision chain trigger 와 짝.

| Phase § | bypass 한 M | 이유 (§Decision chain entry 인용) |
|---|---|---|

---

## 3+. Phase 로그 인덱스

새 phase는 *반드시* 별도 파일로 추가 (`templates/status-section.md` 복사).
코어에는 한 줄 요약 + 링크만.

| § | 일자 / 단계 | 디테일 파일 | 한 줄 요약 |
|---|---|---|---|
| 3 | M1 — 인프라 | [`<domain>-status/03-M1-implementation.md`](<domain>-status/03-M1-implementation.md) |  |

---

## 11. 한 페이지 요약 (TL;DR)

- 현재 상태 (수치):
- 마지막 phase:
- 다음 1행동:
- 가장 큰 갭:

---

## 12. 북극성 (Target State) + 갭

### 12.1 북극성 출처

| 자료 | 핵심 메시지 |
|---|---|

### 12.2 북극성 — 지표 / 현재 / 갭 / 근거 / 시스템 영향 ★

매 cycle마다 갱신. 모든 행에 `근거`(파일/명령/메트릭)와 `시스템 영향`(이 갭이 0이 되면 무엇이 가능해지나) *반드시* 채울 것.

| 지표 | 북극성 | 현재 (<날짜>) | 갭 | 근거 | 시스템 영향 |
|---|---|---|---|---|---|

### 12.3 남은 작업 (우선순위)

| # | 작업 | 추정 LOC | 어떤 §북극성 행을 움직이나 | 시스템 영향 (예상) |
|---|---|---|---|---|

### 12.4 비관 재채점 (latest) ★

> 직전 채점에 대해 *적대적 리뷰어 가정*으로 다시 채점. 다운그레이드 없는 cycle은 의심하라.

| 단계 | 이전 | 현재 (비관) | 사유 | 반례/근거 |
|---|---|---|---|---|

---

## 13. 산출 LOC 요약

| Phase | 누적 LOC | 비고 | 검증 산출물 |
|---|---|---|---|

---

## 14. pipeline §매핑 / §종착지 동기화 체크

마지막 동기화 일자:

- [ ] pipeline §매핑 표 최신 (이번 cycle 변동 반영)
- [ ] status §북극성과 pipeline §매핑이 일관 (◎/○/△/✗ 충돌 없음)
- [ ] 외부 출처 양 doc 동일
- [ ] 새 stage / sub-stage가 pipeline에 추가되었는지 검토 완료
- [ ] 모든 §북극성 행에 `근거` + `시스템 영향` 채워졌는지 확인
- [ ] **pipeline §종착지 §N.5 변경 이력에 이번 cycle 행 추가됨** (추가/구체화/축소/no-change 중 하나로 명시)
- [ ] 종착지 §N.4 비전 vs 현재 표가 갱신됨 (또는 unchanged 명시)
- [ ] 비전이 *축소* 방향으로 변경되었다면 §2 Decision chain에 trigger 항목 존재
- [ ] 이번 phase 파일의 §<NN>.6.5 end-state delta 절이 §종착지 갱신과 일관

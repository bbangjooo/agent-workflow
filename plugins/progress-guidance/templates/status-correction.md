# §<NN>.5 — Correction: <slug> (<YYYY-MM-DD>)

> Type: **Correction phase** (no code work — documentation amendment only)
> Trigger phase: §<NN> (이 correction 직전에 닫힌 phase)
> Amendment scope: _<§1.4 / §북극성 행 / §종착지 영역 / 기타>_
> Bootstrap critic 재실행 필요? _<Y / N>_

> 이 파일은 *between cycles* 에 끼어드는 문서-전용 cycle. phase 번호는 가지지 않고 `<NN>.5` 슬롯을 차지한다 — 다음 정상 phase 는 §<NN+1> 로 이어진다. 코드 변경 없음을 강제하기 위해 `git diff` 가 docs/ 외부를 건드리면 anti-pattern.

## <NN>.5.1 발견

> 무엇을, 언제, 어떤 근거로 — 이전 cycle 들의 결과를 재독해 하다 발견한 misalignment.

- 발견된 misalignment 한 줄:
- 발견 trigger (어떤 결과 / 어떤 검토 / 어떤 외부 입력으로):
- 영향받은 cycle 범위 (어디서부터 잘못 박혀 있었나): §<from>~§<NN>
- 왜 진작 못 잡았나 (cycle critic / auditor 가 통과시킨 이유): 

## <NN>.5.2 Old vs New intent

| 항목 | 기존 정의 | 수정 후 정의 | 차이의 본질 |
|---|---|---|---|
| §1.4 진짜 목표 |  |  |  |
| §북극성 행 <name1> |  |  |  |
| §북극성 행 <name2> |  |  |  |
| §종착지 §N.4 <영역> |  |  |  |

> "차이의 본질" 칸은 *왜 이전 정의가 진짜 의도를 못 잡았는가* — 측정 편의 우선이었나, 두 개념이 같은 줄 알았나, 처음엔 명료하지 못했나, 결과 보기 전엔 분리해서 생각 못 한 영역인가.

## <NN>.5.3 §Decision chain entry

이 correction 은 status §2 §Decision chain 에 다음 entry 로 기록된다 — correction 작성과 동시에 status core 에도 추가:

```
[<YYYY-MM-DD>] Correction §<NN>.5: <slug>
  Trigger: <위 §<NN>.5.1 의 발견 trigger 한 줄>
  Amendment:
    - §1.4: "<old>" → "<new>"
    - §북극성 행 <name>: <old definition> → <new definition>
    - §종착지 §N.4 <영역>: <old> → <new>
  영향 cycle: §<from>~§<NN> 의 결과 해석은 amended 정의 기준으로 §<NN>.5.6 에서 재독해.
```

## <NN>.5.4 적용된 amendment 목록

실제로 어느 파일/섹션을 어떻게 편집했는지 — auditor 가 git diff 와 대조한다.

- [ ] `docs/<domain>-status.md` §1.4 — 한 문장 수정
- [ ] `docs/<domain>-status.md` §12.2 §북극성 표 — 행 추가 / 제거 / 재정의
- [ ] `docs/<domain>-pipeline.md` §종착지 §N.2 가능해진 행동 — 항목 추가 / 제거 / 재정의
- [ ] `docs/<domain>-pipeline.md` §종착지 §N.3 의도적 제외 — 변경
- [ ] `docs/<domain>-pipeline.md` §종착지 §N.4 비전 vs 현재 — 영역 추가 / 제거 / 재정의
- [ ] `docs/<domain>-pipeline.md` §종착지 §N.5 — correction cycle 행 추가 (classification: 축소 / 구체화 / 신규 추가 중 하나, trigger = correction §<NN>.5)
- [ ] `docs/<domain>-status.md` §2 §Decision chain — §<NN>.5.3 entry 추가
- [ ] 기타: 

## <NN>.5.5 Bootstrap critic 재실행

다음 중 하나라도 변경됐으면 `progress-critic` `MODE: bootstrap` 을 *amended foundation* 위에서 재실행해야 한다 — 새 §북극성 표가 다시 통과해야 다음 정상 phase 진입 허용:

- §1.4 진짜 목표가 의미적으로 변경됨
- §북극성 행이 추가 / 제거 / 재정의됨 (단순 문구 정리는 제외)
- §종착지 §N.4 영역이 추가 / 제거 / 재정의됨

순수 문구 정리(의미 동일) 만이라면 재실행 불필요 — 그 사실을 명시하고 "재실행 불필요 사유" 한 줄 적을 것.

- 재실행 필요? [ ]
- 재실행 결과 critic file 경로: `docs/<domain>-status/<NN>.5-correction.critic.md`
- bootstrap-verify VERDICT: _<PASS / FAIL — must be PASS to advance>_
- 재실행 불필요 사유 (해당시): 

## <NN>.5.6 영향받은 cycle 들의 결과 재해석

§<NN>.5.1 에서 적은 영향 cycle 범위(§<from>~§<NN>) 의 phase 결과를 *amended 정의* 로 다시 읽으면:

- 어느 phase 의 ✅ 가 amended 정의에선 ❓ / ❌ 로 바뀌나?
- 어느 phase 의 ❌ 가 amended 정의에선 ✅ / ❓ 로 바뀌나?
- 어느 phase 가 amended 정의에선 *out-of-scope* 가 되나? (= scope creep 의 회고적 발견)

> 이 재해석은 *기록만* 하고 phase 파일 자체를 사후 편집하지 않는다 — 사후 편집은 git history 를 더럽히고 auditor Pass 3 가 silent drift 로 잡는다. 다음 cycle 부터 amended 정의로 진행.

| Phase | 기존 결론 | Amended 결론 | 사유 |
|---|---|---|---|
| §<from> |  |  |  |
| ... |  |  |  |
| §<NN> |  |  |  |

## <NN>.5.7 다음 1행동

correction 후 첫 정상 phase 의 의도. amended 정의 위에서 무엇을 가장 먼저 측정/실행할 것인가:

- 단일 최우선 행동:
- 의사결정 트리 (status §0.3 에 동기화):

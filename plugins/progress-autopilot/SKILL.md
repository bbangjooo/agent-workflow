---
name: progress-autopilot
description: progress-guidance의 iteration protocol을 N cycle 자동 실행한다. 매 cycle은 별도 subagent (`progress-cycle-runner`) 컨텍스트에서 step 1~11을 돌고, scope는 status §0.3 next-action에서 자동 선정, critic/auditor FAIL은 K회까지 auto-fix. cycle 사이마다 사용자에게 결과를 surface하고 계속 여부 확인. Bootstrap·correction phase·vision-loosening 결정은 자동화하지 않고 surface.
---

# progress-autopilot — Bounded Iteration Loop for progress-guidance

`progress-guidance` skill의 iteration protocol을 *사용자 개입 최소화* 모드로 N cycle 돌린다. 핵심 안전장치 (critic 두-게이트, auditor 두-게이트, vision-loosening 차단, intent-execution 라벨)는 그대로 살아 있고, autopilot은 그 위에서 *반복과 surface 시점*만 자동화한다.

## When this skill activates

- User가 `/progress-autopilot <domain> <N>` 호출
- "autopilot으로 N cycle 돌려", "자동으로 다음 cycle", "무인 진행" 등 명시 요청
- 단, *처음 한 번*은 반드시 `/progress-guidance` 으로 bootstrap 후에만 작동 — bootstrap 안 된 도메인에서 호출되면 즉시 halt

## What this skill does NOT automate (by design)

다음은 *사용자 판단이 본질*이라 autopilot이 절대 대신하지 않는다. 해당 상황 감지 시 halt + surface.

| 상황 | 왜 자동화하지 않나 |
|---|---|
| Bootstrap (`/progress-guidance` step 7-8) | §1.4 / §북극성 / §종착지 *정의*는 사용자 의도 anchor. 자동 생성되면 모든 후속 cycle이 잘못된 표적을 측정 |
| Correction phase (`<NN>.5-correction-<slug>.md`) | "정의가 진짜 의도와 다르다"는 *발견 자체*가 사용자가 결과를 다시 읽어보는 행위에서 나옴 |
| §종착지 §N.2 → §N.3 이동 (vision-loosening) | trigger가 §Decision chain에 없으면 reject — autopilot이 trigger를 *합성*해선 안 됨 |
| 3-cycle limitation auto-FAIL → §북극성 row 재정의 | "측정 포기하고 표적 재정의" 선택 자체가 사용자 가치판단 |
| Phase scope가 §북극성 / §종착지 §N.4 어디에도 매핑 안 됨 | scope creep 가능성 — 새 §북극성 row 추가가 필요할 수도 있음, 사용자 판단 |
| §0.3 next-action 비어 있거나 stale | 다음에 뭘 할지 모르는 상태 — autopilot의 입력이 없는 상황 |

이 목록은 hard halt taxonomy다. cycle-runner는 위 상황 중 하나를 만나면 `HALT{reason}` 으로 종료하고, autopilot top-level은 사용자에게 surface 후 루프를 break한다.

## Pre-conditions (top-level이 cycle 시작 전 체크)

`/progress-autopilot <domain> <N> [K=3]` 호출 시 *cycle 0번 시작 전에* 다음을 모두 확인:

1. `docs/<domain>-status.md` 와 `docs/<domain>-pipeline.md` 둘 다 존재
2. status §1.4 진짜 목표 한 문장 채워짐 (비어 있거나 placeholder면 halt)
3. status §North-Star 표가 ≥1행 존재하고 모든 행에 `근거` + `시스템 영향` 컬럼 비어 있지 않음
4. pipeline §종착지 §N.4 비전 vs 현재 표가 ≥1행 존재
5. pipeline §종착지 §N.5 변경 이력에 *Cycle 0* row 존재 (= bootstrap critic이 통과한 흔적)
6. status §0.3 next-action에 단일 leveraged item (`- [ ] **단일 최우선 행동:** <비어있지 않음>`) 존재
7. `docs/<domain>-status/00-bootstrap.critic.md` 존재 (bootstrap critic file — bootstrap-verify 통과의 흔적)

위 7개 중 하나라도 NO → autopilot은 cycle 0 진입 전 halt하고, 사용자에게 정확히 어떤 수동 명령 (대개 `/progress-guidance` bootstrap) 이 필요한지 안내한다.

## The autopilot loop

```
/progress-autopilot <domain> <N> [K=3]

┌─ Pre-flight (위 7개 check)
│   FAIL → halt + 사용자 surface, 종료
│   PASS → 진입
│
├─ For i = 1..N:
│   ┌─ Spawn `progress-cycle-runner` Agent
│   │   - 새 컨텍스트, model: opus
│   │   - 입력: domain, K, prior phase summary (직전 cycle SUCCESS의 요약)
│   │   - 작업: iteration protocol step 1~11 자동 수행
│   │       · step 1 Open: status §0/§North-Star/§종착지 + 영향 stage 읽기
│   │       · step 2 Plan: §0.3에서 scope auto-pick → §북극성 row + §종착지 §N.4 영역 매핑
│   │           · scope unmappable → return HALT{reason: "scope-unmappable"}
│   │       · step 3 Critic generate → save .critic.md
│   │       · step 4 Work: 계획된 작업 실제 실행 (코드/측정/검증)
│   │       · step 5 Append phase file from template
│   │       · step 6 Critic verify → fill responses → invoke verify
│   │           · FAIL → fix → re-invoke (최대 K회)
│   │           · K 소진 → return HALT{reason: "critic-K-exhausted", findings}
│   │           · 3-cycle limitation auto-FAIL 감지 → 즉시 HALT (K 안 씀)
│   │       · step 7 Update status core inline
│   │       · step 8 Sync pipeline core
│   │       · step 9 Re-project end-state (§종착지 §N.4/§N.5 갱신)
│   │           · 어떤 항목이 §N.2 → §N.3 이동 후보면 → return HALT{reason: "vision-loosening-needs-trigger"}
│   │       · step 10 Self-check
│   │       · step 11 Audit pass: invoke progress-auditor
│   │           · FAIL → fix Severity-1 → re-invoke (최대 K회)
│   │           · K 소진 → return HALT{reason: "auditor-K-exhausted", findings}
│   │   - 반환: SUCCESS{phase_file, §북극성_moved_rows, §종착지_delta_class, evidence_count}
│   │           | HALT{reason, partial_state, recommendation}
│   │
│   ├─ HALT 분기:
│   │   - 사용자에게 surface (halt taxonomy 표 참조)
│   │   - break 루프
│   │
│   └─ SUCCESS 분기:
│       - cycle summary 출력
│       - vision-stagnation 자동 경보 (§N.5 최근 3개 row가 모두 no-change면)
│       - AskUserQuestion: 계속 / 중단 / 다음 scope 힌트
│           · 사용자가 "중단" → break
│           · 사용자가 scope 힌트 추가 → 다음 cycle-runner 입력에 포함
│           · 사용자가 "계속" → 다음 cycle 진입
│
└─ 최종 보고: 완료한 cycle 수 / N, 변경된 §북극성 행, §종착지 §N.5 누적 delta, halt 사유 (있다면)
```

## Cycle-runner 호출 규약

Top-level이 매 cycle마다 다음 형식으로 spawn:

```
Agent(
  subagent_type: "progress-autopilot:progress-cycle-runner",
  description: "Autopilot cycle <i>/<N> for <domain>",
  prompt: "Run one full progress-guidance iteration cycle.

    domain: <domain>
    cycle index: <i> of <N>
    retry budget K: <K>
    prior cycle summary: <SUCCESS payload from cycle i-1, or 'none' if i=1>
    user scope hint: <hint from prev between-cycle question, or 'none'>

    Follow the iteration protocol in plugins/progress-guidance/SKILL.md
    §'Iteration protocol' (steps 1-11) exactly. Use the halt taxonomy
    in plugins/progress-autopilot/SKILL.md §'What this skill does NOT
    automate' to decide when to HALT instead of completing the cycle.

    Return one of:
      SUCCESS:
        phase_file: <path>
        §북극성 rows moved: <list>
        §종착지 delta classification: <추가/구체화/축소/no-change>
        evidence count: <n>
        one-line summary: <≤80 chars>

      HALT:
        reason: <one of the halt taxonomy keys>
        partial state: <what got written before halt, file paths>
        recommendation: <what user should do next>"
)
```

## Between-cycle surface format

매 SUCCESS cycle 직후, 사용자에게 다음 형식으로 surface:

```
✅ Cycle <i>/<N> closed — <one-line summary>
   Phase file: <path>
   §북극성 moved: <rows>
   §종착지 delta: <추가|구체화|축소|no-change>
   Evidence: <n> measurements

[자동 경보 — 있을 때만]
⚠ vision-stagnation: §종착지 §N.5 최근 3 cycle 연속 no-change
⚠ phase orphan smell: §<NN>.6.5 before/after vision snapshot 동일

다음 cycle 진행? (남은 N-i)
  [계속] [중단] [scope 힌트 추가하고 계속]
```

`AskUserQuestion` 으로 받는다. 30초 응답 없어도 *기본은 "계속"이 아니라 stays open* — autopilot은 사용자 명시 응답을 기다린다 (자동 진행은 vision drift 위험).

## Halt surface format

HALT 발생 시:

```
🛑 Autopilot halted at cycle <i>/<N>
   Reason: <halt taxonomy key>
   Partial state: <files written, may be incomplete>
   Recommendation: <next manual command>

   Detail:
   <halt-specific information — findings list / scope unmappable reason / etc.>
```

Halt 종류별 권장 다음 행동:

| reason | 권장 |
|---|---|
| `pre-flight-failed` | `/progress-guidance` 으로 bootstrap 또는 §0.3 채우기 |
| `scope-unmappable` | §0.3 next-action을 §북극성 row에 매핑되는 것으로 갱신, 또는 §북극성 새 row 추가 후 재시도 |
| `vision-loosening-needs-trigger` | status §Decision chain에 trigger 추가 → autopilot 재시도 |
| `critic-K-exhausted` | findings 검토, LIMITATION→DIRECT 측정 작업 수동 수행 |
| `auditor-K-exhausted` | Severity-1 findings 수동 수정 |
| `3-cycle-limitation` | §북극성 row 재정의 또는 측정 작업 수동 수행 (사용자 가치판단) |
| `correction-phase-needed` | `/progress-guidance` 안내 따라 correction phase 작성 |

## Anti-patterns (autopilot이 빠지기 쉬운 함정)

- **K-retry로 substantive evidence 위조** — critic이 "이 측정 어디 있나?" 라고 물을 때, fix를 "측정값 placeholder 채우기"로 처리하면 안 됨. K-retry는 *형식·누락 결함*에만 쓰고, 측정이 *실제로 없으면* HALT.
- **§0.3 조용히 다시 쓰기** — autopilot이 §0.3 next-action을 자기 수행 결과로 갱신하는 건 정상. 하지만 §0.3가 stale인데 autopilot이 추측해서 새 entry 생성하는 건 안 됨 — `scope-unmappable` HALT.
- **Vision-stagnation 무시** — ≥3 cycle no-change면 자동 경보지만 cycle은 통과. ≥5 cycle 누적되면 autopilot이 다음 cycle 시작 거부 (`correction-phase-needed` HALT).
- **DRIFT label로 close 시도** — cycle-runner가 §<NN>.6.6 = DRIFT인 채로 SUCCESS 반환하면 안 됨. DRIFT는 PIVOT으로 끌어올리거나 작업 재개 필수 — 못하면 HALT.
- **Hidden PIVOT** — §<NN>.6.6 = MATCH인데 데이터 소스/sample size/§북극성 행이 §<NN>.1 과 다른 채로 SUCCESS 반환. auditor Pass 5가 잡지만, cycle-runner 자체가 self-check에서 한 번 더 거른다.
- **Cycle 사이 자동 진행** — AskUserQuestion 응답 없이 다음 cycle 자동 시작 금지. 사용자가 cycle 결과를 *볼 기회*가 사라지면 autopilot이 cheerleading-loop으로 변질.
- **Bootstrap을 autopilot이 시작** — pre-flight check 7번 (00-bootstrap.critic.md 존재) 이 이를 차단. 우회하지 말 것.

## Composition with progress-guidance

이 plugin은 `progress-guidance` plugin의 *상위 사용자*다. 새 critic/auditor를 만들지 않고 그대로 호출:

- `progress-guidance:progress-critic` (MODE: generate / verify) — cycle-runner가 호출
- `progress-guidance:progress-auditor` — cycle-runner가 호출

`progress-guidance` plugin이 설치되어 있지 않으면 autopilot은 작동하지 않는다 (pre-flight check에서 agent 호출 실패로 잡힘).

## Examples

```
# 일반 사용
/progress-autopilot dantapattern 5

# K 조정 (재시도 적게)
/progress-autopilot dantapattern 3 1

# 1 cycle만 (수동 검토 모드)
/progress-autopilot dantapattern 1
```

## Files

- `commands/progress-autopilot.md` — slash command entry
- `agents/progress-cycle-runner.md` — single-cycle subagent (1 invocation = 1 cycle)

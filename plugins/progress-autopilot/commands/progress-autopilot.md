# /progress-autopilot

progress-guidance iteration protocol을 N cycle 자동 실행한다. 매 cycle은 별도 subagent에서 step 1~11을 돌고, cycle 사이마다 사용자에게 결과 surface + 계속 여부 확인.

## 사용법

```
/progress-autopilot <domain> <N> [K=3]
```

- `<domain>` — `docs/<domain>-status.md` / `docs/<domain>-pipeline.md` 의 도메인명
- `<N>` — 최대 cycle 수 (양의 정수)
- `[K=3]` — critic/auditor FAIL 시 cycle-runner의 auto-fix 재시도 한도 (기본 3)

## 예시

```
/progress-autopilot dantapattern 5         # 5 cycle, K=3
/progress-autopilot dantapattern 3 1       # 3 cycle, K=1 (재시도 거의 없음)
/progress-autopilot svc-migration 1        # 1 cycle만 (수동 검토 모드)
```

## 트리거

- 사용자가 직접 호출
- `/progress-guidance` bootstrap 완료 후 "이제 N cycle 자동으로 돌리자" 흐름
- `next-action`이 명확하고 사용자가 자리를 비우는 상황

## 실행 절차

### 1. 인자 검증

`<domain>` / `<N>` 누락이면 사용법 출력 후 종료. `<N>` 이 정수 아니거나 ≤0이면 거부.

### 2. Pre-flight check (cycle 0 진입 전)

다음 7개를 *모두* 확인. 하나라도 실패하면 즉시 halt + 사용자에게 어떤 수동 조치가 필요한지 안내.

1. `docs/<domain>-status.md` 와 `docs/<domain>-pipeline.md` 둘 다 존재
2. status §1.4 진짜 목표 한 문장 비어있지 않음
3. status §North-Star 표 ≥1행, 모든 행에 `근거` + `시스템 영향` 비어있지 않음
4. pipeline §종착지 §N.4 비전 vs 현재 표 ≥1행
5. pipeline §종착지 §N.5 변경 이력에 Cycle 0 row 존재
6. status §0.3 단일 최우선 행동이 비어있지 않음
7. `docs/<domain>-status/00-bootstrap.critic.md` 존재

실패 시 surface 형식:

```
🛑 Pre-flight failed for autopilot
   Missing: <체크 항목 번호와 이름>
   Recommendation: <다음 행동 — 대개 /progress-guidance 으로 bootstrap>
```

### 3. 메인 루프

```
for i in 1..N:
    # 3.1 cycle-runner subagent 호출
    result = Agent(
      subagent_type: "progress-autopilot:progress-cycle-runner",
      description: f"Autopilot cycle {i}/{N} for {domain}",
      prompt: <SKILL.md §Cycle-runner 호출 규약 참조>
    )
    
    # 3.2 HALT 분기
    if result.startswith("HALT"):
        surface_halt(result, i, N)   # SKILL.md §Halt surface format
        break
    
    # 3.3 SUCCESS 분기
    summary = parse_success(result)
    
    # 3.4 자동 경보 검사
    warnings = []
    if vision_stagnation_streak(domain) >= 3:
        warnings.append("vision-stagnation: §종착지 §N.5 최근 3 cycle 연속 no-change")
    if vision_stagnation_streak(domain) >= 5:
        # 5 cycle 누적은 hard halt
        surface_halt({"reason": "correction-phase-needed", ...}, i, N)
        break
    if phase_orphan_smell(summary):
        warnings.append("phase orphan smell: §<NN>.6.5 before/after 동일")
    
    # 3.5 사용자 surface
    surface_success(summary, warnings, i, N)   # SKILL.md §Between-cycle surface format
    
    # 3.6 사용자 응답 대기 (마지막 cycle이 아닐 때만)
    if i < N:
        answer = AskUserQuestion(
            question="다음 cycle 진행?",
            options=["계속", "중단", "scope 힌트 추가하고 계속"]
        )
        if answer == "중단":
            break
        elif answer == "scope 힌트 추가하고 계속":
            user_hint = AskUserQuestion("다음 cycle scope 힌트?", free_text=True)
            # 다음 iteration에 user_hint 주입
```

### 4. 최종 보고

루프 종료 후 다음 출력:

```
🏁 Autopilot 종료
   완료: <완료 cycle 수> / <N>
   §북극성 변동: <누적 row 변경 목록>
   §종착지 §N.5 누적 delta: <추가 X / 구체화 Y / 축소 Z / no-change W>
   종료 사유: <complete | user-stop | halt:<reason>>
   
   다음 권장 행동: <상황별 — halt면 halt taxonomy 참조, complete면 사용자 검토>
```

## 입력

- `<domain>` (필수) — 도메인명
- `<N>` (필수) — 최대 cycle 수
- `[K]` (선택, 기본 3) — auto-fix 재시도 한도

## 의존성

- `progress-guidance` plugin — `progress-critic` + `progress-auditor` agent를 cycle-runner가 호출
- 기존 status/pipeline 문서 쌍 + bootstrap critic 통과

## Agent

- `progress-autopilot:progress-cycle-runner` — 매 cycle 1회씩 spawn

## 자동화하지 않는 것

상세는 `SKILL.md` §"What this skill does NOT automate" 참조. 요약:

- Bootstrap (`/progress-guidance` 으로 수동)
- Correction phase (사용자 발견 → `/progress-guidance` 안내)
- Vision-loosening (§Decision chain trigger 부재 시 halt)
- 3-cycle limitation auto-FAIL (사용자 가치판단 필요)
- §0.3 stale 시 새 entry 합성 (`scope-unmappable` halt)

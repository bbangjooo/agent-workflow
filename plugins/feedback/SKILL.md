# Feedback Plugin

무한 이터레이션을 위한 피드백 수집 및 의사결정 관리 플러그인

## 개요

제품은 한 번에 완성되지 않습니다. 개발을 완료하고 나서야 기획의 부족함을 깨닫거나, 디자인을 보고 새로운 아이디어가 떠오르기도 합니다. 이 플러그인은 각 Stage에서 얻은 학습을 체계적으로 수집하고, 의사결정을 기록하여 다음 이터레이션에 활용할 수 있게 합니다.

## 핵심 가치

1. **학습 축적**: 각 Stage에서 배운 것을 기록하여 잊지 않음
2. **의사결정 추적**: 왜 이런 결정을 했는지 나중에 추적 가능
3. **개선 방향 제시**: 피드백을 바탕으로 다음 액션 제안
4. **버전 간 연속성**: v1에서 v2로 넘어갈 때 컨텍스트 유지

## 커맨드

### `/reflect` - 회고

현재 또는 완료된 Stage에 대한 회고를 수행합니다.

```
/reflect              # 현재 Stage 회고
/reflect planning     # 특정 Stage 회고
```

수집하는 내용:
- 잘된 점 (What went well)
- 개선할 점 (What could be improved)
- 다음에 시도할 것 (What to try next)
- 예상과 달랐던 점 (Surprises)

### `/decide` - 의사결정 기록

중요한 의사결정을 기록합니다.

```
/decide
```

기록하는 내용:
- 결정 제목
- 상황/배경 (Context)
- 고려한 옵션들 (Options)
- 선택한 옵션 (Chosen)
- 선택 이유 (Rationale)
- 예상 결과 (Expected outcome)

### `/review` - 품질 검토

Stage 간 산출물 정합성을 검토합니다.

```
/review                    # 전체 검토
/review design develop     # Design → Develop 정합성 검토
```

## 산출물 구조

```
outputs/
├── feedback/
│   ├── stage-0-reflection.md
│   ├── stage-1-reflection.md
│   ├── stage-2-reflection.md
│   ├── stage-3-reflection.md
│   └── stage-4-reflection.md
│
└── decisions/
    └── decision-log.md
```

## Agent

### feedback-coach

피드백 수집을 도와주는 코치입니다.

- 편안하고 안전한 분위기에서 회고 진행
- 비판이 아닌 학습 관점으로 접근
- 구체적인 다음 액션으로 연결
- 의사결정의 맥락을 명확히 기록

## 다른 플러그인과의 연계

- **orchestrator**: Stage 완료 시 자동으로 `/reflect` 제안
- **iteration**: 회고 결과를 바탕으로 `/iterate` 또는 `/next-version` 제안
- **각 Stage 플러그인**: 해당 Stage의 컨텍스트를 활용한 회고

## 워크플로우 통합

```
[Stage 완료]
    ↓
[/reflect 제안] → "이 단계를 마치기 전에 잠깐 회고해볼까요?"
    ↓
[회고 진행] → 학습점, 개선점 수집
    ↓
[다음 액션 제안]
    ├── "다음 Stage로 진행할게요" → 계속 진행
    ├── "/iterate {stage}로 돌아가서 개선해보세요" → iteration 플러그인
    └── "/next-version으로 v2를 시작해보세요" → iteration 플러그인
```

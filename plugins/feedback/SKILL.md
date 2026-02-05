# Feedback Plugin

무한 이터레이션을 위한 피드백 수집 및 의사결정 관리 플러그인

## 개요

제품은 한 번에 완성되지 않습니다. 개발을 완료하고 나서야 기획의 부족함을 깨닫거나, 디자인을 보고 새로운 아이디어가 떠오르기도 합니다. 이 플러그인은 각 Stage에서 얻은 학습을 체계적으로 수집하고, 의사결정을 기록하여 다음 이터레이션에 활용할 수 있게 합니다.

## 핵심 가치

1. **학습 축적**: 각 Stage에서 배운 것을 기록하여 잊지 않음
2. **의사결정 추적**: 왜 이런 결정을 했는지 나중에 추적 가능
3. **개선 방향 제시**: 피드백을 바탕으로 다음 액션 제안
4. **버전 간 연속성**: v1에서 v2로 넘어갈 때 컨텍스트 유지
5. **목표 정렬 유지**: 작업이 목표에서 벗어나지 않도록 지속적 점검

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

### `/goal` - 목표 확인 및 정렬 체크

프로젝트 목표와 진행상황을 확인하고, 현재 작업이 목표와 정렬되는지 점검합니다.

```
/goal                 # 현재 목표와 진행상황 확인
/goal check           # 현재 작업이 목표와 정렬되는지 확인
/goal update          # 목표 진척도 수동 업데이트
/goal add             # 새 목표 추가
/goal modify          # 기존 목표 수정
```

**트리거 키워드** (자연어 요청에 반응):
- "목표 확인해줘", "목표 보여줘", "현재 목표가 뭐야"
- "진행상황 확인", "얼마나 진행됐어", "진척도 보여줘"
- "지금 방향이 맞아?", "목표랑 맞는지 확인해줘"
- "발산하고 있는 것 같아", "목표에서 벗어난 것 같아"

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

### 목표 정렬 체크 플로우
```
[새 작업 시작 의도]
    ↓
[/goal check] → "이 작업이 목표와 맞나요?"
    ↓
    ├── 정렬됨 → 진행
    └── 미정렬 → 대안 제안 또는 목표 수정
```

### 회고 플로우
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

### 목표 확인 트리거
사용자가 다음과 같이 말하면 `/goal` 커맨드를 호출:
- "목표 확인해줘" → `/goal`
- "진행상황 보여줘" → `/goal`
- "이거 해도 돼?" → `/goal check`
- "방향이 맞아?" → `/goal check`

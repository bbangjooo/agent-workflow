# Extract Goals

아이디어에서 목표 추출 스킬

## 설명

Ideation Stage 완료 후 `idea-brief.md`에서 목표(Goal)를 추출하여 `.workflow/state.json`에 등록합니다. 이 목표들은 이후 피드백/이터레이션 과정에서 진척도 추적과 발산 감지에 사용됩니다.

## 트리거

- `brief-generation.md` 완료 직후 자동 호출

## 입력

- `outputs/stage-0/idea-brief.md` - 생성된 아이디어 브리프
- `.workflow/state.json` - 현재 워크플로우 상태

## 실행 내용

### 1. 브리프 분석

`idea-brief.md`에서 목표가 될 수 있는 요소 식별:

- **핵심 가치 제안** → 목표로 변환
- **성공 지표** → 성공 지표(successIndicators)로 활용
- **MVP 범위** → 달성 가능한 목표로 구체화

### 2. 목표 확인 대화

추출된 목표를 사용자와 확인:

```
"아이디어 브리프를 바탕으로 이 프로젝트의 목표를 정리해볼게요.

제가 이해한 핵심 목표들이에요:

🎯 목표 1: {추출된 목표 1}
   성공 지표: {지표들}

🎯 목표 2: {추출된 목표 2}
   성공 지표: {지표들}

🎯 목표 3: {추출된 목표 3}
   성공 지표: {지표들}

이 목표들이 맞나요?
수정하거나 추가하고 싶은 게 있으면 말씀해주세요!"
```

### 3. 목표 조정

사용자 피드백 반영:
- 목표 추가/삭제/수정
- 성공 지표 구체화
- 우선순위 조정

### 4. 상태 업데이트

`.workflow/state.json`에 goals 배열 추가:

```json
{
  "goals": [
    {
      "id": "goal-1",
      "description": "사용자가 3분 안에 첫 결과물을 볼 수 있게 하기",
      "successIndicators": [
        "온보딩 완료율 80% 이상",
        "첫 사용 시간 3분 이하",
        "이탈률 20% 이하"
      ],
      "currentProgress": 0,
      "progressHistory": [
        {
          "timestamp": "2024-...",
          "progress": 0,
          "reason": "목표 설정됨",
          "phase": "ideation"
        }
      ],
      "status": "active",
      "createdAt": "2024-..."
    },
    {
      "id": "goal-2",
      "description": "MVP 핵심 기능 3개 구현",
      "successIndicators": [
        "기능 A 동작",
        "기능 B 동작",
        "기능 C 동작"
      ],
      "currentProgress": 0,
      "progressHistory": [...],
      "status": "active",
      "createdAt": "2024-..."
    }
  ],
  "consecutiveNoProgress": 0
}
```

### 5. 확인 메시지

```
"목표가 설정됐어요!

🎯 추적할 목표 {n}개:
1. {goal_1_description}
2. {goal_2_description}
3. {goal_3_description}

이제부터 각 Stage를 진행하면서 이 목표들에 대한 진척도를 추적할게요.
목표에서 벗어나는 것 같으면 알려드릴게요!

다음 단계로 넘어갈까요?"
```

## 산출물

1. `.workflow/state.json` 업데이트 - goals 배열 추가
2. `outputs/stage-0/goals.md` (선택) - 목표 문서화

### goals.md 템플릿 (선택적 생성)

```markdown
# Project Goals

## 메타데이터
- 버전: v{productVersion}
- 설정일: {날짜}
- 기반: idea-brief.md

---

## 목표 목록

### 🎯 Goal 1: {description}

**성공 지표:**
- [ ] {indicator_1}
- [ ] {indicator_2}

**현재 진척도:** 0%

---

### 🎯 Goal 2: {description}

**성공 지표:**
- [ ] {indicator_1}
- [ ] {indicator_2}

**현재 진척도:** 0%

---

## 목표 추적 안내

각 Stage 완료 후 `/reflect`를 실행하면:
1. 해당 Stage에서의 목표 기여도 분석
2. 진척도 자동 업데이트
3. 발산 감지 및 경고

목표 수정이 필요하면 `/reflect` 중 "목표 수정" 옵션을 선택하세요.
```

## 완료 조건

- idea-brief.md 분석 완료
- 최소 1개 이상의 목표 설정
- 각 목표에 최소 1개 이상의 성공 지표
- 사용자 확인 완료
- state.json 업데이트 완료

## 주의사항

1. **목표 개수 제한**: 3-5개가 적정 (너무 많으면 추적이 어려움)
2. **측정 가능한 지표**: 성공 지표는 가능한 한 구체적으로
3. **현실적 목표**: MVP 범위 내에서 달성 가능한 것으로
4. **사용자 확인 필수**: 자동 추출된 목표는 반드시 사용자 확인 거침

## 다음 스킬

→ Stage 1 (Planning) 시작

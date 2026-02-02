# Gather Learnings

학습점 수집 스킬

## 설명

Stage를 진행하면서 얻은 학습점을 체계적으로 수집합니다. 잘된 점, 예상과 달랐던 점, 새롭게 알게 된 것을 정리합니다.

## 트리거

- `/reflect` 커맨드 실행 시 첫 번째로 호출

## 입력

- 대상 Stage ID
- 해당 Stage의 산출물 경로들
- `.workflow/state.json`의 Stage 정보

## 실행 내용

### 1. 컨텍스트 로드

```
1. 대상 Stage의 산출물들 읽기
2. Stage 시작/완료 시간 확인
3. 이전 회고가 있다면 참조
```

### 2. 잘된 점 수집

질문:
- "이번 Stage에서 특히 만족스러웠던 부분이 있나요?"
- "예상보다 빠르게 진행된 부분이 있었나요?"
- "좋은 결정을 내렸다고 생각하는 순간이 있나요?"

수집 항목:
- 상황 (Situation)
- 행동 (Action)
- 결과 (Result)
- 인사이트 (Insight)

### 3. 예상과 달랐던 점 수집

질문:
- "처음 예상과 다르게 흘러간 부분이 있나요?"
- "'어? 이건 몰랐네' 하고 깨달은 게 있나요?"
- "가정이 틀렸던 부분이 있나요?"

수집 항목:
- 원래 예상
- 실제 상황
- 깨달음

### 4. 새롭게 배운 것 수집

질문:
- "이번 Stage에서 새로 알게 된 게 있나요?"
- "다음에 활용할 수 있는 팁이나 방법이 있나요?"
- "기억해두고 싶은 것이 있나요?"

## 산출물

다음 스킬(`identify-improvements.md`)로 전달할 학습점 목록:

```yaml
learnings:
  went_well:
    - situation: "..."
      action: "..."
      result: "..."
      insight: "..."
  surprises:
    - expected: "..."
      actual: "..."
      learning: "..."
  new_knowledge:
    - topic: "..."
      detail: "..."
      applicable_to: "..."
```

## 완료 조건

- 최소 1개 이상의 잘된 점 수집
- 사용자가 더 이상 추가할 것이 없다고 확인

## 다음 스킬

→ `identify-improvements.md`

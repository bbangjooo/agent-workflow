# Identify Improvements

개선점 도출 스킬

## 설명

Stage에서 겪은 어려움과 아쉬운 점을 파악하고, 구체적인 개선 방안을 도출합니다.

## 트리거

- `gather-learnings.md` 완료 후 호출

## 입력

- `gather-learnings`에서 수집한 학습점
- 대상 Stage의 산출물
- 이전 Stage와의 연결 정보

## 실행 내용

### 1. 어려웠던 점 수집

질문:
- "이번 Stage에서 가장 힘들었던 부분이 뭐였나요?"
- "막혔던 순간이 있었나요? 어떻게 해결했나요?"
- "시간이 예상보다 오래 걸린 부분이 있나요?"

### 2. 아쉬운 점 수집

질문:
- "다시 한다면 다르게 하고 싶은 게 있나요?"
- "지금 와서 생각하면 놓친 부분이 있나요?"
- "결과물에서 아쉬운 점이 있나요?"

### 3. 근본 원인 분석

각 어려움/아쉬움에 대해:
- "왜 그런 상황이 됐을까요?"
- "이전 Stage에서 뭔가 달랐다면 피할 수 있었을까요?"
- "정보가 부족했나요, 시간이 부족했나요, 아니면 다른 이유가 있나요?"

### 4. 개선 방안 도출

각 문제에 대해 구체적인 개선안 제시:
- 단기 개선: 지금 바로 적용할 수 있는 것
- 중기 개선: 다음 이터레이션에서 적용할 것
- 장기 개선: 프로세스 자체를 바꿀 것

### 5. 영향 범위 판단

개선점이 다른 Stage에 영향을 주는지 분석:
- "이 개선을 위해 이전 Stage를 수정해야 하나요?"
- "다음 Stage에 전달할 정보를 바꿔야 하나요?"

## 산출물

다음 스킬로 전달할 개선점 목록:

```yaml
improvements:
  pain_points:
    - issue: "..."
      impact: "high|medium|low"
      root_cause: "..."

  suggestions:
    - title: "..."
      description: "..."
      effort: "low|medium|high"
      when: "now|next_iteration|v2"
      affects_stages: ["planning", "design"]

  requires_iteration:
    - stage: "planning"
      reason: "..."
      urgency: "high|medium|low"
```

## 완료 조건

- 최소 1개 이상의 개선점 도출
- 각 개선점에 대한 실행 가능한 제안 포함

## 다음 스킬

→ `suggest-next-action.md`

# Validate Goal Alignment

목표 정렬 검증 스킬

## 설명

개선점이 현재 목표에 정렬되는지 검증하고, 목표 진척도를 업데이트합니다. 발산을 감지하여 무한 이터레이션을 방지합니다.

## 트리거

- `identify-improvements.md` 완료 후, `suggest-next-action.md` 전에 호출

## 입력

- `identify-improvements`에서 도출한 개선점
- `.workflow/state.json`의 goals 배열
- 현재 Phase 정보

## 실행 내용

### 1. 목표 로드

`.workflow/state.json`에서 현재 활성 목표(status: 'active') 로드:

```
"현재 추적 중인 목표들이에요:

🎯 목표 1: {description}
   진척도: {currentProgress}%
   성공 지표: {successIndicators}

🎯 목표 2: {description}
   진척도: {currentProgress}%
   성공 지표: {successIndicators}
"
```

### 2. 개선점-목표 매핑

각 개선점에 대해 어떤 목표에 기여하는지 판단:

질문 (내부 분석):
- "이 개선이 어떤 목표의 성공 지표에 직접 기여하는가?"
- "이 개선을 적용하면 목표 진척도가 올라가는가?"
- "이 개선이 목표와 무관한 사이드 트랙인가?"

매핑 결과:

```yaml
aligned_improvements:
  - improvement: "온보딩 플로우 간소화"
    contributes_to: ["goal-1"]
    estimated_progress_delta: +15
    reason: "목표 1의 '사용자 이탈률 감소' 지표에 직접 기여"

unaligned_improvements:
  - improvement: "다크모드 추가"
    reason: "현재 목표와 직접적 연관 없음"
    recommendation: "defer"  # defer | reconsider_goals | proceed_anyway
```

### 3. 진척도 업데이트

정렬된 개선점을 바탕으로 목표 진척도 업데이트:

```
"개선점을 분석해봤어요:

✅ 목표 정렬된 개선:
- '{improvement}' → 목표 '{goal}'에 +{delta}% 기여 예상

⚠️ 목표와 무관한 개선:
- '{improvement}' → 현재 목표와 직접 연관 없음
  → {recommendation}을 권장해요
"
```

### 4. 발산 감지

발산 조건:
- 3회 연속 이터레이션에서 어떤 목표도 진척이 없음
- 연속으로 목표와 무관한 개선만 제안됨

발산 감지 시:

```
"🚨 발산 경고

최근 {n}번의 이터레이션 동안 목표 진척이 없었어요.

가능한 원인:
1. 목표가 현실과 맞지 않게 되었을 수 있어요
2. 개선 방향이 목표와 다른 곳을 향하고 있을 수 있어요
3. 목표가 이미 달성되었지만 인식하지 못했을 수 있어요

어떻게 할까요?

1️⃣ **목표 재검토** - 목표가 여전히 유효한지 확인
2️⃣ **목표 수정** - 현실에 맞게 목표 조정
3️⃣ **진행 계속** - 현 상태로 계속 진행
4️⃣ **이터레이션 중단** - 현재 버전 완료로 간주
"
```

### 5. 상태 업데이트

`.workflow/state.json` 업데이트:

```json
{
  "goals": [
    {
      "id": "goal-1",
      "currentProgress": 45,
      "progressHistory": [
        {
          "timestamp": "2024-...",
          "progress": 45,
          "reason": "온보딩 플로우 개선으로 +15%",
          "iterationId": "iter-3",
          "phase": "development"
        }
      ]
    }
  ],
  "consecutiveNoProgress": 0  // 진척 있으면 리셋, 없으면 +1
}
```

## 산출물

다음 스킬(`suggest-next-action`)로 전달할 검증 결과:

```yaml
goal_alignment:
  aligned_improvements:
    - improvement: "..."
      contributes_to: ["goal-1"]
      estimated_progress_delta: +15

  unaligned_improvements:
    - improvement: "..."
      reason: "..."
      recommendation: "defer"

  progress_update:
    - goal_id: "goal-1"
      previous: 30
      current: 45
      delta: +15
      reason: "..."

  divergence_warning:
    triggered: false
    consecutive_no_progress: 0
    recommendation: null

  summary:
    total_improvements: 3
    aligned_count: 2
    unaligned_count: 1
    goals_with_progress: ["goal-1"]
    goals_stalled: ["goal-2"]
```

## 완료 조건

- 모든 개선점의 목표 정렬 여부 판단 완료
- 진척도 업데이트 완료 (있는 경우)
- 발산 감지 수행 완료
- 상태 파일 업데이트 완료

## 다음 스킬

→ `suggest-next-action.md` (검증 결과 포함하여 호출)

## 주의사항

1. **보수적 진척도 추정**: 진척도는 낙관적으로 추정하지 않음
2. **명확한 기여만 인정**: 간접적 기여는 진척도에 반영하지 않음
3. **발산 경고는 제안일 뿐**: 최종 결정은 사용자가 함
4. **목표 없으면 스킵**: goals 배열이 비어있으면 이 스킬은 스킵

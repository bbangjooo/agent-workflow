# Goal Status Display

목표 상태 표시 스킬

## 설명

현재 프로젝트의 목표들과 각 목표의 진척도를 시각적으로 표시합니다. 사용자가 "목표 확인", "진행상황 보여줘" 등을 요청할 때 호출됩니다.

## 트리거

- `/goal` 커맨드 실행 시
- 사용자가 목표/진행상황 확인 요청 시
- "목표 확인", "진척도", "얼마나 됐어", "progress" 등의 키워드

## 입력

- `.workflow/state.json`의 goals 배열
- 현재 Phase 정보

## 실행 내용

### 1. 상태 로드

`.workflow/state.json`에서 goals 배열 로드:

```javascript
{
  "goals": [...],
  "consecutiveNoProgress": 0,
  "currentPhaseId": "development"
}
```

### 2. 목표 없음 처리

goals 배열이 비어있거나 없는 경우:

```
⚠️ 아직 설정된 목표가 없어요.

목표를 설정하면 진행 방향을 추적하고
발산을 방지할 수 있어요.

어떻게 할까요?
1️⃣ /goal add - 지금 목표 추가하기
2️⃣ /ideate - Ideation부터 시작해서 목표 추출하기
```

### 3. 진척도 시각화

각 목표에 대해 프로그레스 바 생성:

```javascript
function renderProgressBar(progress, width = 10) {
  const filled = Math.round(progress / 100 * width);
  const empty = width - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}
```

### 4. 상태 분석

각 목표의 상태 분석:
- **진행 중 (On Track)**: 최근 이터레이션에서 진척 있음
- **정체 (Stalled)**: 1-2회 연속 진척 없음
- **위험 (At Risk)**: 3회 이상 연속 진척 없음
- **완료 (Completed)**: 100% 달성

### 5. 출력 생성

```
🎯 프로젝트 목표 현황
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 현재 Phase: {current_phase}
📅 마지막 업데이트: {last_updated}

{각 목표에 대해}
🎯 Goal {n}: {description}
   진척도: {progress_bar} {progress}%
   상태: {status_emoji} {status_text}
   성공 지표:
   {각 지표에 대해}
   - {check_emoji} {indicator}

   최근 변화:
   - {recent_change_description}

{목표 끝}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 전체 진척도: {average_progress}%
{경고가 있으면}
⚠️ 주의: {warning_message}

💡 권장 액션:
{recommendations}
```

### 6. 권장 액션 생성

상황별 권장 액션:

- **모든 목표 순조로움**: "현재 방향 유지, 계속 진행하세요"
- **일부 목표 정체**: "{정체 목표} 관련 작업 우선 고려"
- **발산 경고**: "목표 재검토 권장 (/goal modify)"
- **목표 거의 완료**: "새 목표 추가 고려 (/goal add)"

## 산출물

화면 출력만 (파일 생성 없음)

## 상태 이모지 매핑

| 상태 | 이모지 | 설명 |
|------|--------|------|
| On Track | ✅ | 진행 중 |
| Stalled | ⚠️ | 1-2회 정체 |
| At Risk | 🚨 | 3회+ 정체 |
| Completed | 🎉 | 완료 |

## 지표 이모지 매핑

| 상태 | 이모지 |
|------|--------|
| 완료 | ✅ |
| 진행 중 | 🔄 |
| 미시작 | ⬜ |

## 완료 조건

- 모든 목표 표시 완료
- 진척도 시각화 완료
- 권장 액션 제시

## 주의사항

1. **간결한 출력**: 핵심 정보만 표시, 상세는 요청 시
2. **액션 가능한 제안**: 단순 상태 표시가 아닌, 다음 행동 제안
3. **긍정적 톤**: 진척 없음도 "기회"로 프레이밍

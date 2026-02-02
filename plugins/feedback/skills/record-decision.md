# Record Decision

의사결정 기록 스킬

## 설명

중요한 의사결정을 구조화된 형식으로 기록합니다.

## 트리거

- `/decide` 커맨드 실행 시 호출

## 입력

- 현재 Stage
- 대화로 수집된 의사결정 정보

## 실행 내용

### 1. 결정 ID 생성

형식: `DEC-{버전}-{순번}`
예: `DEC-1-001`, `DEC-1-002`, `DEC-2-001`

### 2. 정보 수집

대화를 통해 수집:
- 제목 (title)
- 상황/배경 (context)
- 고려한 옵션들 (options)
- 선택한 옵션 (chosen)
- 선택 이유 (rationale)
- 예상 결과 (expectedOutcome)

### 3. 상태 업데이트

`.workflow/state.json`의 `decisions` 배열에 추가:

```json
{
  "id": "DEC-1-001",
  "phase": "planning",
  "title": "Next.js 대신 Remix 선택",
  "context": "프레임워크를 선택해야 하는 상황...",
  "options": [
    {
      "id": "opt-1",
      "description": "Next.js",
      "pros": ["큰 커뮤니티", "많은 예제"],
      "cons": ["복잡한 설정"]
    },
    {
      "id": "opt-2",
      "description": "Remix",
      "pros": ["간단한 데이터 로딩", "웹 표준"],
      "cons": ["작은 커뮤니티"]
    }
  ],
  "chosenOptionId": "opt-2",
  "rationale": "프로젝트 규모가 작고, 간단한 데이터 플로우가 필요해서",
  "expectedOutcome": "빠른 개발 속도, 학습 곡선 예상",
  "timestamp": "2024-01-15T10:30:00Z",
  "tags": ["tech-stack", "framework"]
}
```

### 4. Decision Log 파일 업데이트

`outputs/decisions/decision-log.md`에 추가:

```markdown
---

## DEC-1-001: Next.js 대신 Remix 선택

- **Stage**: Planning
- **Date**: 2024-01-15
- **Status**: Active
- **Tags**: tech-stack, framework

### Context
프레임워크를 선택해야 하는 상황. 팀의 경험과 프로젝트 요구사항을 고려해야 했음.

### Options Considered

#### Option A: Next.js
- **Pros**: 큰 커뮤니티, 많은 예제
- **Cons**: 복잡한 설정

#### Option B: Remix
- **Pros**: 간단한 데이터 로딩, 웹 표준
- **Cons**: 작은 커뮤니티

### Decision
**Chosen**: Remix

**Rationale**: 프로젝트 규모가 작고, 간단한 데이터 플로우가 필요해서

### Expected Outcome
빠른 개발 속도, 학습 곡선 예상

### Actual Outcome
_To be updated_

---
```

## 산출물

1. `.workflow/state.json` 업데이트
2. `outputs/decisions/decision-log.md` 업데이트

## 완료 조건

- 모든 필드 수집 완료
- 상태 파일 업데이트 완료
- Decision log 파일 업데이트 완료
- 사용자에게 기록 확인

## 태그 자동 제안

Stage별 일반적인 의사결정 태그:

| Stage | 일반적인 태그 |
|-------|-------------|
| Ideation | problem, target-user, value-prop |
| Planning | feature, priority, scope |
| Design | ui, ux, design-system |
| Development | tech-stack, architecture, database |
| Deployment | hosting, infrastructure, cost |

## 후속 기능

### Actual Outcome 업데이트

나중에 실제 결과 기록:

```
"이전에 '{title}' 결정을 하셨는데,
실제로 어떤 결과가 나왔나요?"
```

→ `actualOutcome` 필드 업데이트

### 의사결정 분석

```
/decide analyze
```

→ 패턴 분석, 후회한 결정 식별, 학습점 도출

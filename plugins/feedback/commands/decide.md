# /decide

중요 의사결정을 기록하는 커맨드

## 사용법

```
/decide                    # 새 의사결정 기록
/decide list               # 기록된 의사결정 목록 보기
/decide {decision-id}      # 특정 의사결정 상세 보기
```

## 설명

제품 개발 과정에서 내린 중요한 의사결정을 기록합니다. 왜 이런 결정을 했는지 나중에 추적할 수 있고, 다음 버전이나 이터레이션에서 참고할 수 있습니다.

## 트리거

- 중요한 분기점에서 자동 제안
- 사용자가 직접 호출
- 기술 스택 선택, 기능 우선순위 등 주요 결정 시점

## 실행 스킬 순서

1. `record-decision.md` - 의사결정 기록

## Agent

- `feedback-coach.md` 사용

## 입력

- 없음 (대화로 수집)

## 실행 내용

### 1. 결정 제목

```
"어떤 결정을 기록하려고 해요?
한 문장으로 요약해주세요.

예: 'Next.js 대신 Remix를 선택함'
예: 'MVP에서 결제 기능 제외'
"
```

### 2. 상황/배경

```
"어떤 상황에서 이 결정이 필요했나요?

예: '프레임워크를 선택해야 했는데, 팀의 경험과 프로젝트 요구사항을 고려해야 했음'
"
```

### 3. 고려한 옵션들

```
"어떤 옵션들을 고려했나요? 각각의 장단점도 알려주세요.

옵션 1: ...
- 장점: ...
- 단점: ...

옵션 2: ...
- 장점: ...
- 단점: ...
"
```

### 4. 선택 및 이유

```
"어떤 옵션을 선택했고, 왜 그렇게 결정했나요?

선택: ...
이유: ...
"
```

### 5. 예상 결과

```
"이 결정으로 어떤 결과를 기대하나요?

예: '개발 속도 향상, 하지만 학습 곡선 있을 수 있음'
"
```

### 6. 기록 확인

```
"이렇게 기록할게요:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Decision: {제목}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Stage: {현재 Stage}
📅 Date: {날짜}

🎯 Context:
{상황}

🔀 Options Considered:
1. {옵션1} - {장단점 요약}
2. {옵션2} - {장단점 요약}

✅ Chosen: {선택}

💭 Rationale:
{이유}

🎯 Expected Outcome:
{예상 결과}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

맞나요?"
```

## 산출물

`outputs/decisions/decision-log.md`에 추가:

```markdown
# Decision Log

## DEC-001: {제목}

- **Stage**: {stage}
- **Date**: {날짜}
- **Status**: Active

### Context
{상황}

### Options Considered

#### Option A: {옵션1}
- Pros: {장점}
- Cons: {단점}

#### Option B: {옵션2}
- Pros: {장점}
- Cons: {단점}

### Decision
**Chosen**: {선택}

**Rationale**: {이유}

### Expected Outcome
{예상 결과}

### Actual Outcome
_To be filled after implementation_

---

## DEC-002: ...
```

## 자동 제안 시점

다음 상황에서 `/decide` 자동 제안:

- `/develop` 시작 시 tech-stack 선택 후
- 기능 우선순위 결정 후
- 디자인 시스템 선택 후
- 배포 플랫폼 선택 후

```
"중요한 결정을 내리셨네요.
나중을 위해 기록해둘까요? /decide"
```

## 의사결정 조회

### 목록 보기

```
/decide list
```

출력:
```
📋 Decision Log (총 3개)

DEC-001: Next.js 대신 Remix 선택 [Planning]
DEC-002: MVP에서 결제 기능 제외 [Planning]
DEC-003: Supabase를 백엔드로 선택 [Development]

상세 보기: /decide DEC-001
```

### 상세 보기

```
/decide DEC-001
```

## 완료 조건

- 모든 필드 수집 완료
- `decision-log.md` 업데이트
- `.workflow/state.json`의 decisions 배열에 추가
- 사용자 확인 완료

## 후속 추적

나중에 실제 결과를 기록할 수 있음:

```
"이전에 '{결정}'을 결정했는데, 실제로 어땠나요?
예상대로 됐나요, 아니면 다른 결과가 나왔나요?"
```

→ `actualOutcome` 필드 업데이트

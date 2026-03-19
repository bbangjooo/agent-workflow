# Stage Router

Stage 간 전환을 관리하고 상태를 업데이트합니다.

## 설명

각 Stage의 시작과 완료를 처리하고, 상태 파일을 업데이트하며, 다음 Stage로의 전환을 관리합니다.

## 트리거

- progress-check 스킬 완료 후
- Stage 완료 시 자동 호출

## Stage 정보

| Stage | Phase ID | 커맨드/스킬 | 완료 산출물 |
|-------|----------|-------------|-------------|
| 0 | ideation | `/ideate` | `outputs/stage-0/idea-brief.md` |
| 1 | planning | `/plan` | `outputs/stage-1/prd.md` |
| 2 | design | `/design` | `outputs/stage-2/design-spec.md` |
| 3 | development | `/develop` | `outputs/stage-3/build-config.md` |
| 4 | deployment | `/deploy` | `outputs/stage-4/deployment-complete.md` |
| 5 | growth | `/grow` | `outputs/stage-5/acquisition-plan.md` |

> **Note**: Design-to-Dev Bridge는 Stage 3 (Development)의 첫 번째 Step(3.1)으로 통합되었습니다. `/develop` 커맨드 실행 시 자동으로 처리됩니다.

## 실행 내용

### 1. Stage 시작

Stage를 시작할 때 수행하는 작업:

```
1. 상태 파일 업데이트:
   - phases[n].status = "in_progress"
   - phases[n].startedAt = 현재시간 (최초 시작 시)
   - phases[n].lastModifiedAt = 현재시간
   - currentPhaseId = phases[n].id
   - lastModifiedAt = 현재시간

2. 시작 메시지 출력:
   "🎯 Stage {N}: {이름}을 시작합니다."

3. [Stage 0 전용] 사용자에게 어떤 제품을 만들고 싶은지 질문
   - 사용자의 답변을 받은 후에만 /ideate 호출
   - 사용자 응답 없이 /ideate를 자동 호출하는 것은 금지

4. 해당 Stage 커맨드 호출:
   /ideate, /plan, /design, /develop, /deploy, /grow
```

### 2. Stage 완료 확인

Stage가 완료되었는지 확인:

```
1. 산출물 파일 존재 확인
2. 존재하면 → Stage 완료 처리
3. 존재하지 않으면 → 대기 (사용자가 직접 완료할 때까지)
```

### 3. Stage 완료 처리

Stage가 완료되었을 때 수행하는 작업:

```
1. 상태 파일 업데이트:
   - phases[n].status = "completed"
   - phases[n].completedAt = 현재시간
   - phases[n].lastModifiedAt = 현재시간
   - phases[n].artifacts = [산출물 경로]
   - currentPhaseId = 다음 phase.id (또는 null)
   - lastModifiedAt = 현재시간

2. 완료 메시지 출력:
   "✅ Stage {N} 완료!"

3. 다음 Stage 확인:
   - 다음 Stage가 있으면 → 다음 Stage 시작
   - 없으면 (Stage 5 완료) → 전체 완료 처리
```

### 4. 전체 완료 처리

모든 Stage가 완료되었을 때:

```
1. 최종 결과 요약 출력
2. 라이브 URL 표시
3. 축하 메시지
```

## 상태 업데이트 예시

### Stage 시작 시

`.workflow/state.json` 변경:

```json
{
  "lastModifiedAt": "2024-01-15T10:30:00.000Z",
  "currentPhaseId": "planning",
  "phases": [
    {
      "id": "ideation",
      "status": "completed",
      ...
    },
    {
      "id": "planning",
      "status": "in_progress",
      "startedAt": "2024-01-15T10:30:00.000Z",
      "lastModifiedAt": "2024-01-15T10:30:00.000Z",
      ...
    },
    ...
  ]
}
```

### Stage 완료 시

```json
{
  "lastModifiedAt": "2024-01-15T12:00:00.000Z",
  "currentPhaseId": "design",
  "phases": [
    ...
    {
      "id": "planning",
      "status": "completed",
      "startedAt": "2024-01-15T10:30:00.000Z",
      "completedAt": "2024-01-15T12:00:00.000Z",
      "lastModifiedAt": "2024-01-15T12:00:00.000Z",
      "artifacts": ["outputs/stage-1/prd.md"]
    },
    {
      "id": "design",
      "status": "in_progress",
      "startedAt": "2024-01-15T12:00:00.000Z",
      ...
    },
    ...
  ]
}
```

## 출력 메시지

### Stage 시작

```
🎯 Stage {N}: {이름}을 시작합니다.

이 단계에서는:
- {설명 1}
- {설명 2}

---
```

Stage별 설명:

| Stage | 설명 |
|-------|------|
| 0 | 아이디어를 구체화하고 검증합니다 |
| 1 | 기능을 정의하고 PRD를 작성합니다 |
| 2 | 디자인 시스템과 UI 명세를 만듭니다 |
| 3 | 디자인-개발 브릿지 및 실제 코드를 작성하고 빌드합니다 |
| 4 | 무료 호스팅에 배포합니다 |
| 5 | 초기 유저 획득 전략을 수립합니다 |

### Stage 완료

```
✅ Stage {N}: {이름} 완료!

📄 산출물: {산출물 경로}

---

다음: Stage {N+1}: {다음 이름}
```

### 전체 완료

```
🎉 프로젝트 빌드 완료!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 결과 요약
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 산출물:
• 아이디어 브리프: outputs/stage-0/idea-brief.md
• PRD: outputs/stage-1/prd.md
• 디자인 명세: outputs/stage-2/design-spec.md
• 빌드 설정: outputs/stage-3/build-config.md
• 배포 완료: outputs/stage-4/deployment-complete.md
• 유저 획득 전략: outputs/stage-5/acquisition-plan.md

🌐 라이브 URL: https://{app-name}.vercel.app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
축하합니다! 아이디어가 실제 서비스가 되었습니다! 🎊
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 에러 처리

### Stage 커맨드 실패 시

```
⚠️ Stage {N}에서 문제가 발생했습니다.

{에러 내용}

다시 시도하려면 `/{커맨드}`를 실행하세요.
전체 워크플로우를 재시작하려면 `/build-project`를 실행하세요.
```

### 산출물 누락 시

```
⚠️ Stage {N}의 산출물을 찾을 수 없습니다.

예상 파일: {파일 경로}

Stage를 다시 실행합니다...
```

## 완료 조건

- Stage 시작 상태 업데이트 완료
- 해당 Stage 커맨드 호출 완료
- Stage 완료 상태 업데이트 완료
- 다음 Stage로 전환 또는 전체 완료

## 관련 스킬

- progress-check: 시작 지점 결정 후 stage-router 호출

> **Note**: Design-to-Dev Bridge는 Stage 3 (Development)의 Step 3.1로 통합되어 `/develop` 실행 시 자동으로 처리됩니다.

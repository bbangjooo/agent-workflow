# Progress Check

현재 워크플로우 진행 상황을 확인하고 시작 지점을 결정합니다.

## 설명

워크플로우 시작 시 기존 상태와 산출물을 확인하여 어디서부터 시작할지 결정합니다. 상태 파일이 없으면 초기화하고, 기존 산출물이 있으면 해당 Stage를 완료 처리합니다.

## 트리거

- `/build-project` 커맨드 실행 시 자동 시작

## 실행 내용

### 1. 상태 파일 확인

```
1. .workflow/state.json 파일 존재 확인
2. 없으면 → 초기 상태 파일 생성
3. 있으면 → 로드하여 현재 상태 파악
```

### 2. 산출물 스캔

각 Stage의 최종 산출물 존재 여부를 확인합니다:

| Stage | 확인할 파일 |
|-------|-------------|
| 0 | `outputs/stage-0/idea-brief.md` |
| 1 | `outputs/stage-1/prd.md` |
| 2 | `outputs/stage-2/design-spec.md` |
| 3 | `outputs/stage-3/build-config.md` |
| 4 | `outputs/stage-4/deployment-complete.md` |

### 3. 상태 동기화

산출물이 존재하지만 상태가 "pending"인 경우, 상태를 "completed"로 업데이트합니다.

```
산출물 존재 + 상태 pending → 상태를 completed로 변경
```

### 4. 시작 지점 결정

```python
# 로직
for stage in [0, 1, 2, 3, 4]:
    if stage.status != "completed":
        return stage  # 이 Stage부터 시작

# 모두 완료된 경우
return "all_completed"
```

### 5. 진행 상황 표시

```
📊 진행 상황:
- Stage 0 (Ideation): ✅ 완료
- Stage 1 (Planning): ✅ 완료
- Stage 2 (Design): ⬜ 대기
- Stage 3 (Development): ⬜ 대기
- Stage 4 (Deployment): ⬜ 대기

Stage 2 (Design)부터 시작합니다.
```

## 상태 아이콘

| 상태 | 아이콘 |
|------|--------|
| completed | ✅ 완료 |
| in_progress | 🔄 진행 중 |
| pending | ⬜ 대기 |
| skipped | ⏭️ 스킵 |

## 출력

### 처음 시작하는 경우

```markdown
📊 진행 상황:
- Stage 0 (Ideation): ⬜ 대기
- Stage 1 (Planning): ⬜ 대기
- Stage 2 (Design): ⬜ 대기
- Stage 3 (Development): ⬜ 대기
- Stage 4 (Deployment): ⬜ 대기

새 프로젝트를 시작합니다. Stage 0 (Ideation)부터 진행합니다.
어떤 아이디어를 구현하고 싶으세요?
```

### 중간부터 재개하는 경우

```markdown
📊 진행 상황:
- Stage 0 (Ideation): ✅ 완료
- Stage 1 (Planning): ✅ 완료
- Stage 2 (Design): ⬜ 대기
- Stage 3 (Development): ⬜ 대기
- Stage 4 (Deployment): ⬜ 대기

기존 진행 상황을 발견했습니다!
Stage 2 (Design)부터 이어서 진행합니다.
```

### 모두 완료된 경우

```markdown
📊 진행 상황:
- Stage 0 (Ideation): ✅ 완료
- Stage 1 (Planning): ✅ 완료
- Stage 2 (Design): ✅ 완료
- Stage 3 (Development): ✅ 완료
- Stage 4 (Deployment): ✅ 완료

🎉 이미 모든 Stage가 완료되었습니다!

라이브 URL: {URL}

새 프로젝트를 시작하려면 `/workflow-reset`을 실행하세요.
```

## 상태 파일 초기 구조

`.workflow/state.json`:

```json
{
  "workflowId": "solo-founder-workflow",
  "workflowName": "Solo Founder Project Builder",
  "projectName": null,
  "version": "1.0.0",
  "createdAt": "{timestamp}",
  "lastModifiedAt": "{timestamp}",
  "currentPhaseId": null,
  "phases": [
    {
      "id": "ideation",
      "name": "Stage 0: Ideation",
      "status": "pending",
      "order": 0,
      "steps": [],
      "artifacts": []
    },
    {
      "id": "planning",
      "name": "Stage 1: Planning",
      "status": "pending",
      "order": 1,
      "steps": [],
      "artifacts": []
    },
    {
      "id": "design",
      "name": "Stage 2: Design",
      "status": "pending",
      "order": 2,
      "steps": [],
      "artifacts": []
    },
    {
      "id": "development",
      "name": "Stage 3: Development",
      "status": "pending",
      "order": 3,
      "steps": [],
      "artifacts": []
    },
    {
      "id": "deployment",
      "name": "Stage 4: Deployment",
      "status": "pending",
      "order": 4,
      "steps": [],
      "artifacts": []
    }
  ]
}
```

## 완료 조건

- 상태 파일이 존재하거나 생성됨
- 산출물 스캔 완료
- 상태 동기화 완료
- 시작 지점 결정됨
- 진행 상황 표시됨

## 다음 단계

→ stage-router 스킬로 해당 Stage 시작

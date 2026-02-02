# Restore Point

복원 지점 생성 스킬

## 설명

이터레이션 전에 현재 상태를 저장하여 필요시 복원할 수 있도록 합니다.

## 트리거

- `/iterate` 실행 시 첫 번째로 호출

## 입력

- 이터레이션 대상 Stage
- 현재 워크플로우 상태

## 실행 내용

### 1. 복원 지점 디렉토리 생성

```
outputs/restore-points/{timestamp}_before-iterate-{stage}/
```

타임스탬프 형식: `YYYY-MM-DDTHH-mm-ss`

### 2. 현재 산출물 복사

복사 대상:
- `outputs/stage-0/` → `restore-point/stage-0/`
- `outputs/stage-1/` → `restore-point/stage-1/`
- ... (완료된 모든 Stage)
- `outputs/feedback/` → `restore-point/feedback/`
- `outputs/decisions/` → `restore-point/decisions/`

### 3. 상태 스냅샷 저장

```json
// restore-point/state-snapshot.json
{
  "snapshotAt": "2024-01-15T10:30:00Z",
  "reason": "Before iterate to planning",
  "originalState": { /* .workflow/state.json 전체 */ }
}
```

### 4. 복원 지점 메타데이터

```json
// restore-point/metadata.json
{
  "id": "rp-2024-01-15T10-30-00",
  "createdAt": "2024-01-15T10:30:00Z",
  "iterateFrom": "development",
  "iterateTo": "planning",
  "reason": "MVP 기능 목록에서 인증 기능 누락",
  "files": [
    "stage-0/idea-brief.md",
    "stage-1/prd.md",
    ...
  ]
}
```

## 산출물

```
outputs/restore-points/{timestamp}_before-iterate-{stage}/
├── metadata.json
├── state-snapshot.json
├── stage-0/
│   └── ...
├── stage-1/
│   └── ...
├── feedback/
│   └── ...
└── decisions/
    └── ...
```

## 완료 조건

- 디렉토리 생성 완료
- 모든 산출물 복사 완료
- 메타데이터 저장 완료
- 상태 스냅샷 저장 완료

## 다음 스킬

→ `rollback-to-stage.md`

## 복원 지점 관리

오래된 복원 지점 정리 권장:
- 30일 이상된 복원 지점 삭제 제안
- 버전당 최대 5개 유지 권장

```
"복원 지점이 많이 쌓였어요 (10개).
30일 이상 된 {n}개를 정리할까요?"
```

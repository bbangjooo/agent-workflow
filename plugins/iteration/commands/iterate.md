# /iterate

이전 Stage로 돌아가 개선하는 커맨드

## 사용법

```
/iterate planning     # Planning Stage부터 다시
/iterate design       # Design Stage부터 다시
/iterate ideation     # Ideation부터 다시
/iterate development  # Development부터 다시
```

## 설명

현재 진행 중인 워크플로우에서 이전 Stage로 돌아가 개선합니다. 현재 상태는 restore point로 저장되어 필요시 복원할 수 있습니다.

## 트리거

- `/reflect` 후 이터레이션 필요 판단 시 제안
- 사용자가 직접 호출

## 실행 스킬 순서

1. `restore-point.md` - 현재 상태 저장
2. `rollback-to-stage.md` - 해당 Stage로 롤백
3. 해당 Stage 커맨드 실행 (예: `/plan`)

## Agent

- `iteration-coach.md` 사용

## 입력

- 대상 Stage ID (필수)
- 이터레이션 이유 (대화로 수집)

## 실행 내용

### 1. 이터레이션 확인

```
"/iterate {stage}를 실행하려고 해요.

이렇게 되면:
1. 현재 상태가 복원 지점으로 저장됩니다
2. {stage} 이후의 진행 상태가 초기화됩니다
3. {stage}부터 다시 시작합니다

계속할까요?"
```

### 2. 이유 수집

```
"어떤 이유로 돌아가려고 하세요?
(나중에 왜 이 결정을 했는지 기억하기 위해 기록해둘게요)"
```

### 3. Restore Point 생성

```
outputs/restore-points/{timestamp}_before-iterate-{stage}/
├── stage-0/
├── stage-1/
├── ...
├── feedback/
└── decisions/
```

### 4. 상태 롤백

`.workflow/state.json` 업데이트:
- 대상 Stage 이후의 Phase들을 `pending`으로 변경
- `currentPhaseId`를 대상 Stage로 변경
- `iterations` 배열에 새 이터레이션 기록 추가

### 5. 컨텍스트 전달

이전에 수집된 피드백을 해당 Stage에 전달:

```
"이전에 이런 피드백이 있었어요:
{관련 피드백 요약}

이 부분들을 염두에 두고 진행해볼까요?"
```

### 6. Stage 시작

해당 Stage 커맨드 자동 실행 또는 안내

## 산출물

1. `outputs/restore-points/{timestamp}_before-iterate-{stage}/` - 복원 지점
2. `.workflow/state.json` 업데이트 - iterations 배열에 기록

## Iteration 기록 예시

```json
{
  "id": "iter-001",
  "fromPhase": "development",
  "toPhase": "planning",
  "reason": "MVP 기능 목록에서 인증 기능이 누락되어 있었음",
  "timestamp": "2024-01-15T10:30:00Z",
  "restorePoint": "outputs/restore-points/2024-01-15T10-30-00_before-iterate-planning",
  "changes": []
}
```

## 완료 조건

- 사용자 확인 완료
- Restore point 생성 완료
- 상태 롤백 완료
- 해당 Stage 시작됨

## 롤백 옵션

이터레이션이 불필요했다고 판단되면:

```
/restore {restore-point-id}
```

로 이전 상태로 복원 가능 (별도 커맨드, 추후 구현)

## 주의사항

1. **코드 변경 주의**: Development 이후에서 iterate하면 작성된 코드는 그대로 유지되지만, 산출물(문서)은 새로 생성됨
2. **연쇄 영향**: Planning으로 돌아가면 Design, Development, Deployment 모두 재진행 필요
3. **복원 지점 관리**: 오래된 복원 지점은 주기적으로 정리 권장

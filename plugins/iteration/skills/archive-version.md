# Archive Version

버전 아카이브 스킬

## 설명

현재 버전의 모든 산출물을 아카이브하고 새 버전을 위한 준비를 합니다.

## 트리거

- `/next-version` 실행 시 첫 번째로 호출

## 입력

- 현재 버전 번호
- 버전 완료 메모 (선택적)

## 실행 내용

### 1. 아카이브 디렉토리 생성

```
outputs/versions/v{n}/
```

### 2. 산출물 이동

```
outputs/stage-0/     → outputs/versions/v{n}/stage-0/
outputs/stage-1/     → outputs/versions/v{n}/stage-1/
outputs/stage-2/     → outputs/versions/v{n}/stage-2/
outputs/stage-3/     → outputs/versions/v{n}/stage-3/
outputs/stage-4/     → outputs/versions/v{n}/stage-4/
outputs/feedback/    → outputs/versions/v{n}/feedback/
outputs/decisions/   → outputs/versions/v{n}/decisions/
```

### 3. 버전 메타데이터 생성

```json
// outputs/versions/v{n}/version-meta.json
{
  "version": 1,
  "name": "v1",
  "completedAt": "2024-01-15T10:30:00Z",
  "duration": {
    "startedAt": "2024-01-01T00:00:00Z",
    "completedAt": "2024-01-15T10:30:00Z",
    "totalDays": 14
  },
  "stats": {
    "totalIterations": 3,
    "totalDecisions": 12,
    "totalReflections": 5
  },
  "summary": {
    "goals": ["MVP 출시", "핵심 기능 검증"],
    "achievements": ["랜딩 페이지 배포", "100명 사용자 확보"],
    "learnings": ["온보딩 플로우 개선 필요", "모바일 최적화 필요"]
  },
  "artifacts": {
    "ideaBrief": "stage-0/idea-brief.md",
    "prd": "stage-1/prd.md",
    "designSpec": "stage-2/design-spec.md",
    "buildConfig": "stage-3/build-config.md",
    "deploymentComplete": "stage-4/deployment-complete.md"
  },
  "deploymentUrl": "https://my-app-v1.vercel.app"
}
```

### 4. 버전 요약 생성

```markdown
// outputs/versions/v{n}/VERSION-SUMMARY.md
# v{n} Summary

## 개요
- **기간**: {시작일} ~ {완료일} ({n}일)
- **배포 URL**: {url}

## 목표 및 달성

### 목표
1. {목표 1}
2. {목표 2}

### 달성
- ✅ {달성 1}
- ✅ {달성 2}
- ❌ {미달성}

## 핵심 지표
- 이터레이션: {n}회
- 의사결정: {n}개
- 회고: {n}회

## 주요 학습
1. {학습 1}
2. {학습 2}

## v{n+1}을 위한 제안
1. {제안 1}
2. {제안 2}

## 산출물 목록
- [Idea Brief](./stage-0/idea-brief.md)
- [PRD](./stage-1/prd.md)
- [Design Spec](./stage-2/design-spec.md)
- [Build Config](./stage-3/build-config.md)
- [Deployment](./stage-4/deployment-complete.md)
```

### 5. 상태 업데이트

`.workflow/state.json` 수정:

```json
{
  "productVersion": 2,  // 증가
  "archivedVersions": ["outputs/versions/v1"],
  "currentPhaseId": null,
  "phases": [
    { "id": "ideation", "status": "pending", ... },
    { "id": "planning", "status": "pending", ... },
    ...
  ],
  "iterations": [],  // 초기화
  "decisions": [],   // 초기화 (아카이브에 보존됨)
  "feedbackSummary": null  // 초기화
}
```

### 6. 새 버전 디렉토리 준비

빈 디렉토리 구조 생성:
```
outputs/
├── versions/v{n}/  # 아카이브
├── stage-0/        # 빈 폴더
├── stage-1/        # 빈 폴더
├── stage-2/        # 빈 폴더
├── stage-3/        # 빈 폴더
├── stage-4/        # 빈 폴더
├── feedback/       # 빈 폴더
└── decisions/      # 빈 폴더
```

## 산출물

1. `outputs/versions/v{n}/` - 아카이브된 버전
2. `outputs/versions/v{n}/version-meta.json` - 버전 메타데이터
3. `outputs/versions/v{n}/VERSION-SUMMARY.md` - 버전 요약
4. `.workflow/state.json` 업데이트

## 완료 조건

- 모든 산출물 이동 완료
- 메타데이터 생성 완료
- 요약 문서 생성 완료
- 상태 업데이트 완료
- 새 버전 디렉토리 준비 완료

## 다음 스킬

→ 새 버전 목표 설정 (대화로 진행)
→ `/ideate` 시작

## 참고

아카이브된 버전은 언제든 참조 가능:
```
이전 버전 PRD: outputs/versions/v1/stage-1/prd.md
이전 버전 디자인: outputs/versions/v1/stage-2/design-spec.md
```

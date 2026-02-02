# /new-product

완전히 새로운 제품을 시작하는 커맨드

## 사용법

```
/new-product          # 새 제품 시작
```

## 설명

현재 프로젝트를 완전히 아카이브하고, 새로운 제품 아이디어로 처음부터 시작합니다. 기존 제품과는 독립적인 새로운 프로젝트입니다.

## 트리거

- 사용자가 완전히 다른 아이디어를 원할 때
- 기존 제품을 중단하고 새로 시작할 때

## 실행 내용

### 1. 확인

```
"새 제품을 시작하려고 해요.

현재 프로젝트 '{project_name}'의 모든 내용이 아카이브됩니다.
(삭제되지 않고 보관됩니다)

계속할까요?"
```

### 2. 현재 프로젝트 아카이브

```
현재 프로젝트를 products/ 디렉토리로 이동:

products/
└── {project_name}_{date}/
    ├── outputs/
    │   ├── versions/
    │   ├── stage-0/
    │   └── ...
    ├── .workflow/
    └── PROJECT-ARCHIVE.md
```

### 3. 아카이브 요약 생성

```markdown
// products/{project_name}_{date}/PROJECT-ARCHIVE.md
# Project Archive: {project_name}

## 프로젝트 정보
- **이름**: {project_name}
- **시작일**: {date}
- **아카이브일**: {date}
- **최종 버전**: v{n}

## 상태
- **마지막 Stage**: {stage}
- **배포 여부**: {yes/no}
- **배포 URL**: {url if deployed}

## 아카이브 이유
{사용자가 제공한 이유}

## 버전 히스토리
- v1: {요약}
- v2: {요약}

## 핵심 학습
{프로젝트에서 배운 것들}

## 나중에 다시 볼 때
- 아이디어: outputs/stage-0/idea-brief.md
- 기획: outputs/stage-1/prd.md
- 디자인: outputs/stage-2/design-spec.md
```

### 4. 새 프로젝트 초기화

새로운 `.workflow/state.json`:

```json
{
  "workflowId": "solo-founder-workflow",
  "workflowName": "Solo Founder Project Builder",
  "projectName": null,
  "version": "1.0.0",
  "productVersion": 1,
  "createdAt": "2024-01-15T10:30:00Z",
  "lastModifiedAt": "2024-01-15T10:30:00Z",
  "currentPhaseId": null,
  "phases": [
    { "id": "ideation", "status": "pending", ... },
    ...
  ],
  "iterations": [],
  "decisions": [],
  "archivedVersions": [],
  "metadata": {
    "previousProjects": ["products/{project_name}_{date}"]
  }
}
```

### 5. 새 프로젝트 시작

```
"새 제품을 시작할 준비가 됐어요!

💾 이전 프로젝트: products/{project_name}_{date}/에 보관됨

이제 새로운 아이디어로 시작해볼까요?
어떤 제품을 만들고 싶으세요?"
```

→ `/ideate` 자동 시작 또는 안내

## 산출물

1. `products/{project_name}_{date}/` - 아카이브된 프로젝트
2. `products/{project_name}_{date}/PROJECT-ARCHIVE.md` - 아카이브 요약
3. 초기화된 `.workflow/state.json`
4. 빈 `outputs/` 디렉토리

## 완료 조건

- 현재 프로젝트 아카이브 완료
- 아카이브 요약 생성 완료
- 새 프로젝트 상태 초기화 완료
- Ideation 시작 준비 완료

## /new-product vs /next-version 차이

| | /next-version | /new-product |
|--|--------------|--------------|
| **목적** | 같은 제품의 다음 버전 | 완전히 다른 제품 |
| **아이디어** | 기존 발전 | 완전히 새로움 |
| **아카이브 위치** | outputs/versions/ | products/ |
| **상태 연속성** | 유지 (버전 증가) | 완전 초기화 |
| **이전 참조** | 쉬움 | 가능하지만 분리됨 |

## 이전 프로젝트 접근

아카이브된 프로젝트는 언제든 접근 가능:

```
products/
├── my-first-app_2024-01-15/
│   ├── outputs/
│   └── ...
├── another-idea_2024-02-01/
│   └── ...
└── current-project/  # 현재 프로젝트
    └── ...
```

## 프로젝트 복원 (추후 기능)

나중에 아카이브된 프로젝트 복원:

```
/restore-project products/my-first-app_2024-01-15
```

# Cross-Stage Review

Stage 간 교차 검토 스킬

## 설명

두 Stage의 산출물을 비교하여 정합성을 검토합니다. 누락, 불일치, 개선 필요 항목을 식별합니다.

## 트리거

- `/review` 커맨드 실행 시 호출

## 입력

- Source Stage ID
- Target Stage ID
- 각 Stage의 산출물 경로

## 검토 매트릭스

### Ideation → Planning

| Source 항목 | Target 확인 위치 | 검토 내용 |
|------------|----------------|----------|
| MVP 기능 목록 | feature-priority.md | 모든 기능이 우선순위에 포함됨 |
| 타겟 사용자 | user-stories.md | 사용자 스토리의 주체와 일치 |
| 핵심 가치 | prd.md | 핵심 가치가 PRD에 반영됨 |

### Planning → Design

| Source 항목 | Target 확인 위치 | 검토 내용 |
|------------|----------------|----------|
| 화면 구조 | wireframes.md | 모든 화면이 와이어프레임에 있음 |
| 기능 목록 | component-spec.md | 기능별 컴포넌트가 정의됨 |
| 사용자 플로우 | design-spec.md | 플로우가 디자인에 반영됨 |

### Design → Development

| Source 항목 | Target 확인 위치 | 검토 내용 |
|------------|----------------|----------|
| 컴포넌트 목록 | src/components/ | 컴포넌트가 구현됨 |
| 색상 팔레트 | CSS/tailwind.config | 색상이 코드에 반영됨 |
| 화면 목록 | src/pages/ or routes/ | 모든 화면이 구현됨 |

### Planning → Development

| Source 항목 | Target 확인 위치 | 검토 내용 |
|------------|----------------|----------|
| API 엔드포인트 | api/ or routes/ | 모든 API가 구현됨 |
| 데이터 모델 | schema or models/ | 모델이 정의됨 |
| 기능 명세 | 코드 전반 | 기능이 구현됨 |

## 실행 내용

### 1. 산출물 로드

```
Source: outputs/stage-{n}/
Target: outputs/stage-{m}/ 또는 소스 코드
```

### 2. 항목 추출

Source 산출물에서 검토 대상 항목 추출:
- 목록 (기능, 화면, 컴포넌트 등)
- 정의 (색상, 타이포그래피 등)
- 플로우 (사용자 여정 등)

### 3. 매칭 검사

각 항목에 대해 Target에서 대응 항목 확인:
- ✅ Found: 정확히 일치
- ⚠️ Partial: 부분적 일치 또는 불일치
- ❌ Missing: 찾을 수 없음

### 4. 결과 분류

```
Critical (즉시 수정 필요):
- 핵심 기능/화면 누락
- 중요한 불일치

Warning (검토 권장):
- 사소한 불일치
- 미사용 항목

Info (참고):
- 스타일 미세 차이
- 추가된 항목 (Source에 없는 것)
```

### 5. 리포트 생성

`outputs/feedback/review-{source}-vs-{target}.md` 생성

## 산출물

```markdown
# Review: {Source} → {Target}

## Summary
- ✅ Matched: {n}
- ⚠️ Issues: {n}
- ❌ Missing: {n}

## Critical Issues
...

## Warnings
...

## Detailed Results
| Item | Status | Notes |
|------|--------|-------|
| ... | ... | ... |
```

## 자동 검토 규칙

### 화면 구조 검토
1. screen-structure.md에서 화면 목록 추출
2. wireframes.md 또는 design-spec.md에서 대응 확인
3. 누락된 화면 식별

### 컴포넌트 검토
1. design-system.md에서 컴포넌트 목록 추출
2. component-spec.md에서 스펙 확인
3. 실제 코드에서 구현 확인

### 기능 검토
1. feature-priority.md에서 MVP 기능 추출
2. 각 Stage에서 해당 기능 반영 확인

## 완료 조건

- 모든 검토 항목 확인 완료
- 결과 분류 완료
- 리포트 생성 완료
- 다음 액션 제안

## 제한사항

- 코드 검토는 파일/폴더 존재 여부만 확인 (내용 분석은 제한적)
- 복잡한 로직 검토는 수동 필요
- 디자인 시각적 검토는 불가 (텍스트 기반)

# Progress Locate - 현재 위치 파악

ROADMAP 상에서 현재 어디까지 진행되었는지 분석하고, 다음에 할 일을 제시합니다.

## 트리거

`/where` 명령 실행 시 호출됩니다.

## 입력

- `outputs/roadmap/roadmap.md` (필수)
- `outputs/roadmap/goal.md` (필수)
- 코드베이스 현재 상태
- Git 커밋 히스토리
- `outputs/` 디렉토리의 모든 산출물
- 기존 `outputs/roadmap/progress.md` (있으면 이전 리포트와 비교)

## 실행 내용

### 1. 사전 조건 확인

`outputs/roadmap/roadmap.md`가 존재하는지 확인합니다. 없으면 `/roadmap`을 먼저 실행하라고 안내하고 종료합니다.

### 2. ROADMAP 로드

`outputs/roadmap/roadmap.md`를 읽고 모든 Phase와 Step을 파싱합니다.

### 3. 진행 상황 분석

각 Step의 완료 여부를 다음 근거를 통해 판단합니다:

- **코드 분석**: 해당 기능이 구현되어 있는가?
- **Git 히스토리**: 관련 커밋이 있는가?
- **산출물 확인**: `outputs/` 에 관련 산출물이 생성되어 있는가?
- **테스트 확인**: 관련 테스트가 통과하는가?

각 판단에는 반드시 **근거**를 명시합니다. 확인할 수 없는 것은 "미확인"으로 표시합니다.

### 4. 현재 위치 결정

완료된 Step과 미완료 Step의 경계를 찾아 현재 위치를 결정합니다.

### 5. 다음 할 일 결정

미완료 Step 중 가장 우선순위가 높은 1~3개를 선정합니다. 선정 기준:

- ROADMAP 순서상 다음인 것
- 선행 작업이 이미 완료된 것
- 목표 기여도가 높은 것

### 6. 진행 리포트 작성

`outputs/roadmap/progress.md`에 작성합니다.

### 7. ROADMAP 업데이트

분석 결과를 바탕으로 `outputs/roadmap/roadmap.md`의 체크박스를 업데이트합니다 (완료된 Step에 `[x]` 표시).

## 산출물

- `outputs/roadmap/progress.md`
- `outputs/roadmap/roadmap.md` (체크박스 업데이트)

## 완료 조건

- 모든 Step에 대해 완료/미완료 판단이 근거와 함께 포함됨
- 현재 위치가 명확히 표시됨
- 바로 다음에 할 작업이 1~3개 구체적으로 제시됨

## 다음 스킬

없음 (명령 종료) — 사용자에게 `/align`과 다음 작업을 안내

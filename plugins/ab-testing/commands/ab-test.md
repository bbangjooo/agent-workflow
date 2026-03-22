# /ab-test - AB 테스트 매니저

AB 테스트의 전체 라이프사이클을 관리합니다. 실험 주제를 말하면 가설부터 분석 프레임워크까지 구상합니다.

## 트리거

- `/ab-test` 커맨드 실행 시
- `/ab-test list` — 실험 목록 조회
- `/ab-test analyze {experiment-id}` — 기존 실험 결과 분석

## 서브커맨드

### `/ab-test` (기본 — 새 실험 설계)

AB Test Coach 에이전트를 호출하여 새 실험을 설계합니다.

```
1. 사용자에게 프로젝트명과 실험 주제를 질문
2. 기존 프로젝트가 있으면 outputs/ab-tests/{project}/ 확인
3. 새 experiment-id 자동 생성
4. Step 1~4 순차 실행
```

### `/ab-test list`

진행 중이거나 완료된 실험 목록을 보여줍니다.

```
1. outputs/ab-tests/ 하위 모든 프로젝트 디렉토리 탐색
2. 각 프로젝트의 experiments.md 읽기
3. 전체 실험 목록을 상태별로 정리하여 출력

출력 형식:
📋 AB 테스트 목록

[프로젝트명]
  ✅ exp-001-signup-button-color — 회원가입 버튼 색상 (완료)
  🔄 exp-002-pricing-page-layout — 가격 페이지 레이아웃 (진행 중)

[다른 프로젝트]
  ⏳ exp-001-onboarding-flow — 온보딩 플로우 (설계 완료, 실행 대기)
```

### `/ab-test analyze {experiment-id}`

기존 실험의 결과 데이터를 분석합니다.

```
1. experiment-id로 해당 실험 디렉토리 찾기
2. hypothesis.md, experiment-plan.md, analysis-framework.md 읽기
3. 사용자에게 실험 결과 데이터 입력 요청
4. analysis-framework.md 기준으로 통계적 분석 수행
5. experiment-summary.md 업데이트 (결과, 학습점, 후속 실험 추천)
```

## 실행 순서 (새 실험 설계)

### Step 1: Hypothesis Design (가설 설계)

```
1. 사용자의 실험 주제 파악
2. 현상(As-is) 분석 — 현재 상태와 문제점 정리
3. 가설 수립 — "만약 X를 Y로 바꾸면, Z 지표가 N% 개선될 것이다"
4. 변형(Variant) 정의 — Control(기존) vs Treatment(변경) 상세 명세
5. 성공 지표(Primary/Secondary KPI) 설정
6. 가드레일 지표 설정 — 실험이 해치면 안 되는 지표
7. 산출물: hypothesis.md
```

### Step 2: Experiment Plan (실험 실행 계획)

```
1. 최소 샘플 사이즈 계산 (MDE, 유의수준, 검정력 기반)
2. 예상 실험 기간 산정 (일일 트래픽 기반)
3. 트래픽 분배 전략 (50/50 or 다른 비율)
4. 세그먼트 고려사항 (신규/기존, 디바이스, 지역 등)
5. 기술 구현 가이드 — 어디에 어떻게 분기를 넣을지
6. 실험 시작/종료 조건 정의
7. 산출물: experiment-plan.md
```

### Step 3: Analysis Framework (결과 분석 프레임워크)

```
1. 통계 방법론 선택 (빈도주의 vs 베이지안, 단측 vs 양측)
2. 유의수준(α) 및 검정력(1-β) 설정
3. 다중 비교 보정 방법 (필요 시)
4. 결과 해석 시나리오별 가이드
   - Treatment 승리 → 롤아웃 기준
   - Control 승리 → 학습점 정리
   - 무승부(inconclusive) → 다음 액션
5. Novelty/Primacy effect 대응 방안
6. 세그먼트별 분석 계획
7. 산출물: analysis-framework.md
```

### Step 4: Experiment Log (실험 관리)

```
1. 실험 전체 요약 생성
2. 실험 상태 설정 (설계완료 → 실행대기)
3. 프로젝트 experiments.md 인덱스 업데이트
4. 학습점(Learnings) 섹션 준비
5. 후속 실험 추천 (이 실험 결과에 따른 다음 실험 제안)
6. 산출물: experiment-summary.md, experiments.md 업데이트
```

## 산출물

| 파일 | 설명 |
|------|------|
| `outputs/ab-tests/{project}/experiments.md` | 프로젝트 실험 인덱스 |
| `outputs/ab-tests/{project}/{exp-id}/hypothesis.md` | 가설 설계서 |
| `outputs/ab-tests/{project}/{exp-id}/experiment-plan.md` | 실험 실행 계획 |
| `outputs/ab-tests/{project}/{exp-id}/analysis-framework.md` | 결과 분석 프레임워크 |
| `outputs/ab-tests/{project}/{exp-id}/experiment-summary.md` | 실험 요약 및 학습점 |

## 완료 조건

- 4개 산출물 모두 생성
- experiments.md 인덱스에 실험 등록
- 사용자가 실험 설계 승인

# Error Capture

Step D.1: 에러 수집 (Error Capture)

## 설명

사용자가 제공한 에러 정보를 수집하고, 에러 유형을 분류하여 이후 분석의 기반을 마련합니다.

## 트리거

- `/debug` 커맨드 실행 시 첫 번째로 실행
- 사용자가 에러 메시지를 공유할 때

## 입력

- 사용자가 제공한 에러 메시지
- 에러 발생 컨텍스트 (개발 중 / 빌드 시 / 배포 후 / 런타임)
- 스크린샷 또는 로그 (선택)

## 실행 내용

### 질문 가이드

에러 정보가 불충분할 경우 다음 질문을 통해 정보 수집:

1. **에러 메시지**
   - "에러 메시지 전체를 그대로 붙여주실 수 있나요?"
   - "터미널/콘솔에 표시된 전체 출력을 공유해주세요"

2. **발생 시점**
   - "이 에러가 언제 발생했나요?"
   - 선택지: 개발 중 (npm run dev) / 빌드 시 (npm run build) / 배포 후 / 브라우저에서

3. **컨텍스트**
   - "어떤 작업을 하다가 이 에러가 발생했나요?"
   - "이전에는 정상 동작했나요? 최근 변경한 부분이 있나요?"

4. **재현 조건**
   - "특정 조건에서만 발생하나요, 아니면 항상 발생하나요?"

### 에러 유형 분류

| 유형 | 식별 패턴 | 설명 |
|------|----------|------|
| **Build Error** | `build failed`, `Module not found`, `SyntaxError` | 빌드 과정에서 발생 |
| **Type Error** | `Type '...' is not assignable`, `Property does not exist` | TypeScript 컴파일 에러 |
| **Runtime Error** | `TypeError`, `ReferenceError`, `Cannot read property` | 실행 중 발생 |
| **Deploy Error** | `502`, `503`, `CORS`, `Environment variable` | 배포/프로덕션 환경 |
| **Database Error** | `connection refused`, `ECONNREFUSED`, `query failed` | DB 관련 에러 |
| **Auth Error** | `401`, `403`, `Unauthorized`, `token` | 인증/권한 관련 |
| **Network Error** | `fetch failed`, `ENOTFOUND`, `timeout` | 네트워크/API 호출 |

### 에러 심각도 분류

| 심각도 | 설명 | 예시 |
|--------|------|------|
| **Critical** | 앱이 전혀 실행되지 않음 | 빌드 실패, 서버 시작 불가 |
| **High** | 핵심 기능 동작 불가 | 인증 실패, DB 연결 불가 |
| **Medium** | 일부 기능에 영향 | 특정 페이지 에러, API 일부 실패 |
| **Low** | 사용성에 영향 적음 | 경고, 스타일 깨짐 |

### 대화 원칙

- 에러 메시지를 있는 그대로 받아들이기 (추측하지 않음)
- 충분한 정보가 수집될 때까지 질문
- 사용자의 기술 수준에 맞게 질문 난이도 조절
- "에러가 나서 당황스러우실 텐데, 함께 해결해봐요" 같은 안심 멘트

## 산출물

`outputs/debugging/error-report.md`

```markdown
# 에러 리포트

## 메타데이터
- Step: D.1 - 에러 수집
- 생성일시: {현재 시간}
- 상태: final

## 에러 정보

### 에러 메시지
```
{사용자가 제공한 원본 에러 메시지}
```

### 분류
| 항목 | 값 |
|------|-----|
| 에러 유형 | {Build/Type/Runtime/Deploy/Database/Auth/Network} |
| 심각도 | {Critical/High/Medium/Low} |
| 발생 시점 | {개발 중/빌드 시/배포 후/런타임} |

### 컨텍스트
- **발생 상황**: {어떤 작업 중 발생했는지}
- **최근 변경 사항**: {있다면 기록}
- **재현 조건**: {항상/특정 조건에서만}

### 관련 키워드
- {에러에서 추출한 핵심 키워드 1}
- {에러에서 추출한 핵심 키워드 2}
- {에러에서 추출한 핵심 키워드 3}

## 예상 원인 (가설)
1. {가장 가능성 높은 원인}
2. {두 번째 가능성}
3. {세 번째 가능성}

## 다음 단계

→ Step D.2: Root Cause Analysis (원인 분석)
- 에러 메시지 상세 해석
- 관련 코드/설정 파일 검토
- 가설 검증
```

## 완료 조건

- 에러 메시지 원본 확보
- 에러 유형 분류 완료
- 발생 컨텍스트 파악 완료
- `error-report.md` 파일이 생성됨

## 다음 Step

→ Step D.2: Root Cause Analysis (원인 분석)

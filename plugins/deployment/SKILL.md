# Stage 4: Deployment (배포)

1인 창업자의 MVP를 무료 호스팅에 자동으로 배포하는 워크플로우 플러그인입니다.

## 개요

이 플러그인은 Stage 3(개발)에서 생성된 코드를 입력으로 받아, 최소한의 사용자 개입으로 라이브 서비스를 배포합니다. 기술 스택을 자동 감지하여 최적의 무료 호스팅을 선택하고, 배포 과정을 자동화합니다.

## 사전 조건

- Stage 3 완료 (`/develop`)
- `outputs/stage-3/build-config.md` 파일 존재
- 실제 프로젝트 코드 존재

## 사용 방법

```
/deploy
```

이 커맨드 하나로 Deploy Coach 에이전트가 전체 배포 과정을 자동으로 진행합니다.

## 워크플로우

```
/deploy 실행
    |
Deploy Coach 에이전트가 배포 주도
    |
+-------------------------------------------------------------+
|  Step 4.1: Deploy Preparation (배포 준비)                    |
|  스킬: deploy-prep                                          |
|  산출물: deploy-prep.md                                     |
|  유형: 자동                                                 |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 4.2: Deploy Execution (배포 실행)                      |
|  스킬: deploy-execution                                     |
|  산출물: deploy-log.md                                      |
|  유형: 자동 (에러 시 하이브리드)                            |
+-------------------------------------------------------------+
|                           |                                  |
+-------------------------------------------------------------+
|  Step 4.3: Launch Verification (런칭 검증)                   |
|  스킬: launch-verification                                  |
|  산출물: deployment-complete.md (최종)                      |
|  유형: 자동                                                 |
+-------------------------------------------------------------+
```

## 주요 컴포넌트

### Command

- **/deploy**: Stage 4 전체 워크플로우 시작 (유일한 진입점)

### Agent

- **Deploy Coach**: 자동화 중심의 배포 전문가. 기술 스택을 분석하여 최적의 배포 전략을 실행합니다.

### Skills

| 스킬 | Step | 설명 |
|------|------|------|
| deploy-prep | 4.1 | 기술 스택 분석, 호스팅 자동 선택, 환경변수 설정 안내 |
| deploy-execution | 4.2 | 배포 명령 실행, 빌드 에러 자동 해결 |
| launch-verification | 4.3 | 헬스체크, 핵심 기능 검증, 라이브 URL 전달 |

### References

#### 호스팅 플랫폼 (앱이 실행되는 곳)

| 문서 | 설명 |
|------|------|
| platforms/vercel.md | Vercel 배포 가이드 (Next.js 기본) |
| platforms/netlify.md | Netlify 배포 가이드 (React SPA) |
| platforms/railway.md | Railway 배포 가이드 (백엔드/풀스택) |

#### 백엔드 서비스 (앱이 연결하는 외부 서비스)

| 문서 | 설명 |
|------|------|
| services/supabase.md | Supabase 연동 가이드 (Auth, DB, Storage) |
| services/firebase.md | Firebase 연동 가이드 (예정) |
| services/postgresql.md | PostgreSQL 직접 연결 가이드 (예정) |

## 산출물

모든 산출물은 `outputs/stage-4/` 디렉토리에 저장됩니다:

| 파일명 | Step | 설명 |
|--------|------|------|
| deploy-prep.md | 4.1 | 배포 준비 (호스팅 선택, 환경변수) |
| deploy-log.md | 4.2 | 배포 실행 로그 |
| **deployment-complete.md** | 4.3 | **최종 배포 완료 (라이브 URL 포함)** |

## 자동화 전략

| 항목 | 자동화 방식 |
|------|-------------|
| 호스팅 선택 | 기술 스택 기반 자동 결정 |
| 환경변수 | `.env.example`에서 자동 추출 |
| 배포 명령 | CLI 명령어 자동 생성 |
| 에러 처리 | 흔한 에러 패턴 자동 감지 & 수정 |
| 검증 | 배포 URL 자동 헬스체크 |

## 무료 티어 매핑

### 호스팅 플랫폼

| 기술 스택 | 권장 호스팅 | 무료 티어 |
|-----------|-------------|-----------|
| Next.js + Supabase | Vercel | 무제한 배포, 100GB 대역폭 |
| Next.js + Firebase | Vercel | 동일 |
| React SPA | Netlify | 무제한 배포, 100GB 대역폭 |
| Express 백엔드 | Railway | $5 크레딧/월 |

### 백엔드 서비스

| 서비스 | 무료 티어 | 비고 |
|--------|-----------|------|
| Supabase | DB 500MB, Storage 1GB, 2 프로젝트 | 7일 비활성 시 일시 중지 |
| Firebase | Spark 플랜 (제한적) | Firestore 1GB, Storage 5GB |
| PlanetScale | 5GB storage, 1B reads/월 | MySQL 호환 |

## 다음 단계

Stage 4 완료 후 라이브 서비스가 배포됩니다!

```
배포 완료! 🎉
라이브 URL: https://your-app.vercel.app
```

## 의존성

- `development` 플러그인
- `workflow-state-manager` 플러그인 (상태 추적용, 선택사항)

## 1인 창업자를 위한 핵심 포인트

1. **무료 티어 우선**: 비용 없이 시작
2. **자동화 중심**: 최소한의 개입으로 배포 완료
3. **에러 자동 해결**: 흔한 배포 에러 자동 감지 & 수정 제안
4. **복사-붙여넣기**: 필요한 명령어는 복사해서 바로 실행
5. **빠른 피드백**: 배포 후 즉시 확인 가능

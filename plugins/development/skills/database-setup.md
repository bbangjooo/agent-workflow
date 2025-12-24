# Database Setup

Step 3.4: 데이터베이스 설정 (Database Setup)

> **역할: Backend**
> 데이터베이스 서비스 프로젝트 생성, 환경변수 설정 (인프라 관점)

## 설명

선택한 데이터베이스 서비스(Supabase, Firebase, PlanetScale, Neon 등)의 프로젝트를 생성하고, 필요한 환경변수를 설정하는 스킬입니다. 인프라 레벨의 DB 준비 작업을 담당합니다.

> 코드 레벨의 ORM/클라이언트 설정은 다음 Step(ORM Setup)에서 진행합니다.

## 트리거

- Step 3.3 (Project Setup) 완료 후 실행
- 프로젝트가 생성되어 있을 때
- `tech-stack.md`에서 DB 선택이 완료되었을 때

## 입력

- `outputs/stage-3/tech-stack.md`
- `outputs/stage-3/project-setup.md`

## 실행 내용

### 1. 데이터베이스 서비스 선택 확인

`tech-stack.md`에서 선택된 DB 서비스를 확인합니다.

| DB 서비스 | 유형 | 특징 |
|-----------|------|------|
| Supabase | PostgreSQL (BaaS) | 인증, 실시간, 스토리지 통합 |
| Firebase | NoSQL (Firestore) | Google 생태계, 실시간 |
| PlanetScale | MySQL (Serverless) | 브랜치 기반 스키마 관리 |
| Neon | PostgreSQL (Serverless) | 브랜치, 관대한 무료 티어 |

### 2. 데이터베이스 프로젝트 생성

선택한 DB 서비스에 따라 `references/databases/` 문서를 참조하여 진행합니다.

| DB 서비스 | 참조 문서 | 주요 작업 |
|-----------|-----------|-----------|
| Supabase | `references/databases/supabase-setup.md` | 프로젝트 생성, 리전 선택 |
| Firebase | `references/databases/firebase-setup.md` | 프로젝트 생성, Firestore 활성화 |
| PlanetScale | `references/databases/planetscale-setup.md` | 데이터베이스 생성, 브랜치 설정 |
| Neon | `references/databases/neon-setup.md` | 프로젝트 생성, 브랜치 설정 |

#### 공통 체크리스트

- [ ] 계정 생성/로그인
- [ ] 새 프로젝트/데이터베이스 생성
- [ ] 리전 선택 (한국 사용자: 도쿄/싱가포르 권장)
- [ ] 무료 티어 제한 사항 확인

### 3. API 키/연결 문자열 획득

각 서비스의 대시보드에서 연결에 필요한 정보를 복사합니다.

#### Supabase
```
대시보드 > Settings > API
- Project URL
- anon (public) key
- service_role key (서버 전용)
```

#### Firebase
```
프로젝트 설정 > 일반 > 내 앱 > 웹 앱 구성
- apiKey
- authDomain
- projectId
- 등
```

#### PlanetScale/Neon
```
대시보드 > Connect
- 연결 문자열 (DATABASE_URL)
```

### 4. 환경변수 파일 설정

```bash
# .env.local 파일 생성/수정
```

#### Supabase
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# 서버 사이드 전용 (선택)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Firebase
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

#### PlanetScale/Neon
```bash
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
# 마이그레이션용 직접 연결 (Neon)
DIRECT_DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

### 5. .env.example 업데이트

```bash
# .env.example (git에 커밋됨 - 실제 값 없이)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 6. .gitignore 확인

```bash
# .gitignore에 포함되어 있는지 확인
.env.local
.env*.local
```

### 질문 가이드

1. **DB 서비스 선택 확인**
   - "Tech Stack에서 {DB 서비스}를 선택하셨네요. 맞나요?"
   - "해당 서비스에 가입하셨나요?"

2. **프로젝트 생성**
   - "{DB 서비스} 대시보드에서 새 프로젝트를 만들어볼까요?"
   - "리전은 어디로 선택하시겠어요? 한국 사용자라면 도쿄나 싱가포르를 추천해요."

3. **API 키 복사**
   - "대시보드 Settings에서 API 키를 찾아서 복사해주세요."
   - "복사할 때 앞뒤 공백이 없는지 확인해주세요!"

4. **환경변수 설정**
   - "`.env.local` 파일을 만들고 키를 붙여넣어주세요."
   - "절대 이 파일을 git에 커밋하면 안 돼요!"

### 대화 원칙

- 각 DB 서비스의 대시보드 위치 구체적 안내
- API 키 복사 시 주의사항 강조 (공백, 줄바꿈)
- 무료 티어 제한 사항 명확히 안내
- 보안 관련 주의사항 (service_role 키 노출 금지)

## 산출물

`outputs/stage-3/database-setup.md`

```markdown
# Database Setup

## 메타데이터
- Stage: 3
- Step: 3.4 - 데이터베이스 설정
- 생성일시: {현재 시간}
- 상태: final

## 데이터베이스 정보

| 항목 | 값 |
|------|-----|
| 서비스 | {Supabase/Firebase/PlanetScale/Neon} |
| 프로젝트 이름 | {project-name} |
| 리전 | {ap-northeast-1 등} |
| 플랜 | {Free/Pro} |
| 대시보드 URL | {https://...} |

## 환경변수 설정

| 변수명 | 설정 여부 | 비고 |
|--------|----------|------|
| {NEXT_PUBLIC_SUPABASE_URL} | ✅ | 프로젝트 URL |
| {NEXT_PUBLIC_SUPABASE_ANON_KEY} | ✅ | 공개 API 키 |
| {SUPABASE_SERVICE_ROLE_KEY} | ⚠️ 선택 | 서버 사이드용 |

## 무료 티어 제한

| 항목 | 제한 |
|------|------|
| 스토리지 | {500MB} |
| 대역폭 | {2GB/월} |
| 일시정지 | {7일 미사용 시} |

## 보안 체크리스트

- [x] `.env.local` 생성
- [x] `.gitignore`에 포함 확인
- [x] `.env.example` 업데이트 (실제 값 없이)
- [x] service_role 키는 서버에서만 사용

## 다음 단계

ORM/클라이언트를 설정하고 연결을 테스트합니다.
```

## 완료 조건

- DB 서비스 프로젝트 생성 완료
- 대시보드에서 API 키/연결 문자열 획득
- `.env.local` 파일에 환경변수 설정 완료
- `.gitignore` 확인 완료
- `database-setup.md` 파일이 생성됨

## 다음 Step

→ Step 3.5: ORM Setup (ORM 설정)

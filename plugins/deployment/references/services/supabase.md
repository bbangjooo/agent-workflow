# Supabase 배포 연동 가이드

Supabase를 사용하는 프로젝트의 배포 시 필요한 설정 가이드입니다.

## 언제 사용하나요?

- Next.js + Supabase 프로젝트 배포 시
- React + Supabase 프로젝트 배포 시
- Supabase Auth, Database, Storage 사용 프로젝트

## Supabase 특성

Supabase는 **Managed Service**로 별도 배포가 필요 없습니다.
대신 **프로젝트 프로비저닝**과 **환경변수 설정**이 필요합니다.

## 무료 티어

| 항목 | 한도 |
|------|------|
| 프로젝트 | 2개 |
| 데이터베이스 | 500MB |
| Storage | 1GB |
| 대역폭 | 2GB/월 |
| Edge Functions | 500K 호출/월 |
| Auth | MAU 50,000 |

**참고**: 7일간 비활성 시 프로젝트 일시 중지됨 (무료 티어)

## 프로젝트 프로비저닝

### 1. 프로젝트 생성 (이미 있으면 스킵)

1. https://supabase.com/dashboard 접속
2. **New project** 클릭
3. 설정:
   - Name: 프로젝트명
   - Database Password: 강력한 비밀번호 설정 (저장해두기!)
   - Region: Northeast Asia (Tokyo) - 한국에서 가장 빠름
4. **Create new project** 클릭
5. 프로비저닝 완료 대기 (약 2분)

### 2. API 키 확인

1. 프로젝트 대시보드 > **Settings** > **API**
2. 필요한 값들:

| 항목 | 용도 | 위치 |
|------|------|------|
| Project URL | API 엔드포인트 | `https://xxx.supabase.co` |
| anon public | 클라이언트용 공개 키 | `eyJxxx...` |
| service_role | 서버용 비밀 키 (주의!) | `eyJxxx...` |

## 환경변수 설정

### 필요한 환경변수

```bash
# 필수 (클라이언트에서 사용)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# 선택 (서버 사이드에서만 사용)
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# 선택 (Direct DB 연결 시)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
```

### Vercel에서 설정

```bash
# CLI로 설정
vercel env add NEXT_PUBLIC_SUPABASE_URL
# 프롬프트에서 값 입력

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# 프롬프트에서 값 입력
```

또는 **Vercel 대시보드 > Settings > Environment Variables**에서 직접 추가

### Netlify에서 설정

```bash
# netlify.toml
[build.environment]
  NEXT_PUBLIC_SUPABASE_URL = "https://xxx.supabase.co"
  NEXT_PUBLIC_SUPABASE_ANON_KEY = "eyJxxx..."
```

또는 **Netlify 대시보드 > Site settings > Environment variables**

## 배포 전 체크리스트

### 1. Auth 설정 (사용 시)

Supabase 대시보드 > **Authentication** > **URL Configuration**:

| 설정 | 개발 환경 | 프로덕션 |
|------|-----------|----------|
| Site URL | `http://localhost:3000` | `https://your-app.vercel.app` |
| Redirect URLs | `http://localhost:3000/**` | `https://your-app.vercel.app/**` |

### 2. RLS 정책 확인

```sql
-- 예시: 모든 사용자 읽기 허용
CREATE POLICY "Allow public read" ON public.posts
  FOR SELECT USING (true);

-- 예시: 본인 데이터만 수정 허용
CREATE POLICY "Allow own update" ON public.posts
  FOR UPDATE USING (auth.uid() = user_id);
```

### 3. Database 스키마 확인

프로덕션 배포 전 테이블/컬럼이 모두 생성되었는지 확인

## 흔한 에러 및 해결

### 1. Invalid API Key

```
Error: Invalid API key
```

**해결:**
1. 환경변수 이름 확인 (`NEXT_PUBLIC_` 접두사 필수)
2. 키 값 복사 시 공백/줄바꿈 제거
3. 재배포 필요 (환경변수 변경 후)

### 2. RLS Policy Violation

```
Error: new row violates row-level security policy
```

**해결:**
1. Supabase 대시보드 > Table Editor > 해당 테이블
2. RLS policies 확인
3. 적절한 INSERT/UPDATE 정책 추가

### 3. Auth Redirect 실패

```
Error: Unable to exchange external code
```

**해결:**
1. Supabase 대시보드 > Authentication > URL Configuration
2. **Redirect URLs**에 프로덕션 URL 추가
3. `https://your-app.vercel.app/**` 패턴 사용

### 4. Database Connection Refused

```
Error: Connection refused (Prisma/Direct connection)
```

**해결:**
1. Supabase 대시보드 > Settings > Database
2. **Connection string** 복사
3. `?pgbouncer=true` 추가 (Serverless 환경)
   ```
   postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:6543/postgres?pgbouncer=true
   ```

### 5. CORS 에러

```
Error: CORS policy blocked
```

**해결:**
Edge Functions 사용 시 헤더 추가:
```typescript
return new Response(JSON.stringify(data), {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})
```

## 배포 후 검증

### 1. 연결 테스트

브라우저 콘솔에서:
```javascript
// Supabase 연결 확인
const { data, error } = await supabase.from('your_table').select('*').limit(1)
console.log({ data, error })
```

### 2. Auth 테스트 (사용 시)

1. 회원가입/로그인 시도
2. 소셜 로그인 리다이렉트 확인
3. 로그아웃 후 보호된 페이지 접근 차단 확인

### 3. Database 테스트

1. CRUD 작업 테스트
2. RLS 정책 동작 확인

## 프로덕션 권장 설정

### 환경 분리

```
# 개발용 Supabase 프로젝트
NEXT_PUBLIC_SUPABASE_URL=https://dev-xxx.supabase.co

# 프로덕션용 Supabase 프로젝트 (별도)
NEXT_PUBLIC_SUPABASE_URL=https://prod-xxx.supabase.co
```

### 모니터링

1. Supabase 대시보드 > **Reports** - 사용량 모니터링
2. **Database** > **Logs** - 쿼리 로그 확인

## 참고 링크

- [Supabase 공식 문서](https://supabase.com/docs)
- [Next.js + Supabase 가이드](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Auth 설정 가이드](https://supabase.com/docs/guides/auth)
- [RLS 가이드](https://supabase.com/docs/guides/auth/row-level-security)

# Security Checklist

MVP 배포 전 보안 체크리스트입니다.

## 인증/인가

- [ ] **세션 관리**
  - 로그아웃 시 세션 완전 삭제
  - 적절한 세션 타임아웃 설정

- [ ] **비밀번호**
  - 최소 8자 이상 요구
  - 해시 처리 (Supabase/Firebase 자동 처리)

- [ ] **보호된 라우트**
  - 인증 필요 페이지 미들웨어 체크
  - 미로그인 시 리다이렉트

- [ ] **권한 체크**
  - 본인 데이터만 수정/삭제 가능
  - API에서도 권한 검증

## 데이터베이스

- [ ] **RLS (Row Level Security)**
  - 모든 테이블에 RLS 활성화
  - 적절한 정책 설정

```sql
-- 예: 본인 데이터만 접근
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own posts" ON posts
  USING (auth.uid() = user_id);
```

- [ ] **민감 데이터**
  - 비밀번호는 해시 저장 (자동)
  - 신용카드 정보 저장 안함 (Stripe 사용)

## 환경변수

- [ ] **gitignore 확인**
  ```
  .env
  .env.local
  .env.*.local
  ```

- [ ] **공개 가능 변수**
  - `NEXT_PUBLIC_*`: 브라우저에 노출됨
  - Supabase anon key: 공개 가능 (RLS로 보호)

- [ ] **비공개 변수**
  - `SUPABASE_SERVICE_ROLE_KEY`: 절대 노출 금지
  - `STRIPE_SECRET_KEY`: 서버에서만 사용

## API 보안

- [ ] **인증 검증**
  ```typescript
  // 모든 보호된 API에서
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return unauthorized()
  ```

- [ ] **입력 검증**
  ```typescript
  // Zod 등으로 검증
  const result = schema.safeParse(body)
  if (!result.success) return badRequest()
  ```

- [ ] **Rate Limiting** (선택)
  - Vercel: 기본 제공
  - 추가 필요시: upstash/ratelimit

## XSS 방지

- [ ] **React 기본 보호**
  - JSX는 자동으로 이스케이프
  - `dangerouslySetInnerHTML` 사용 주의

- [ ] **사용자 입력**
  - HTML 태그 허용 안함
  - URL 검증 (javascript: 프로토콜 차단)

## CORS

- [ ] **Next.js API Routes**
  - 기본적으로 same-origin만 허용
  - 필요시 명시적 설정

## HTTPS

- [ ] **Vercel 자동 적용**
  - 프로덕션에서 자동 HTTPS
  - HTTP → HTTPS 리다이렉트

## 파일 업로드 (해당 시)

- [ ] **파일 타입 검증**
  ```typescript
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('허용되지 않는 파일 형식')
  }
  ```

- [ ] **파일 크기 제한**
- [ ] **악성 파일 스캔** (대규모 서비스 시)

## 의존성

- [ ] **npm audit**
  ```bash
  npm audit
  npm audit fix
  ```

- [ ] **정기 업데이트**
  - 보안 패치 적용

## 로깅

- [ ] **민감 정보 로깅 금지**
  - 비밀번호 로깅 안함
  - 토큰 로깅 안함

## Supabase 특화

- [ ] **anon key vs service role key**
  - anon key: 클라이언트 OK (RLS 적용)
  - service role key: 서버 ONLY (RLS 우회)

- [ ] **API 설정**
  - Dashboard > API > Rate limiting 확인

## Firebase 특화

- [ ] **Security Rules**
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId} {
        allow read, write: if request.auth.uid == userId;
      }
    }
  }
  ```

- [ ] **App Check** (선택)
  - 자동화된 접근 방지

## 체크 완료 후

- [ ] 보안 취약점 스캔 도구 실행 (선택)
- [ ] 동료 리뷰 (가능하면)
- [ ] 배포 전 최종 확인

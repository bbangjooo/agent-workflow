# Launch Verification

Step 4.3: 런칭 검증

## 설명

배포된 서비스가 정상적으로 동작하는지 검증하고, 최종 배포 완료 문서를 생성합니다.

## 트리거

- Step 4.2 완료 후 자동 실행
- `outputs/stage-4/deploy-log.md`이 존재할 때
- 배포 URL이 획득된 상태

## 입력

- `outputs/stage-4/deploy-log.md` - 배포 로그 (URL 포함)
- `outputs/stage-1/prd.md` - 핵심 기능 목록
- `outputs/stage-3/feature-impl.md` - 구현된 기능 목록

## 실행 내용

### 1. 헬스체크 (자동)

배포된 URL에 접근 가능한지 확인합니다.

```bash
# 기본 헬스체크
curl -I https://your-app.vercel.app

# 응답 확인
HTTP/2 200 OK
```

**체크 항목:**
- [ ] HTTP 200 응답
- [ ] 응답 시간 < 3초
- [ ] SSL 인증서 유효

### 2. 핵심 기능 체크리스트 (자동 생성)

PRD와 구현된 기능을 기반으로 체크리스트를 자동 생성합니다.

```markdown
## 핵심 기능 검증

### 인증 (P0)
- [ ] 회원가입 페이지 접근 가능
- [ ] 로그인 페이지 접근 가능
- [ ] 로그인/로그아웃 동작

### 메인 기능 (P0)
- [ ] 메인 페이지 로딩
- [ ] 핵심 CRUD 동작
- [ ] 데이터 저장/조회

### UI (P1)
- [ ] 반응형 레이아웃
- [ ] 주요 컴포넌트 렌더링
```

### 3. 간단한 스모크 테스트 (자동)

주요 라우트에 접근하여 에러가 없는지 확인합니다.

```javascript
// 자동 생성되는 테스트 스크립트
const routes = ['/', '/login', '/signup', '/dashboard'];

for (const route of routes) {
  const response = await fetch(`${BASE_URL}${route}`);
  console.log(`${route}: ${response.status}`);
}
```

### 4. 최종 완료 처리

모든 검증이 통과하면:

```
🎉 배포 완료!

라이브 URL: https://your-app.vercel.app

축하합니다! 아이디어가 실제 서비스가 되었습니다.

---

📊 배포 요약:
- 호스팅: Vercel (무료 티어)
- 배포 시간: 3분
- 상태: 정상 운영 중

📝 다음으로 할 일:
1. 실제 사용자에게 URL 공유
2. 피드백 수집
3. 개선 사항 반영
```

## 산출물

`outputs/stage-4/deployment-complete.md`

```markdown
# 배포 완료

## 메타데이터
- Stage: 4
- Step: 4.3
- 생성일시: {timestamp}
- 상태: final

---

## 🎉 라이브 서비스

| 항목 | 값 |
|------|-----|
| **라이브 URL** | https://{app-name}.vercel.app |
| 호스팅 | {Vercel} |
| 배포일 | {YYYY-MM-DD} |
| 상태 | 정상 운영 중 |

---

## 검증 결과

### 헬스체크
| 항목 | 결과 |
|------|------|
| HTTP 상태 | 200 OK |
| 응답 시간 | {150}ms |
| SSL | 유효 |

### 핵심 기능
| 기능 | 상태 |
|------|------|
| 메인 페이지 | 정상 |
| 로그인 | 정상 |
| 회원가입 | 정상 |
| {핵심 기능 1} | 정상 |
| {핵심 기능 2} | 정상 |

### 라우트 접근성
| 라우트 | 상태 |
|--------|------|
| `/` | 200 |
| `/login` | 200 |
| `/signup` | 200 |
| `/dashboard` | 200 |

---

## 배포 이력

| 버전 | 날짜 | 변경 사항 |
|------|------|----------|
| v1.0.0 | {날짜} | 최초 배포 |

---

## 운영 정보

### 환경변수
| 변수명 | 설정 상태 |
|--------|----------|
| DATABASE_URL | 설정됨 |
| NEXT_PUBLIC_SUPABASE_URL | 설정됨 |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | 설정됨 |

### 무료 티어 현황
| 항목 | 한도 | 사용량 |
|------|------|--------|
| 대역폭 | 100GB/월 | ~0GB |
| 빌드 시간 | 6000분/월 | ~5분 |
| 서버리스 함수 | 100GB-Hrs | ~0 |

---

## 다음 단계

### 즉시 할 일
1. [ ] 라이브 URL을 테스트 사용자에게 공유
2. [ ] 피드백 수집 채널 준비 (Notion, Google Form 등)
3. [ ] 주요 기능 직접 테스트

### 권장 사항
1. **모니터링 설정** (선택)
   - Vercel Analytics (무료)
   - Sentry 에러 트래킹 (무료 티어)

2. **백업 설정** (선택)
   - Supabase 자동 백업 확인
   - Git 저장소 최신 상태 유지

3. **커스텀 도메인** (나중에)
   - 필요 시 Vercel 대시보드에서 설정

---

## 워크플로우 완료

```
Stage 0: Ideation     ✅ 완료
Stage 1: Planning     ✅ 완료
Stage 2: Design       ✅ 완료
Stage 3: Development  ✅ 완료
Stage 4: Deployment   ✅ 완료
```

🎊 **축하합니다! 아이디어가 실제 서비스가 되었습니다!**
```

## 완료 조건

- 헬스체크 통과 (HTTP 200)
- 주요 라우트 접근 가능
- 핵심 기능 체크리스트 확인
- `deployment-complete.md` 파일이 생성됨

## 검증 실패 시

헬스체크나 기능 검증이 실패하면:

1. 실패 항목 상세 기록
2. 가능한 원인 분석
3. Step 4.2로 돌아가 수정 후 재배포 제안

```
⚠️ 검증 실패

실패 항목:
- /dashboard: 500 Internal Server Error

가능한 원인:
1. 환경변수 미설정
2. 데이터베이스 연결 실패
3. 서버 사이드 에러

권장 조치:
1. Vercel 대시보드에서 Function Logs 확인
2. 환경변수 재확인
3. 로컬에서 동일 에러 재현 후 수정
```

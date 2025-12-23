# Performance Checklist

MVP 성능 최적화 체크리스트입니다.

## 이미지 최적화

- [ ] **Next.js Image 사용**
  ```tsx
  import Image from 'next/image'

  <Image
    src="/hero.jpg"
    alt="Hero"
    width={800}
    height={600}
    priority // LCP 이미지에 추가
  />
  ```

- [ ] **이미지 포맷**
  - WebP 사용 (Next.js 자동 변환)
  - 적절한 크기로 리사이즈

- [ ] **Lazy Loading**
  - 스크롤 아래 이미지는 lazy load (기본)
  - 중요한 이미지에 `priority` 추가

## JavaScript 최적화

- [ ] **코드 스플리팅**
  ```tsx
  // 동적 import
  const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
    loading: () => <Skeleton />,
  })
  ```

- [ ] **불필요한 의존성 제거**
  ```bash
  npm ls --depth=0  # 의존성 확인
  ```

- [ ] **번들 분석** (선택)
  ```bash
  npm install @next/bundle-analyzer
  ANALYZE=true npm run build
  ```

## 렌더링 최적화

- [ ] **Server Components 활용**
  - 기본값: Server Component
  - 필요할 때만 'use client'

- [ ] **적절한 캐싱**
  ```tsx
  // 정적 페이지
  export const revalidate = 3600 // 1시간

  // 또는 ISR
  export const revalidate = 60
  ```

- [ ] **Suspense 활용**
  ```tsx
  <Suspense fallback={<Loading />}>
    <AsyncComponent />
  </Suspense>
  ```

## 데이터 페칭

- [ ] **불필요한 요청 방지**
  - React Query 캐싱 활용
  - 중복 요청 방지

- [ ] **페이지네이션**
  - 대량 데이터는 페이지네이션
  - 무한 스크롤 시 적절한 limit

- [ ] **필요한 필드만 선택**
  ```typescript
  // Bad
  const { data } = await supabase.from('posts').select('*')

  // Good
  const { data } = await supabase
    .from('posts')
    .select('id, title, created_at')
  ```

## 폰트 최적화

- [ ] **Next.js Font 사용**
  ```tsx
  import { Pretendard } from 'next/font/local'

  const pretendard = Pretendard({
    subsets: ['latin'],
    display: 'swap',
  })
  ```

- [ ] **필요한 weight만 로드**
  ```tsx
  const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600', '700'], // 필요한 것만
  })
  ```

## CSS 최적화

- [ ] **Tailwind Purge**
  - 프로덕션에서 자동으로 미사용 CSS 제거
  - content 설정 확인

- [ ] **CSS-in-JS 주의**
  - Tailwind 권장 (빌드타임 처리)
  - styled-components는 런타임 비용

## 로딩 상태

- [ ] **스켈레톤 UI**
  ```tsx
  function PostSkeleton() {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
      </div>
    )
  }
  ```

- [ ] **로딩 인디케이터**
  - 긴 작업에 진행 표시

## Core Web Vitals

- [ ] **LCP (Largest Contentful Paint) < 2.5s**
  - 큰 이미지에 priority
  - 서버 응답 시간 최적화

- [ ] **FID (First Input Delay) < 100ms**
  - 무거운 JS 지연 로드
  - 긴 작업 분할

- [ ] **CLS (Cumulative Layout Shift) < 0.1**
  - 이미지에 width/height 지정
  - 동적 콘텐츠 공간 예약

## 측정 도구

- [ ] **Lighthouse**
  - Chrome DevTools > Lighthouse
  - 모바일 기준으로 테스트

- [ ] **Vercel Analytics**
  - 실제 사용자 성능 측정
  - Core Web Vitals 모니터링

- [ ] **PageSpeed Insights**
  - https://pagespeed.web.dev/
  - 실제 필드 데이터

## MVP 수준 기준

```
성능 점수 (Lighthouse):
- Performance: 70+ (목표: 90+)
- Accessibility: 80+
- Best Practices: 80+
- SEO: 80+
```

## 최적화 우선순위

1. **이미지 최적화** (가장 효과 큼)
2. **불필요한 JS 제거**
3. **Server Components 활용**
4. **데이터 페칭 최적화**
5. **폰트 최적화**

MVP에서는 1-3번만 해도 충분합니다.

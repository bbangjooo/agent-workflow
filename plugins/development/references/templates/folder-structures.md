# Folder Structure Templates

프로젝트 폴더 구조 템플릿 모음입니다.

## Next.js App Router (권장)

```
src/
├── app/                      # App Router 페이지
│   ├── (auth)/               # 인증 페이지 그룹 (레이아웃 공유)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx        # 인증 페이지 공통 레이아웃
│   ├── (main)/               # 메인 콘텐츠 그룹
│   │   ├── posts/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx  # 동적 라우트
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx      # 목록
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx        # 메인 레이아웃 (Header 포함)
│   ├── api/                  # API Routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── posts/
│   │   │   ├── [id]/route.ts
│   │   │   └── route.ts
│   │   └── users/
│   │       └── route.ts
│   ├── error.tsx             # 에러 페이지
│   ├── loading.tsx           # 로딩 UI
│   ├── not-found.tsx         # 404 페이지
│   ├── layout.tsx            # 루트 레이아웃
│   ├── page.tsx              # 홈페이지
│   └── globals.css           # 전역 스타일
│
├── components/               # 컴포넌트
│   ├── ui/                   # 기본 UI (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── layout/               # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   └── features/             # 기능별 컴포넌트
│       ├── auth/
│       │   ├── LoginForm.tsx
│       │   └── SignupForm.tsx
│       ├── posts/
│       │   ├── PostCard.tsx
│       │   ├── PostList.tsx
│       │   └── PostForm.tsx
│       └── users/
│           └── UserAvatar.tsx
│
├── lib/                      # 유틸리티/라이브러리
│   ├── supabase/             # Supabase 클라이언트
│   │   ├── client.ts         # 브라우저용
│   │   └── server.ts         # 서버용
│   ├── actions/              # Server Actions
│   │   ├── auth.ts
│   │   └── posts.ts
│   ├── utils.ts              # 유틸리티 함수
│   └── validations.ts        # Zod 스키마 등
│
├── hooks/                    # 커스텀 훅
│   ├── useUser.ts
│   ├── usePosts.ts
│   └── useMediaQuery.ts
│
├── types/                    # TypeScript 타입
│   ├── index.ts              # 공통 타입
│   ├── database.ts           # DB 관련 타입
│   └── api.ts                # API 요청/응답 타입
│
├── constants/                # 상수
│   ├── routes.ts             # 라우트 경로
│   └── config.ts             # 설정값
│
└── styles/                   # 추가 스타일 (선택)
    └── fonts.ts              # 폰트 설정
```

## 파일명 규칙

### 컴포넌트
```
PascalCase.tsx
예: Button.tsx, UserCard.tsx, PostList.tsx
```

### 유틸리티/훅
```
camelCase.ts
예: useUser.ts, formatDate.ts, utils.ts
```

### 라우트 파일
```
page.tsx      # 페이지
layout.tsx    # 레이아웃
loading.tsx   # 로딩 UI
error.tsx     # 에러 UI
route.ts      # API 라우트
```

## 기능별 구조 (Feature-based)

규모가 커지면 기능별로 구성:

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── actions/
│   │   └── types.ts
│   ├── posts/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── actions/
│   │   └── types.ts
│   └── ...
├── shared/                   # 공유 모듈
│   ├── components/
│   ├── hooks/
│   └── lib/
└── app/                      # 라우팅만
```

## Import Alias 설정

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

사용 예:
```typescript
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useUser } from '@/hooks/useUser'
```

## 주의사항

1. **components/ui/**: shadcn/ui 전용, 직접 수정하지 않음
2. **app/api/**: 복잡한 로직은 lib/actions/로 분리
3. **과도한 중첩 피하기**: 3단계 이상 중첩 시 리팩토링 고려

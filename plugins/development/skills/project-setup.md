# Project Setup

Step 3.3: 프로젝트 초기화 (Project Setup)

> **역할: Full-stack**
> 프로젝트 scaffolding, 설정 파일, 폴더 구조 전체

## 설명

선택한 기술 스택으로 프로젝트를 초기화하고 기본 설정을 완료하는 스킬입니다. boilerplate를 활용하여 빠르게 시작합니다.

## 트리거

- Step 3.2 (Tech Stack Selection) 완료 후 실행
- `tech-stack.md` 파일이 존재할 때

## 입력

- `outputs/stage-3/tech-stack.md`
- `outputs/stage-2/design-system.md`

## 실행 내용

### 프로젝트 생성

#### Next.js + Supabase 스택 (기본)

```bash
# 1. 프로젝트 생성
npx create-next-app@latest {project-name} --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# 2. 디렉토리 이동
cd {project-name}

# 3. 필수 패키지 설치
npm install @supabase/supabase-js @supabase/ssr

# 4. UI 라이브러리 설치 (shadcn/ui)
npx shadcn-ui@latest init

# 5. 기본 컴포넌트 추가
npx shadcn-ui@latest add button input card
```

### 폴더 구조 설정

```
{project-name}/
├── src/
│   ├── app/
│   │   ├── (auth)/           # 인증 관련 페이지
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (main)/           # 메인 페이지들
│   │   ├── api/              # API 라우트
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/               # shadcn/ui 컴포넌트
│   │   ├── layout/           # 레이아웃 컴포넌트
│   │   └── features/         # 기능별 컴포넌트
│   ├── lib/
│   │   ├── supabase/         # Supabase 클라이언트
│   │   └── utils.ts          # 유틸리티 함수
│   ├── hooks/                # 커스텀 훅
│   ├── types/                # TypeScript 타입
│   └── constants/            # 상수
├── public/                   # 정적 파일
├── .env.local               # 환경변수 (gitignore)
├── .env.example             # 환경변수 예시
└── ...
```

### 디자인 시스템 적용

#### Tailwind v4 방식 (권장)

> **⚠️ Tailwind v4는 CSS-first 설정을 사용합니다.**
> `tailwind.config.ts`의 `theme.extend` 대신 CSS의 `@theme` 블록을 사용해야 합니다.

```css
/* src/app/globals.css */
@import "tailwindcss";

/* 디자인 시스템 토큰 정의 - @theme 블록 사용 */
@theme {
  /* Colors - design-system.md에서 가져온 색상 */
  --color-primary: #3B82F6;
  --color-primary-light: #60A5FA;
  --color-primary-dark: #2563EB;

  --color-secondary: #6366F1;
  --color-secondary-light: #818CF8;
  --color-secondary-dark: #4F46E5;

  --color-success: #10B981;
  --color-success-light: #D1FAE5;
  --color-success-dark: #059669;

  --color-warning: #F59E0B;
  --color-warning-light: #FEF3C7;
  --color-warning-dark: #D97706;

  --color-error: #EF4444;
  --color-error-light: #FEE2E2;
  --color-error-dark: #DC2626;

  /* Gray scale */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;

  /* Typography - Font Family */
  --font-sans: "Inter", system-ui, sans-serif;

  /* Spacing (커스텀 값이 필요한 경우) */
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;

  /* Border Radius */
  --radius-button: 0.5rem;
  --radius-card: 0.75rem;
  --radius-modal: 1rem;

  /* Shadows */
  --shadow-button: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-card: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #3B82F6, #2563EB);
}

/* 다크 모드 오버라이드 (필요시) */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-gray-50: #111827;
    --color-gray-900: #F9FAFB;
    /* ... 기타 다크모드 색상 */
  }
}
```

**Tailwind v4에서 생성되는 유틸리티 클래스:**
- `--color-*` → `bg-*`, `text-*`, `border-*` 등
- `--font-*` → `font-*`
- `--radius-*` → `rounded-*`
- `--shadow-*` → `shadow-*`

예시:
```html
<!-- @theme에서 --color-primary를 정의하면 자동 생성 -->
<button class="bg-primary text-white hover:bg-primary-dark">
  Click me
</button>

<!-- @theme에서 --color-success를 정의하면 자동 생성 -->
<div class="bg-success-light text-success-dark">
  Success message
</div>
```

#### Tailwind v3 방식 (레거시)

```javascript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // design-system.md에서 가져온 색상
        primary: {
          DEFAULT: "#{PRIMARY_COLOR}",
          light: "#{PRIMARY_LIGHT}",
          dark: "#{PRIMARY_DARK}",
        },
        // ... 나머지 색상
      },
      fontFamily: {
        sans: ["{FONT_NAME}", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

#### Tailwind 버전 확인 방법

```bash
# package.json에서 tailwindcss 버전 확인
npm list tailwindcss

# v4.x.x → @theme 블록 사용
# v3.x.x → tailwind.config.ts 사용
```

### 스타일 매핑 테이블 생성 (핵심!)

> **⚠️ 이 단계가 디자인 시스템 준수를 보장하는 핵심입니다.**
> Bridge에서 정의한 시맨틱 토큰을 실제 구현 클래스/변수로 매핑합니다.

#### 매핑 테이블 작성

`design-dev-bridge.md`의 시맨틱 토큰을 선택한 Tech Stack에 맞게 실제 클래스/변수로 매핑합니다:

##### Tailwind v4 매핑 테이블 (권장)

> **⚠️ Tailwind v4 주의사항:**
> - `@theme` 블록에서 `--color-{name}` 형식으로 정의하면 `bg-{name}`, `text-{name}` 클래스가 **자동 생성**됩니다.
> - `:root`에 CSS 변수만 정의하면 유틸리티 클래스가 생성되지 않습니다!

```
┌─────────────────────────┬─────────────────────────┬──────────────────────────────┐
│ 시맨틱 토큰              │ 구현 클래스/변수         │ 정의 위치                     │
├─────────────────────────┼─────────────────────────┼──────────────────────────────┤
│ button-primary-bg       │ bg-primary              │ @theme: --color-primary      │
│ button-primary-text     │ text-white              │ Tailwind 기본 클래스         │
│ button-primary-shadow   │ shadow-button           │ @theme: --shadow-button      │
│ button-primary-hover-bg │ hover:bg-primary-dark   │ @theme: --color-primary-dark │
├─────────────────────────┼─────────────────────────┼──────────────────────────────┤
│ color-success           │ bg-success / text-success│ @theme: --color-success     │
│ color-success-light     │ bg-success-light        │ @theme: --color-success-light│
│ color-success-dark      │ text-success-dark       │ @theme: --color-success-dark │
├─────────────────────────┼─────────────────────────┼──────────────────────────────┤
│ text-heading-1          │ text-3xl font-bold      │ Tailwind 기본 클래스         │
│ text-heading-2          │ text-2xl font-semibold  │ Tailwind 기본 클래스         │
│ text-body               │ text-base               │ Tailwind 기본 클래스         │
├─────────────────────────┼─────────────────────────┼──────────────────────────────┤
│ radius-button           │ rounded-button          │ @theme: --radius-button      │
│ radius-card             │ rounded-card            │ @theme: --radius-card        │
└─────────────────────────┴─────────────────────────┴──────────────────────────────┘
```

##### Tailwind v3 매핑 테이블 (레거시)

```
┌─────────────────────────┬─────────────────────────┬──────────────────────────────┐
│ 시맨틱 토큰              │ 구현 클래스/변수         │ 정의 위치                     │
├─────────────────────────┼─────────────────────────┼──────────────────────────────┤
│ button-primary-bg       │ bg-gradient-primary     │ tailwind.config.ts:25        │
│ button-primary-text     │ text-white              │ Tailwind 기본 클래스         │
│ button-primary-shadow   │ shadow-button           │ tailwind.config.ts:42        │
│ button-primary-hover-bg │ hover:bg-primary-dark   │ tailwind.config.ts:28        │
├─────────────────────────┼─────────────────────────┼──────────────────────────────┤
│ text-heading-1          │ text-3xl font-bold      │ Tailwind 기본 클래스         │
│ text-heading-2          │ text-2xl font-semibold  │ Tailwind 기본 클래스         │
│ text-body               │ text-base               │ Tailwind 기본 클래스         │
├─────────────────────────┼─────────────────────────┼──────────────────────────────┤
│ color-primary           │ text-primary / bg-primary│ tailwind.config.ts:20       │
│ color-primary-gradient  │ bg-gradient-primary     │ tailwind.config.ts:25        │
│ color-gray-900          │ text-gray-900           │ Tailwind 기본 클래스         │
├─────────────────────────┼─────────────────────────┼──────────────────────────────┤
│ spacing-4               │ p-4 / m-4 / gap-4       │ Tailwind 기본 클래스         │
│ spacing-8               │ p-8 / m-8 / gap-8       │ Tailwind 기본 클래스         │
├─────────────────────────┼─────────────────────────┼──────────────────────────────┤
│ radius-button           │ rounded-lg              │ Tailwind 기본 클래스         │
│ radius-card             │ rounded-xl              │ Tailwind 기본 클래스         │
└─────────────────────────┴─────────────────────────┴──────────────────────────────┘
```

#### Tailwind v4: @theme vs :root 차이점

> **핵심: `:root`에 CSS 변수를 정의해도 Tailwind 유틸리티 클래스는 생성되지 않습니다!**

```css
/* ❌ 잘못된 방식 - 클래스 미생성 */
:root {
  --success-base: #10b981;  /* bg-success-base 클래스 생성 안 됨! */
}

/* ✅ 올바른 방식 - @theme 사용 */
@theme {
  --color-success-base: #10b981;  /* bg-success-base 클래스 자동 생성! */
}
```

#### CSS Variables 방식 (순수 CSS 프로젝트용)

```css
/* globals.css */
:root {
  /* 시맨틱 토큰 → CSS 변수 매핑 */
  --button-primary-bg: linear-gradient(135deg, #3B82F6, #2563EB);
  --button-primary-text: #FFFFFF;
  --button-primary-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  --text-heading-1-size: 2rem;
  --text-heading-1-weight: 700;

  --color-primary: #3B82F6;
  --spacing-4: 1rem;
  --radius-button: 0.5rem;
}
```

#### 매핑 검증 체크리스트

```
필수 검증 항목:
□ Bridge의 모든 시맨틱 토큰이 매핑 테이블에 있는가?
□ 모든 매핑된 클래스/변수가 실제로 정의되어 있는가?
  □ [v4] globals.css의 @theme 블록에 정의됨
  □ [v3] tailwind.config.ts에 커스텀 클래스가 정의됨
  □ 또는 Tailwind/프레임워크 기본 클래스 사용
□ 정의 위치(파일:라인)가 정확한가?
□ 누락된 토큰이 없는가?
□ [v4] @theme에서 올바른 네이밍 사용? (--color-*, --radius-*, --shadow-*)
```

#### 미정의 클래스 방지

> **⚠️ 중요: 매핑 테이블에 없는 클래스는 사용하면 안 됩니다!**

잘못된 예시 (btn-primary는 정의되지 않음):
```typescript
// ❌ 잘못됨
className="btn-primary text-white"
```

올바른 예시 (매핑 테이블 참조):
```typescript
// ✅ 올바름 - 매핑 테이블: button-primary-bg → bg-gradient-primary
className="bg-gradient-primary text-white shadow-button"
```

### 환경변수 설정

```bash
# .env.example
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Supabase 클라이언트 설정

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 질문 가이드

1. **프로젝트 이름**
   - "프로젝트 이름(영문, 소문자)을 정해주세요"
   - 예: my-awesome-app

2. **프로젝트 위치**
   - "프로젝트를 어디에 만들까요?"
   - 기본값: 현재 디렉토리

3. **추가 설정**
   - "ESLint 규칙을 엄격하게 할까요?"
   - "Prettier를 설정할까요?"

### 대화 원칙

- 각 명령어 실행 전 설명
- 에러 발생 시 해결 방법 안내
- 파일이 생성될 때마다 확인
- AI 도구(Cursor)로 열어서 확인하도록 안내

## 산출물

`outputs/stage-3/project-setup.md`

```markdown
# Project Setup

## 메타데이터
- Stage: 3
- Step: 3.3 - 프로젝트 초기화
- 생성일시: {현재 시간}
- 상태: final

## 프로젝트 정보

| 항목 | 값 |
|------|-----|
| 이름 | {project-name} |
| 경로 | {project-path} |
| 프레임워크 | Next.js 14 |
| 패키지 매니저 | npm |

## 실행한 명령어

```bash
# 프로젝트 생성
npx create-next-app@latest {name} --typescript --tailwind --eslint --app

# 패키지 설치
npm install @supabase/supabase-js @supabase/ssr

# UI 라이브러리
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input card
```

## 폴더 구조

```
{실제 생성된 폴더 구조}
```

## 적용된 설정

### Tailwind 색상 (design-system 기반)
- Primary: #{color}
- Secondary: #{color}
- ...

### 환경변수
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY

## 스타일 매핑 테이블 (필수!)

> ⚠️ UI 구현 시 반드시 이 테이블을 참조해야 합니다.
> 이 테이블에 없는 클래스는 사용할 수 없습니다.

| 시맨틱 토큰 | 구현 클래스/변수 | 정의 위치 |
|-------------|------------------|-----------|
| button-primary-bg | {클래스} | {파일:라인} |
| button-primary-text | {클래스} | {파일:라인} |
| button-primary-hover-bg | {클래스} | {파일:라인} |
| text-heading-1 | {클래스} | {파일:라인} |
| text-heading-2 | {클래스} | {파일:라인} |
| text-body | {클래스} | {파일:라인} |
| color-primary | {클래스} | {파일:라인} |
| spacing-4 | {클래스} | {파일:라인} |
| radius-button | {클래스} | {파일:라인} |
| ... | ... | ... |

### 매핑 완전성 검증

- [ ] Bridge의 모든 시맨틱 토큰이 매핑됨
- [ ] 모든 매핑된 클래스가 실제로 정의되어 있음
- [ ] 정의 위치(파일:라인)가 정확함

## 확인 사항

- [x] 프로젝트 생성 완료
- [x] 패키지 설치 완료
- [x] 폴더 구조 설정
- [x] Tailwind 설정
- [x] **스타일 매핑 테이블 작성 완료**
- [x] **매핑 완전성 검증 완료**
- [ ] 환경변수 설정 (Supabase 프로젝트 생성 후)

## 다음 단계

데이터 모델을 설계하고 Supabase에 테이블을 생성합니다.
```

## 완료 조건

- 프로젝트 생성 완료
- 필수 패키지 설치 완료
- 폴더 구조 설정 완료
- 디자인 시스템 (색상, 폰트) 적용 완료
- **스타일 매핑 테이블 작성 완료** (필수!)
- **매핑 완전성 검증 완료** - Bridge의 모든 시맨틱 토큰이 구현됨
- 개발 서버 정상 실행 확인 (`npm run dev`)
- `project-setup.md` 파일이 생성됨

## 다음 Step

→ Step 3.4: Database Setup (데이터베이스 설정)

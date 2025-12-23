# Project Setup

Step 3.2: 프로젝트 초기화

> **역할: Full-stack**
> 프로젝트 scaffolding, 설정 파일, 폴더 구조 전체

## 설명

선택한 기술 스택으로 프로젝트를 초기화하고 기본 설정을 완료하는 스킬입니다. boilerplate를 활용하여 빠르게 시작합니다.

## 트리거

- Step 3.1 (Tech Stack Selection) 완료 후 실행
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
- Step: 3.2 - 프로젝트 초기화
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

## 확인 사항

- [x] 프로젝트 생성 완료
- [x] 패키지 설치 완료
- [x] 폴더 구조 설정
- [x] Tailwind 설정
- [ ] 환경변수 설정 (Supabase 프로젝트 생성 후)

## 다음 단계

데이터 모델을 설계하고 Supabase에 테이블을 생성합니다.
```

## 완료 조건

- 프로젝트 생성 완료
- 필수 패키지 설치 완료
- 폴더 구조 설정 완료
- 디자인 시스템 (색상, 폰트) 적용 완료
- 개발 서버 정상 실행 확인 (`npm run dev`)
- `project-setup.md` 파일이 생성됨

## 다음 Step

-> Step 3.3: Data Modeling (데이터 모델링)

# shadcn/ui Design System

React + Tailwind CSS 기반의 모던 컴포넌트 라이브러리입니다.

## 개요

shadcn/ui는 Radix UI와 Tailwind CSS를 기반으로 만들어진 오픈소스 컴포넌트 컬렉션입니다. 전통적인 컴포넌트 라이브러리와 달리, 코드를 직접 프로젝트에 복사하여 완전한 소유권과 커스터마이징 자유를 제공합니다.

### 특징

- **Copy & Paste 방식**: npm 패키지가 아닌 소스 코드를 직접 복사
- **완전한 커스터마이징**: 모든 컴포넌트 코드를 수정 가능
- **Radix UI 기반**: 접근성(a11y) 기본 지원
- **Tailwind CSS**: 유틸리티 클래스 기반 스타일링
- **TypeScript 지원**: 완전한 타입 안전성

### 적합한 프로젝트

- Next.js / React 프로젝트
- Tailwind CSS를 사용하는 프로젝트
- 커스텀 디자인 시스템이 필요한 경우
- 접근성이 중요한 프로젝트

---

## 색상 시스템

shadcn/ui는 CSS 변수 기반의 테마 시스템을 사용합니다.

### 기본 색상 변수

```css
/* globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

### 색상 의미 체계

| 변수 | 용도 |
|------|------|
| `background` / `foreground` | 페이지 기본 배경/텍스트 |
| `card` / `card-foreground` | 카드 컴포넌트 |
| `primary` / `primary-foreground` | 주요 버튼, CTA |
| `secondary` / `secondary-foreground` | 보조 버튼 |
| `muted` / `muted-foreground` | 비활성화, 보조 텍스트 |
| `accent` / `accent-foreground` | 강조 요소 |
| `destructive` / `destructive-foreground` | 삭제, 위험 액션 |
| `border` | 테두리 |
| `input` | 입력 필드 테두리 |
| `ring` | 포커스 링 |

---

## 타이포그래피

### 기본 폰트 설정

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### 타이포그래피 유틸리티

```css
/* Tailwind 타이포그래피 클래스 */
.text-4xl   /* 36px - 페이지 제목 */
.text-3xl   /* 30px - 섹션 제목 */
.text-2xl   /* 24px - 카드 제목 */
.text-xl    /* 20px - 서브 제목 */
.text-lg    /* 18px - 강조 본문 */
.text-base  /* 16px - 본문 */
.text-sm    /* 14px - 보조 텍스트 */
.text-xs    /* 12px - 캡션 */
```

---

## 핵심 컴포넌트

### Button

```tsx
import { Button } from "@/components/ui/button"

// 변형
<Button variant="default">기본</Button>
<Button variant="destructive">삭제</Button>
<Button variant="outline">아웃라인</Button>
<Button variant="secondary">보조</Button>
<Button variant="ghost">고스트</Button>
<Button variant="link">링크</Button>

// 크기
<Button size="default">기본</Button>
<Button size="sm">작게</Button>
<Button size="lg">크게</Button>
<Button size="icon">아이콘</Button>
```

### Input

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">이메일</Label>
  <Input type="email" id="email" placeholder="이메일 입력" />
</div>
```

### Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명</CardDescription>
  </CardHeader>
  <CardContent>
    <p>카드 내용</p>
  </CardContent>
  <CardFooter>
    <Button>액션</Button>
  </CardFooter>
</Card>
```

### Dialog (모달)

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>모달 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>모달 제목</DialogTitle>
      <DialogDescription>모달 설명</DialogDescription>
    </DialogHeader>
    <p>모달 내용</p>
  </DialogContent>
</Dialog>
```

### Form (React Hook Form 통합)

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email("올바른 이메일을 입력하세요"),
})

function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">제출</Button>
      </form>
    </Form>
  )
}
```

---

## 설치 및 설정

### CLI로 설치

```bash
# 초기화
npx shadcn@latest init

# 컴포넌트 추가
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

### 수동 설정

```bash
# 의존성 설치
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot

# 유틸리티 함수
# src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 테마 커스터마이징

### 커스텀 테마 예시 (Blue 테마)

```css
:root {
  --primary: 221.2 83.2% 53.3%;       /* Blue 600 */
  --primary-foreground: 210 40% 98%;
  --ring: 221.2 83.2% 53.3%;
}

.dark {
  --primary: 217.2 91.2% 59.8%;       /* Blue 500 */
  --primary-foreground: 222.2 47.4% 11.2%;
}
```

### 브랜드 색상 적용 예시

```css
/* 주황색 브랜드 */
:root {
  --primary: 24.6 95% 53.1%;          /* Orange */
  --primary-foreground: 60 9.1% 97.8%;
}

/* 초록색 브랜드 */
:root {
  --primary: 142.1 76.2% 36.3%;       /* Green */
  --primary-foreground: 355.7 100% 97.3%;
}
```

---

## 접근성 (a11y)

shadcn/ui는 Radix UI 기반으로 다음 접근성 기능을 기본 지원합니다:

- **키보드 네비게이션**: Tab, Enter, Escape, Arrow keys
- **ARIA 속성**: 자동으로 적절한 ARIA 레이블 적용
- **포커스 관리**: 모달, 드롭다운 등에서 포커스 트래핑
- **스크린 리더**: 시맨틱 HTML과 ARIA 지원

---

## 참고 자료

- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [GitHub 저장소](https://github.com/shadcn/ui)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

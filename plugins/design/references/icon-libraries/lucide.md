# Lucide Icons

Feather Icons의 커뮤니티 포크로, 더 많은 아이콘과 활발한 개발이 특징입니다.

## 개요

- **아이콘 수**: 1,400+
- **스타일**: Outline (24x24, stroke width 2px)
- **라이선스**: ISC
- **공식 사이트**: https://lucide.dev

### 특징

- shadcn/ui의 기본 아이콘 라이브러리
- Feather Icons와 호환 (마이그레이션 용이)
- Tree-shakable (필요한 아이콘만 번들)
- 일관된 디자인 언어
- TypeScript 지원

### 적합한 프로젝트

- shadcn/ui 사용 프로젝트
- Next.js / React 프로젝트
- 미니멀하고 깔끔한 UI
- Feather Icons 대체 필요 시

---

## 설치

### React / Next.js

```bash
npm install lucide-react
# 또는
yarn add lucide-react
# 또는
pnpm add lucide-react
```

### Vue

```bash
npm install lucide-vue-next
```

### Svelte

```bash
npm install lucide-svelte
```

### Angular

```bash
npm install lucide-angular
```

---

## 사용법

### 기본 사용

```tsx
import { Camera, Heart, Search } from 'lucide-react';

function App() {
  return (
    <div>
      <Camera />
      <Heart />
      <Search />
    </div>
  );
}
```

### 크기 조절

```tsx
import { Camera } from 'lucide-react';

// size prop 사용
<Camera size={16} />   // 16px
<Camera size={24} />   // 24px (기본값)
<Camera size={32} />   // 32px

// 또는 CSS 클래스
<Camera className="w-4 h-4" />   // Tailwind 16px
<Camera className="w-6 h-6" />   // Tailwind 24px
<Camera className="w-8 h-8" />   // Tailwind 32px
```

### 색상 변경

```tsx
import { Heart } from 'lucide-react';

// color prop 사용
<Heart color="red" />
<Heart color="#3b82f6" />
<Heart color="currentColor" />  // 부모의 text 색상 상속

// Tailwind CSS 사용
<Heart className="text-red-500" />
<Heart className="text-primary" />
```

### 스트로크 두께

```tsx
import { Circle } from 'lucide-react';

<Circle strokeWidth={1} />    // 얇게
<Circle strokeWidth={2} />    // 기본
<Circle strokeWidth={3} />    // 두껍게
```

### 채우기

```tsx
import { Heart } from 'lucide-react';

// 채워진 하트 (fill + stroke)
<Heart fill="red" stroke="red" />

// 또는 className으로
<Heart className="fill-red-500" />
```

---

## shadcn/ui와 함께 사용

shadcn/ui는 Lucide를 기본 아이콘 라이브러리로 사용합니다.

### Button with Icon

```tsx
import { Button } from "@/components/ui/button";
import { Mail, Loader2 } from "lucide-react";

// 아이콘 버튼
<Button>
  <Mail className="mr-2 h-4 w-4" />
  이메일 보내기
</Button>

// 로딩 상태
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  로딩 중...
</Button>

// 아이콘만 있는 버튼
<Button size="icon">
  <Mail className="h-4 w-4" />
</Button>
```

### Input with Icon

```tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

<div className="relative">
  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
  <Input className="pl-8" placeholder="검색..." />
</div>
```

### Alert with Icon

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

// 에러 알림
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>에러</AlertTitle>
  <AlertDescription>문제가 발생했습니다.</AlertDescription>
</Alert>

// 성공 알림
<Alert>
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>성공</AlertTitle>
  <AlertDescription>작업이 완료되었습니다.</AlertDescription>
</Alert>
```

---

## 자주 사용하는 아이콘

### 네비게이션

| 아이콘 | 이름 | 용도 |
|--------|------|------|
| ← | `ArrowLeft` | 뒤로 가기 |
| → | `ArrowRight` | 앞으로 가기 |
| ☰ | `Menu` | 햄버거 메뉴 |
| × | `X` | 닫기 |
| ⌂ | `Home` | 홈 |
| ⚙ | `Settings` | 설정 |

### 액션

| 아이콘 | 이름 | 용도 |
|--------|------|------|
| + | `Plus` | 추가 |
| ✎ | `Pencil` | 수정 |
| 🗑 | `Trash2` | 삭제 |
| ⬇ | `Download` | 다운로드 |
| ⬆ | `Upload` | 업로드 |
| ↗ | `ExternalLink` | 외부 링크 |

### 상태

| 아이콘 | 이름 | 용도 |
|--------|------|------|
| ✓ | `Check` | 완료, 성공 |
| ⚠ | `AlertTriangle` | 경고 |
| ⓘ | `Info` | 정보 |
| ⊗ | `XCircle` | 에러 |
| ↻ | `Loader2` | 로딩 (animate-spin과 함께) |

### 사용자

| 아이콘 | 이름 | 용도 |
|--------|------|------|
| 👤 | `User` | 사용자 |
| 👥 | `Users` | 사용자들 |
| ⚙ | `UserCog` | 사용자 설정 |
| 🔔 | `Bell` | 알림 |
| ✉ | `Mail` | 이메일 |

### 미디어

| 아이콘 | 이름 | 용도 |
|--------|------|------|
| 🖼 | `Image` | 이미지 |
| 📷 | `Camera` | 카메라 |
| 🎬 | `Video` | 비디오 |
| ▶ | `Play` | 재생 |
| ⏸ | `Pause` | 일시정지 |

---

## 커스텀 아이콘 추가

Lucide 스타일로 커스텀 아이콘을 만들 때:

```tsx
import { createLucideIcon } from 'lucide-react';

// SVG path를 사용해 커스텀 아이콘 생성
const CustomIcon = createLucideIcon('CustomIcon', [
  ['path', { d: 'M12 2L2 7l10 5 10-5-10-5z' }],
  ['path', { d: 'M2 17l10 5 10-5' }],
  ['path', { d: 'M2 12l10 5 10-5' }],
]);

// 사용
<CustomIcon size={24} />
```

---

## 참고 자료

- [Lucide 공식 문서](https://lucide.dev/guide/)
- [아이콘 검색](https://lucide.dev/icons/)
- [GitHub 저장소](https://github.com/lucide-icons/lucide)

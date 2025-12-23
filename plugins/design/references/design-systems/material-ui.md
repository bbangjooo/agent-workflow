# Material UI (MUI) Design System

Google의 Material Design을 구현한 React 컴포넌트 라이브러리입니다.

## 개요

Material UI(MUI)는 가장 인기 있는 React UI 프레임워크 중 하나로, Google의 Material Design 가이드라인을 따르는 포괄적인 컴포넌트 라이브러리입니다. 엔터프라이즈급 애플리케이션에 적합합니다.

### 특징

- **Material Design**: Google의 디자인 시스템 구현
- **포괄적인 컴포넌트**: 80+ 개의 사전 구축된 컴포넌트
- **강력한 테마 시스템**: CSS-in-JS 기반 커스터마이징
- **TypeScript 지원**: 완전한 타입 정의
- **접근성**: WAI-ARIA 가이드라인 준수

### 적합한 프로젝트

- 대시보드, 관리자 패널
- 엔터프라이즈 애플리케이션
- 빠른 프로토타이핑
- Material Design 스타일 선호 시

---

## 색상 시스템

### 기본 팔레트 구조

```typescript
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
})
```

### Material Design 색상 팔레트

| 색상 | 용도 | 기본값 |
|------|------|--------|
| Primary | 주요 브랜드 색상, 주요 버튼 | #1976d2 (Blue) |
| Secondary | 보조 액션, 강조 | #9c27b0 (Purple) |
| Error | 에러 상태, 삭제 버튼 | #d32f2f (Red) |
| Warning | 경고 메시지 | #ed6c02 (Orange) |
| Info | 정보성 메시지 | #0288d1 (Light Blue) |
| Success | 성공 상태 | #2e7d32 (Green) |

---

## 타이포그래피

### 타입 스케일

```typescript
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '6rem',      // 96px
      fontWeight: 300,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '3.75rem',   // 60px
      fontWeight: 300,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '3rem',      // 48px
      fontWeight: 400,
    },
    h4: {
      fontSize: '2.125rem',  // 34px
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.5rem',    // 24px
      fontWeight: 400,
    },
    h6: {
      fontSize: '1.25rem',   // 20px
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',      // 16px
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',  // 14px
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',      // 16px
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',  // 14px
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',   // 12px
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
  },
})
```

### 한글 폰트 설정

```typescript
const theme = createTheme({
  typography: {
    fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})
```

---

## 간격 시스템

MUI는 8px 기반의 간격 시스템을 사용합니다.

### spacing 함수

```typescript
// theme.spacing(n) = n * 8px
theme.spacing(1)  // 8px
theme.spacing(2)  // 16px
theme.spacing(3)  // 24px
theme.spacing(4)  // 32px
```

### 컴포넌트에서 사용

```tsx
<Box sx={{
  p: 2,      // padding: 16px
  m: 1,      // margin: 8px
  mt: 3,     // margin-top: 24px
  gap: 2,    // gap: 16px
}} />
```

---

## 핵심 컴포넌트

### Button

```tsx
import Button from '@mui/material/Button'

// 변형
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>

// 색상
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="error">Error</Button>

// 크기
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

### TextField

```tsx
import TextField from '@mui/material/TextField'

<TextField
  label="이메일"
  variant="outlined"  // outlined | filled | standard
  fullWidth
  error={hasError}
  helperText="도움말 텍스트"
/>
```

### Card

```tsx
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'

<Card>
  <CardContent>
    <Typography variant="h5" component="div">
      카드 제목
    </Typography>
    <Typography variant="body2" color="text.secondary">
      카드 내용
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">액션</Button>
  </CardActions>
</Card>
```

### Dialog

```tsx
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

<Dialog open={open} onClose={handleClose}>
  <DialogTitle>다이얼로그 제목</DialogTitle>
  <DialogContent>
    <Typography>다이얼로그 내용</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>취소</Button>
    <Button onClick={handleConfirm} variant="contained">확인</Button>
  </DialogActions>
</Dialog>
```

### AppBar & Navigation

```tsx
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

<AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      앱 이름
    </Typography>
    <Button color="inherit">로그인</Button>
  </Toolbar>
</AppBar>
```

---

## 설치 및 설정

### 기본 설치

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material  # 아이콘 (선택)
```

### 테마 프로바이더 설정

```tsx
// src/app/providers.tsx
'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
```

### Next.js App Router 설정

```tsx
// src/app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

---

## 테마 커스터마이징

### 커스텀 테마 생성

```typescript
const theme = createTheme({
  palette: {
    mode: 'light', // 'dark' for dark mode
    primary: {
      main: '#FF6B35', // 브랜드 색상
    },
    secondary: {
      main: '#004E89',
    },
  },
  typography: {
    fontFamily: '"Pretendard", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // 대문자 변환 비활성화
        },
      },
    },
  },
})
```

### 다크 모드 지원

```typescript
import { useState, useMemo } from 'react'

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* 앱 내용 */}
    </ThemeProvider>
  )
}
```

---

## sx prop 스타일링

MUI의 강력한 인라인 스타일링 시스템:

```tsx
<Box
  sx={{
    width: 300,
    height: 300,
    backgroundColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
    // 반응형
    display: { xs: 'none', md: 'block' },
    // 테마 값 참조
    p: 2,  // padding: theme.spacing(2)
    borderRadius: 1, // theme.shape.borderRadius
  }}
/>
```

---

## 참고 자료

- [MUI 공식 문서](https://mui.com/)
- [Material Design 가이드라인](https://material.io/design)
- [MUI GitHub](https://github.com/mui/material-ui)
- [MUI 템플릿](https://mui.com/store/)

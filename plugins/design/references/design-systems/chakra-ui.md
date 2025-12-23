# Chakra UI Design System

접근성 중심의 모듈러 React 컴포넌트 라이브러리입니다.

## 개요

Chakra UI는 접근성(a11y)을 최우선으로 설계된 React UI 라이브러리입니다. 직관적인 API와 일관된 디자인 시스템을 제공하며, 개발자 경험(DX)에 중점을 둡니다.

### 특징

- **접근성 우선**: WAI-ARIA 가이드라인 기본 준수
- **테마 기반**: 강력한 테마 시스템과 다크 모드 지원
- **컴포저블**: 작은 단위의 조합 가능한 컴포넌트
- **스타일 Props**: CSS-in-JS 기반 인라인 스타일링
- **TypeScript**: 완전한 타입 지원

### 적합한 프로젝트

- 접근성이 중요한 프로젝트
- 빠른 개발이 필요한 스타트업
- 다크 모드가 필수인 프로젝트
- React 기반 프로젝트

---

## 색상 시스템

### 색상 팔레트 구조

Chakra UI는 각 색상에 50~900까지의 shade를 제공합니다:

```typescript
const colors = {
  // 브랜드 색상
  brand: {
    50: '#E6FFFA',
    100: '#B2F5EA',
    200: '#81E6D9',
    300: '#4FD1C5',
    400: '#38B2AC',
    500: '#319795',  // 기본
    600: '#2C7A7B',
    700: '#285E61',
    800: '#234E52',
    900: '#1D4044',
  },

  // 기본 제공 색상
  gray: { /* 50-900 */ },
  red: { /* 50-900 */ },
  orange: { /* 50-900 */ },
  yellow: { /* 50-900 */ },
  green: { /* 50-900 */ },
  teal: { /* 50-900 */ },
  blue: { /* 50-900 */ },
  cyan: { /* 50-900 */ },
  purple: { /* 50-900 */ },
  pink: { /* 50-900 */ },
}
```

### 시맨틱 토큰

```typescript
const semanticTokens = {
  colors: {
    'chakra-body-text': {
      _light: 'gray.800',
      _dark: 'whiteAlpha.900',
    },
    'chakra-body-bg': {
      _light: 'white',
      _dark: 'gray.800',
    },
    'chakra-border-color': {
      _light: 'gray.200',
      _dark: 'whiteAlpha.300',
    },
    'chakra-subtle-bg': {
      _light: 'gray.100',
      _dark: 'gray.700',
    },
  },
}
```

### 색상 사용

```tsx
// Props로 색상 지정
<Box bg="blue.500" color="white">파란 배경</Box>
<Box bg="brand.500">브랜드 색상</Box>

// colorScheme으로 컴포넌트 색상 변경
<Button colorScheme="blue">Blue</Button>
<Button colorScheme="green">Green</Button>
<Button colorScheme="brand">Brand</Button>
```

---

## 타이포그래피

### 폰트 사이즈 스케일

```typescript
const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  md: '1rem',       // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
  '7xl': '4.5rem',   // 72px
  '8xl': '6rem',     // 96px
  '9xl': '8rem',     // 128px
}
```

### 텍스트 컴포넌트

```tsx
import { Heading, Text } from '@chakra-ui/react'

<Heading as="h1" size="2xl">페이지 제목</Heading>
<Heading as="h2" size="xl">섹션 제목</Heading>
<Text fontSize="lg">큰 본문</Text>
<Text fontSize="md">기본 본문</Text>
<Text fontSize="sm" color="gray.600">보조 텍스트</Text>
```

### 한글 폰트 설정

```typescript
const theme = extendTheme({
  fonts: {
    heading: `'Pretendard', sans-serif`,
    body: `'Pretendard', sans-serif`,
  },
})
```

---

## 간격 시스템

### Space 토큰

```typescript
const space = {
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
}
```

### 사용 예시

```tsx
<Box p={4}>패딩 16px</Box>
<Box m={2}>마진 8px</Box>
<Box px={6} py={4}>수평 24px, 수직 16px</Box>
<Stack spacing={4}>요소 간 16px 간격</Stack>
```

---

## 핵심 컴포넌트

### Button

```tsx
import { Button, ButtonGroup } from '@chakra-ui/react'

// 변형
<Button colorScheme="blue">Solid</Button>
<Button variant="outline" colorScheme="blue">Outline</Button>
<Button variant="ghost" colorScheme="blue">Ghost</Button>
<Button variant="link" colorScheme="blue">Link</Button>

// 크기
<Button size="xs">Tiny</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// 아이콘
<Button leftIcon={<EmailIcon />}>이메일</Button>
<IconButton icon={<SearchIcon />} aria-label="검색" />

// 로딩
<Button isLoading loadingText="처리 중...">제출</Button>
```

### Input & Form

```tsx
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react'

<FormControl isInvalid={isError}>
  <FormLabel>이메일</FormLabel>
  <Input type="email" value={value} onChange={handleChange} />
  {!isError ? (
    <FormHelperText>이메일을 입력하세요.</FormHelperText>
  ) : (
    <FormErrorMessage>이메일은 필수입니다.</FormErrorMessage>
  )}
</FormControl>

// 변형
<Input variant="outline" placeholder="기본" />
<Input variant="filled" placeholder="채워진" />
<Input variant="flushed" placeholder="밑줄" />
<Input variant="unstyled" placeholder="스타일 없음" />
```

### Card

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

<Card>
  <CardHeader>
    <Heading size="md">카드 제목</Heading>
  </CardHeader>
  <CardBody>
    <Text>카드 내용입니다.</Text>
  </CardBody>
  <CardFooter>
    <Button colorScheme="blue">액션</Button>
  </CardFooter>
</Card>

// 변형
<Card variant="outline">아웃라인 카드</Card>
<Card variant="filled">채워진 카드</Card>
<Card variant="elevated">그림자 카드</Card>
```

### Modal

```tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

function ModalExample() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>모달 열기</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>모달 제목</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>모달 내용입니다.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              닫기
            </Button>
            <Button variant="ghost">취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
```

### Toast

```tsx
import { useToast } from '@chakra-ui/react'

function ToastExample() {
  const toast = useToast()

  return (
    <Button
      onClick={() =>
        toast({
          title: '저장 완료',
          description: '변경사항이 저장되었습니다.',
          status: 'success', // success, error, warning, info
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
      }
    >
      토스트 표시
    </Button>
  )
}
```

### Stack (레이아웃)

```tsx
import { Stack, HStack, VStack } from '@chakra-ui/react'

// 수직 스택
<VStack spacing={4} align="stretch">
  <Box>1</Box>
  <Box>2</Box>
  <Box>3</Box>
</VStack>

// 수평 스택
<HStack spacing={4}>
  <Box>1</Box>
  <Box>2</Box>
  <Box>3</Box>
</HStack>

// 반응형 스택
<Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
  <Box>1</Box>
  <Box>2</Box>
</Stack>
```

---

## 설치 및 설정

### 기본 설치

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### Provider 설정

```tsx
// src/app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>
}

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

### 테마 확장

```typescript
// src/theme/index.ts
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#bae7ff',
      200: '#91d5ff',
      300: '#69c0ff',
      400: '#40a9ff',
      500: '#1890ff',  // primary
      600: '#096dd9',
      700: '#0050b3',
      800: '#003a8c',
      900: '#002766',
    },
  },
  fonts: {
    heading: `'Pretendard', sans-serif`,
    body: `'Pretendard', sans-serif`,
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
})

export default theme
```

### Provider에 테마 적용

```tsx
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
```

---

## 다크 모드

### Color Mode 설정

```tsx
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="테마 변경"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
    />
  )
}
```

### useColorModeValue

```tsx
function Example() {
  const bg = useColorModeValue('white', 'gray.800')
  const color = useColorModeValue('gray.800', 'white')

  return (
    <Box bg={bg} color={color}>
      다크 모드 대응 컴포넌트
    </Box>
  )
}
```

---

## 스타일 Props

Chakra UI의 강력한 스타일 시스템:

```tsx
<Box
  // 레이아웃
  w="100%"
  maxW="container.md"
  h="200px"

  // 간격
  p={4}
  m={2}
  px={6}
  py={4}

  // 색상
  bg="blue.500"
  color="white"

  // 테두리
  borderWidth="1px"
  borderColor="gray.200"
  borderRadius="lg"

  // 그림자
  shadow="md"

  // Flexbox
  display="flex"
  alignItems="center"
  justifyContent="space-between"

  // 반응형
  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}

  // 의사 클래스
  _hover={{ bg: 'blue.600' }}
  _active={{ bg: 'blue.700' }}
  _focus={{ outline: 'none', ring: 2, ringColor: 'blue.500' }}
/>
```

---

## 참고 자료

- [Chakra UI 공식 문서](https://chakra-ui.com/)
- [Chakra UI GitHub](https://github.com/chakra-ui/chakra-ui)
- [Chakra UI Pro (템플릿)](https://pro.chakra-ui.com/)
- [Chakra Templates](https://chakra-templates.dev/)

# NativeBase 디자인 시스템 가이드

NativeBase는 React Native와 웹에서 동작하는 접근성 중심의 유틸리티 기반 컴포넌트 라이브러리입니다.

## 개요

- **GitHub**: https://github.com/GeekyAnts/NativeBase
- **문서**: https://docs.nativebase.io/
- **디자인 철학**: Tailwind-like 유틸리티 스타일 + 접근성
- **호환성**: React Native, Expo, React Native Web

## 설치

```bash
npm install native-base react-native-svg react-native-safe-area-context
```

Expo:
```bash
expo install native-base react-native-svg react-native-safe-area-context
```

## 테마 설정

### 기본 테마 구조

```javascript
import { extendTheme, NativeBaseProvider } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3',  // 기본
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    },
    secondary: {
      50: '#FCE4EC',
      100: '#F8BBD9',
      // ...
      500: '#E91E63',
    },
  },
  fontConfig: {
    Pretendard: {
      100: { normal: 'Pretendard-Thin' },
      200: { normal: 'Pretendard-ExtraLight' },
      300: { normal: 'Pretendard-Light' },
      400: { normal: 'Pretendard-Regular' },
      500: { normal: 'Pretendard-Medium' },
      600: { normal: 'Pretendard-SemiBold' },
      700: { normal: 'Pretendard-Bold' },
      800: { normal: 'Pretendard-ExtraBold' },
      900: { normal: 'Pretendard-Black' },
    },
  },
  fonts: {
    heading: 'Pretendard',
    body: 'Pretendard',
    mono: 'Pretendard',
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'lg',
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
  },
});

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Content />
    </NativeBaseProvider>
  );
}
```

## 유틸리티 스타일링

NativeBase는 Tailwind 스타일의 props를 지원합니다:

```jsx
import { Box, Text } from 'native-base';

<Box
  bg="primary.500"
  p={4}
  mx={2}
  rounded="lg"
  shadow={2}
>
  <Text color="white" fontSize="lg" fontWeight="bold">
    Hello World
  </Text>
</Box>
```

### 주요 유틸리티 Props

| Prop | 설명 | 예시 |
|------|------|------|
| `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr` | 패딩 | `p={4}`, `px={2}` |
| `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | 마진 | `m={2}`, `mt={4}` |
| `bg` | 배경색 | `bg="primary.500"` |
| `color` | 텍스트 색상 | `color="gray.600"` |
| `w`, `h` | 너비, 높이 | `w="100%"`, `h={12}` |
| `rounded` | border-radius | `rounded="lg"` |
| `shadow` | 그림자 | `shadow={2}` |
| `flex`, `flexDir` | Flexbox | `flex={1}`, `flexDir="row"` |

## 핵심 컴포넌트

### 1. Button

```jsx
import { Button, ButtonGroup } from 'native-base';

// Variant: solid, outline, ghost, link
<Button colorScheme="primary">Primary</Button>
<Button variant="outline" colorScheme="secondary">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// 크기
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// 아이콘
<Button leftIcon={<Icon as={Ionicons} name="add" />}>Add</Button>
<Button rightIcon={<Icon as={Ionicons} name="arrow-forward" />}>Next</Button>

// 로딩
<Button isLoading isLoadingText="Submitting...">Submit</Button>

// 그룹
<ButtonGroup isAttached>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
```

### 2. Input

```jsx
import { Input, FormControl, WarningOutlineIcon } from 'native-base';

// Variant: outline, filled, underlined, unstyled
<Input placeholder="Email" variant="outline" />
<Input placeholder="Password" type="password" variant="filled" />

// FormControl로 라벨, 헬퍼텍스트, 에러 표시
<FormControl isInvalid={hasError}>
  <FormControl.Label>Email</FormControl.Label>
  <Input placeholder="Enter email" />
  <FormControl.HelperText>
    We'll never share your email
  </FormControl.HelperText>
  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
    Please enter a valid email
  </FormControl.ErrorMessage>
</FormControl>

// InputGroup
<InputGroup>
  <InputLeftAddon>https://</InputLeftAddon>
  <Input placeholder="mysite" />
  <InputRightAddon>.com</InputRightAddon>
</InputGroup>
```

### 3. Box & Layout

```jsx
import { Box, VStack, HStack, Center, Flex } from 'native-base';

// Box: 기본 컨테이너
<Box p={4} bg="white" rounded="lg" shadow={2}>
  Content
</Box>

// VStack: 세로 스택
<VStack space={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</VStack>

// HStack: 가로 스택
<HStack space={2} justifyContent="space-between">
  <Box>Left</Box>
  <Box>Right</Box>
</HStack>

// Center: 중앙 정렬
<Center flex={1}>
  <Text>Centered Content</Text>
</Center>

// Flex: Flexbox 레이아웃
<Flex direction="row" wrap="wrap">
  <Box w="50%">Half</Box>
  <Box w="50%">Half</Box>
</Flex>
```

### 4. Card (Box 활용)

```jsx
import { Box, AspectRatio, Image, Stack, Heading, Text, HStack } from 'native-base';

<Box rounded="lg" overflow="hidden" borderWidth={1} borderColor="coolGray.200">
  <AspectRatio ratio={16 / 9}>
    <Image source={{ uri: 'https://...' }} alt="image" />
  </AspectRatio>
  <Stack p={4} space={3}>
    <Heading size="md">Card Title</Heading>
    <Text color="coolGray.600" fontSize="sm">
      Card description goes here
    </Text>
    <HStack space={2} mt={2}>
      <Badge colorScheme="green">Tag 1</Badge>
      <Badge colorScheme="blue">Tag 2</Badge>
    </HStack>
  </Stack>
</Box>
```

### 5. Modal

```jsx
import { Modal, Button } from 'native-base';

const [showModal, setShowModal] = useState(false);

<Button onPress={() => setShowModal(true)}>Open Modal</Button>

<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <Modal.Content maxWidth="400px">
    <Modal.CloseButton />
    <Modal.Header>Modal Title</Modal.Header>
    <Modal.Body>
      <Text>This is the modal content.</Text>
    </Modal.Body>
    <Modal.Footer>
      <Button.Group space={2}>
        <Button variant="ghost" onPress={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button onPress={() => {}}>Save</Button>
      </Button.Group>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

### 6. ActionSheet

```jsx
import { Actionsheet, useDisclose } from 'native-base';

const { isOpen, onOpen, onClose } = useDisclose();

<Button onPress={onOpen}>Open</Button>

<Actionsheet isOpen={isOpen} onClose={onClose}>
  <Actionsheet.Content>
    <Actionsheet.Header>Options</Actionsheet.Header>
    <Actionsheet.Item onPress={() => {}}>Edit</Actionsheet.Item>
    <Actionsheet.Item onPress={() => {}}>Share</Actionsheet.Item>
    <Actionsheet.Item color="red.500" onPress={() => {}}>Delete</Actionsheet.Item>
  </Actionsheet.Content>
</Actionsheet>
```

### 7. Toast

```jsx
import { useToast, Box, Text } from 'native-base';

const toast = useToast();

<Button
  onPress={() => {
    toast.show({
      description: "Item saved successfully",
      placement: "top",
    });
  }}
>
  Show Toast
</Button>

// 커스텀 Toast
<Button
  onPress={() => {
    toast.show({
      render: () => (
        <Box bg="emerald.500" px={4} py={2} rounded="md">
          <Text color="white">Custom Toast!</Text>
        </Box>
      ),
    });
  }}
>
  Custom Toast
</Button>
```

### 8. Avatar

```jsx
import { Avatar, AvatarGroup } from 'native-base';

<Avatar
  source={{ uri: 'https://...' }}
  size="lg"
>
  JD {/* Fallback initials */}
</Avatar>

<AvatarGroup max={3}>
  <Avatar source={{ uri: '...' }}>A</Avatar>
  <Avatar source={{ uri: '...' }}>B</Avatar>
  <Avatar source={{ uri: '...' }}>C</Avatar>
  <Avatar source={{ uri: '...' }}>D</Avatar>
</AvatarGroup>
```

### 9. Badge

```jsx
import { Badge, HStack } from 'native-base';

<HStack space={2}>
  <Badge colorScheme="success">Active</Badge>
  <Badge colorScheme="danger" variant="outline">Error</Badge>
  <Badge colorScheme="info" variant="subtle">Info</Badge>
</HStack>
```

### 10. Switch & Checkbox

```jsx
import { Switch, Checkbox, HStack } from 'native-base';

// Switch
<Switch
  isChecked={isEnabled}
  onToggle={() => setIsEnabled(!isEnabled)}
  colorScheme="primary"
/>

// Checkbox
<Checkbox.Group value={selectedItems} onChange={setSelectedItems}>
  <VStack space={2}>
    <Checkbox value="one">Option One</Checkbox>
    <Checkbox value="two">Option Two</Checkbox>
    <Checkbox value="three">Option Three</Checkbox>
  </VStack>
</Checkbox.Group>
```

### 11. Select

```jsx
import { Select, CheckIcon } from 'native-base';

<Select
  selectedValue={service}
  placeholder="Choose Service"
  onValueChange={(value) => setService(value)}
  _selectedItem={{
    bg: "primary.100",
    endIcon: <CheckIcon size={4} />,
  }}
>
  <Select.Item label="Web Development" value="web" />
  <Select.Item label="Mobile Development" value="mobile" />
  <Select.Item label="UI/UX Design" value="design" />
</Select>
```

### 12. Spinner

```jsx
import { Spinner, HStack } from 'native-base';

<Spinner size="sm" />
<Spinner size="lg" color="primary.500" />

// 텍스트와 함께
<HStack space={2} alignItems="center">
  <Spinner />
  <Text>Loading...</Text>
</HStack>
```

## Typography

```jsx
import { Text, Heading } from 'native-base';

<Heading size="2xl">Heading 2XL</Heading>
<Heading size="xl">Heading XL</Heading>
<Heading size="lg">Heading LG</Heading>
<Heading size="md">Heading MD</Heading>
<Heading size="sm">Heading SM</Heading>
<Heading size="xs">Heading XS</Heading>

<Text fontSize="xl">Text XL</Text>
<Text fontSize="lg">Text LG</Text>
<Text fontSize="md">Text MD</Text>
<Text fontSize="sm">Text SM</Text>
<Text fontSize="xs">Text XS</Text>

<Text fontWeight="bold">Bold</Text>
<Text italic>Italic</Text>
<Text underline>Underline</Text>
```

## 아이콘

```jsx
import { Icon } from 'native-base';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

<Icon as={Ionicons} name="home" size="md" color="primary.500" />
<Icon as={MaterialIcons} name="settings" size="lg" />
<Icon as={FontAwesome} name="star" size="sm" color="yellow.400" />
```

## 반응형 스타일

```jsx
<Box
  bg={{
    base: 'red.500',
    sm: 'blue.500',
    md: 'green.500',
    lg: 'yellow.500',
  }}
  p={{ base: 2, md: 4, lg: 6 }}
  w={{ base: '100%', md: '50%' }}
>
  Responsive Box
</Box>
```

### Breakpoints

| 이름 | 값 |
|------|-----|
| base | 0 |
| sm | 480px |
| md | 768px |
| lg | 992px |
| xl | 1280px |

## 다크 모드

```jsx
import { useColorMode, useColorModeValue, IconButton, MoonIcon, SunIcon } from 'native-base';

const { colorMode, toggleColorMode } = useColorMode();
const bg = useColorModeValue('white', 'gray.800');
const textColor = useColorModeValue('gray.800', 'white');

<Box bg={bg}>
  <Text color={textColor}>Theme-aware Text</Text>
  <IconButton
    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    onPress={toggleColorMode}
  />
</Box>
```

## 프로젝트 구조 예시

```
src/
├── components/
│   ├── Button/
│   ├── Card/
│   └── ...
├── screens/
│   ├── HomeScreen.tsx
│   └── ...
├── navigation/
│   └── AppNavigator.tsx
├── theme/
│   ├── index.ts
│   └── components.ts
└── App.tsx
```

## 참고 자료

- [NativeBase 공식 문서](https://docs.nativebase.io/)
- [NativeBase GitHub](https://github.com/GeekyAnts/NativeBase)
- [NativeBase Kitchen Sink (예제)](https://kitchensink.nativebase.io/)

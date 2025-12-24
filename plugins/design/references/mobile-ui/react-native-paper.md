# React Native Paper 디자인 시스템 가이드

React Native Paper는 Material Design 3를 구현한 크로스 플랫폼 UI 라이브러리입니다.

## 개요

- **GitHub**: https://github.com/callstack/react-native-paper
- **문서**: https://callstack.github.io/react-native-paper/
- **디자인 철학**: Material Design 3 (Material You)
- **호환성**: React Native, Expo

## 설치

```bash
npm install react-native-paper react-native-safe-area-context react-native-vector-icons
```

## 테마 설정

### 기본 테마 구조

```javascript
import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  fontFamily: 'Pretendard',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6750A4',
    primaryContainer: '#EADDFF',
    secondary: '#625B71',
    secondaryContainer: '#E8DEF8',
    tertiary: '#7D5260',
    tertiaryContainer: '#FFD8E4',
    surface: '#FFFBFE',
    surfaceVariant: '#E7E0EC',
    background: '#FFFBFE',
    error: '#B3261E',
    errorContainer: '#F9DEDC',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#21005D',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#1D192B',
    onSurface: '#1C1B1F',
    onSurfaceVariant: '#49454F',
    onError: '#FFFFFF',
    onErrorContainer: '#410E0B',
    outline: '#79747E',
    outlineVariant: '#CAC4D0',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#313033',
    inverseOnSurface: '#F4EFF4',
    inversePrimary: '#D0BCFF',
  },
  fonts: configureFonts({ config: fontConfig }),
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#D0BCFF',
    primaryContainer: '#4F378B',
    // ... (dark mode colors)
  },
};
```

### 앱에 테마 적용

```javascript
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider theme={lightTheme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
```

## 핵심 컴포넌트

### 1. Button

```jsx
import { Button } from 'react-native-paper';

// Mode: contained, outlined, text, elevated, contained-tonal
<Button mode="contained" onPress={() => console.log('Pressed')}>
  Press me
</Button>

<Button
  mode="outlined"
  icon="camera"
  loading={isLoading}
  disabled={isDisabled}
>
  Take photo
</Button>
```

**Variants**:
| Mode | 스타일 | 용도 |
|------|--------|------|
| contained | 배경색 채움 | 주요 액션 |
| outlined | 테두리만 | 보조 액션 |
| text | 텍스트만 | 덜 강조되는 액션 |
| elevated | 그림자 있음 | 강조된 보조 액션 |
| contained-tonal | 연한 배경색 | 덜 강조된 주요 액션 |

### 2. FAB (Floating Action Button)

```jsx
import { FAB, AnimatedFAB } from 'react-native-paper';

// 기본 FAB
<FAB
  icon="plus"
  style={styles.fab}
  onPress={() => console.log('Pressed')}
/>

// 확장 FAB
<FAB
  icon="plus"
  label="Create"
  extended
  onPress={() => console.log('Pressed')}
/>

// 애니메이션 FAB (스크롤 시 축소)
<AnimatedFAB
  icon="plus"
  label="New Item"
  extended={isExtended}
  onPress={() => {}}
  animateFrom="right"
/>
```

### 3. TextInput

```jsx
import { TextInput } from 'react-native-paper';

// Mode: flat, outlined
<TextInput
  label="Email"
  value={text}
  onChangeText={setText}
  mode="outlined"
  left={<TextInput.Icon icon="email" />}
  right={<TextInput.Icon icon="close" onPress={() => setText('')} />}
/>

<TextInput
  label="Password"
  value={password}
  onChangeText={setPassword}
  secureTextEntry
  mode="flat"
  error={hasError}
/>

// 에러 표시
<HelperText type="error" visible={hasError}>
  Email address is invalid!
</HelperText>
```

### 4. Card

```jsx
import { Card } from 'react-native-paper';

// Mode: elevated, outlined, contained
<Card mode="elevated" onPress={() => {}}>
  <Card.Cover source={{ uri: 'https://...' }} />
  <Card.Title
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
  />
  <Card.Content>
    <Text variant="bodyMedium">Card content</Text>
  </Card.Content>
  <Card.Actions>
    <Button>Cancel</Button>
    <Button mode="contained">Ok</Button>
  </Card.Actions>
</Card>
```

### 5. Appbar

```jsx
import { Appbar } from 'react-native-paper';

// 기본 Appbar
<Appbar.Header>
  <Appbar.BackAction onPress={() => navigation.goBack()} />
  <Appbar.Content title="Title" />
  <Appbar.Action icon="magnify" onPress={() => {}} />
  <Appbar.Action icon="dots-vertical" onPress={() => {}} />
</Appbar.Header>

// 큰 제목 (Material 3)
<Appbar.Header mode="large">
  <Appbar.BackAction onPress={() => {}} />
  <Appbar.Content title="Large Title" />
</Appbar.Header>
```

### 6. BottomNavigation

```jsx
import { BottomNavigation } from 'react-native-paper';

const [index, setIndex] = useState(0);
const [routes] = useState([
  { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
  { key: 'search', title: 'Search', focusedIcon: 'magnify' },
  { key: 'notifications', title: 'Alerts', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  { key: 'profile', title: 'Profile', focusedIcon: 'account' },
]);

const renderScene = BottomNavigation.SceneMap({
  home: HomeScreen,
  search: SearchScreen,
  notifications: NotificationsScreen,
  profile: ProfileScreen,
});

<BottomNavigation
  navigationState={{ index, routes }}
  onIndexChange={setIndex}
  renderScene={renderScene}
  barStyle={{ backgroundColor: theme.colors.surface }}
/>
```

### 7. Dialog

```jsx
import { Dialog, Portal } from 'react-native-paper';

<Portal>
  <Dialog visible={visible} onDismiss={() => setVisible(false)}>
    <Dialog.Title>Alert</Dialog.Title>
    <Dialog.Content>
      <Text variant="bodyMedium">This is a dialog content.</Text>
    </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={() => setVisible(false)}>Cancel</Button>
      <Button onPress={handleConfirm}>Confirm</Button>
    </Dialog.Actions>
  </Dialog>
</Portal>
```

### 8. Snackbar

```jsx
import { Snackbar } from 'react-native-paper';

<Snackbar
  visible={visible}
  onDismiss={() => setVisible(false)}
  duration={4000}
  action={{
    label: 'Undo',
    onPress: () => {},
  }}
>
  Item deleted
</Snackbar>
```

### 9. List

```jsx
import { List, Divider } from 'react-native-paper';

<List.Section>
  <List.Subheader>Settings</List.Subheader>
  <List.Item
    title="Notifications"
    description="Enable push notifications"
    left={props => <List.Icon {...props} icon="bell" />}
    right={props => <Switch value={isEnabled} onValueChange={setIsEnabled} />}
  />
  <Divider />
  <List.Item
    title="Account"
    left={props => <List.Icon {...props} icon="account" />}
    right={props => <List.Icon {...props} icon="chevron-right" />}
    onPress={() => navigation.navigate('Account')}
  />
</List.Section>

// Accordion
<List.Accordion
  title="Advanced Settings"
  left={props => <List.Icon {...props} icon="cog" />}
>
  <List.Item title="Option 1" />
  <List.Item title="Option 2" />
</List.Accordion>
```

### 10. Chip

```jsx
import { Chip } from 'react-native-paper';

// Mode: flat, outlined
<Chip icon="check" onPress={() => {}}>
  Selected
</Chip>

<Chip
  mode="outlined"
  closeIcon="close"
  onClose={() => {}}
>
  Tag
</Chip>
```

### 11. Switch

```jsx
import { Switch } from 'react-native-paper';

<Switch value={isSwitchOn} onValueChange={() => setIsSwitchOn(!isSwitchOn)} />
```

### 12. ActivityIndicator

```jsx
import { ActivityIndicator } from 'react-native-paper';

<ActivityIndicator animating={true} size="large" />
<ActivityIndicator animating={true} size="small" color={theme.colors.primary} />
```

## Typography

React Native Paper의 Typography는 Material Design 3 타입 스케일을 따릅니다.

```jsx
import { Text } from 'react-native-paper';

<Text variant="displayLarge">Display Large</Text>
<Text variant="displayMedium">Display Medium</Text>
<Text variant="displaySmall">Display Small</Text>

<Text variant="headlineLarge">Headline Large</Text>
<Text variant="headlineMedium">Headline Medium</Text>
<Text variant="headlineSmall">Headline Small</Text>

<Text variant="titleLarge">Title Large</Text>
<Text variant="titleMedium">Title Medium</Text>
<Text variant="titleSmall">Title Small</Text>

<Text variant="bodyLarge">Body Large</Text>
<Text variant="bodyMedium">Body Medium</Text>
<Text variant="bodySmall">Body Small</Text>

<Text variant="labelLarge">Label Large</Text>
<Text variant="labelMedium">Label Medium</Text>
<Text variant="labelSmall">Label Small</Text>
```

## 아이콘

Material Community Icons를 사용합니다.

```jsx
import { IconButton } from 'react-native-paper';

<IconButton
  icon="camera"
  iconColor={theme.colors.primary}
  size={24}
  onPress={() => {}}
/>
```

아이콘 찾기: https://materialdesignicons.com/

## 레이아웃 가이드

### Safe Area

```jsx
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={{ flex: 1 }}>
  <Content />
</SafeAreaView>
```

### 간격 시스템

Material Design 3 권장 간격:

```javascript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

## 다크 모드

```jsx
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

const colorScheme = useColorScheme();
const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

<PaperProvider theme={theme}>
  <App />
</PaperProvider>
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
│   ├── AppNavigator.tsx
│   └── BottomTabNavigator.tsx
├── theme/
│   ├── index.ts
│   ├── lightTheme.ts
│   └── darkTheme.ts
└── App.tsx
```

## 참고 자료

- [React Native Paper 공식 문서](https://callstack.github.io/react-native-paper/)
- [Material Design 3 가이드라인](https://m3.material.io/)
- [Material Community Icons](https://materialdesignicons.com/)

# React Native Vector Icons

React Native에서 가장 널리 사용되는 아이콘 라이브러리입니다.

## 개요

- **아이콘셋 수**: 20+ 개의 아이콘셋 포함
- **총 아이콘 수**: 10,000+
- **라이선스**: MIT
- **공식 저장소**: https://github.com/oblador/react-native-vector-icons

### 포함된 아이콘셋

| 아이콘셋 | 아이콘 수 | 스타일 |
|---------|---------|-------|
| MaterialIcons | 2,000+ | Material Design |
| MaterialCommunityIcons | 7,000+ | Material 확장 |
| FontAwesome5 | 1,500+ | 다양함 |
| Ionicons | 1,200+ | iOS/Android |
| Feather | 280+ | Outline |
| AntDesign | 300+ | Ant Design |
| Entypo | 400+ | 다양함 |
| EvilIcons | 70+ | 미니멀 |
| FontAwesome | 700+ | 클래식 |
| Foundation | 280+ | 기본 |
| Octicons | 250+ | GitHub |
| SimpleLineIcons | 190+ | 라인 |
| Zocial | 100+ | 소셜 |

### 적합한 프로젝트

- React Native 앱
- 다양한 스타일의 아이콘이 필요한 경우
- 기존 웹 프로젝트에서 사용하던 아이콘셋 유지

---

## 설치

### React Native CLI

```bash
npm install react-native-vector-icons

# iOS (CocoaPods)
cd ios && pod install

# Android는 자동 링킹
```

### 설정

#### iOS - Info.plist에 폰트 추가

```xml
<key>UIAppFonts</key>
<array>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>Ionicons.ttf</string>
  <string>Feather.ttf</string>
  <!-- 필요한 폰트만 추가 -->
</array>
```

#### Android - android/app/build.gradle

```groovy
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

### Expo

```bash
# Expo는 @expo/vector-icons 사용 (기본 포함)
# react-native-vector-icons와 호환됨
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
```

---

## 사용법

### 기본 사용

```tsx
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

function App() {
  return (
    <View>
      <Icon name="home" size={24} color="#000" />
      <FeatherIcon name="heart" size={24} color="#e63946" />
      <IonIcon name="settings-outline" size={24} color="#6b7280" />
    </View>
  );
}
```

### 아이콘셋별 import

```tsx
// Material Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
<MaterialIcons name="favorite" size={24} color="red" />

// Material Community Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
<MaterialCommunityIcons name="account-circle" size={24} color="blue" />

// Ionicons
import Ionicons from 'react-native-vector-icons/Ionicons';
<Ionicons name="ios-heart" size={24} color="pink" />

// Font Awesome 5
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
<FontAwesome5 name="github" size={24} color="black" solid />

// Feather
import Feather from 'react-native-vector-icons/Feather';
<Feather name="search" size={24} color="gray" />

// Ant Design
import AntDesign from 'react-native-vector-icons/AntDesign';
<AntDesign name="star" size={24} color="gold" />
```

---

## 컴포넌트 예시

### Icon Button

```tsx
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function IconButton({ name, onPress, size = 24, color = '#000' }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.iconButton}
    >
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
});

// 사용
<IconButton name="favorite" onPress={handleLike} color="#e63946" />
<IconButton name="share" onPress={handleShare} />
<IconButton name="more-vert" onPress={handleMore} />
```

### Tab Bar Icon

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

### List Item with Icon

```tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ListItem({ icon, title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItem}>
      <Icon name={icon} size={24} color="#6b7280" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Icon name="chevron-right" size={24} color="#9ca3af" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  icon: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
});

// 사용
<ListItem icon="person" title="계정 설정" onPress={() => {}} />
<ListItem icon="notifications" title="알림" onPress={() => {}} />
<ListItem icon="lock" title="보안" onPress={() => {}} />
```

### Floating Action Button

```tsx
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function FAB({ icon = 'add', onPress, color = '#3b82f6' }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.fab, { backgroundColor: color }]}
    >
      <Icon name={icon} size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
```

---

## 아이콘셋 선택 가이드

| 용도 | 추천 아이콘셋 | 이유 |
|------|-------------|------|
| Material Design 앱 | MaterialIcons | 공식 MD 아이콘 |
| 다양한 아이콘 필요 | MaterialCommunityIcons | 가장 많은 아이콘 |
| iOS 네이티브 느낌 | Ionicons | iOS 스타일 포함 |
| 미니멀 UI | Feather | 깔끔한 outline |
| Ant Design 사용 | AntDesign | Ant Design 스타일 |
| 소셜 미디어 | FontAwesome5 | 브랜드 아이콘 풍부 |

---

## 자주 사용하는 아이콘

### MaterialIcons

| 이름 | 용도 |
|------|------|
| `home` | 홈 |
| `search` | 검색 |
| `person` | 프로필 |
| `settings` | 설정 |
| `add` | 추가 |
| `delete` | 삭제 |
| `edit` | 수정 |
| `favorite` | 좋아요 (solid) |
| `favorite-border` | 좋아요 (outline) |
| `share` | 공유 |
| `more-vert` | 더보기 (세로) |
| `more-horiz` | 더보기 (가로) |
| `close` | 닫기 |
| `arrow-back` | 뒤로 |
| `check` | 체크 |

### Ionicons (iOS/Android 스타일)

| 이름 | iOS | Android |
|------|-----|---------|
| 홈 | `home-outline` | `home-outline` |
| 검색 | `search-outline` | `search-outline` |
| 알림 | `notifications-outline` | `notifications-outline` |
| 설정 | `settings-outline` | `settings-outline` |
| 사람 | `person-outline` | `person-outline` |
| 하트 | `heart-outline` | `heart-outline` |

### Feather

| 이름 | 용도 |
|------|------|
| `home` | 홈 |
| `search` | 검색 |
| `user` | 사용자 |
| `settings` | 설정 |
| `plus` | 추가 |
| `trash-2` | 삭제 |
| `edit-2` | 수정 |
| `heart` | 좋아요 |
| `share` | 공유 |
| `x` | 닫기 |
| `arrow-left` | 뒤로 |
| `check` | 체크 |
| `menu` | 메뉴 |

---

## 아이콘 검색

아이콘 이름을 찾으려면:

1. [oblador.github.io/react-native-vector-icons](https://oblador.github.io/react-native-vector-icons/) - 전체 아이콘 브라우저
2. [materialdesignicons.com](https://materialdesignicons.com/) - Material Community Icons
3. [icons.expo.fyi](https://icons.expo.fyi/) - Expo 아이콘 브라우저

---

## 참고 자료

- [GitHub 저장소](https://github.com/oblador/react-native-vector-icons)
- [아이콘 디렉토리](https://oblador.github.io/react-native-vector-icons/)
- [Expo Vector Icons](https://docs.expo.dev/guides/icons/)

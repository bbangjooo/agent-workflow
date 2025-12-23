# Build Errors 패턴 및 해결책

빌드 과정에서 발생하는 일반적인 에러 패턴과 해결 방법입니다.

---

## Module not found

### 에러 메시지 패턴

```
Module not found: Can't resolve '{module}' in '{path}'
Error: Cannot find module '{module}'
```

### 원인별 해결책

#### 1. 상대 경로 오류

**에러:**
```
Module not found: Can't resolve './components/Button'
```

**원인:** 파일 경로가 잘못되었거나 파일이 존재하지 않음

**해결:**
```typescript
// 변경 전
import Button from './components/Button'

// 해결책 1: 올바른 경로 확인
import Button from '../components/Button'

// 해결책 2: 파일 확장자 명시 (필요한 경우)
import Button from './components/Button.tsx'
```

**확인 사항:**
- [ ] 파일이 실제로 존재하는지 확인
- [ ] 대소문자 정확히 일치하는지 확인 (macOS/Windows 차이)
- [ ] 파일 확장자가 올바른지 확인

---

#### 2. Path Alias 오류 (@ 경로)

**에러:**
```
Module not found: Can't resolve '@/components/Button'
```

**원인:** tsconfig.json의 paths 설정이 없거나 잘못됨

**해결:**

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Next.js의 경우 추가 설정 불필요** (자동 지원)

**Vite의 경우 vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

#### 3. 패키지 미설치

**에러:**
```
Module not found: Can't resolve 'axios'
```

**원인:** npm 패키지가 설치되지 않음

**해결:**
```bash
# npm
npm install axios

# pnpm
pnpm add axios

# yarn
yarn add axios
```

**타입 정의가 필요한 경우:**
```bash
npm install -D @types/axios
```

---

#### 4. node_modules 손상

**에러:**
```
Module not found: Can't resolve 'react'
Error: Cannot find module 'next'
```

**원인:** node_modules가 손상되었거나 불완전함

**해결:**
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
rm -rf .next  # Next.js의 경우
npm install
```

---

## SyntaxError

### 에러 메시지 패턴

```
SyntaxError: Unexpected token '{token}'
Parsing error: Unexpected token
```

### 원인별 해결책

#### 1. JSX 문법 오류

**에러:**
```
SyntaxError: Unexpected token '<'
```

**원인:** JSX를 사용하는 파일의 확장자가 .js임

**해결:**
- 파일 확장자를 `.jsx` 또는 `.tsx`로 변경
- 또는 babel 설정에 JSX 지원 추가

---

#### 2. 괄호/중괄호 불일치

**에러:**
```
SyntaxError: Unexpected token ')'
```

**원인:** 괄호가 제대로 닫히지 않음

**해결:**
```typescript
// 변경 전 (괄호 누락)
const result = items.map((item => item.name)

// 변경 후
const result = items.map((item) => item.name)
```

---

#### 3. export/import 문법 오류

**에러:**
```
SyntaxError: Cannot use import statement outside a module
```

**원인:** CommonJS 환경에서 ES Module 문법 사용

**해결:**

**package.json에 type 추가:**
```json
{
  "type": "module"
}
```

**또는 확장자를 .mjs로 변경**

---

## TypeScript 컴파일 에러

### 에러 메시지 패턴

```
error TS{code}: {message}
```

### 일반적인 해결책

#### TS2307: Cannot find module

**에러:**
```
error TS2307: Cannot find module '@/lib/utils'
```

**해결:** tsconfig.json paths 설정 확인 (위 참조)

---

#### TS2345: Argument type mismatch

**에러:**
```
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'
```

**해결:**
```typescript
// 변경 전
const result = calculate("123")

// 변경 후 - 타입 변환
const result = calculate(Number("123"))
// 또는
const result = calculate(parseInt("123", 10))
```

---

## 환경별 빌드 에러

### Next.js 특유 에러

#### 서버/클라이언트 불일치

**에러:**
```
Error: Text content does not match server-rendered HTML
Hydration failed because the initial UI does not match
```

**해결:**
```typescript
// 클라이언트 전용 코드는 useEffect 내에서 실행
useEffect(() => {
  // window, localStorage 등 브라우저 API 사용
}, [])

// 또는 dynamic import 사용
const ClientComponent = dynamic(() => import('./ClientComponent'), {
  ssr: false
})
```

---

### Vite 특유 에러

#### 환경 변수 접근

**에러:**
```
process is not defined
```

**해결:**
```typescript
// 변경 전 (CRA 스타일)
process.env.REACT_APP_API_URL

// 변경 후 (Vite 스타일)
import.meta.env.VITE_API_URL
```

---

## 빠른 진단 체크리스트

에러 발생 시 순서대로 확인:

1. [ ] 에러 메시지에 표시된 파일/경로가 실제로 존재하는가?
2. [ ] 대소문자가 정확히 일치하는가?
3. [ ] 필요한 패키지가 모두 설치되어 있는가? (`npm install`)
4. [ ] node_modules를 삭제 후 재설치해봤는가?
5. [ ] tsconfig.json / vite.config.ts 설정이 올바른가?
6. [ ] 파일 확장자가 적절한가? (.js vs .jsx vs .ts vs .tsx)

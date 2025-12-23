# TypeScript Type Errors 패턴 및 해결책

TypeScript 컴파일 시 발생하는 일반적인 타입 에러 패턴과 해결 방법입니다.

---

## TS2322: Type is not assignable

### 기본 타입 불일치

**에러:**
```
Type 'string' is not assignable to type 'number'.
```

**해결:**
```typescript
// 변경 전
const age: number = "25"

// 해결책 1: 올바른 타입 값 사용
const age: number = 25

// 해결책 2: 타입 변환
const age: number = Number("25")
const age: number = parseInt("25", 10)
```

---

### 객체 타입 불일치

**에러:**
```
Type '{ name: string; }' is not assignable to type 'User'.
  Property 'email' is missing in type '{ name: string; }' but required in type 'User'.
```

**해결:**
```typescript
interface User {
  name: string
  email: string
}

// 변경 전
const user: User = { name: "John" }  // email 누락

// 해결책 1: 누락된 속성 추가
const user: User = { name: "John", email: "john@example.com" }

// 해결책 2: 선택적 속성으로 변경 (타입 정의 수정 가능한 경우)
interface User {
  name: string
  email?: string  // 선택적
}
```

---

## TS2339: Property does not exist

### 객체에 존재하지 않는 속성

**에러:**
```
Property 'foo' does not exist on type '{ bar: string; }'.
```

**해결:**
```typescript
// 변경 전
const obj = { bar: "value" }
console.log(obj.foo)  // 에러

// 해결책 1: 올바른 속성명 사용
console.log(obj.bar)

// 해결책 2: 타입에 속성 추가
interface MyObj {
  bar: string
  foo?: string
}
const obj: MyObj = { bar: "value" }

// 해결책 3: 인덱스 시그니처 사용 (동적 키)
interface MyObj {
  bar: string
  [key: string]: string | undefined
}
```

---

### DOM 요소 타입 문제

**에러:**
```
Property 'value' does not exist on type 'HTMLElement'.
```

**해결:**
```typescript
// 변경 전
const input = document.getElementById('input')
console.log(input.value)  // 에러

// 해결책 1: 타입 단언
const input = document.getElementById('input') as HTMLInputElement
console.log(input.value)

// 해결책 2: 타입 가드
const input = document.getElementById('input')
if (input instanceof HTMLInputElement) {
  console.log(input.value)
}
```

---

## TS2345: Argument type mismatch

### 함수 인자 타입 불일치

**에러:**
```
Argument of type 'string' is not assignable to parameter of type 'number'.
```

**해결:**
```typescript
function calculate(value: number): number {
  return value * 2
}

// 변경 전
calculate("10")  // 에러

// 해결책 1: 올바른 타입의 인자 전달
calculate(10)

// 해결책 2: 타입 변환
calculate(Number("10"))
```

---

### 콜백 함수 타입 불일치

**에러:**
```
Argument of type '(item: string) => void' is not assignable to parameter of type '(item: User) => void'.
```

**해결:**
```typescript
interface User {
  name: string
}

// 변경 전
users.forEach((item: string) => {  // 에러
  console.log(item)
})

// 변경 후
users.forEach((item: User) => {
  console.log(item.name)
})
```

---

## TS2531/TS2532: Possibly undefined/null

### Object is possibly undefined

**에러:**
```
Object is possibly 'undefined'.
Object is possibly 'null'.
```

**해결:**
```typescript
interface User {
  profile?: {
    name: string
  }
}

const user: User = {}

// 변경 전
console.log(user.profile.name)  // 에러

// 해결책 1: Optional chaining
console.log(user.profile?.name)

// 해결책 2: 조건부 체크
if (user.profile) {
  console.log(user.profile.name)
}

// 해결책 3: Non-null assertion (확실할 때만!)
console.log(user.profile!.name)

// 해결책 4: 기본값 제공
console.log(user.profile?.name ?? 'Anonymous')
```

---

## TS7006: Parameter implicitly has 'any' type

### 암시적 any 타입

**에러:**
```
Parameter 'item' implicitly has an 'any' type.
```

**해결:**
```typescript
// 변경 전
function process(item) {  // 에러 (strict 모드)
  return item
}

// 해결책 1: 타입 명시
function process(item: string): string {
  return item
}

// 해결책 2: 제네릭 사용
function process<T>(item: T): T {
  return item
}
```

---

## TS2307: Cannot find module

### 모듈/타입 정의 없음

**에러:**
```
Cannot find module 'lodash' or its corresponding type declarations.
```

**해결:**
```bash
# 타입 정의 설치
npm install -D @types/lodash

# 타입이 없는 패키지의 경우 declarations.d.ts 생성
```

```typescript
// declarations.d.ts
declare module 'some-untyped-module'
```

---

## TS2304: Cannot find name

### 전역 타입 인식 불가

**에러:**
```
Cannot find name 'window'.
Cannot find name 'document'.
```

**해결:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"]
  }
}
```

---

## React/Next.js 특유 타입 에러

### JSX 요소 타입

**에러:**
```
'Component' cannot be used as a JSX component.
Its return type 'Element | undefined' is not a valid JSX element.
```

**해결:**
```typescript
// 변경 전
function Component() {
  if (condition) {
    return <div>Content</div>
  }
  // undefined 반환 가능
}

// 변경 후
function Component() {
  if (condition) {
    return <div>Content</div>
  }
  return null  // 명시적 null 반환
}
```

---

### Event Handler 타입

**에러:**
```
Type '(e: any) => void' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'.
```

**해결:**
```typescript
// 변경 전
const handleClick = (e: any) => {
  console.log(e.target)
}

// 변경 후
import { MouseEvent } from 'react'

const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
  console.log(e.target)
}

// 또는 폼 이벤트
import { FormEvent } from 'react'

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}
```

---

### Props 타입

**에러:**
```
Property 'title' is missing in type '{}' but required in type 'Props'.
```

**해결:**
```typescript
interface Props {
  title: string
  description?: string  // 선택적 props
}

// 컴포넌트 정의
function Card({ title, description }: Props) {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  )
}

// 사용
<Card title="Hello" />  // OK, description은 선택적
```

---

## 빠른 해결 전략

1. **타입 좁히기 (Type Narrowing)**
   - `if`, `typeof`, `instanceof` 사용

2. **Optional Chaining (?.)과 Nullish Coalescing (??)**
   - undefined/null 안전하게 처리

3. **타입 단언 (Type Assertion)**
   - `as Type` - 확실할 때만 사용

4. **타입 가드 (Type Guard)**
   - 커스텀 함수로 타입 좁히기

5. **제네릭 (Generics)**
   - 유연하면서 타입 안전한 코드

---

## 빠른 진단 체크리스트

1. [ ] 변수/인자의 타입이 명시되어 있는가?
2. [ ] null/undefined가 될 수 있는 값을 안전하게 처리했는가?
3. [ ] 외부 라이브러리의 타입 정의가 설치되어 있는가?
4. [ ] tsconfig.json의 설정이 올바른가?
5. [ ] 타입 정의와 실제 값이 일치하는가?

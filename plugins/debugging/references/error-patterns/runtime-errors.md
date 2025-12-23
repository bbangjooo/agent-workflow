# Runtime Errors 패턴 및 해결책

애플리케이션 실행 중 발생하는 일반적인 런타임 에러 패턴과 해결 방법입니다.

---

## TypeError

### Cannot read properties of undefined/null

**에러 메시지 패턴:**
```
TypeError: Cannot read properties of undefined (reading '{property}')
TypeError: Cannot read property '{property}' of null
```

#### 원인 1: 객체 접근 전 undefined 체크 누락

**에러:**
```
TypeError: Cannot read properties of undefined (reading 'name')
```

**해결:**
```typescript
// 변경 전
const userName = user.name

// 해결책 1: Optional chaining
const userName = user?.name

// 해결책 2: 조건부 접근
const userName = user ? user.name : undefined

// 해결책 3: 기본값 제공
const userName = user?.name ?? 'Guest'
```

---

#### 원인 2: 비동기 데이터 로딩 전 접근

**에러:**
```
TypeError: Cannot read properties of undefined (reading 'map')
```

**해결:**
```typescript
// 변경 전
return (
  <ul>
    {data.items.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)

// 해결책 1: 로딩 상태 처리
if (!data) return <div>Loading...</div>
return (
  <ul>
    {data.items.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)

// 해결책 2: 기본값과 optional chaining
return (
  <ul>
    {data?.items?.map(item => <li key={item.id}>{item.name}</li>) ?? []}
  </ul>
)
```

---

#### 원인 3: 배열 메서드에 null/undefined 전달

**에러:**
```
TypeError: Cannot read properties of null (reading 'filter')
```

**해결:**
```typescript
// 변경 전
const filtered = items.filter(item => item.active)

// 변경 후
const filtered = (items ?? []).filter(item => item.active)
// 또는
const filtered = items?.filter(item => item.active) ?? []
```

---

## ReferenceError

### is not defined

**에러 메시지 패턴:**
```
ReferenceError: {variable} is not defined
```

#### 원인 1: 변수 선언 전 사용

**에러:**
```
ReferenceError: myVariable is not defined
```

**해결:**
```typescript
// 변경 전
console.log(myVariable)
const myVariable = 'value'

// 변경 후
const myVariable = 'value'
console.log(myVariable)
```

---

#### 원인 2: 브라우저 전용 객체를 서버에서 접근

**에러:**
```
ReferenceError: window is not defined
ReferenceError: document is not defined
ReferenceError: localStorage is not defined
```

**해결 (Next.js/SSR 환경):**
```typescript
// 해결책 1: typeof 체크
if (typeof window !== 'undefined') {
  // 브라우저에서만 실행되는 코드
  localStorage.setItem('key', 'value')
}

// 해결책 2: useEffect 내에서 실행
useEffect(() => {
  // 클라이언트에서만 실행
  const value = localStorage.getItem('key')
}, [])

// 해결책 3: dynamic import with ssr: false
import dynamic from 'next/dynamic'
const ClientComponent = dynamic(() => import('./ClientComponent'), {
  ssr: false
})
```

---

## 비동기 관련 에러

### Unhandled Promise Rejection

**에러 메시지 패턴:**
```
Unhandled Promise Rejection: {Error}
(in promise) TypeError: ...
```

#### 해결책

```typescript
// 변경 전 - 에러 처리 없음
async function fetchData() {
  const response = await fetch('/api/data')
  const data = await response.json()
  return data
}

// 변경 후 - try-catch 추가
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw error  // 또는 기본값 반환
  }
}
```

---

### State Update on Unmounted Component

**에러 메시지:**
```
Warning: Can't perform a React state update on an unmounted component
```

**해결:**
```typescript
// 변경 전
useEffect(() => {
  fetchData().then(data => {
    setData(data)
  })
}, [])

// 변경 후 - cleanup 함수 사용
useEffect(() => {
  let isMounted = true

  fetchData().then(data => {
    if (isMounted) {
      setData(data)
    }
  })

  return () => {
    isMounted = false
  }
}, [])

// 또는 AbortController 사용
useEffect(() => {
  const controller = new AbortController()

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== 'AbortError') {
        console.error(err)
      }
    })

  return () => controller.abort()
}, [])
```

---

## React 특유 런타임 에러

### Invalid Hook Call

**에러:**
```
Invalid hook call. Hooks can only be called inside of the body of a function component.
```

**원인:**
1. 조건문/반복문 안에서 Hook 호출
2. 일반 함수에서 Hook 호출
3. React 버전 불일치

**해결:**
```typescript
// 잘못된 사용 1: 조건문 안
function MyComponent() {
  if (condition) {
    const [state, setState] = useState(0)  // 에러!
  }
}

// 올바른 사용
function MyComponent() {
  const [state, setState] = useState(0)  // 항상 최상위에서 호출

  if (condition) {
    // state 사용
  }
}

// 잘못된 사용 2: 일반 함수에서
function normalFunction() {
  const [state, setState] = useState(0)  // 에러!
}

// 올바른 사용: 커스텀 Hook으로 만들기
function useCustomHook() {
  const [state, setState] = useState(0)
  return { state, setState }
}
```

---

### Too many re-renders

**에러:**
```
Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
```

**원인:** 렌더링 중 상태 업데이트 호출

**해결:**
```typescript
// 잘못된 사용
function MyComponent() {
  const [count, setCount] = useState(0)
  setCount(count + 1)  // 렌더링 중 호출 - 무한 루프!

  return <div>{count}</div>
}

// 올바른 사용 1: 이벤트 핸들러에서 호출
function MyComponent() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}

// 올바른 사용 2: useEffect에서 호출
function MyComponent() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 조건부로 업데이트
    if (someCondition) {
      setCount(prev => prev + 1)
    }
  }, [someCondition])

  return <div>{count}</div>
}
```

---

## 빠른 진단 체크리스트

런타임 에러 발생 시 확인:

1. [ ] 에러가 발생한 정확한 줄 번호 확인
2. [ ] undefined/null이 될 수 있는 값에 접근하고 있는가?
3. [ ] 비동기 데이터 로딩 전 접근하고 있는가?
4. [ ] 브라우저 전용 API를 서버에서 사용하고 있는가?
5. [ ] React Hook 사용 규칙을 따르고 있는가?
6. [ ] 무한 루프를 유발할 수 있는 상태 업데이트가 있는가?

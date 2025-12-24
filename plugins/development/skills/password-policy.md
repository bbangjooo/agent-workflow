# Password Policy

회원가입 시 비밀번호 정책 설정 및 검증 구현

> **역할: Full-stack (Backend + Frontend)**
> - Backend: 서버 사이드 비밀번호 검증, Supabase Auth 설정
> - Frontend: 실시간 비밀번호 강도 표시, 클라이언트 검증

## 설명

사용자 계정 생성 시 안전한 비밀번호 정책을 적용하는 스킬입니다. 비밀번호 최소 요구사항, 강도 검증, 사용자 피드백 UI를 구현합니다.

## 트리거

- Step 3.8 (Auth Implementation) 진행 중 회원가입 구현 시 활용
- `auth-impl` 스킬과 함께 사용

## 입력

- `outputs/stage-3/tech-stack.md`
- `outputs/stage-2/design-spec.md` (보안 요구사항)

---

# 비밀번호 정책 정의

## 기본 정책 (MVP 권장)

| 항목 | 요구사항 | 설명 |
|------|----------|------|
| 최소 길이 | 8자 이상 | OWASP 권장 최소값 |
| 최대 길이 | 128자 이하 | DoS 방지 |
| 대문자 | 1개 이상 | 강도 향상 |
| 소문자 | 1개 이상 | 강도 향상 |
| 숫자 | 1개 이상 | 강도 향상 |
| 특수문자 | 선택사항 | MVP에서는 선택 |

## 강화 정책 (프로덕션 권장)

| 항목 | 요구사항 | 설명 |
|------|----------|------|
| 최소 길이 | 12자 이상 | NIST 권장 |
| 특수문자 | 1개 이상 | `!@#$%^&*(),.?":{}|<>` |
| 연속 문자 금지 | 3자 이상 | `aaa`, `111` 금지 |
| 일반 패턴 금지 | password, 123456 등 | 취약 비밀번호 차단 |
| 이메일 포함 금지 | 이메일 일부 포함 불가 | 예측 가능성 감소 |

---

# Backend 구현

## [Backend] 비밀번호 검증 유틸리티

```typescript
// src/lib/auth/password-policy.ts

export interface PasswordPolicy {
  minLength: number
  maxLength: number
  requireUppercase: boolean
  requireLowercase: boolean
  requireNumbers: boolean
  requireSpecialChars: boolean
  forbidCommonPasswords: boolean
  forbidSequentialChars: boolean
}

export const DEFAULT_PASSWORD_POLICY: PasswordPolicy = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false, // MVP에서는 선택
  forbidCommonPasswords: true,
  forbidSequentialChars: false, // MVP에서는 선택
}

export const STRONG_PASSWORD_POLICY: PasswordPolicy = {
  minLength: 12,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  forbidCommonPasswords: true,
  forbidSequentialChars: true,
}

// 일반적인 취약 비밀번호 목록
const COMMON_PASSWORDS = [
  'password', 'password1', 'password123',
  '123456', '12345678', '123456789',
  'qwerty', 'qwerty123',
  'admin', 'admin123',
  'letmein', 'welcome',
  'monkey', 'dragon',
  'master', 'login',
]

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  strength: 'weak' | 'medium' | 'strong'
  score: number // 0-100
}

export function validatePassword(
  password: string,
  policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY,
  email?: string
): ValidationResult {
  const errors: string[] = []
  let score = 0

  // 길이 검사
  if (password.length < policy.minLength) {
    errors.push(`비밀번호는 최소 ${policy.minLength}자 이상이어야 합니다`)
  } else {
    score += 20
  }

  if (password.length > policy.maxLength) {
    errors.push(`비밀번호는 ${policy.maxLength}자를 초과할 수 없습니다`)
  }

  // 대문자 검사
  if (policy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('대문자를 1개 이상 포함해야 합니다')
  } else if (/[A-Z]/.test(password)) {
    score += 15
  }

  // 소문자 검사
  if (policy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('소문자를 1개 이상 포함해야 합니다')
  } else if (/[a-z]/.test(password)) {
    score += 15
  }

  // 숫자 검사
  if (policy.requireNumbers && !/[0-9]/.test(password)) {
    errors.push('숫자를 1개 이상 포함해야 합니다')
  } else if (/[0-9]/.test(password)) {
    score += 15
  }

  // 특수문자 검사
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
  if (policy.requireSpecialChars && !specialCharRegex.test(password)) {
    errors.push('특수문자를 1개 이상 포함해야 합니다')
  } else if (specialCharRegex.test(password)) {
    score += 20
  }

  // 일반 비밀번호 검사
  if (policy.forbidCommonPasswords) {
    const lowerPassword = password.toLowerCase()
    if (COMMON_PASSWORDS.some(common => lowerPassword.includes(common))) {
      errors.push('너무 일반적인 비밀번호입니다')
      score = Math.max(0, score - 30)
    }
  }

  // 연속 문자 검사 (aaa, 111 등)
  if (policy.forbidSequentialChars && /(.)\1{2,}/.test(password)) {
    errors.push('같은 문자를 3번 이상 연속 사용할 수 없습니다')
    score = Math.max(0, score - 15)
  }

  // 이메일 포함 검사
  if (email) {
    const emailPrefix = email.split('@')[0].toLowerCase()
    if (emailPrefix.length >= 3 && password.toLowerCase().includes(emailPrefix)) {
      errors.push('비밀번호에 이메일 주소를 포함할 수 없습니다')
      score = Math.max(0, score - 20)
    }
  }

  // 추가 길이 보너스
  if (password.length >= 12) score += 10
  if (password.length >= 16) score += 5

  // 점수 제한
  score = Math.min(100, Math.max(0, score))

  // 강도 계산
  let strength: 'weak' | 'medium' | 'strong'
  if (score < 40) {
    strength = 'weak'
  } else if (score < 70) {
    strength = 'medium'
  } else {
    strength = 'strong'
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength,
    score,
  }
}
```

## [Backend] Server Action에 검증 적용

```typescript
// src/lib/auth/actions.ts 수정
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { validatePassword, DEFAULT_PASSWORD_POLICY } from './password-policy'

export async function signUp(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  // 비밀번호 정책 검증
  const validation = validatePassword(password, DEFAULT_PASSWORD_POLICY, email)

  if (!validation.isValid) {
    return {
      error: validation.errors[0], // 첫 번째 에러만 반환
      errors: validation.errors    // 전체 에러 목록
    }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/login?message=이메일을 확인해주세요')
}
```

## [Backend] Supabase Auth 설정 (선택)

Supabase Dashboard에서 추가적인 비밀번호 정책을 설정할 수 있습니다:

```
Dashboard > Authentication > Policies
- Minimum password length: 8
- Password requirements: 커스텀 설정 불가 (코드에서 처리)
```

---

# Frontend 구현

## [Frontend] 비밀번호 강도 표시 컴포넌트

```typescript
// src/components/auth/PasswordStrengthIndicator.tsx
'use client'

import { useMemo } from 'react'
import { validatePassword, DEFAULT_PASSWORD_POLICY } from '@/lib/auth/password-policy'

interface Props {
  password: string
  email?: string
}

export function PasswordStrengthIndicator({ password, email }: Props) {
  const validation = useMemo(
    () => validatePassword(password, DEFAULT_PASSWORD_POLICY, email),
    [password, email]
  )

  if (!password) return null

  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  }

  const strengthLabels = {
    weak: '약함',
    medium: '보통',
    strong: '강함',
  }

  return (
    <div className="mt-2 space-y-2">
      {/* 강도 바 */}
      <div className="flex gap-1">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors ${
              validation.score > index * 33
                ? strengthColors[validation.strength]
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* 강도 텍스트 */}
      <div className="flex justify-between text-xs">
        <span className={`font-medium ${
          validation.strength === 'weak' ? 'text-red-600' :
          validation.strength === 'medium' ? 'text-yellow-600' :
          'text-green-600'
        }`}>
          비밀번호 강도: {strengthLabels[validation.strength]}
        </span>
        <span className="text-gray-500">{validation.score}점</span>
      </div>

      {/* 에러 메시지 */}
      {validation.errors.length > 0 && (
        <ul className="text-xs text-red-600 space-y-1">
          {validation.errors.map((error, index) => (
            <li key={index}>• {error}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

## [Frontend] 비밀번호 요구사항 체크리스트

```typescript
// src/components/auth/PasswordRequirements.tsx
'use client'

import { useMemo } from 'react'
import { CheckCircle, XCircle } from 'lucide-react' // 또는 원하는 아이콘

interface Props {
  password: string
}

export function PasswordRequirements({ password }: Props) {
  const requirements = useMemo(() => [
    { label: '8자 이상', met: password.length >= 8 },
    { label: '대문자 포함', met: /[A-Z]/.test(password) },
    { label: '소문자 포함', met: /[a-z]/.test(password) },
    { label: '숫자 포함', met: /[0-9]/.test(password) },
  ], [password])

  if (!password) return null

  return (
    <div className="mt-2 space-y-1">
      <p className="text-xs font-medium text-gray-600">비밀번호 요구사항:</p>
      <ul className="text-xs space-y-1">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center gap-1">
            {req.met ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <XCircle className="h-3 w-3 text-gray-300" />
            )}
            <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## [Frontend] 회원가입 폼에 적용

```typescript
// src/app/(auth)/signup/page.tsx
'use client'

import { useState } from 'react'
import { signUp } from '@/lib/auth/actions'
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator'
import { PasswordRequirements } from '@/components/auth/PasswordRequirements'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await signUp(formData)
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <h1 className="text-2xl font-bold text-center">회원가입</h1>

        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border p-2"
            />

            {/* 비밀번호 강도 표시 */}
            <PasswordStrengthIndicator password={password} email={email} />

            {/* 또는 요구사항 체크리스트 */}
            {/* <PasswordRequirements password={password} /> */}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary py-2 text-white"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}
```

---

## 질문 가이드

1. **정책 수준**
   - "MVP 수준의 기본 정책을 적용할까요, 아니면 강화된 정책이 필요한가요?"
   - "특수문자를 필수로 요구할까요?"

2. **사용자 경험**
   - "비밀번호 강도 바를 표시할까요?"
   - "요구사항 체크리스트를 실시간으로 보여줄까요?"

3. **추가 보안**
   - "이전 비밀번호 재사용을 금지할까요?" (DB 저장 필요)
   - "비밀번호 만료 정책이 필요한가요?"

## 대화 원칙

- 보안과 사용성의 균형 설명
- MVP에서는 기본 정책으로 시작 권장
- 과도한 복잡성은 사용자 이탈 유발 가능성 안내
- 추후 정책 강화 가능함을 안내

---

## 산출물

`auth-impl.md`에 비밀번호 정책 섹션 추가

```markdown
## 비밀번호 정책

### 적용된 정책

| 항목 | 요구사항 |
|------|----------|
| 최소 길이 | 8자 |
| 최대 길이 | 128자 |
| 대문자 | 필수 |
| 소문자 | 필수 |
| 숫자 | 필수 |
| 특수문자 | 선택 |

### 구현된 파일

| 파일 | 설명 |
|------|------|
| src/lib/auth/password-policy.ts | 검증 로직 |
| src/components/auth/PasswordStrengthIndicator.tsx | 강도 표시 UI |
| src/components/auth/PasswordRequirements.tsx | 요구사항 체크리스트 |
```

## 완료 조건

- [Backend] 비밀번호 검증 유틸리티 구현 완료
- [Backend] Server Action에 검증 적용 완료
- [Frontend] 비밀번호 강도 표시 컴포넌트 구현 완료
- [Frontend] 회원가입 폼에 적용 완료
- 모든 정책 요구사항 테스트 통과

## 참조

- `skills/auth-impl.md`: 인증 구현 메인 스킬
- `references/checklists/security-checklist.md`: 보안 체크리스트

# External API Integration Patterns

외부 API를 연결할 때 사용하는 공통 개발 패턴 모음입니다.

## 1. API Client 설정 패턴

### 1.1 Singleton Client

하나의 클라이언트 인스턴스를 재사용합니다. SDK 기반 API에 적합합니다.

```typescript
// src/lib/external/stripe.ts
import Stripe from 'stripe'

let stripeClient: Stripe | null = null

export function getStripeClient(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
    })
  }
  return stripeClient
}
```

### 1.2 Wrapper/Adapter 패턴

외부 API를 내부 인터페이스로 감싸 교체 가능성과 테스트 용이성을 확보합니다.

```typescript
// src/lib/external/email/types.ts
export interface EmailProvider {
  send(to: string, subject: string, html: string): Promise<{ id: string }>
}

// src/lib/external/email/resend.ts
import { Resend } from 'resend'
import { EmailProvider } from './types'

export class ResendProvider implements EmailProvider {
  private client: Resend

  constructor() {
    this.client = new Resend(process.env.RESEND_API_KEY!)
  }

  async send(to: string, subject: string, html: string) {
    const { data, error } = await this.client.emails.send({
      from: 'noreply@example.com',
      to,
      subject,
      html,
    })

    if (error) throw new Error(error.message)
    return { id: data!.id }
  }
}

// src/lib/external/email/index.ts
import { EmailProvider } from './types'
import { ResendProvider } from './resend'

// 다른 Provider로 쉽게 교체 가능
export const emailProvider: EmailProvider = new ResendProvider()
```

### 1.3 환경 변수 관리

```typescript
// src/lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
})

// 앱 시작 시 환경 변수 검증
export const env = envSchema.parse(process.env)
```

---

## 2. 호출 패턴

### 2.1 Repository 패턴

외부 API 호출을 데이터 접근 계층으로 추상화합니다.

```typescript
// src/repositories/payment.repository.ts
import { getStripeClient } from '@/lib/external/stripe'

export interface PaymentIntent {
  id: string
  amount: number
  status: 'pending' | 'succeeded' | 'failed'
}

export const paymentRepository = {
  async createIntent(amount: number, currency: string): Promise<PaymentIntent> {
    const stripe = getStripeClient()
    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
    })

    return {
      id: intent.id,
      amount: intent.amount,
      status: intent.status === 'succeeded' ? 'succeeded' : 'pending',
    }
  },

  async getIntent(id: string): Promise<PaymentIntent | null> {
    const stripe = getStripeClient()
    try {
      const intent = await stripe.paymentIntents.retrieve(id)
      return {
        id: intent.id,
        amount: intent.amount,
        status: intent.status === 'succeeded' ? 'succeeded' : 'pending',
      }
    } catch {
      return null
    }
  },
}
```

### 2.2 Gateway 패턴

여러 외부 API를 하나의 인터페이스로 조합합니다.

```typescript
// src/lib/gateways/notification.gateway.ts
import { emailProvider } from '@/lib/external/email'
import { smsProvider } from '@/lib/external/sms'
import { pushProvider } from '@/lib/external/push'

export const notificationGateway = {
  async notifyUser(
    userId: string,
    message: { title: string; body: string },
    channels: ('email' | 'sms' | 'push')[]
  ) {
    const user = await getUserById(userId)
    const results = []

    if (channels.includes('email') && user.email) {
      results.push(
        emailProvider.send(user.email, message.title, message.body)
      )
    }

    if (channels.includes('sms') && user.phone) {
      results.push(
        smsProvider.send(user.phone, `${message.title}: ${message.body}`)
      )
    }

    if (channels.includes('push') && user.pushToken) {
      results.push(
        pushProvider.send(user.pushToken, message.title, message.body)
      )
    }

    return Promise.allSettled(results)
  },
}
```

---

## 3. 비동기 처리 패턴

### 3.1 Queue 기반 처리

시간이 오래 걸리는 외부 API 호출을 백그라운드에서 처리합니다.

```typescript
// src/lib/queue/email.queue.ts (Inngest 예시)
import { inngest } from '@/lib/inngest'
import { emailProvider } from '@/lib/external/email'

export const sendEmail = inngest.createFunction(
  { id: 'send-email' },
  { event: 'email/send' },
  async ({ event }) => {
    const { to, subject, html } = event.data

    await emailProvider.send(to, subject, html)

    return { success: true }
  }
)

// 사용
import { inngest } from '@/lib/inngest'

await inngest.send({
  name: 'email/send',
  data: {
    to: 'user@example.com',
    subject: '환영합니다',
    html: '<h1>가입을 축하합니다!</h1>',
  },
})
```

### 3.2 Webhook 수신 패턴

외부 서비스로부터 이벤트를 수신합니다.

```typescript
// src/app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripeClient } from '@/lib/external/stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')!

  const stripe = getStripeClient()

  // 1. 서명 검증 (필수)
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // 2. 이벤트 처리
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      await handlePaymentSuccess(paymentIntent)
      break

    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object as Stripe.PaymentIntent
      await handlePaymentFailure(failedIntent)
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  // 3. 빠른 응답 (처리는 비동기로)
  return NextResponse.json({ received: true })
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  // 주문 상태 업데이트, 이메일 발송 등
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  // 실패 처리, 사용자 알림 등
}
```

### 3.3 Polling 패턴

웹훅을 지원하지 않는 API의 상태를 주기적으로 확인합니다.

```typescript
// src/lib/jobs/check-export-status.ts
import { inngest } from '@/lib/inngest'

export const checkExportStatus = inngest.createFunction(
  { id: 'check-export-status' },
  { event: 'export/check-status' },
  async ({ event, step }) => {
    const { exportId } = event.data

    // 최대 10번 재시도
    for (let i = 0; i < 10; i++) {
      const status = await step.run(`check-${i}`, async () => {
        const response = await fetch(`https://api.example.com/exports/${exportId}`)
        return response.json()
      })

      if (status.state === 'completed') {
        return { success: true, url: status.downloadUrl }
      }

      if (status.state === 'failed') {
        throw new Error('Export failed')
      }

      // 지수 백오프로 대기
      await step.sleep(`wait-${i}`, `${Math.pow(2, i)}s`)
    }

    throw new Error('Export timed out')
  }
)
```

---

## 4. 에러 처리 패턴

### 4.1 Retry with Exponential Backoff

일시적 실패에 대해 지수 백오프로 재시도합니다.

```typescript
// src/lib/utils/retry.ts
interface RetryOptions {
  maxRetries?: number
  initialDelayMs?: number
  maxDelayMs?: number
  shouldRetry?: (error: unknown) => boolean
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelayMs = 1000,
    maxDelayMs = 30000,
    shouldRetry = isRetryableError,
  } = options

  let lastError: unknown

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      if (attempt === maxRetries || !shouldRetry(error)) {
        throw error
      }

      const delay = Math.min(
        initialDelayMs * Math.pow(2, attempt),
        maxDelayMs
      )

      await sleep(delay)
    }
  }

  throw lastError
}

function isRetryableError(error: unknown): boolean {
  if (error instanceof Error) {
    // 네트워크 에러, 5xx 에러는 재시도
    if (error.message.includes('fetch failed')) return true
    if (error.message.includes('500')) return true
    if (error.message.includes('502')) return true
    if (error.message.includes('503')) return true
    if (error.message.includes('504')) return true
  }
  return false
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// 사용
const result = await withRetry(
  () => externalApi.createResource(data),
  { maxRetries: 3, initialDelayMs: 1000 }
)
```

### 4.2 Timeout 설정

모든 외부 호출에 타임아웃을 설정합니다.

```typescript
// src/lib/utils/fetch-with-timeout.ts
export async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response> {
  const { timeout = 10000, ...fetchOptions } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    })
    return response
  } finally {
    clearTimeout(timeoutId)
  }
}

// 사용
const response = await fetchWithTimeout('https://api.example.com/data', {
  timeout: 5000, // 5초
  method: 'POST',
  body: JSON.stringify(data),
})
```

### 4.3 Circuit Breaker

연속 실패 시 빠르게 실패하여 시스템을 보호합니다.

```typescript
// src/lib/utils/circuit-breaker.ts
type CircuitState = 'closed' | 'open' | 'half-open'

class CircuitBreaker {
  private state: CircuitState = 'closed'
  private failureCount = 0
  private lastFailureTime = 0
  private readonly threshold: number
  private readonly resetTimeoutMs: number

  constructor(threshold = 5, resetTimeoutMs = 30000) {
    this.threshold = threshold
    this.resetTimeoutMs = resetTimeoutMs
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.resetTimeoutMs) {
        this.state = 'half-open'
      } else {
        throw new Error('Circuit breaker is open')
      }
    }

    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess() {
    this.failureCount = 0
    this.state = 'closed'
  }

  private onFailure() {
    this.failureCount++
    this.lastFailureTime = Date.now()

    if (this.failureCount >= this.threshold) {
      this.state = 'open'
    }
  }
}

// 사용
const paymentCircuit = new CircuitBreaker(5, 30000)

try {
  const result = await paymentCircuit.execute(() =>
    stripeClient.paymentIntents.create({ amount: 1000, currency: 'usd' })
  )
} catch (error) {
  if (error.message === 'Circuit breaker is open') {
    // 대체 로직 또는 사용자에게 안내
  }
}
```

### 4.4 Idempotency (멱등성)

중복 요청이 안전하게 처리되도록 합니다.

```typescript
// src/app/api/payments/route.ts
import { createClient } from '@/lib/supabase/server'
import { getStripeClient } from '@/lib/external/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { orderId, amount } = await request.json()

  const supabase = createClient()

  // 1. 이미 처리된 주문인지 확인
  const { data: existingPayment } = await supabase
    .from('payments')
    .select('id, stripe_payment_intent_id')
    .eq('order_id', orderId)
    .single()

  if (existingPayment) {
    // 이미 처리됨 - 기존 결과 반환
    return NextResponse.json({
      paymentIntentId: existingPayment.stripe_payment_intent_id,
    })
  }

  // 2. Stripe에 Idempotency Key 전달
  const stripe = getStripeClient()
  const paymentIntent = await stripe.paymentIntents.create(
    { amount, currency: 'krw' },
    { idempotencyKey: `order_${orderId}` } // 같은 키로 재요청해도 같은 결과
  )

  // 3. 결과 저장
  await supabase.from('payments').insert({
    order_id: orderId,
    stripe_payment_intent_id: paymentIntent.id,
    amount,
  })

  return NextResponse.json({ paymentIntentId: paymentIntent.id })
}
```

---

## 5. 보안 패턴

### 5.1 서버 사이드 전용 호출

API 키가 노출되지 않도록 서버에서만 외부 API를 호출합니다.

```typescript
// src/app/api/ai/generate/route.ts (서버에서 호출)
import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 서버에서만 접근 가능
})

export async function POST(request: NextRequest) {
  const { prompt } = await request.json()

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  })

  return NextResponse.json({
    result: completion.choices[0].message.content,
  })
}
```

```typescript
// src/components/AiGenerator.tsx (클라이언트에서 내부 API 호출)
'use client'

async function generate(prompt: string) {
  // 외부 API 직접 호출 X
  // 내부 API를 통해 호출
  const response = await fetch('/api/ai/generate', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  })
  return response.json()
}
```

### 5.2 Webhook 서명 검증

외부에서 오는 웹훅 요청의 진위를 확인합니다.

```typescript
// src/lib/utils/verify-webhook.ts
import crypto from 'crypto'

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

// 사용 (일반적인 HMAC 서명 검증)
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('x-webhook-signature')!

  if (!verifyWebhookSignature(body, signature, process.env.WEBHOOK_SECRET!)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // 검증 완료, 안전하게 처리
  const data = JSON.parse(body)
  // ...
}
```

### 5.3 Rate Limit 대응

외부 API의 Rate Limit(429)에 대응합니다.

```typescript
// src/lib/utils/rate-limit-handler.ts
export async function handleRateLimit<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
      // Rate limit 에러인 경우
      if (error.status === 429 || error.code === 'rate_limit_exceeded') {
        const retryAfter = error.headers?.['retry-after'] || Math.pow(2, attempt + 1)
        console.log(`Rate limited. Retrying after ${retryAfter}s`)
        await sleep(retryAfter * 1000)
        continue
      }
      throw error
    }
  }
  throw new Error('Max retries exceeded due to rate limiting')
}

// 사용
const result = await handleRateLimit(() =>
  openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  })
)
```

---

## 6. 폴더 구조 권장

```
src/
├── lib/
│   ├── external/           # 외부 API 클라이언트
│   │   ├── stripe.ts
│   │   ├── openai.ts
│   │   └── email/
│   │       ├── types.ts
│   │       ├── resend.ts
│   │       └── index.ts
│   ├── gateways/           # 여러 API 조합
│   │   └── notification.gateway.ts
│   └── utils/
│       ├── retry.ts
│       ├── circuit-breaker.ts
│       └── fetch-with-timeout.ts
├── repositories/           # 데이터 접근 추상화
│   └── payment.repository.ts
└── app/
    └── api/
        └── webhooks/       # 웹훅 엔드포인트
            └── stripe/
                └── route.ts
```

---

## 7. MVP 권장 사항

1인 창업자 MVP에서는 다음을 권장합니다:

| 상황 | 권장 패턴 |
|------|----------|
| 단순 API 호출 | Singleton Client + Timeout |
| 결제 연동 | Webhook + Idempotency 필수 |
| 이메일 발송 | Queue 기반 (Inngest, Trigger.dev) |
| AI API 호출 | Rate Limit Handler + Retry |
| 여러 API 조합 | Wrapper 패턴으로 시작 |

> **MVP 팁**: 처음에는 단순하게 시작하고, 문제가 발생하면 Circuit Breaker나 Queue를 추가하세요.

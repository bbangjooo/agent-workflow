# svc-migration — 작업 기록 (status core)

> Paired with: `svc-migration-pipeline.md`
> 절별 디테일은 `svc-migration-status/` 하위 파일.
> *Fictional example* for the progress-guidance skill — all values illustrative.

---

## ▶ 0. 다음 세션 시작 지점

### 0.1 마지막 갱신
*날짜:* 2026-01-22
*요약:* dual-write 7일 shadow 검증 PASS. M2 백필 진입 직전. 정합성 cron 자동화 + rate-limit 정책이 백필 시작 조건.

### 0.2 현재 운영 상태 (확인 명령 포함)

```bash
kubectl get deploy svc-payments-v2 -n prod        # READY 3/3
curl -s svc-payments-v2/healthz | jq .            # status: ok, dual_write: enabled
psql payments_v2 -c "select count(*) from orders" # 0 (백필 미시작)
cat /var/log/migration/shadow-diff-summary.txt    # 7일 누적 0 mismatch
```

### 0.3 가장 먼저 할 일 (의사결정 트리)

- [ ] **단일 최우선:** 정합성 검증 cron 자동화 (`ops/cron/shadow-diff.sh`) — 백필 시작 *전* 회귀 감지 5분 SLA 확보
- 그 다음:
  - cron 안정 1일 → 백필 batch 1 (1만 row) dry-run
  - cron 회귀 발견 → dual-write writer 재검토 (`svc/payments/writer.py`)

### 0.4 살아있는 산출물 (직전 세션 결과)

| 항목 | 위치 | 상태 | 근거 |
|---|---|---|---|
| Dual-write writer | `svc/payments/writer.py:42-180` | 7일 shadow OK | `pytest tests/test_dual_write.py → 23 PASS` |
| Shadow diff 수동 | `ops/baseline/shadow-diff.sh` | 1일 1회 수동 실행 | `shadow-diff-summary.txt 7일치 0 mismatch` |

### 0.5 알려진 잔여 이슈

- 정합성 검증 cron 미자동화 (수동 1일 1회). 5분 SLA 미달.
- backfill rate-limit 정책 미정 — DB load 영향 미측정.

### 0.6 컨텍스트 복원 순서

1. 본 §0
2. §1 사용자 목표
3. §11 TL;DR
4. 가장 최근 phase 파일 (`svc-migration-status/04-2026-01-22-dual-write.md`)
5. §12 북극성 표

### 0.7 동반 문서

- `svc-migration-pipeline.md` — 방법론 레퍼런스
- *(가상)* "DB Migration Patterns 2024" — 사내 위키 7-stage framework

---

## 1. 출발점 — 사용자 목표

### 1.1 현재 운용 상태
- 단일 monolith가 payments / inventory / users를 한 DB에 보관
- p95 latency 800ms (`prometheus payments_p95 1주 평균`)
- monthly downtime ~30min (incident log 2025-Q4 5건 평균, DB lock 원인)

### 1.2 사용자 진단
> "payments만 분리하면 다른 도메인 lock도 풀린다. 무중단으로 옮기고 싶다."

근본 원인: 도메인 경계 미분리 → DB lock cascade.

### 1.3 외부 컨텍스트 자료 (가상)

| 자료 | 위치 |
|---|---|
| "DB Migration Patterns 2024" | (가상) 사내 위키 `/wiki/eng/migration-patterns` |

핵심 메시지:
- Dual-write + backfill + read swap의 3-phase가 산업 표준
- 단계 사이 *7일 shadow 검증*이 회귀 감지 hyperparameter

### 1.4 진짜 목표

> **payments DB를 무중단으로 분리하고, 분리 후 payments p95 latency를 50% 이상 감소**시킨다.

---

## 2. 의사결정 체인

### 2.1 점진 dual-write(A) vs 단일 cutover(B) → **A 선택**
- A: 7일 shadow + 백필 + read swap. 롤백 안전.
- B: 1시간 downtime + cutover. 빠르지만 롤백 비용 ↑.

### 2.2 백필 정합성 검증 — 시점 vs 행 단위 → **행 단위**
- 시점: `select count` 같은 aggregate diff. 빠르나 row drift 못 잡음.
- 행: 모든 row PK + checksum. 느리나 drift 즉시 감지.

### 2.3 마일스톤 합의

```
M1 → 베이스라인 측정 + Dual-write + 7일 shadow (1주)
M2 → 백필 + 정합성 cron + load 검증 (1-2주)
M3 → Read swap (canary 1% → 10% → 100%) + 30일 모니터링
M4 → 구 DB decommission
```

---

## 3+. Phase 로그 인덱스

| § | 일자 / 단계 | 디테일 파일 | 한 줄 요약 |
|---|---|---|---|
| 3 | M1 — 베이스라인 측정 | [`svc-migration-status/03-2026-01-15-baseline.md`](svc-migration-status/03-2026-01-15-baseline.md) | p95/lock/row count 4 메트릭 측정 (infrastructure-only phase) |
| 4 | M1 — Dual-write + shadow 7일 | [`svc-migration-status/04-2026-01-22-dual-write.md`](svc-migration-status/04-2026-01-22-dual-write.md) | shadow 7일 row-level 0 mismatch, M2 진입 자격 |

---

## 11. 한 페이지 요약 (TL;DR)

- 현재 단계: M1 끝, M2 시작 직전 (백필 시작 전제: cron + rate-limit 정책)
- 마지막 phase: dual-write shadow 7일 0 mismatch
- 다음 1행동: 정합성 cron 자동화
- 가장 큰 갭: p95 latency 50% 감소 — read swap (M3) 후에야 측정 가능

---

## 12. 북극성 (Target State) + 갭

### 12.1 북극성 출처

| 자료 | 핵심 메시지 |
|---|---|
| (가상) "DB Migration Patterns 2024" | dual-write + 7-stage |

### 12.2 북극성 — 지표 / 현재 / 갭 / 근거 / 시스템 영향 ★

| 지표 | 북극성 | 현재 (2026-01-22) | 갭 | 근거 | 시스템 영향 (이게 0이 되면) |
|---|---|---|---|---|---|
| payments p95 latency | ≤ 400ms | 800ms (구 DB) | -50% | `prometheus payments_p95 1주 평균 = 803ms` | API 사용자 응답속도 절반, retry storm 감소, downstream svc-orders queue 백로그 감소 |
| monthly downtime | 0min | 30min | -30min | `incident log 2025-Q4 5건 평균 30min, root: DB lock cascade` | DB lock 해소 → inventory/users 도메인도 lock 면제 (downstream 2 도메인 영향) |
| dual-write 정합성 | 100% (7d) | 100% (7일 0 mismatch) | 0 | `shadow-diff-summary.txt: 1,243,891 rows 비교, 0 mismatch` | M2 백필 진입 가능, 데이터 정합성 보장 |
| 백필 진척도 | 100% (~1.2B row) | 0% | -100% | `psql -c "select count from orders_v2" → 0` | 신 DB가 *과거 데이터까지 진실*. read swap 가능 시점 결정 |
| read swap 비율 | 100% | 0% (flag off) | -100% | `feature flag payments_v2_read = false` | 트래픽 100% 신 DB로 → p95 측정 가능, 구 DB decommission 가능 |
| 정합성 cron SLA | 5분 | 1일 (수동) | -23.92h | `ops/cron/shadow-diff.sh 미작성` | 회귀 5분 내 감지, 백필 중 silent drift 차단 |

### 12.3 남은 작업 (우선순위)

| # | 작업 | 추정 LOC | 어떤 §북극성 행을 움직이나 | 시스템 영향 (예상) |
|---|---|---|---|---|
| 1 | 정합성 cron 자동화 | ~80 | 정합성 cron SLA 1일→5분 | 회귀 silent 차단, 백필 시작 자격 확보 |
| 2 | 백필 worker (resumable) | ~200 | 백필 진척도 0%→100% | 신 DB가 과거까지 동기, read swap 자격 |
| 3 | DB load 부하 테스트 | ~50 | (게이트 — 직접 행 안 움직임) | 백필 rate 결정. 미측정 시 prod 충격 위험 |
| 4 | Read swap feature flag + canary | ~30 | read swap 0%→100% | 사용자 트래픽 신 DB로, p95 실측 가능 |

### 12.4 비관 재채점 (latest, 2026-01-22) ★

> 직전 채점에 대해 *적대적 리뷰어 가정*으로 다시 채점.

| 단계 | 이전 | 현재 (비관) | 사유 | 반례/근거 |
|---|---|---|---|---|
| Dual-write | ◎ | ○ | 7일 shadow는 짧음. peak hour (월말 결제 마감) 미커버 | shadow 기간 max QPS = 1.2× 평균 (낮음). `shadow-diff-summary.txt`에서 일자별 QPS 분포 확인 |
| 정합성 검증 자동화 | ◎ | △ | 수동 1일 1회. 회귀 시 평균 12h 발견 지연 | `ops/cron/` 디렉터리에 cron entry 없음. last manual run 2026-01-21 16:30 |
| 백필 전략 | ◎ | ○ | rate-limit 미정. DB load risk 모름 | 부하 테스트 미실시 (`load-test/` 디렉터리 비어 있음) |
| Read swap 설계 | △ | ✗ | 카나리 단계 미설계. flag만 정의 | `config/flags.yaml`에 토글만 존재, traffic split rule 없음 |

---

## 13. 산출 LOC 요약

| Phase | 누적 LOC | 비고 | 검증 산출물 |
|---|---|---|---|
| M1.1 베이스라인 | 80 | 측정 스크립트 only | `metrics-baseline.json` (1주치) |
| M1.2 Dual-write | 320 | shadow 7일 PASS | `shadow-diff-summary.txt`, `pytest test_dual_write 23 PASS` |

---

## 14. pipeline §매핑 동기화 체크

마지막 동기화: 2026-01-22

- [x] pipeline §매핑 표 최신 (§4 dual-write ◎, §5-7 ✗)
- [x] status §북극성과 pipeline §매핑 일관 (백필 0% ↔ §5 ✗)
- [x] 외부 출처 양 doc 동일 ("DB Migration Patterns 2024")
- [ ] 새 stage 추가 검토 — 현재 7-stage로 충분 판단
- [x] 모든 §북극성 행 `근거` + `시스템 영향` 채워짐

# svc-migration 파이프라인 — 학습 & 코딩 레퍼런스

> Paired with: `svc-migration-status.md`
> *Fictional example* for the progress-guidance skill — all values illustrative.

---

## 0. 전체 흐름 한눈에

```
1. Inventory          │  옮길 것 전수조사 — schema, row count, downstream
2. Risk assessment    │  ★ 실패 모드 / blast radius / 롤백 비용
3. Schema design      │  destination 스키마 — 미래 확장 고려
4. Dual-write         │  ★ 신·구 DB 동시 쓰기, shadow 검증
5. Backfill           │  과거 데이터 복제, rate-limit, 정합성 cron
6. Read swap          │  ★ 트래픽 swap, feature flag, 카나리
7. Decommission       │  구 DB 제거, archive, 연결 끊기
```

**기억해야 할 ★ 핵심 단계** — 이게 무너지면 나머지가 의미 없음:

- §2 Risk assessment — 누락 시 prod에서 첫 감지. 사후 복구 비용 가장 큼.
- §4 Dual-write — 정합성 미검증 진입 시 백필 시작 못 함. 모든 후속 단계 차단.
- §6 Read swap — 카나리 미사용 시 모든 사용자에게 한번에 노출. 롤백 윈도 좁음.

> ### MVP-first 권장
>
> 작은 도메인(테이블 < 5)은 §1 + §2 + 단축형 §4-§6으로 충분.
> 큰 도메인(테이블 ≥ 50)은 §3 schema 설계 단계에서 *반드시* 1주 이상 확보.

### MVP / Full 활성표

| § | MVP (작은 도메인) | Full (큰 도메인) |
|---|---|---|
| §1 Inventory | manual sheet | automated diff cron |
| §2 Risk | top-3 failure mode | full FMEA + blast radius matrix |
| §3 Schema | minimal mirror | extensible schema + indexing plan |
| §4 Dual-write | 7d shadow | 14d + peak hour explicit |
| §5 Backfill | single-pass | resumable + rate-limited + verify cron |
| §6 Read swap | flag-based binary | canary 1%→10%→100% + auto-rollback |
| §7 Decommission | manual cleanup | scripted + audit log + 30d retention |

### 무중단 마이그 5 메커니즘

1. **Monotonic write contract** (§4 보강): 모든 쓰기는 신·구 동시. 도중 멈추면 정합성 깨짐.
2. **Idempotent backfill** (§5 보강): 중단 후 재실행해도 결과 동일.
3. **Verifiable diff** (§4-5 보강): 시점별 row-level diff 자동, 5분 SLA.
4. **Reversible read swap** (§6 보강): 30초 내 롤백 가능 (feature flag 또는 router level).
5. **Audit-able cutover** (§7 보강): 모든 단계의 *언제 / 누가 / 무엇* 로그 + 30일 보존.

이 5 메커니즘 모두 갖춰야 *무중단* 마이그. 본 프로젝트:
- 1번 ✅ (§4 dual-write 가동)
- 2번 ⚠️ 부분 (§5 미시작, idempotency 설계만)
- 3번 ⚠️ 부분 (수동 1일 1회 — 5분 SLA 미달)
- 4번 ❌ (§6 카나리 미설계)
- 5번 ❌ (§7 미시작)

---

## 1. Inventory

### 1.1 무엇을 하는 단계인가
옮길 대상의 *전수조사*. schema, row count, downstream 의존, 트래픽 패턴 4가지.

### 1.2 좋은 입력의 신호
- "테이블 5개" 같은 단순 요약이 아닌, 각 테이블의 row count + 최근 1주 QPS + downstream consumer 목록.

### 1.3 자주 하는 실수
- "주요 테이블만" — 잊혀진 audit 테이블이 read swap에서 발견되어 cutover 지연.

### 1.4 코드 관점
- 자동화 가능: `psql -c "select tablename, n_live_tup from pg_stat_user_tables"` + downstream code grep.

---

## 2. Risk assessment

### 2.1 무엇을 하는 단계인가
실패 모드 + blast radius + 롤백 비용. *어디서 무너지면 누가 다친가*.

### 2.2 좋은 입력의 신호
- 최소 5개의 명시적 실패 시나리오 (각각 확률 + 영향 + 감지 시간 + 복구 시간).

### 2.3 자주 하는 실수
- 행복 경로(happy path)만 보고 시작.
- 롤백 비용을 *현재 시점* 기준으로만 계산 — 백필 50% 진행 후 롤백 비용은 다름.

### 2.4 코드 관점
- 실패 시나리오 번호별 alert rule 사전 작성.

---

## 3. Schema design

### 3.1 무엇을 하는 단계인가
destination 스키마 설계. 미래 확장(2-5년) 고려 + indexing plan 동시 결정.

### 3.2 좋은 입력의 신호
- 최소 3가지 미래 query pattern 명시 → schema가 그 patterns에 fit.

### 3.3 자주 하는 실수
- 구 DB schema 그대로 복사 (구 DB의 부채를 신 DB로 옮김).

### 3.4 코드 관점
- 마이그 SQL 작성 + index 사전 작성. dual-write 진입 *전*에 신 DB indexing 완료.

---

## 4. Dual-write

### 4.1 무엇을 하는 단계인가
신·구 DB 동시 쓰기. 한쪽 실패 시 정책(전체 fail / 신 fail allow / retry)을 *명시*해야 함.

### 4.2 좋은 입력의 신호
- 최소 7일 shadow에서 row-level 0 mismatch.
- Latency overhead 측정값 < 사용자 SLA 임계.

### 4.3 자주 하는 실수
- shadow 기간 = peak hour 미포함 → "정합성 OK"가 진짜 정합성이 아님 (peak hour bug 잠복).
- 한쪽 실패 정책 미정 → 운영 중 ad-hoc 결정 → 일관성 없음.
- 정합성 검증을 aggregate diff (`select count`)로만 하고 row-level 안 함 → silent drift.

### 4.4 코드 관점
- Writer는 dual-write 모드에서 두 DB 모두 ack 필요 (정책에 따라 신은 best-effort 가능).
- Idempotency key 모든 쓰기에 부여 → retry 안전.

---

## 5. Backfill

### 5.1 무엇을 하는 단계인가
과거 데이터 신 DB로 복제. resumable + rate-limited + 정합성 cron 동반.

### 5.2 좋은 입력의 신호
- Backfill 작업 진행률 추적 (`backfill_progress_pct` 메트릭).
- DB load metric이 평소 +10% 이내.

### 5.3 자주 하는 실수
- Single-pass non-resumable → 중간 실패 시 처음부터.
- Rate-limit 미정 → DB load 폭증 → 사용자 latency 영향.

### 5.4 코드 관점
- Resumable: 마지막 처리 PK를 별도 테이블에 commit, 재시작 시 그 다음부터.
- Rate-limit: 토큰 버킷 또는 sleep, DB load metric 기반 동적 조절.

---

## 6. Read swap

### 6.1 무엇을 하는 단계인가
트래픽을 신 DB로 swap. 카나리 단계적 (1% → 10% → 100%) + 자동 롤백.

### 6.2 좋은 입력의 신호
- 각 카나리 단계에서 신·구 latency / error rate 비교 → 신이 ≤ 구.

### 6.3 자주 하는 실수
- 한 번에 100% swap → 회귀 감지 시점에 이미 모든 사용자 영향.
- 자동 롤백 trigger 없음 → 수동 인지 → 평균 30분 영향.

### 6.4 코드 관점
- Feature flag 또는 router level traffic split.
- Auto-rollback: error rate 임계 초과 시 즉시 flag 100% → 0%.

---

## 7. Decommission

### 7.1 무엇을 하는 단계인가
구 DB 제거. 단, archive + 연결 끊기 + 30일 retention.

### 7.2 좋은 입력의 신호
- 30일 모니터링에서 신 DB 단독 무사고 확인 후.

### 7.3 자주 하는 실수
- 즉시 drop → 30일 후 발견된 의존성 (analytics, audit) 복구 불가.

### 7.4 코드 관점
- archive snapshot → S3 cold tier.
- Code grep으로 구 DB connection string 모두 제거 확인.

---

## 8. 이 프로젝트가 위 틀에 얼마나 부합하는가

총평: M1 견고 (§1, §2, §3, §4 ◎/○). M2 진입 직전, M3-7은 미착수. *되돌릴 수 있는 정책*이 §5-6에 들어가야 무중단 자격.

### 8.1 단계별 평가

| 단계 | 부합도 | 구현 위치 / 한계 | 근거 |
|---|---|---|---|
| 1. Inventory | ◎ | `ops/baseline/measure.sh` | `metrics-baseline.json` 1주치, 4 메트릭 측정 |
| 2. Risk assessment | ○ | incident log 5건 분석, 시나리오 3개 | peak QPS 시나리오 미포함, 백필 중 롤백 비용 모델 부재 |
| 3. Schema design | ◎ | `migrations/payments_v2.sql` | review 통과 2026-01-10, 미래 query pattern 3개 명시 |
| 4. Dual-write | ◎ | `svc/payments/writer.py:42-180` | shadow 7d 0 mismatch (`shadow-diff-summary.txt`), pytest 23 PASS, latency +3.2ms (SLA 내) |
| 5. Backfill | ✗ | 미시작 | — |
| 6. Read swap | ✗ | flag 정의만 (`config/flags.yaml`) | traffic split rule 없음, auto-rollback 없음 |
| 7. Decommission | ✗ | 미시작 | — |

범례: ◎ 우수 / ○ 양호 / △ 부분 / ✗ 미구현

### 8.2 가장 잘된 부분

1. **§4 Dual-write** — peak hour는 미커버지만 row-level diff 자동화로 silent drift 차단 메커니즘은 갖춤.
2. **§3 Schema design** — 미래 query pattern 사전 명시는 자주 누락되는 부분.

### 8.3 메꿔야 할 갭

1. **§2 Risk** — peak QPS 시나리오 + 백필 중 롤백 비용 모델 필요.
2. **§4 Dual-write** — shadow 기간 7일은 짧음. 월말 결제 마감 1회는 포함 필요.
3. **§5 Backfill** — rate-limit 정책 부재.
4. **§6 Read swap** — 카나리 미설계, auto-rollback 미설계.

### 8.4 한 문장 요약

> dual-write 인프라는 견고. §5-6의 *되돌릴 수 있는 정책*이 들어가야 무중단 자격. 5 메커니즘 중 3개 미달.

---

## 동기화 알림 ★

이 §매핑 표는 status §북극성 + status §비관 재채점과 *반드시 동기화*. 한쪽만 갱신되면 doc 발산. status §14 동기화 체크리스트 참조.

`근거` 칼럼이 비어 있으면 cycle 미완료.

---

## 부록 A. 무중단 마이그 코드 작성 시 체크리스트

```
□ Writer는 dual-write 모드에서 두 DB 모두 성공해야 ack
□ 한쪽 실패 시 어떤 정책? (전체 fail / 신만 fail allow / retry)
□ 모든 마이그 단계가 idempotent
□ Feature flag toggle이 30초 내 rollback 가능
□ 모든 단계의 audit log + 30일 보존
□ 정합성 cron SLA ≤ 5분
```

## 부록 B. Cutover 직전 체크리스트

```
□ 정합성 cron 30일 무중단 가동
□ 신 DB 단독 부하 테스트 PASS (max QPS × 1.5)
□ Auto-rollback 토글 verified
□ Incident response runbook 작성 + 1회 dry-run
```

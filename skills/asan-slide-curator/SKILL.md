---
name: asan-slide-curator
description: "아산병원 프레젠테이션의 학술 콘텐츠 큐레이션 및 품질 향상 스킬. 슬라이드 주제에 대해 학술 레퍼런스(DOI) 검색, 근거 기반 문구 수정, 관련 그림/모식도 탐색 및 생성 제안, 슬라이드 전반적인 완성도 평가를 수행한다. 'AMC 슬라이드 내용 보강', '레퍼런스 추가', '학술 발표 자료 개선', 'DOI 찾기', '그림 넣기', '슬라이드 퀄리티', '발표자료 완성도', '논문 근거', '학회 발표' 등의 요청에 사용. asan-pptx 스킬과 함께 사용하면 레이아웃(how) + 콘텐츠(what)를 모두 커버할 수 있다."
---

# Asan Slide Curator

아산병원 학술 프레젠테이션의 콘텐츠를 큐레이팅하고 품질을 끌어올리는 스킬.
asan-pptx 스킬이 "어떻게 만들 것인가(스타일/레이아웃)"를 담당한다면,
이 스킬은 "무엇을 넣을 것인가(콘텐츠/근거/시각자료)"를 담당한다.

## 3단계 파이프라인

```
[Phase 1: 주제 분석]  →  [Phase 2: 레퍼런스 큐레이션]  →  [Phase 3: 품질 향상]
   주제 구조화              DOI 검색 / 문구 보강             시각자료 / 완성도
```

각 Phase는 독립적으로 실행 가능. 사용자가 "레퍼런스만 찾아줘"라고 하면 Phase 2만,
"완성도 평가해줘"라면 Phase 3만 실행.

---

## Phase 1: 주제 분석

사용자와 대화하며 발표 주제를 구조화한다.

### 1.1 주제 인터뷰

사용자에게 확인할 사항:

- **발표 목적**: 학회 / 연구 보고 / 교육 / 내부 회의
- **청중**: 동료 연구자 / 임상의 / 비전문가
- **핵심 메시지**: 전달해야 할 1-2문장
- **기존 자료**: 원고, 초록, 데이터 여부

### 1.2 슬라이드별 콘텐츠 맵 작성

각 슬라이드(또는 패널)에 대해 정리:

```
슬라이드 N: [제목]
├── 핵심 주장 (1문장)
├── 근거 유형: 통계 / 선행연구 / 가이드라인 / 자체 데이터
├── 시각자료: 모식도 / 차트 / 이미지 / 없음
└── 레퍼런스 상태: 있음 / 필요 / 해당없음
```

---

## Phase 2: 레퍼런스 큐레이션

### 2.1 학술 레퍼런스 검색

**검색 전략 — 3단계:**

1차: 핵심어 조합 + 연도 필터
```
web_search: "[주제 핵심어] [방법론] [연도 범위]"
예: "TNM staging LLM automated 2024 2025"
예: "few-shot medical image segmentation SAM2 2024"
```

2차: 주요 저널/학회 한정 검색 (분야별 전략은 `references/search-strategies.md` 참조)

3차: 핵심 논문의 인용/피인용 네트워크 확인

**DOI 검증:** `scripts/doi_lookup.py`로 메타데이터 조회. CrossRef API 사용.

**출력 형식 — 레퍼런스 카드:**
```json
{
  "id": "ref-01",
  "doi": "10.1038/s41591-024-xxxxx",
  "title": "논문 제목",
  "authors": "First Author et al.",
  "journal": "Nature Medicine",
  "year": 2024,
  "relevance": "이 레퍼런스가 어떤 슬라이드의 어떤 주장을 뒷받침하는지",
  "key_finding": "주요 수치/결론 요약",
  "slides": [2, 3]
}
```

### 2.2 근거 기반 문구 수정

레퍼런스를 기반으로 슬라이드 텍스트를 보강한다.

**수정 원칙:**
- 주장에 출처 명시 ("… (Author et al., 2024)")
- 수치는 원논문 정확값 사용
- 비교 표현 구체화 ("향상됨" → "+12.4%p, p<0.001")
- 가이드라인은 판본 명시 ("AJCC 8th Edition")

**반드시 수정 전/후를 나란히 보여줄 것:**
```
[Before] LLM 기반 TNM 판정이 높은 정확도를 보였다.
[After]  LLM 기반 TNM 판정은 94.2% 정확도로 기존 rule-based (81.7%)
         대비 유의한 향상 (p<0.001, Kim et al., 2024).
```

### 2.3 레퍼런스 슬라이드 생성

발표 마지막에 추가할 References 목록을 Vancouver 또는 AMA 스타일로 생성.

---

## Phase 3: 시각자료 및 품질 향상

### 3.1 관련 그림 탐색

**탐색 소스 (우선순위 순):**

1. **사용자 자체 데이터** → matplotlib/seaborn으로 차트 즉시 생성
2. **Open Access 논문 그림** → PMC에서 CC-BY 라이선스 그림 탐색
3. **모식도 직접 생성** → Mermaid.js 코드 또는 상세 명세 작성

**데이터 차트 자동 생성:**

사용자가 수치 데이터를 제공하면 `scripts/chart_generator.py`로 즉시 생성:
- 정확도 비교 → grouped bar chart
- 시계열 성능 → line chart with markers
- 혼동행렬 → annotated heatmap
- Dice score 등 → box plot / violin plot

차트는 AMC 색상 팔레트(teal/orange)를 자동 적용.
상세: `references/chart-generator.md`

### 3.2 모식도 명세 작성

직접 생성이 필요한 다이어그램은 구조화된 명세로 작성한다.
이 명세는 사람이 그리거나, 향후 이미지 생성 API로 자동 변환할 수 있다.

**명세 형식:**
```yaml
diagram_id: arch-01
title: "Multi-Agent TNM Staging Architecture"
type: flow_diagram  # flow_diagram / comparison / timeline / hierarchy
elements:
  - id: input
    label: "병리 보고서"
    shape: rounded_rect
    color: teal
  - id: agent1
    label: "파싱 에이전트"
    shape: rect
    color: tealBright
connections:
  - from: input
    to: agent1
    label: "비정형 텍스트"
target_slide: 2
target_position: "좌측 패널 이미지 박스"
```

### 3.3 이미지 생성 통합 (확장점)

현재는 모식도 명세 + matplotlib 차트까지 지원.
향후 연동 가능한 백엔드:

| 백엔드 | 용도 | 상태 |
|--------|------|------|
| matplotlib/seaborn | 데이터 차트 | 사용 가능 |
| Mermaid.js → PNG | 플로우차트, 시퀀스 | 사용 가능 |
| Google Imagen (Vertex AI) | 사실적 이미지, 복합 다이어그램 | 향후 연동 |
| DALL-E / Stable Diffusion | 개념 이미지 | 향후 연동 |

### 3.4 슬라이드 품질 평가

5개 차원으로 전체 프레젠테이션 완성도를 평가한다.
`scripts/quality_scorer.py`로 자동 점수 산출 가능.

**평가 루브릭:**

| 차원 | 평가 기준 | 가중치 |
|------|----------|--------|
| 학술 근거 | 핵심 주장에 DOI 레퍼런스가 있는가 | 25% |
| 콘텐츠 밀도 | 정보량이 적절한가 (과소/과밀 없음) | 20% |
| 시각적 균형 | 텍스트:이미지 비율, 좌우 패널 균형 | 20% |
| 논리적 흐름 | 슬라이드 간 전개의 자연스러움 | 20% |
| 형식 일관성 | 폰트·색상·용어 통일, 오탈자 없음 | 15% |

각 차원 1-5점, 가중 평균으로 총점 산출.
상세 루브릭 및 채점 예시: `references/quality-rubric.md`

**품질 보고서 형식:**
```
=== 슬라이드 품질 보고서 ===
총점: 4.2/5.0

[학술 근거] 4.5/5
  ✓ 슬라이드 2: TNM 정확도에 3개 레퍼런스
  ✗ 슬라이드 3: SOTA 비교 출처 미기재

[콘텐츠 밀도] 4.0/5  ...
[시각적 균형] 3.5/5  ...
[논리적 흐름] 4.5/5  ...
[형식 일관성] 4.5/5  ...

--- 우선 개선 항목 (높음→낮음) ---
1. 슬라이드 3 SOTA 비교 레퍼런스 추가
2. 이미지 플레이스홀더 → 실제 도표 교체
3. 우측 하단 여백 활용
```

---

## asan-pptx 스킬과의 연동

```
[curator] 주제 분석 → DOI 검색 → 콘텐츠 구조화
              ↓
[asan-pptx] 구조화된 콘텐츠 → PPTX 생성
              ↓
[curator] 품질 평가 → 개선 항목
              ↓
[asan-pptx] 개선 반영 → 최종 PPTX
```

## 참고 파일

- `references/search-strategies.md` — 의료 AI 분야별 검색 전략
- `references/chart-generator.md` — 데이터 차트 자동 생성 가이드
- `references/quality-rubric.md` — 품질 평가 루브릭 상세
- `scripts/doi_lookup.py` — CrossRef API 기반 DOI 메타데이터 조회
- `scripts/chart_generator.py` — AMC 팔레트 차트 생성기
- `scripts/quality_scorer.py` — PPTX 자동 품질 점수 산출

# asan-pptx-skills

서울아산병원(Asan Medical Center) 학술 프레젠테이션을 위한 Claude 스킬 모음.

**두 스킬이 협업**하여 콘텐츠 기획부터 디자인 완성까지 전 과정을 지원합니다.

## 스킬 구성

### 1. asan-slide-curator — 콘텐츠 큐레이션

학술 발표의 **"무엇을 넣을 것인가"** 를 담당합니다.

- 주제 분석 및 슬라이드별 콘텐츠 맵 작성
- 학술 레퍼런스 검색 및 DOI 검증 (CrossRef API)
- 데이터 차트 자동 생성 (AMC CI 컬러 적용)
- 5차원 품질 평가 (Academic Evidence, Content Density, Visual Balance, Logical Flow, Format Consistency)

### 2. asan-pptx — 디자인 & 레이아웃

학술 발표의 **"어떻게 배치할 것인가"** 를 담당합니다.

- 아산병원 CI 기반 PPT 자동 생성 (pptxgenjs)
- 기존 PPT를 아산 스타일로 변환
- 이미지 비율 보존, 다크/라이트 로고 자동 전환

**두 가지 디자인 시스템 지원:**

| 시스템 | 캔버스 | 특징 | 용도 |
|--------|--------|------|------|
| **Dense System** | 10" × 5.625" (16:9) | 압축 레이아웃, 2컬럼 그리드, 컴포넌트 기반 | 학술 발표, 학회 |
| **Reports Style** | 11.69" × 8.27" (√2, A4) | 듀얼 패널 (Teal/Orange), 프로젝트 카드 | 연구계획서, 기술보고서 |

## 워크플로우

```
[curator] 주제 분석 → 레퍼런스 수집 → 콘텐츠 맵 → 품질 채점
                                                    ↓
[asan-pptx] 디자인 시스템 선택 → 레이아웃 배치 → PPT 생성 → QA
```

## 폴더 구조

```
asan-pptx-skills/
├── README.md
├── LICENSE
├── skills/
│   ├── asan-pptx/                          # 디자인 스킬
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── layout-patterns.md          # 10개 레이아웃 코드 예시
│   │   │   ├── pptxgenjs-reference.js      # Dense System 레퍼런스 스크립트
│   │   │   ├── STYLE_reports.md            # Reports Style 정의
│   │   │   └── pptxgenjs-reference-reports.js  # Reports Style 레퍼런스 스크립트
│   │   └── assets/
│   │       └── 로고 3종 (transparent, white, small)
│   └── asan-slide-curator/                 # 큐레이션 스킬
│       ├── SKILL.md
│       ├── references/
│       │   ├── quality-rubric.md           # 5차원 품질 채점 기준
│       │   ├── chart-generator.md          # AMC 차트 가이드
│       │   ├── search-strategies.md        # 의료 AI 분야별 검색 전략
│       │   └── api_reference.md
│       └── scripts/
│           ├── quality_scorer.py           # PPTX 자동 품질 분석
│           ├── doi_lookup.py               # CrossRef DOI 조회
│           └── chart_generator.py          # matplotlib 차트 생성기
```

## 설치

### Cowork

```bash
# 각 스킬을 개별 설치
cp -r skills/asan-pptx ~/.skills/skills/asan-pptx/
cp -r skills/asan-slide-curator ~/.skills/skills/asan-slide-curator/
```

### Claude Code

```bash
cp -r skills/asan-pptx .claude/skills/asan-pptx/
cp -r skills/asan-slide-curator .claude/skills/asan-slide-curator/
```

## 사용법

```
아산 스타일로 연구 발표 PPT 만들어줘
```

```
이 PPT 콘텐츠를 학술 레퍼런스 기반으로 보강해줘
```

```
발표자료 품질 점수 매겨줘
```

트리거 키워드: `아산 PPT`, `아산 스타일`, `AMC PPT`, `슬라이드 큐레이션`, `품질 평가`

## 의존성

| 스킬 | 필수 | 선택 |
|------|------|------|
| asan-pptx | Node.js + pptxgenjs | python-pptx, markitdown, Pillow |
| asan-slide-curator | Python 3 + requests | matplotlib, seaborn, python-pptx |

## 디자인 시스템 컬러

### Dense System (ASAN_01)

| 이름 | HEX | 용도 |
|------|-----|------|
| primary | `#0C598E` | 헤더, 주요 강조 |
| primaryDark | `#004074` | 표지, 다크 배경 |
| secondary | `#00696D` | 보조 강조 |
| accent | `#F68B1E` | 오렌지 포인트 |

### Reports Style

| 이름 | HEX | 용도 |
|------|-----|------|
| teal | `#006567` | 좌측 패널 (연구배경) |
| orange | `#F57427` | 우측 패널 (결과) |
| tealBright | `#1EABA3` | 보조 하이라이트 |
| orangeDark | `#B3510E` | 카드 배경, 중앙선 |

## 라이선스

MIT License

## 기여

Core-BMC 팀원이라면 PR을 통해 스타일 개선, 새 레이아웃, 스크립트 추가 등을 기여할 수 있습니다.

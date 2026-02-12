# 데이터 차트 자동 생성 가이드

`scripts/chart_generator.py`로 AMC 색상 팔레트가 적용된 학술 차트를 생성하는 방법.

## 기본 사용법

```bash
python scripts/chart_generator.py --type [차트유형] --data [JSON파일] --output [출력경로.png]
```

## AMC 색상 팔레트

| 이름 | HEX | 용도 |
|------|-----|------|
| teal | #006567 | 주 색상, 첫 번째 그룹 |
| orange | #F57427 | 강조 색상, 두 번째 그룹 |
| tealBright | #1EABA3 | 보조 색상, 세 번째 그룹 |
| orangeDark | #B3510E | 중앙값 라인, 네 번째 그룹 |
| tealBorder | #1D84AD | 다섯 번째 그룹 |
| peach | #F8D8CD | 여섯 번째 그룹 / 배경 |

---

## 차트 유형별 JSON 형식

### 1. Bar Chart (그룹 바 차트)

**용도:** 모델 간 성능 비교, 카테고리별 수치 비교

```json
{
  "title": "Model Performance Comparison",
  "ylabel": "Accuracy (%)",
  "labels": ["T-stage", "N-stage", "M-stage", "Overall"],
  "groups": [
    {
      "name": "Rule-based",
      "values": [78.3, 72.1, 89.5, 81.7]
    },
    {
      "name": "LLM (Ours)",
      "values": [92.1, 88.4, 95.2, 94.2]
    }
  ]
}
```

**생성 명령:**
```bash
python scripts/chart_generator.py --type bar --data perf_comparison.json --output perf_comparison.png
```

**결과 특징:**
- 그룹별 AMC 팔레트 자동 적용
- 각 바 위에 수치 라벨 표시
- 상단/우측 축선 제거, Y축 그리드 표시

### 2. Line Chart (라인 차트)

**용도:** 시계열 성능 변화, 학습 곡선, 에폭별 추이

```json
{
  "title": "Training Progress",
  "xlabel": "Epoch",
  "ylabel": "Dice Score",
  "x": [1, 5, 10, 20, 50, 100],
  "series": [
    {
      "name": "Baseline",
      "values": [0.45, 0.62, 0.71, 0.78, 0.82, 0.83]
    },
    {
      "name": "Ours (Few-shot)",
      "values": [0.52, 0.68, 0.79, 0.86, 0.91, 0.93]
    }
  ]
}
```

**생성 명령:**
```bash
python scripts/chart_generator.py --type line --data training.json --output training_curve.png
```

**결과 특징:**
- 마커 포함 실선 (`o-`)
- 범례 프레임 없음
- 전체 그리드 표시

### 3. Heatmap (히트맵 / 혼동행렬)

**용도:** 혼동행렬(Confusion Matrix), 상관관계 매트릭스

```json
{
  "title": "TNM Classification Confusion Matrix",
  "xlabel": "Predicted",
  "ylabel": "Actual",
  "labels": ["Stage I", "Stage II", "Stage III", "Stage IV"],
  "matrix": [
    [45, 3, 1, 0],
    [2, 38, 4, 1],
    [0, 3, 42, 2],
    [0, 0, 3, 47]
  ]
}
```

**생성 명령:**
```bash
python scripts/chart_generator.py --type heatmap --data confusion.json --output confusion_matrix.png
```

**결과 특징:**
- AMC teal 계열 커스텀 컬러맵 (white → tealBright → teal)
- 셀 내부 수치 자동 표시 (고값은 흰색, 저값은 다크 텍스트)
- 컬러바 포함

### 4. Box Plot (박스 플롯)

**용도:** Dice score 분포, 모델별 성능 분포 비교

```json
{
  "title": "Segmentation Performance Distribution",
  "ylabel": "Dice Score",
  "groups": [
    {
      "name": "nnU-Net",
      "values": [0.82, 0.85, 0.88, 0.84, 0.87, 0.83, 0.86, 0.89, 0.81, 0.85]
    },
    {
      "name": "SAM2",
      "values": [0.78, 0.81, 0.79, 0.83, 0.77, 0.80, 0.82, 0.76, 0.79, 0.81]
    },
    {
      "name": "Ours",
      "values": [0.90, 0.92, 0.88, 0.91, 0.93, 0.89, 0.94, 0.91, 0.90, 0.92]
    }
  ]
}
```

**생성 명령:**
```bash
python scripts/chart_generator.py --type boxplot --data dice_scores.json --output dice_boxplot.png
```

**결과 특징:**
- 반투명(50%) 박스 채우기
- 중앙값 라인 orangeDark
- 상단/우측 축선 제거

---

## 슬라이드 삽입 시 권장사항

| 항목 | 권장값 |
|------|--------|
| 출력 DPI | 200 (기본값) |
| 출력 형식 | PNG |
| 삽입 크기 (단일 패널) | 폭 4.5~5.0", 높이 3.0~3.5" |
| 삽입 크기 (전체 슬라이드) | 폭 8.0~9.0", 높이 5.0~6.0" |
| 배경 | 투명 또는 흰색 (#FFFFFF) |

## 폰트 우선순위

1. Pretendard (AMC 공식)
2. Noto Sans KR
3. Arial
4. DejaVu Sans (폴백)

시스템에 한글 폰트가 없으면 DejaVu Sans로 자동 폴백되며, 한글 텍스트가 깨질 수 있음.
한글 라벨이 필요하면 먼저 `fc-list | grep -i noto` 등으로 설치 여부 확인.

## 커스터마이징

차트를 더 세밀하게 커스터마이징하려면 `chart_generator.py`의 개별 함수를 Python에서 직접 호출:

```python
from chart_generator import apply_amc_style, bar_chart
import json

apply_amc_style()
with open('data.json') as f:
    data = json.load(f)
bar_chart(data, 'output.png')
```

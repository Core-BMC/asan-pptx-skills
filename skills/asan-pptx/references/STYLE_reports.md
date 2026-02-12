# Asan PPT — Reports Style (대형 캔버스 · 듀얼패널 · 멀티섹션)
<!-- This document defines the guidelines that AGENT MUST follow in conversations with the USER. -->
<!-- NOTE: These are mandatory instructions. The model should read carefully and adhere to all guidelines. -->
<!-- markdownlint-disable MD013 -->
<!-- markdownlint-disable MD022 -->
<!-- markdownlint-disable MD031 -->
<!-- markdownlint-disable MD032 -->
<!-- markdownlint-disable MD036 -->
<!-- markdownlint-disable MD040 -->
<!-- markdownlint-disable MD060 -->

`AMC_ReportsStyle_Reference.pptx` 에서 추출한 스타일 세팅.
기술 보고서, 연구 발표, 시스템 아키텍처 설명에 적합한 **대형 캔버스 + 듀얼패널(틸/오렌지) + 다단 섹션** 레이아웃.

> Dense System(`SKILL.md`)과 별도 — 캔버스 크기, 색상 체계, 타이포그래피, 섹션 구조가 모두 다름.

---

## 캔버스

```javascript
pres.defineLayout({ name: 'REPORTS_WIDE', width: 11.6927, height: 8.2674 });
pres.layout = 'REPORTS_WIDE';
```

| 항목 | 값 |
|------|-----|
| Width | **11.6927"** (10,691,813 EMU) |
| Height | **8.2674"** (7,559,675 EMU) |
| Ratio | 1.4143 (≈ √2, A4 비율에 가까움) |

---

## 색상 팔레트 (8색 체계)

```javascript
const C = {
  // 텍스트
  titleDark:   '484848',   // 메인 제목 (거의 블랙)
  textDark:    '404040',   // 본문 텍스트
  white:       'FFFFFF',   // 패널 내부 텍스트

  // 좌측 패널 (틸 계열)
  teal:        '006567',   // 헤더 바, 프로젝트 섹션 배경
  tealBorder:  '1D84AD',   // 좌측 패널 테두리 (보조 블루)
  tealBright:  '1EABA3',   // 지식(Knowledge) 섹션 배경 — 밝은 틸

  // 우측 패널 (오렌지 계열)
  orange:      'F57427',   // 헤더 바, 중앙 배경
  orangeDark:  'B3510E',   // 프로젝트 카드 배경 — 다크 오렌지/브라운
  peach:       'F8D8CD',   // 장식용 소형 도트 — 라이트 피치
};
```

### 색상 의미 체계

| 색상 | 코드 | 위치 | 의미 |
|------|------|------|------|
| 틸 (Teal) | `006567` | 좌측 헤더 바, 프로젝트 섹션 배경 | 연구주제, 프로젝트 정의 |
| 틸블루 (Teal Blue) | `1D84AD` | 좌측 패널 외곽 테두리 | 보조 강조, 프레임 |
| 밝은 틸 (Bright Teal) | `1EABA3` | 좌측 지식 섹션 배경, 둥근 사각형 테두리 | 관련 지식, 보조 정보 |
| 오렌지 (Orange) | `F57427` | 우측 헤더 바, 중앙 배경 | 결과, 검증, 실행 |
| 다크 오렌지 (Dark Orange) | `B3510E` | 프로젝트 카드 배경 (우측) | 프로젝트 상세 카드 |
| 피치 (Peach) | `F8D8CD` | 소형 장식 도트 | 다이어그램 연결 마커 |
| 타이틀 다크 | `484848` | 제목 텍스트 | 최상위 계층 |
| 텍스트 다크 | `404040` | 본문 텍스트, 페이지 번호 | 기본 읽기용 |

---

## 타이포그래피

폰트: **Pretendard** (전체 단일 폰트)

| 요소 | fontSize | bold | color | 비고 |
|------|----------|------|-------|------|
| 메인 제목 | **24** | O | `484848` | 슬라이드 최상단 |
| 부제목 | **16** | X | `006567` | 제목 아래 |
| 패널 헤더 (색상 바 내부) | **14** | X | `FFFFFF` | h=0.394 색상 바 안 |
| 본문 (주력) | **12** | X | `404040` | 디테일, 프로젝트 타이틀, 목표 |
| 본문-흰색 (색상 배경 내) | **12** | X | `FFFFFF` | 프로젝트 타이틀 on 틸/오렌지 배경 |
| 서브 본문 / 지식 | **10** | X | `404040` | 지식 섹션, 모식도 캡션, 카드 내부 |
| 서브 본문-흰색 | **10** | X | `FFFFFF` | 지식 타이틀 on 밝은 틸 배경 |
| 테이블 셀 | **8** | X | `404040` | 추진 계획표 |
| 페이지 번호 | **8** | X | `404040` | 우하단 |

```javascript
const FONT = 'Pretendard';
const F = {
  title:        { fontSize: 24, fontFace: FONT, bold: true },
  subtitle:     { fontSize: 16, fontFace: FONT },
  panelHeader:  { fontSize: 14, fontFace: FONT },
  body:         { fontSize: 12, fontFace: FONT, lineSpacingMultiple: 1.20 },
  sub:          { fontSize: 10, fontFace: FONT, lineSpacingMultiple: 1.15 },
  tableCell:    { fontSize: 8,  fontFace: FONT },
  pageNum:      { fontSize: 8,  fontFace: FONT },
};
```

---

## 레이아웃 상수

```javascript
const SLIDE_W = 11.6927;
const SLIDE_H = 8.2674;

const LAYOUT = {
  // 여백
  margin: { outer: 0.255, top: 0.249 },

  // ── 제목 영역 (슬라이드 상단) ──
  title: {
    x: 0.255, y: 0.249,
    w: 9.919, titleH: 0.404,
    subtitleY: 0.836, subtitleH: 0.269,
  },

  // ── 좌측 패널 (틸 계열 · 3단 섹션) ──
  panelL: {
    x: 0.255, w: 5.508,
    // 헤더 바 (틸)
    headerY: 1.495, headerH: 0.394,
    headerFill: '006567',
    headerBorder: '1D84AD',
    // 전체 프레임 (테두리만)
    frameY: 1.851, frameH: 5.867,
    // 상단 콘텐츠 (흰 배경)
    upperY: 1.851, upperH: 1.602,
    // 프로젝트(1) 섹션 (틸 배경)
    section1Y: 3.453, section1H: 1.411,
    section1Fill: '006567',
    // 지식 섹션 (밝은 틸 배경)
    knowledgeY: 4.864, knowledgeH: 1.402,
    knowledgeFill: '1EABA3',
    // 프로젝트(2) 섹션 (틸 배경)
    section2Y: 6.276, section2H: 1.442,
    section2Fill: '006567',
  },

  // ── 우측 패널 (오렌지 계열 · 3단 섹션) ──
  panelR: {
    x: 5.910, w: 5.508,
    // 헤더 바 (오렌지)
    headerY: 1.495, headerH: 0.394,
    headerFill: 'F57427',
    headerBorder: 'F57427',
    // 전체 프레임 (테두리만)
    frameY: 1.851, frameH: 5.867,
    // 상단 콘텐츠 (흰 배경)
    upperY: 1.851, upperH: 1.228,
    // 프로젝트 카드 영역 (오렌지 배경)
    cardsY: 3.079, cardsH: 2.906,
    cardsFill: 'F57427',
    // 카드 내부 (2개 나란히, 다크 오렌지 배경)
    card: {
      fill: 'B3510E',
      y: 3.151, h: 2.738,
      leftX: 5.972, leftW: 2.600,
      rightX: 8.719, rightW: 2.600,
      gap: 0.147,   // 카드 사이 간격
    },
    // 하단 콘텐츠 (흰 배경 — 목표 + 계획표)
    lowerY: 5.985, lowerH: 1.733,
  },

  // ── 페이지 번호 ──
  pageNum: { x: 9.1, y: 7.94, w: 1.945, h: 0.165 },
};
```

---

## 좌측 패널 내부 상수 (세부 위치)

```javascript
const LEFT = {
  // 패널 내부 여백
  textX: 0.505,         // 텍스트 시작 X (패널 x + 0.25)
  textW: 2.782,         // 좌측 텍스트 폭 (패널 절반)
  fullTextW: 5.108,     // 전체 너비 텍스트 (패널 w - 0.40)

  // 상단 콘텐츠 (흰 배경)
  upper: {
    textY: 2.001, textH: 1.402,    // 디테일 텍스트 (12pt)
    imageBoxX: 3.009, imageBoxW: 2.701, imageBoxH: 1.474,  // 둥근 사각형 (이미지 영역)
    imageBoxBorder: '1EABA3',
    captionX: 4.192, captionY: 2.070, // "그림/그래프/도표 등" 라벨
  },

  // 프로젝트(1) 섹션 (틸 배경)
  section1: {
    titleY: 3.603,         // 프로젝트 타이틀 (12pt 흰색)
    detailY: 3.975, detailH: 0.818, // 디테일 리스트 (12pt)
  },

  // 지식 섹션 (밝은 틸 배경)
  knowledge: {
    titleY: 4.962,         // "프로젝트 관련 지식을 입력합니다" (10pt 흰색)
    detailY: 5.316, detailH: 0.818, // 지식 리스트 (10pt)
    // 다이어그램 영역 (우측 절반)
    diagramX: 3.048,       // 아이콘/다이어그램 시작 X
    diagramCaptionY: 5.719, // "프로젝트 관련 모식도 등" 라벨
  },

  // 프로젝트(2) 섹션 (틸 배경)
  section2: {
    // 아이콘 그리드 (좌측)
    iconX: 0.455, iconY: 6.490,
    iconSizes: [1.0, 0.802, 0.723, 0.526],  // 아이콘 크기들 (다양)
    // 프로젝트 타이틀 (12pt 흰색)
    titleX: 2.691, titleY: 6.443,
    // 디테일 리스트 (10pt)
    detailX: 2.895, detailY: 6.773, detailH: 0.818,
    // 다이어그램 캡션
    diagramCaptionY: 7.441,
  },
};
```

---

## 우측 패널 내부 상수 (세부 위치)

```javascript
const RIGHT = {
  textX: 6.104,         // 텍스트 시작 X
  textW: 2.509,         // 좌측 카드 텍스트 폭
  textW2: 2.177,        // 카드 내부 텍스트 폭

  // 상단 콘텐츠 (흰 배경)
  upper: {
    textY: 2.043, textH: 0.782,    // 디테일 텍스트 (12pt)
    imageX: 8.632, imageW: 2.716, imageH: 0.736, // 우측 상단 이미지
    imageBoxX: 8.613, imageBoxW: 2.742, imageBoxH: 1.071, // 둥근 사각형
  },

  // 프로젝트 카드 영역 (오렌지 배경)
  cards: {
    // 카드 타이틀 (12pt 흰색)
    titleY: 3.195,
    leftTitleX: 6.104, rightTitleX: 8.879,
    // 카드 디테일 (12pt, 텍스트 색상 자동)
    detailY: 3.500, detailH: 1.118,
    // 카드 하단 — 이미지/차트 영역
    imageY: 4.537,   // "그림/그래프/도표 등" 라벨
    // 다이어그램 영역
    diagramY: 4.816,
    diagramIconX: 6.094,
  },

  // 하단 콘텐츠 (흰 배경)
  lower: {
    // 최종 목표 (좌측)
    goalTitleX: 6.176, goalTitleY: 6.125,   // "연구주제 2 최종 목표" (12pt)
    goalListX: 6.380, goalListY: 6.455, goalListH: 0.818, // 목표 리스트 (10pt)
    // 추진 계획표 (우측)
    tableTitleX: 8.792, tableTitleY: 6.101,  // "연구주제 2 추진 계획표" (12pt)
    tableX: 9.276, tableY: 6.443,
    tableW: 1.962, tableH: 0.933,           // 4x4 테이블
    // 타임라인 다이어그램
    diagramX: 8.616, diagramY: 6.578,
  },
};
```

---

## 헬퍼 함수

### addTitle — 슬라이드 제목 + 부제목

```javascript
function addTitle(slide, mainTitle, subtitle) {
  const T = LAYOUT.title;
  slide.addText(mainTitle, {
    x: T.x, y: T.y, w: T.w, h: T.titleH,
    ...F.title, color: C.titleDark, margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: T.x, y: T.subtitleY, w: T.w, h: T.subtitleH,
      ...F.subtitle, color: C.teal, margin: 0,
    });
  }
}
```

### addPanelFrame — 패널 외곽 프레임 (헤더 바 + 테두리)

```javascript
function addPanelFrame(slide, side, headerText) {
  const P = side === 'L' ? LAYOUT.panelL : LAYOUT.panelR;

  // 전체 프레임 (테두리만)
  slide.addShape('rect', {
    x: P.x, y: P.frameY, w: P.w, h: P.frameH,
    line: { color: P.headerBorder, width: 0.8 },
  });

  // 색상 헤더 바
  slide.addShape('rect', {
    x: P.x, y: P.headerY, w: P.w, h: P.headerH,
    fill: { color: P.headerFill },
    line: { color: P.headerBorder, width: 0.8 },
  });
  slide.addText(headerText, {
    x: P.x + 0.15, y: P.headerY + 0.05, w: P.w - 0.3, h: P.headerH - 0.10,
    ...F.panelHeader, color: C.white, margin: 0,
  });
}
```

### addColorSection — 색상 배경 섹션 (프로젝트/지식)

```javascript
function addColorSection(slide, x, y, w, h, fill, titleText, detailLines, opts) {
  // 색상 배경 사각형
  slide.addShape('rect', {
    x, y, w, h,
    fill: { color: fill },
  });

  // 섹션 타이틀 (흰색)
  const titleFontSize = opts?.titleFontSize || 12;
  if (titleText) {
    slide.addText(titleText, {
      x: x + 0.20, y: y + 0.15, w: w - 0.40, h: 0.258,
      fontSize: titleFontSize, fontFace: FONT,
      color: C.white, margin: 0,
    });
  }

  // 디테일 리스트 (색상 배경 위)
  const detailFontSize = opts?.detailFontSize || 12;
  const detailColor = opts?.detailColor || C.white;
  if (detailLines) {
    slide.addText(detailLines.join('\n'), {
      x: x + 0.25, y: y + 0.52, w: (opts?.detailW || w * 0.50), h: h - 0.60,
      fontSize: detailFontSize, fontFace: FONT,
      color: detailColor, margin: 0, valign: 'top',
    });
  }
}
```

### addProjectCards — 프로젝트 카드 2개 (우측 패널)

```javascript
function addProjectCards(slide, card1, card2) {
  const P = LAYOUT.panelR;
  const K = P.card;

  // 오렌지 배경 영역
  slide.addShape('rect', {
    x: P.x, y: P.cardsY, w: P.w, h: P.cardsH,
    fill: { color: P.cardsFill },
  });

  // 카드 1 (좌측, 다크 오렌지)
  slide.addShape('roundRect', {
    x: K.leftX, y: K.y, w: K.leftW, h: K.h,
    fill: { color: K.fill },
    rectRadius: 0.05,
  });

  // 카드 2 (우측, 다크 오렌지)
  slide.addShape('roundRect', {
    x: K.rightX, y: K.y, w: K.rightW, h: K.h,
    fill: { color: K.fill },
    rectRadius: 0.05,
  });

  // 카드 타이틀
  const cards = [
    { ...card1, x: K.leftX + 0.13, detailX: K.leftX + 0.13 },
    { ...card2, x: K.rightX + 0.16, detailX: K.rightX + 0.16 },
  ];
  cards.forEach((c) => {
    slide.addText(c.title, {
      x: c.x, y: 3.195, w: 1.122, h: 0.258,
      ...F.body, color: C.white, margin: 0,
    });
    if (c.details) {
      slide.addText(c.details.join('\n'), {
        x: c.detailX, y: 3.500, w: 2.177, h: 1.118,
        ...F.body, color: C.white, margin: 0, valign: 'top',
      });
    }
  });
}
```

### addScheduleTable — 추진 계획표 (4×4 테이블)

```javascript
function addScheduleTable(slide, title, rows) {
  const R = RIGHT.lower;

  // 테이블 타이틀
  slide.addText(title, {
    x: R.tableTitleX, y: R.tableTitleY, w: 2.396, h: 0.258,
    ...F.body, color: C.textDark, margin: 0,
  });

  // 4x4 테이블
  const tableRows = rows.map(row =>
    row.map(cell => ({
      text: cell,
      options: { ...F.tableCell, color: C.textDark, margin: [2, 4, 2, 4] },
    }))
  );
  slide.addTable(tableRows, {
    x: R.tableX, y: R.tableY, w: R.tableW,
    border: { pt: 0.5, color: C.textDark },
    colW: [0.40, 0.52, 0.52, 0.52],
    rowH: [0.22, 0.22, 0.22, 0.22],
    margin: 0,
  });
}
```

### addImageBox — 둥근 사각형 이미지 영역 (테두리)

```javascript
function addImageBox(slide, x, y, w, h, borderColor) {
  slide.addShape('roundRect', {
    x, y, w, h,
    line: { color: borderColor, width: 1.0 },
    rectRadius: 0.05,
  });
}
```

### addDiagramCaption — 모식도 캡션

```javascript
function addDiagramCaption(slide, x, y, text) {
  slide.addText(text || '프로젝트 관련 모식도 등', {
    x, y, w: 1.636, h: 0.267,
    ...F.sub, color: C.textDark, margin: 0,
  });
}
```

### addPageNum — 페이지 번호

```javascript
function addPageNum(slide, n) {
  const PN = LAYOUT.pageNum;
  slide.addText(String(n), {
    x: PN.x, y: PN.y, w: PN.w, h: PN.h,
    ...F.pageNum, color: C.textDark, align: 'right', margin: 0,
  });
}
```

---

## 슬라이드 구성 패턴

### 기본 구조 (전체 슬라이드)

```
┌────────────────────────────────────────────────────────┐
│  메인 제목 (24pt bold, #484848)                         │ y=0.25
│  부제목 (16pt, #006567)                                 │ y=0.84
├──────────────────────┬─────────────────────────────────┤
│  [틸 헤더 바 #006567] │  [오렌지 헤더 바 #F57427]        │ y=1.50
│  14pt white          │  14pt white                     │ h=0.39
├──────────────────────┼─────────────────────────────────┤
│  상단 콘텐츠 (흰 배경) │  상단 콘텐츠 (흰 배경)           │ y=1.85
│  디테일(12pt) + 이미지  │  디테일(12pt) + 이미지           │ h≈1.23
│  [둥근 사각형 #1EABA3]  │  [둥근 사각형 이미지박스]        │
├──────────────────────┼─────────────────────────────────┤
│  프로젝트(1) #006567  │  ┌─────────┬─────────┐         │ y≈3.08
│  타이틀(12pt 흰) +     │  │카드1     │카드2     │         │
│  디테일(12pt)          │  │#B3510E  │#B3510E  │         │
│  h=1.41               │  │12pt 흰색 │12pt 흰색│         │
├──────────────────────┤  │         │         │         │
│  지식 섹션 #1EABA3    │  │이미지    │이미지    │         │
│  타이틀(10pt 흰) +     │  └─────────┴─────────┘         │ y≈5.99
│  지식(10pt) + 모식도   │─────────────────────────────────┤
│  h=1.40               │  목표 제목(12pt) │ 계획표 제목    │ y≈6.10
├──────────────────────┤  목표 리스트     │ 4×4 테이블     │
│  프로젝트(2) #006567  │  (10pt)         │ (8pt)          │
│  아이콘 + 타이틀(12pt) │  다이어그램      │ 타임라인 아이콘 │
│  디테일(10pt) + 모식도 │                 │                │
│  h=1.44               │                 │                │
└──────────────────────┴─────────────────────────── [1] ─┘ y=7.94
```

### 좌측 패널 구성 요소 (연구주제·방법론)

1. **헤더 바** (틸 `#006567`): 연구주제 제목 (14pt 흰색)
2. **상단 콘텐츠** (흰 배경):
   - 좌: 디테일 텍스트 (12pt, 3-5줄)
   - 우: 둥근 사각형 이미지 영역 (테두리 `#1EABA3`, 아이콘 + 차트)
3. **프로젝트(1) 섹션** (틸 배경 `#006567`, h=1.41):
   - 프로젝트 타이틀 (12pt 흰색)
   - 디테일 리스트 (12pt, 좌측 절반)
4. **지식 섹션** (밝은 틸 배경 `#1EABA3`, h=1.40):
   - "프로젝트 관련 지식을 입력합니다" 타이틀 (10pt 흰색)
   - 지식 리스트 (10pt, 좌측 절반)
   - 다이어그램/모식도 (우측 절반, 아이콘 그리드)
5. **프로젝트(2) 섹션** (틸 배경 `#006567`, h=1.44):
   - 아이콘 그리드 (좌측, 다양한 크기 1.0"~0.53")
   - 프로젝트 타이틀 (12pt 흰색)
   - 디테일 리스트 (10pt)
   - 다이어그램 캡션

### 우측 패널 구성 요소 (결과·검증)

1. **헤더 바** (오렌지 `#F57427`): 연구주제 제목 (14pt 흰색)
2. **상단 콘텐츠** (흰 배경):
   - 좌: 디테일 텍스트 (12pt)
   - 우: 둥근 사각형 + 이미지/스크린샷
3. **프로젝트 카드 영역** (오렌지 배경 `#F57427`, h=2.91):
   - 카드 2개 나란히 (다크 오렌지 `#B3510E`, 2.60" × 2.74")
   - 카드 내부: 타이틀(12pt 흰) + 디테일(12pt) + 이미지/차트 영역
   - 카드 간격: 0.15"
4. **하단 콘텐츠** (흰 배경):
   - 좌측: 최종 목표 타이틀(12pt) + 목표 리스트(10pt)
   - 우측: 추진 계획표 타이틀(12pt) + 4×4 테이블(8pt) + 타임라인 아이콘

---

## 이미지/다이어그램 배치 규격

| 요소 | 크기 | 위치 | 비고 |
|------|------|------|------|
| 패널 내 아이콘 (대) | **0.47" × 0.47"** | 이미지 박스 상단 | 2개 나란히 |
| 패널 내 아이콘 (중) | **0.33" × 0.33"** | 다이어그램 노드 | 연결 요소 |
| 패널 내 아이콘 (소) | **0.29" × 0.29"** | 모식도 내부 | 보조 노드 |
| 프로젝트 아이콘 (대) | **1.0" × 1.0"** | 프로젝트(2) 좌측 | 메인 아이콘 |
| 프로젝트 아이콘 (중) | **0.80" × 0.80"** | 프로젝트(2) 좌측 | 보조 아이콘 |
| 카드 이미지 (차트) | **1.67" × 0.94"** | 카드 하단 | 차트/그래프 |
| 상단 이미지 (스크린샷) | **2.72" × 0.74"** | 우측 상단 | 데모/스크린샷 |
| 타임라인 아이콘 | **0.55" × 0.55"** | 계획표 좌측 | 보조 시각화 |
| 장식 도트 | **0.04"~0.06"** | 다이어그램 연결 | `#F8D8CD` 채움 |

---

## Dense System과 비교

| 항목 | Reports Style (v2) | Dense System |
|------|---------------------|--------------|
| 캔버스 | **11.69" × 8.27"** | 10" × 5.625" |
| 색상 수 | **8색 체계** | 14색 풍부 |
| 좌/우 구분 | **틸 vs 오렌지** (의미 기반) | 동일 컬러 |
| 제목 | **24pt** (상단 영역) | 30pt (표지), 11pt (헤더) |
| 본문 | **12pt** (10pt 보조) | 9pt |
| 섹션 구조 | **3단 색상 섹션** (패널당) | 2단 (상/하) |
| 프로젝트 카드 | **2개 나란히** (다크 오렌지) | 없음 |
| 테이블 | **4×4 스케줄 테이블** (8pt) | miniTable 컴포넌트 |
| 이미지 밀도 | **매우 높음** (16+ 이미지) | 낮음 (로고 위주) |
| 다이어그램 | **아이콘 그리드 + 연결선** | 없음 |
| 최적 용도 | **기술 보고서, 연구 과제 개요** | 연구 발표, 요약 |

---

## 사용 가이드

이 스타일은 다음 상황에 적합:

1. **연구 과제 개요** — 연구주제 2개 + 프로젝트 4개를 한 슬라이드에 정리
2. **기술 보고서** — 시스템 아키텍처 + 추진 계획 병행
3. **내부 발표** — 좌측(연구배경·방법론) + 우측(결과·검증·일정)
4. **다이어그램/모식도가 많은** 발표 — 아이콘 그리드 영역 활용
5. **프로젝트 카드 기반** 발표 — 여러 하위 프로젝트 비교

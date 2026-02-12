/**
 * ===================================================================
 *  Asan Medical Center — Reports Style Reference (v2)
 *  AMC_ReportsStyle_Reference.pptx 기반 · 대형 캔버스 · 듀얼패널 · 멀티섹션
 * ===================================================================
 *
 *  실행:  node pptxgenjs-reference-reports.js
 *  출력:  AMC_ReportsStyle_v2.pptx
 *
 *  이 스크립트는 새 레퍼런스 템플릿의 레이아웃을 정확히 재현합니다:
 *    - 11.6927" × 8.2674" 캔버스 (√2 비율)
 *    - 8색 팔레트: teal/tealBright/orange/orangeDark + 텍스트 색상
 *    - 좌측 패널: 헤더 → 상단 → 프로젝트(1) → 지식 → 프로젝트(2)
 *    - 우측 패널: 헤더 → 상단 → 프로젝트 카드 2개 → 목표 + 계획표
 *    - 폰트: Pretendard 24/16/14/12/10/8pt
 */

const PptxGenJS = require('pptxgenjs');

// ── 1. 색상 팔레트 ─────────────────────────────────────────
const C = {
  titleDark:   '484848',
  textDark:    '404040',
  white:       'FFFFFF',
  teal:        '006567',
  tealBorder:  '1D84AD',
  tealBright:  '1EABA3',
  orange:      'F57427',
  orangeDark:  'B3510E',
  peach:       'F8D8CD',
};

// ── 2. 타이포그래피 ────────────────────────────────────────
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

// ── 3. 레이아웃 상수 ───────────────────────────────────────
const SLIDE_W = 11.6927;
const SLIDE_H = 8.2674;

const LAYOUT = {
  margin: { outer: 0.255, top: 0.249 },

  title: {
    x: 0.255, y: 0.249,
    w: 9.919, titleH: 0.404,
    subtitleY: 0.836, subtitleH: 0.269,
  },

  panelL: {
    x: 0.255, w: 5.508,
    headerY: 1.495, headerH: 0.394,
    headerFill: '006567', headerBorder: '1D84AD',
    frameY: 1.851, frameH: 5.867,
    upperY: 1.851, upperH: 1.602,
    section1Y: 3.453, section1H: 1.411, section1Fill: '006567',
    knowledgeY: 4.864, knowledgeH: 1.402, knowledgeFill: '1EABA3',
    section2Y: 6.276, section2H: 1.442, section2Fill: '006567',
  },

  panelR: {
    x: 5.910, w: 5.508,
    headerY: 1.495, headerH: 0.394,
    headerFill: 'F57427', headerBorder: 'F57427',
    frameY: 1.851, frameH: 5.867,
    upperY: 1.851, upperH: 1.228,
    cardsY: 3.079, cardsH: 2.906, cardsFill: 'F57427',
    card: {
      fill: 'B3510E',
      y: 3.151, h: 2.738,
      leftX: 5.972, leftW: 2.600,
      rightX: 8.719, rightW: 2.600,
    },
    lowerY: 5.985, lowerH: 1.733,
  },

  pageNum: { x: 9.1, y: 7.94, w: 1.945, h: 0.165 },
};

// ── 4. 헬퍼 함수 ──────────────────────────────────────────

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

function addColorSection(slide, x, y, w, h, fill, titleText, detailLines, opts = {}) {
  slide.addShape('rect', {
    x, y, w, h,
    fill: { color: fill },
  });

  const titleFontSize = opts.titleFontSize || 12;
  if (titleText) {
    slide.addText(titleText, {
      x: x + 0.20, y: y + 0.15, w: w - 0.40, h: 0.258,
      fontSize: titleFontSize, fontFace: FONT,
      color: C.white, margin: 0,
    });
  }

  const detailFontSize = opts.detailFontSize || 12;
  const detailColor = opts.detailColor || C.white;
  if (detailLines && detailLines.length) {
    slide.addText(detailLines.join('\n'), {
      x: x + 0.25, y: y + 0.52, w: (opts.detailW || w * 0.50), h: h - 0.60,
      fontSize: detailFontSize, fontFace: FONT,
      color: detailColor, margin: 0, valign: 'top',
    });
  }
}

function addProjectCards(slide, card1, card2) {
  const P = LAYOUT.panelR;
  const K = P.card;

  // 오렌지 배경
  slide.addShape('rect', {
    x: P.x, y: P.cardsY, w: P.w, h: P.cardsH,
    fill: { color: P.cardsFill },
  });

  // 카드 1 (다크 오렌지 둥근 사각형)
  slide.addShape('roundRect', {
    x: K.leftX, y: K.y, w: K.leftW, h: K.h,
    fill: { color: K.fill }, rectRadius: 0.05,
  });

  // 카드 2 (다크 오렌지 둥근 사각형)
  slide.addShape('roundRect', {
    x: K.rightX, y: K.y, w: K.rightW, h: K.h,
    fill: { color: K.fill }, rectRadius: 0.05,
  });

  // 카드 콘텐츠
  const cards = [
    { ...card1, tx: K.leftX + 0.13 },
    { ...card2, tx: K.rightX + 0.16 },
  ];
  cards.forEach((c) => {
    // 카드 타이틀
    slide.addText(c.title, {
      x: c.tx, y: 3.195, w: 1.122, h: 0.258,
      ...F.body, color: C.white, margin: 0,
    });
    // 카드 디테일
    if (c.details) {
      slide.addText(c.details.join('\n'), {
        x: c.tx, y: 3.500, w: 2.177, h: 1.118,
        ...F.body, color: C.white, margin: 0, valign: 'top',
      });
    }
    // 카드 하단 라벨 (이미지 자리)
    slide.addText('그림/그래프/도표 등', {
      x: c.tx + 0.80, y: 4.537, w: 1.424, h: 0.286,
      ...F.sub, color: C.white, margin: 0,
    });
  });
}

function addScheduleTable(slide, title, rows) {
  // 타이틀
  slide.addText(title, {
    x: 8.792, y: 6.101, w: 2.396, h: 0.258,
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
    x: 9.276, y: 6.443, w: 1.962,
    border: { pt: 0.5, color: C.textDark },
    colW: [0.40, 0.52, 0.52, 0.52],
    rowH: [0.22, 0.22, 0.22, 0.22],
    margin: 0,
  });
}

function addImageBox(slide, x, y, w, h, borderColor) {
  slide.addShape('roundRect', {
    x, y, w, h,
    line: { color: borderColor, width: 1.0 },
    rectRadius: 0.05,
  });
}

function addDiagramCaption(slide, x, y, text) {
  slide.addText(text || '프로젝트 관련 모식도 등', {
    x, y, w: 1.636, h: 0.267,
    ...F.sub, color: C.textDark, margin: 0,
  });
}

function addPageNum(slide, n) {
  const PN = LAYOUT.pageNum;
  slide.addText(String(n), {
    x: PN.x, y: PN.y, w: PN.w, h: PN.h,
    ...F.pageNum, color: C.textDark, align: 'right', margin: 0,
  });
}

// ── 5. 프레젠테이션 생성 ──────────────────────────────────

const pres = new PptxGenJS();
pres.defineLayout({ name: 'REPORTS_WIDE', width: SLIDE_W, height: SLIDE_H });
pres.layout = 'REPORTS_WIDE';

// ===================== SLIDE 1 — 풀 레이아웃 레퍼런스 =====================
{
  const slide = pres.addSlide();

  // ── 제목 ──
  addTitle(slide,
    '아산 리포트 스타일 레퍼런스 (Reports Style Reference)',
    '기술 보고서 스타일 — 대형 캔버스 + 듀얼패널(틸/오렌지) 레이아웃'
  );

  // ── 좌측 패널 ──
  addPanelFrame(slide, 'L', '연구주제 (1) 을 입력합니다. (Pretendard 폰트, size-14, Regular)');

  // 좌측 상단 (흰 배경) — 디테일 텍스트
  slide.addText(
    '연구주제 (1)의 디테일을 정의합니다:\n'
    + '1. 연구 주제 디테일 (1)\n'
    + '2. 연구 주제 디테일 (2)\n'
    + '3. 연구 주제 디테일 (3)',
    {
      x: 0.505, y: 2.001, w: 2.509, h: 1.402,
      ...F.body, color: C.textDark, margin: 0, valign: 'top',
    }
  );

  // 좌측 상단 — 이미지 박스 (둥근 사각형, #1EABA3 테두리)
  addImageBox(slide, 3.009, 1.929, 2.701, 1.474, C.tealBright);
  slide.addText('그림/그래프/도표 등', {
    x: 4.192, y: 2.070, w: 1.424, h: 0.286,
    ...F.body, color: C.textDark, margin: 0,
  });

  // 좌측 프로젝트(1) 섹션 (#006567)
  addColorSection(slide,
    LAYOUT.panelL.x, LAYOUT.panelL.section1Y,
    LAYOUT.panelL.w, LAYOUT.panelL.section1H,
    LAYOUT.panelL.section1Fill,
    '여기에 프로젝트 타이틀 (1) 을 입력합니다. (Pretendard 폰트, size-12)',
    ['1. 프로젝트(1) 디테일 (1)', '2. 프로젝트(1) 디테일 (2)', '3. 프로젝트(1) 디테일 (3)-opt'],
    { detailW: 2.782 }
  );

  // 좌측 지식 섹션 (#1EABA3)
  addColorSection(slide,
    LAYOUT.panelL.x, LAYOUT.panelL.knowledgeY,
    LAYOUT.panelL.w, LAYOUT.panelL.knowledgeH,
    LAYOUT.panelL.knowledgeFill,
    '프로젝트 관련 지식을 입력합니다.',
    ['1. 프로젝트 관련 지식 (1)', '2. 프로젝트 관련 지식 (2)', '3. 프로젝트 관련 지식 (3)-option ……'],
    { titleFontSize: 10, detailFontSize: 10, detailW: 2.782 }
  );

  // 좌측 지식 — 다이어그램 캡션
  addDiagramCaption(slide, 3.696, 5.719);

  // 좌측 프로젝트(2) 섹션 (#006567)
  addColorSection(slide,
    LAYOUT.panelL.x, LAYOUT.panelL.section2Y,
    LAYOUT.panelL.w, LAYOUT.panelL.section2H,
    LAYOUT.panelL.section2Fill,
    null, null
  );
  // 프로젝트(2) 타이틀 (아이콘 영역 우측에 배치)
  slide.addText('여기에 프로젝트 타이틀 (2) 을 입력합니다.', {
    x: 2.691, y: 6.443, w: 2.892, h: 0.258,
    ...F.body, color: C.white, margin: 0,
  });

  // 프로젝트(2) 디테일 (10pt)
  slide.addText(
    '1. 프로젝트(2) 디테일 (1)\n'
    + '2. 프로젝트(2) 디테일 (2)\n'
    + '3. 프로젝트(2) 디테일 (3)-opt',
    {
      x: 2.895, y: 6.773, w: 2.782, h: 0.818,
      ...F.sub, color: C.white, margin: 0, valign: 'top',
    }
  );

  // 프로젝트(2) 다이어그램 캡션
  addDiagramCaption(slide, 1.158, 7.441);

  // ── 우측 패널 ──
  addPanelFrame(slide, 'R', '연구주제 (2) 을 입력합니다. (Pretendard 폰트, size-14, Regular)');

  // 우측 상단 (흰 배경) — 디테일 텍스트
  slide.addText(
    '연구주제 (2)의 디테일을 정의합니다:\n'
    + '1. 연구 주제 2 디테일 (1)\n'
    + '2. 연구 주제 2 디테일 (2)',
    {
      x: 6.104, y: 2.043, w: 2.509, h: 0.782,
      ...F.body, color: C.textDark, margin: 0, valign: 'top',
    }
  );

  // 우측 상단 — 이미지 박스 (둥근 사각형)
  addImageBox(slide, 8.613, 1.956, 2.742, 1.071, C.textDark);

  // ── 프로젝트 카드 2개 ──
  addProjectCards(slide,
    {
      title: '프로젝트 카드 1',
      details: [
        '1. 프로젝트(1) 디테일 (1)',
        '2. 프로젝트(1) 디테일 (2)',
        '3. 프로젝트(1) 디테일 (3)-opt',
      ],
    },
    {
      title: '프로젝트 카드 2',
      details: [
        '1. 프로젝트(2) 디테일 (1)',
        '2. 프로젝트(2) 디테일 (2)',
        '3. 프로젝트(2) 디테일 (3)-opt',
      ],
    }
  );

  // ── 우측 하단 — 최종 목표 ──
  slide.addText('연구주제 2 최종 목표를 입력합니다.', {
    x: 6.176, y: 6.125, w: 2.892, h: 0.258,
    ...F.body, color: C.textDark, margin: 0,
  });
  slide.addText(
    '1. 연구주제 2 최종목표 (1)\n'
    + '2. 연구주제 2 최종목표 (2)\n'
    + '3. 연구주제 2 최종목표 (3)-opt',
    {
      x: 6.380, y: 6.455, w: 1.648, h: 0.818,
      ...F.sub, color: C.textDark, margin: 0, valign: 'top',
    }
  );

  // ── 우측 하단 — 추진 계획표 ──
  addScheduleTable(slide, '연구주제 2 추진 계획표', [
    ['기간',  '1',       '2',     '3'],
    ['1',     '1 추진',  '계획',  '입력'],
    ['2',     '2 추진',  '계획',  '입력'],
    ['3',     '3 추진',  '계획',  '입력'],
  ]);

  // ── 장식 도트 (#F8D8CD) ──
  [
    { x: 9.140, y: 6.774, s: 0.039 },
    { x: 8.995, y: 6.975, s: 0.059 },
    { x: 8.965, y: 7.230, s: 0.059 },
  ].forEach(d => {
    slide.addShape('ellipse', {
      x: d.x, y: d.y, w: d.s, h: d.s,
      fill: { color: C.peach },
    });
  });

  // ── 페이지 번호 ──
  addPageNum(slide, 1);
}


// ===================== SLIDE 2 — 변형: 텍스트 중심 =====================
{
  const slide = pres.addSlide();

  addTitle(slide,
    'LLM 기반 TNM 병기 판정 시스템',
    '다중 에이전트 아키텍처와 임상 검증 결과'
  );

  // ── 좌측 패널 ──
  addPanelFrame(slide, 'L', '시스템 아키텍처 및 방법론');

  // 좌측 상단 — 디테일
  slide.addText(
    '다중 에이전트 기반 TNM staging:\n'
    + '1. 문서 파싱 에이전트 (병리 보고서)\n'
    + '2. 룰 기반 분류 에이전트\n'
    + '3. LLM 검증 에이전트 (GPT-4o)',
    {
      x: 0.505, y: 2.001, w: 2.509, h: 1.402,
      ...F.body, color: C.textDark, margin: 0, valign: 'top',
    }
  );
  addImageBox(slide, 3.009, 1.929, 2.701, 1.474, C.tealBright);
  slide.addText('시스템 아키텍처 다이어그램', {
    x: 3.300, y: 2.500, w: 2.100, h: 0.286,
    ...F.body, color: C.textDark, margin: 0, align: 'center',
  });

  // 프로젝트(1): 데이터 파이프라인
  addColorSection(slide,
    LAYOUT.panelL.x, LAYOUT.panelL.section1Y,
    LAYOUT.panelL.w, LAYOUT.panelL.section1H,
    LAYOUT.panelL.section1Fill,
    '데이터 파이프라인 구축',
    ['1. FHIR 기반 데이터 추출 (병리/영상)', '2. 비정형 텍스트 전처리 (NER)', '3. 구조화 데이터 변환 (JSON)'],
    { detailW: 2.782 }
  );

  // 지식: 관련 표준
  addColorSection(slide,
    LAYOUT.panelL.x, LAYOUT.panelL.knowledgeY,
    LAYOUT.panelL.w, LAYOUT.panelL.knowledgeH,
    LAYOUT.panelL.knowledgeFill,
    'TNM Staging 관련 지식',
    ['1. AJCC 8th Edition 분류 기준', '2. WHO Classification 2022', '3. 기관별 변이 처리 프로토콜'],
    { titleFontSize: 10, detailFontSize: 10, detailW: 2.782 }
  );
  addDiagramCaption(slide, 3.696, 5.719, 'TNM 분류 의사결정 트리');

  // 프로젝트(2): 검증 체계
  addColorSection(slide,
    LAYOUT.panelL.x, LAYOUT.panelL.section2Y,
    LAYOUT.panelL.w, LAYOUT.panelL.section2H,
    LAYOUT.panelL.section2Fill,
    null, null
  );
  slide.addText('검증 체계 및 품질 관리', {
    x: 2.691, y: 6.443, w: 2.892, h: 0.258,
    ...F.body, color: C.white, margin: 0,
  });
  slide.addText(
    '1. 전문가 합의 기반 Gold Standard\n'
    + '2. Cohen\'s Kappa 일치도 분석\n'
    + '3. 에러 분류 및 피드백 루프',
    {
      x: 2.895, y: 6.773, w: 2.782, h: 0.818,
      ...F.sub, color: C.white, margin: 0, valign: 'top',
    }
  );
  addDiagramCaption(slide, 1.158, 7.441, '검증 프로세스 흐름도');

  // ── 우측 패널 ──
  addPanelFrame(slide, 'R', '임상 검증 결과 및 성과');

  // 우측 상단 — 성과 요약
  slide.addText(
    '주요 성과 지표:\n'
    + '1. TNM 판정 정확도 94.2%\n'
    + '2. 처리 시간 78% 단축',
    {
      x: 6.104, y: 2.043, w: 2.509, h: 0.782,
      ...F.body, color: C.textDark, margin: 0, valign: 'top',
    }
  );
  addImageBox(slide, 8.613, 1.956, 2.742, 1.071, C.textDark);

  // 프로젝트 카드
  addProjectCards(slide,
    {
      title: '위암 TNM',
      details: ['1. T-stage 정확도: 96.1%', '2. N-stage 정확도: 91.8%', '3. M-stage 정확도: 98.5%'],
    },
    {
      title: '대장암 TNM',
      details: ['1. T-stage 정확도: 93.7%', '2. N-stage 정확도: 89.4%', '3. M-stage 정확도: 97.2%'],
    }
  );

  // 최종 목표
  slide.addText('임상 적용 최종 목표', {
    x: 6.176, y: 6.125, w: 2.892, h: 0.258,
    ...F.body, color: C.textDark, margin: 0,
  });
  slide.addText(
    '1. 실시간 자동 병기 판정\n'
    + '2. 전자의무기록 연동\n'
    + '3. 다기관 확대 적용',
    {
      x: 6.380, y: 6.455, w: 1.648, h: 0.818,
      ...F.sub, color: C.textDark, margin: 0, valign: 'top',
    }
  );

  // 추진 계획표
  addScheduleTable(slide, 'TNM 시스템 추진 계획표', [
    ['기간',  'Q1',      'Q2',     'Q3'],
    ['Phase1', '데이터',  '모델',   '검증'],
    ['Phase2', '파일럿',  '개선',   '확대'],
    ['Phase3', '연동',    '운영',   '모니터'],
  ]);

  // 장식 도트
  [
    { x: 9.140, y: 6.774, s: 0.039 },
    { x: 8.995, y: 6.975, s: 0.059 },
    { x: 8.965, y: 7.230, s: 0.059 },
  ].forEach(d => {
    slide.addShape('ellipse', {
      x: d.x, y: d.y, w: d.s, h: d.s,
      fill: { color: C.peach },
    });
  });

  addPageNum(slide, 2);
}


// ===================== SLIDE 3 — 변형: 이미지 영역 강조 =====================
{
  const slide = pres.addSlide();

  addTitle(slide,
    'Few-Shot Medical Image Segmentation',
    'SAM2 기반 소수 샘플 학습 및 3D 볼류메트릭 분석'
  );

  // ── 좌측 패널 ──
  addPanelFrame(slide, 'L', '연구배경: 의료 영상 세그멘테이션의 한계');

  // 상단 콘텐츠
  slide.addText(
    '기존 방법의 한계:\n'
    + '1. 대규모 라벨링 데이터 필요\n'
    + '2. 도메인 특이성 부족\n'
    + '3. 3D 볼류메트릭 지원 부재',
    {
      x: 0.505, y: 2.001, w: 2.509, h: 1.402,
      ...F.body, color: C.textDark, margin: 0, valign: 'top',
    }
  );
  addImageBox(slide, 3.009, 1.929, 2.701, 1.474, C.tealBright);
  slide.addText('SAM2 아키텍처', {
    x: 3.600, y: 2.500, w: 1.800, h: 0.286,
    ...F.body, color: C.textDark, margin: 0, align: 'center',
  });

  // 프로젝트(1): FS-MedSAM2
  addColorSection(slide,
    LAYOUT.panelL.x, LAYOUT.panelL.section1Y,
    LAYOUT.panelL.w, LAYOUT.panelL.section1H,
    LAYOUT.panelL.section1Fill,
    'FS-MedSAM2 모델 개발',
    ['1. Few-shot 프롬프트 설계', '2. 3D 슬라이스 전파 알고리즘', '3. 멀티스케일 어텐션 구조'],
    { detailW: 2.782 }
  );

  // 지식: 관련 연구
  addColorSection(slide,
    LAYOUT.panelL.x, LAYOUT.panelL.knowledgeY,
    LAYOUT.panelL.w, LAYOUT.panelL.knowledgeH,
    LAYOUT.panelL.knowledgeFill,
    '관련 연구 및 기술 동향',
    ['1. SAM (Segment Anything Model)', '2. MedSAM / SAM-Med3D', '3. Few-shot Semantic Segmentation'],
    { titleFontSize: 10, detailFontSize: 10, detailW: 2.782 }
  );
  addDiagramCaption(slide, 3.696, 5.719, '모델 학습 파이프라인');

  // 프로젝트(2): 임상 적용
  addColorSection(slide,
    LAYOUT.panelL.x, LAYOUT.panelL.section2Y,
    LAYOUT.panelL.w, LAYOUT.panelL.section2H,
    LAYOUT.panelL.section2Fill,
    null, null
  );
  slide.addText('임상 데이터 적용 및 평가', {
    x: 2.691, y: 6.443, w: 2.892, h: 0.258,
    ...F.body, color: C.white, margin: 0,
  });
  slide.addText(
    '1. 간 종양 세그멘테이션\n'
    + '2. 폐 결절 검출\n'
    + '3. 심장 MRI 분석',
    {
      x: 2.895, y: 6.773, w: 2.782, h: 0.818,
      ...F.sub, color: C.white, margin: 0, valign: 'top',
    }
  );
  addDiagramCaption(slide, 1.158, 7.441, '장기별 성능 비교');

  // ── 우측 패널 ──
  addPanelFrame(slide, 'R', '실험 결과: Dice Score 및 임상 검증');

  // 상단 콘텐츠
  slide.addText(
    '벤치마크 데이터셋:\n'
    + '1. BTCV (복부 13장기)\n'
    + '2. ACDC (심장 MRI)',
    {
      x: 6.104, y: 2.043, w: 2.509, h: 0.782,
      ...F.body, color: C.textDark, margin: 0, valign: 'top',
    }
  );
  addImageBox(slide, 8.613, 1.956, 2.742, 1.071, C.textDark);

  // 프로젝트 카드
  addProjectCards(slide,
    {
      title: 'BTCV 결과',
      details: ['1. 1-shot Dice: 0.847', '2. 5-shot Dice: 0.912', '3. SOTA 대비 +4.2%'],
    },
    {
      title: 'ACDC 결과',
      details: ['1. 1-shot Dice: 0.891', '2. 5-shot Dice: 0.934', '3. SOTA 대비 +3.8%'],
    }
  );

  // 최종 목표
  slide.addText('세그멘테이션 연구 최종 목표', {
    x: 6.176, y: 6.125, w: 2.892, h: 0.258,
    ...F.body, color: C.textDark, margin: 0,
  });
  slide.addText(
    '1. 범용 의료 세그멘테이션 모델\n'
    + '2. 실시간 인터랙티브 세그멘테이션\n'
    + '3. PACS 통합 플러그인',
    {
      x: 6.380, y: 6.455, w: 1.648, h: 0.818,
      ...F.sub, color: C.textDark, margin: 0, valign: 'top',
    }
  );

  // 추진 계획표
  addScheduleTable(slide, '세그멘테이션 추진 계획표', [
    ['기간',  'Y1',      'Y2',     'Y3'],
    ['모델',  '개발',    '최적화', '배포'],
    ['데이터', '수집',   '증강',   '검증'],
    ['임상',  '파일럿',  '적용',   '확대'],
  ]);

  // 장식 도트
  [
    { x: 9.140, y: 6.774, s: 0.039 },
    { x: 8.995, y: 6.975, s: 0.059 },
    { x: 8.965, y: 7.230, s: 0.059 },
  ].forEach(d => {
    slide.addShape('ellipse', {
      x: d.x, y: d.y, w: d.s, h: d.s,
      fill: { color: C.peach },
    });
  });

  addPageNum(slide, 3);
}


// ── 6. 저장 + 후처리 (pptxgenjs Content_Types 버그 패치) ──

const OUTPUT = 'AMC_ReportsStyle_v2.pptx';
pres.writeFile({ fileName: OUTPUT })
  .then(() => fixPptxXml(OUTPUT))
  .catch(err => console.error('❌ Error:', err));

/**
 * pptxgenjs 4.x 후처리: 두 가지 OOXML 호환성 버그 수정
 *
 * Bug 1: Content_Types.xml에 slideMaster2/3/... 엔트리 등록하지만
 *         실제 파일은 slideMaster1.xml 하나만 생성 → 복구 경고
 *
 * Bug 2: 모든 shape의 <p:spPr> 내부에 빈 <a:ln></a:ln> 태그 생성
 *         PowerPoint가 이를 malformed로 판단 → 해당 shape 제거 후 복구
 *         수정: <a:ln></a:ln> → <a:ln><a:noFill/></a:ln> (명시적 선 없음)
 *
 * Bug 3: 빈 <a:latin/>, <a:ea/>, <a:cs/> 태그도 제거
 */
async function fixPptxXml(filePath) {
  const fs = require('fs');
  const JSZip = (await import('jszip')).default || require('jszip');

  const data = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(data);
  let patched = false;

  // ── Bug 1: Content_Types.xml slideMaster 엔트리 제거 ──
  const ctFile = zip.file('[Content_Types].xml');
  if (ctFile) {
    let ct = await ctFile.async('string');
    const ctOrig = ct;
    for (let i = 2; i <= 20; i++) {
      ct = ct.replace(
        `<Override PartName="/ppt/slideMasters/slideMaster${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>`,
        ''
      );
    }
    if (ct !== ctOrig) {
      zip.file('[Content_Types].xml', ct);
      patched = true;
      console.log('  → Content_Types.xml: slideMaster 엔트리 제거');
    }
  }

  // ── Bug 2 & 3: 슬라이드 XML에서 빈 태그 수정 ──
  const slideFiles = Object.keys(zip.files).filter(
    f => f.match(/^ppt\/slides\/slide\d+\.xml$/)
  );

  for (const sf of slideFiles) {
    let xml = await zip.file(sf).async('string');
    const xmlOrig = xml;

    // 빈 <a:ln></a:ln> → 명시적 noFill 선 정의
    xml = xml.replace(/<a:ln><\/a:ln>/g, '<a:ln><a:noFill/></a:ln>');
    // 빈 <a:ln/> 셀프클로징도 동일 처리
    xml = xml.replace(/<a:ln\/>/g, '<a:ln><a:noFill/></a:ln>');

    if (xml !== xmlOrig) {
      zip.file(sf, xml);
      patched = true;
      const count = (xmlOrig.match(/<a:ln><\/a:ln>/g) || []).length
                  + (xmlOrig.match(/<a:ln\/>/g) || []).length;
      console.log(`  → ${sf}: ${count}개 빈 <a:ln> 태그 수정`);
    }
  }

  // ── 저장 ──
  if (patched) {
    const fixed = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
    fs.writeFileSync(filePath, fixed);
    console.log(`✅ Created: ${OUTPUT} (XML patched)`);
  } else {
    console.log(`✅ Created: ${OUTPUT}`);
  }
}

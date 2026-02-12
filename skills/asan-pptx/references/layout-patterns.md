# Asan PPT Layout Patterns — Dense System 코드 예시

각 레이아웃 패턴의 전체 pptxgenjs 코드. SKILL.md의 상수(C, LAYOUT, F)와 헬퍼(addHeader, addPage, box, miniTable, workflowDiagram, badge, divider)가 이미 정의되어 있다고 가정한다.

> **Dense System 기준**: 헤더 h=0.34, 본문 9pt, 테이블 9pt, 2-column 그리드 (좌 x=0.28 w=4.63, 우 x=5.09 w=4.63)

---

## 1. 표지 슬라이드 (Title Cover)

다크 블루 배경에 제목 + 선택적 키 팩트 박스. 콘텐츠 밀도가 높은 프레젠테이션에 적합.

```javascript
function slideTitleCover(pres) {
  const s = pres.addSlide();
  s.background = { color: C.primaryDark };
  s.addShape('rect', {
    x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
    fill: { color: C.primary, transparency: 28 },
  });

  // 오렌지 강조선
  s.addShape('rect', {
    x: 0.6, y: 1.30, w: 1.1, h: 0.05,
    fill: { color: C.accent },
  });

  // 메인 제목 (28-30pt)
  s.addText('프레젠테이션\n제목을 입력', {
    x: 0.6, y: 1.42, w: 5.5, h: 1.65,
    fontSize: 30, fontFace: FONT, color: C.white, bold: true,
    margin: 0, lineSpacingMultiple: 1.04,
  });

  // 선택: 우측 키 팩트 박스
  s.addShape('roundRect', {
    x: 6.3, y: 1.30, w: 3.3, h: 2.20,
    fill: { color: C.primaryDark },
    line: { color: C.accentSky, width: 0.8 },
    rectRadius: 0.06,
  });
  s.addText([
    { text: 'KEY OVERVIEW\n', options: { fontSize: 9, bold: true, color: C.accentSky } },
    { text: 'Target:  ', options: { fontSize: 8, color: 'AACCDD', bold: true } },
    { text: '대상 설명\n', options: { fontSize: 8, color: C.white } },
    { text: 'Approach:  ', options: { fontSize: 8, color: 'AACCDD', bold: true } },
    { text: '접근 방식\n', options: { fontSize: 8, color: C.white } },
    { text: 'Output:  ', options: { fontSize: 8, color: 'AACCDD', bold: true } },
    { text: '산출물 설명', options: { fontSize: 8, color: C.white } },
  ], {
    x: 6.50, y: 1.40, w: 2.90, h: 2.00,
    margin: 0, valign: 'top', lineSpacingMultiple: 1.30,
  });

  // 부제목
  s.addText('부제목 또는 핵심 메시지를 입력', {
    x: 0.6, y: 3.35, w: 5.5, h: 0.32,
    fontSize: 13, fontFace: FONT, color: C.accentSky, margin: 0,
  });

  // 발표자 정보
  s.addText('서울아산병원  |  발표 컨텍스트  |  날짜', {
    x: 0.6, y: 4.80, w: 6.0, h: 0.28,
    fontSize: 10, fontFace: FONT, color: 'AACCDD', margin: 0,
  });

  // 로고 (흰색)
  s.addImage({ path: LOGO_W, x: 8.15, y: 0.25, w: 1.40, h: 0.42 });
}
```

---

## 2. 2-Column 콘텐츠 (box + miniTable)

좌: box() 스택으로 다중 섹션, 우: miniTable() + box() 조합. 배경/범위/개요 슬라이드에 적합.

```javascript
function slideContent2Col(pres) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addHeader(s, 'Section Title');

  const L = LAYOUT.col.L;
  const R = LAYOUT.col.R;
  const y0 = LAYOUT.col.y;

  // ── 좌측 컬럼 ──
  let yL = y0;
  yL = box(s, L.x, yL, L.w, 1.55, 'Section A', [
    '- 항목 1: 설명 텍스트',
    '- 항목 2: 설명 텍스트',
    '- 항목 3: 설명 텍스트',
    '- 항목 4: 설명 텍스트',
  ], C.accentRed);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 1.30, 'Section B', [
    '- 대상: 설명',
    '- 산출: 설명',
    '- 목표: 설명',
  ], C.secondary);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 1.05, 'Section C', [
    '- 제약 1',
    '- 제약 2',
    '- 제약 3',
  ], C.primaryLight);

  // 하단 배지
  yL += 0.10;
  badge(s, L.x, yL, 'PRIMARY', C.accent);
  s.addText('핵심 메트릭 설명', {
    x: L.x + 0.70, y: yL - 0.01, w: L.w - 0.75, h: 0.22,
    fontSize: 9, fontFace: FONT, color: C.textDark, bold: true, margin: 0,
  });

  // ── 우측 컬럼 ──
  let yR = y0;
  yR = miniTable(s, R.x, yR, R.w, [1.35, R.w - 1.35], [
    ['Item', 'Value'],
    ['항목 1', '값 1'],
    ['항목 2', '값 2'],
    ['항목 3', '값 3'],
    ['항목 4', '값 4'],
  ]);

  yR += 0.12;
  divider(s, R.x, yR, R.w);
  yR += 0.10;

  yR = miniTable(s, R.x, yR, R.w, [1.50, R.w - 1.50], [
    ['Endpoint', 'Measurement'],
    ['지표 1', '측정 방법 1'],
    ['지표 2', '측정 방법 2'],
  ]);

  yR += 0.12;
  yR = box(s, R.x, yR, R.w, 1.10, 'Figure Placeholder', [
    '- 차트/그래프 자리 (추후 교체)',
    '- 이미지 삽입 시 비율 보존 필수',
  ], C.primaryLight);

  addPage(s, 2);
}
```

---

## 3. 워크플로우 슬라이드

좌: box() 설명 스택, 우: workflowDiagram() 수직 플로우차트.

```javascript
function slideWorkflow(pres) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addHeader(s, 'Workflow: Step-by-Step Process');

  const L = LAYOUT.col.L;
  const R = LAYOUT.col.R;
  const y0 = LAYOUT.col.y;

  // ── 좌측: 단계별 설명 ──
  let yL = y0;
  yL = box(s, L.x, yL, L.w, 1.30, 'Steps (with gates)', [
    '1) Input: 입력 데이터 설명',
    '2) Processing: 처리 단계 설명',
    '3) Gate-1: 자동 검증 (schema/규칙)',
    '4) Gate-2: 전문가 검수',
    '5) Output: 최종 산출물',
  ], C.primary);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 1.10, 'QA Rule Examples', [
    '- Schema validation',
    '- 금칙어 검사',
    '- 일관성 검사',
    '- Severity 검증',
  ], C.accent);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 0.80, 'Expert Actions', [
    '- Approve: 그대로 사용',
    '- Revise: 경미 수정',
    '- Reject: 재생성',
  ], C.secondary);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 0.75, 'Audit Fields', [
    '- model/version, timestamps',
    '- reviewer decision, fail reasons',
  ], C.accentRed);

  // ── 우측: 다이어그램 ──
  workflowDiagram(s, R.x, y0, R.w, [
    { text: 'Input\n(Description)', color: C.primaryLight },
    { text: 'Processing\n(Template + Summary)', color: C.primary },
    { text: 'Gate-1: Auto QA\n(Schema + Rules)', color: C.accent },
    { text: 'Gate-2: Expert Review\n(Approve/Revise/Reject)', color: C.secondary },
    { text: 'Final Output\n+ Audit Log', color: C.secondaryLight },
  ]);

  // 다이어그램 하단 보충
  const diagBottom = y0 + 5 * 0.52 + 4 * 0.16;
  if (diagBottom + 0.65 < SLIDE_H) {
    box(s, R.x, diagBottom + 0.10, R.w, 0.70, 'Fail Handling', [
      '- Gate-1 fail → auto-retry (max 2)',
      '- Gate-2 reject → feedback loop',
    ], C.accentRed);
  }

  addPage(s, 3);
}
```

---

## 4. 체크리스트 + JSON 예시

좌: 체크리스트 테이블 + 설명, 우: 코드/JSON 예시 + QA 설명.

```javascript
function slideChecklist(pres) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addHeader(s, 'Structured Checklist (Draft)');

  const L = LAYOUT.col.L;
  const R = LAYOUT.col.R;
  const y0 = LAYOUT.col.y;

  // ── 좌측 ──
  let yL = y0;
  yL = box(s, L.x, yL, L.w, 0.72, 'How to Use', [
    '- 모델이 JSON으로 필드를 채우고 근거를 인용',
    '- 누락/불확실은 unknown/uncertain으로 표준화',
  ], C.primary);

  yL += 0.08;
  yL = miniTable(s, L.x, yL, L.w, [1.55, L.w - 1.55], [
    ['Field', 'Notes'],
    ['필드 1', 'Y / N / uncertain'],
    ['필드 2', 'type A / type B'],
    ['필드 3', 'unilateral / bilateral'],
    ['필드 4', '# sites + max'],
    ['필드 5', 'Y / N'],
    ['필드 6', 'none / type A / other'],
    ['필드 7', 'mild / moderate / severe'],
    ['필드 8', 'consistent / discrepant'],
  ]);

  yL += 0.08;
  badge(s, L.x, yL, 'REQUIRED', C.accentRed);
  badge(s, L.x + 0.85, yL, 'QUOTE', C.secondary);
  s.addText('Every field must cite source sentence(s)', {
    x: L.x + 1.55, y: yL - 0.01, w: L.w - 1.60, h: 0.20,
    fontSize: 8, fontFace: FONT, color: C.textMid, margin: 0,
  });

  // ── 우측 ──
  let yR = y0;
  yR = box(s, R.x, yR, R.w, 2.20, 'Example Output (JSON)', [
    '{',
    '  "field_1": "Y",',
    '  "field_2": "type_a",',
    '  "field_3": "left",',
    '  "field_4": 18,',
    '  "field_5": "N",',
    '  "field_6": "none",',
    '  "severity": "mild",',
    '  "quotes": ["source text..."]',
    '}',
  ], C.secondary);

  yR += 0.10;
  yR = box(s, R.x, yR, R.w, 1.15, 'QA Auto-Check', [
    '- 필수 필드 존재? → PASS/FAIL',
    '- 일관성 검사? → check',
    '- Severity 일치? → check',
    '- 금칙어 미포함? → check',
  ], C.accent);

  yR += 0.10;
  yR = box(s, R.x, yR, R.w, 1.20, 'Figure Placeholder', [
    '- 예시 이미지/차트 삽입 위치',
    '- 비율 보존 필수',
  ], C.primaryLight);

  addPage(s, 4);
}
```

---

## 5. 평가 계획 (Evaluation)

좌: 엔드포인트 테이블 + 연구 설계, 우: 의사결정 테이블 + 성공 기준 + 리스크.

```javascript
function slideEvaluation(pres) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addHeader(s, 'Evaluation Plan');

  const L = LAYOUT.col.L;
  const R = LAYOUT.col.R;
  const y0 = LAYOUT.col.y;

  // ── 좌측 ──
  let yL = y0;
  yL = miniTable(s, L.x, yL, L.w, [1.50, L.w - 1.50], [
    ['Endpoint', 'Measurement'],
    ['지표 1', '측정 방법 1'],
    ['지표 2', '측정 방법 2'],
    ['지표 3', '측정 방법 3'],
    ['지표 4', '측정 방법 4'],
  ]);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 1.90, 'Study Design', [
    '- 후향적/전향적 설계',
    '- 전문가 평가 (블라인드)',
    '- 층화: 주요 변수 리스트',
    '- 분석: 비율 비교 + 95% CI',
    '- Sample size: n=XX (pilot)',
  ], C.primary);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 0.90, 'Statistical Notes', [
    '- Paired comparison',
    '- McNemar / kappa / ICC',
  ], C.primaryLight);

  // ── 우측 ──
  let yR = y0;
  yR = miniTable(s, R.x, yR, R.w, [1.10, R.w - 1.10], [
    ['Decision', 'Definition'],
    ['Reject', '중대 오류 → 재생성'],
    ['Revise', '경미 수정 → 승인'],
    ['Approve', '그대로 사용'],
  ]);

  yR += 0.12;
  yR = box(s, R.x, yR, R.w, 1.85, 'Success Criteria', [
    '- 주요 지표 ↓ (primary)',
    '- 부수 지표 ↓',
    '- 소요 시간 ≤ baseline',
    '- 전문가 신뢰도 확보',
    '- Reject rate < 15%',
  ], C.secondary);

  yR += 0.10;
  yR = box(s, R.x, yR, R.w, 1.35, 'Risk Mitigation', [
    '- Low quality → QA 규칙 강화',
    '- High reject → feedback loop',
    '- Trust issue → 투명한 근거 제시',
    '- Bias → 다양한 케이스 샘플링',
  ], C.accentRed);

  addPage(s, 5);
}
```

---

## 6. 타임라인 + 로드맵

좌: 타임라인 테이블 + 산출물 + Go/No-Go, 우: 트렌드 분석 + 확장 로드맵.

```javascript
function slideTimeline(pres) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addHeader(s, 'Timeline + Deliverables');

  const L = LAYOUT.col.L;
  const R = LAYOUT.col.R;
  const y0 = LAYOUT.col.y;

  // ── 좌측 ──
  let yL = y0;
  yL = miniTable(s, L.x, yL, L.w, [0.72, L.w - 0.72], [
    ['Week', 'Milestone'],
    ['1-2', '데이터 준비 + 템플릿 합의'],
    ['3-4', '구현 + 내부 검토'],
    ['5-6', '블라인드 평가 + 1차 분석'],
    ['7-8', '리포트 + 확장 로드맵'],
  ]);

  yL += 0.12;
  yL = box(s, L.x, yL, L.w, 1.50, 'Deliverables', [
    '- Structured template + QA ruleset',
    '- 평가 프로토콜',
    '- 파일럿 결과 리포트',
    '- Technical report + presentation',
    '- Lessons learned + recommendations',
  ], C.secondary);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 1.10, 'Go/No-Go Criteria', [
    '- 주요 지표 개선 ≥ clinically meaningful',
    '- Reject rate < 15%',
    '- 전문가 합의: 확장 가치 있음',
  ], C.accent);

  // ── 우측 ──
  let yR = y0;
  yR = box(s, R.x, yR, R.w, 1.90, 'Related Trend', [
    '- 배경 트렌드 설명',
    '- AI 도구 워크플로우 진입',
    '- 표준화/정량화 수요 증가',
    '- 파일럿은 텍스트 기반으로 빠르게 시작',
    '  → 이후 멀티모달 확장',
    '',
    'Key references:',
    '- 참고문헌 1',
    '- 참고문헌 2',
  ], C.primaryLight);

  yR += 0.10;
  yR = box(s, R.x, yR, R.w, 1.60, 'Extension Roadmap', [
    '- Phase 2: 확장 기능 1',
    '- Phase 3: 확장 기능 2',
    '- Phase 4: 확장 기능 3',
    '- Phase 5: 확장 기능 4',
  ], C.primary);

  yR += 0.10;
  miniTable(s, R.x, yR, R.w, [1.20, R.w - 1.20], [
    ['Phase', 'Key Feature'],
    ['Pilot', '핵심 기능 1'],
    ['Phase 2', '핵심 기능 2'],
    ['Phase 3', '핵심 기능 3'],
  ]);

  addPage(s, 7);
}
```

---

## 7. 다크 배경 마무리 슬라이드 (Closing)

다크 블루 배경 + 좌우 패널 (반투명 배경 + 진한 헤더 바).

```javascript
function slideClosing(pres) {
  const s = pres.addSlide();
  s.background = { color: C.primaryDark };
  s.addShape('rect', {
    x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
    fill: { color: C.primary, transparency: 28 },
  });

  // 슬라이드 제목
  s.addText('Discussion & Next Steps', {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 24, fontFace: FONT, color: C.white, bold: true, margin: 0,
  });

  // ── 좌측 패널 ──
  const pnlL = { x: 0.4, y: 1.0, w: 4.35, h: 3.80 };
  // 반투명 배경
  s.addShape('rect', {
    ...pnlL, fill: { color: '1A6A9C', transparency: 20 },
  });
  // 패널 헤더 바
  s.addShape('rect', {
    x: pnlL.x, y: pnlL.y, w: pnlL.w, h: 0.55,
    fill: { color: '0A4D78' }, line: { width: 0 },
  });
  s.addText('Discussion Points', {
    x: pnlL.x + 0.15, y: pnlL.y + 0.10, w: pnlL.w - 0.3, h: 0.35,
    fontSize: 13, fontFace: FONT, color: C.accentSky, bold: true, margin: 0,
  });
  s.addText([
    { text: '항목 1: 설명', options: { bullet: true, breakLine: true } },
    { text: '항목 2: 설명', options: { bullet: true, breakLine: true } },
    { text: '항목 3: 설명', options: { bullet: true, breakLine: true } },
    { text: '항목 4: 설명', options: { bullet: true } },
  ], {
    x: pnlL.x + 0.15, y: pnlL.y + 0.70, w: pnlL.w - 0.3, h: pnlL.h - 0.85,
    fontSize: 10, fontFace: FONT, color: C.white, margin: 0,
    lineSpacingMultiple: 1.40,
  });

  // ── 우측 패널 ──
  const pnlR = { x: 5.1, y: 1.0, w: 4.50, h: 3.80 };
  s.addShape('rect', {
    ...pnlR, fill: { color: '1A6A9C', transparency: 20 },
  });
  s.addShape('rect', {
    x: pnlR.x, y: pnlR.y, w: pnlR.w, h: 0.55,
    fill: { color: '0A4D78' }, line: { width: 0 },
  });
  s.addText('Next Steps', {
    x: pnlR.x + 0.15, y: pnlR.y + 0.10, w: pnlR.w - 0.3, h: 0.35,
    fontSize: 13, fontFace: FONT, color: C.accentSky, bold: true, margin: 0,
  });
  s.addText([
    { text: '스텝 1: 설명', options: { bullet: true, breakLine: true } },
    { text: '스텝 2: 설명', options: { bullet: true, breakLine: true } },
    { text: '스텝 3: 설명', options: { bullet: true, breakLine: true } },
    { text: '스텝 4: 설명', options: { bullet: true } },
  ], {
    x: pnlR.x + 0.15, y: pnlR.y + 0.70, w: pnlR.w - 0.3, h: pnlR.h - 0.85,
    fontSize: 10, fontFace: FONT, color: C.white, margin: 0,
    lineSpacingMultiple: 1.40,
  });

  // 로고 (흰색, 하단 우측)
  s.addImage({ path: LOGO_W, x: 8.15, y: 5.05, w: 1.40, h: 0.42 });
}
```

---

## 8. 전체 화면 이미지 슬라이드

헤더 바 아래에 이미지를 최대한 크게 배치. 비율 보존 필수.

```javascript
function slideFullImage(pres, title, imagePath, imgRatio) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addHeader(s, title);

  const maxH = SLIDE_H - LAYOUT.margin.top - LAYOUT.margin.bottom;
  const maxW = SLIDE_W - LAYOUT.margin.outer * 2;

  let dispW, dispH;
  if (maxH * imgRatio <= maxW) {
    dispH = maxH; dispW = maxH * imgRatio;
  } else {
    dispW = maxW; dispH = maxW / imgRatio;
  }
  const x = (SLIDE_W - dispW) / 2;

  s.addImage({ path: imagePath, x, y: LAYOUT.col.y, w: dispW, h: dispH });
}
```

---

## 9. 통계 카드 + 차트 (Compact)

상단에 3-4개 메트릭 카드 (압축), 하단에 차트 이미지.

```javascript
function slideStatChart(pres, title, stats, imagePath, imgRatio) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addHeader(s, title);

  const y0 = LAYOUT.col.y;
  const cardW = 2.10;
  const cardH = 0.80;
  const startX = LAYOUT.margin.outer;
  const gap = (SLIDE_W - LAYOUT.margin.outer * 2 - stats.length * cardW) / (stats.length - 1);

  stats.forEach((st, i) => {
    const cx = startX + i * (cardW + gap);
    // 카드 배경
    s.addShape('rect', {
      x: cx, y: y0, w: cardW, h: cardH,
      fill: { color: C.bgSubtle },
      shadow: { type: 'outer', color: '000000', blur: 3, offset: 1, angle: 135, opacity: 0.06 },
    });
    // 상단 컬러 바
    s.addShape('rect', {
      x: cx, y: y0, w: cardW, h: 0.04,
      fill: { color: st.color || C.primary },
    });
    // 값
    s.addText(st.val, {
      x: cx, y: y0 + 0.10, w: cardW, h: 0.38,
      fontSize: 20, fontFace: FONT, color: C.primary,
      bold: true, align: 'center', margin: 0,
    });
    // 라벨
    s.addText(st.label, {
      x: cx, y: y0 + 0.48, w: cardW, h: 0.25,
      fontSize: 8, fontFace: FONT, color: C.textMid,
      align: 'center', margin: 0,
    });
  });

  // 차트 이미지 (카드 아래)
  if (imagePath && imgRatio) {
    const chartY = y0 + cardH + 0.15;
    const maxChartH = SLIDE_H - chartY - LAYOUT.margin.bottom;
    const maxChartW = SLIDE_W - LAYOUT.margin.outer * 2;

    let dW, dH;
    if (maxChartH * imgRatio <= maxChartW) {
      dH = maxChartH; dW = maxChartH * imgRatio;
    } else {
      dW = maxChartW; dH = maxChartW / imgRatio;
    }
    const imgX = (SLIDE_W - dW) / 2;
    s.addImage({ path: imagePath, x: imgX, y: chartY, w: dW, h: dH });
  }
}
```

---

## 10. 비교 테이블 (Full Width)

전체 너비 테이블 + 하단 하이라이트 박스.

```javascript
function slideComparisonTable(pres, title, colWidths, rows, highlights) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addHeader(s, title);

  const y0 = LAYOUT.col.y;
  const tableW = SLIDE_W - LAYOUT.margin.outer * 2;

  const hdr = { fill: { color: C.primary }, color: C.white, ...F.tableHeader };
  const bodyStyle = { ...F.tableBody, color: C.textDark };
  const altStyle  = { ...bodyStyle, fill: { color: C.tableAlt } };

  const trows = rows.map((r, i) =>
    r.map((cell) => {
      const isH = i === 0;
      const style = isH ? hdr : (i % 2 === 0 ? altStyle : bodyStyle);
      return { text: String(cell), options: { ...style, align: 'left' } };
    })
  );

  slide.addTable(trows, {
    x: LAYOUT.margin.outer, y: y0, w: tableW,
    colW: colWidths,
    border: { pt: 0.4, color: 'DDDDDD' },
    margin: [2, 4, 2, 4],
  });

  // 하단 하이라이트 박스 (선택)
  if (highlights) {
    const tableBottom = y0 + 0.24 + (rows.length - 1) * 0.22 + 0.15;
    box(s, LAYOUT.margin.outer, tableBottom, tableW, 1.20,
      'Key Points', highlights, C.primary);
  }
}
```

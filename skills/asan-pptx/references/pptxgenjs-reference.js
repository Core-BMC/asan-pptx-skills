/**
 * Asan Medical Center — Dense System Reference Script
 *
 * 아산병원 CI 기반 프레젠테이션 생성 레퍼런스.
 * 실행: node pptxgenjs-reference.js
 *
 * Dense System 특징:
 *  - 헤더 바 h=0.34 (11pt 제목)
 *  - 본문 9pt, 테이블 9pt
 *  - 2-column 그리드 (좌 x=0.28, 우 x=5.09, 각 w=4.63)
 *  - box() 컴포넌트로 일관된 콘텐츠 배치
 */

const pptxgen = require('pptxgenjs');
const path = require('path');

// ─── Assets ──────────────────────────────────────────────────────────────────
const SKILL_DIR = path.resolve(__dirname, '..');
const LOGO_W = path.resolve(SKILL_DIR, 'assets/Asan_Medical_Center_logo_w.png');

// ─── Color Palette (Asan CI) ────────────────────────────────────────────────
const C = {
  primary: '0C598E', primaryLight: '438FD5', primaryDark: '004074',
  secondary: '00696D', secondaryLight: '00A0A8',
  accent: 'F68B1E', accentRed: 'E8453C', accentSky: '00C4DE',
  textDark: '404040', textMid: '666666', white: 'FFFFFF',
  bgSubtle: 'F5F7FA', tableAlt: 'EBF2F8', divider: 'D0D8E0',
};

// ─── Layout Constants ────────────────────────────────────────────────────────
const FONT = 'Pretendard';
const SLIDE_W = 10;
const SLIDE_H = 5.625;

const LAYOUT = {
  header: { h: 0.34, titleFontSize: 11, logoW: 0.88, logoH: 0.26 },
  page: { fontSize: 7 },
  margin: { outer: 0.28, gutter: 0.18, top: 0.52, bottom: 0.08 },
  col: {},
  contentH: 0,
};

const contentW = SLIDE_W - LAYOUT.margin.outer * 2;
const colW = (contentW - LAYOUT.margin.gutter) / 2;
LAYOUT.col = {
  L: { x: LAYOUT.margin.outer, w: colW },
  R: { x: LAYOUT.margin.outer + colW + LAYOUT.margin.gutter, w: colW },
  y: LAYOUT.margin.top,
};
LAYOUT.contentH = SLIDE_H - LAYOUT.margin.top - LAYOUT.margin.bottom;

// ─── Font Presets ────────────────────────────────────────────────────────────
const F = {
  sectionLabel: { fontSize: 10, fontFace: FONT, bold: true },
  body:         { fontSize: 9,  fontFace: FONT, lineSpacingMultiple: 1.18 },
  bodySmall:    { fontSize: 8,  fontFace: FONT, lineSpacingMultiple: 1.15 },
  tableHeader:  { fontSize: 9,  fontFace: FONT, bold: true },
  tableBody:    { fontSize: 9,  fontFace: FONT },
  diagramBox:   { fontSize: 9,  fontFace: FONT, lineSpacingMultiple: 1.10 },
};

// ─── Reusable Components ─────────────────────────────────────────────────────

function addHeader(slide, title) {
  const h = LAYOUT.header;
  slide.addShape('rect', { x: 0, y: 0, w: SLIDE_W, h: h.h, fill: { color: C.primary } });
  slide.addText(title, {
    x: LAYOUT.margin.outer, y: 0.04,
    w: SLIDE_W - h.logoW - LAYOUT.margin.outer - 0.3, h: h.h - 0.06,
    fontSize: h.titleFontSize, fontFace: FONT,
    color: C.white, bold: true, margin: 0,
  });
  slide.addImage({
    path: LOGO_W,
    x: SLIDE_W - h.logoW - LAYOUT.margin.outer + 0.05,
    y: 0.04, w: h.logoW, h: h.logoH,
  });
}

function addPage(slide, n) {
  slide.addText(String(n), {
    x: SLIDE_W - 0.7, y: SLIDE_H - 0.24, w: 0.5, h: 0.18,
    fontSize: LAYOUT.page.fontSize, fontFace: FONT,
    color: '999999', align: 'right', margin: 0,
  });
}

function box(slide, x, y, w, h, title, lines, barColor) {
  const bc = barColor || C.primary;
  const barW = 0.045;
  const padX = 0.14;
  const padY = 0.08;
  const titleH = title ? 0.20 : 0;
  const titleGap = title ? 0.04 : 0;

  slide.addShape('rect', { x, y, w, h, fill: { color: C.bgSubtle } });
  slide.addShape('rect', { x, y, w: barW, h, fill: { color: bc } });

  if (title) {
    slide.addText(title, {
      x: x + padX, y: y + padY, w: w - padX - 0.06, h: titleH,
      ...F.sectionLabel, color: bc, margin: 0,
    });
  }

  const textY = y + padY + titleH + titleGap;
  const textH = h - padY * 2 - titleH - titleGap;
  if (lines && lines.length > 0) {
    slide.addText(lines.join('\n'), {
      x: x + padX, y: textY, w: w - padX - 0.06, h: textH,
      ...F.body, color: C.textDark, margin: 0, valign: 'top',
    });
  }
  return y + h;
}

function miniTable(slide, x, y, w, colWidths, rows, opts) {
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
    x, y, w, colW: colWidths,
    border: { pt: 0.4, color: 'DDDDDD' },
    margin: [2, 4, 2, 4],
    ...(opts || {}),
  });

  const estH = 0.24 + (rows.length - 1) * 0.22;
  return y + estH;
}

function workflowDiagram(slide, x, y, w, steps) {
  const boxH = 0.52;
  const gap = 0.16;
  const barW = 0.045;

  steps.forEach((step, i) => {
    const yy = y + i * (boxH + gap);
    slide.addShape('roundRect', {
      x, y: yy, w, h: boxH,
      fill: { color: C.bgSubtle },
      line: { color: step.color || C.primary, width: 0.8 },
      rectRadius: 0.04,
    });
    slide.addShape('rect', { x, y: yy, w: barW, h: boxH, fill: { color: step.color || C.primary } });
    slide.addText(step.text, {
      x: x + 0.12, y: yy + 0.04, w: w - 0.18, h: boxH - 0.08,
      ...F.diagramBox, color: C.textDark, margin: 0, valign: 'middle',
    });
    if (i < steps.length - 1) {
      const ax = x + w / 2;
      const ay1 = yy + boxH;
      slide.addShape('line', {
        x: ax, y: ay1, w: 0, h: gap - 0.02,
        line: { color: step.color || C.primary, width: 1.5, endArrowType: 'triangle' },
      });
    }
  });
  return y + steps.length * boxH + (steps.length - 1) * gap;
}

function badge(slide, x, y, label, color) {
  const bw = label.length * 0.065 + 0.16;
  slide.addShape('roundRect', {
    x, y, w: bw, h: 0.20,
    fill: { color: color || C.primary }, rectRadius: 0.04,
  });
  slide.addText(label, {
    x, y, w: bw, h: 0.20,
    fontSize: 7, fontFace: FONT, color: C.white, bold: true,
    align: 'center', valign: 'middle', margin: 0,
  });
}

function divider(slide, x, y, w) {
  slide.addShape('line', { x, y, w, h: 0, line: { color: C.divider, width: 0.5 } });
}

// ─── Slide Builders ──────────────────────────────────────────────────────────

function slideTitleCover(pres) {
  const s = pres.addSlide();
  s.background = { color: C.primaryDark };
  s.addShape('rect', { x: 0, y: 0, w: SLIDE_W, h: SLIDE_H, fill: { color: C.primary, transparency: 28 } });

  s.addShape('rect', { x: 0.6, y: 1.30, w: 1.1, h: 0.05, fill: { color: C.accent } });

  s.addText('Sample Presentation\nDense System Reference', {
    x: 0.6, y: 1.42, w: 5.5, h: 1.65,
    fontSize: 30, fontFace: FONT, color: C.white, bold: true,
    margin: 0, lineSpacingMultiple: 1.04,
  });

  // Key facts box
  s.addShape('roundRect', {
    x: 6.3, y: 1.30, w: 3.3, h: 2.20,
    fill: { color: C.primaryDark }, line: { color: C.accentSky, width: 0.8 },
    rectRadius: 0.06,
  });
  s.addText([
    { text: 'OVERVIEW\n', options: { fontSize: 9, bold: true, color: C.accentSky } },
    { text: 'Target:  ', options: { fontSize: 8, color: 'AACCDD', bold: true } },
    { text: 'Dense System layout demo\n', options: { fontSize: 8, color: C.white } },
    { text: 'Approach:  ', options: { fontSize: 8, color: 'AACCDD', bold: true } },
    { text: '2-column grid + box components\n', options: { fontSize: 8, color: C.white } },
    { text: 'Quality:  ', options: { fontSize: 8, color: 'AACCDD', bold: true } },
    { text: 'Auto QA + visual verification\n', options: { fontSize: 8, color: C.white } },
    { text: 'Output:  ', options: { fontSize: 8, color: 'AACCDD', bold: true } },
    { text: 'Standardized AMC presentations', options: { fontSize: 8, color: C.white } },
  ], {
    x: 6.50, y: 1.40, w: 2.90, h: 2.00,
    margin: 0, valign: 'top', lineSpacingMultiple: 1.30,
  });

  s.addText('Asan Medical Center CI-based presentation template', {
    x: 0.6, y: 3.35, w: 5.5, h: 0.32,
    fontSize: 13, fontFace: FONT, color: C.accentSky, margin: 0,
  });

  s.addText('서울아산병원  |  Dense System Reference  |  2026-02', {
    x: 0.6, y: 4.80, w: 6.0, h: 0.28,
    fontSize: 10, fontFace: FONT, color: 'AACCDD', margin: 0,
  });
  s.addImage({ path: LOGO_W, x: 8.15, y: 0.25, w: 1.40, h: 0.42 });
}

function slideContent(pres) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addHeader(s, 'Background / Scope');

  const L = LAYOUT.col.L;
  const R = LAYOUT.col.R;
  const y0 = LAYOUT.col.y;

  // LEFT
  let yL = y0;
  yL = box(s, L.x, yL, L.w, 1.55, 'Unmet Needs', [
    '- 항-아밀로이드 치료 확산 → 모니터링 MRI 증가',
    '- 누락/불일치로 안전 리스크 증가',
    '- 구조화 부재로 연구/레지스트리 비용 증가',
    '- Inter-reader variability ↑',
  ], C.accentRed);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 1.30, 'Pilot Focus', [
    '- 대상: 관련 판독문 (익명화)',
    '- 산출: 구조화 JSON + 플래그 + 근거인용',
    '- 목표: 누락/모순 감소(1차) + 검수 부담 관리(2차)',
  ], C.secondary);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 1.05, 'Key Constraints', [
    '- 임상 시스템 자동 반영 금지 (파일럿 한정)',
    '- PHI-free: 직접식별자 제거 후 처리',
    '- 전문가 승인 없이 확정 금지',
  ], C.primaryLight);

  yL += 0.10;
  badge(s, L.x, yL, 'PRIMARY', C.accent);
  s.addText('누락/중대 불일치 감소', {
    x: L.x + 0.70, y: yL - 0.01, w: L.w - 0.75, h: 0.22,
    fontSize: 9, fontFace: FONT, color: C.textDark, bold: true, margin: 0,
  });

  // RIGHT
  let yR = y0;
  yR = miniTable(s, R.x, yR, R.w, [1.35, R.w - 1.35], [
    ['Item', 'Value'],
    ['Priority', 'Quality-first (안전 > 효율)'],
    ['Target', 'ARIA-E (edema / effusion)'],
    ['Modality', 'Brain MRI (FLAIR, DWI, T1+C)'],
    ['Mode', 'Text-first (판독문 기반)'],
    ['Gate', 'Auto QA → Expert review'],
  ]);

  yR += 0.12;
  divider(s, R.x, yR, R.w);
  yR += 0.10;

  yR = miniTable(s, R.x, yR, R.w, [1.50, R.w - 1.50], [
    ['Endpoint', 'Measurement'],
    ['Omission rate', 'Checklist blind review'],
    ['Critical inconsistency', 'QA fail → expert adjudication'],
    ['Review burden', 'Time per case + reject rate'],
  ]);

  yR += 0.12;
  yR = box(s, R.x, yR, R.w, 1.10, 'Figure Placeholder', [
    '- High-level workflow schematic',
    '- Replace with clinic-specific diagram later',
    '- MRI example slices when available',
  ], C.primaryLight);

  addPage(s, 2);
}

function slideWorkflow(pres) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addHeader(s, 'Workflow: Generation → QA → Expert Review');

  const L = LAYOUT.col.L;
  const R = LAYOUT.col.R;
  const y0 = LAYOUT.col.y;

  let yL = y0;
  yL = box(s, L.x, yL, L.w, 1.30, 'Steps (with gates)', [
    '1) Input: de-identified report text',
    '2) LLM structuring → JSON template + summary',
    '3) Gate-1 자동검증: schema/필수필드/일관성',
    '    fail → 재생성/수정 요청 (로그 기록)',
    '4) Gate-2 전문가 검수: 승인/수정/반려',
    '5) Output: 연구용 저장 (임상 자동반영 금지)',
  ], C.primary);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 1.10, 'Gate-1 QA Rule Examples', [
    '- Schema validation (필수 필드 누락 검사)',
    '- 금칙어 검사 (역할 밖 표현)',
    '- 좌우/부위 일관성 검사',
    '- Severity ↔ Impression 일관성 검사',
  ], C.accent);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 0.80, 'Gate-2 Expert Actions', [
    '- Approve: 그대로 사용 가능',
    '- Revise: 경미 수정 후 승인',
    '- Reject: 중대 오류 → 재생성',
  ], C.secondary);

  yL += 0.10;
  box(s, L.x, yL, L.w, 0.75, 'Audit Fields', [
    '- model/version, ruleset/version, timestamps',
    '- reviewer decision, fail reasons',
  ], C.accentRed);

  // RIGHT: workflow diagram
  workflowDiagram(s, R.x, y0, R.w, [
    { text: 'Input\n(De-identified report)', color: C.primaryLight },
    { text: 'LLM Structuring\n(JSON + summary)', color: C.primary },
    { text: 'Gate-1: Auto QA\n(schema + rules)', color: C.accent },
    { text: 'Gate-2: Expert Review\n(approve/revise/reject)', color: C.secondary },
    { text: 'Final Output\n+ Audit Log', color: C.secondaryLight },
  ]);

  const diagBottom = y0 + 5 * 0.52 + 4 * 0.16;
  if (diagBottom + 0.65 < SLIDE_H) {
    box(s, R.x, diagBottom + 0.10, R.w, 0.70, 'Fail Handling', [
      '- Gate-1 fail → auto-retry (max 2) then flag',
      '- Gate-2 reject → feedback loop → re-generate',
    ], C.accentRed);
  }

  addPage(s, 3);
}

function slideEvaluation(pres) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addHeader(s, 'Evaluation Plan');

  const L = LAYOUT.col.L;
  const R = LAYOUT.col.R;
  const y0 = LAYOUT.col.y;

  let yL = y0;
  yL = miniTable(s, L.x, yL, L.w, [1.50, L.w - 1.50], [
    ['Endpoint', 'Measurement'],
    ['Omission rate', 'Checklist blind rating'],
    ['Critical inconsistency', 'QA fail + adjudication'],
    ['Review burden', 'Time per case + reject rate'],
    ['Usability/trust', 'SUS survey + interviews'],
    ['Inter-rater agreement', 'Cohen kappa'],
  ]);

  yL += 0.10;
  yL = box(s, L.x, yL, L.w, 1.90, 'Study Design', [
    '- Retrospective set → LLM output 생성',
    '- 전문가 2인: baseline vs assisted (블라인드)',
    '- 층화: follow-up vs diagnostic, sequence',
    '- 분석: 비율 비교 + 95% CI',
    '- Sample size: n=30-50 (pilot feasibility)',
    '- Secondary: inter-reader agreement 비교',
  ], C.primary);

  yL += 0.10;
  box(s, L.x, yL, L.w, 0.90, 'Statistical Notes', [
    '- Paired comparison (same cases, ± LLM assist)',
    '- McNemar for omission (binary per field)',
    '- ICC/kappa for severity grading',
  ], C.primaryLight);

  let yR = y0;
  yR = miniTable(s, R.x, yR, R.w, [1.10, R.w - 1.10], [
    ['Decision', 'Definition'],
    ['Reject', '중대 오류 / 근거 없음 → 재생성'],
    ['Revise', '경미 수정 가능 → 수정 후 승인'],
    ['Approve', '그대로 사용 가능'],
  ]);

  yR += 0.12;
  yR = box(s, R.x, yR, R.w, 1.85, 'Success Criteria', [
    '- Omission rate ↓ significantly',
    '- Critical inconsistency rate ↓',
    '- Review time ≤ baseline',
    '- Expert trust: 보조 도구로 수용 가능',
    '- Reject rate < 15%',
    '- Kappa improvement',
  ], C.secondary);

  yR += 0.10;
  box(s, R.x, yR, R.w, 1.35, 'Risk Mitigation', [
    '- Low quality → tighten QA rules + re-prompt',
    '- High reject rate → expert feedback loop',
    '- Trust issue → transparent explanation + quote',
    '- Bias → diverse case sampling + stratification',
  ], C.accentRed);

  addPage(s, 4);
}

function slideClosing(pres) {
  const s = pres.addSlide();
  s.background = { color: C.primaryDark };
  s.addShape('rect', {
    x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
    fill: { color: C.primary, transparency: 28 },
  });

  s.addText('Discussion & Next Steps', {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 24, fontFace: FONT, color: C.white, bold: true, margin: 0,
  });

  // Left panel
  const pnlL = { x: 0.4, y: 1.0, w: 4.35, h: 3.80 };
  s.addShape('rect', { ...pnlL, fill: { color: '1A6A9C', transparency: 20 } });
  s.addShape('rect', {
    x: pnlL.x, y: pnlL.y, w: pnlL.w, h: 0.55,
    fill: { color: '0A4D78' }, line: { width: 0 },
  });
  s.addText('Discussion Points', {
    x: pnlL.x + 0.15, y: pnlL.y + 0.10, w: pnlL.w - 0.3, h: 0.35,
    fontSize: 13, fontFace: FONT, color: C.accentSky, bold: true, margin: 0,
  });
  s.addText([
    { text: 'N1c: tumor deposit extraction 추가', options: { bullet: true, breakLine: true } },
    { text: 'N grouping: detailed + grouped 병행', options: { bullet: true, breakLine: true } },
    { text: 'M: binary (M0/M1) 중심, detailed 보충', options: { bullet: true, breakLine: true } },
    { text: 'Clinical TNM: N0/N1 표기, Mx 권장', options: { bullet: true, breakLine: true } },
    { text: 'Stage analysis: recalculation 로직 필요', options: { bullet: true } },
  ], {
    x: pnlL.x + 0.15, y: pnlL.y + 0.70, w: pnlL.w - 0.3, h: pnlL.h - 0.85,
    fontSize: 10, fontFace: FONT, color: C.white, margin: 0,
    lineSpacingMultiple: 1.40,
  });

  // Right panel
  const pnlR = { x: 5.1, y: 1.0, w: 4.50, h: 3.80 };
  s.addShape('rect', { ...pnlR, fill: { color: '1A6A9C', transparency: 20 } });
  s.addShape('rect', {
    x: pnlR.x, y: pnlR.y, w: pnlR.w, h: 0.55,
    fill: { color: '0A4D78' }, line: { width: 0 },
  });
  s.addText('Next Steps', {
    x: pnlR.x + 0.15, y: pnlR.y + 0.10, w: pnlR.w - 0.3, h: 0.35,
    fontSize: 13, fontFace: FONT, color: C.accentSky, bold: true, margin: 0,
  });
  s.addText([
    { text: 'LLM workflow figure 작성', options: { bullet: true, breakLine: true } },
    { text: 'Prompt structure 문서화', options: { bullet: true, breakLine: true } },
    { text: 'Stage-level confusion matrix', options: { bullet: true, breakLine: true } },
    { text: 'Clinical TNM results section', options: { bullet: true, breakLine: true } },
    { text: 'Registry discrepancy analysis', options: { bullet: true } },
  ], {
    x: pnlR.x + 0.15, y: pnlR.y + 0.70, w: pnlR.w - 0.3, h: pnlR.h - 0.85,
    fontSize: 10, fontFace: FONT, color: C.white, margin: 0,
    lineSpacingMultiple: 1.40,
  });

  s.addImage({ path: LOGO_W, x: 8.15, y: 5.05, w: 1.40, h: 0.42 });
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Hwon Heo';
  pres.title = 'Asan Dense System Reference';

  slideTitleCover(pres);
  slideContent(pres);
  slideWorkflow(pres);
  slideEvaluation(pres);
  slideClosing(pres);

  const outPath = path.resolve(__dirname, 'AMC_DenseSystem_Reference.pptx');
  await pres.writeFile({ fileName: outPath });
  console.log('Wrote:', outPath);
}

main().catch((e) => { console.error(e); process.exit(1); });

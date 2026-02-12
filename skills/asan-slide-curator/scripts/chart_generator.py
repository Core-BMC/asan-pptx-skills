#!/usr/bin/env python3
"""
AMC 팔레트 차트 생성기.
matplotlib/seaborn으로 아산병원 CI 색상을 적용한 학술 차트를 생성한다.

사용법:
    python chart_generator.py --type bar --data data.json --output chart.png
    python chart_generator.py --type heatmap --data confusion.json --output cm.png
    python chart_generator.py --type line --data timeseries.json --output trend.png

데이터 JSON 형식은 references/chart-generator.md 참조.
"""

import argparse
import json
import sys

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import numpy as np

# ── AMC 색상 팔레트 ──────────────────────────────────────
AMC_COLORS = {
    'teal':        '#006567',
    'tealBright':  '#1EABA3',
    'tealBorder':  '#1D84AD',
    'orange':      '#F57427',
    'orangeDark':  '#B3510E',
    'peach':       '#F8D8CD',
    'textDark':    '#404040',
    'white':       '#FFFFFF',
    'bgSubtle':    '#F5F7FA',
}

AMC_PALETTE = [
    AMC_COLORS['teal'],
    AMC_COLORS['orange'],
    AMC_COLORS['tealBright'],
    AMC_COLORS['orangeDark'],
    AMC_COLORS['tealBorder'],
    AMC_COLORS['peach'],
]

# ── 폰트 설정 ────────────────────────────────────────────
def setup_font():
    """Pretendard > Noto Sans KR > Arial 순서로 폰트 설정."""
    for font_name in ['Pretendard', 'Noto Sans KR', 'Arial']:
        fonts = fm.findSystemFonts()
        for f in fonts:
            try:
                prop = fm.FontProperties(fname=f)
                if font_name.lower() in prop.get_name().lower():
                    plt.rcParams['font.family'] = prop.get_name()
                    return
            except:
                continue
    plt.rcParams['font.family'] = 'DejaVu Sans'


def apply_amc_style():
    """AMC 스타일을 matplotlib에 적용."""
    setup_font()
    plt.rcParams.update({
        'figure.facecolor': AMC_COLORS['white'],
        'axes.facecolor': AMC_COLORS['white'],
        'text.color': AMC_COLORS['textDark'],
        'axes.labelcolor': AMC_COLORS['textDark'],
        'xtick.color': AMC_COLORS['textDark'],
        'ytick.color': AMC_COLORS['textDark'],
        'axes.edgecolor': '#D0D8E0',
        'grid.color': '#E8ECF0',
        'grid.alpha': 0.5,
        'figure.dpi': 200,
    })


def bar_chart(data: dict, output: str):
    """그룹 바 차트 생성.
    data: {"labels": [...], "groups": [{"name": "...", "values": [...]}, ...]}
    """
    labels = data['labels']
    groups = data['groups']
    x = np.arange(len(labels))
    width = 0.8 / len(groups)

    fig, ax = plt.subplots(figsize=(8, 5))
    for i, group in enumerate(groups):
        offset = (i - len(groups)/2 + 0.5) * width
        bars = ax.bar(x + offset, group['values'], width,
                      label=group['name'], color=AMC_PALETTE[i % len(AMC_PALETTE)],
                      edgecolor='white', linewidth=0.5)
        # 값 라벨
        for bar in bars:
            ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.5,
                    f'{bar.get_height():.1f}', ha='center', va='bottom',
                    fontsize=8, color=AMC_COLORS['textDark'])

    ax.set_xticks(x)
    ax.set_xticklabels(labels)
    ax.set_ylabel(data.get('ylabel', ''))
    ax.set_title(data.get('title', ''), fontweight='bold', pad=15)
    ax.legend(frameon=False)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.grid(axis='y', linestyle='--', alpha=0.3)

    plt.tight_layout()
    plt.savefig(output, bbox_inches='tight')
    plt.close()
    print(f"Created: {output}")


def line_chart(data: dict, output: str):
    """라인 차트 생성.
    data: {"x": [...], "series": [{"name": "...", "values": [...]}, ...]}
    """
    fig, ax = plt.subplots(figsize=(8, 5))
    for i, series in enumerate(data['series']):
        ax.plot(data['x'], series['values'], 'o-',
                label=series['name'], color=AMC_PALETTE[i % len(AMC_PALETTE)],
                linewidth=2, markersize=6)

    ax.set_xlabel(data.get('xlabel', ''))
    ax.set_ylabel(data.get('ylabel', ''))
    ax.set_title(data.get('title', ''), fontweight='bold', pad=15)
    ax.legend(frameon=False)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.grid(True, linestyle='--', alpha=0.3)

    plt.tight_layout()
    plt.savefig(output, bbox_inches='tight')
    plt.close()
    print(f"Created: {output}")


def heatmap_chart(data: dict, output: str):
    """혼동행렬 히트맵 생성.
    data: {"matrix": [[...]], "labels": [...]}
    """
    matrix = np.array(data['matrix'])
    labels = data.get('labels', [str(i) for i in range(len(matrix))])

    fig, ax = plt.subplots(figsize=(6, 5))
    im = ax.imshow(matrix, cmap=matplotlib.colors.LinearSegmentedColormap.from_list(
        'amc', [AMC_COLORS['white'], AMC_COLORS['tealBright'], AMC_COLORS['teal']]))

    ax.set_xticks(range(len(labels)))
    ax.set_yticks(range(len(labels)))
    ax.set_xticklabels(labels)
    ax.set_yticklabels(labels)

    # 셀 값 표시
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            val = matrix[i][j]
            color = AMC_COLORS['white'] if val > matrix.max() * 0.6 else AMC_COLORS['textDark']
            ax.text(j, i, f'{val}', ha='center', va='center', color=color, fontsize=10)

    ax.set_title(data.get('title', ''), fontweight='bold', pad=15)
    ax.set_xlabel(data.get('xlabel', 'Predicted'))
    ax.set_ylabel(data.get('ylabel', 'Actual'))
    fig.colorbar(im, ax=ax, shrink=0.8)

    plt.tight_layout()
    plt.savefig(output, bbox_inches='tight')
    plt.close()
    print(f"Created: {output}")


def boxplot_chart(data: dict, output: str):
    """박스 플롯 생성.
    data: {"groups": [{"name": "...", "values": [...]}, ...]}
    """
    fig, ax = plt.subplots(figsize=(8, 5))
    bp = ax.boxplot(
        [g['values'] for g in data['groups']],
        labels=[g['name'] for g in data['groups']],
        patch_artist=True,
        medianprops={'color': AMC_COLORS['orangeDark'], 'linewidth': 2},
    )
    for i, patch in enumerate(bp['boxes']):
        patch.set_facecolor(AMC_PALETTE[i % len(AMC_PALETTE)] + '80')  # 50% alpha
        patch.set_edgecolor(AMC_PALETTE[i % len(AMC_PALETTE)])

    ax.set_ylabel(data.get('ylabel', ''))
    ax.set_title(data.get('title', ''), fontweight='bold', pad=15)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.grid(axis='y', linestyle='--', alpha=0.3)

    plt.tight_layout()
    plt.savefig(output, bbox_inches='tight')
    plt.close()
    print(f"Created: {output}")


CHART_TYPES = {
    'bar': bar_chart,
    'line': line_chart,
    'heatmap': heatmap_chart,
    'boxplot': boxplot_chart,
}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='AMC palette chart generator')
    parser.add_argument('--type', required=True, choices=CHART_TYPES.keys())
    parser.add_argument('--data', required=True, help='JSON data file')
    parser.add_argument('--output', required=True, help='Output PNG path')

    args = parser.parse_args()
    apply_amc_style()

    with open(args.data) as f:
        data = json.load(f)

    CHART_TYPES[args.type](data, args.output)

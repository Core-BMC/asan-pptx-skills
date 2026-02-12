#!/usr/bin/env bash
# ============================================================
# install-claude-code.sh
# Asan PPTX Skills — Claude Code / IDE (VS Code, JetBrains) 설치 스크립트
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Claude Code: 프로젝트 루트의 .claude/skills/ 에 설치
# 현재 디렉토리가 프로젝트 루트라고 가정
PROJECT_DIR="${1:-$(pwd)}"
SKILLS_DIR="${PROJECT_DIR}/.claude/skills"

SKILLS=("asan-pptx" "asan-slide-curator")

echo "=== Asan PPTX Skills — Claude Code Installer ==="
echo "Source  : ${SCRIPT_DIR}/skills"
echo "Project : ${PROJECT_DIR}"
echo "Target  : ${SKILLS_DIR}"
echo ""

mkdir -p "$SKILLS_DIR"

for skill in "${SKILLS[@]}"; do
    src="${SCRIPT_DIR}/skills/${skill}"
    dst="${SKILLS_DIR}/${skill}"

    if [ ! -d "$src" ]; then
        echo "[ERROR] Source not found: ${src}"
        exit 1
    fi

    if [ -d "$dst" ]; then
        echo "[UPDATE] ${skill} — removing old version..."
        rm -rf "$dst"
    fi

    cp -r "$src" "$dst"
    echo "[OK] ${skill} → ${dst}"
done

echo ""
echo "Installation complete."
echo "Skills installed at: ${SKILLS_DIR}"
echo ""
echo "Verify with: ls ${SKILLS_DIR}"

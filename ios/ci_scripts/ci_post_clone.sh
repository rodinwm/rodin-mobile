#!/bin/bash
set -e

# ✅ Fallback vers $CI_NODE si node introuvable
export NODE_BINARY=${CI_NODE:-$(which node)}

echo "🔧 [CI] Using Node at: $NODE_BINARY"

cd "$(dirname "$0")/.."

echo "📁 [CI] Cleaning Pods..."
rm -rf Pods Podfile.lock *.xcworkspace

echo "📦 [CI] Installing Pods..."
pod install --repo-update

echo "✅ [CI] Pods installed successfully"
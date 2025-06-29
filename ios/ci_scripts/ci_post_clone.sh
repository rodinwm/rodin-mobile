#!/bin/bash

set -e

echo "🔧 [CI] Using Node at: $(which node)"
echo "📁 [CI] Cleaning previous pods..."
cd "$(dirname "$0")/.."
rm -rf Pods Podfile.lock *.xcworkspace

echo "📦 [CI] Installing pods..."
pod install --repo-update

echo "✅ [CI] Pods installed successfully"
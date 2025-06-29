#!/bin/bash

echo "🔧 [CI] Using Node at: $(which node)"
echo "📁 [CI] Cleaning previous pods..."

cd "$(dirname "$0")/../.." || exit 1
npm install

cd ios || exit 1
rm -rf Pods Podfile.lock

echo "📦 [CI] Installing pods..."

pod install --repo-update

echo "✅ [CI] Pods installed successfully"
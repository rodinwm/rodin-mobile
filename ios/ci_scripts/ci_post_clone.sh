#!/bin/bash

echo "🔧 [CI] Using Node at: $(which node)"
echo "📁 [CI] Cleaning previous pods..."

cd "$(dirname "$0")/../.." || exit
npm install

cd ios || exit
rm -rf Pods Podfile.lock

echo "📦 [CI] Installing pods..."

pod install --repo-update

echo "✅ [CI] Pods installed successfully"
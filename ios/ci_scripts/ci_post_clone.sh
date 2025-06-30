#!/bin/sh

# Go to root folder
cd "$(dirname "$0")/../.." || exit 1

echo "[CI] Installing Node"
brew install node
echo "[CI] Node installed successfully"
echo "[CI] Using Node at: $(which node)"

#echo "Installing npm dependencies"
#npm install
#echo "npm dependencies successfully installed"

echo "[CI] Cleaning previous pods"
cd ios || exit 1
rm -rf Pods Podfile.lock
echo "[CI] Previous pods cleaned"

echo "[CI] Installing pods"
pod install --repo-update

echo "[CI] ✅ Pods installed successfully"
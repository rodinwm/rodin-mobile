#!/bin/sh

# Go to root folder
cd "$(dirname "$0")/../.." || exit 1

echo "[CI] Installing Node"
brew install node
echo "[CI] ✅ Node installed successfully"
echo "[CI] Using Node at: $(which node)"

echo "[CI] Setting up .npmrc for GitHub Packages"

if [ -z "$NODE_AUTH_TOKEN" ]; then
  echo "[ERROR] NODE_AUTH_TOKEN is not set. Aborting npm install."
  exit 1
fi

# Prepare .npmrc
sed -i.bak "s|^#*//npm.pkg.github.com|//npm.pkg.github.com|" .npmrc
sed -i '' "s|NODE_AUTH_TOKEN|$NODE_AUTH_TOKEN|g" .npmrc
echo "[CI] ✅ .npmrc updated with GitHub token"

echo "[CI] Installing npm dependencies"
npm install
echo "[CI] ✅ npm dependencies successfully installed"

echo "[CI] Cleaning previous pods"
cd ios || exit 1
rm -rf Pods Podfile.lock
echo "[CI] ✅ Previous pods cleaned"

echo "[CI] Installing pods"
pod install --repo-update
echo "[CI] ✅ Pods installed successfully"
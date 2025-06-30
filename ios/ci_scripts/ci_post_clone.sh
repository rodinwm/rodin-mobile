#!/bin/bash

echo "Installing Node and CocoaPods ..."
brew install node
brew install cocoapods
echo "Node and CocoaPods successfully installed"
echo "Using Node at: $(which node)"

echo "Installing npm dependencies"
cd "$(dirname "$0")/../.." || exit 1
npm install
echo "npm dependencies successfully installed"

echo "Cleaning previous pods..."
cd ios || exit 1
rm -rf Pods Podfile.lock
echo "Previous pods cleaned"

echo "Installing pods..."
pod install --repo-update

echo "✅ Pods installed successfully"
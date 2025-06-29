#!/bin/bash

set -e
echo "Node path: $(which node)"

echo "👉 [CI] Cleaning Pods..."
rm -rf ../Pods ../Podfile.lock ../*.xcworkspace

echo "👉 [CI] Installing Pods..."
pod install --repo-update

echo "✅ [CI] Pods installed"

#!/bin/bash

set -e
echo "Using Node from: $NODE_BINARY"
$NODE_BINARY -v

echo "👉 [CI] Cleaning Pods..."
rm -rf ../Pods ../Podfile.lock ../*.xcworkspace

echo "👉 [CI] Installing Pods..."
pod install --repo-update

echo "✅ [CI] Pods installed"

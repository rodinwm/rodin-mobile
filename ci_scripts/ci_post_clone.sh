#!/bin/bash

set -e

echo "👉 [CI] Cleaning Pods..."
cd ios || exit
rm -rf Pods Podfile.lock *.xcworkspace

echo "👉 [CI] Installing Pods..."
pod install --repo-update

echo "✅ [CI] Pods installed"
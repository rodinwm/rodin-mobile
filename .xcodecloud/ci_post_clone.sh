#!/bin/bash

echo ">>> 💡 Running pod install for Xcode Cloud..."
cd ios || exit
rm -rf Pods Podfile.lock *.xcworkspace
pod install --repo-update
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p build
xcodebuild -project StudyZone.xcodeproj -scheme StudyZone -configuration Release -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' -derivedDataPath build/simulator CODE_SIGNING_ALLOWED=NO build
xcodebuild -project StudyZone.xcodeproj -scheme StudyZone -configuration Release -sdk iphoneos -destination 'generic/platform=iOS' -derivedDataPath build/device CODE_SIGNING_ALLOWED=NO build
mkdir -p build/Payload
cp -R build/device/Build/Products/Release-iphoneos/StudyZone.app build/Payload/
(cd build && zip -qry Study-Zone-iOS-UNSIGNED.ipa Payload)
(cd build/simulator/Build/Products/Release-iphonesimulator && ditto -c -k --sequesterRsrc --keepParent StudyZone.app ../../../../Study-Zone-iOS-Simulator.zip)

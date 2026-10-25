#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
device_id="$(xcrun simctl list devices available -j | python3 -c 'import json,sys; d=json.load(sys.stdin); print(next(x["udid"] for items in d["devices"].values() for x in items if "iPhone" in x["name"]))')"
xcrun simctl boot "$device_id" || true
xcrun simctl bootstatus "$device_id" -b
xcrun simctl install "$device_id" build/simulator/Build/Products/Release-iphonesimulator/StudyZone.app
xcrun simctl launch "$device_id" za.co.studyzone.ios --smoke-test
data_dir="$(xcrun simctl get_app_container "$device_id" za.co.studyzone.ios data)"
for attempt in $(seq 1 40); do
  if [ -f "$data_dir/Documents/smoke-test.json" ]; then break; fi
  sleep 2
done
cp "$data_dir/Documents/smoke-test.json" build/smoke-test.json
python3 - <<'PY'
import json
with open('build/smoke-test.json') as f: checks=json.load(f)
print(checks)
assert len(checks)==4 and all(checks.values()),checks
PY
xcrun simctl io "$device_id" screenshot build/Study-Zone-iPhone.png
xcrun simctl terminate "$device_id" za.co.studyzone.ios

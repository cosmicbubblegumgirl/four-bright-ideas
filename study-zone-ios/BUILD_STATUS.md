# Build status · 25 October 2026

The Xcode project, three Swift source files, bundled web modules, property lists and shared scheme were checked structurally. Swift syntax and the Xcode project parsed successfully. JavaScript syntax, local imports and developer/founder links passed source checks. A branding scan found no unwanted builder references in the app source.

The macOS build and simulator workflow was submitted on GitHub. GitHub refused to start the job: “The job was not started because your account is locked due to a billing issue.” No native compilation or simulator run completed, and no IPA was produced. The workflow can be rerun after the account issue is resolved, or the project can be built locally in Xcode on a Mac.

A native installable iPhone release additionally requires your Apple signing team and certificates. TestFlight/App Store distribution also requires the appropriate Apple Developer Program and App Store Connect access. The repository contains no private Apple credentials. Resolve the account-deletion requirement described in README.md before an App Store submission.

For immediate iPhone use, open the published Study Zone install page in Safari and add the web app to the Home Screen:
https://cosmicbubblegumgirl.github.io/four-bright-ideas/study-zone/install-ios.html

Native build workflow:
https://github.com/cosmicbubblegumgirl/four-bright-ideas/actions/workflows/study-zone-ios.yml

# Study Zone for iPhone and iPad

Developer: **Simoné Govender** · Founder of Study Zone: **Godfrey**

- LinkedIn: https://www.linkedin.com/in/simone-govender-dev/
- Portfolio: https://cosmicbubblegumgirl.github.io/simone-cosmic-portfolio/
- Interactive portfolio: https://cosmicbubblegumgirl.github.io/simone-cosmic-portfolio-game/
- GitHub: https://github.com/cosmicbubblegumgirl

## What is included
A UIKit/WKWebView iOS application with bundled Study Zone revision content, quizzes, worked examples, interactive models, notes, a personal planner and focus tools. The original Study Zone logo appears inside the app; the launcher uses its existing book symbol. The native menu and About page include developer credits and profile links. Godfrey's WhatsApp contact supports tuition, volunteering and donation enquiries. Requires iOS 16 or later.

Offline revision is available from first launch. Shared classes, accounts, uploads, backups, videos, paper links and WhatsApp require an internet connection. Personal app data is separate from Safari and Android. Use exports/imports to transfer study work; export before uninstalling. Native sharing exports files to the iOS share sheet, including Save to Files. Printing uses AirPrint's system dialog. Web file inputs use the system document picker. No third-party advertising or analytics SDKs are included.

## Install on your own iPhone using a Mac
1. Open StudyZone.xcodeproj in a current Xcode on a Mac.
2. Select the StudyZone target, Signing & Capabilities, enable automatic signing and select your Apple team. If needed, change za.co.studyzone.ios to an identifier registered to your team.
3. Connect your iPhone, trust the Mac and enable Developer Mode if Xcode requests it.
4. Select your device and press Run. For simulator use, choose an iPhone simulator; no distribution certificate is needed.

## TestFlight / App Store
Select Any iOS Device and Product > Archive. In Organizer choose Distribute App and complete your Apple account's signing and App Store Connect setup. Apple Developer Program membership, an app record and valid signing assets are required for TestFlight/App Store distribution. The App Store reviews submissions; this source package is not an approved listing.

The automated build deliberately uses no Apple certificates or private credentials. Its UNSIGNED.ipa is a compiled device package for later signing, not an installable iPhone download. The simulator build runs only in an iOS Simulator on a Mac. Do not rename an APK to IPA or expect an unsigned IPA to install on a phone.

## Account emails
New-account verification and password-reset links open the existing public Study Zone website. After verifying or resetting there, return to the app and sign in. Verification codes can also be entered in the app when the email contains a code. Universal Links are not configured for the GitHub Pages domain.

## Build and checks
On a Mac with Xcode: run bash build-ios.sh, then bash test-simulator.sh. Build outputs are under build/. Simulator checks verify the home page, subject library, developer links and Godfrey's contact page. The workflow file belongs at .github/workflows/study-zone-ios.yml when this project is stored in the repository under study-zone-ios/.

The web content is a versioned snapshot. New website code requires a new app release; shared backend records update online. The supplied Supabase publishable key is public client configuration. No service-role key, user password, Apple certificate or provisioning profile is included.

Before broad distribution, verify sign-in, email verification, tutor resource upload, progress consent, exporting/importing, printing, accessibility and offline use on a real iPhone/iPad. Complete App Store privacy answers for the connected backend, which can store names, emails, account IDs, submitted resources, attendance, feedback and optional study data. The privacy manifest describes app functionality; it does not replace App Store Connect disclosures. Account creation in an App Store release also requires a complete account deletion flow; the current backend has no public delete-account endpoint, so App Store submission needs that work before release.

## Use on iPhone now
The existing live web app can also be installed to the Home Screen without this native project: open https://cosmicbubblegumgirl.github.io/four-bright-ideas/study-zone/ in Safari, tap Share, then Add to Home Screen. This does not require TestFlight or Apple signing.

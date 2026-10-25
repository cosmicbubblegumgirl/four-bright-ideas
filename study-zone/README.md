# Study Zone

A matric learning hub with subject roadmaps, original practice, selected past-paper explanations, videos, interactive labs, a focus room, notebook and personal planner.

Founder of Study Zone: Godfrey. Platform design and development: Simoné Govender.

## Run

Serve this directory through an HTTP server. The app has no build step and no package dependencies. It publishes at `study-zone/` on the repository’s existing GitHub Pages site.

## Content

The four expanded subject collections are adapted from Quantum Jump, Plot Twist, Sum Sense and Ledger Legends by Simoné Govender. Other subjects have revision starters and links to official resources; language roadmaps are in English. Original practice and adapted past-paper summaries are labelled separately. Full exam context remains in the original papers and marking guidelines.

## Personal data

Profiles, notes, progress, resources and schedules stay in the visitor’s browser. JSON backups move personal data between devices. Resource packs export only selected resource fields. Calendar exports use South African Standard Time. Account features add an optional private online study copy and a shared classroom; device tools can still be used without signing in.

## Offline

A service worker caches the app and included collections after a successful first visit. External papers, videos, studio links, shared classroom and account actions require a connection.

## Sources

- Department of Basic Education: FET CAPS subject catalogue, past papers and Mind the Gap guides.
- Thutong: non-official language resources.
- IEB: National Senior Certificate information.
- Individual paper records preserve their original source and marking guideline links.

## Shared classroom

The shared timetable, reviewed resource library, account study copies, tutor requests, session registrations, optional subject progress sharing, attendance and feedback use the existing learning-app backend. Browser clients use a publishable key; role and ownership checks are enforced by database policies. No privileged server key is included in this repository.

Programme administrators approve tutor publishing access and review resource submissions. Tutors manage their own sessions and class registers. Learners control whether a subject summary is shared with the tutor for a registered session. Private notes and saved online study copies are accessible only to the account owner.

The included schema snapshot documents the access rules. It is already applied to the connected project and should not be reapplied as a fresh setup script on the same database.

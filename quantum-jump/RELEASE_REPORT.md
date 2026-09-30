# Quantum Jump — release verification

Verified 30 September 2026. This is a working first release, not a claim that the entire long-term build specification has shipped.

## Published architecture

- Frontend: https://cosmicbubblegumgirl.github.io/four-bright-ideas/quantum-jump/
- Source: `quantum-jump/` in `cosmicbubblegumgirl/four-bright-ideas`; isolated from existing apps.
- Backend: Supabase Auth, PostgreSQL with row-level security, private file storage and an authenticated Edge Function.
- No model keys, educator setup codes, student records or service-role credentials are in the repository.

## Verified automatically

Content tests passed for 2,000 unique question texts across 20 section banks, five structured steps per question, finite numerical values, representative independently calculated answers, and 90 simulation boundary states. These tests do not substitute for educator review of every worked example.

A one-time release test used two disposable confirmed accounts against the actual deployed backend. All passed:

1. Password login for both accounts.
2. Session refresh and logout.
3. Profile creation and private note storage/readback.
4. Another student cannot read or write someone else's note.
5. Students cannot grant themselves educator access or create educator resources.
6. Educator text-file upload to private storage.
7. Draft metadata and draft files hidden from students.
8. Educator publication and subsequent student read/download access.
9. Authenticated Newton study-guide response.
10. Anonymous tutor calls rejected and model configuration restricted to educators.
11. Test uploads and both test accounts removed.

The temporary test execution hook and its service RPCs were removed after checking. The fixture in `tests/server-smoke.ts` documents the checks; it is not an active production route and requires a separately provisioned, service-only execution lock to rerun. Supabase's security advisor reported no findings at the schema review.

## Browser verification

The published home page, worked-example navigation, numerical answer feedback and full five-step solution rendered. A keyboard change to simulation mass updated acceleration from 5 to 4.167 m/s² for a constant 25 N force. The page displays Simoné Govender's footer and resource credits. Browser-extension log noise was excluded from application error evaluation.

## Available now

Paper 1 Physics and Paper 2 Chemistry have separate sections; each contains 100 deterministic practice variants. The app includes lesson explanations, formula/reference tools, 10 interactive models, optional PhET embedding, notes, bookmarks, attempts, progress checklists, tasks, a study timer, exports, guest-device storage, account storage, teacher draft/publish controls, and configurable study preferences. The verified paper shelf contains November 2024 and 2025 P1/P2 question-paper and memo pairs, plus the official DBE archive link. Some papers are hosted by Hlayiso with its own guest-download limits.

## Remaining activation and review

- **Email registration and password recovery:** confirmation is enabled. Actual mailbox delivery, SMTP configuration and allowed redirect settings have not been verified. Password login was verified using admin-created, confirmed disposable accounts. Before public enrolment, configure/verify a production email sender, allow the exact live URL above under Auth URL Configuration, and test signup and reset with a real recipient. Preserve settings used by the other apps sharing this backend. Supabase's default email service restricts recipients to project-team addresses; see https://supabase.com/docs/guides/auth/auth-smtp.
- **Educator account:** sign up and confirm an account, then use the separately delivered, expiring one-time activation code. No default admin password is committed.
- **Open-ended Newton AI:** an educator must connect a valid Gemini API key in the Educator studio. Until then, Newton clearly labels responses as retrieved study-guide content. General question answering, coding help and model costs cannot be validated without that connection.
- **Content breadth:** the 2,000 entries are template-based numerical/context variations, not 2,000 independently authored exam questions. The full archive is not mirrored or indexed at individual subquestion level. Every section needs educator review before high-stakes exam use.
- **Scope:** the specification lists 150 capabilities and targets 10,000 tutor workflows. It is a roadmap, not an implemented-feature count. Adaptive assessment, a full historical paper corpus, a 10,000-workflow evaluation suite and comprehensive accessibility auditing remain future work.
- **Accessibility:** contrast, larger type, spacing, reduced motion, focus mode, quiet display, reading guide, hidden countdowns, keyboard controls and speech tools support different preferences. No claim is made to treat mental-health conditions or cover every disability.

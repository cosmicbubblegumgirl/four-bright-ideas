# Quantum Jump

Small steps. Big understanding.

A custom Grade 12 Physical Sciences learning studio by Simoné Govender, Bachelor of Education.

## Running locally

Run `python3 -m http.server 8080` from this folder, then open `http://localhost:8080`. Run the deterministic content and simulation checks with `npm test`. No frontend build step or package installation is required.

## Hosting

GitHub Pages serves this folder. Supabase provides authentication, protected PostgreSQL records, private resource storage and the `quantum-jump` Edge Function. The frontend configuration contains only the public project URL and publishable key. Never put a service-role key or model key in frontend code.

Database definitions are in `backend/schema.sql`. The deployment adds a one-time educator invitation separately; invitation secrets are never committed. Each student can read or change only their own progress, tasks, notes and conversations. Educator privileges are not editable by students. Original educator resources are attributed to Simoné; external papers retain their publisher attribution.

The Edge Function validates each authenticated request through Supabase Auth itself. Its gateway JWT check is disabled to accommodate current signing keys and public GET health checks; POST operations still require a real user session. Admin actions additionally require a database-controlled educator role. Secret configuration functions are executable only by the service role.

## Newton

Without a configured model, Newton is explicitly a lesson-retrieval study guide, not a general AI answer service. An educator can connect a Google Gemini key in the studio. The key is tested before saving, stored in a non-exposed schema, and never returned to clients. Each student is limited to 30 tutor requests per hour. Model answers are learning support and should be checked.

## Content

The bank contains 100 structured practice variations for each of 20 sections (2,000 total), generated deterministically from original teaching templates. Numerical variants are not claimed as separate teaching methods. Basic checks validate count, unique question text, finite answers and representative independent results. Educator review of scientific wording and exam-level breadth remains necessary before presenting this as a comprehensive exam course.

The 150-capability build specification in `BUILD_PROMPT.md` is a product specification, not a claim that every listed capability has shipped. Ten-thousand tutor workflows are a long-term target and are not advertised as implemented.

## Privacy and operation

Guest study records remain on the device. Signed-in study records are isolated by database policies. Requests sent to a connected model include question text, recent chat and relevant curriculum material. Do not collect diagnoses or other sensitive health information. The current release does not provide a clinical service.

Pin any additional dependencies and keep model keys, one-time invitations, private test credentials and student data out of Git. Review `RELEASE_REPORT.md` for verified functionality and remaining items.

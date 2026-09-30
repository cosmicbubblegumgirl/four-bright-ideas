# Quantum Jump — build specification

Build and publish **Quantum Jump**, a complete Grade 12 CAPS Physical Sciences learning application for South African learners. Name the tutor **Newton**. The experience should feel like a thoughtful teacher's science studio: precise, reassuring, playful and exceptionally usable. Tagline: **Small steps. Big understanding.**

Use a custom cream, ink, tangerine and soft lilac visual identity, original orbital graphics, generous spacing, readable typography and restrained motion. Avoid generic dashboard templates, fake statistics, builder badges and promotional provider branding. Identify Newton honestly as an AI tutor when a model is connected. Preserve third-party licences and source attribution. Footer: **Made by Simoné Govender · Bachelor of Education**. Credit original Quantum Jump learning resources **Created by Simoné Govender**; credit official examination papers to their actual publisher and label their collection **Curated by Simoné Govender**.

## Architecture and release rules

GitHub Pages serves the frontend. A real Supabase backend provides managed authentication, PostgreSQL, protected uploads and server functions. Never pretend Pages runs a backend. Use isolated `qj_` tables, row-level ownership policies and server-controlled educator roles. Keep model keys and privileged database keys exclusively on the server. Support HTTPS, session refresh, password reset, validation, rate limits, accessible error messages, backups and reproducible migrations. Never store students' passwords yourself or include private student records in the repository.

The educator dashboard must allow direct uploads without editing code. A student must never be able to become an educator by changing a form field or browser storage. A one-time educator claim must be bound to a verified identity and expire after use. Provide a secure admin-only model configuration form. Do not fabricate account confirmations or bypass email verification for real users.

Publish the actual source to GitHub and verify the public Pages URL. Test signup, confirmation requirements, login, logout, saved progress across sessions, forbidden cross-student reads, protected educator uploads and Newton's actual response path. Report any externally blocked integration accurately. Do not label unimplemented features complete.

## Curriculum and worked examples

Separate **Paper 1: Physics** and **Paper 2: Chemistry** throughout navigation, search, practice, exams and educator uploads. Verify the latest applicable DBE curriculum and examination guidance before claiming complete coverage.

Start with these learning sections, splitting further where required by the curriculum:

1. Newton's laws, forces and free-body diagrams.
2. Universal gravitation.
3. Momentum and impulse.
4. Vertical projectile motion.
5. Work, energy and power.
6. Doppler effect.
7. Electrostatics and electric fields.
8. Electric circuits and internal resistance.
9. Electrodynamics, generators and motors.
10. Alternating current.
11. Photoelectric effect and spectra.
12. Organic nomenclature and functional groups.
13. Organic properties and intermolecular forces.
14. Organic reactions and polymers.
15. Reaction rates and energy profiles.
16. Chemical equilibrium.
17. Acids, bases and pH.
18. Titrations and stoichiometry.
19. Galvanic cells and redox.
20. Electrolytic cells and applications.

Populate each section with at least 100 distinct structured worked questions. Distinguish authored problem types from parameter variations; do not disguise repeated templates as 100 different teaching methods. Each example needs: learning objective, question, known quantities, unknown, diagram where helpful, principle, formula, substitution, intermediate calculations, result with units, explanation of why the steps work, common mistake, exam tip, difficulty, attribution and review status. Include conceptual, graphical, experimental and multi-step tasks, not calculations alone. Validate answers computationally where appropriate and provide educator review tools.

Past papers must retain publisher, year, sitting, language, paper number, original question numbering, marks, source URL and matching memorandum. Only link or host verified, permitted resources. Never invent papers or silently label original practice as an official exam. Display question paper and memorandum separately, with topic tagging and side-by-side study where possible.

## Feature catalogue — 150 requested capabilities

### Accounts and student records
1. Email signup.
2. Verified email handling.
3. Password login.
4. Password recovery.
5. Password change.
6. Session refresh.
7. Secure logout.
8. Student profile editing.
9. Private progress persistence.
10. Student data export.

### Learning navigation
11. Personal study dashboard.
12. Paper 1 hub.
13. Paper 2 hub.
14. Topic directory.
15. Topic search.
16. Difficulty filtering.
17. Prerequisite explanations.
18. Learning objectives.
19. Continue-learning links.
20. Topic completion tracking.

### Worked examples
21. At least 100 worked questions per section.
22. Progressive step reveal.
23. Reveal complete solution.
24. Known-and-unknown identification.
25. Formula-selection explanations.
26. Unit-aware solutions.
27. Common-mistake explanations.
28. Exam technique notes.
29. Printable solutions.
30. Example bookmarks.

### Practice and assessment
31. Numerical answer checking.
32. Appropriate numerical tolerances.
33. Concept recall questions.
34. Multiple-choice practice.
35. Topic quizzes.
36. Mixed-paper practice.
37. Optional exam timer.
38. Pauseable study timer.
39. Attempt history.
40. Retry incorrect questions.

### Revision resources
41. Formula bank.
42. Searchable definitions.
43. Flashcards.
44. Shuffle flashcards.
45. Mark flashcards understood.
46. Personal notes.
47. Downloadable notes.
48. Revision checklist.
49. Short study sessions.
50. Printable topic summaries.

### Past papers
51. Separate Paper 1 library.
52. Separate Paper 2 library.
53. Year filter.
54. Sitting filter.
55. Paper links.
56. Matching memo links.
57. Publisher attribution.
58. Language metadata.
59. Topic-tagged questions.
60. Missing-resource reporting.

### Simulation laboratory
61. Force and acceleration simulation.
62. Projectile motion simulation.
63. Energy transfer simulation.
64. Circuit simulation.
65. Doppler simulation.
66. Photoelectric simulation.
67. Reaction-rate simulation.
68. Equilibrium simulation.
69. pH simulation.
70. Electrochemical-cell explanations.

### Simulation teaching controls
71. Labelled variables.
72. Keyboard-operated sliders.
73. Live numerical readouts.
74. Pause and reset.
75. Model assumptions.
76. Predict-before-observing prompts.
77. Explanation of observed changes.
78. Accessible text equivalents.
79. Linked worked examples.
80. Credited external simulation embeds.

### Study planning
81. Daily task list.
82. Add custom tasks.
83. Complete and reopen tasks.
84. Weekly planning.
85. Exam-date setting.
86. Optional exam countdown.
87. Configurable focus duration.
88. Configurable break duration.
89. Gentle session-completion feedback.
90. Progress overview without public rankings.

### Accessibility and calmer study
91. Full keyboard navigation.
92. Visible focus outlines.
93. Skip-to-content link.
94. Semantic headings and landmarks.
95. Screen-reader labels.
96. High-contrast option.
97. Light and dark themes.
98. Text-size control.
99. Line-spacing control.
100. Reduced-motion preference.
101. Distraction-reduced focus mode.
102. Optional reading guide.
103. One-step-at-a-time learning.
104. Optional text-to-speech.
105. Speech stop control.
106. Sensory-quiet display.
107. Flexible break prompts.
108. Hide timers and countdowns.
109. Low-energy study suggestions.
110. Nonjudgmental recovery after missed study.

### Educator studio
111. Protected educator dashboard.
112. Direct PDF upload.
113. Direct image upload.
114. Direct text-resource upload.
115. Paper and section assignment.
116. Resource title and description editing.
117. Draft versus published resources.
118. Preview before publication.
119. Remove educator-owned resources.
120. Original versus external attribution controls.
121. Question-and-memo pairing.
122. File-type and size validation.
123. Upload progress and failure recovery.
124. Student-facing resource library.
125. Content correction and review status.

### Newton
126. Contextual topic explanations.
127. Guided hints before full solutions.
128. Step-by-step calculation help.
129. Plain-language rephrasing.
130. Exam-level explanation mode.
131. Identify missing question information.
132. Check a student's working.
133. Explain misconceptions.
134. Create follow-up practice.
135. Cite supplied learning resources.
136. Persist private conversation history.
137. Delete a conversation.
138. Read answers aloud when requested.
139. Explicit unavailable/error states.
140. Educator-controlled model configuration.

### Reliability and privacy
141. Database-enforced student isolation.
142. Server-enforced educator permissions.
143. Server-only model credentials.
144. Request throttling.
145. Input validation and safe text rendering.
146. Protected file access.
147. Mobile and tablet layouts.
148. Low-bandwidth-friendly resources.
149. Automated integrity and security checks.
150. Reproducible deployment documentation.

## Newton's depth and limits

Newton should support broad Grade 12 Physics and Chemistry questions and have a separate optional full-stack web-development help mode. Keep the science curriculum the default. Never promise perfect answers or claim every imaginable question is supported. Ask for diagrams or missing values where necessary; acknowledge uncertainty and give checkable reasoning.

The ambition is more than 10,000 useful tutoring workflows. Make this a documented, testable catalogue of supported tasks and contexts, not a false claim of 10,000 independently implemented features. Rewordings and numerical substitutions do not count as independent product features. Do not advertise that target as delivered until it is demonstrably met.

Retrieve relevant approved content on the server before calling the model. Treat resource text and student uploads as data, not system instructions. Restrict Newton to the current student's permitted material. Validate numeric work using tools where available. Mark automated feedback as learning support, not official exam marking. When no model key is configured, label the limited built-in guide clearly and preserve access to the worked examples.

## Inclusive design

Support preferences useful to learners experiencing anxiety, ADHD, dyslexia, sensory sensitivity, low energy and other learning barriers without requiring a diagnosis. Do not claim to treat, detect or accommodate every mental disorder. Let learners choose what helps them; keep these preferences private and optional. Avoid shame-based streaks, flashing effects, compulsory sound, surprise motion and forced timers.

## Completion evidence

Deliver the live URL, repository location, educator setup instructions and an accurate release report. Include verified content counts, tested account journeys, access-control results, model-connection status, and any remaining work. A roadmap is not an implemented feature. A frontend with simulated login is not a finished full-stack release.

# Four Bright Ideas

Four independent interactive prototypes: BillBento, TrolleyPop, LingoLoom, and RhythmNest. Each app has its own layout, visual identity and icon.

The published site uses a free Supabase project for email accounts and saved records. The browser uses a publishable key in `config.js`; it is intentionally public. The `database/001_portfolio_records.sql` migration enables ownership policies for every record. Never add a secret or service-role key to a browser file.

To run locally, use `python3 server.py` and visit `http://127.0.0.1:8000`. With `config.js` present, the frontend uses the hosted account service. To exercise the separate Python/SQLite development API, temporarily omit `config.js` locally. Its passwords are salted and hashed; its session cookies are HttpOnly. The browser also supports an explicitly labelled device-only mode for trying the interfaces without an account.

GitHub Pages hosts the static frontend; Supabase hosts the account and records backend. `server.py` and SQLite are a standalone local development option and are not needed by Pages. Account confirmation links must allow the Pages URL in the project's Auth URL configuration. An additional security and privacy review is needed before handling real financial or health data.

BillBento payments are simulations and never move money. TrolleyPop prices and stock are example figures and it does not send orders to shops. LingoLoom translates only its curated phrase pack; it does not claim universal language coverage. RhythmNest stores self-entered notes only, never connects to a pacemaker, and offers no diagnostic or device control features.

Do not enter real financial credentials, private health records, or sensitive identifying information in a public demonstration.

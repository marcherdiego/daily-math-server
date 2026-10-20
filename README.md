# daily-math-server

Landing page + spoiler-free API for the DailyMath app. Deployed on Vercel; no dependencies, plain Node serverless functions.

## Endpoints

- `GET /` — landing page (auto-localizes tagline to 8 languages).
- `GET /privacy` — privacy policy. **Linked from inside the app** (Settings → Legal)
  and required by both stores; keep it in sync with `store/privacy-policy.md` in
  the app repo.
- `GET /terms` — terms of service; same deal, mirrors `store/terms.md`.
- `GET /support` — support page (App Store `support_url` and the Google Play contact website).

**Regla:** la política nombra al desarrollador exactamente como en Google Play: **Awesome Apps V**,
y a la app con el título exacto de la ficha (**Daily Math: Number Puzzle**, `com.awesome.apps.daily.math`).
Único contacto público: awesomee.apps@gmail.com. Google Play rechazó Match Pairs por no cumplirlo
(2026-10-20). Tras cada deploy: `scripts/check-published-policy.sh`.
- `GET /api/puzzle/today` — today's puzzle metadata (UTC date by default; pass `?date=YYYY-MM-DD` for the client's local date). **Never includes the solution.**
- `GET /api/puzzle/{day}` — same, by day index (0-based).
- `GET /api/fact/today?lang=es` — math fact of the day; `lang` one of es en pt zh ru it fr de.
- `GET /api/fact/{day}`
- `GET /api/meta` — dataset info.

## Data

`data/puzzles.json` and `data/facts.json` are copied verbatim from the app repo
(`shared/src/commonMain/composeResources/files/`). When the app dataset is regenerated
(`./gradlew :tools:generator:run`), re-copy both files here and redeploy.

The API is a mirror of the embedded dataset — the app never depends on it.

## Deploy

```bash
vercel --prod
scripts/check-published-policy.sh
```

# daily-math-server

Landing page + spoiler-free API for the DailyMath app. Deployed on Vercel; no dependencies, plain Node serverless functions.

## Endpoints

- `GET /` — landing page (auto-localizes tagline to 8 languages).
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
```

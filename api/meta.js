import { puzzles, sendJson } from "../lib/data.js";

export default function handler(req, res) {
  sendJson(res, 200, {
    name: "DailyMath",
    launchDate: "2026-08-03",
    totalPuzzles: puzzles.length,
    languages: ["es", "en", "pt", "zh", "ru", "it", "fr", "de"],
    endpoints: [
      "/api/puzzle/today (optional ?date=YYYY-MM-DD)",
      "/api/puzzle/{day}",
      "/api/fact/today (optional ?lang=xx&date=YYYY-MM-DD)",
      "/api/fact/{day}",
      "/api/meta",
    ],
  });
}

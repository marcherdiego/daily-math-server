import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export const LAUNCH_DATE_UTC = Date.UTC(2026, 7, 3); // 2026-08-03, puzzle #1
export const puzzles = JSON.parse(readFileSync(join(root, "data", "puzzles.json"), "utf8"));
export const facts = JSON.parse(readFileSync(join(root, "data", "facts.json"), "utf8"));

/**
 * Day index for a given date. The app uses the device's local date; the API
 * accepts ?date=YYYY-MM-DD so clients can pass their local date, defaulting
 * to the current UTC date.
 */
export function dayIndexFor(dateParam) {
  let ms;
  if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    const [y, m, d] = dateParam.split("-").map(Number);
    ms = Date.UTC(y, m - 1, d);
  } else {
    const now = new Date();
    ms = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  }
  const index = Math.floor((ms - LAUNCH_DATE_UTC) / 86_400_000);
  return Math.max(0, index);
}

/** Public shape: never expose the solution — the share link must stay spoiler-free. */
export function publicPuzzle(entry) {
  return {
    number: entry.day + 1,
    day: entry.day,
    target: entry.target,
    difficulty: entry.difficulty,
  };
}

export function sendJson(res, status, body) {
  res.status(status).setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  res.json(body);
}

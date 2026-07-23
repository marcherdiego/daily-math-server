import { puzzles, dayIndexFor, publicPuzzle, sendJson } from "../../lib/data.js";

export default function handler(req, res) {
  const { day, date } = req.query;
  const index = day === "today" ? dayIndexFor(date) : Number.parseInt(day, 10);

  if (!Number.isInteger(index) || index < 0) {
    return sendJson(res, 400, { error: "invalid day" });
  }
  const entry = puzzles[index];
  if (!entry) {
    return sendJson(res, 404, { error: "no puzzle for that day yet" });
  }
  return sendJson(res, 200, publicPuzzle(entry));
}

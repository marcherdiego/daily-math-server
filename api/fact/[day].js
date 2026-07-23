import { facts, dayIndexFor, sendJson } from "../../lib/data.js";

const LANGS = ["es", "en", "pt", "zh", "ru", "it", "fr", "de"];

export default function handler(req, res) {
  const { day, date, lang } = req.query;
  const index = day === "today" ? dayIndexFor(date) : Number.parseInt(day, 10);

  if (!Number.isInteger(index) || index < 0) {
    return sendJson(res, 400, { error: "invalid day" });
  }
  const language = LANGS.includes(lang) ? lang : "en";
  const fact = facts[index % facts.length];
  return sendJson(res, 200, {
    day: index,
    emoji: fact.emoji,
    language,
    text: fact.text[language] ?? fact.text.en,
  });
}

// api/index.js
import { readFileSync } from "fs";
import path from "path";

export const config = { runtime: "nodejs" };

function sendCORS(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default function handler(req, res) {
  sendCORS(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    // 🔴 troque process.cwd() por __dirname relativo ao arquivo da function
    const filePath = path.join(__dirname, "..", "seed", "db.json");
    const db = JSON.parse(readFileSync(filePath, "utf-8"));
    return res.status(200).json({ collections: Object.keys(db) });
  } catch (e) {
    return res.status(500).json({ error: "Erro ao ler db.json", details: String(e) });
  }
}

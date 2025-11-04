// api/[collection].js
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
    // 🔴 idem: caminho baseado no diretório do arquivo
    const filePath = path.join(__dirname, "..", "seed", "db.json");
    const db = JSON.parse(readFileSync(filePath, "utf-8"));

    // pega o segmento depois de /api/
    const match = req.url.match(/^\/api\/([^/?#]+)/);
    const collection = match?.[1];

    if (!collection || !db[collection]) {
      return res.status(404).json({ error: "Coleção não encontrada" });
    }
    return res.status(200).json(db[collection]);
  } catch (e) {
    return res.status(500).json({ error: "Erro ao ler db.json", details: String(e) });
  }
}

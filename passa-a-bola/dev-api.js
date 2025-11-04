/* eslint-env node */
import { readFileSync } from "fs";
import { createServer } from "http";
import { parse } from "url";
import { join } from "path";

const PORT = 3000;

function send(res, status, data, headers = {}) {
  const body = typeof data === "string" ? data : JSON.stringify(data);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,OPTIONS",
    "access-control-allow-headers": "content-type",
    ...headers,
  });
  res.end(body);
}

function readDB() {
  const filePath = join(process.cwd(), "seed", "db.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

const server = createServer((req, res) => {
  const { pathname } = parse(req.url, true);

  if (req.method === "OPTIONS") return send(res, 204, "");

  // GET /api  -> lista coleções
  if (pathname === "/api") {
    try {
      const db = readDB();
      return send(res, 200, { collections: Object.keys(db) });
    } catch (e) {
      return send(res, 500, { error: "Erro ao ler db.json", details: String(e) });
    }
  }

  // GET /api/:collection
  if (pathname && pathname.startsWith("/api/")) {
    const collection = pathname.split("/")[2] || "";
    try {
      const db = readDB();
      if (!(collection in db)) {
        return send(res, 404, { error: "Coleção não encontrada", collections: Object.keys(db) });
      }
      return send(res, 200, db[collection]);
    } catch (e) {
      return send(res, 500, { error: "Erro ao ler db.json", details: String(e) });
    }
  }

  return send(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`✅ API local rodando em http://localhost:${PORT}`);
});

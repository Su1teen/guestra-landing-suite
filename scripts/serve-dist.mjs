// Локальная проверка собранного сайта так, как его отдаёт Cloudflare:
// /crm → dist/crm.html, неизвестный адрес → dist/404.html с кодом 404. API здесь нет: /api/* отвечает 503.
// Запуск: node scripts/serve-dist.mjs [порт]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.argv[2] ?? 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain" };

const exists = async (file) => (await stat(file).catch(() => null))?.isFile() ?? false;

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  if (url.pathname.startsWith("/api/")) {
    res.writeHead(503, { "content-type": "application/json" }).end(JSON.stringify({ ok: false, error: "no_worker_locally" }));
    return;
  }
  const clean = path.normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, "");
  const candidates = url.pathname === "/" ? ["index.html"] : [clean, `${clean}.html`, path.join(clean, "index.html")];
  for (const candidate of candidates) {
    const file = path.join(dist, candidate);
    if (file.startsWith(dist) && (await exists(file))) {
      res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" }).end(await readFile(file));
      return;
    }
  }
  res.writeHead(404, { "content-type": types[".html"] }).end(await readFile(path.join(dist, "404.html")));
}).listen(port, () => console.log(`dist on http://localhost:${port}`));

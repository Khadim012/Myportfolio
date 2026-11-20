// Zero-dependency preview server for the static export in ./out.
// Mirrors the production Nginx rules: try $uri, then $uri/index.html,
// redirect /dir -> /dir/, and fall back to 404.html.
// Usage: npm run preview   (then open http://localhost:4173)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] || "out");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css",
  ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".pdf": "application/pdf",
};

async function isFile(p) { try { return (await stat(p)).isFile(); } catch { return false; } }
async function isDir(p) { try { return (await stat(p)).isDirectory(); } catch { return false; } }

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const rel = decodeURIComponent(url.pathname);
  const file = path.join(root, rel);
  if (!file.startsWith(root)) { res.writeHead(400).end(); return; }
  let target = null, status = 200;
  if (await isFile(file)) target = file;
  else if (await isDir(file)) {
    if (!rel.endsWith("/")) { res.writeHead(301, { Location: rel + "/" + url.search }).end(); return; }
    if (await isFile(path.join(file, "index.html"))) target = path.join(file, "index.html");
  }
  if (!target) { target = path.join(root, "404.html"); status = 404; }
  const body = await readFile(target);
  res.writeHead(status, { "Content-Type": types[path.extname(target)] || "application/octet-stream" });
  res.end(body);
}).listen(port, () => console.log(`Preview: http://localhost:${port}/  (serving ${root})`));

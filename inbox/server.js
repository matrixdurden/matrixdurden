// Anonymous inbox: POST /message {text} from the site -> Discord webhook.
// No dependencies. Config comes from env:
//   DISCORD_WEBHOOK_URL  (required, secret)
//   ALLOWED_ORIGINS      comma-separated, default the GitHub Pages site
//   PORT                 set by Railway
import http from "node:http";

const WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
const ORIGINS = (process.env.ALLOWED_ORIGINS || "https://matrixdurden.github.io").split(",").map(s => s.trim());
const PORT = process.env.PORT || 3000;
const MAX_LEN = 500;

if (!WEBHOOK) { console.error("DISCORD_WEBHOOK_URL is not set"); process.exit(1); }

// Per-IP limits: one message per 20s, five per 10 minutes. Global cap guards the webhook itself.
const hits = new Map();
let globalWindow = { start: Date.now(), count: 0 };
function allowed(ip){
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < 10 * 60e3);
  if (list.length && now - list[list.length - 1] < 20e3) return false;
  if (list.length >= 5) return false;
  if (now - globalWindow.start > 60 * 60e3) globalWindow = { start: now, count: 0 };
  if (globalWindow.count >= 120) return false;
  list.push(now); hits.set(ip, list); globalWindow.count++;
  return true;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, list] of hits) if (!list.some(t => now - t < 10 * 60e3)) hits.delete(ip);
}, 5 * 60e3).unref();

function send(res, status, body, origin){
  const headers = { "Content-Type": "application/json", "Vary": "Origin" };
  if (origin && ORIGINS.includes(origin)){
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "86400";
  }
  res.writeHead(status, headers);
  res.end(body === undefined ? "" : JSON.stringify(body));
}

function readBody(req, limit = 4096){
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", c => { data += c; if (data.length > limit){ reject(new Error("too large")); req.destroy(); } });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

async function forward(text, lang){
  const r = await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "anonim",
      allowed_mentions: { parse: [] }, // never let a message ping anyone
      embeds: [{
        description: text,
        color: 0x1ed760,
        footer: { text: "matrixdurden.github.io · " + (lang === "tr" ? "türkçe" : "english") },
        timestamp: new Date().toISOString()
      }]
    })
  });
  if (!r.ok) throw new Error("discord " + r.status);
}

http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  const url = new URL(req.url, "http://x");

  if (req.method === "GET" && url.pathname === "/") return send(res, 200, { ok: true });
  if (url.pathname !== "/message") return send(res, 404, { error: "not_found" });
  if (req.method === "OPTIONS") return send(res, 204, undefined, origin);
  if (req.method !== "POST") return send(res, 405, { error: "method" }, origin);
  if (!ORIGINS.includes(origin)) return send(res, 403, { error: "origin" }, origin);

  let body;
  try { body = JSON.parse(await readBody(req)); } catch { return send(res, 400, { error: "bad_request" }, origin); }

  // honeypot: real visitors never see or fill the "website" field
  if (body.website) return send(res, 200, { ok: true }, origin);

  const text = String(body.text || "").replace(/\s+\n/g, "\n").trim();
  if (!text) return send(res, 400, { error: "empty" }, origin);
  if (text.length > MAX_LEN) return send(res, 400, { error: "too_long" }, origin);

  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
  if (!allowed(ip)) return send(res, 429, { error: "slow_down" }, origin);

  try {
    await forward(text, body.lang === "tr" ? "tr" : "en");
    send(res, 200, { ok: true }, origin);
  } catch (e) {
    console.error(e.message);
    send(res, 502, { error: "upstream" }, origin);
  }
}).listen(PORT, () => console.log("inbox listening on " + PORT));

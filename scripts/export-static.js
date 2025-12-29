/* scripts/export-static.js
   Exports your Express-rendered pages into /docs for GitHub Pages.
*/
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { spawn } = require("child_process");

const OUT_DIR = path.join(process.cwd(), "docs");
const BASE = "http://127.0.0.1:3000";

// Add every route you want hosted:
const ROUTES = [
  { route: "/", out: "index.html" },
  { route: "/experience", out: "experience/index.html" },
  { route: "/education", out: "education/index.html" },
  { route: "/publications", out: "publications/index.html" },
  { route: "/media", out: "media/index.html" },
  { route: "/about", out: "about/index.html" },
  { route: "/contact", out: "contact/index.html" },
];

// If your blog post route is like /blog/first-post, add it too:
const EXTRA_BLOG_ROUTES = [
  // { route: "/blog/first-post", out: "blog/first-post/index.html" },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content, "utf8");
}

async function waitForServer(timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return true;
    } catch (e) {}
    await sleep(400);
  }
  throw new Error("Server did not start in time.");
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

async function main() {
  // clean docs (but keep folder)
  if (fs.existsSync(OUT_DIR)) {
    for (const name of fs.readdirSync(OUT_DIR)) {
      fs.rmSync(path.join(OUT_DIR, name), { recursive: true, force: true });
    }
  } else {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  // prevent Jekyll messing with assets paths
  fs.writeFileSync(path.join(OUT_DIR, ".nojekyll"), "");

  // start server
  // change this if your start command differs:
  const server = spawn("node", ["src/app.js"], {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" },
  });

  try {
    await waitForServer();

    // copy public assets -> docs/
    // IMPORTANT: your express should already serve /public as static.
    // In your repo, you have src/public, so we copy that.
    const publicDir = path.join(process.cwd(), "src", "public");
    copyDir(publicDir, OUT_DIR);

    const allRoutes = [...ROUTES, ...EXTRA_BLOG_ROUTES];

    for (const r of allRoutes) {
      const url = `${BASE}${r.route}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed ${r.route}: ${res.status} ${res.statusText}`);
      }
      const html = await res.text();

      const outPath = path.join(OUT_DIR, r.out);
      writeFile(outPath, html);
      console.log(`Exported ${r.route} -> docs/${r.out}`);
    }

    console.log("\nDone. Your static site is in /docs\n");
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

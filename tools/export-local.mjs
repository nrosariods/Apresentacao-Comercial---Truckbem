import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const htmlPath = path.join(dist, "index.source.html");
let html = readFileSync(htmlPath, "utf8");

const cssMatch = html.match(/href="(\.\/assets\/[^"]+\.css)"/);
const jsMatch = html.match(/src="(\.\/assets\/[^"]+\.js)"/);

if (!cssMatch || !jsMatch) {
  throw new Error("Não encontrei o CSS ou o JS gerados em dist/index.source.html");
}

const css = readFileSync(path.join(dist, cssMatch[1]), "utf8");
const js = readFileSync(path.join(dist, jsMatch[1]), "utf8").replaceAll("</script>", "<\\/script>");

html = html.replace(/<link[^>]*href="\.\/assets\/[^"]+\.css"[^>]*>/, () => `<style>${css}</style>`);
html = html.replace(
  /<script[^>]*src="\.\/assets\/[^"]+\.js"[^>]*><\/script>/,
  () => `<script type="module">${js}</script>`,
);

html = html
  .replaceAll("./media/", "./public/media/")
  .replaceAll("./brand/", "./public/brand/")
  .replaceAll("./favicon.png", "./public/favicon.png");

writeFileSync(path.join(root, "index.html"), html);
console.log("index.html pronto para abrir no navegador");

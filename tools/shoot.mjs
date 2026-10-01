import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9333 + Number(process.argv[6] || 0);
const url = process.argv[2];
const tag = process.argv[3];
const count = Number(process.argv[4] || 16);
const [width, height] = (process.argv[5] || "1600x900").split("x").map(Number);
const out = `${process.env.TEMP}\\tb-shots`;
mkdirSync(out, { recursive: true });

const child = spawn(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--user-data-dir=${process.env.TEMP}\\tb-chrome-${port}`,
    `--remote-debugging-port=${port}`,
    `--window-size=${width},${height}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  let list = [];
  for (let attempt = 0; attempt < 25; attempt += 1) {
    await wait(300);
    try {
      list = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
      if (list.length) break;
    } catch {
      // still starting
    }
  }
  if (!list.length) throw new Error("debug port closed");
  const page = list.find((target) => target.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let seq = 0;
  const pending = new Map();
  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  });
  await new Promise((resolve) => ws.addEventListener("open", resolve));
  const send = (method, params = {}) => {
    const id = ++seq;
    return new Promise((resolve) => {
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 800,
  });
  await send("Page.navigate", { url });
  await wait(2600);
  for (let i = 0; i < count; i += 1) {
    await wait(1100);
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 62 });
    writeFileSync(`${out}\\${tag}-${String(i + 1).padStart(2, "0")}.jpg`, Buffer.from(shot.result.data, "base64"));
    for (const type of ["keyDown", "keyUp"]) {
      await send("Input.dispatchKeyEvent", {
        type,
        key: "ArrowDown",
        code: "ArrowDown",
        windowsVirtualKeyCode: 40,
      });
    }
  }
  ws.close();
  console.log(out);
} finally {
  child.kill();
}

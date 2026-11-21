// Renders the 1200x630 social preview images and the apple-touch-icon with a
// local Chrome:
//   public/og.png                 homepage: portrait, name, role, two app screens
//   public/og/projects.png        projects index
//   public/og/<slug>.png          one per case study, from its real screenshots and logo
//   public/apple-touch-icon.png   from scripts/og-template.html (#icon)
// Run: npm run images
import { chromium } from "playwright-core";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const pub = path.join(root, "public");
const img = (p) => pathToFileURL(path.join(pub, p)).href;
const font = (f) => pathToFileURL(path.join(root, "node_modules/@fontsource-variable/inter/files", f)).href;

const css = `
@font-face { font-family: Inter; src: url(${font("inter-latin-wght-normal.woff2")}) format("woff2"); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; font-family: Inter, sans-serif; color: #16130f; background: #faf8f4; overflow: hidden; }
.card { position: relative; width: 1200px; height: 630px; padding: 64px 72px; display: flex; gap: 48px; }
.card::before { content: ""; position: absolute; inset: auto -120px -220px auto; width: 720px; height: 720px; border-radius: 50%;
  background: radial-gradient(closest-side, #efe5f3, transparent); }
.card::after { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 10px; background: #a83c0c; }
.text { position: relative; flex: 1; display: flex; flex-direction: column; min-width: 0; }
.eyebrow { font-size: 22px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #57514a; }
h1 { font-size: 64px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 700; margin-top: 18px; }
h1.small { font-size: 54px; }
.role { margin-top: 20px; font-size: 30px; line-height: 1.3; color: #3d3832; font-weight: 500; }
.tags { margin-top: auto; display: flex; flex-wrap: wrap; gap: 10px; }
.tag { font-size: 21px; font-weight: 600; padding: 8px 16px; border-radius: 999px; background: #f2eee6; border: 1px solid #e2dcd1; }
.site { margin-top: 22px; font-size: 24px; font-weight: 600; color: #a83c0c; }
.brand { display: flex; align-items: center; gap: 18px; }
.mark { width: 76px; height: 76px; border-radius: 18px; border: 1px solid #e2dcd1; background: #fff; overflow: hidden; display: grid; place-items: center; }
.mark img { width: 100%; height: 100%; object-fit: cover; }
.mark.pad img { width: 72%; height: 72%; object-fit: contain; }
.mark.initials { font-size: 28px; font-weight: 700; color: #57514a; }
.portrait { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; object-position: top; border: 2px solid #fff; box-shadow: 0 4px 16px rgb(22 19 15 / .15); }
.visual { position: relative; width: 470px; flex: none; display: flex; align-items: center; justify-content: center; gap: 22px; }
.phone { width: 208px; border-radius: 26px; overflow: hidden; border: 1px solid #e2dcd1; background: #fff;
  box-shadow: 0 2px 4px rgb(22 19 15 / .08), 0 28px 50px -26px rgb(22 19 15 / .45); }
.phone img { display: block; width: 100%; }
.phone.up { transform: translateY(-26px); }
.phone.down { transform: translateY(34px); }
.desk { position: absolute; left: 0; top: 96px; width: 430px; border-radius: 14px; overflow: hidden; border: 1px solid #e2dcd1; background: #fff;
  box-shadow: 0 2px 4px rgb(22 19 15 / .08), 0 28px 50px -26px rgb(22 19 15 / .45); }
.desk::before { content: ""; display: block; height: 18px; background: #faf8f4; border-bottom: 1px solid #e2dcd1; }
.desk img { display: block; width: 100%; }
.desk + .phone { position: absolute; right: 0; bottom: -40px; width: 170px; }
.big { width: 300px; height: 300px; border-radius: 64px; }
`;

const page = (inner) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${inner}</body></html>`;

const mark = (logo, initials, pad = false) =>
  logo
    ? `<div class="mark${pad ? " pad" : ""}"><img src="${img(logo)}" alt=""></div>`
    : `<div class="mark initials">${initials}</div>`;

const phones = (a, b) => `
  <div class="visual">
    <div class="phone up"><img src="${img(a)}" alt=""></div>
    ${b ? `<div class="phone down"><img src="${img(b)}" alt=""></div>` : ""}
  </div>`;

const deskPhone = (d, p) => `
  <div class="visual"><div class="desk"><img src="${img(d)}" alt=""></div><div class="phone"><img src="${img(p)}" alt=""></div></div>`;

const cards = {
  "og.png": page(`<div class="card"><div class="text">
      <div class="brand"><img class="portrait" src="${img("images/profile/khadim-hussain.webp")}" alt="">
        <div class="eyebrow">Dubai, UAE</div></div>
      <h1>Khadim Hussain</h1>
      <div class="role">Senior iOS Engineer in Dubai.<br>Native iOS with Swift, SwiftUI &amp; UIKit.</div>
      <div class="tags"><span class="tag">Life Pharmacy</span><span class="tag">ZUSHH</span><span class="tag">Nordic Home Healthcare</span></div>
      <div class="site">khadimhussain.com</div>
    </div>${phones("images/life-pharmacy/home.webp", "images/zushh/services.webp")}</div>`),

  "og/projects.png": page(`<div class="card"><div class="text">
      <div class="eyebrow">Projects · Khadim Hussain</div>
      <h1>iOS, Android &amp; web projects</h1>
      <div class="role">Case studies from a Senior iOS Engineer in Dubai.</div>
      <div class="tags"><span class="tag">Life Pharmacy</span><span class="tag">ZUSHH</span><span class="tag">Nordic</span><span class="tag">ZIRO</span><span class="tag">CloudGate</span></div>
      <div class="site">khadimhussain.com/projects</div>
    </div>${phones("images/life-pharmacy/home.webp", "images/nordic-home-healthcare/home.webp")}</div>`),

  "og/life-pharmacy.png": page(`<div class="card"><div class="text">
      <div class="brand">${mark("images/logos/life-pharmacy.webp")}<div class="eyebrow">Case study</div></div>
      <h1 class="small">Life Pharmacy iOS app</h1>
      <div class="role">Led iOS development and the full UIKit-to-SwiftUI migration.</div>
      <div class="tags"><span class="tag">Swift</span><span class="tag">SwiftUI</span><span class="tag">UIKit</span></div>
      <div class="site">Khadim Hussain · khadimhussain.com</div>
    </div>${phones("images/life-pharmacy/home.webp", "images/life-pharmacy/click-and-collect-app.webp")}</div>`),

  "og/zushh.png": page(`<div class="card"><div class="text">
      <div class="brand">${mark("images/logos/zushh.webp")}<div class="eyebrow">Case study</div></div>
      <h1 class="small">ZUSHH mobile &amp; web</h1>
      <div class="role">Native iOS app, plus Android, website and backend for on-demand home services.</div>
      <div class="tags"><span class="tag">iOS</span><span class="tag">Android</span><span class="tag">Web</span><span class="tag">Backend</span></div>
      <div class="site">Khadim Hussain · khadimhussain.com</div>
    </div>${deskPhone("images/zushh/website.webp", "images/zushh/services.webp")}</div>`),

  "og/nordic-home-healthcare.png": page(`<div class="card"><div class="text">
      <div class="brand">${mark("images/logos/nordic-home-healthcare.webp")}<div class="eyebrow">Case study</div></div>
      <h1 class="small">Nordic Home Healthcare</h1>
      <div class="role">The mobile and web platform I own: Android, iOS, website and APIs.</div>
      <div class="tags"><span class="tag">Kotlin</span><span class="tag">iOS</span><span class="tag">Next.js</span><span class="tag">Node.js</span></div>
      <div class="site">Khadim Hussain · khadimhussain.com</div>
    </div>${deskPhone("images/nordic-home-healthcare/website.webp", "images/nordic-home-healthcare/home.webp")}</div>`),

  "og/ziro.png": page(`<div class="card"><div class="text">
      <div class="brand">${mark(null, "ZR")}<div class="eyebrow">Case study</div></div>
      <h1 class="small">ZIRO Rider &amp; ZIRO Captain</h1>
      <div class="role">Led the iOS team for two ride-hailing apps with live tracking and payments.</div>
      <div class="tags"><span class="tag">Swift</span><span class="tag">Socket.IO</span><span class="tag">Stripe</span><span class="tag">Apple Pay</span></div>
      <div class="site">Khadim Hussain · khadimhussain.com</div>
    </div><div class="visual"><div class="mark initials big" style="font-size:96px">ZR</div></div></div>`),

  "og/cloudgate.png": page(`<div class="card"><div class="text">
      <div class="brand">${mark("images/logos/soloinsight.svg", "", true)}<div class="eyebrow">Case study</div></div>
      <h1 class="small">CloudGate by Soloinsight</h1>
      <div class="role">Built and maintained a suite of seven enterprise iOS apps.</div>
      <div class="tags"><span class="tag">Swift</span><span class="tag">BLE beacons</span><span class="tag">QR passes</span><span class="tag">SQLite</span></div>
      <div class="site">Khadim Hussain · khadimhussain.com</div>
    </div><div class="visual"><div class="mark pad big"><img src="${img("images/logos/soloinsight.svg")}" alt=""></div></div></div>`),
};

const tmp = path.join(here, ".og-tmp");
await mkdir(tmp, { recursive: true });
await mkdir(path.join(pub, "og"), { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome" });
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const [out, html] of Object.entries(cards)) {
  const file = path.join(tmp, out.replace(/[/.]/g, "_") + ".html");
  await writeFile(file, html);
  await tab.goto(pathToFileURL(file).href);
  await tab.evaluate(() => document.fonts.ready);
  await tab.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
  await tab.screenshot({ path: path.join(pub, out), clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log("wrote", out);
}
// apple-touch-icon from the original template
await tab.setViewportSize({ width: 1300, height: 900 });
await tab.goto(pathToFileURL(path.join(here, "og-template.html")).href);
await tab.evaluate(() => document.fonts.ready);
await tab.locator("#icon").screenshot({ path: path.join(pub, "apple-touch-icon.png") });
await browser.close();
await rm(tmp, { recursive: true, force: true });
console.log("ok");

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
body { width: 1200px; height: 630px; font-family: Inter, sans-serif; color: #1d1d1f; background: #f5f5f7; overflow: hidden; }
.card { position: relative; width: 1200px; height: 630px; padding: 64px 72px; display: flex; gap: 48px; }
.card::before { content: ""; position: absolute; inset: auto -120px -220px auto; width: 720px; height: 720px; border-radius: 50%;
  background: radial-gradient(closest-side, #dbe9fb, transparent); }
.card::after { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 10px; background: #0066cc; }
.text { position: relative; flex: 1; display: flex; flex-direction: column; min-width: 0; }
.eyebrow { font-size: 22px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #515154; }
h1 { font-size: 64px; line-height: 1.04; letter-spacing: -0.03em; font-weight: 700; margin-top: 18px; }
h1.small { font-size: 54px; }
.role { margin-top: 20px; font-size: 30px; line-height: 1.3; color: #3a3a3d; font-weight: 500; }
.tags { margin-top: auto; display: flex; flex-wrap: wrap; gap: 10px; }
.tag { font-size: 21px; font-weight: 600; padding: 8px 16px; border-radius: 999px; background: #ffffff; border: 1px solid #d7d7db; }
.site { margin-top: 22px; font-size: 24px; font-weight: 600; color: #0066cc; }
.brand { display: flex; align-items: center; gap: 18px; }
.mark { width: 76px; height: 76px; border-radius: 18px; border: 1px solid #d7d7db; background: #fff; overflow: hidden; display: grid; place-items: center; }
.mark img { width: 100%; height: 100%; object-fit: cover; }
.mark.pad img { width: 72%; height: 72%; object-fit: contain; }
.mark.initials { font-size: 28px; font-weight: 700; color: #515154; }
.portrait { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; object-position: top; border: 2px solid #fff; box-shadow: 0 4px 16px rgb(22 19 15 / .15); }
.visual { position: relative; width: 470px; flex: none; display: flex; align-items: center; justify-content: center; gap: 22px; }
.phone { width: 208px; border-radius: 26px; overflow: hidden; border: 1px solid #d7d7db; background: #fff;
  box-shadow: 0 2px 4px rgb(22 19 15 / .08), 0 28px 50px -26px rgb(22 19 15 / .45); }
.phone img { display: block; width: 100%; }
.phone.up { transform: translateY(-26px); }
.phone.down { transform: translateY(34px); }
.desk { position: absolute; left: 0; top: 96px; width: 430px; border-radius: 14px; overflow: hidden; border: 1px solid #d7d7db; background: #fff;
  box-shadow: 0 2px 4px rgb(22 19 15 / .08), 0 28px 50px -26px rgb(22 19 15 / .45); }
.desk::before { content: ""; display: block; height: 18px; background: #f5f5f7; border-bottom: 1px solid #d7d7db; }
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
      <div class="role">Built the native iOS app; contributed to Android, web and backend.</div>
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
      <div class="brand">${mark("images/logos/ziro.webp")}<div class="eyebrow">Case study</div></div>
      <h1 class="small">ZIRO Rider &amp; ZIRO Captain</h1>
      <div class="role">Led the iOS team for two ride-hailing apps with live tracking and payments.</div>
      <div class="tags"><span class="tag">Swift</span><span class="tag">Socket.IO</span><span class="tag">Stripe</span><span class="tag">Apple Pay</span></div>
      <div class="site">Khadim Hussain · khadimhussain.com</div>
    </div><div class="visual"><img src="${img("images/ziro/tree-trips.webp")}" alt="" style="width:100%;border-radius:28px;box-shadow:0 24px 60px -24px rgba(29,29,31,.45)"></div></div>`),

  "og/cloudgate.png": page(`<div class="card"><div class="text">
      <div class="brand">${mark("images/logos/soloinsight.svg", "", true)}<div class="eyebrow">Case study</div></div>
      <h1 class="small">CloudGate by Soloinsight</h1>
      <div class="role">Built and maintained a suite of seven enterprise iOS apps.</div>
      <div class="tags"><span class="tag">Swift</span><span class="tag">BLE beacons</span><span class="tag">QR passes</span><span class="tag">SQLite</span></div>
      <div class="site">Khadim Hussain · khadimhussain.com</div>
    </div><div class="visual"><div class="mark pad big"><img src="${img("images/logos/soloinsight.svg")}" alt=""></div></div></div>`),
};

// Illustrative AI-assisted workspace for the homepage (1200x800). Generic code
// written for the illustration, plus the public LIFE Pharmacy home screen.
const aiCss = `
@font-face { font-family: Inter; src: url(${font("inter-latin-wght-normal.woff2")}) format("woff2"); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 800px; background: linear-gradient(160deg,#dbe9fb,#eef4fc 55%,#f5f5f7); font-family: Inter, sans-serif; overflow: hidden; }
.win { position: absolute; left: 48px; top: 56px; width: 800px; height: 640px; border-radius: 18px; background: #1e1f24; overflow: hidden;
  box-shadow: 0 0 0 1px rgb(0 0 0 / .25), 0 40px 80px -30px rgb(10 30 60 / .55); }
.bar { height: 40px; background: #2a2b31; display: flex; align-items: center; gap: 8px; padding: 0 16px; }
.dot { width: 12px; height: 12px; border-radius: 50%; } .r{background:#ff5f57}.y{background:#febc2e}.g{background:#28c840}
.file { margin-left: 18px; color: #c8c9d0; font-size: 14px; font-weight: 500; }
pre { font: 15.5px/1.6 "SF Mono", Menlo, "DejaVu Sans Mono", monospace; color: #d6d8e0; padding: 18px 24px; white-space: pre; }
.k{color:#fc5fa3}.t{color:#5dd8ff}.s{color:#fc6a5d}.f{color:#67b7a4}.c{color:#7f8c98}
.ai { position: absolute; left: 0; right: 0; bottom: 0; height: 236px; background: #17181c; border-top: 1px solid #34353c; padding: 16px 22px; color: #d6d8e0;
  font: 14.5px/1.55 "SF Mono", Menlo, "DejaVu Sans Mono", monospace; }
.ai .p { color: #8ab4ff; } .ai .ok { color: #5fd38d; } .ai .m { color: #9aa0ab; }
.phone { position: absolute; right: 64px; top: 84px; width: 290px; border-radius: 46px; background: #0d0d0f; padding: 12px;
  box-shadow: 0 0 0 2px #3a3a3f, 0 40px 80px -30px rgb(10 30 60 / .6); }
.phone img { display: block; width: 100%; border-radius: 35px; }
.tag { position: absolute; left: 48px; bottom: 26px; font-size: 15px; font-weight: 600; color: #3b4a63; letter-spacing: .02em; }
`;
cards["images/ai/workspace.png"] = `<!doctype html><html><head><meta charset="utf-8"><style>${aiCss}</style></head><body>
<div class="win">
  <div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span class="file">ProductCard.swift</span></div>
<pre><span class="k">struct</span> <span class="t">ProductCard</span>: <span class="t">View</span> {
    <span class="k">let</span> product: <span class="t">Product</span>

    <span class="k">var</span> body: <span class="k">some</span> <span class="t">View</span> {
        <span class="t">VStack</span>(alignment: .leading, spacing: <span class="s">8</span>) {
            <span class="t">AsyncImage</span>(url: product.imageURL) { image <span class="k">in</span>
                image.<span class="f">resizable</span>().<span class="f">scaledToFit</span>()
            } placeholder: { <span class="t">ProgressView</span>() }
            <span class="t">Text</span>(product.name).<span class="f">font</span>(.headline)
            <span class="t">Text</span>(product.price, format: .<span class="f">currency</span>(code: <span class="s">"AED"</span>))
        }
    }
}</pre>
  <div class="ai">
    <div><span class="p">›</span> Convert the UIKit ProductCell to a SwiftUI ProductCard. Keep the layout.</div>
    <div class="m" style="margin-top:8px">Proposed: new ProductCard.swift, ProductListView uses it, ProductCell removed.</div>
    <div class="m">Review the diff, then build and run the tests before applying.</div>
    <div style="margin-top:8px"><span class="ok">✓</span> Build succeeded · <span class="ok">✓</span> Tests passed</div>
    <div style="margin-top:8px"><span class="p">›</span> <span class="m">Reviewed. Applying the change.</span></div>
  </div>
</div>
<div class="phone"><img src="${img("images/life-pharmacy/home.webp")}" alt=""></div>
<div class="tag">ILLUSTRATION · generic example code</div>
</body></html>`;

const tmp = path.join(here, ".og-tmp");
await mkdir(tmp, { recursive: true });
await mkdir(path.join(pub, "og"), { recursive: true });
await mkdir(path.join(pub, "images/ai"), { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome" });
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const [out, html] of Object.entries(cards)) {
  const file = path.join(tmp, out.replace(/[/.]/g, "_") + ".html");
  await writeFile(file, html);
  const tall = out.startsWith("images/ai/");
  await tab.setViewportSize(tall ? { width: 1200, height: 800 } : { width: 1200, height: 630 });
  await tab.goto(pathToFileURL(file).href);
  await tab.evaluate(() => document.fonts.ready);
  await tab.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
  await tab.screenshot({ path: path.join(pub, out), clip: { x: 0, y: 0, width: 1200, height: tall ? 800 : 630 } });
  console.log("wrote", out);
}
// apple-touch-icon from the original template
await tab.setViewportSize({ width: 1300, height: 900 });
await tab.goto(pathToFileURL(path.join(here, "og-template.html")).href);
await tab.evaluate(() => document.fonts.ready);
await tab.locator("#icon").screenshot({ path: path.join(pub, "apple-touch-icon.png") });
await browser.close();
await rm(tmp, { recursive: true, force: true });
// The workspace illustration ships as WebP.
const sharp = (await import("sharp")).default;
await sharp(path.join(pub, "images/ai/workspace.png")).webp({ quality: 82, effort: 6 }).toFile(path.join(pub, "images/ai/workspace.webp"));
await rm(path.join(pub, "images/ai/workspace.png"));
console.log("ok");

// Renders public/og.png (1200x630) and public/apple-touch-icon.png (180x180)
// from scripts/og-template.html using a local Chrome.
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
import path from "node:path";
const here = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome" });
const page = await browser.newPage({ viewport: { width: 1300, height: 900 } });
await page.goto("file://" + path.join(here, "og-template.html"));
await page.evaluate(() => document.fonts.ready);
await page.locator("#og").screenshot({ path: path.join(here, "../public/og.png") });
await page.locator("#icon").screenshot({ path: path.join(here, "../public/apple-touch-icon.png"), omitBackground: false });
await browser.close();
console.log("ok");

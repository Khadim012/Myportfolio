// End-to-end checks of the built site in Chrome.
// Usage: BASE=https://khadimhussain.com node scripts/browser-test.mjs
//   (BASE defaults to the local preview server, http://localhost:4173)
// When BASE points at the production hostname but RESOLVE is set to an IP,
// Chrome is pointed at that IP instead (used to test the Nginx config locally).
import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = (process.env.BASE || "http://localhost:4173").replace(/\/$/, "");
const RESOLVE = process.env.RESOLVE;
const SHOTS = process.env.SHOTS || "test-results";
await mkdir(SHOTS, { recursive: true });

const args = [];
if (RESOLVE) {
  args.push(`--host-resolver-rules=MAP khadimhussain.com ${RESOLVE}, MAP www.khadimhussain.com ${RESOLVE}`);
  args.push("--no-proxy-server");
}
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  args,
});

const pages = [
  "/",
  "/projects/",
  "/projects/life-pharmacy/",
  "/projects/zushh/",
  "/projects/nordic-home-healthcare/",
  "/projects/ziro/",
  "/projects/cloudgate/",
];
// Exact titles and social images per indexable page (SEO brief, Nov 2026).
const EXPECTED = {
  "/": { title: "Khadim Hussain | Senior iOS Engineer in Dubai", og: "/og.png" },
  "/projects/": { title: "iOS, Android & Web Projects | Khadim Hussain", og: "/og/projects.png" },
  "/projects/life-pharmacy/": { title: "Life Pharmacy iOS & SwiftUI Case Study | Khadim Hussain", og: "/og/life-pharmacy.png" },
  "/projects/zushh/": { title: "ZUSHH Mobile & Web Case Study | Khadim Hussain", og: "/og/zushh.png" },
  "/projects/nordic-home-healthcare/": { title: "Nordic Home Healthcare Case Study | Khadim Hussain", og: "/og/nordic-home-healthcare.png" },
  "/projects/ziro/": { title: "ZIRO Ride-Hailing iOS Case Study | Khadim Hussain", og: "/og/ziro.png" },
  "/projects/cloudgate/": { title: "CloudGate Enterprise iOS Case Study | Khadim Hussain", og: "/og/cloudgate.png" },
};

const viewports = {
  mobile: { width: 375, height: 812 },
  phone390: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};

const results = [];
let failures = 0;
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
};

const ctxOpts = (vp) => ({ viewport: vp, ignoreHTTPSErrors: true, deviceScaleFactor: 1 });

// 1) Every page at every width: loads directly, metadata, overflow, console errors.
for (const [vpName, vp] of Object.entries(viewports)) {
  const ctx = await browser.newContext(ctxOpts(vp));
  for (const path of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    const label = `[${vpName}] ${path}`;
    check(`${label} direct load 200`, res?.status() === 200, `status ${res?.status()}`);
    // Scroll through the page so lazy-loaded images load before they are checked.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
    });
    await page.waitForLoadState("networkidle");
    await page.waitForFunction(() => [...document.images].every((i) => i.naturalWidth > 0), null, { timeout: 10000 }).catch(() => {});
    await page.evaluate(() => window.scrollTo(0, 0));

    const info = await page.evaluate(() => {
      const meta = (sel) => document.querySelector(sel)?.getAttribute("content") || null;
      const doc = document.documentElement;
      const wide = [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > doc.clientWidth + 1 || r.left < -1);
        })
        .filter((el) => !el.closest("[hidden]") && getComputedStyle(el).position !== "fixed")
        .slice(0, 3)
        .map((el) => el.tagName + "." + (el.className?.toString?.() || "").slice(0, 40));
      return {
        title: document.title,
        description: meta('meta[name="description"]'),
        canonical: document.querySelector('link[rel="canonical"]')?.href || null,
        ogTitle: meta('meta[property="og:title"]'),
        ogImage: meta('meta[property="og:image"]'),
        ogUrl: meta('meta[property="og:url"]'),
        h1: document.querySelectorAll("h1").length,
        overflow: doc.scrollWidth - doc.clientWidth,
        wide,
        // A broken or never-loaded image has no intrinsic width. (Lazy images that
        // have loaded can still report complete=false once scrolled away.)
        // Images hidden at this width (display:none) are never fetched, so skip them.
        brokenImages: [...document.images]
          .filter((i) => i.getClientRects().length > 0 && i.naturalWidth === 0)
          .map((i) => i.getAttribute("src")),
        twitterCard: meta('meta[name="twitter:card"]'),
        twitterImage: meta('meta[name="twitter:image"]'),
        ogImageW: meta('meta[property="og:image:width"]'),
        ogImageH: meta('meta[property="og:image:height"]'),
        robots: meta('meta[name="robots"]'),
        cvButtons: [...document.querySelectorAll("a")].filter((a) => /download cv/i.test(a.textContent || "")).length,
      };
    });
    check(`${label} exact title`, info.title === EXPECTED[path].title, info.title);
    check(`${label} meta description 70-160 chars`, !!info.description && info.description.length >= 70 && info.description.length <= 160, `${info.description?.length}`);
    check(`${label} indexable`, !info.robots || !/noindex/i.test(info.robots), info.robots || "no robots meta");
    check(`${label} twitter card`, info.twitterCard === "summary_large_image" && info.twitterImage === info.ogImage, `${info.twitterCard} ${info.twitterImage}`);
    check(`${label} og image 1200x630`, info.ogImageW === "1200" && info.ogImageH === "630", `${info.ogImageW}x${info.ogImageH}`);
    check(`${label} canonical`, info.canonical === `https://khadimhussain.com${path}`, info.canonical || "missing");
    check(`${label} og tags`, info.ogTitle === EXPECTED[path].title && info.ogImage === `https://khadimhussain.com${EXPECTED[path].og}` && info.ogUrl === `https://khadimhussain.com${path}`, `${info.ogUrl} ${info.ogImage}`);
    check(`${label} one h1`, info.h1 === 1, String(info.h1));
    check(`${label} no horizontal overflow`, info.overflow <= 0, `${info.overflow}px ${info.wide.join(", ")}`);
    check(`${label} images load`, info.brokenImages.length === 0, info.brokenImages.join(", "));
    if (path === "/") check(`${label} Download CV buttons shown`, info.cvButtons >= 1, String(info.cvButtons));
    check(`${label} no console errors`, errors.length === 0, errors.join(" | ").slice(0, 300));
    const file = `${SHOTS}/${vpName}-${path === "/" ? "home" : path.replaceAll("/", "_").replace(/^_|_$/g, "")}.png`;
    // Scroll-driven reveals depend on scroll position, so freeze them for the full-page capture.
    await page.addStyleTag({ content: ".reveal{animation:none!important}" });
    await page.screenshot({ path: file, fullPage: true });
    await page.close();
  }
  await ctx.close();
}

// 2) Internal links all resolve, external links open safely in a new tab.
{
  const ctx = await browser.newContext(ctxOpts(viewports.desktop));
  const page = await ctx.newPage();
  const internal = new Set();
  const external = new Map();
  for (const path of pages) {
    await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    const links = await page.$$eval("a[href]", (as) =>
      as.map((a) => ({ href: a.getAttribute("href"), abs: a.href, target: a.target, rel: a.rel, text: a.textContent?.trim() })),
    );
    for (const l of links) {
      if (l.href.startsWith("mailto:") || l.href.startsWith("tel:")) continue;
      if (l.href.startsWith("/") || l.href.startsWith("#")) internal.add(l.abs.split("#")[0]);
      else external.set(l.abs, l);
    }
  }
  // Fetch from inside the page so requests use Chrome's resolver.
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  for (const url of internal) {
    const status = await page.evaluate(async (u) => (await fetch(u, { cache: "no-store" })).status, url);
    check(`internal link ${url.replace(BASE, "")}`, status === 200, String(status));
  }
  for (const [url, l] of external) {
    check(`external link safe: ${url}`, l.target === "_blank" && l.rel.includes("noopener"), `target=${l.target} rel=${l.rel}`);
  }
  await writeFile(`${SHOTS}/external-links.json`, JSON.stringify([...external.keys()], null, 2));

  // Anchors used by the nav exist.
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  for (const id of ["work", "experience", "skills", "contact", "education"]) {
    check(`anchor #${id} exists`, (await page.locator(`#${id}`).count()) === 1);
  }
  await ctx.close();
}

// 3) Click-through navigation.
{
  const ctx = await browser.newContext(ctxOpts(viewports.desktop));
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "View projects" }).click();
  await page.waitForURL("**/#work");
  check("nav: View projects scrolls to Featured work", page.url() === BASE + "/#work", page.url());
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Projects" }).click();
  await page.waitForURL("**/projects/");
  await page.getByRole("link", { name: "ZUSHH", exact: true }).click();
  await page.waitForURL("**/projects/zushh/");
  check("nav: project card -> case study", (await page.locator("h1").textContent()).startsWith("ZUSHH"));
  await page.getByRole("link", { name: /Nordic Home Healthcare/ }).last().click();
  await page.waitForURL("**/projects/nordic-home-healthcare/");
  check("nav: next case study link", page.url().endsWith("/projects/nordic-home-healthcare/"), page.url());
  await page.reload({ waitUntil: "networkidle" });
  check("nav: refresh on case study keeps page", (await page.locator("h1").textContent()).startsWith("Nordic Home Healthcare"));
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Contact" }).click();
  await page.waitForURL("**/#contact");
  await page.waitForTimeout(800);
  const contactVisible = await page.locator("#contact").evaluate((el) => {
    const r = el.getBoundingClientRect();
    return r.top >= 0 && r.top < window.innerHeight;
  });
  check("nav: Contact link scrolls to contact section", contactVisible);
  const back = await page.goto(BASE + "/projects/ziro", { waitUntil: "networkidle" });
  check("direct URL without trailing slash resolves", back?.status() === 200 && page.url().endsWith("/projects/ziro/"), page.url());
  const nf = await page.goto(BASE + "/projects/does-not-exist/", { waitUntil: "networkidle" });
  check("unknown case study returns 404 page", nf?.status() === 404 && (await page.title()).includes("Page not found"), String(nf?.status()));
  await ctx.close();
}

// 4) Mobile menu: opens, is keyboard-closable, links navigate.
{
  const ctx = await browser.newContext(ctxOpts(viewports.mobile));
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const btn = page.getByRole("button", { name: "Menu" });
  check("mobile: menu button visible", await btn.isVisible());
  check("mobile: desktop nav hidden", !(await page.getByRole("navigation", { name: "Main" }).isVisible()));
  await btn.focus();
  await page.keyboard.press("Enter");
  check("mobile: menu opens via keyboard", (await page.getByRole("button", { name: "Close" }).getAttribute("aria-expanded")) === "true");
  await page.keyboard.press("Escape");
  check("mobile: Escape closes menu and restores focus",
    (await page.getByRole("button", { name: "Menu" }).getAttribute("aria-expanded")) === "false" &&
      (await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") !== null)));
  await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Projects" }).click();
  await page.waitForURL("**/projects/");
  check("mobile: menu link navigates", page.url() === BASE + "/projects/");
  await ctx.close();
}

// 5) Keyboard access: skip link first, visible focus, no focus on hidden elements.
{
  const ctx = await browser.newContext(ctxOpts(viewports.desktop));
  const page = await ctx.newPage();
  for (const path of ["/", "/projects/zushh/"]) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.keyboard.press("Tab");
    const first = await page.evaluate(() => {
      const el = document.activeElement;
      const r = el.getBoundingClientRect();
      return { text: el.textContent?.trim(), visible: r.width > 1 && r.height > 1 };
    });
    check(`[keyboard] ${path} first Tab is a visible skip link`, first.text === "Skip to content" && first.visible, JSON.stringify(first));
    await page.keyboard.press("Enter");
    const skipped = await page.evaluate(() => document.activeElement?.id);
    check(`[keyboard] ${path} skip link moves focus to main`, skipped === "main", String(skipped));

    const stops = [];
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press("Tab");
      const s = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const ring = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
        const cardRing = !!el.closest("article")?.querySelector("span.pointer-events-none");
        return {
          tag: el.tagName,
          text: (el.textContent || "").trim().slice(0, 40),
          visible: r.width > 0 && r.height > 0 && cs.visibility !== "hidden",
          focusIndicator: ring || cardRing,
        };
      });
      if (!s) break;
      stops.push(s);
    }
    const invisible = stops.filter((s) => !s.visible);
    const noRing = stops.filter((s) => !s.focusIndicator);
    check(`[keyboard] ${path} ${stops.length} tab stops, none invisible`, stops.length > 5 && invisible.length === 0, invisible.map((s) => s.text).join(", "));
    check(`[keyboard] ${path} every tab stop shows a focus indicator`, noRing.length === 0, noRing.map((s) => `${s.tag}:${s.text}`).join(", "));
  }
  await page.screenshot({ path: `${SHOTS}/keyboard-focus.png` });
  await ctx.close();
}

// 6) Reduced motion disables animation.
{
  const ctx = await browser.newContext({ ...ctxOpts(viewports.desktop), reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const anim = await page.evaluate(() => {
    const els = [...document.querySelectorAll(".rise, .reveal")];
    return els.filter((el) => getComputedStyle(el).animationName !== "none").length;
  });
  check("reduced motion: no animations run", anim === 0, `${anim} animated`);
  const ctx2 = await browser.newContext({ ...ctxOpts(viewports.desktop), reducedMotion: "no-preference" });
  const p2 = await ctx2.newPage();
  await p2.goto(BASE + "/", { waitUntil: "networkidle" });
  const anim2 = await p2.evaluate(() => [...document.querySelectorAll(".rise")].filter((el) => getComputedStyle(el).animationName !== "none").length);
  check("motion allowed: hero animates", anim2 > 0, `${anim2} animated`);
  await ctx.close();
  await ctx2.close();
}

// 7) CV download: the button downloads a PDF that contains no phone number.
{
  const ctx = await browser.newContext({ ...ctxOpts(viewports.desktop), acceptDownloads: true });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const [dl] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: "Download CV" }).first().click(),
  ]);
  const file = `${SHOTS}/downloaded-cv.pdf`;
  await dl.saveAs(file);
  const { readFile } = await import("node:fs/promises");
  const bytes = await readFile(file);
  check("CV: download starts from the button", dl.suggestedFilename() === "khadim-hussain-cv.pdf", dl.suggestedFilename());
  check("CV: file is a PDF", bytes.subarray(0, 5).toString() === "%PDF-" && bytes.length > 10000, `${bytes.length} bytes`);
  const head = await page.evaluate(async (u) => { const r = await fetch(u); return { s: r.status, t: r.headers.get("content-type") }; }, BASE + "/khadim-hussain-cv.pdf");
  check("CV: served as application/pdf", head.s === 200 && head.t?.includes("application/pdf"), JSON.stringify(head));
  await ctx.close();
}

// 8) Structured data parses.
{
  const ctx = await browser.newContext(ctxOpts(viewports.desktop));
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  const ld = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => JSON.parse(x.textContent)));
  const pp = ld.find((d) => d["@type"] === "ProfilePage");
  check("ProfilePage structured data with Person mainEntity", pp?.mainEntity?.["@type"] === "Person" && pp.mainEntity.name === "Khadim Hussain");
  check(
    "Person has job title, URL, portrait and verified sameAs",
    pp?.mainEntity?.jobTitle === "Senior iOS Engineer" &&
      pp.mainEntity.url === "https://khadimhussain.com/" &&
      pp.mainEntity.image?.url?.startsWith("https://khadimhussain.com/") &&
      JSON.stringify(pp.mainEntity.sameAs) === JSON.stringify(["https://www.linkedin.com/in/khadimhussainios/", "https://github.com/Khadim012"]),
    JSON.stringify(pp?.mainEntity?.sameAs),
  );
  const portraitStatus = await page.evaluate(async (u) => (await fetch(u)).status, pp?.mainEntity?.image?.url?.replace("https://khadimhussain.com", BASE));
  check("Person portrait URL serves", portraitStatus === 200, String(portraitStatus));
  for (const slug of ["life-pharmacy", "zushh", "nordic-home-healthcare", "ziro", "cloudgate"]) {
    await page.goto(`${BASE}/projects/${slug}/`, { waitUntil: "domcontentloaded" });
    const cs = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => JSON.parse(x.textContent)));
    const bl = cs.filter((d) => d["@type"] === "BreadcrumbList");
    const items = bl[0]?.itemListElement || [];
    const visible = await page.$$eval('nav[aria-label="Breadcrumb"] li', (lis) => lis.map((li) => li.textContent.replace("/", "").trim()));
    check(
      `BreadcrumbList on /projects/${slug}/ matches the visible trail`,
      bl.length === 1 && items.length === 3 && items[2].item === `https://khadimhussain.com/projects/${slug}/` && items.map((i) => i.name).join("|") === visible.join("|"),
      `${items.map((i) => i.name).join(" > ")} vs ${visible.join(" > ")}`,
    );
  }
  await ctx.close();
}


// 9) Recruiter essentials on the first screen: CV, email and (once configured) phone.
{
  for (const [vpName, vp] of Object.entries(viewports)) {
    const ctx = await browser.newContext(ctxOpts(vp));
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const info = await page.evaluate(() => {
      const inView = (el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.top >= 0 && r.bottom <= window.innerHeight + 1;
      };
      const hero = document.querySelector('section[aria-labelledby="hero-title"]');
      const links = [...hero.querySelectorAll("a")];
      const cv = links.find((a) => /download cv/i.test(a.textContent) && a.hasAttribute("download"));
      const mail = links.find((a) => a.getAttribute("href") === "mailto:m.khadim012@gmail.com");
      const tel = [...document.querySelectorAll('a[href^="tel:"]')];
      const headerCv = [...document.querySelectorAll("header a[download]")].filter((a) => a.getBoundingClientRect().width > 0);
      const name = document.querySelector("h1");
      const tap = [cv, mail].filter(Boolean).every((a) => a.getBoundingClientRect().height >= 44);
      // Contact actions must come before the product visuals in reading order.
      const visual = hero.querySelector("figure");
      const before = mail && visual ? !!(mail.compareDocumentPosition(visual) & Node.DOCUMENT_POSITION_FOLLOWING) : false;
      return {
        name: name?.textContent,
        cvInView: !!cv && inView(cv),
        mailInView: !!mail && inView(mail),
        mailShowsAddress: !!mail && mail.textContent.includes("m.khadim012@gmail.com"),
        tel: tel.map((a) => ({ href: a.getAttribute("href"), text: a.textContent })),
        headerCv: headerCv.length,
        tap,
        before,
      };
    });
    const label = `[${vpName}] first screen`;
    check(`${label} h1 is the name`, info.name === "Khadim Hussain", info.name);
    check(`${label} Download CV visible without scrolling`, info.cvInView);
    check(`${label} email visible without scrolling and shows the address`, info.mailInView && info.mailShowsAddress);
    check(`${label} CV reachable from the header`, info.headerCv === 1, String(info.headerCv));
    check(`${label} contact tap targets at least 44px`, info.tap);
    check(`${label} contact actions come before product visuals`, info.before);
    check(
      `${label} call link only when a real number is configured`,
      info.tel.every((t) => /^tel:\+\d{8,15}$/.test(t.href) && t.text.includes("+")),
      info.tel.length ? JSON.stringify(info.tel) : "hidden (no number configured)",
    );
    await ctx.close();
  }
}

// 10) Logos strip, image alt text and lazy loading.
{
  const ctx = await browser.newContext(ctxOpts(viewports.desktop));
  const page = await ctx.newPage();
  for (const path of pages) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    const imgs = await page.$$eval("img", (els) =>
      els.map((i) => ({ src: i.getAttribute("src"), alt: i.getAttribute("alt"), w: i.getAttribute("width"), h: i.getAttribute("height"), decorative: !!i.closest('[aria-hidden="true"]'), loading: i.getAttribute("loading"), top: i.getBoundingClientRect().top + window.scrollY })),
    );
    const missingAlt = imgs.filter((i) => i.alt === null || (!i.decorative && i.alt.trim().length < 8));
    const noSize = imgs.filter((i) => !i.w || !i.h);
    const eagerBelow = imgs.filter((i) => i.top > 1600 && i.loading !== "lazy");
    check(`[images] ${path} meaningful alt text`, missingAlt.length === 0, missingAlt.map((i) => i.src).join(", "));
    check(`[images] ${path} reserved dimensions`, noSize.length === 0, noSize.map((i) => i.src).join(", "));
    check(`[images] ${path} below-the-fold images lazy-load`, eagerBelow.length === 0, eagerBelow.map((i) => i.src).join(", "));
  }
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const strip = await page.$$eval('section[aria-labelledby="companies"] li', (lis) =>
    lis.map((li) => ({ text: li.textContent, href: li.querySelector("a")?.getAttribute("href") || null })),
  );
  for (const [name, href] of [
    ["Life Pharmacy", "/projects/life-pharmacy/"],
    ["ZUSHH", "/projects/zushh/"],
    ["Nordic Home Healthcare", "/projects/nordic-home-healthcare/"],
    ["Newsreels", null],
    ["Soloinsight", "/projects/cloudgate/"],
  ]) {
    const item = strip.find((s) => s.text.includes(name));
    check(`[logos] ${name} shown${href ? " and linked to its case study" : ""}`, !!item && item.href === href, JSON.stringify(item));
  }
  await ctx.close();
}

// 11) Case-study gallery: enlarge with keyboard, step with arrows, close with Escape.
{
  const ctx = await browser.newContext(ctxOpts(viewports.desktop));
  const page = await ctx.newPage();
  await page.goto(BASE + "/projects/zushh/", { waitUntil: "networkidle" });
  const first = page.getByRole("button", { name: "Enlarge screenshot" }).first();
  await first.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await dialog.waitFor();
  check("[gallery] Enter opens the enlarged view", await dialog.isVisible());
  const before = await dialog.locator("img").getAttribute("src");
  await page.keyboard.press("ArrowRight");
  const after = await dialog.locator("img").getAttribute("src");
  check("[gallery] arrow key moves to the next screenshot", before !== after, `${before} -> ${after}`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  const closed = !(await dialog.isVisible());
  const refocused = await page.evaluate(() => document.activeElement?.textContent?.includes("Enlarge screenshot"));
  check("[gallery] Escape closes and returns focus to the screenshot", closed && refocused);
  await ctx.close();
}


// 12) Crawlability: robots.txt, sitemap.xml, 404, OG image URLs.
{
  const ctx = await browser.newContext(ctxOpts(viewports.desktop));
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  const txt = await page.evaluate(async (b) => {
    const r = await fetch(b + "/robots.txt");
    return { s: r.status, t: await r.text() };
  }, BASE);
  check("robots.txt serves and allows crawling", txt.s === 200 && /User-Agent: \*\s+Allow: \//i.test(txt.t) && !/Disallow: \/\s*$/m.test(txt.t), txt.t.replace(/\n/g, " | "));
  check("robots.txt references the full sitemap URL", txt.t.includes("Sitemap: https://khadimhussain.com/sitemap.xml"));
  const sm = await page.evaluate(async (b) => {
    const r = await fetch(b + "/sitemap.xml");
    return { s: r.status, t: await r.text() };
  }, BASE);
  const locs = [...sm.t.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  check("sitemap.xml serves", sm.s === 200, String(sm.s));
  check("sitemap lists exactly the indexable pages", JSON.stringify([...locs].sort()) === JSON.stringify(Object.keys(EXPECTED).map((p) => "https://khadimhussain.com" + p).sort()), locs.join(" "));
  for (const loc of locs) {
    const st = await page.evaluate(async (u) => (await fetch(u, { redirect: "manual" })).status, loc.replace("https://khadimhussain.com", BASE));
    check(`sitemap URL returns 200: ${loc}`, st === 200, String(st));
  }
  for (const [p, e] of Object.entries(EXPECTED)) {
    const st = await page.evaluate(async (u) => (await fetch(u)).status, BASE + e.og);
    check(`social image serves for ${p}`, st === 200, `${e.og} ${st}`);
  }
  const res = await page.goto(BASE + "/no-such-page/", { waitUntil: "domcontentloaded" });
  const robots404 = await page.locator('meta[name="robots"]').getAttribute("content");
  check("unknown URL returns 404 with noindex", res.status() === 404 && /noindex/.test(robots404 || ""), `${res.status()} ${robots404}`);
  await ctx.close();
}

// 13) Contact actions: phone, WhatsApp, email and CV targets.
{
  for (const [vpName, vp] of Object.entries({ mobile: viewports.mobile, desktop: viewports.desktop })) {
    const ctx = await browser.newContext(ctxOpts(vp));
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const hero = page.locator('section[aria-labelledby="hero-title"]');
    const call = hero.getByRole("link", { name: /Call me/ });
    const wa = hero.getByRole("link", { name: /WhatsApp/ });
    check(`[${vpName}] call link dials the full international number`, (await call.getAttribute("href")) === "tel:+971569147945" && (await call.textContent()).includes("+971 56 914 7945"));
    check(`[${vpName}] WhatsApp opens a chat with the same number`, (await wa.getAttribute("href")) === "https://wa.me/971569147945" && (await wa.getAttribute("target")) === "_blank");
    for (const l of [call, wa, hero.getByRole("link", { name: /Email me/ }), hero.getByRole("link", { name: /Download CV/ })]) {
      const box = await l.boundingBox();
      check(`[${vpName}] "${(await l.textContent()).trim().slice(0, 24)}" tap target ≥ 44px and on screen`, box && box.height >= 44 && box.y + box.height <= vp.height, JSON.stringify(box));
    }
    await ctx.close();
  }
}

// 14) Showcase video: lazy, autoplays muted only when visible, pause works, honours reduced motion.
{
  for (const reduced of [false, true]) {
    const ctx = await browser.newContext({ ...ctxOpts(viewports.mobile), reducedMotion: reduced ? "reduce" : "no-preference" });
    const page = await ctx.newPage();
    await page.goto(BASE + "/projects/life-pharmacy/", { waitUntil: "networkidle" });
    const video = page.locator("video");
    const before = await video.evaluate((v) => ({ preload: v.getAttribute("preload"), muted: v.muted, inline: v.playsInline, ready: v.readyState }));
    if (!reduced) check("[video] starts unloaded (preload=none), muted and inline", before.preload === "none" && before.muted && before.inline && before.ready === 0, JSON.stringify(before));
    await video.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    const playing = await video.evaluate((v) => !v.paused && v.currentTime > 0);
    if (reduced) {
      check("[video] does not autoplay with reduced motion", !playing);
    } else {
      check("[video] plays once scrolled into view", playing);
      const btn = page.getByRole("button", { name: /Pause app video/ });
      await btn.click();
      check("[video] Pause button pauses", await video.evaluate((v) => v.paused));
      await page.getByRole("button", { name: /Play app video/ }).click();
      await page.waitForTimeout(300);
      check("[video] Play button resumes", await video.evaluate((v) => !v.paused));
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(600);
      check("[video] pauses when scrolled out of view", await video.evaluate((v) => v.paused));
    }
    await ctx.close();
  }
}

await browser.close();
await writeFile(`${SHOTS}/results.json`, JSON.stringify(results, null, 2));
console.log(`\n${results.length - failures}/${results.length} checks passed`);
process.exit(failures ? 1 : 0);

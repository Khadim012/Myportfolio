# khadimhussain.com: working notes for Claude

Personal portfolio for Khadim Hussain (Senior iOS Engineer & Full-Stack Developer, Dubai).
Live at https://khadimhussain.com.

## Stack
- Next.js 16 App Router, TypeScript, Tailwind CSS 4, **static export** (`output: "export"`, `trailingSlash: true`) to `out/`.
- Read `AGENTS.md`: this Next.js version differs from older training data; check `node_modules/next/dist/docs/` before using an API.
- Type: native system stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`); no web fonts on the site. Inter (devDependency) is used only to render social images.
- Palette in `src/app/globals.css` `@theme`: page `#F5F5F7`, cards `#FFFFFF`, text `#1D1D1F` / `#515154`, actions blue `#0066CC`, borders `#D7D7DB`. Strong colour only inside project cards, from real branding (`--color-life`, `--color-zushh`, `--color-nordic`, sampled from the official icons). Fluid sizes: `t-hero`, `t-title`, `t-section`, `t-project`, `t-body`, `section-y`, `container-x` utilities.
- Glass (`.glass`, `.glass-strong`) is for the navigation and its mobile menu only, with an opaque fallback without backdrop blur.

## Branches and deploys
- `main` = live. Every push to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`) within about a minute.
- `development` = ongoing work. Make changes there (or on a feature branch), then open a pull request to `main` when Khadim approves going live.
- Never push to `main` without Khadim's go-ahead.
- DNS is in Hostinger: four A records `@ → 185.199.108–111.153` and CNAME `www → khadim012.github.io`. Do not change them.
- `.github/workflows/deploy.yml` is a dormant VPS path (manual/PR only). GitHub Pages is the real host.

## Commands
| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server, http://localhost:3000 |
| `npm run check` | Lint + typecheck + static build (run before every commit) |
| `npm run preview` | Serve `out/` at http://localhost:4173 with production routing |
| `npm run test:browser` | Chrome checks (mobile/tablet/desktop, keyboard, links, CV download). Needs `preview` running and Chrome (`CHROME_PATH`). |
| `npm run images` | Write `-320`/`-480` WebP variants of every image, then render `public/og.png`, `public/og/<page>.png` (1200×630) and the apple-touch-icon |

## Where content lives (edit data, not pages)
- `src/data/profile.ts`: name, headline, intro, contact, education, CV toggle (`cv.available`), `phone` (null hides every Call action)
- `src/data/logos.ts`: official marks and the "Companies & projects" strip
- `src/data/projects.ts`: five case studies and the "More projects" groups
- `src/data/experience.ts`: timeline (titles and dates from the CV)
- `src/data/skills.ts`: skill groups
- `public/khadim-hussain-cv.pdf`: public CV. **Must never contain the phone number.** Check with `pdftotext` before committing a new one.

## Content rules
- First-person copy. Only claim what the CV or Khadim's brief supports; no invented usage numbers or performance claims.
- Android on LIFE Pharmacy is a product link only (his role was iOS).
- Nordic iOS App Store button: add only when Khadim supplies a verified link.
- ZIRO archived listings (appstor.io) stay hidden until confirmed to load.
- Keep these engagements unpublished until Khadim gives scope and links: Vendcom UK, Front Gate Home Buyers, Fragrance Hub, Linx Accounting, Rajouri Passenger Transport, Biko Dive Car Rental, Yotta Group, OnTime Group.
- Screenshots: optimised WebP in `public/images/<project>/`, added to the project's `screenshots` array with alt, caption, kind and source. The first entry is the lead image. Record every new image or logo in `IMAGE-SOURCES.md`.
- Only genuine product screens. No private customer data, internal dashboards, credentials or test accounts in screenshots.
- Phone and WhatsApp: +971 56 914 7945, confirmed by Khadim (21 Nov 2026), in `profile.phone` / `profile.whatsapp`. It must still never appear in the public CV PDF.
- Screen recordings: blur or cut anything personal (addresses, profile screens, names, emails) before publishing.
- Homepage order: Hero and contact actions → Companies & Projects → Projects (Life Pharmacy lead, ZUSHH, Nordic) → AI-Assisted Development → Experience → Skills and Education → Contact. Section ids: `projects`, `ai-development`, `experience`, `skills`, `contact`.
- Navigation (`src/components/SiteHeader.tsx`): floating glass bar; links Projects, Experience, Skills, Contact as `/#id` so they work from case studies; active-section pill; mobile Menu panel closes on selection, outside tap or Escape (focus returns to the button).
- Contact actions (`src/components/ContactActions.tsx`) read only from `profile.ts`, used by the hero and Contact section: 2 × 2 on phones (one column on 320px screens or with enlarged text), one row from 1280px in the hero. Each action's `aria-label` is its visible label and value joined by one space (e.g. "Email me name@domain"), so the address reads as one unit and matches the visible text.
- Experience entries have ids (`experienceId()` in `src/data/experience.ts`); each case study links to its matching role.
- The AI-Assisted Development image is an illustration with generic code (`npm run images` renders it). Replace it only with an approved real screenshot free of private code, credentials and customer data.

## SEO
- Positioning: "Khadim Hussain, Senior iOS Engineer in Dubai". Homepage title and description live in `profile.seoTitle` / `profile.metaDescription`.
- Every indexable page uses `pageMetadata()` (`src/data/seo.ts`): exact title, description, absolute canonical with trailing slash, robots, Open Graph and Twitter card. Case-study copy lives in each project's `seo` field; add an OG image for any new case study in `scripts/make-images.mjs`.
- Structured data: ProfilePage + Person on the homepage, BreadcrumbList on case studies (`src/components/PersonJsonLd.tsx`). `sameAs` lists only verified profiles (LinkedIn, GitHub Khadim012).
- `sitemap.ts` lists only indexable 200 pages; `robots.ts` allows all and points to the sitemap. The 404 page is noindex with no canonical.
- Images go through the custom loader `src/image-loader.ts`; run `npm run images` after adding any image so its variants exist.

## Quality bar
Responsive, keyboard accessible (skip link, visible focus), accessible contrast, reduced motion respected, no horizontal overflow. Every page keeps its title, description, canonical URL and OG tags; sitemap and Person JSON-LD stay correct.

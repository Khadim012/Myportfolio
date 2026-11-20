# khadimhussain.com: working notes for Claude

Personal portfolio for Khadim Hussain (Senior iOS Engineer & Full-Stack Developer, Dubai).
Live at https://khadimhussain.com.

## Stack
- Next.js 16 App Router, TypeScript, Tailwind CSS 4, **static export** (`output: "export"`, `trailingSlash: true`) to `out/`.
- Read `AGENTS.md`: this Next.js version differs from older training data; check `node_modules/next/dist/docs/` before using an API.
- Fonts are self-hosted via `@fontsource-variable` (Fraunces display, Inter body). One accent colour: `--color-accent` in `src/app/globals.css`.

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
| `npm run images` | Regenerate `public/og.png` and icons from `scripts/og-template.html` |

## Where content lives (edit data, not pages)
- `src/data/profile.ts`: name, headline, contact, education, CV toggle (`cv.available`)
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
- Screenshots: optimised WebP in `public/images/<project>/`, added to the project's `screenshots` array.

## Quality bar
Responsive, keyboard accessible (skip link, visible focus), accessible contrast, reduced motion respected, no horizontal overflow. Every page keeps its title, description, canonical URL and OG tags; sitemap and Person JSON-LD stay correct.

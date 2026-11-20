# khadimhussain.com

Personal portfolio for Khadim Hussain. Built with Next.js (App Router), TypeScript and Tailwind CSS, and exported as a static site.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run check` | Lint + typecheck + production build into `out/` |
| `npm run preview` | Serve `out/` on http://localhost:4173 with production-like routing |
| `npm run test:browser` | Chrome checks across mobile/tablet/desktop (run with `preview` running) |
| `npm run images` | Regenerate `public/og.png`, `apple-touch-icon.png` from `scripts/og-template.html` |

## Editing content

All copy lives in typed data files. Pages don't need to change.

- `src/data/profile.ts`: name, headline, contact links, education, CV toggle
- `src/data/projects.ts`: case studies and the "More projects" list
- `src/data/experience.ts`: experience timeline (add `period` from the CV)
- `src/data/skills.ts`: skill groups

**CV download:** the public CV is `public/khadim-hussain-cv.pdf` (phone number removed). To update it, replace that file with a new phone-free PDF. To hide the buttons, set `cv.available = false` in `src/data/profile.ts`.

**Screenshots:** put optimised images (WebP, ~1200px wide) in `public/images/<project>/` and add them to the project's `screenshots` array. Cards and case studies switch from text-led to image-led automatically.

**Nordic iOS link:** add `{ label: "App Store", href: "…", kind: "app-store" }` to the Nordic `links` array once it's verified.

## Deploying

See [DEPLOY.md](./DEPLOY.md).

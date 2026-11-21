// Writes <name>-320.webp and <name>-480.webp next to every raster image in
// public/images, so next/image can serve small files to phones through the
// custom loader in src/image-loader.ts. Images narrower than a variant are
// copied at their own size. Run: npm run images (or node scripts/make-variants.mjs)
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../public/images");
export const VARIANTS = [320, 480];

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let n = 0;
for await (const file of walk(root)) {
  if (!/\.(webp|png|jpe?g)$/i.test(file) || /-(320|480)\.webp$/.test(file)) continue;
  const meta = await sharp(file).metadata();
  for (const w of VARIANTS) {
    const out = file.replace(/\.(webp|png|jpe?g)$/i, `-${w}.webp`);
    const src = await stat(file);
    const existing = await stat(out).catch(() => null);
    if (existing && existing.mtimeMs >= src.mtimeMs) continue;
    await sharp(file)
      .resize({ width: Math.min(w, meta.width), withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(out);
    n++;
  }
}
console.log(`variants written: ${n}`);

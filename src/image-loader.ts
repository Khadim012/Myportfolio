// Custom next/image loader for the static export (no image server).
// scripts/make-variants.mjs writes -320 and -480 WebP copies of every raster in
// public/images; this maps each srcset width to the smallest file that covers it.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/images/") || src.endsWith(".svg")) return src;
  if (width <= 320) return src.replace(/\.(webp|png|jpe?g)$/i, "-320.webp");
  if (width <= 480) return src.replace(/\.(webp|png|jpe?g)$/i, "-480.webp");
  return src;
}

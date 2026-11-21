import Image from "next/image";
import type { Logo, Screenshot } from "@/data/types";

/**
 * A real product screenshot in a simple phone or browser frame.
 * Width and height are always set, so the space is reserved before the image loads.
 */
export function Shot({
  shot,
  sizes,
  priority = false,
  className = "",
}: {
  shot: Screenshot;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`${shot.kind === "phone" ? "shot-phone" : "shot-desktop"} ${className}`}>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="block h-auto w-full"
      />
    </div>
  );
}

const markSizes = {
  sm: "h-8 w-8 rounded-lg text-[0.7rem]",
  md: "h-11 w-11 rounded-xl text-sm",
  lg: "h-14 w-14 rounded-2xl text-base",
  xl: "h-24 w-24 rounded-[1.5rem] text-2xl",
} as const;

/**
 * A company or app mark at a consistent square footprint. Square app icons fill
 * the tile; other marks sit on white with padding. Falls back to initials when
 * no official asset is available. Decorative: the name is always shown beside it.
 */
export function BrandMark({ name, logo, size = "md" }: { name: string; logo?: Logo; size?: keyof typeof markSizes }) {
  const box = `${markSizes[size]} relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-line bg-white`;
  if (!logo) {
    const initials = name
      .split(/\s+/)
      .filter((w) => /^[A-Za-z]/.test(w))
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    return (
      <span aria-hidden="true" className={`${box} font-semibold text-muted`}>
        {initials}
      </span>
    );
  }
  const isIcon = logo.src.endsWith(".webp");
  return (
    <span aria-hidden="true" className={box}>
      <Image
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        className={isIcon ? "h-full w-full object-cover" : "h-[72%] w-[72%] object-contain"}
      />
    </span>
  );
}

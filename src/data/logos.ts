import type { Company, Logo } from "./types";

/**
 * Official marks, saved locally and optimised. Sources are recorded here and
 * in IMAGE-SOURCES.md. Square app icons keep every mark the same footprint.
 */
export const logos = {
  lifePharmacy: {
    src: "/images/logos/life-pharmacy.webp",
    alt: "",
    width: 256,
    height: 256,
    source: "LIFE Pharmacy app icon, App Store listing id1450835575",
  },
  zushh: {
    src: "/images/logos/zushh.webp",
    alt: "",
    width: 256,
    height: 256,
    source: "ZUSHH app icon, App Store listing id6758752792",
  },
  nordic: {
    src: "/images/logos/nordic-home-healthcare.webp",
    alt: "",
    width: 256,
    height: 256,
    source: "Nordic HC UAE app icon, Google Play listing com.nordichc.ae (same mark as nordichc.com)",
  },
  newsreels: {
    src: "/images/logos/newsreels.webp",
    alt: "",
    width: 256,
    height: 256,
    source: "Newsreels company logo, linkedin.com/company/newsreels",
  },
  ziro: {
    src: "/images/logos/ziro.webp",
    alt: "",
    width: 256,
    height: 256,
    source: "ZIRO app icon (ItunesArtwork@2x), supplied by Khadim",
  },
  soloinsight: {
    src: "/images/logos/soloinsight.svg",
    alt: "",
    width: 64,
    height: 64,
    source: "Emblem from the Soloinsight header logo SVG on soloinsight.com",
  },
} satisfies Record<string, Logo>;

/** "Companies & projects" strip, in the order shown under the hero. */
export const companies: Company[] = [
  { name: "Life Pharmacy", relation: "Employer · iOS", logo: logos.lifePharmacy, slug: "life-pharmacy" },
  { name: "ZUSHH", relation: "Client project", logo: logos.zushh, slug: "zushh" },
  { name: "Nordic Home Healthcare", relation: "Employer", logo: logos.nordic, slug: "nordic-home-healthcare" },
  { name: "Newsreels", relation: "Employer · iOS lead", logo: logos.newsreels },
  { name: "Soloinsight", relation: "Employer · CloudGate", logo: logos.soloinsight, slug: "cloudgate" },
];

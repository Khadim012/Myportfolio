import type { Metadata } from "next";
import { ogImage, profile, siteUrl } from "./profile";

/**
 * Complete metadata for one indexable page: exact title, description,
 * absolute self-referencing canonical (with trailing slash), Open Graph and
 * Twitter card. Every URL is absolute on https://khadimhussain.com.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = { url: ogImage.url, alt: ogImage.alt },
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  type?: "website" | "article" | "profile";
}): Metadata {
  const url = `${siteUrl}${path}`;
  const img = { url: `${siteUrl}${image.url}`, width: 1200, height: 630, alt: image.alt, type: "image/png" };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type,
      url,
      siteName: profile.name,
      title,
      description,
      locale: "en_US",
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: img.url, alt: img.alt }],
    },
  };
}

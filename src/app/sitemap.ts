import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({
        url: `${siteUrl}/projects/${p.slug}/`,
        lastModified,
        changeFrequency: "yearly" as const,
        priority: 0.7,
      })),
  ];
}

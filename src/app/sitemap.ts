import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

/** Date of the last commit, so <lastmod> changes only when the site actually changes. */
function lastCommitDate(): Date {
  try {
    return new Date(execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim());
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = lastCommitDate();
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

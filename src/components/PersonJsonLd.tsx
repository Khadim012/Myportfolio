import { education, portrait, profile, siteUrl } from "@/data/profile";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Homepage: a ProfilePage whose mainEntity is Khadim (schema.org/ProfilePage). */
export function PersonJsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    url: `${siteUrl}/`,
    jobTitle: "Senior iOS Engineer",
    description: profile.metaDescription,
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}${portrait.src}`,
      width: portrait.width,
      height: portrait.height,
    },
    email: `mailto:${profile.email}`,
    ...(profile.phone ? { telephone: profile.phone.href.replace("tel:", "") } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.institution,
    },
    knowsAbout: [
      "iOS development",
      "Swift",
      "SwiftUI",
      "UIKit",
      "Objective-C",
      "Android development",
      "Kotlin",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "REST APIs",
      "AI-assisted software development",
      "Meta Ads",
      "Search engine optimization",
    ],
    // Verified profiles only: LinkedIn, and the GitHub account that hosts this site.
    sameAs: [profile.linkedin, profile.github],
  };
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: `${siteUrl}/`,
        name: profile.seoTitle,
        description: profile.metaDescription,
        inLanguage: "en",
        mainEntity: person,
      }}
    />
  );
}

/** BreadcrumbList matching the visible breadcrumb trail on a page. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${siteUrl}${item.path}`,
        })),
      }}
    />
  );
}

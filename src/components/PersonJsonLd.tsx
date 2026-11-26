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
    // From the documents in the Certificates & credentials section (src/data/credentials.ts).
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Bachelor of Science in Computer Science",
        credentialCategory: "degree",
        dateCreated: "2018-07-17",
        recognizedBy: { "@type": "CollegeOrUniversity", name: education.institution },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "UAE Academic Qualification Recognition: Bachelor of Science in Computer Science",
        credentialCategory: "qualification recognition",
        dateCreated: "2026-09-07",
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "UAE Ministry of Higher Education and Scientific Research",
        },
      },
    ],
    award: "Life Pharmacy Superstar Award (2022)",
    // Current employer, as on the CV and the Experience section.
    worksFor: {
      "@type": "Organization",
      name: "Nordic Home Healthcare",
      url: "https://nordichc.com/",
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

/**
 * Case study: an Article authored by Khadim. The author points at the same Person
 * (@id) as the homepage ProfilePage, so search engines connect every case study to him.
 * No dates: the case studies carry none, and invented dates would be inaccurate.
 */
export function CaseStudyJsonLd({
  slug,
  headline,
  description,
  image,
  about,
}: {
  slug: string;
  headline: string;
  description: string;
  image: string;
  about: string;
}) {
  const url = `${siteUrl}/projects/${slug}/`;
  const author = { "@type": "Person", "@id": `${siteUrl}/#person`, name: profile.name, url: `${siteUrl}/` };
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        headline,
        description,
        url,
        mainEntityOfPage: url,
        image: [`${siteUrl}${image}`],
        inLanguage: "en",
        author,
        publisher: author,
        about: { "@type": "Thing", name: about },
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

import { education, portrait, profile, siteUrl } from "@/data/profile";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    url: `${siteUrl}/`,
    jobTitle: profile.headline,
    description: profile.metaDescription,
    email: `mailto:${profile.email}`,
    image: `${siteUrl}${portrait.src}`,
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
      "Android development",
      "Kotlin",
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
    ],
    sameAs: [profile.linkedin, profile.studio.href],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

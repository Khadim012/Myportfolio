export const siteUrl = "https://khadimhussain.com";

export const profile = {
  name: "Khadim Hussain",
  headline: "Senior iOS Engineer & Full-Stack Developer",
  location: "Dubai, UAE",
  availability: "Available to start immediately",
  email: "m.khadim012@gmail.com",
  /**
   * Professional phone number for the "Call me" button, confirmed by Khadim on
   * 21 Nov 2026. Set to null to hide every call action.
   * The public CV PDF must still never contain a phone number.
   */
  phone: { display: "+971 56 914 7945", href: "tel:+971569147945" } as { display: string; href: string } | null,
  /** WhatsApp chat link for the same number. Null hides the WhatsApp action. */
  whatsapp: "https://wa.me/971569147945" as string | null,
  github: "https://github.com/Khadim012",
  linkedin: "https://www.linkedin.com/in/khadimhussainios/",
  studio: { name: "SwiftAppStudio", href: "https://swiftappstudio.com/" },
  intro:
    "I'm a Senior iOS Engineer in Dubai with more than 10 years of experience building native apps in Swift, SwiftUI, UIKit and Objective-C. I led iOS development at Life Pharmacy. Today I build native iOS and Android apps, websites and backends for Nordic Home Healthcare and ZUSHH, and I use AI-assisted workflows to ship them faster.",
  /**
   * Google Search Console "HTML tag" token (the content="..." value only), for a
   * URL-prefix property. Null until Khadim provides one; a Domain property verified
   * by DNS TXT record in Hostinger needs nothing here.
   */
  googleSiteVerification: null as string | null,
  /** Homepage <title> and meta description. */
  seoTitle: "Khadim Hussain | Senior iOS Engineer in Dubai",
  metaDescription:
    "Senior iOS Engineer in Dubai with 10+ years in Swift, SwiftUI and UIKit. I also build native Android apps, websites and backends using AI-assisted workflows.",
} as const;

export const portrait = {
  src: "/images/profile/khadim-hussain.webp",
  width: 512,
  height: 640,
  alt: "Khadim Hussain",
} as const;

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Khadim Hussain, Senior iOS Engineer in Dubai, with Life Pharmacy and ZUSHH app screens",
};

/**
 * Public CV download.
 * Set `available` to true only after a phone-number-free copy has been placed
 * at public/<path> and checked. While false, every Download CV button is hidden.
 */
export const cv = {
  available: true,
  path: "/khadim-hussain-cv.pdf",
  label: "Download CV",
} as const;

export const education = {
  degree: "BS Computer Science",
  institution: "The University of Lahore",
  period: "2012 – 2016",
} as const;

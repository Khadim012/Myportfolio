export const siteUrl = "https://khadimhussain.com";

export const profile = {
  name: "Khadim Hussain",
  headline: "Senior iOS Engineer & Full-Stack Developer",
  location: "Dubai, UAE",
  availability: "Available to start immediately",
  email: "m.khadim012@gmail.com",
  linkedin: "https://www.linkedin.com/in/khadimhussainios/",
  studio: { name: "SwiftAppStudio", href: "https://swiftappstudio.com/" },
  intro:
    "I build and ship native iOS apps. I led iOS development at Life Pharmacy, including its UIKit-to-SwiftUI migration, and have since delivered mobile and web platforms for home services and healthcare.",
  pitch:
    "10+ years of native iOS and 15+ apps published on the App Store, from leading an iOS team to owning live apps end to end. Today I ship complete platforms: native iOS and Android, web and backend, using AI coding agents to move faster without cutting corners.",
  metaDescription:
    "Khadim Hussain is a Dubai-based Senior iOS Engineer and full-stack developer with 10+ years of native iOS experience, 15+ App Store apps and iOS team leadership.",
} as const;

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Khadim Hussain, Senior iOS Engineer & Full-Stack Developer",
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

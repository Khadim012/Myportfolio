import type { ExperienceItem } from "./types";

/** Work history, most recent first. Titles, dates and locations from the CV. */
export const experience: ExperienceItem[] = [
  {
    organisation: "Nordic Home Healthcare",
    role: "Senior Mobile & Full-Stack Developer",
    period: "Jul 2026 – Present",
    location: "Dubai, UAE",
    summary:
      "I own the company's complete digital platform end to end: the native iOS app, the native Android app, the website and the backend.",
    highlights: [
      "Built and launched the Nordic HC UAE Android app in Kotlin, through Google Play closed testing, production access review and first public release.",
      "Develop the web front end and backend with Node.js, Next.js, React and TypeScript, exposing REST APIs consumed by the mobile apps.",
      "Deliver the same full platform scope (web, backend, iOS and Android) for ZUSHH, using AI coding agents to ship with a lean team.",
    ],
    projectSlugs: ["nordic-home-healthcare", "zushh"],
  },
  {
    organisation: "Life Pharmacy",
    role: "Senior iOS Developer",
    period: "Nov 2021 – Jun 2026",
    location: "Dubai, UAE",
    summary:
      "I owned end-to-end iOS development of the Life Pharmacy app, a live App Store e-commerce and pharmacy app built in Swift and SwiftUI on MVVM and VIPER.",
    highlights: [
      "Led the full migration from UIKit to SwiftUI using an AI-native workflow with Claude Code.",
      "Diagnosed and fixed performance bottlenecks and crashes with Instruments and Bugsnag.",
      "Integrated OneSignal and NetCore push notifications, Bugsnag crash reporting and Adjust attribution.",
      "Worked with product, design, backend and QA through JIRA and GitHub, consistently meeting release deadlines.",
    ],
    projectSlugs: ["life-pharmacy"],
  },
  {
    organisation: "Newsreels",
    role: "iOS Team Lead / Senior iOS Developer",
    period: "Oct 2018 – Nov 2021",
    location: "Dubai, UAE",
    summary:
      "I led the iOS team delivering three published apps: the Newsreels news aggregator and the ZIRO Rider and ZIRO Captain ride-hailing apps.",
    highlights: [
      "Built live driver search, trip scheduling, route drawing and live vehicle tracking over Socket.IO.",
      "Integrated Stripe and Apple Pay, plus subscription plans, referral programs, community chat and ratings.",
      "Ran sprint planning, code reviews and release schedules across concurrent app builds.",
    ],
    projectSlugs: ["ziro"],
  },
  {
    organisation: "Soloinsight Inc.",
    role: "iOS Developer",
    period: "Sep 2016 – Oct 2018",
    location: "Lahore, Pakistan",
    summary:
      "I built and maintained CloudGate, a suite of seven enterprise iOS apps for access control, visitor management and attendance tracking.",
    highlights: [
      "Implemented BLE beacon broadcasting and detection, QR passes, fingerprint authentication and offline SQLite storage.",
      "Delivered a customised enterprise edition of CloudGate built to Microsoft's specifications.",
    ],
    projectSlugs: ["cloudgate"],
  },
  {
    organisation: "Brand Impact & Buggz",
    role: "Freelance iOS Developer (remote)",
    period: "Jun 2017 – Nov 2020",
    summary:
      "Contract work alongside my full-time roles: published iOS apps for Brand Impact and Buggz across e-commerce, fleet tracking, food delivery, sports and healthcare.",
    highlights: [
      "Brand Impact: five published apps — GiftyOnlineUAE, Pets Health, InfoSense Mobile, HomeBiz and Quote Catalog.",
      "Buggz: World Cup 2018 Companion, People Finder and DoctorWho.",
    ],
  },
];

export const studioNote =
  "I also founded SwiftAppStudio, a Dubai studio for iOS and Android apps, websites and AI solutions.";

import { logos } from "./logos";
import { profile } from "./profile";
import type { ExperienceItem } from "./types";

/** Anchor id for an Experience entry, so case studies can link to the matching role. */
export const experienceId = (organisation: string) =>
  `experience-${organisation.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

/** Work history, most recent first. Titles, dates and locations from the CV. */
export const experience: ExperienceItem[] = [
  {
    organisation: "Nordic Home Healthcare",
    kind: "Employer",
    logo: logos.nordic,
    role: "Senior Mobile & Full-Stack Developer",
    period: "Jul 2026 – Present",
    location: "Dubai, UAE",
    summary:
      "I develop and maintain Nordic Home Healthcare's native iOS and Android apps, its website and its backend. I also set up and manage the company's Meta Ads campaigns, update the website and apps to support them, and use AI agents to assist with SEO.",
    highlights: [
      "I built the Nordic HC UAE Android app in Kotlin and took it through Google Play closed testing and the production access review to its first public release.",
      "I develop the website and backend with Next.js, React, Node.js and TypeScript, including the REST APIs the mobile apps use.",
      "I update website pages and app content to support each active Meta Ads campaign.",
    ],
    projectSlugs: ["nordic-home-healthcare"],
  },
  {
    organisation: "ZUSHH",
    kind: "Client",
    logo: logos.zushh,
    role: "iOS, Android & Web Developer",
    location: "UAE",
    summary:
      "ZUSHH is a UAE platform for booking home and commercial services. I built and shipped its native iOS app, and I contribute to its native Android app, website, admin panel and backend.",
    highlights: [
      "I built the iOS app in SwiftUI with an MVVM architecture. It is live on the App Store.",
      "I contribute to the native Android app, which is live on Google Play.",
      "I use AI coding agents to deliver features across iOS, Android, web and backend with a lean team.",
    ],
    projectSlugs: ["zushh"],
    website: { label: "Visit zushh.com", href: "https://zushh.com/" },
  },
  {
    organisation: profile.studio.name,
    kind: "Founder",
    role: "Founder & Lead Developer",
    period: "2024 – Present",
    location: "Dubai, UAE",
    summary:
      "I founded SwiftAppStudio, a Dubai studio that builds iOS and Android apps, websites and AI solutions for clients.",
    highlights: [
      "I build native iOS and Android apps, from the first design to App Store and Google Play release.",
      "I build websites and backends with Next.js, React, Node.js and TypeScript.",
      "I build AI features and automation, using AI coding agents to work with a lean team.",
    ],
    website: { label: "Visit SwiftAppStudio", href: profile.studio.href },
  },
  {
    organisation: "Life Pharmacy",
    kind: "Employer",
    logo: logos.lifePharmacy,
    role: "Senior iOS Developer",
    period: "Nov 2021 – Jun 2026",
    location: "Dubai, UAE",
    summary:
      "I led iOS development of the Life Pharmacy app, a pharmacy and e-commerce app on the App Store built in Swift and SwiftUI with MVVM and VIPER.",
    highlights: [
      "I led the migration from UIKit to SwiftUI and used Claude Code to support the work.",
      "I found and fixed performance bottlenecks and crashes with Instruments and Bugsnag.",
      "I integrated OneSignal and NetCore push notifications, Bugsnag crash reporting and Adjust attribution.",
      "I worked with the product, design, backend and QA teams through JIRA and GitHub and met our release deadlines.",
    ],
    projectSlugs: ["life-pharmacy"],
  },
  {
    organisation: "Newsreels",
    kind: "Employer",
    logo: logos.newsreels,
    clientProjects: [{ name: "ZIRO Rider & ZIRO Captain", slug: "ziro", logo: logos.ziro }],
    role: "iOS Team Lead / Senior iOS Developer",
    period: "Oct 2018 – Nov 2021",
    location: "Dubai, UAE",
    summary:
      "I led the iOS team that delivered three published apps: the Newsreels news aggregator and the ZIRO Rider and ZIRO Captain ride-hailing apps.",
    highlights: [
      "I built live driver search, trip scheduling, route drawing and live vehicle tracking over Socket.IO.",
      "I integrated Stripe and Apple Pay, along with subscription plans, referral programs, community chat and ratings.",
      "I ran sprint planning, code reviews and release schedules for several app builds at once.",
    ],
    projectSlugs: ["ziro"],
  },
  {
    organisation: "Soloinsight Inc.",
    kind: "Employer",
    logo: logos.soloinsight,
    role: "iOS Developer",
    period: "Sep 2016 – Oct 2018",
    location: "Lahore, Pakistan",
    summary:
      "I built and maintained CloudGate, a suite of seven enterprise iOS apps for access control, visitor management and attendance tracking.",
    highlights: [
      "I implemented BLE beacon broadcasting and detection, QR passes, fingerprint authentication and offline SQLite storage.",
      "I delivered a customised enterprise edition of CloudGate built to Microsoft's specifications.",
    ],
    projectSlugs: ["cloudgate"],
  },
  {
    organisation: "Brand Impact & Buggz",
    kind: "Freelance",
    role: "Freelance iOS Developer (remote)",
    period: "Jun 2017 – Nov 2020",
    summary:
      "Alongside my full-time roles, I built and published iOS apps for Brand Impact and Buggz in e-commerce, fleet tracking, food delivery, sports and healthcare.",
    highlights: [
      "For Brand Impact, I delivered five published apps: GiftyOnlineUAE, Pets Health, InfoSense Mobile, HomeBiz and Quote Catalog.",
      "For Buggz, I built World Cup 2018 Companion, People Finder and DoctorWho.",
    ],
  },
];

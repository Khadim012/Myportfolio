import { logos } from "./logos";
import type { Project, ProjectGroup, Screenshot } from "./types";

const appStore = (id: string) => `App Store listing ${id}, official store image`;
const playStore = (pkg: string) => `Google Play listing ${pkg}, official store image`;

const phone = (src: string, height: number, alt: string, caption: string, source: string): Screenshot => ({
  src,
  alt,
  width: 600,
  height,
  caption,
  kind: "phone",
  source,
});

/**
 * Case-study projects. Order here is the order on the projects index;
 * `featured` projects appear on the homepage in this order.
 *
 * Claims are limited to what the CV/brief and public listings support.
 * Do not add usage numbers or performance claims without a source.
 */
export const projects: Project[] = [
  {
    slug: "life-pharmacy",
    brand: { panel: "var(--color-life)", deep: "var(--color-life-deep)" },
    seo: {
      title: "Life Pharmacy iOS App & SwiftUI Migration | Khadim Hussain",
      description:
        "How I led iOS development of the LIFE Pharmacy app in Dubai and used Claude Code to support its migration from UIKit to SwiftUI.",
      ogAlt: "LIFE Pharmacy iOS app case study by Khadim Hussain, with the app's home and Click & Collect screens",
      heading: "LIFE Pharmacy iOS app: leading development and the SwiftUI migration",
      ogImage: "/og/life-pharmacy.png",
    },
    name: "LIFE Pharmacy",
    client: "LIFE Pharmacy, UAE",
    engagement: "Employer",
    sector: "Pharmacy & e-commerce",
    summary:
      "The official LIFE Pharmacy app for online shopping, prescription upload and reward vouchers across the UAE.",
    role: "Senior iOS Developer; led iOS development",
    contribution:
      "I led iOS development of the official LIFE Pharmacy app. I shipped new customer features and led the migration from UIKit to SwiftUI, using Claude Code to support the work.",
    highlights: [
      "I moved the app from UIKit to SwiftUI within its existing MVVM and VIPER modules.",
      "I fixed performance bottlenecks and crashes with Instruments and Bugsnag.",
      "I integrated OneSignal and NetCore push, Bugsnag crash reporting and Adjust attribution.",
    ],
    logo: logos.lifePharmacy,
    platforms: ["iOS"],
    tech: [
      "Swift",
      "SwiftUI",
      "UIKit",
      "MVVM",
      "VIPER",
      "Claude Code",
      "Instruments",
      "Bugsnag",
      "OneSignal",
      "NetCore",
      "Adjust",
    ],
    featured: true,
    links: [
      { label: "Website", href: "https://www.lifepharmacy.com/", kind: "website" },
      {
        label: "App Store",
        href: "https://apps.apple.com/ae/app/life-pharmacy/id1450835575",
        kind: "app-store",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.lifepharmacy.application",
        kind: "google-play",
        note: "Product link. My role was iOS.",
      },
    ],
    video: {
      src: "/videos/life-pharmacy-ios.mp4",
      poster: "/images/life-pharmacy/showcase-poster.webp",
      width: 720,
      height: 900,
      caption:
        "Screen recording of the LIFE Pharmacy iOS app: home offers, categories, prescription upload, cart and checkout. Delivery address blurred.",
      source: "Khadim's own screen recording of the live app, 21 Nov 2026 (profile and address screens removed)",
    },
    screenshots: [
      phone(
        "/images/life-pharmacy/home.webp",
        1300,
        "LIFE Pharmacy iOS home screen with product search, quick actions for Rx Upload, Doctor, Pickup and Free Voucher, and Life Friday Sale offers.",
        "Home: search, quick actions for prescriptions, doctors, pickup and vouchers, then the current offers.",
        "Khadim's own screenshot of the live app, 21 Nov 2026 (delivery address blurred)",
      ),
      phone(
        "/images/life-pharmacy/click-and-collect-app.webp",
        1300,
        "LIFE Pharmacy Click & Collect sheet in the iOS app showing exclusive pickup prices and a Start Pickup button.",
        "Click & Collect: exclusive pickup prices and a one-tap Start Pickup.",
        "Khadim's own screenshot of the live app, 21 Nov 2026 (delivery address blurred)",
      ),
      phone(
        "/images/life-pharmacy/medical-rental.webp",
        1299,
        "Life Rental screen in the LIFE Pharmacy app: a manual wheelchair selected with rental from and to dates.",
        "Life Rental: choose medical equipment and set the rental dates (App Store artwork).",
        appStore("id1450835575"),
      ),
      phone(
        "/images/life-pharmacy/features.webp",
        1299,
        "LIFE Pharmacy app artwork listing its services: Book a Doctor, Order Medicines, Upload Prescription, Click & Collect and Life Rental.",
        "The services in one app: doctors, medicines, prescriptions, Click & Collect and rental (App Store artwork).",
        appStore("id1450835575"),
      ),
    ],
    caseStudy: {
      product: [
        "LIFE Pharmacy is a UAE pharmacy chain, and its app is the official channel for shopping online. Customers can browse and buy healthcare products, upload a prescription so their nearest branch can deliver it, request products by typing or photographing them, and earn and redeem reward vouchers.",
      ],
      responsibilities: [
        "I led iOS development of the app, which is built in Swift and SwiftUI on MVVM and VIPER.",
        "I led the migration from UIKit to SwiftUI.",
        "I designed and shipped new customer features and kept the app fast and stable from release to release.",
        "I diagnosed performance problems and crashes, and I improved the code structure and build automation.",
        "I worked with the product, design, backend and QA teams through JIRA and GitHub and met our release deadlines.",
      ],
      built: [
        {
          heading: "UIKit-to-SwiftUI migration",
          body: [
            "I led the migration of the app from UIKit to SwiftUI and used Claude Code to support the work. I reviewed and tested each change before it shipped.",
            "The app uses both MVVM and VIPER, so I migrated screens within the existing module boundaries.",
          ],
        },
        {
          heading: "Production troubleshooting",
          body: [
            "I diagnosed and fixed performance bottlenecks with Instruments and tracked down crashes reported through Bugsnag.",
          ],
        },
        {
          heading: "Integrations",
          bullets: [
            "OneSignal and NetCore for push notifications.",
            "Bugsnag for crash reporting.",
            "Adjust for attribution tracking.",
          ],
        },
      ],
      outcome: [
        "The app is published on the App Store as LIFE Pharmacy by LIFE HOME HEALTH CARE (L.L.C), in English and Arabic.",
        "The migration moved the app's interface from UIKit to SwiftUI.",
      ],
    },
  },
  {
    slug: "zushh",
    brand: { panel: "var(--color-zushh)", deep: "var(--color-zushh-deep)" },
    seo: {
      title: "ZUSHH iOS App, Android & Web Case Study | Khadim Hussain",
      description:
        "I built and shipped the native iOS app for ZUSHH, a UAE home services platform, and contributed to its native Android app, website and backend.",
      heading: "ZUSHH: the native iOS app, plus Android, web and backend",
      ogAlt: "ZUSHH case study by Khadim Hussain, with the zushh.com homepage and the app's Services screen",
      ogImage: "/og/zushh.png",
    },
    name: "ZUSHH",
    client: "ZUSHH, UAE",
    engagement: "Client",
    sector: "Home & commercial services",
    summary:
      "A UAE platform for booking home and commercial services, from deep cleaning and AC work to annual maintenance contracts.",
    role: "Built the iOS app; contributed to Android, web and backend",
    contribution:
      "I built and shipped the native iOS app and contributed to the native Android, web and backend delivery.",
    highlights: [
      "I built the iOS app in SwiftUI with MVVM. It is live on the App Store.",
      "I contributed to the Android app on Google Play, the website and the backend.",
      "I used AI coding agents to deliver features with a lean team.",
    ],
    logo: logos.zushh,
    platforms: ["iOS", "Android", "Web", "Backend"],
    tech: ["Swift", "SwiftUI", "MVVM", "Firebase", "Kotlin", "Next.js", "Node.js", "TypeScript", "AI coding agents"],
    featured: true,
    links: [
      { label: "Website", href: "https://zushh.com/", kind: "website" },
      {
        label: "App Store",
        href: "https://apps.apple.com/ae/app/zushh/id6758752792",
        kind: "app-store",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.zush.app",
        kind: "google-play",
      },
    ],
    screenshots: [
      phone(
        "/images/zushh/services.webp",
        1066,
        "ZUSHH Services screen with a search bar and home maintenance categories: AC Service, Handyman, Pest Control, Electrician, Plumber and AMC.",
        "ZUSHH service catalogue: home maintenance and appliance repair categories.",
        playStore("com.zush.app"),
      ),
      phone(
        "/images/zushh/booking.webp",
        1299,
        "ZUSHH AC Service booking screen with service location, address details, property type and schedule fields.",
        "ZUSHH scheduled booking and address selection: location, address, property type and schedule.",
        appStore("id6758752792"),
      ),
      phone(
        "/images/zushh/home.webp",
        1299,
        "ZUSHH home screen with the delivery address, a service search and commercial service categories.",
        "ZUSHH home: address, service search and categories in one place.",
        appStore("id6758752792"),
      ),
      {
        src: "/images/zushh/website.webp",
        alt: "zushh.com homepage showing residential and commercial service categories beside a living room renovation banner.",
        width: 1440,
        height: 900,
        caption: "zushh.com on desktop: service categories and current offers.",
        kind: "desktop",
        source: "Live site https://zushh.com/, captured 21 Nov 2026",
      },
    ],
    caseStudy: {
      product: [
        "ZUSHH lets customers across the UAE book trusted home and commercial services in one place: cleaning, plumbing, electrical and AC work, remodelling, pest control and recurring maintenance.",
        "Customers can book something urgent for now, schedule a visit for later, pick up offers and sign up for annual maintenance plans.",
      ],
      responsibilities: [
        "I built and shipped the native iOS app.",
        "I contribute to the native Android app, the website, the admin panel and the backend.",
        "I use AI coding agents to deliver features with a lean team, and I review and test the changes before they ship.",
      ],
      built: [
        {
          heading: "The booking flow",
          steps: [
            {
              title: "Choose a service",
              detail: "Browse residential and commercial categories and pick the service you need.",
            },
            {
              title: "Add to cart",
              detail: "Build up one or more services before checkout, with pricing shown upfront.",
            },
            {
              title: "Pick a saved address",
              detail: "Reuse a saved address or add a new one for the visit.",
            },
            {
              title: "Book",
              detail: "Confirm an on-demand booking or choose a slot for a scheduled visit.",
            },
            {
              title: "Track in order history",
              detail: "Find past and upcoming bookings in order history.",
            },
          ],
        },
        {
          heading: "Booking types and plans",
          bullets: [
            "On-demand bookings for urgent jobs.",
            "Scheduled visits for planned work.",
            "Offers surfaced on eligible services.",
            "Annual maintenance plans for recurring upkeep.",
          ],
        },
        {
          heading: "iOS implementation",
          body: [
            "I built the iOS app in SwiftUI with an MVVM architecture and used Firebase on iOS.",
          ],
        },
      ],
      outcome: [
        "The iOS app is live on the App Store and the Android app is live on Google Play.",
      ],
    },
  },
  {
    slug: "nordic-home-healthcare",
    brand: { panel: "var(--color-nordic)", deep: "var(--color-nordic-deep)" },
    seo: {
      title: "Nordic Home Healthcare iOS, Android & Web | Khadim Hussain",
      description:
        "I develop Nordic Home Healthcare’s native iOS and Android apps, website and backend in Dubai, and I run its Meta Ads campaigns and AI-assisted SEO.",
      heading: "Nordic Home Healthcare: native apps, website, backend and campaigns",
      ogAlt: "Nordic Home Healthcare case study by Khadim Hussain, with the nordichc.com homepage and the Android app's home screen",
      ogImage: "/og/nordic-home-healthcare.png",
    },
    name: "Nordic Home Healthcare",
    client: "Nordic Home Healthcare, UAE",
    engagement: "Employer",
    sector: "Healthcare",
    summary:
      "An at-home healthcare platform in the UAE for nursing, elderly care, physiotherapy, lab tests and IV therapy.",
    role: "Senior Mobile & Full-Stack Developer",
    contribution:
      "I develop and maintain the native iOS and Android apps, the website and the backend. I built and launched the Android app in Kotlin, and I also run the company's Meta Ads campaigns.",
    highlights: [
      "I built the Android app in Kotlin and took it through Google Play review to public release.",
      "I develop the native iOS app, the Next.js website and the Node.js REST APIs.",
      "I set up and manage Meta Ads campaigns and use AI agents to assist with SEO.",
    ],
    logo: logos.nordic,
    platforms: ["iOS", "Android", "Web", "Backend"],
    tech: ["Kotlin", "Swift", "Next.js", "React", "Node.js", "TypeScript", "REST APIs"],
    featured: true,
    links: [
      { label: "Website", href: "https://nordichc.com/", kind: "website" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.nordichc.ae",
        kind: "google-play",
      },
      // iOS: no public App Store listing found (checked 21 Nov 2026). Add one here once verified.
    ],
    screenshots: [
      {
        src: "/images/nordic-home-healthcare/website.webp",
        alt: "nordichc.com homepage with the Immunity Boost IV hero and service navigation for elderly care, blood tests and IV therapy.",
        width: 1440,
        height: 900,
        caption: "nordichc.com on desktop: home healthcare services with booking from the hero.",
        kind: "desktop",
        source: "Live site https://nordichc.com/, captured 21 Nov 2026 (cookies declined)",
      },
      phone(
        "/images/nordic-home-healthcare/home.webp",
        1066,
        "Nordic HC UAE app home screen with service search, popular services and a Blood Test category card.",
        "App home: popular services and care categories.",
        playStore("com.nordichc.ae"),
      ),
      phone(
        "/images/nordic-home-healthcare/blood-test.webp",
        1066,
        "Blood Test at Home screen listing Liver, Kidney, Cholesterol and Complete Blood Count panels with prices.",
        "Blood tests at home: choose a panel, then talk to the team to book.",
        playStore("com.nordichc.ae"),
      ),
      phone(
        "/images/nordic-home-healthcare/iv-therapy.webp",
        1066,
        "IV Therapy at Home screen listing wellness and fitness drips with prices.",
        "IV therapy at home: drip options grouped by goal.",
        playStore("com.nordichc.ae"),
      ),
      phone(
        "/images/nordic-home-healthcare/services.webp",
        1066,
        "Nordic HC UAE Services screen with Anti-Aging and Longevity, Blood Test and elderly care cards.",
        "Services list: each card opens its own booking page.",
        playStore("com.nordichc.ae"),
      ),
    ],
    caseStudy: {
      product: [
        "Nordic Home Healthcare brings care to patients' homes in the UAE: doctors, nurses, physiotherapists and lab technicians visit, so there are no waiting rooms or travel.",
        "The platform supports at-home bookings for skilled nursing, elderly care, post-surgery recovery, physiotherapy, home blood tests and IV therapy. In the app, patients book visits with licensed nurses, manage appointments, chat with the care team and follow their care plan.",
      ],
      responsibilities: [
        "I develop and maintain the native iOS and Android apps, the website and the backend.",
        "I handle integrations, maintenance and ongoing improvements across the platform.",
        "I set up and manage Meta Ads campaigns, and I update the website and apps to support them.",
        "I use AI agents to assist with SEO work on the website.",
      ],
      built: [
        {
          heading: "Android app in Kotlin",
          body: [
            "I built the Android app natively in Kotlin and took it through Google Play's closed testing, the production access review and its first public release.",
          ],
        },
        {
          heading: "Native iOS",
          body: [
            "I develop the native iOS app alongside the Android app.",
          ],
        },
        {
          heading: "Website and REST APIs",
          body: [
            "I develop the web front end and backend with Node.js, Next.js, React and TypeScript. The backend exposes REST APIs consumed by the iOS and Android apps.",
          ],
        },
        {
          heading: "Campaigns, Website Updates & SEO",
          bullets: [
            "I set up and manage Meta Ads campaigns for Nordic Home Healthcare.",
            "I maintain the website and mobile apps, and I update the relevant pages or app content to support each active campaign.",
            "I use AI agents to assist with SEO work on the website.",
          ],
        },
        {
          heading: "How booking works",
          steps: [
            { title: "Choose a service", detail: "Nursing, elderly care, physiotherapy, lab tests or IV therapy." },
            { title: "Book a home visit", detail: "Request a visit from a licensed clinician at a time that suits." },
            { title: "Manage appointments", detail: "See, track and manage upcoming visits." },
            { title: "Stay in touch", detail: "Chat with the care team and follow the care plan." },
          ],
        },
      ],
      outcome: [
        "The Android app is publicly available on Google Play, and the website is live at nordichc.com.",
      ],
    },
  },
  {
    slug: "ziro",
    seo: {
      title: "ZIRO Ride-Hailing iOS Case Study | Khadim Hussain",
      description:
        "I led the iOS team behind ZIRO Rider and ZIRO Captain: live driver search, real-time tracking over Socket.IO, and Stripe and Apple Pay checkout.",
      heading: "ZIRO Rider & ZIRO Captain: leading the iOS team for two ride-hailing apps",
      ogAlt: "ZIRO Rider and ZIRO Captain case study by Khadim Hussain",
      ogImage: "/og/ziro.png",
    },
    name: "ZIRO Rider & ZIRO Captain",
    client: "Ziro Ride LLC, through Newsreels",
    engagement: "Client",
    sector: "Ride sharing",
    summary:
      "A two-sided ride-sharing platform: a passenger app for booking and tracking rides, and a driver app for the people behind the wheel.",
    role: "iOS Team Lead",
    contribution:
      "I led the iOS team that shipped ZIRO Rider and ZIRO Captain, and built rider features such as live driver search, trip scheduling, real-time tracking and Stripe and Apple Pay checkout.",
    platforms: ["iOS"],
    tech: ["Swift", "Socket.IO", "Stripe", "Apple Pay", "Maps & routing", "ARKit", "Core Bluetooth"],
    logo: logos.ziro,
    screenshots: [
      {
        src: "/images/ziro/tree-trips.webp",
        alt: "ZIRO Tree Trips artwork: \"Take rides, we'll plant trees\" beside a white electric car",
        width: 1024,
        height: 480,
        caption: "ZIRO's Tree Trips campaign artwork: \"Take rides, we'll plant trees.\"",
        kind: "artwork",
        source: "ZIRO marketing artwork (lock3.png), supplied by Khadim; store badges and QR codes removed",
      },
    ],
    links: [
      // Archived listings — add once each URL is confirmed to load.
      // { label: "ZIRO Rider", href: "https://ziro-rider.appstor.io/", kind: "archive", note: "Archived listing" },
      // { label: "ZIRO Captain", href: "https://ziro-captain.appstor.io/", kind: "archive", note: "Archived listing" },
    ],
    caseStudy: {
      product: [
        "ZIRO was a ride-sharing platform built around two native apps: ZIRO Rider for passengers and ZIRO Captain for drivers.",
        "Both apps depended on the same real-time backbone. A trip only works if the passenger and driver see the same vehicle position, route and status at the same time.",
      ],
      responsibilities: [
        "I led the iOS team that delivered three published apps: Newsreels, ZIRO Rider and ZIRO Captain.",
        "I ran sprint planning, code reviews and release schedules for several app builds at once.",
      ],
      built: [
        {
          heading: "Platform: shared real-time features",
          body: [
            "These features run across both apps and the backend.",
          ],
          bullets: [
            "Real-time vehicle tracking over Socket.IO.",
            "Route drawing on the map for each trip.",
            "Payments with Stripe and Apple Pay.",
            "Subscription plans, referral programs, community chat and ratings.",
          ],
        },
        {
          heading: "ZIRO Rider: passenger app",
          bullets: [
            "Live search for nearby drivers.",
            "Trip scheduling for rides booked in advance.",
            "Route view and live tracking of the assigned vehicle.",
            "Checkout with Stripe or Apple Pay.",
          ],
        },
        {
          heading: "Rider safety",
          body: [
            "I implemented AR-based driver location, live video streaming, BLE safety tools and voice recognition to make rides safer.",
          ],
        },
        {
          heading: "ZIRO Captain: driver app",
          body: [
            "The driver app is the other half of the same trips. At platform level, it supplies the live vehicle position that riders track over Socket.IO and shows each trip's route to the driver.",
          ],
        },
        {
          heading: "Team leadership",
          body: [
            "I planned the sprints, reviewed the team's code and set the release schedule for each app.",
          ],
        },
      ],
      outcome: [
        "Both apps were published on the App Store by Ziro Ride LLC.",
      ],
    },
  },
  {
    slug: "cloudgate",
    seo: {
      title: "CloudGate Enterprise iOS Case Study | Khadim Hussain",
      description:
        "I built and maintained CloudGate by Soloinsight: seven enterprise iOS apps for access control, visitor management and attendance.",
      heading: "CloudGate by Soloinsight: a suite of seven enterprise iOS apps",
      ogAlt: "CloudGate by Soloinsight case study by Khadim Hussain, with the Soloinsight logo",
      ogImage: "/og/cloudgate.png",
    },
    name: "CloudGate by Soloinsight",
    client: "Soloinsight Inc.",
    engagement: "Employer",
    sector: "Enterprise security",
    summary:
      "A suite of seven enterprise iOS apps for physical access control, visitor management and attendance.",
    role: "Built and maintained the iOS suite",
    contribution:
      "I built and maintained the CloudGate iOS suite: BLE beacon detection, QR passes, fingerprint authentication and offline SQLite storage, plus a customised enterprise edition.",
    logo: logos.soloinsight,
    platforms: ["iOS"],
    tech: ["Swift", "BLE beacons", "QR codes", "Touch ID", "SQLite", "ID scanning"],
    links: [
      { label: "Soloinsight", href: "https://www.soloinsight.com/", kind: "company" },
      {
        label: "CloudGate on the App Store",
        href: "https://apps.apple.com/vc/app/cloudgate-poc/id1211734875",
        kind: "reference",
        note: "Platform reference",
      },
    ],
    caseStudy: {
      product: [
        "CloudGate is Soloinsight's platform for governing physical access to enterprise facilities. Its mobile apps let staff and visitors manage credentials and help security teams track who is on site.",
      ],
      responsibilities: [
        "I built and maintained a suite of seven enterprise iOS apps on the CloudGate platform.",
        "I delivered a customised CloudGate edition through Soloinsight, built to Microsoft's specifications.",
      ],
      built: [
        {
          heading: "Access control",
          bullets: [
            "BLE beacon broadcasting and detection.",
            "Fingerprint authentication with Touch ID.",
            "QR pass generation and scanning.",
          ],
        },
        {
          heading: "Visitor management",
          bullets: [
            "QR invitations for visitors.",
            "Driver's licence scanning to capture visitor details at check-in.",
            "Watchlist alerts that flag visitors to security staff.",
          ],
        },
        {
          heading: "Attendance and offline use",
          bullets: [
            "Attendance tracking for staff.",
            "Offline storage in SQLite so the apps keep working when the network drops.",
          ],
        },
        {
          heading: "A customised edition for Microsoft",
          body: [
            "I delivered a customised enterprise edition of CloudGate built to Microsoft's specifications.",
          ],
        },
      ],
      outcome: [
        "The CloudGate platform remains on the App Store under Soloinsight Inc. The linked listing is a platform reference, not one of the individual apps I built.",
      ],
    },
  },
];

export const otherProjectGroups: ProjectGroup[] = [
  {
    id: "newsreels",
    title: "Newsreels",
    intro: "Oct 2018 – Nov 2021 · iOS Team Lead",
    items: [
      {
        name: "Newsreels",
        description:
          "A news aggregator that presents stories from many publications as short video reels and concise summaries.",
        contribution: "I led the iOS team that delivered it as one of three published apps.",
        links: [
          {
            label: "Company page",
            href: "https://www.linkedin.com/company/newsreels/",
            kind: "company",
            note: "Company reference",
          },
        ],
      },
    ],
  },
  {
    id: "brand-impact",
    title: "Brand Impact",
    intro: "Freelance, Jun 2017 – Nov 2020. I delivered five published iOS apps with checkout flows, GPS tracking and multi-language support.",
    items: [
      {
        name: "GiftyOnlineUAE",
        description: "E-commerce app for gift shopping in the UAE.",
        contribution: "I delivered the published iOS app, including checkout.",
      },
      {
        name: "Pets Health",
        description: "Pet-care retail.",
        contribution: "I delivered the published iOS app.",
      },
      {
        name: "InfoSense Mobile",
        description: "GPS fleet tracking.",
        contribution: "I delivered the published iOS app, including GPS tracking.",
      },
      {
        name: "HomeBiz",
        description: "Food delivery.",
        contribution: "I delivered the published iOS app.",
      },
      {
        name: "Quote Catalog",
        description: "Content curation: a catalogue of quotes.",
        contribution: "I delivered the published iOS app.",
      },
    ],
  },
  {
    id: "buggz",
    title: "Buggz",
    intro: "Freelance, Jun 2017 – Nov 2020.",
    items: [
      {
        name: "World Cup 2018 Companion",
        description: "Live companion app for the 2018 World Cup: real-time scores, goal alerts, fan chat and polls.",
        contribution: "I built the iOS app.",
      },
      {
        name: "People Finder",
        description: "A Google Maps people-finder app with offline SQLite caching.",
        contribution: "I built the iOS app.",
      },
      {
        name: "DoctorWho",
        description: "A healthcare consultation platform for doctors and pharmacies.",
        contribution: "I built the iOS app.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

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
    name: "LIFE Pharmacy",
    client: "LIFE Pharmacy, UAE",
    engagement: "Employer",
    sector: "Pharmacy & e-commerce",
    summary:
      "The official LIFE Pharmacy app for online shopping, prescription upload and reward vouchers across the UAE.",
    role: "Senior iOS Developer; owned iOS end to end",
    contribution:
      "I led iOS development of the official LIFE Pharmacy app and its full migration from UIKit to SwiftUI, shipping new customer features while keeping each release fast and stable.",
    highlights: [
      "Led the full UIKit-to-SwiftUI migration within the app's MVVM and VIPER modules.",
      "Fixed performance bottlenecks and crashes with Instruments and Bugsnag.",
      "Integrated OneSignal and NetCore push, Bugsnag crash reporting and Adjust attribution.",
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
    screenshots: [
      phone(
        "/images/life-pharmacy/features.webp",
        1299,
        "LIFE Pharmacy app artwork listing its services: Book a Doctor, Order Medicines, Upload Prescription, Click & Collect and Life Rental.",
        "The app brings doctor booking, medicine orders, prescription upload, Click & Collect and equipment rental together.",
        appStore("id1450835575"),
      ),
      phone(
        "/images/life-pharmacy/prescription-upload.webp",
        1299,
        "LIFE Pharmacy prescription upload screen artwork with a scan frame around a prescription.",
        "Prescription upload: photograph a prescription and the nearest branch delivers it.",
        appStore("id1450835575"),
      ),
      phone(
        "/images/life-pharmacy/click-and-collect.webp",
        1299,
        "LIFE Pharmacy Click & Collect artwork: order online and collect at a nearby branch.",
        "Click & Collect: order in the app and pick up at a nearby LIFE branch.",
        appStore("id1450835575"),
      ),
      phone(
        "/images/life-pharmacy/medical-rental.webp",
        1299,
        "Life Rental screen in the LIFE Pharmacy app: a manual wheelchair selected with rental from and to dates.",
        "Life Rental: choose medical equipment and set the rental dates.",
        appStore("id1450835575"),
      ),
    ],
    caseStudy: {
      product: [
        "LIFE Pharmacy is a UAE pharmacy chain, and its app is the official channel for shopping online. Customers can browse and buy healthcare products, upload a prescription so their nearest branch can deliver it, request products by typing or photographing them, and earn and redeem reward vouchers.",
      ],
      responsibilities: [
        "Owned end-to-end iOS development of the app, built in Swift and SwiftUI on MVVM and VIPER.",
        "Led the full migration from UIKit to SwiftUI.",
        "Designed and shipped new customer features while keeping the app fast, stable and responsive through each release.",
        "Diagnosed and fixed performance bottlenecks and crashes, and improved code structure and build automation.",
        "Worked with product, design, backend and QA through JIRA and GitHub, consistently meeting release deadlines.",
      ],
      built: [
        {
          heading: "UIKit-to-SwiftUI migration",
          body: [
            "I led the full migration of the app from UIKit to SwiftUI using an AI-native workflow with Claude Code, modernising the codebase and speeding up feature delivery.",
            "The codebase uses both MVVM and VIPER, so the migration worked within those existing module boundaries.",
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
        {
          heading: "Release coordination",
          body: [
            "I worked with product, design, backend and QA through JIRA and GitHub, and consistently met release deadlines.",
          ],
        },
      ],
      outcome: [
        "The app is published on the App Store as LIFE Pharmacy by LIFE HOME HEALTH CARE (L.L.C), with English and Arabic support.",
        "The full UIKit-to-SwiftUI migration modernised the codebase and sped up feature delivery.",
      ],
    },
  },
  {
    slug: "zushh",
    name: "ZUSHH",
    client: "ZUSHH, UAE",
    engagement: "Client",
    sector: "Home & commercial services",
    summary:
      "A UAE platform for booking home and commercial services, from deep cleaning and AC work to annual maintenance contracts.",
    role: "Built and shipped the native iOS app; delivered Android, web and backend",
    contribution:
      "I built and shipped the native iOS app and delivered the Android app, website and backend. Customers browse a service, pick a saved address and book an on-demand or scheduled visit.",
    highlights: [
      "Native iOS app in SwiftUI with MVVM, live on the App Store.",
      "Android app live on Google Play, plus the website and backend.",
      "Booking flow: browse, add to cart, choose an address, book now or schedule.",
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
        "Built and shipped the native iOS app.",
        "Delivered the full platform scope alongside it: native Android, the website and the backend.",
        "Used AI coding agents to ship production-ready features with a lean team.",
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
            "I built the iOS app in SwiftUI with an MVVM architecture, using Firebase on iOS.",
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
    name: "Nordic Home Healthcare",
    client: "Nordic Home Healthcare, UAE",
    engagement: "Employer",
    sector: "Healthcare",
    summary:
      "An at-home healthcare platform in the UAE for nursing, elderly care, physiotherapy, lab tests and IV therapy.",
    role: "Senior Mobile & Full-Stack Developer; own the platform end to end",
    contribution:
      "I own the platform end to end: the native Android app I built and launched in Kotlin, the native iOS app, the website and the REST APIs behind them.",
    highlights: [
      "Built the Android app in Kotlin and took it through Google Play review to public release.",
      "Develop the native iOS app alongside it.",
      "Web front end and backend in Next.js, React, Node.js and TypeScript.",
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
        "Own the complete digital platform end to end: native iOS, native Android, the website and the backend.",
        "Cover development, integrations, maintenance and ongoing improvements.",
        "Built and launched the Android app in Kotlin.",
        "Develop the web front end and the REST APIs the mobile apps consume.",
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
    name: "ZIRO Rider & ZIRO Captain",
    client: "Ziro Ride LLC, through Newsreels",
    engagement: "Client",
    sector: "Ride sharing",
    summary:
      "A two-sided ride-sharing platform: a passenger app for booking and tracking rides, and a driver app for the people behind the wheel.",
    role: "iOS Team Lead",
    platforms: ["iOS"],
    tech: ["Swift", "Socket.IO", "Stripe", "Apple Pay", "Maps & routing", "ARKit", "Core Bluetooth"],
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
        "Led the iOS team delivering three published apps: Newsreels, ZIRO Rider and ZIRO Captain.",
        "Ran sprint planning, code reviews and release schedules across concurrent app builds.",
      ],
      built: [
        {
          heading: "Platform: shared real-time features",
          body: [
            "These features span both apps and the backend, so I describe them at platform level.",
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
            "I ran sprint planning, code reviews and release schedules across multiple concurrent app builds.",
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
    name: "CloudGate by Soloinsight",
    client: "Soloinsight Inc.",
    engagement: "Employer",
    sector: "Enterprise security",
    summary:
      "A suite of seven enterprise iOS apps for physical access control, visitor management and attendance.",
    role: "Built and maintained the iOS suite",
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
        "Built and maintained a suite of seven enterprise iOS apps on the CloudGate platform.",
        "Delivered a customised CloudGate edition through Soloinsight, built to Microsoft's specifications.",
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
            "Attendance tracking.",
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
        contribution: "Led the iOS team that delivered it as one of three published apps.",
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
    intro: "Freelance, Jun 2017 – Nov 2020. Five published iOS apps with checkout flows, GPS tracking, localisation and multi-language support.",
    items: [
      {
        name: "GiftyOnlineUAE",
        description: "E-commerce app for gift shopping in the UAE.",
        contribution: "Delivered the published iOS app, including checkout.",
      },
      {
        name: "Pets Health",
        description: "Pet-care retail.",
        contribution: "Delivered the published iOS app.",
      },
      {
        name: "InfoSense Mobile",
        description: "GPS fleet tracking.",
        contribution: "Delivered the published iOS app, including GPS tracking.",
      },
      {
        name: "HomeBiz",
        description: "Food delivery.",
        contribution: "Delivered the published iOS app.",
      },
      {
        name: "Quote Catalog",
        description: "Content curation: a catalogue of quotes.",
        contribution: "Delivered the published iOS app.",
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
        contribution: "Built the iOS app.",
      },
      {
        name: "People Finder",
        description: "A Google Maps people-finder app with offline SQLite caching.",
        contribution: "Built the iOS app.",
      },
      {
        name: "DoctorWho",
        description: "A healthcare consultation platform for doctors and pharmacies.",
        contribution: "Built the iOS app.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

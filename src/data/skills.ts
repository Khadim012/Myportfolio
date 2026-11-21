import type { SkillGroup } from "./types";

/** Four groups, native iOS first. Short lists so each group scans in a glance. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Native iOS",
    skills: [
      "Swift",
      "SwiftUI",
      "UIKit & Auto Layout",
      "Objective-C",
      "Combine & Swift Concurrency",
      "Core Data & SQLite",
      "StoreKit, Apple Pay & Stripe",
      "MapKit & Core Location",
      "Push notifications",
    ],
  },
  {
    title: "Android",
    skills: ["Kotlin", "Native Android apps", "Google Play release & review", "Closed testing & production access"],
  },
  {
    title: "Web & Backend",
    skills: ["Next.js", "React", "Node.js", "TypeScript", "REST API design", "Socket.IO real-time"],
  },
  {
    title: "Architecture & Tooling",
    skills: [
      "MVVM, VIPER & Clean Architecture",
      "UIKit-to-SwiftUI migration",
      "XCTest unit & UI testing",
      "Instruments profiling",
      "Bugsnag & Crashlytics",
      "TestFlight & Fastlane",
      "Claude Code & AI-assisted workflows",
      "Git, GitHub & JIRA",
    ],
  },
];

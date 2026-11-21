import type { SkillGroup } from "./types";

/** Engineering groups first (native iOS leads), then marketing. Short lists so each group scans in a glance. */
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
    title: "Native Android",
    skills: ["Kotlin", "Android app development", "Google Play release & review", "Closed testing & production access"],
  },
  {
    title: "Web & Backend",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "REST APIs", "Socket.IO real-time"],
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
      "Git, GitHub & JIRA",
    ],
  },
  {
    title: "AI-Assisted Development",
    skills: ["Claude Code", "AI coding agents", "AI-assisted code review & testing"],
  },
  {
    title: "Digital Marketing & SEO",
    skills: ["Meta Ads campaign setup & management", "Campaign-related website & app updates", "AI-assisted SEO"],
  },
];

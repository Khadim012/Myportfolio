import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { profile, siteUrl } from "@/data/profile";
import { pageMetadata } from "@/data/seo";

// Site-wide defaults. Canonical URL and robots are set per page (see src/data/seo.ts),
// so pages without their own metadata, such as the 404 page, never inherit them.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { alternates, robots, ...siteDefaults } = pageMetadata({
  title: profile.seoTitle,
  description: profile.metaDescription,
  path: "/",
  type: "profile",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...siteDefaults,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: `${siteUrl}/` }],
  creator: profile.name,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

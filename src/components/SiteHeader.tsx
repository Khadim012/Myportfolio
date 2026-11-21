import Link from "next/link";
import { cv, profile } from "@/data/profile";
import { MobileMenu } from "./MobileMenu";

export const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/projects/", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 min-[360px]:px-5 sm:gap-6 sm:px-8">
        <Link
          href="/"
          className="group flex min-h-10 items-center gap-2 whitespace-nowrap text-base font-semibold tracking-tight sm:text-[1.0625rem]"
        >
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
          {profile.name}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[0.9375rem]">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="text-muted transition-colors hover:text-ink"
              >
                Email
              </a>
            </li>
            {cv.available ? (
              <li>
                <a
                  href={cv.path}
                  download
                  className="inline-flex min-h-10 items-center rounded-full bg-accent px-4 font-medium text-white transition-colors hover:bg-ink"
                >
                  {cv.label}
                </a>
              </li>
            ) : null}
          </ul>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {cv.available ? (
            <a
              href={cv.path}
              download
              className="inline-flex h-10 items-center rounded-full bg-accent px-4 text-sm font-medium text-white"
            >
              CV<span className="sr-only"> download (PDF)</span>
            </a>
          ) : null}
          <MobileMenu items={navItems} email={profile.email} />
        </div>
      </div>
    </header>
  );
}

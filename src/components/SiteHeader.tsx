import Link from "next/link";
import { profile } from "@/data/profile";
import { MobileMenu } from "./MobileMenu";

export const navItems = [
  { href: "/projects/", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2 font-display text-lg font-semibold tracking-tight"
        >
          <span aria-hidden="true" className="inline-block h-2 w-2 translate-y-[-2px] rounded-full bg-accent" />
          {profile.name}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.9375rem]">
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
                className="rounded-full bg-ink px-4 py-2 text-paper transition-colors hover:bg-accent"
              >
                Email me
              </a>
            </li>
          </ul>
        </nav>

        <MobileMenu items={navItems} email={profile.email} />
      </div>
    </header>
  );
}

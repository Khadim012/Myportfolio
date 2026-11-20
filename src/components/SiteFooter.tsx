import Link from "next/link";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. {profile.location}.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link href="/projects/" className="link-underline hover:text-ink">
              Projects
            </Link>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="link-underline hover:text-ink">
              Email
            </a>
          </li>
          <li>
            <a href={profile.linkedin} className="link-underline hover:text-ink" rel="noopener noreferrer" target="_blank">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.studio.href} className="link-underline hover:text-ink" rel="noopener noreferrer" target="_blank">
              {profile.studio.name}<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

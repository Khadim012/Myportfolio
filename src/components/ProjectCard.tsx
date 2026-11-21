import Link from "next/link";
import type { ExternalLink, Project } from "@/data/types";
import { BrandMark, Shot } from "./media";

const storeKinds = new Set(["website", "app-store", "google-play"]);

/** Website, App Store and Google Play links, as compact pills that open in a new tab. */
export function ProductLinks({ links, className = "" }: { links: ExternalLink[]; className?: string }) {
  const items = links.filter((l) => storeKinds.has(l.kind));
  if (!items.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Product links">
      {items.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-sm font-medium transition-colors hover:border-ink"
          >
            {l.label}
            {l.kind === "google-play" && l.note ? <span className="font-normal text-muted">· product link</span> : null}
            <span aria-hidden="true" className="text-accent">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Platforms({ platforms }: { platforms: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Platforms">
      {platforms.map((p) => (
        <li key={p} className="rounded-full bg-paper-deep px-2.5 py-0.5 text-xs font-medium text-ink/80">
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Lead visual for a card: website with a phone screen over it, a pair of phones, or the mark alone. */
function CardVisual({ project }: { project: Project }) {
  const shots = project.screenshots ?? [];
  const desktop = shots.find((s) => s.kind === "desktop");
  const phones = shots.filter((s) => s.kind === "phone");

  if (desktop && phones[0]) {
    return (
      <div className="relative bg-paper-deep px-5 pb-6 pt-6 sm:px-7">
        <Shot shot={desktop} sizes="(min-width: 1024px) 26rem, 88vw" className="mr-[22%]" />
        <Shot
          shot={phones[0]}
          sizes="(min-width: 1024px) 8rem, 30vw"
          className="absolute bottom-4 right-5 w-[30%] max-w-40 sm:right-7"
        />
      </div>
    );
  }
  if (phones.length) {
    return (
      <div className="flex items-start justify-center gap-4 bg-paper-deep px-6 pt-6">
        {phones.slice(0, 2).map((s, i) => (
          <Shot key={s.src} shot={s} sizes="(min-width: 1024px) 10rem, 40vw" className={`w-[42%] max-w-48 ${i ? "mt-8" : ""}`} />
        ))}
      </div>
    );
  }
  // No verified product screens: the card leads with its mark and summary instead.
  return null;
}

/**
 * Project card used on the homepage and the projects index. Not a stretched
 * link, so the store links inside stay separately focusable.
 */
export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="reveal flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white/70">
      <CardVisual project={project} />
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <BrandMark name={project.name} logo={project.logo} />
          <div className="min-w-0">
            <Heading className="text-xl leading-tight sm:text-2xl">
              <Link href={`/projects/${project.slug}/`} className="hover:text-accent">
                {project.name}
              </Link>
            </Heading>
            <p className="text-sm text-muted">{project.sector}</p>
          </div>
        </div>
        <Platforms platforms={project.platforms} />
        <p className="leading-relaxed text-ink/85">{project.contribution ?? project.summary}</p>
        <div className="mt-auto flex flex-col gap-4 pt-2">
          <ProductLinks links={project.links} />
          <Link
            href={`/projects/${project.slug}/`}
            className="group inline-flex min-h-10 items-center gap-1.5 self-start font-medium text-accent"
          >
            <span className="link-underline">View case study</span>
            <span className="sr-only">: {project.name}</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Larger featured layout, used for the lead project on the homepage. */
export function FeaturedProject({ project }: { project: Project }) {
  const phones = (project.screenshots ?? []).filter((s) => s.kind === "phone").slice(0, 3);
  return (
    <article className="reveal overflow-hidden rounded-3xl border border-line bg-white/70">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="flex flex-col gap-5 p-6 sm:p-9 lg:p-10">
          <div className="flex items-center gap-4">
            <BrandMark name={project.name} logo={project.logo} size="lg" />
            <div>
              <h3 className="text-2xl leading-tight sm:text-3xl">
                <Link href={`/projects/${project.slug}/`} className="hover:text-accent">
                  {project.name}
                </Link>
              </h3>
              <p className="text-sm text-muted">{project.sector}</p>
            </div>
          </div>
          <Platforms platforms={project.platforms} />
          <p className="text-lg leading-relaxed">{project.contribution ?? project.summary}</p>
          {project.highlights?.length ? (
            <ul className="space-y-2 text-ink/80">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-auto flex flex-col gap-4 pt-2">
            <ProductLinks links={project.links} />
            <Link
              href={`/projects/${project.slug}/`}
              className="group inline-flex min-h-10 items-center gap-1.5 self-start font-medium text-accent"
            >
              <span className="link-underline">View case study</span>
              <span className="sr-only">: {project.name}</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
        {phones.length ? (
          <div className="grid grid-cols-3 items-start gap-3 bg-paper-deep px-5 pt-7 sm:gap-5 sm:px-9 sm:pt-10">
            {phones.map((s, i) => (
              <Shot
                key={s.src}
                shot={s}
                sizes="(min-width: 1024px) 11rem, 30vw"
                className={i === 1 ? "translate-y-6" : ""}
              />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

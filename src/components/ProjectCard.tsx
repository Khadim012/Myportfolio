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
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-paper px-3.5 text-sm font-medium text-ink transition-colors hover:bg-paper-deep"
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
        <li key={p} className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.8125rem] font-semibold text-accent">
          {p}
        </li>
      ))}
    </ul>
  );
}

function CaseStudyLink({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group inline-flex min-h-11 items-center gap-1.5 self-start text-[1.0625rem] font-semibold text-accent"
    >
      <span className="link-underline">View Case Study</span>
      <span className="sr-only">: {project.name}</span>
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

/** Brand-coloured panel with the project's real screens: website + phone, or two phones. */
function BrandPanel({ project, lead = false }: { project: Project; lead?: boolean }) {
  const shots = project.screenshots ?? [];
  const desktop = shots.find((s) => s.kind === "desktop");
  const phones = shots.filter((s) => s.kind === "phone");
  if (!phones.length && !desktop) {
    // No verified product screens (archived apps): lead with the mark on a neutral panel.
    return (
      <div className="flex aspect-[16/7] items-center justify-center bg-paper-deep">
        <BrandMark name={project.name} logo={project.logo} size="xl" />
      </div>
    );
  }
  const bg = project.brand
    ? { background: `linear-gradient(150deg, ${project.brand.panel}, ${project.brand.deep})` }
    : { background: "var(--color-paper-deep)" };

  if (desktop && phones[0] && !lead) {
    return (
      <div className="relative overflow-hidden px-5 pb-7 pt-7 sm:px-8" style={bg}>
        <Shot shot={desktop} sizes="(min-width: 1024px) 30rem, 88vw" className="mr-[20%]" />
        <Shot
          shot={phones[0]}
          sizes="(min-width: 1024px) 9rem, 30vw"
          className="absolute bottom-5 right-5 w-[29%] max-w-40 sm:right-8"
        />
      </div>
    );
  }
  return (
    <div
      className={`flex items-start justify-center gap-4 overflow-hidden px-6 sm:gap-6 ${lead ? "h-full min-h-[22rem] pt-9 lg:pt-12" : "pt-8"}`}
      style={bg}
    >
      {phones.slice(0, 2).map((s, i) => (
        <Shot
          key={s.src}
          shot={s}
          sizes={lead ? "(min-width: 1024px) 14rem, 42vw" : "(min-width: 1024px) 11rem, 40vw"}
          className={`${lead ? "w-[44%] max-w-60" : "w-[42%] max-w-48"} ${i ? "mt-10" : ""} -mb-12`}
        />
      ))}
    </div>
  );
}

function CardText({ project, lead = false, headingLevel = "h3" }: { project: Project; lead?: boolean; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className={`flex flex-1 flex-col gap-4 ${lead ? "p-6 sm:p-9 lg:p-11" : "p-6 sm:p-8"}`}>
      <div className="flex items-center gap-3.5">
        <BrandMark name={project.name} logo={project.logo} size={lead ? "lg" : "md"} />
        <div className="min-w-0">
          <Heading className="t-project">
            <Link href={`/projects/${project.slug}/`} className="hover:text-accent">
              {project.name}
            </Link>
          </Heading>
          <p className="text-[0.9375rem] text-muted">{project.sector}</p>
        </div>
      </div>
      <Platforms platforms={project.platforms} />
      <p className="t-body">
        <span className="font-semibold">My role: </span>
        {project.contribution ?? project.summary}
      </p>
      {lead && project.highlights?.length ? (
        <ul className="space-y-2 text-[0.9875rem] text-muted">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-auto flex flex-col gap-3 pt-1">
        <ProductLinks links={project.links} />
        <CaseStudyLink project={project} />
      </div>
    </div>
  );
}

/** Project card: real product image on a brand panel, then name, role, platforms and links. */
export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="card lift reveal flex h-full flex-col overflow-hidden">
      <BrandPanel project={project} />
      <CardText project={project} headingLevel={headingLevel} />
    </article>
  );
}

/** Lead project: text and a large brand panel side by side on desktop, stacked on phones. */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="card reveal overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <CardText project={project} lead />
        <div className="order-first lg:order-none">
          <BrandPanel project={project} lead />
        </div>
      </div>
    </article>
  );
}

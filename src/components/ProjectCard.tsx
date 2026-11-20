import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/types";

/**
 * Text-led project card. If a project has screenshots, the first one is used;
 * otherwise the card leans on typography: index number, name and summary.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const shot = project.screenshots?.[0];
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="reveal group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white/60 lift hover:border-ink/40">
      {shot ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
          <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="relative flex aspect-[2/1] items-end overflow-hidden border-b border-line bg-paper-deep px-6 pb-4 pt-6 md:aspect-[16/9]">
          <span aria-hidden="true" className="font-display text-[5.5rem] font-light leading-none text-ink/10 sm:text-[6.5rem]">
            {number}
          </span>
          <ul className="absolute right-5 top-5 flex max-w-[65%] flex-wrap justify-end gap-1.5" aria-label="Platforms">
            {project.platforms.map((p) => (
              <li key={p} className="rounded-full bg-paper px-2.5 py-0.5 text-xs font-medium text-muted">
                {p}
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="absolute left-6 top-6 h-1.5 w-10 rounded-full bg-accent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow mb-2">{project.sector}</p>
        <h3 className="mb-3 text-2xl font-medium leading-tight sm:text-[1.75rem]">
          <Link
            href={`/projects/${project.slug}/`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mb-5 leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-auto text-sm">
          <span className="font-semibold">My role: </span>
          {project.role}
        </p>
        <p aria-hidden="true" className="mt-5 text-sm font-medium text-accent">
          Read case study <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </p>
      </div>
      {/* Focus ring for the whole card when the stretched link is focused. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-accent ring-offset-2 group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}

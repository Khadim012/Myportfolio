import Image from "next/image";
import Link from "next/link";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { ProjectCard } from "@/components/ProjectCard";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { experience, studioNote } from "@/data/experience";
import { cv, education, portrait, profile } from "@/data/profile";
import { featuredProjects, getProject } from "@/data/projects";
import { skillGroups } from "@/data/skills";

const facts = [
  { value: "10+ yrs", label: "Native iOS" },
  { value: "15+", label: "Apps on the App Store" },
  { value: "Team lead", label: "Three-app iOS team" },
  { value: "iOS · Android · Web", label: "End-to-end platforms" },
];

export default function Home() {
  return (
    <>
      <PersonJsonLd />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24 md:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
          <div className="lg:order-2">
            <div className="rise relative mx-auto w-40 sm:w-48 lg:w-full">
              <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-accent-soft" />
              <Image
                src={portrait.src}
                width={portrait.width}
                height={portrait.height}
                alt={portrait.alt}
                priority
                sizes="(min-width: 1024px) 19rem, 12rem"
                className="relative aspect-[4/5] w-full rounded-[2rem] border border-line bg-white object-cover"
              />
            </div>
          </div>
          <div className="min-w-0 lg:order-1">
          <div className="rise mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3 py-1 font-medium text-ink">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#2f7d4f]" />
              {profile.availability}
            </span>
            <span>{profile.location}</span>
          </div>

          <p className="rise rise-delay-1 eyebrow mb-5 text-ink">
            {profile.name} — {profile.headline}
          </p>

          <h1
            id="hero-title"
            className="rise rise-delay-1 max-w-4xl text-[2.75rem] font-normal leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          >
            I build and ship native <em className="font-normal italic text-accent">iOS</em> apps.
          </h1>

          <p className="rise rise-delay-2 mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            I led iOS development at Life Pharmacy, including its UIKit-to-SwiftUI migration, and have since
            delivered mobile and web platforms for home services and healthcare.
          </p>

          <div className="rise rise-delay-3 mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects/">View projects</ButtonLink>
            {cv.available ? (
              <ButtonLink href={cv.path} variant="secondary" download>
                {cv.label}
              </ButtonLink>
            ) : null}
            <ButtonLink href="#contact" variant="ghost">
              Get in touch
            </ButtonLink>
          </div>
          </div>
          </div>

          <dl className="rise rise-delay-3 mt-16 grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="border-b border-line py-5 pr-4 sm:border-b-0">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-1 font-display text-2xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured work */}
      <section aria-labelledby="work" className="border-t border-line bg-paper-deep/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <SectionHeading id="work" eyebrow="Selected work" title="Featured projects">
            <p>{profile.pitch}</p>
          </SectionHeading>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>

          <div className="mt-10">
            <ButtonLink href="/projects/" variant="secondary">
              All projects <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <SectionHeading id="experience" eyebrow="Career" title="Work experience">
            <p>{studioNote}</p>
          </SectionHeading>

          <ol className="relative border-l border-line">
            {experience.map((job) => (
              <li key={job.organisation} className="reveal relative pb-12 pl-8 last:pb-0 sm:pl-12">
                <span aria-hidden="true" className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-paper bg-accent" />
                <div className="grid gap-4 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10">
                  <div>
                    <h3 className="text-2xl font-medium leading-tight">{job.organisation}</h3>
                    <p className="mt-1 text-muted">{job.role}</p>
                    {job.period || job.location ? (
                      <p className="mt-1 text-sm text-muted">
                        {[job.period, job.location].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-lg leading-relaxed">{job.summary}</p>
                    <ul className="mt-4 space-y-2 text-muted">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.65em] h-px w-3 shrink-0 bg-accent" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    {job.projectSlugs?.length ? (
                      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                        {job.projectSlugs.map((slug) => {
                          const p = getProject(slug);
                          return p ? (
                            <Link key={slug} href={`/projects/${slug}/`} className="link-underline font-medium text-accent">
                              {p.name} case study
                            </Link>
                          ) : null;
                        })}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills" className="border-t border-line bg-paper-deep/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <SectionHeading id="skills" eyebrow="Toolkit" title="Skills" />
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title} className="reveal">
                <h3 className="mb-4 border-b border-line pb-3 text-xl font-medium">{group.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-4 border-t border-line pt-10 md:grid-cols-[1fr_1.4fr]">
            <h3 id="education" className="text-2xl font-medium">
              Education
            </h3>
            <div>
              <p className="text-lg font-medium">{education.degree}</p>
              <p className="text-muted">
                {education.institution} · {education.period}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact" className="border-t border-line bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <p className="eyebrow mb-4 text-paper/70">Contact</p>
          <h2 id="contact" className="max-w-3xl text-4xl font-normal leading-[1.05] sm:text-6xl">
            Hiring for iOS, or need an app shipped? Let&apos;s talk.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper/75">
            {profile.availability}. Based in {profile.location}.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center rounded-full bg-paper px-6 py-3 font-medium text-ink transition-colors hover:bg-accent hover:text-paper"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-paper/40 px-6 py-3 font-medium transition-colors hover:border-paper"
            >
              LinkedIn<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true" className="ml-1.5">↗</span>
            </a>
            {cv.available ? (
              <a
                href={cv.path}
                download
                className="inline-flex items-center rounded-full border border-paper/40 px-6 py-3 font-medium transition-colors hover:border-paper"
              >
                {cv.label}
              </a>
            ) : null}
          </div>

          <p className="mt-10 text-paper/70">
            Studio work:{" "}
            <a href={profile.studio.href} target="_blank" rel="noopener noreferrer" className="link-underline text-paper">
              {profile.studio.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

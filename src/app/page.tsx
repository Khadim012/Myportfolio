import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { FeaturedProject, ProjectCard } from "@/components/ProjectCard";
import { BrandMark, Shot } from "@/components/media";
import { experience, experienceId } from "@/data/experience";
import { companies } from "@/data/logos";
import { Credentials } from "@/components/Credentials";
import { credentials } from "@/data/credentials";
import { education, portrait, profile } from "@/data/profile";
import { getProject } from "@/data/projects";
import { pageMetadata } from "@/data/seo";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = pageMetadata({
  title: profile.seoTitle,
  description: profile.metaDescription,
  path: "/",
  type: "profile",
});

const life = getProject("life-pharmacy")!;
const zushh = getProject("zushh")!;
const nordic = getProject("nordic-home-healthcare")!;
// Hero device frames: the real Life Pharmacy home screen and a ZUSHH booking screen.
const heroShots = [life.screenshots![0], zushh.screenshots!.find((s) => s.src.includes("booking")) ?? zushh.screenshots![0]];

const kindLabel = {
  Employer: "Employment",
  Founder: "Own studio",
  Client: "Client project",
  Freelance: "Freelance",
} as const;

function SectionHeading({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-12">
      <h2 id={id} className="t-section">
        {title}
      </h2>
      {subtitle ? <p className="t-body mt-3 text-muted">{subtitle}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <PersonJsonLd />

      {/* Hero and contact actions */}
      <section aria-labelledby="hero-title" className="relative">
        <div className="container-x pb-12 pt-6 sm:pt-12 lg:pb-20 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
            <div className="min-w-0">
              <div className="rise flex items-center gap-3">
                <Image
                  src={portrait.src}
                  width={portrait.width}
                  height={portrait.height}
                  alt={portrait.alt}
                  priority
                  sizes="4rem"
                  className="h-12 w-12 shrink-0 rounded-full bg-surface object-cover object-top shadow-[0_0_0_2px_white,0_2px_10px_rgb(29_29_31/0.15)] sm:h-16 sm:w-16"
                />
                <p className="flex flex-col text-[0.9375rem] font-medium leading-snug text-ink sm:block sm:text-base">
                  <span>{profile.location}</span>
                  <span aria-hidden="true" className="mx-1.5 hidden text-muted sm:inline">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#1f8a4c]" />
                    {profile.availability}
                  </span>
                </p>
              </div>

              <h1 id="hero-title" className="rise-text t-hero mt-4 sm:mt-6">
                {profile.name}
              </h1>
              <p className="rise-text t-title mt-2 font-semibold text-ink sm:mt-3">
                {profile.headline.replace("Full-Stack", "Full‑Stack")}
              </p>
              <p className="rise-text t-body mt-3 max-w-[38rem] text-muted sm:mt-5">{profile.intro}</p>

              <ContactActions oneRowOnWide className="rise rise-delay-2 mt-5 sm:mt-7" />

              <p className="rise rise-delay-3 mt-4 sm:mt-6">
                <a href="#projects" className="group inline-flex min-h-11 items-center gap-1.5 text-[1.0625rem] font-semibold text-accent">
                  <span className="link-underline">View Projects</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </p>
            </div>

            <div className="rise rise-delay-1 relative mx-auto flex w-full max-w-[26rem] items-start justify-center gap-4 pb-6 sm:gap-5 lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute inset-x-1 bottom-0 top-14 rounded-[2.25rem]"
                style={{ background: "linear-gradient(150deg, var(--color-life), #6b4fb8 55%, var(--color-zushh))", opacity: 0.92 }}
              />
              <figure className="relative w-[46%] max-w-56">
                <Shot shot={heroShots[0]} sizes="(min-width: 1024px) 15rem, 45vw" priority />
                <figcaption className="mt-3 text-center text-sm font-semibold text-white">Life Pharmacy · iOS</figcaption>
              </figure>
              <figure className="relative mt-12 w-[46%] max-w-56">
                <Shot shot={heroShots[1]} sizes="(min-width: 1024px) 15rem, 45vw" priority />
                <figcaption className="mt-3 text-center text-sm font-semibold text-white">ZUSHH · booking</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Companies & Projects */}
      <section aria-labelledby="companies" className="pb-4">
        <div className="container-x">
          <div className="card px-4 py-5 sm:px-6">
            <h2 id="companies" className="eyebrow mb-4 px-1 text-[0.9375rem] font-semibold text-ink">
              Companies &amp; Projects
            </h2>
            <ul className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {companies.map((c) => {
                const inner = (
                  <>
                    <BrandMark name={c.name} logo={c.logo} />
                    <span className="min-w-0">
                      <span className="block font-semibold leading-tight">{c.name}</span>
                      <span className="block text-sm text-muted">{c.relation}</span>
                    </span>
                  </>
                );
                const box = "flex h-full min-h-16 items-center gap-3 rounded-2xl px-3 py-2.5";
                return (
                  <li key={c.name}>
                    {c.slug ? (
                      <Link href={`/projects/${c.slug}/`} className={`${box} transition-colors hover:bg-paper`}>
                        {inner}
                      </Link>
                    ) : (
                      <div className={box}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section aria-labelledby="projects-title" id="projects" className="section-y">
        <div className="container-x">
          <SectionHeading id="projects-title" title="Projects" subtitle="Selected work across iOS, Android, and web." />
          <FeaturedProject project={life} />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ProjectCard project={zushh} />
            <ProjectCard project={nordic} />
          </div>
          <p className="t-body mt-10 text-muted">
            Earlier work:{" "}
            <Link href="/projects/ziro/" className="link-underline font-semibold text-ink hover:text-accent">
              ZIRO Rider &amp; ZIRO Captain
            </Link>{" "}
            with the Newsreels iOS team, and{" "}
            <Link href="/projects/cloudgate/" className="link-underline font-semibold text-ink hover:text-accent">
              CloudGate by Soloinsight
            </Link>
            .{" "}
            <Link href="/projects/" className="inline-flex min-h-11 items-center font-semibold text-accent">
              <span className="link-underline">All projects</span>&nbsp;→
            </Link>
          </p>
        </div>
      </section>

      {/* AI-Assisted Development */}
      <section aria-labelledby="ai-title" id="ai-development" className="pb-[clamp(3rem,1.9rem+4.4vw,7rem)]">
        <div className="container-x">
          <div className="reveal grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[1.75rem] bg-accent-soft p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:p-11">
            <div>
              <h2 id="ai-title" className="t-section">
                AI-Assisted Development
              </h2>
              <p className="t-body mt-4 text-ink/85">
                I use Claude Code and other AI agents to implement features, review code and support SEO work. At Life
                Pharmacy, Claude Code supported the migration from UIKit to SwiftUI. For ZUSHH and Nordic Home
                Healthcare, I use AI-assisted workflows to build mobile and web features, and at Nordic I also use AI
                agents to assist with SEO.
              </p>
              <figure className="mt-6 border-l-[3px] border-accent pl-4">
                <blockquote className="t-title font-semibold text-ink">
                  “AI helps me move faster. I review the code, test the changes, and own what ships.”
                </blockquote>
                <figcaption className="mt-2 text-[0.9375rem] text-muted">— {profile.name}</figcaption>
              </figure>
              <Link
                href="/projects/life-pharmacy/"
                className="group mt-6 inline-flex min-h-11 items-center gap-1.5 text-[1.0625rem] font-semibold text-accent"
              >
                <span className="link-underline">Read the Life Pharmacy case study</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
            <figure>
              <Image
                src="/images/ai/workspace.webp"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 34rem, 92vw"
                loading="lazy"
                alt="Illustration of an AI-assisted iOS workflow: a SwiftUI file in an editor, an assistant pane proposing a UIKit-to-SwiftUI change that is reviewed and tested before applying, and the iOS Simulator showing the Life Pharmacy home screen."
                className="h-auto w-full rounded-2xl shadow-[0_18px_40px_-24px_rgb(10_40_80/0.45)]"
              />
              <figcaption className="mt-2 text-sm text-muted">Illustration with generic example code.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience-title" id="experience" className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading id="experience-title" title="Experience" />
          <ol className="grid grid-cols-1 gap-5">
            {experience.map((job) => (
              <li
                key={job.organisation}
                id={experienceId(job.organisation)}
                className="scroll-target reveal rounded-[1.75rem] bg-paper p-6 sm:p-8"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,min(18rem,45%))_minmax(0,1fr)] md:gap-10">
                  <div className="flex items-start gap-3.5">
                    <BrandMark name={job.organisation} logo={job.logo} size="lg" />
                    <div className="min-w-0">
                      <h3 className="t-project">{job.organisation}</h3>
                      <p className="mt-1 font-semibold text-ink">{job.role}</p>
                      <p className="mt-1 text-[0.9375rem] text-muted">{[job.period, job.location].filter(Boolean).join(" · ")}</p>
                      <p className="mt-2">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold ${
                            job.kind === "Employer" ? "bg-accent-soft text-accent" : "bg-paper-deep text-ink"
                          }`}
                        >
                          {kindLabel[job.kind]}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="t-body text-ink/85">{job.summary}</p>
                    <ul className="mt-4 space-y-2 text-[0.9875rem] text-muted">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    {job.clientProjects?.length ? (
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Client projects">
                        {job.clientProjects.map((c) => (
                          <li key={c.name} className="inline-flex max-w-full items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 text-sm">
                            <BrandMark name={c.name} logo={c.logo} size="sm" />
                            <span className="min-w-0">
                              <span className="text-muted">Client project: </span>
                              <span className="font-semibold">{c.name}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {job.projectSlugs?.length ? (
                      <p className="mt-3 flex flex-wrap gap-x-6">
                        {job.projectSlugs.map((slug) => {
                          const p = getProject(slug);
                          return p ? (
                            <Link
                              key={slug}
                              href={`/projects/${slug}/`}
                              className="group inline-flex min-h-11 items-center gap-1 font-semibold text-accent"
                            >
                              <span className="link-underline">Read the {p.name} case study</span>
                              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                                →
                              </span>
                            </Link>
                          ) : null;
                        })}
                      </p>
                    ) : null}
                    {job.website ? (
                      <p className="mt-3">
                        <a
                          href={job.website.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent"
                        >
                          <span className="link-underline">{job.website.label}</span>
                          <span className="sr-only"> (opens in a new tab)</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Skills and Education */}
      <section aria-labelledby="skills-title" id="skills" className="section-y">
        <div className="container-x">
          <SectionHeading id="skills-title" title="Skills" subtitle="Native iOS comes first. I add Android, web and backend work, plus campaigns and SEO, when a product needs them." />
          <div className="grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title} className="card reveal p-6 sm:p-8">
                <h3 className="t-project">{group.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <li key={s} className="rounded-full bg-paper px-3.5 py-1.5 text-[0.9375rem] font-medium text-ink">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="card reveal mt-5 flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 id="education" className="t-project">
                Education
              </h3>
              <p className="mt-1 text-[1.0625rem] font-semibold">{education.degree}</p>
            </div>
            <p className="text-muted">
              {education.institution} · {education.period}
            </p>
          </div>
        </div>
      </section>

      {/* Certificates and credentials */}
      <section aria-labelledby="credentials-title" id="credentials" className="section-y bg-surface">
        <div className="container-x">
          <SectionHeading
            id="credentials-title"
            title="Certificates & credentials"
            subtitle="My UAE Certificate of Recognition, degree, experience letters from each employer and a Life Pharmacy award. Tap any document to see it in full. Personal ID numbers are redacted."
          />
          <Credentials items={credentials} />
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact-title" id="contact" className="section-y">
        <div className="container-x">
          <div className="card p-5 sm:p-10 lg:p-14">
            <h2 id="contact-title" className="t-section max-w-3xl">
              Hiring for iOS, or need an app shipped? Let&apos;s talk.
            </h2>
            <p className="t-body mt-4 max-w-3xl text-ink/85">
              I build native iOS and Android apps, as well as the websites and backends that support them. I use AI
              coding assistants to speed up development, and I review and test the changes before they ship.
            </p>
            <ContactActions surface="card" className="mt-6 max-[439px]:grid-cols-1 sm:mt-8" />
            <p className="mt-5 text-[0.9375rem] text-muted">
              {profile.availability}. Based in {profile.location}.
            </p>
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[1.0625rem]">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent"
              >
                <span className="link-underline">LinkedIn</span>
                <span className="sr-only"> (opens in a new tab)</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={profile.studio.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent"
              >
                <span className="link-underline">SwiftAppStudio</span>
                <span className="sr-only"> (opens in a new tab)</span>
                <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

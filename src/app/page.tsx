import Image from "next/image";
import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import type { Metadata } from "next";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { pageMetadata } from "@/data/seo";
import { FeaturedProject, ProjectCard } from "@/components/ProjectCard";
import { BrandMark, Shot } from "@/components/media";
import { SectionHeading } from "@/components/ui";
import { experience, studioNote } from "@/data/experience";
import { companies } from "@/data/logos";
import { education, portrait, profile } from "@/data/profile";
import { getProject } from "@/data/projects";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = pageMetadata({
  title: profile.seoTitle,
  description: profile.metaDescription,
  path: "/",
  type: "profile",
});

const facts = [
  { value: "10+ yrs", label: "Native iOS" },
  { value: "15+", label: "Apps on the App Store" },
  { value: "Team lead", label: "Three-app iOS team" },
  { value: "iOS · Android · Web", label: "End-to-end platforms" },
];

const life = getProject("life-pharmacy")!;
const zushh = getProject("zushh")!;
const nordic = getProject("nordic-home-healthcare")!;
const heroShots = [life.screenshots![0], zushh.screenshots![0]];

export default function Home() {
  return (
    <>
      <PersonJsonLd />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-6 sm:px-8 sm:pt-16 lg:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            <div className="min-w-0">
              <div className="rise flex items-center gap-3.5 sm:gap-4">
                <Image
                  src={portrait.src}
                  width={portrait.width}
                  height={portrait.height}
                  alt={portrait.alt}
                  priority
                  sizes="5rem"
                  className="h-14 w-14 shrink-0 rounded-full border border-line bg-white object-cover object-top sm:h-20 sm:w-20"
                />
                <p className="flex flex-col gap-1 text-sm font-medium text-ink sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:text-base">
                  <span>{profile.location}</span>
                  <span aria-hidden="true" className="hidden text-muted sm:inline">·</span>
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#2f7d4f]" />
                    {profile.availability}
                  </span>
                </p>
              </div>

              <h1 id="hero-title" className="rise-text rise-delay-1 mt-4 text-[2.5rem] leading-[1.02] sm:mt-7 sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
              <p className="rise-text rise-delay-1 mt-2 text-lg font-medium leading-snug text-ink/75 sm:mt-3 sm:text-2xl lg:text-[1.75rem]">
                {profile.headline.replace("Full-Stack", "Full\u2011Stack")}
              </p>

              <p className="rise-text rise-delay-2 mt-3 max-w-xl text-base leading-[1.6] text-muted sm:mt-6 sm:text-lg sm:leading-relaxed">{profile.intro}</p>

              <ContactActions className="rise rise-delay-3 mt-5 sm:mt-8" />

              <p className="rise rise-delay-3 mt-6">
                <a href="#work" className="group inline-flex min-h-10 items-center gap-2 font-medium text-ink hover:text-accent">
                  <span className="link-underline">View projects</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
              </p>
            </div>

            <div className="rise rise-delay-2 relative mx-auto flex w-full max-w-md items-start justify-center gap-4 sm:gap-6 lg:max-w-none">
              <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-16 rounded-[2.5rem] bg-paper-deep" />
              <figure className="relative w-[46%] max-w-60">
                <Shot shot={heroShots[0]} sizes="(min-width: 1024px) 15rem, 46vw" priority />
                <figcaption className="mt-3 text-center text-sm font-medium text-muted">Life Pharmacy · iOS</figcaption>
              </figure>
              <figure className="relative mt-14 w-[46%] max-w-60">
                <Shot shot={heroShots[1]} sizes="(min-width: 1024px) 15rem, 46vw" priority />
                <figcaption className="mt-3 text-center text-sm font-medium text-muted">ZUSHH · iOS &amp; Android</figcaption>
              </figure>
            </div>
          </div>

          <dl className="rise rise-delay-3 mt-14 grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="border-b border-line py-5 pr-4 sm:border-b-0">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Companies & projects */}
      <section aria-labelledby="companies" className="border-t border-line bg-white/50">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <h2 id="companies" className="eyebrow mb-6 font-sans tracking-[0.14em]">
            Companies &amp; projects
          </h2>
          <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
              const box = "flex h-full min-h-16 items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3";
              return (
                <li key={c.name}>
                  {c.slug ? (
                    <Link href={`/projects/${c.slug}/`} className={`${box} transition-colors hover:border-ink`}>
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
      </section>

      {/* Featured work */}
      <section aria-labelledby="work" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
          <SectionHeading id="work" eyebrow="Selected work" title="Featured work">
            <p>{profile.pitch}</p>
          </SectionHeading>

          <FeaturedProject project={life} />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ProjectCard project={zushh} />
            <ProjectCard project={nordic} />
          </div>

          <p className="mt-10 text-muted">
            Earlier work:{" "}
            <Link href="/projects/ziro/" className="link-underline font-medium text-ink hover:text-accent">
              ZIRO Rider &amp; ZIRO Captain
            </Link>{" "}
            and Newsreels (iOS team lead), and{" "}
            <Link href="/projects/cloudgate/" className="link-underline font-medium text-ink hover:text-accent">
              CloudGate by Soloinsight
            </Link>
            .{" "}
            <Link href="/projects/" className="link-underline font-medium text-accent">
              All projects →
            </Link>
          </p>
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
                <div className="grid gap-4 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-10">
                  <div className="flex items-start gap-3">
                    <BrandMark name={job.organisation} logo={job.logo} />
                    <div className="min-w-0">
                      <h3 className="text-xl leading-tight sm:text-2xl">{job.organisation}</h3>
                      <p className="mt-1 font-medium text-ink/80">{job.role}</p>
                      <p className="mt-1 text-sm text-muted">
                        {[job.kind, job.period, job.location].filter(Boolean).join(" · ")}
                      </p>
                    </div>
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
                    {job.clientProjects?.length ? (
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Client projects">
                        {job.clientProjects.map((c) => (
                          <li key={c.name} className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3 text-sm">
                            <BrandMark name={c.name} logo={c.logo} size="sm" />
                            <span>
                              <span className="text-muted">Client project: </span>
                              {c.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {job.projectSlugs?.length ? (
                      <p className="mt-3 flex flex-wrap gap-x-5 text-sm">
                        {job.projectSlugs.map((slug) => {
                          const p = getProject(slug);
                          return p ? (
                            <Link
                              key={slug}
                              href={`/projects/${slug}/`}
                              className="group inline-flex min-h-11 items-center gap-1 font-medium text-accent"
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
                <h3 className="mb-4 border-b border-line pb-3 text-xl">{group.title}</h3>
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
            <h3 id="education" className="text-2xl">
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
          <h2 id="contact" className="max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
            Hiring for iOS, or need an app shipped? Let&apos;s talk.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper/75">
            {profile.availability}. Based in {profile.location}.
          </p>

          <ContactActions tone="dark" className="mt-10" />
          <p className="mt-6">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-1.5 font-medium text-paper hover:text-accent-soft"
            >
              <span className="link-underline">LinkedIn</span>
              <span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span>
            </a>
          </p>

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

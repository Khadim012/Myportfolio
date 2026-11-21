import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { BreadcrumbJsonLd } from "@/components/PersonJsonLd";
import { ShowcaseVideo } from "@/components/ShowcaseVideo";
import { pageMetadata } from "@/data/seo";
import { BrandMark, Shot } from "@/components/media";
import { Platforms, ProductLinks } from "@/components/ProjectCard";
import { ButtonLink, OutboundLink } from "@/components/ui";
import { profile } from "@/data/profile";
import { getProject, projects } from "@/data/projects";
import type { CaseStudySection } from "@/data/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/projects/${project.slug}/`,
    type: "article",
    image: { url: project.seo.ogImage, alt: `${project.name} case study by ${profile.name}` },
  });
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="reveal grid gap-4 border-t border-line py-12 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-12">
      <h2 className="text-2xl leading-tight md:sticky md:top-24 md:self-start">{title}</h2>
      <div className="max-w-2xl text-lg leading-relaxed">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BuiltSection({ section }: { section: CaseStudySection }) {
  return (
    <div className="border-b border-line pb-8 last:border-b-0 last:pb-0">
      <h3 className="mb-3 text-xl">{section.heading}</h3>
      {section.body?.map((p) => (
        <p key={p} className="mb-3 text-muted last:mb-0">
          {p}
        </p>
      ))}
      {section.bullets ? (
        <div className="mt-3 text-muted">
          <Bullets items={section.bullets} />
        </div>
      ) : null}
      {section.steps ? (
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {section.steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-line bg-white/60 p-4">
              <p className="text-sm font-semibold text-accent">Step {i + 1}</p>
              <p className="mt-1 font-medium">{step.title}</p>
              <p className="mt-1 text-base text-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();
  const cs = project.caseStudy;
  const shots = project.screenshots ?? [];
  const lead = shots[0];
  const leadPhone = shots.find((x) => x.kind === "phone" && x !== lead);

  const caseStudies = projects.filter((p) => p.caseStudy);
  const idx = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects/" },
          { name: project.name, path: `/projects/${project.slug}/` },
        ]}
      />
      <header className="mx-auto max-w-6xl px-5 pb-14 pt-10 sm:px-8 sm:pt-14">
        <nav aria-label="Breadcrumb" className="rise mb-10 text-sm text-muted">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="link-underline hover:text-ink">
                Home
              </Link>
              <span aria-hidden="true" className="ml-2">/</span>
            </li>
            <li>
              <Link href="/projects/" className="link-underline hover:text-ink">
                Projects
              </Link>
              <span aria-hidden="true" className="ml-2">/</span>
            </li>
            <li aria-current="page" className="text-ink">
              {project.name}
            </li>
          </ol>
        </nav>

        <div className={`grid items-center gap-12 ${lead ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]" : ""}`}>
          <div className="min-w-0">
            <div className="rise flex items-center gap-4">
              <BrandMark name={project.name} logo={project.logo} size="lg" />
              <p className="eyebrow">{project.sector} · Case study</p>
            </div>
            <h1 className="rise-text rise-delay-1 mt-6 max-w-4xl text-[2.25rem] leading-[1.05] sm:text-5xl">{project.seo.heading}</h1>
            <p className="rise-text rise-delay-2 mt-5 max-w-2xl text-xl leading-relaxed text-muted">{project.summary}</p>
            {project.contribution ? (
              <p className="rise rise-delay-2 mt-4 max-w-2xl text-lg leading-relaxed">
                <span className="font-semibold">What I did: </span>
                {project.contribution}
              </p>
            ) : null}

            {project.links.length ? (
              <div className="rise rise-delay-2 mt-7">
                <h2 className="sr-only">Live product links</h2>
                <ProductLinks links={project.links} />
                {project.links.some((l) => !["website", "app-store", "google-play"].includes(l.kind)) ? (
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {project.links
                      .filter((l) => !["website", "app-store", "google-play"].includes(l.kind))
                      .map((l) => (
                        <li key={l.href}>
                          <OutboundLink link={l} className="font-medium" />
                        </li>
                      ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            <dl className="rise rise-delay-3 mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
              <div>
                <dt className="eyebrow">My role</dt>
                <dd className="mt-2 font-medium">{project.role}</dd>
              </div>
              <div>
                <dt className="eyebrow">Platforms</dt>
                <dd className="mt-2">
                  <Platforms platforms={project.platforms} />
                </dd>
              </div>
              {project.client ? (
                <div>
                  <dt className="eyebrow">{project.engagement === "Employer" ? "Company" : "Client"}</dt>
                  <dd className="mt-2">{project.client}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          {lead ? (
            <div className="rise rise-delay-2 relative mx-auto w-full max-w-md lg:max-w-none">
              {lead.kind === "desktop" && leadPhone ? (
                <div className="relative pb-10">
                  <Shot shot={lead} sizes="(min-width: 1024px) 30rem, 92vw" priority className="mr-[18%]" />
                  <Shot
                    shot={leadPhone}
                    sizes="(min-width: 1024px) 10rem, 32vw"
                    priority
                    className="absolute bottom-0 right-0 w-[32%] max-w-44"
                  />
                </div>
              ) : (
                <div className="flex items-start justify-center gap-5">
                  <Shot shot={lead} sizes="(min-width: 1024px) 15rem, 46vw" priority className="w-[46%] max-w-60" />
                  {leadPhone ? (
                    <Shot shot={leadPhone} sizes="(min-width: 1024px) 15rem, 46vw" className="mt-12 w-[46%] max-w-60" />
                  ) : null}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Block title="What the product does">
          {cs.product.map((p) => (
            <p key={p} className="mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </Block>

        <Block title="What I owned">
          <Bullets items={cs.responsibilities} />
        </Block>

        <Block title="Implementation highlights">
          <div className="space-y-8">
            {cs.built.map((s) => (
              <BuiltSection key={s.heading} section={s} />
            ))}
          </div>
        </Block>

        {project.video ? (
          <section aria-labelledby="in-action" className="border-t border-line py-12">
            <div className="grid items-center gap-8 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-12">
              <div>
                <h2 id="in-action" className="text-2xl leading-tight">
                  The app in action
                </h2>
                <p className="mt-3 text-muted">{project.video.caption}</p>
              </div>
              <figure className="mx-auto w-full max-w-sm md:mx-0">
                <ShowcaseVideo
                  src={project.video.src}
                  poster={project.video.poster}
                  width={project.video.width}
                  height={project.video.height}
                  label={project.video.caption}
                />
              </figure>
            </div>
          </section>
        ) : null}

        {shots.length ? (
          <section aria-labelledby="screens" className="border-t border-line py-12">
            <h2 id="screens" className="mb-2 text-2xl leading-tight">
              Screens
            </h2>
            <p className="mb-8 max-w-2xl text-muted">Select a screenshot to enlarge it. Images are from the live product and its public store listings.</p>
            <Gallery shots={shots} label={project.name} />
          </section>
        ) : null}

        <Block title="Release and outcome">
          {cs.outcome.map((p) => (
            <p key={p} className="mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </Block>
        <Block title="Technology">
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </Block>

      </div>

      <nav aria-label="More case studies" className="mt-8 border-t border-line bg-paper-deep/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Next case study</p>
            <Link
              href={`/projects/${next.slug}/`}
              className="group text-3xl font-semibold leading-tight tracking-tight hover:text-accent sm:text-4xl"
            >
              {next.name} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/projects/" variant="secondary">
              All projects
            </ButtonLink>
            <ButtonLink href="/#contact">Contact me</ButtonLink>
          </div>
        </div>
      </nav>
    </article>
  );
}

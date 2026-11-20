import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, OutboundLink } from "@/components/ui";
import { ogImage, profile, siteUrl } from "@/data/profile";
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
  const title = `${project.name} case study`;
  const url = `/projects/${project.slug}/`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: profile.name,
      title: `${title} — ${profile.name}`,
      description: project.summary,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${profile.name}`,
      description: project.summary,
      images: [ogImage.url],
    },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="reveal grid gap-4 border-t border-line py-12 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-12">
      <h2 className="text-2xl font-medium leading-tight md:sticky md:top-24 md:self-start">{title}</h2>
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
      <h3 className="mb-3 font-display text-xl font-medium">{section.heading}</h3>
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

  const caseStudies = projects.filter((p) => p.caseStudy);
  const idx = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/projects/` },
      { "@type": "ListItem", position: 3, name: project.name, item: `${siteUrl}/projects/${project.slug}/` },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }}
      />

      <header className="mx-auto max-w-6xl px-5 pb-14 pt-12 sm:px-8 sm:pt-16">
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

        <p className="rise eyebrow mb-4">{project.sector} · Case study</p>
        <h1 className="rise rise-delay-1 max-w-4xl text-5xl font-normal leading-[1.02] sm:text-7xl">{project.name}</h1>
        <p className="rise rise-delay-2 mt-6 max-w-2xl text-xl leading-relaxed text-muted">{project.summary}</p>

        <dl className="rise rise-delay-3 mt-12 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <dt className="eyebrow">My role</dt>
            <dd className="mt-2">{project.role}</dd>
          </div>
          <div>
            <dt className="eyebrow">Platforms</dt>
            <dd className="mt-2">{project.platforms.join(" · ")}</dd>
          </div>
          {project.client ? (
            <div>
              <dt className="eyebrow">Client</dt>
              <dd className="mt-2">{project.client}</dd>
            </div>
          ) : null}
        </dl>

        {project.links.length ? (
          <div className="rise rise-delay-3 mt-8">
            <h2 className="sr-only">Links</h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {project.links.map((l) => (
                <li key={l.href}>
                  <OutboundLink link={l} className="font-medium" />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </header>

      {project.screenshots?.length ? (
        <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
          <ul className="flex snap-x gap-4 overflow-x-auto pb-4">
            {project.screenshots.map((s) => (
              <li key={s.src} className="w-56 shrink-0 snap-start overflow-hidden rounded-2xl border border-line">
                <Image src={s.src} alt={s.alt} width={s.width} height={s.height} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Block title="What it does">
          {cs.product.map((p) => (
            <p key={p} className="mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </Block>

        <Block title="My responsibilities">
          <Bullets items={cs.responsibilities} />
        </Block>

        <Block title="What I built">
          <div className="space-y-8">
            {cs.built.map((s) => (
              <BuiltSection key={s.heading} section={s} />
            ))}
          </div>
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

        <Block title="Outcome">
          {cs.outcome.map((p) => (
            <p key={p} className="mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </Block>
      </div>

      <nav aria-label="More case studies" className="mt-8 border-t border-line bg-paper-deep/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Next case study</p>
            <Link
              href={`/projects/${next.slug}/`}
              className="group font-display text-3xl leading-tight hover:text-accent sm:text-4xl"
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

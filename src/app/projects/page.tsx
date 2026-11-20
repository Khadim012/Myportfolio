import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { OutboundLink, SectionHeading } from "@/components/ui";
import { ogImage } from "@/data/profile";
import { otherProjectGroups, projects } from "@/data/projects";

const description =
  "Case studies and project work by Khadim Hussain: native iOS and Android apps, web platforms and enterprise suites for pharmacy, healthcare, home services, ride sharing and access control.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects/" },
  openGraph: {
    type: "website",
    url: "/projects/",
    siteName: "Khadim Hussain",
    title: "Projects — Khadim Hussain",
    description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: "Projects — Khadim Hussain", description, images: [ogImage.url] },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <p className="rise eyebrow mb-4">Projects</p>
        <h1 className="rise rise-delay-1 max-w-4xl text-5xl font-normal leading-[1.02] sm:text-7xl">
          Apps and platforms I&apos;ve built and shipped.
        </h1>
        <p className="rise rise-delay-2 mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Five in-depth case studies, followed by other iOS work for clients and agencies. Every case study covers what
          the product does, my part in it, what I built, the technology, and the outcome.
        </p>
      </section>

      <section aria-labelledby="case-studies" className="border-t border-line bg-paper-deep/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <SectionHeading id="case-studies" eyebrow="In depth" title="Case studies" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="more-projects" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <SectionHeading id="more-projects" eyebrow="Also shipped" title="More projects" />
          <div className="space-y-14">
            {otherProjectGroups.map((group) => (
              <div key={group.id} className="reveal grid gap-6 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10">
                <div>
                  <h3 className="text-2xl font-medium">{group.title}</h3>
                  <p className="mt-1 text-muted">{group.intro}</p>
                </div>
                <ul className="divide-y divide-line border-y border-line">
                  {group.items.map((item) => (
                    <li key={item.name} className="grid gap-1 py-5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6">
                      <p className="font-display text-lg">{item.name}</p>
                      <div>
                        <p>{item.description}</p>
                        <p className="mt-1 text-sm text-muted">
                          <span className="font-semibold text-ink">My contribution: </span>
                          {item.contribution}
                        </p>
                        {item.links?.length ? (
                          <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                            {item.links.map((l) => (
                              <OutboundLink key={l.href} link={l} />
                            ))}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

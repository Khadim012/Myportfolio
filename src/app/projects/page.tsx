import type { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import { ProjectCard } from "@/components/ProjectCard";
import { OutboundLink, SectionHeading } from "@/components/ui";
import { otherProjectGroups, projects } from "@/data/projects";

const description =
  "Case studies from Khadim Hussain, an iOS developer in Dubai: native iOS and Android apps, websites and backends for pharmacy, healthcare and home services.";

export const metadata: Metadata = pageMetadata({
  title: "iOS, Android & Web Projects | Khadim Hussain",
  description,
  path: "/projects/",
  image: { url: "/og/projects.png", alt: "Projects by Khadim Hussain: Life Pharmacy, ZUSHH and Nordic Home Healthcare app screens" },
});

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
        <p className="rise eyebrow mb-4">Projects</p>
        <h1 className="rise rise-delay-1 max-w-4xl text-[2.75rem] leading-[1.02] sm:text-6xl">
          iOS, Android and web projects I&apos;ve shipped.
        </h1>
        <p className="rise rise-delay-2 mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Five in-depth case studies from my work as an iOS developer in Dubai, followed by earlier iOS work for clients
          and agencies. Each one covers what the product does, my part in it, what I built, and the outcome.
        </p>
      </section>

      <section aria-labelledby="case-studies" className="border-t border-line bg-paper-deep/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <SectionHeading id="case-studies" eyebrow="In depth" title="Case studies" />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
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
                  <h3 id={group.id} className="text-2xl">{group.title}</h3>
                  <p className="mt-1 text-muted">{group.intro}</p>
                </div>
                <ul className="divide-y divide-line border-y border-line">
                  {group.items.map((item) => (
                    <li key={item.name} className="grid gap-1 py-5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6">
                      <p className="text-lg font-semibold">{item.name}</p>
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

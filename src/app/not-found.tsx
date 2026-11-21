import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Khadim Hussain" },
  // Next.js adds <meta name="robots" content="noindex"> to the 404 page itself.
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <p className="eyebrow mb-4">404</p>
      <h1 className="max-w-2xl text-5xl leading-tight sm:text-6xl">This page doesn&apos;t exist.</h1>
      <p className="mt-6 max-w-xl text-lg text-muted">The link may be out of date. Try the projects page or head home.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/projects/" variant="secondary">
          Projects
        </ButtonLink>
      </div>
    </section>
  );
}

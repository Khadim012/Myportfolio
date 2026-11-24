import Link from "next/link";
import type { ReactNode } from "react";
import type { ExternalLink as ExternalLinkType, LinkKind } from "@/data/types";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.9375rem] font-medium transition-colors";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "border border-line bg-surface text-ink hover:border-ink/40",
  ghost: "text-ink underline decoration-1 underline-offset-[0.3em] hover:text-accent px-1",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  download?: boolean;
}) {
  const className = `${base} ${variants[variant]}`;
  if (href.startsWith("/") && !download) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} download={download || undefined}>
      {children}
    </a>
  );
}

const kindIcon: Record<LinkKind, string> = {
  website: "↗",
  "app-store": "↗",
  "google-play": "↗",
  archive: "↗",
  company: "↗",
  reference: "↗",
};

/** External link that opens in a new tab and announces that to screen readers. */
export function OutboundLink({ link, className = "" }: { link: ExternalLinkType; className?: string }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-baseline gap-1.5 ${className}`}
    >
      <span className="link-underline">{link.label}</span>
      <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {kindIcon[link.kind]}
      </span>
      {link.note ? <span className="text-sm text-muted">· {link.note}</span> : null}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 grid gap-4 md:mb-14 md:grid-cols-[1fr_1.4fr] md:items-end">
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 id={id} className="text-4xl font-medium leading-[1.05] sm:text-5xl">
          {title}
        </h2>
      </div>
      {children ? <div className="max-w-xl text-lg leading-relaxed text-muted md:justify-self-end">{children}</div> : null}
    </div>
  );
}

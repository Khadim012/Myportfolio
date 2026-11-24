"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Credential } from "@/data/credentials";

/**
 * Certificates & credentials. The featured document gets a large card; the rest
 * sit in a grid. Every document is a button that opens a full view in a native
 * <dialog> (Escape closes, arrow keys step, focus returns to the opener), with
 * an "Open full size" link to the original image in a new tab.
 */
export function Credentials({ items }: { items: Credential[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (index !== null && d && !d.open) d.showModal();
  }, [index]);

  const open = (i: number, el: HTMLButtonElement) => {
    openerRef.current = el;
    setIndex(i);
  };
  const close = () => dialogRef.current?.close();
  const step = (dir: number) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length));
  const current = index === null ? null : items[index];

  const featured = items.filter((c) => c.featured);
  const rest = items.filter((c) => !c.featured);

  const viewButton = (c: Credential, sizes: string, className = "") => (
    <button
      type="button"
      onClick={(e) => open(items.indexOf(c), e.currentTarget)}
      className={`group block w-full cursor-zoom-in overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgb(29_29_31/0.1),0_14px_30px_-18px_rgb(29_29_31/0.4)] focus-visible:outline-offset-4 ${className}`}
    >
      <Image
        src={c.src}
        alt={c.alt}
        width={c.width}
        height={c.height}
        loading="lazy"
        sizes={sizes}
        className="block h-auto w-full transition-transform duration-300 motion-safe:group-hover:scale-[1.015]"
      />
      <span className="sr-only">View {c.title} full size</span>
    </button>
  );

  const titleBlock = (c: Credential, Heading: "h3" | "h4" = "h3") => (
    <>
      <Heading className="text-[1.0625rem] font-semibold leading-snug text-ink">{c.title}</Heading>
      <p className="mt-1 text-[0.9375rem] text-muted">
        {c.issuer} · {c.date}
      </p>
    </>
  );

  return (
    <>
      {featured.map((c) => (
        <article key={c.src} className="mb-10 grid gap-6 rounded-[1.75rem] bg-paper p-5 sm:p-8 md:grid-cols-[minmax(0,20rem)_1fr] md:items-center md:gap-10">
          {viewButton(c, "(min-width: 768px) 20rem, 92vw")}
          <div>
            <p className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">Key credential</p>
            <h3 className="t-project mt-4">{c.title}</h3>
            <p className="mt-2 font-medium text-ink">
              {c.issuer} · {c.date}
            </p>
            <p className="t-body mt-4 text-muted">{c.summary}</p>
            <button
              type="button"
              onClick={(e) => open(items.indexOf(c), e.currentTarget)}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 font-semibold text-white hover:bg-accent-hover"
            >
              View certificate<span className="sr-only">: {c.title}</span>
            </button>
          </div>
        </article>
      ))}

      <ul className="grid grid-cols-1 items-start gap-x-6 gap-y-10 min-[420px]:grid-cols-2 lg:grid-cols-3">
        {rest.map((c) => (
          <li key={c.src} className="flex flex-col">
            {viewButton(c, "(min-width: 1024px) 24rem, (min-width: 420px) 45vw, 92vw")}
            <div className="mt-4">
              {titleBlock(c)}
              <p className="mt-2 text-[0.9375rem] leading-snug text-muted">{c.summary}</p>
            </div>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? current.title : "Certificate"}
        onClose={() => {
          setIndex(null);
          openerRef.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[96dvh] w-[min(96vw,64rem)] overflow-visible bg-transparent p-0 text-paper backdrop:bg-ink/90"
      >
        {current ? (
          <figure className="flex max-h-[96dvh] flex-col items-center gap-3">
            <div className="flex w-full shrink-0 flex-wrap items-center justify-between gap-2">
              <p className="shrink-0 text-sm text-paper/80" aria-live="polite">
                {(index ?? 0) + 1} of {items.length}
              </p>
              <div className="flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-paper/40 px-3 text-sm hover:border-paper sm:px-4"
                >
                  <span aria-hidden="true">←</span>
                  <span className="max-sm:sr-only">Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-paper/40 px-3 text-sm hover:border-paper sm:px-4"
                >
                  <span className="max-sm:sr-only">Next</span>
                  <span aria-hidden="true">→</span>
                </button>
                <a
                  href={current.src}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-paper/40 px-3 text-sm hover:border-paper sm:px-4"
                >
                  Open full size<span className="sr-only"> (opens in a new tab)</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <button type="button" onClick={close} autoFocus className="min-h-11 rounded-full bg-paper px-4 text-sm font-medium text-ink">
                  Close<span className="sr-only"> (Escape)</span>
                </button>
              </div>
            </div>
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="(min-width: 640px) 48rem, 96vw"
              style={{
                height: `min(calc(96dvh - 9rem), calc(96vw * ${(current.height / current.width).toFixed(3)}))`,
                width: "auto",
              }}
              className="shrink-0 rounded-xl bg-white shadow-2xl"
            />
            <figcaption className="max-w-2xl shrink-0 text-center text-sm leading-snug text-paper">
              <span className="font-semibold">{current.title}</span>
              <span className="text-paper/80">
                {" "}
                · {current.issuer} · {current.date}
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}

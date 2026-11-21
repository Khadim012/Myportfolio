"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Screenshot } from "@/data/types";

/**
 * Captioned screenshot gallery. Each image is a button that opens a larger view
 * in a native <dialog>: focus moves into it, Escape closes it, arrow keys step
 * through the set, and focus returns to the image that opened it.
 */
export function Gallery({ shots, label }: { shots: Screenshot[]; label: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number, el: HTMLButtonElement) => {
    openerRef.current = el;
    setIndex(i);
  };

  useEffect(() => {
    const d = dialogRef.current;
    if (index !== null && d && !d.open) d.showModal();
  }, [index]);

  const close = () => dialogRef.current?.close();
  const step = (dir: number) => setIndex((i) => (i === null ? i : (i + dir + shots.length) % shots.length));

  const current = index === null ? null : shots[index];
  const phones = shots.filter((s) => s.kind === "phone");
  const desktops = shots.filter((s) => s.kind === "desktop");

  const tile = (s: Screenshot) => {
    const i = shots.indexOf(s);
    return (
      <figure key={s.src} className="flex flex-col">
        <button
          type="button"
          onClick={(e) => open(i, e.currentTarget)}
          className={`${s.kind === "phone" ? "shot-phone" : "shot-desktop"} group block w-full cursor-zoom-in text-left focus-visible:outline-offset-4`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            width={s.width}
            height={s.height}
            loading="lazy"
            sizes={s.kind === "phone" ? "(min-width: 1024px) 15rem, (min-width: 640px) 30vw, 45vw" : "(min-width: 1024px) 48rem, 92vw"}
            className="block h-auto w-full transition-transform duration-300 motion-safe:group-hover:scale-[1.015]"
          />
          <span className="sr-only">Enlarge screenshot</span>
        </button>
        <figcaption className="mt-3 text-sm leading-snug text-muted">{s.caption}</figcaption>
      </figure>
    );
  };

  return (
    <>
      {desktops.length ? <div className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,48rem)]">{desktops.map(tile)}</div> : null}
      {phones.length ? (
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{phones.map(tile)}</div>
      ) : null}

      <dialog
        ref={dialogRef}
        aria-label={`${label} screenshot`}
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
        className="m-auto max-h-[94dvh] w-[min(94vw,64rem)] overflow-visible bg-transparent p-0 text-paper backdrop:bg-ink/85"
      >
        {current ? (
          <figure className="flex max-h-[94dvh] flex-col items-center gap-3">
            <div className="flex w-full items-center justify-between gap-3">
              <p className="text-sm text-paper/80" aria-live="polite">
                {(index ?? 0) + 1} of {shots.length}
              </p>
              <div className="flex gap-2">
                {shots.length > 1 ? (
                  <>
                    <button type="button" onClick={() => step(-1)} className="min-h-11 rounded-full border border-paper/40 px-4 text-sm hover:border-paper">
                      <span aria-hidden="true">←</span> Previous
                    </button>
                    <button type="button" onClick={() => step(1)} className="min-h-11 rounded-full border border-paper/40 px-4 text-sm hover:border-paper">
                      Next <span aria-hidden="true">→</span>
                    </button>
                  </>
                ) : null}
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
              sizes="94vw"
              className={`h-auto max-h-[78dvh] w-auto max-w-full rounded-2xl bg-white ${current.kind === "desktop" ? "" : "shadow-2xl"}`}
            />
            <figcaption className="max-w-2xl text-center text-sm text-paper/85">{current.caption}</figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}

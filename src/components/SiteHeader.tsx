"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { cv, profile } from "@/data/profile";

/** Homepage sections in the navigation. Absolute "/#id" links so they work from case studies too. */
export const navItems = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Certificates" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof navItems)[number]["id"];

/** Tracks which homepage section is under the header, for the active pill. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const onScroll = () => {
      // The active section is the last one whose top has passed a line just below the header.
      const line = 120;
      let current: SectionId | null = null;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id as SectionId;
      // Contact is short and sits at the page end: at the very bottom, Contact wins.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "contact";
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);
  return active;
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onProjectPage = pathname.startsWith("/projects");
  const scrolled = useActiveSection(isHome);
  const active: SectionId | null = isHome ? scrolled : onProjectPage ? "projects" : null;

  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Close on Escape (focus back to the button) and on a tap outside the header.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // Close when the route changes (e.g. a menu link to another page).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const pill = (id: SectionId) =>
    active === id
      ? "bg-accent-soft text-accent"
      : "text-ink/80 hover:bg-ink/[0.06] hover:text-ink";

  return (
    <header
      className="sticky top-0 z-40 px-[max(0.625rem,env(safe-area-inset-left))] pt-[max(0.625rem,env(safe-area-inset-top))] sm:px-4"
    >
      <div className="glass relative mx-auto flex h-14 max-w-[75rem] items-center justify-between gap-3 rounded-full pl-4 pr-2 sm:pl-5">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 items-center text-[0.9375rem] font-semibold tracking-tight text-ink sm:text-base"
        >
          {/* Truncates rather than pushing the Menu button off screen when text is enlarged. */}
          <span className="truncate">{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-1 text-[0.9375rem] font-medium">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  aria-current={active === item.id ? (isHome ? "location" : "page") : undefined}
                  className={`inline-flex min-h-10 items-center rounded-full px-4 transition-colors ${pill(item.id)}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {cv.available ? (
            <a
              href={cv.path}
              download
              className="hidden min-h-10 items-center rounded-full bg-accent px-4 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-accent-hover lg:inline-flex"
            >
              {cv.label}
              <span className="sr-only"> (PDF)</span>
            </a>
          ) : null}
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-ink/[0.06] px-4 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-ink/10 lg:hidden"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="m5 5 10 10M15 5 5 15" /> : <path d="M3.5 6.5h13M3.5 13.5h13" />}
            </svg>
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {open ? (
          <div
            ref={panelRef}
            id={panelId}
            className="glass glass-strong menu-panel absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-[1.75rem] p-2 lg:hidden"
          >
            <nav aria-label="Main">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? (isHome ? "location" : "page") : undefined}
                      className={`flex min-h-12 w-full items-center justify-between rounded-2xl px-4 text-[1.0625rem] font-semibold ${
                        active === item.id ? "bg-accent-soft text-accent" : "text-ink hover:bg-ink/[0.05]"
                      }`}
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-muted">›</span>
                    </Link>
                  </li>
                ))}
                {cv.available ? (
                  <li className="mt-1 border-t border-ink/10 pt-2">
                    <a
                      href={cv.path}
                      download
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-accent px-4 text-[1.0625rem] font-semibold text-white"
                    >
                      {cv.label}
                      <span className="sr-only"> (PDF)</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

interface Props {
  items: { href: string; label: string }[];
  email: string;
}

export function MobileMenu({ items, email }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium"
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden="true" className="relative block h-2.5 w-4">
          <span
            className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
          />
          <span
            className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
          />
        </span>
      </button>

      <nav
        id={panelId}
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-line bg-paper px-5 pb-6 pt-2 shadow-lg"
      >
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className="block border-b border-line py-4 text-xl font-semibold"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <a
              href={`mailto:${email}`}
              onClick={close}
              className="inline-flex min-h-12 items-center rounded-full border border-ink/25 bg-white px-5"
            >
              Email {email}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

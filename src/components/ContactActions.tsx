import { cv, profile } from "@/data/profile";

/**
 * Download CV, Call me, Email me and WhatsApp, from the single source in
 * src/data/profile.ts (used by the hero and the Contact section).
 * Phones: a 2 × 2 grid that drops to one column when two 9rem buttons no longer fit
 * (320px screens, or enlarged text). Wider: one row where space allows.
 * Call and WhatsApp render only while profile.phone / profile.whatsapp are set.
 */

type Action = {
  key: string;
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  primary?: boolean;
  download?: boolean;
  external?: boolean;
  /**
   * Accessible name: the visible label and value with one space between them, so the
   * address reads as one unit and the name still matches the visible text (WCAG 2.5.3).
   */
  ariaLabel: string;
};

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const icons = {
  cv: (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-[1.125rem] w-[1.125rem]" {...stroke}>
      <path d="M10 3v9.5m0 0 3.75-3.75M10 12.5 6.25 8.75M4 16.5h12" />
    </svg>
  ),
  call: (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-[1.125rem] w-[1.125rem]" {...stroke}>
      <path d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3.3 11 9 16.7 15.4 17a1.5 1.5 0 0 0 1.6-1.5v-2l-3.5-1.5-1.7 1.7a10 10 0 0 1-4.5-4.5L9 7.5 7.5 4z" />
    </svg>
  ),
  email: (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-[1.125rem] w-[1.125rem]" {...stroke}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="m3 5.5 7 5.5 7-5.5" />
    </svg>
  ),
  whatsapp: (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-[1.125rem] w-[1.125rem]" {...stroke}>
      <path d="M10 3a7 7 0 0 0-6.1 10.4L3 17l3.7-.9A7 7 0 1 0 10 3z" />
      <path
        d="M7.5 8.5c.3 1.6 2.4 3.7 4 4l1-1-1.4-.8-.6.6c-.7-.3-1.5-1.1-1.8-1.8l.6-.6-.8-1.4z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
};

/** Keeps "+971 56" and "914 7945" together, leaving one break opportunity between them. */
function phoneGroups(value: string) {
  const parts = value.split(" ");
  if (parts.length !== 4) return value;
  return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
}

export function contactActions(): Action[] {
  const list: Action[] = [];
  if (cv.available)
    list.push({
      key: "cv",
      label: cv.label,
      value: "PDF",
      href: cv.path,
      icon: icons.cv,
      primary: true,
      download: true,
      ariaLabel: `${cv.label} PDF`,
    });
  if (profile.phone)
    list.push({
      key: "call",
      label: "Call me",
      value: profile.phone.display,
      href: profile.phone.href,
      icon: icons.call,
      ariaLabel: `Call me ${profile.phone.display}`,
    });
  list.push({
    key: "email",
    label: "Email me",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: icons.email,
    ariaLabel: `Email me ${profile.email}`,
  });
  if (profile.whatsapp)
    list.push({
      key: "whatsapp",
      label: "WhatsApp",
      value: profile.phone?.display ?? "Chat",
      href: profile.whatsapp,
      icon: icons.whatsapp,
      external: true,
      ariaLabel: `WhatsApp ${profile.phone?.display ?? "Chat"} (opens in a new tab)`,
    });
  return list;
}

export function ContactActions({
  className = "",
  surface = "page",
  oneRowOnWide = false,
}: {
  className?: string;
  surface?: "page" | "card";
  /** Keep all four on one row from 1280px (the hero column), letting the email break at "@". */
  oneRowOnWide?: boolean;
}) {
  const secondary =
    surface === "card"
      ? "bg-paper text-ink hover:bg-paper-deep"
      : "bg-surface text-ink shadow-[0_0_0_1px_rgb(29_29_31/0.08)] hover:shadow-[0_0_0_1px_rgb(29_29_31/0.2)]";
  return (
    <ul
      className={`grid grid-cols-[repeat(auto-fit,minmax(min(100%,9rem),1fr))] gap-2.5 sm:flex sm:flex-wrap sm:gap-3 ${
        oneRowOnWide ? "xl:flex-nowrap xl:gap-2" : ""
      } ${className}`}
    >
      {contactActions().map((a) => (
        // In the one-row hero, only the email shrinks (it breaks at "@"); the others keep their width.
        <li key={a.key} className={`min-w-0 ${oneRowOnWide && a.key !== "email" ? "xl:shrink-0" : ""}`}>
          <a
            href={a.href}
            {...(a.download ? { download: "" } : {})}
            {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={a.ariaLabel}
            className={`group flex h-full min-h-[3.75rem] items-center gap-2 rounded-2xl px-2.5 py-2.5 transition-[background-color,box-shadow] min-[400px]:gap-2.5 min-[400px]:px-3 sm:gap-3 sm:px-3.5 ${
              a.primary ? "bg-accent text-white hover:bg-accent-hover" : secondary
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full min-[400px]:h-8 min-[400px]:w-8 sm:h-9 sm:w-9 ${
                oneRowOnWide ? "xl:h-8 xl:w-8" : ""
              } ${
                a.primary ? "bg-white/18" : "bg-accent-soft text-accent"
              }`}
            >
              {a.icon}
            </span>
            <span aria-hidden="true" className="min-w-0 leading-tight">
              <span className="block whitespace-nowrap text-[0.9375rem] font-semibold">{a.label}</span>{" "}
              <span
                className={`mt-0.5 block text-[0.8125rem] [overflow-wrap:break-word] ${a.primary ? "text-white" : "text-muted"}`}
              >
                {a.key === "call" || a.key === "whatsapp" ? (
                  // One line from 640px. On phones the number may break once, in the middle
                  // ("+971 56 / 914 7945"), when a narrow column or enlarged text needs it.
                  <span className="[overflow-wrap:normal] sm:whitespace-nowrap">{phoneGroups(a.value)}</span>
                ) : a.key === "email" && a.value.includes("@") ? (
                  <>
                    {a.value.split("@")[0]}
                    <wbr />@{a.value.split("@")[1]}
                  </>
                ) : (
                  a.value
                )}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

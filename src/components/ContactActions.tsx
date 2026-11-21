import { cv, profile } from "@/data/profile";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-5 py-3 text-[0.9375rem] font-medium transition-colors";

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 3v10m0 0 4-4m-4 4-4-4M4 16h12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3.3 11 9 16.7 15.4 17a1.5 1.5 0 0 0 1.6-1.5v-2l-3.5-1.5-1.7 1.7a10 10 0 0 1-4.5-4.5L9 7.5 7.5 4z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M10 3a7 7 0 0 0-6.1 10.4L3 17l3.7-.9A7 7 0 1 0 10 3z"
        strokeLinejoin="round"
      />
      <path d="M7.5 8.5c.3 1.6 2.4 3.7 4 4l1-1-1.4-.8-.6.6c-.7-.3-1.5-1.1-1.8-1.8l.6-.6-.8-1.4z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="m3 5.5 7 5.5 7-5.5" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Download CV (primary), Call me, Email me and WhatsApp. The call and WhatsApp
 * actions render only while profile.phone / profile.whatsapp are set.
 * On phones the buttons stack full width; from 640px they flow in a row.
 */
export function ContactActions({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  const primary = dark ? "bg-paper text-ink hover:bg-accent hover:text-paper" : "bg-accent text-white hover:bg-ink";
  const secondary = dark
    ? "border border-paper/40 text-paper hover:border-paper hover:bg-paper/10"
    : "border border-ink/25 bg-white text-ink hover:border-ink";
  return (
    <ul className={`flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3 ${className}`}>
      {cv.available ? (
        <li>
          <a href={cv.path} download className={`${base} ${primary} w-full sm:w-auto`}>
            <DownloadIcon />
            {cv.label}
            <span className="sr-only"> (PDF)</span>
          </a>
        </li>
      ) : null}
      {profile.phone ? (
        <li>
          <a href={profile.phone.href} className={`${base} ${secondary} w-full sm:w-auto`}>
            <PhoneIcon />
            <span>
              Call me <span className="font-normal opacity-75">· {profile.phone.display}</span>
            </span>
          </a>
        </li>
      ) : null}
      <li>
        <a href={`mailto:${profile.email}`} className={`${base} ${secondary} w-full sm:w-auto`}>
          <MailIcon />
          <span className="min-w-0 break-all sm:break-normal">
            Email me <span className="font-normal opacity-75">· {profile.email}</span>
          </span>
        </a>
      </li>
      {profile.whatsapp ? (
        <li>
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`${base} ${secondary} w-full sm:w-auto`}
          >
            <ChatIcon />
            WhatsApp
            <span className="sr-only"> {profile.phone?.display} (opens WhatsApp in a new tab)</span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}

export type LinkKind =
  | "website"
  | "app-store"
  | "google-play"
  | "archive"
  | "company"
  | "reference";

export interface ExternalLink {
  label: string;
  href: string;
  kind: LinkKind;
  /** Short qualifier shown next to the link, e.g. "Product link" or "Archived listing". */
  note?: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Explains what the screen demonstrates. Shown under gallery images. */
  caption: string;
  /** "phone" renders in a phone frame, "desktop" in a browser frame. */
  kind: "phone" | "desktop";
  /** Where the image came from. Every entry is also listed in IMAGE-SOURCES.md. */
  source: string;
}

export interface Logo {
  src: string;
  /** Logos are decorative next to a visible name, so alt is usually empty. */
  alt: string;
  width: number;
  height: number;
  /** Where the mark came from. Also listed in IMAGE-SOURCES.md. */
  source: string;
}

export interface CaseStudySection {
  heading: string;
  body?: string[];
  bullets?: string[];
  /** Optional ordered flow, rendered as numbered steps. */
  steps?: { title: string; detail: string }[];
}

export interface CaseStudy {
  /** What the product does. */
  product: string[];
  responsibilities: string[];
  built: CaseStudySection[];
  outcome: string[];
}

export interface Project {
  slug: string;
  name: string;
  client?: string;
  /** Whether `client` was my employer or a client I delivered for. */
  engagement?: "Employer" | "Client";
  summary: string;
  /** One line describing my role, shown on cards. */
  role: string;
  /** Short "what I personally did" paragraph for the homepage feature. */
  contribution?: string;
  /** Up to three key points for the homepage feature. */
  highlights?: string[];
  logo?: Logo;
  sector: string;
  platforms: string[];
  tech: string[];
  links: ExternalLink[];
  featured?: boolean;
  /** Present for projects with a dedicated case-study page. */
  caseStudy?: CaseStudy;
  /** First entry is the lead image. Only genuine product screens. */
  screenshots?: Screenshot[];
}

export interface ProjectGroup {
  id: string;
  title: string;
  intro: string;
  items: {
    name: string;
    description: string;
    contribution: string;
    links?: ExternalLink[];
  }[];
}

export interface ExperienceItem {
  organisation: string;
  /** Employment or freelance/contract work. Client projects are listed separately. */
  kind: "Employer" | "Freelance";
  logo?: Logo;
  /** Client products delivered while in this role, labelled as client work. */
  clientProjects?: { name: string; slug?: string; logo?: Logo }[];
  role: string;
  /** Dates come from the CV. Left undefined until the CV is supplied. */
  period?: string;
  location?: string;
  summary: string;
  highlights: string[];
  projectSlugs?: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

/** An entry in the "Companies & projects" strip below the hero. */
export interface Company {
  name: string;
  /** How I worked with them, shown under the name. */
  relation: string;
  logo?: Logo;
  /** Case-study slug, when one exists. */
  slug?: string;
}

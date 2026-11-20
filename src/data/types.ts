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
  summary: string;
  /** One line describing my role, shown on cards. */
  role: string;
  sector: string;
  platforms: string[];
  tech: string[];
  links: ExternalLink[];
  featured?: boolean;
  /** Present for projects with a dedicated case-study page. */
  caseStudy?: CaseStudy;
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

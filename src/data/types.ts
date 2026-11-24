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
  /** "phone" renders in a phone frame, "desktop" in a browser frame, "document" as a paper scan. */
  kind: "phone" | "desktop" | "document";
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
  /** Search and social metadata for the case study page. */
  seo: {
    /** Full <title>, e.g. "Life Pharmacy iOS & SwiftUI Case Study | Khadim Hussain". */
    title: string;
    /** Meta description, about 150-160 characters. */
    description: string;
    /** Case-study H1: what the product is and what I did. */
    heading: string;
    /** Describes what the social preview image shows. */
    ogAlt: string;
    /** 1200x630 social preview built from real screenshots and logos. */
    ogImage: string;
  };
  /** Short screen-recording showcase. Real app footage, private details removed. */
  video?: {
    src: string;
    poster: string;
    width: number;
    height: number;
    /** Describes what the video shows, for captions and the accessible label. */
    caption: string;
    source: string;
  };
  /** Real product brand colours for the project card's image panel. */
  brand?: {
    /** Panel colour behind the screenshots. */
    panel: string;
    /** Darker shade for the gradient and any white text (passes WCAG AA). */
    deep: string;
  };
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
  /** Employment, freelance/contract work, my own studio, or a client engagement. Client projects are listed separately. */
  kind: "Employer" | "Freelance" | "Founder" | "Client";
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
  /** External site for the organisation, shown as a link on the card. */
  website?: { label: string; href: string };
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

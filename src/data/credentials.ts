/**
 * Certificates, experience letters and qualifications, shown on the homepage.
 * Scans are Khadim's own documents. Passport number, nationality, registration,
 * serial, document and verification numbers, QR codes and barcodes are redacted
 * before publishing. Every file is listed in IMAGE-SOURCES.md.
 *
 * The featured entry (the UAE Certificate of Recognition) is shown first as a
 * large card. The rest follow: degree, then employer documents newest first.
 */
export interface Credential {
  /** Visible document name. */
  title: string;
  /** Who issued it. */
  issuer: string;
  /** Date or period shown under the title. */
  date: string;
  /** One line on what the document confirms. */
  summary: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Where the scan came from and what was redacted. */
  source: string;
  featured?: boolean;
}

export const credentials: Credential[] = [
  {
    title: "UAE Certificate of Recognition",
    issuer: "UAE Ministry of Higher Education and Scientific Research",
    date: "Issued 7 Sep 2026",
    summary:
      "Academic Qualification Recognition Report: my Bachelor of Science in Computer Science from the University of Lahore is officially recognised in the UAE. Authenticity: Genuine. Decision: Recognized.",
    src: "/images/credentials/uae-qualification-recognition.webp",
    alt: "UAE Ministry of Higher Education and Scientific Research Academic Qualification Recognition Report for Khadim Hussain: Bachelor of Science in Computer Science, University of Lahore, authenticity Genuine, recognition decision Recognized",
    width: 1600,
    height: 2263,
    source: "Khadim's own MOHESR report (Certificate_of_Recognition.pdf); document, verification and sequence numbers, QR code and barcode redacted",
    featured: true,
  },
  {
    title: "Bachelor of Science in Computer Science",
    issuer: "The University of Lahore",
    date: "Conferred 17 Jul 2018",
    summary: "Degree certificate, Faculty of Information Technology.",
    src: "/images/credentials/bs-computer-science-degree.webp",
    alt: "University of Lahore degree certificate awarding Khadim Hussain the Bachelor of Science in Computer Science, conferred 17 July 2018",
    width: 1240,
    height: 1736,
    source: "Khadim's own degree scan (Degree.pdf); registration and serial numbers redacted",
  },
  {
    title: "Experience Certificate: iOS Developer",
    issuer: "Life Pharmacy LLC, Dubai",
    date: "Nov 2021 – Jun 2026",
    summary: "Confirms my employment as iOS Developer from 9 Nov 2021 to 19 Jun 2026.",
    src: "/images/credentials/life-pharmacy-experience-letter.webp",
    alt: "Life Pharmacy experience certificate confirming Khadim Hussain worked as iOS Developer from 9 November 2021 to 19 June 2026",
    width: 1600,
    height: 2308,
    source: "Khadim's own letter scan; nationality and passport number redacted",
  },
  {
    title: "Superstar Award",
    issuer: "Life Pharmacy",
    date: "8 Nov 2022",
    summary: "Congratulations certificate signed by the Managing Director and Chairman.",
    src: "/images/credentials/life-pharmacy-superstar-award.webp",
    alt: "Life Pharmacy Superstar certificate of congratulations for Khadim Hussain, 8 November 2022, signed by the Managing Director and Chairman",
    width: 1600,
    height: 1180,
    source: "Khadim's own photo of the certificate",
  },
  {
    title: "Certificate of Experience: iOS Team Lead",
    issuer: "Newsreels",
    date: "Oct 2018 – Nov 2021",
    summary: "Confirms 3 years, 1 month as iOS Team Lead (1 Oct 2018 – 7 Nov 2021).",
    src: "/images/credentials/newsreels-experience-certificate.webp",
    alt: "Newsreels certificate of experience for Khadim Hussain as iOS Team Lead, 1 October 2018 to 7 November 2021",
    width: 1241,
    height: 1754,
    source: "Khadim's own certificate scan",
  },
  {
    title: "Certificate of Experience: iOS Developer",
    issuer: "Solotech Labs, with Soloinsight Inc.",
    date: "Oct 2016 – Sep 2018",
    summary: "Confirms 1 year, 11 months as iOS Developer (5 Oct 2016 – 7 Sep 2018).",
    src: "/images/credentials/soloinsight-experience-certificate.webp",
    alt: "Solotech Labs, in association with Soloinsight Inc., certificate of experience for Khadim Hussain as iOS Developer, 5 October 2016 to 7 September 2018",
    width: 708,
    height: 1024,
    source: "Khadim's own certificate scan",
  },
];

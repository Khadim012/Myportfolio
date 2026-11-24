import type { Screenshot } from "./types";

/**
 * Certificates, experience letters and qualifications, shown on the homepage.
 * Scans are Khadim's own documents. Passport number, nationality, registration,
 * serial, document and verification numbers, QR codes and barcodes are redacted
 * before publishing. Every file is listed in IMAGE-SOURCES.md.
 *
 * Order: degree and its UAE recognition, then employer documents newest first.
 */
export const credentials: Screenshot[] = [
  {
    src: "/images/credentials/bs-computer-science-degree.webp",
    alt: "University of Lahore degree certificate awarding Khadim Hussain the Bachelor of Science in Computer Science, conferred 17 July 2018",
    width: 1100,
    height: 1540,
    caption: "BS Computer Science, University of Lahore (2018)",
    kind: "document",
    source: "Khadim's own degree scan (Degree.pdf); registration and serial numbers redacted",
  },
  {
    src: "/images/credentials/uae-qualification-recognition.webp",
    alt: "UAE Ministry of Higher Education and Scientific Research Academic Qualification Recognition Report: Bachelor of Science in Computer Science, University of Lahore, recognition decision Recognized",
    width: 1100,
    height: 1556,
    caption: "Degree recognised by the UAE Ministry of Higher Education and Scientific Research (2026)",
    kind: "document",
    source: "Khadim's own MOHESR report (Certificate_of_Recognition.pdf); document, verification and sequence numbers, QR code and barcode redacted",
  },
  {
    src: "/images/credentials/life-pharmacy-experience-letter.webp",
    alt: "Life Pharmacy experience certificate confirming Khadim Hussain worked as iOS Developer from 9 November 2021 to 19 June 2026",
    width: 1100,
    height: 1586,
    caption: "Life Pharmacy experience letter, iOS Developer (Nov 2021 – Jun 2026)",
    kind: "document",
    source: "Khadim's own letter scan; nationality and passport number redacted",
  },
  {
    src: "/images/credentials/life-pharmacy-superstar-award.webp",
    alt: "Life Pharmacy Superstar certificate of congratulations for Khadim Hussain, 8 November 2022, signed by the Managing Director and Chairman",
    width: 1400,
    height: 1032,
    caption: "Life Pharmacy Superstar award (Nov 2022)",
    kind: "document",
    source: "Khadim's own photo of the certificate",
  },
  {
    src: "/images/credentials/newsreels-experience-certificate.webp",
    alt: "Newsreels certificate of experience for Khadim Hussain as iOS Team Lead, 1 October 2018 to 7 November 2021",
    width: 1000,
    height: 1413,
    caption: "Newsreels experience certificate, iOS Team Lead (Oct 2018 – Nov 2021)",
    kind: "document",
    source: "Khadim's own certificate scan",
  },
  {
    src: "/images/credentials/soloinsight-experience-certificate.webp",
    alt: "Solotech Labs, in association with Soloinsight Inc., certificate of experience for Khadim Hussain as iOS Developer, 5 October 2016 to 7 September 2018",
    width: 708,
    height: 1024,
    caption: "Soloinsight (Solotech Labs) experience certificate, iOS Developer (Oct 2016 – Sep 2018)",
    kind: "document",
    source: "Khadim's own certificate scan",
  },
];

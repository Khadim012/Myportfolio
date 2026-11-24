# Image sources

Every product image and logo on the site, where it came from, and when.
All images were captured on 21 Nov 2026 and saved locally as optimised WebP (or SVG).
Only genuine product screens are used. Nothing here shows private customer data,
internal dashboards, credentials or test accounts.

Each screenshot entry in `src/data/projects.ts` also carries a `source` field.

## Product screenshots

| File | What it shows | Source |
| --- | --- | --- |
| `public/images/life-pharmacy/home.webp` | iOS home screen: search, quick actions, offers | Khadim's own iPhone screenshot of the live app (IMG_0941), delivery address blurred |
| `public/images/life-pharmacy/click-and-collect-app.webp` | Click & Collect sheet with pickup prices | Khadim's own iPhone screenshot of the live app (IMG_0943), delivery address blurred |
| `public/images/life-pharmacy/features.webp` | Service hub: doctor booking, medicines, prescription upload, Click & Collect, rental | App Store listing id1450835575, screenshot 2 |
| `public/images/life-pharmacy/medical-rental.webp` | Life Rental: equipment and rental dates | App Store listing id1450835575, screenshot 6 |
| `public/images/zushh/services.webp` | Services catalogue | Google Play listing com.zush.app, screenshot 3 |
| `public/images/zushh/booking.webp` | AC Service booking: location, address, property type, schedule | App Store listing id6758752792, "Service Booking" |
| `public/images/zushh/home.webp` | Home: address, search, categories | App Store listing id6758752792, "Home Page" |
| `public/images/zushh/website.webp` | zushh.com homepage, desktop 1440 px | Live site https://zushh.com/ |
| `public/images/nordic-home-healthcare/website.webp` | nordichc.com homepage, desktop 1440 px (cookie banner declined) | Live site https://nordichc.com/ |
| `public/images/nordic-home-healthcare/home.webp` | App home | Google Play listing com.nordichc.ae, screenshot 1 |
| `public/images/nordic-home-healthcare/services.webp` | Services list | Google Play listing com.nordichc.ae, screenshot 2 |
| `public/images/nordic-home-healthcare/blood-test.webp` | Blood test at home | Google Play listing com.nordichc.ae, screenshot 3 |
| `public/images/nordic-home-healthcare/iv-therapy.webp` | IV therapy at home | Google Play listing com.nordichc.ae, screenshot 4 |

Deliberately not used:

- LIFE Pharmacy store images 1 and 3: they carry marketing claims (download counts, "UAE's #1
  Pharmacy", delivery-time claims) that this site does not make.
- ZUSHH "Profile" store image: it shows a real person's name and email address.

## Certificates and credentials

Khadim's own documents, supplied by him on 24 Nov 2026, shown in the homepage
"Certificates & credentials" section (`src/data/credentials.ts`), exported up to 1600 px wide for the full view. Personal identifiers
are covered with solid "Redacted" boxes before export; the originals are not in the repo.
The CV and cover letter he supplied are not published (they contain his phone number).

| File | What it shows | Source and redactions |
| --- | --- | --- |
| `public/images/credentials/bs-computer-science-degree.webp` | University of Lahore BSCS degree, conferred 17 Jul 2018 | Degree.pdf scan; registration number and serial number redacted |
| `public/images/credentials/uae-qualification-recognition.webp` | UAE MOHESR Academic Qualification Recognition Report, "Recognized" | Certificate_of_Recognition.pdf rendered at 200 dpi; document, verification and sequence numbers, QR code and barcode redacted |
| `public/images/credentials/life-pharmacy-experience-letter.webp` | Life Pharmacy experience certificate, iOS Developer, 9 Nov 2021 – 19 Jun 2026 | Photo of the letter; nationality and passport number redacted |
| `public/images/credentials/life-pharmacy-superstar-award.webp` | Life Pharmacy "Superstar" congratulations certificate, 8 Nov 2022 | Photo of the certificate; nothing redacted |
| `public/images/credentials/newsreels-experience-certificate.webp` | Newsreels certificate of experience, iOS Team Lead, 1 Oct 2018 – 7 Nov 2021 | Scan; nothing redacted |
| `public/images/credentials/soloinsight-experience-certificate.webp` | Solotech Labs / Soloinsight Inc. certificate of experience, iOS Developer, 5 Oct 2016 – 7 Sep 2018 | Scan; nothing redacted |

## ZIRO campaign artwork

| File | What it shows | Source |
| --- | --- | --- |
| `public/images/ziro/tree-trips.webp` | ZIRO "Tree Trips" campaign artwork: "Take rides, we'll plant trees" | Marketing artwork (lock3.png) supplied by Khadim on 24 Nov 2026. App Store / Google Play badges, both QR codes and the store footnote removed (the store listings are not confirmed to load), headline re-centred, cropped to 1024×480. This is marketing art, not a product screen, and is labelled as such on the page. |

## Video

| File | What it shows | Source |
| --- | --- | --- |
| `public/videos/life-pharmacy-ios.mp4` (720×900, 30 s, H.264, no audio) and poster `public/images/life-pharmacy/showcase-poster.webp` | LIFE Pharmacy iOS app: home offers, categories, prescription upload, cart, checkout and payment options | Khadim's own screen recording of the live app (ScreenRecording_11-21-2026_06-54-03), edited into a framed showcase with title, captions and crossfades |

Privacy edits in the video: the delivery address in the home header is blurred (first 7.8 s of source);
the profile screen (name, email, phone, photo) and the cart and checkout moments that show the delivery
address are cut. The 1080×1350 master and the build script live outside the repo.

## Illustration

| File | What it shows | Source |
| --- | --- | --- |
| `public/images/ai/workspace.webp` | Illustration of an AI-assisted iOS workflow: an editor with a generic SwiftUI example written for the image, an assistant pane, and the iOS Simulator showing the public Life Pharmacy home screen | Rendered by `scripts/make-images.mjs`; labelled "Illustration" on the image and in its caption. Not real project code. |

## Social preview images

`public/og.png` and `public/og/*.png` (1200×630) are rendered by `npm run images` from the screenshots
and logos listed here. `-320.webp` and `-480.webp` files beside each image are smaller copies made by
`scripts/make-variants.mjs` for phones.

## Logos and marks

| File | Source |
| --- | --- |
| `public/images/logos/life-pharmacy.webp` | LIFE Pharmacy app icon, App Store listing id1450835575 |
| `public/images/logos/zushh.webp` | ZUSHH app icon, App Store listing id6758752792 |
| `public/images/logos/nordic-home-healthcare.webp` | Nordic HC UAE app icon, Google Play listing com.nordichc.ae (same mark as the nordichc.com header logo) |
| `public/images/logos/newsreels.webp` | Newsreels company logo, https://www.linkedin.com/company/newsreels/ |
| `public/images/logos/ziro.webp` | ZIRO app icon (ItunesArtwork@2x), supplied by Khadim on 24 Nov 2026 |
| `public/images/logos/soloinsight.svg` | Emblem from the header logo SVG on https://www.soloinsight.com/, viewBox cropped to the circular mark |

App icons were masked to the standard rounded square so every mark has the same footprint.

## Still wanted from Khadim

- More LIFE Pharmacy screenshots without the touch indicator (product details, loyalty), if you'd like
  to replace the two App Store artwork images in the gallery.
- Raw ZUSHH and Nordic screenshots from your devices or simulators, if you'd like cleaner,
  untilted shots than the store artwork.
- ZIRO Rider / ZIRO Captain app screens, if you still have them (the icon and campaign artwork are in).

import { segments } from "@/data/pricing";

export type SegmentKey = keyof typeof segments;
/** Real client work only. `href` opens an external client site in a new tab; `link` is an internal case study. */
export type ProofItem = { name: string; description: string; image: string; alt: string; link?: string; href?: string };
export type SegmentPage = { supporting: string; metaCategory: string; proof: ProofItem[]; faqs: { question: string; answer: string }[] };

const tierFaq = { question: "Which tier should I choose?", answer: "Most businesses in your sector choose the recommended tier above. If you are unsure, book a free call and I will recommend one in writing with a fixed quote." };
const startFaq = { question: "When does the launch timeline begin?", answer: "It starts from a complete intake. I confirm the scope and launch date in writing; missing photos, content or approvals can move that date." };

export const segmentPages: Record<SegmentKey, SegmentPage> = {
  kitchens: {
    supporting: "I turn your finished projects into a clear, photo-led website that brings quote enquiries straight to you.",
    metaCategory: "Kitchen and joinery websites",
    proof: [
      { name: "Nicholas Moody Kitchens", description: "A website for a bespoke kitchen design studio.", image: "/images/work/nicholas-moody-kitchens.png", alt: "Nicholas Moody Kitchens website" },
      { name: "Savvy Kitchens", description: "A contemporary kitchen design and project showcase.", image: "/images/work/savvy-kitchens.png", alt: "Savvy Kitchens website" },
      { name: "Appliance Showcase", description: "An appliance range showcase for a kitchen retailer.", image: "/images/work/appliance-showcase.png", alt: "Appliance Showcase website", href: "https://appliances.savvykitchens.ie/" },
      { name: "KBB Digital", description: "A website for a kitchen, bedroom and bathroom digital agency.", image: "/images/work/kbb-digital.png", alt: "KBB Digital website" },
    ],
    faqs: [
      tierFaq,
      { question: "Do I need professional photos?", answer: "Good phone photos of finished projects work well. If you need more, add an extra page or ask for a quote that includes a photo shoot." },
      { question: "Who writes the website copy?", answer: "You can supply it, or add copywriting per page and I will write it from a short questionnaire and your project notes." },
      { question: "Where do quote requests go?", answer: "Every tier includes contact or quote forms sent to your email. Add the CRM starter to track every enquiry in one place." },
      startFaq,
    ],
  },
  clinics: {
    supporting: "I build a clear practice website around your own booking system, with practice sign-off and non-clinical boundaries built into the scope.",
    metaCategory: "Practice websites and booking",
    proof: [
      { name: "Ease Dental", description: "A website for a Dublin dental clinic.", image: "/images/work/ease-dental.png", alt: "Ease Dental website" },
      { name: "Glimmers mental-health practice forms", description: "Website and enquiry-form work for a mental-health practice.", image: "/images/work/glimmers-mhs.png", alt: "Glimmers mental-health practice website" },
    ],
    faqs: [
      tierFaq,
      { question: "Do I need to change my booking software?", answer: "No. I link to or embed your own booking system, within what it supports. The online booking add-on covers the setup." },
      { question: "Will you handle clinical intake data?", answer: "Intake stays on your own GDPR-compliant tool. I never act as processor for clinical intake without a data-processing agreement." },
      { question: "Can an AI assistant answer clinical questions?", answer: "No. Any assistant is non-clinical, tells patients it is an AI, and stays within practice-approved administrative FAQs." },
      { question: "Who approves the content and review responses?", answer: "The practice signs off content written to Dental Council / CORU advertising guidance. I provide review-response guidance, not ghost-written replies." },
    ],
  },
  salons: {
    supporting: "I connect your service menu, Google profile and booking links so clients can find the right appointment without another message to you.",
    metaCategory: "Salon websites and booking",
    proof: [{ name: "Therapie booking app", description: "Booking and digital product design for Therapie Clinic.", image: "/images/work/therapie-pill.webp", alt: "Therapie booking app screens", link: "/case/booking-app" }],
    faqs: [
      tierFaq,
      { question: "Do I have to change my booking system?", answer: "No. Launch adds a Book button into your own booking system. If you are moving systems, the online booking add-on covers setting up the new one." },
      { question: "Who pays for the booking software?", answer: "You hold your own account and the provider bills its licences or platform fees directly to you. My price covers the setup work listed." },
      { question: "Can you help keep Instagram active?", answer: "The Growth care plan for salons includes four Instagram posts a month from your photos. You supply the photos and approve the content." },
      startFaq,
    ],
  },
  tours: {
    supporting: "I make your booking journey clearer and connect reviews and tipping around the experience, using software accounts you own.",
    metaCategory: "Tour websites and direct booking",
    proof: [
      { name: "TripAdmit white-label booking", description: "White-label tour and activity booking product design.", image: "/images/work/wl-design-overview.webp", alt: "TripAdmit white-label booking interface", link: "/case/whitelabel" },
      { name: "TipDirect tipping", description: "Digital tipping flows for guides and tour experiences.", image: "/images/work/tipping-tools.webp", alt: "TipDirect digital tipping tools", link: "/case/digital-tipping" },
    ],
    faqs: [
      tierFaq,
      { question: "Do I need a new booking engine?", answer: "Not necessarily. I check your current setup first. Business Plus includes embedding your own booking engine in your site." },
      { question: "Who pays the booking-engine fees?", answer: "The provider bills you directly. My price is for the setup and integration scope, not a resale of its licences." },
      { question: "Can you guarantee more bookings?", answer: "No. I can improve the journey and measure how it performs, but demand, traffic, availability and pricing also affect bookings." },
      startFaq,
    ],
  },
};

export const legacySegmentRedirects: Record<string, string> = {
  "beauty-wellness": "/services/salons-barbers",
  "food-hospitality": "/services/web-design",
  "startup-bootstrap": "/services/product-studio",
  startup: "/services/product-studio",
  "trades-home": "/services/web-design",
  "restaurants-cafes": "/services/web-design",
};
export const getSegmentKey = (slug: string | undefined): SegmentKey | undefined =>
  (Object.keys(segments) as SegmentKey[]).find((key) => segments[key].slug === slug);

export const grantNote = "Some digital tools and services may qualify for the LEO Grow Digital Voucher (bespoke websites and software are excluded). You need at least one paid employee and must complete LEO Digital for Business first, then get approval before any spend. I'll provide a quote in the format your LEO needs.";
export const clinicCompliance = [
  "Data hosted in the EU",
  "A data-processing agreement is available — I never act as processor for clinical intake without one",
  "Content written to Dental Council / CORU advertising guidance and signed off by the practice",
  "Any AI assistant is non-clinical and tells patients it is an AI",
  "Reviews get response guidance, not ghost-written replies",
];
export const RESERVED_SERVICE_PATHS = ["product-studio", "web-design", "start-project", "get-started", "terms", "refer", "tools", "expertise", "insights"] as const;

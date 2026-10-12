import dcKitchen from "@/assets/images/showcase/dc-woodworks-contemporary.jpg";
import { lowestCorePackage, segments, type Pkg } from "@/data/pricing";

export type SegmentKey = keyof typeof segments;
export type ProofItem = { name: string; description: string; image: string; alt: string; link?: string };
export type SegmentPage = { supporting: string; metaCategory: string; proof: ProofItem[]; faqs: { question: string; answer: string }[] };

const dcProof: ProofItem = { name: "DC Wood Creations", description: "A bespoke joinery showcase with project photography and clear enquiry paths.", image: dcKitchen, alt: "DC Wood Creations contemporary kitchen" };

export const segmentPages: Record<SegmentKey, SegmentPage> = {
  kitchens: {
    supporting: "I turn your finished projects into a clear, photo-led website that brings quote enquiries straight to you.",
    metaCategory: "Kitchen and joinery websites",
    proof: [dcProof,
      { name: "Nicholas Moody Kitchens", description: "A website for a bespoke kitchen design studio.", image: "/images/work/nicholas-moody-kitchens.png", alt: "Nicholas Moody Kitchens website" },
      { name: "Savvy Kitchens", description: "A contemporary kitchen design and project showcase.", image: "/images/work/savvy-kitchens.png", alt: "Savvy Kitchens website" },
    ],
    faqs: [
      { question: "Do I need photos?", answer: "I visit once to collect them; Showroom includes a professional shoot." },
      { question: "Who writes the website copy?", answer: "I write Joinery Pro copy from the site visit, using your project notes and the details customers need before requesting a quote." },
      { question: "Where do quote requests go?", answer: "Joinery Pro sends requests to WhatsApp and email. Showroom includes lead capture into a light CRM." },
      { question: "When does the launch timeline begin?", answer: "It starts from a complete intake and the required site visit. I confirm the scope and launch date in writing; missing photos or approvals can move that date." },
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
      { question: "Do I need to change my booking software?", answer: "No. I link to or embed your own booking system (e.g. Cliniko, Calendly, Fresha, Jane), within what it supports." },
      { question: "Will you handle clinical intake data?", answer: "Intake stays on your own GDPR-compliant tool. I never act as processor for clinical intake without a data-processing agreement." },
      { question: "Can an AI assistant answer clinical questions?", answer: "No. Any assistant is non-clinical, tells patients it is an AI, and stays within practice-approved administrative FAQs." },
      { question: "Who approves the content and review responses?", answer: "The practice signs off content written to Dental Council / CORU advertising guidance. I provide review-response guidance, not ghost-written replies." },
    ],
  },
  trades: {
    supporting: "I build a practical site that shows your home-improvement work and makes it easy for local customers to request a quote.",
    metaCategory: "Trade websites and quote forms",
    proof: [{ ...dcProof, description: "Home-improvement proof: a bespoke joinery showcase built around finished projects and enquiries." }],
    faqs: [
      { question: "What do I need for Trade Launch?", answer: "A complete intake with your business details, service area, contact details and gallery photos. I confirm the launch date once those are ready." },
      { question: "Can enquiries go straight to my phone?", answer: "Trade Launch includes a quote form to WhatsApp or email, so enquiries reach the channel you actually use." },
      { question: "Do I need to write the copy?", answer: "Trade Site includes copy from a short questionnaire. I use your answers to describe the work and areas you cover." },
      { question: "Is hosting included?", answer: "Trade Launch includes the first-year domain and hosting. Ongoing care is a separate plan with the minimum term shown below." },
    ],
  },
  salons: {
    supporting: "I connect your service menu, Google profile and booking links so clients can find the right appointment without another message to you.",
    metaCategory: "Salon websites and booking",
    proof: [{ name: "Therapie booking app", description: "Booking and digital product design for Therapie Clinic.", image: "/images/work/therapie-pill.webp", alt: "Therapie booking app screens", link: "/case/booking-app" }],
    faqs: [
      { question: "Do I have to leave Fresha?", answer: "No — Booking Fix works with Fresha, Phorest or Booksy." },
      { question: "What if I am moving from another system or paper?", answer: "Switch & Save covers setup in your chosen system, importing your client list, deposit and no-show rules, and remote training. The package scope sets the service and staff limits." },
      { question: "Who pays for the booking software?", answer: "You hold your own account and the provider bills its licences or platform fees directly to you. My package covers the setup work listed." },
      { question: "Can you help keep Instagram active?", answer: "The Growth module for salons is four Instagram posts a month from your photos. You supply the photos and approve the content." },
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
      { question: "Do I need a new booking engine?", answer: "Not necessarily. I check your current setup first. Direct Booking sets up your own supported booking-engine account and embeds it in your site." },
      { question: "Who pays the booking-engine fees?", answer: "The provider bills you directly. My package is for the setup and integration scope, not a resale of its licences." },
      { question: "What does Conversion Revamp focus on?", answer: "It starts with a UX audit of your booking funnel, then redesigns the agreed pages and connects booking, reviews and tipping." },
      { question: "Can you guarantee more bookings?", answer: "No. I can improve the journey and measure how it performs, but demand, traffic, availability and pricing also affect bookings." },
    ],
  },
  food: {
    supporting: "I make your menu and order links easy to find, and set up direct ordering or tune delivery listings once the platform has approved you.",
    metaCategory: "Restaurant websites and delivery listing tune-ups",
    proof: [{ name: "TipDirect AI-assisted reviews", description: "AI-assisted review tools within the TipDirect product.", image: "/images/work/ai-pill.webp", alt: "TipDirect AI-assisted review tools", link: "/case/ai-reviews" }],
    faqs: [
      { question: "Can you register me on Deliveroo?", answer: "Uber Eats, Deliveroo and Just Eat run their own sign-up and charge their own joining or activation fees; I don't resell registration — I tune your listing once you're approved." },
      { question: "Do I own the direct-ordering account?", answer: "Yes. Order Direct uses your own Flipdish account. Flipdish bills its own fee, and card costs are separate from my setup." },
      { question: "Is the payback example guaranteed?", answer: "No. It is an illustration based on shifting part of existing app orders to direct ordering. Your commission, card costs, plan and customer behaviour determine the actual result." },
      { question: "What do you need for the menu page?", answer: "Your complete menu, current prices, business details, photos and approved order links. Menu & Google Kit includes the item limit shown in the package." },
    ],
  },
};

export const legacySegmentRedirects: Record<string, string> = {
  "beauty-wellness": "/services/salons-barbers",
  "food-hospitality": "/services/restaurants-cafes",
  "startup-bootstrap": "/services/product-studio",
  startup: "/services/product-studio",
};
export const getSegmentKey = (slug: string | undefined): SegmentKey | undefined =>
  (Object.keys(segments) as SegmentKey[]).find((key) => segments[key].slug === slug);
export const lowestPackage = (packages: Pkg[]): Pkg | undefined => lowestCorePackage(packages);

export const grantNote = "Some digital tools and services may qualify for the LEO Grow Digital Voucher (bespoke websites and software are excluded). You need at least one paid employee and must complete LEO Digital for Business first, then get approval before any spend. I'll provide a quote in the format your LEO needs.";
export const clinicCompliance = [
  "Data hosted in the EU",
  "A data-processing agreement is available — I never act as processor for clinical intake without one",
  "Content written to Dental Council / CORU advertising guidance and signed off by the practice",
  "Any AI assistant is non-clinical and tells patients it is an AI",
  "Reviews get response guidance, not ghost-written replies",
];
export const RESERVED_SERVICE_PATHS = ["product-studio", "web-design", "start-project", "get-started", "terms", "refer", "tools", "expertise", "insights"] as const;

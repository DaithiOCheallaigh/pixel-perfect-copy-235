export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  timeline: string;
  pillImage: string;
  headerImage: string;
  liveLink?: string;
  description: string;
  challenge?: string;
  stats?: { value: string; label: string }[];
  quote?: { text: string; author: string };
  images?: { src: string; alt: string; wide?: boolean }[];
  whatIWorkedOn?: string[];
  nextProject?: string;
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    id: "ai-reviews",
    title: "AI Assisted Reviews",
    subtitle: "Leveraging AI to transform guest feedback into 5-star reviews",
    tags: ["UI/UX", "Project Planning", "Interaction Design", "Analytics"],
    timeline: "3 months",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/AIPill-2.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/AI_Header-1.webp?fit=4107%2C2089&ssl=1",
    liveLink: "https://tip.direct/platform-admin/",
    description: "Tour operators consistently struggle to capture timely reviews from guests immediately after their experiences. This challenge persists even when guests have thoroughly enjoyed their tours, creating a significant disconnect between customer satisfaction and documented feedback.",
    challenge: "Tour operators consistently struggle to capture timely reviews from guests immediately after their experiences. This challenge persists even when guests have thoroughly enjoyed their tours.",
    stats: [
      { value: "26%", label: "of tipping guests left a positive review" },
      { value: "96%", label: "of guests left a 5-star review" },
      { value: "45%", label: "avg increase in 5-star reviews per company" },
    ],
    quote: {
      text: "Leveraging the power of AI & expanding our product to attract a new type of user could only have been possible with Dave on our team",
      author: "Andrew Kelly, CTO TipDirect",
    },
    whatIWorkedOn: ["UI Design", "UX Strategy", "User Interviews", "Marketing", "Growth Strategy", "Feature Analysis"],
    images: [
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/MobileAI.webp?fit=800%2C764&ssl=1", alt: "Mobile AI interface" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/AIReview_Steps.webp?fit=4500%2C2007&ssl=1", alt: "AI Review Steps", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/02/NFC.webp?fit=800%2C741&ssl=1", alt: "NFC tap" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/02/Create.webp?fit=800%2C741&ssl=1", alt: "Create review" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/02/Review.webp?fit=800%2C741&ssl=1", alt: "Review output" },
    ],
    nextProject: "digital-tipping",
  },
  {
    id: "digital-tipping",
    title: "Digital Tipping",
    subtitle: "Enabling tour guides to receive an average tip of $25 through digital tipping",
    tags: ["UI/UX", "Project Planning", "Interaction Design", "Analytics"],
    timeline: "6 months",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2024/09/Pill2.webp?fit=800%2C800&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Tipping_HeaderProfile.webp?fit=4107%2C2089&ssl=1",
    liveLink: "https://tip.direct/",
    description: "TipDirect aims to transform the tipping experience in the travel industry by providing a seamless, digital solution for visitors to show appreciation to their guides.",
    challenge: "Visitors are increasingly going cashless. Needed an easy-to-use mobile solution that allows tour guides to collect tips and reviews from groups at end of tours.",
    stats: [
      { value: "31%", label: "conversion rate increase" },
      { value: "$24.26", label: "average tip received" },
      { value: "$4,000", label: "largest tip (group booking)" },
    ],
    images: [
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Tipping-Profile-1.webp?fit=800%2C942&ssl=1", alt: "Tipping profile" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Tech.webp?fit=800%2C800&ssl=1", alt: "Tech stack" },
    ],
    nextProject: "admin-dashboard",
  },
  {
    id: "admin-dashboard",
    title: "Admin Dashboard",
    subtitle: "A comprehensive admin platform processing €6,000,000+ in tips",
    tags: ["UI/UX", "Project Planning", "Interaction Design", "Analytics"],
    timeline: "Ongoing",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/AdminDashboard.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/TipDirectHeader_Web-2.webp?fit=4018%2C2426&ssl=1",
    liveLink: "https://eu.tip.direct/signup",
    description: "Full admin dashboard for TipDirect — managing guides, tips, reviews, payments, and analytics. Platform processed thousands of tips totalling more than €6,000,000 in value.",
    stats: [
      { value: "€6M+", label: "total tips processed" },
      { value: "6", label: "design phases completed" },
      { value: "9", label: "core features delivered" },
    ],
    images: [
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Dashboard-1.webp?fit=800%2C741&ssl=1", alt: "Dashboard" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/GetTips.webp?fit=800%2C741&ssl=1", alt: "Get Tips" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Profile-1.webp?fit=800%2C741&ssl=1", alt: "Profile" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/DesignSystem_header.webp?fit=7401%2C4131&ssl=1", alt: "Design System", wide: true },
    ],
    nextProject: "website-tipdirect",
  },
  {
    id: "website-tipdirect",
    title: "Website — TipDirect",
    subtitle: "Designing and developing the TipDirect marketing website",
    tags: ["UI/UX", "Web Dev"],
    timeline: "2 months",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Website.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Web_Web.webp?fit=4107%2C2089&ssl=1",
    liveLink: "https://tip.direct/",
    description: "Designed and developed the TipDirect website using WordPress with Elementor. Crafted distinct visual identity acknowledging origins as TripAdmit spinoff. Mobile-first responsive design with custom widgets and templates.",
    images: [
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Web_Mobile.webp?fit=800%2C755&ssl=1", alt: "Mobile design" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/TipDirect_CTA-1.webp?fit=4172%2C2249&ssl=1", alt: "CTA section", wide: true },
    ],
    nextProject: "tipdirect-app",
  },
  {
    id: "tipdirect-app",
    title: "TipDirect App",
    subtitle: "Native mobile app serving 10,000+ daily active users across 2 continents",
    tags: ["UI/UX", "Atomic Design", "App", "iOS & Android"],
    timeline: "6 months",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/TipDirect_App.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/TipDIrect_App_Header.webp?fit=4107%2C2089&ssl=1",
    description: "Full native app for TipDirect on iOS & Android with payment links, tipping groups, tiered plans, voice reviews, analytics, and group management.",
    stats: [
      { value: "10K+", label: "daily active users" },
      { value: "+225%", label: "revenue growth YOY" },
      { value: "$4,000", label: "largest tip received" },
    ],
    images: [
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/Pill1.webp?fit=800%2C1014&ssl=1", alt: "App feature 1" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/Pill2.webp?fit=800%2C1014&ssl=1", alt: "App feature 2" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/Pill3.webp?fit=800%2C1014&ssl=1", alt: "App feature 3" },
    ],
    nextProject: "spotify",
  },
  {
    id: "spotify",
    title: "Spotify Integration",
    subtitle: "RFP design for integrating digital tipping into Spotify",
    tags: ["UI/UX", "Integration"],
    timeline: "N/A",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/Spotify.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/SpotifyHeader_Web.webp?fit=4107%2C2089&ssl=1",
    description: "RFP for integrating digital tipping into Spotify. Designed to empower users to support content creators directly. Solution placed in the second-page fold below main UI.",
    whatIWorkedOn: ["UI Design", "Presentation"],
    images: [
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/Group-7.webp?fit=800%2C944&ssl=1", alt: "Spotify integration concept" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/Group-12.webp?fit=800%2C754&ssl=1", alt: "Placement options" },
    ],
    nextProject: "whitelabel",
  },
  {
    id: "whitelabel",
    title: "Airline Whitelabel",
    subtitle: "Lead designer on airline white-label product — 85 airlines approached, 17 launched",
    tags: ["UI/UX", "Product Research", "Atomic Design"],
    timeline: "2 years",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/AirlineWhitelabel.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/WL_BannerHome-1.webp?fit=3800%2C1933&ssl=1",
    description: "Lead designer on airline white-label product. Packaging 30,000+ tours and activities in 100+ countries. Atomic design system. 85 airlines approached, 17 launched.",
    stats: [
      { value: "30K+", label: "tours & activities" },
      { value: "100+", label: "countries" },
      { value: "17", label: "airlines launched" },
    ],
    images: [
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Atoms_Molecules_Organisms3-2.webp?fit=4107%2C2089&ssl=1", alt: "Atomic design system", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Airline-Passenger-User-Journey-Map.jpg?fit=3047%2C1550&ssl=1", alt: "Journey map", wide: true },
    ],
    nextProject: "booking-app",
  },
  {
    id: "ticketing",
    title: "Ticketing System",
    subtitle: "Ticketing System for the tours and activity sector",
    tags: ["UI/UX", "Product Research"],
    timeline: "TBC",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/TicketingSystem_PillMobileWeb.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/TicketingSystem_PillMobileWeb.webp?fit=800%2C741&ssl=1",
    description: "Ticketing System developed for the tours and activity sector.",
    comingSoon: true,
  },
  {
    id: "booking-app",
    title: "Booking App & Site",
    subtitle: "Digital transformation of Therapie Clinic — £13m in online sales in first year",
    tags: ["UI/UX", "App Design", "E-commerce"],
    timeline: "2 years",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Therapie_PillMobileWeb.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Group-16.webp?fit=4107%2C2089&ssl=1",
    description: "Led digital transformation of international beauty chain. Booking/appointment app + eCommerce for skincare products. Launched early 2019 to immediate success.",
    stats: [
      { value: "£13M", label: "in online sales in first year" },
      { value: "100%", label: "online bookings overtook foot traffic" },
      { value: "3", label: "systems fully integrated" },
    ],
    images: [
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Group-3.webp?fit=800%2C610&ssl=1", alt: "App screens" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/TherapieBooking_Group-2.webp?fit=4107%2C2089&ssl=1", alt: "Booking system", wide: true },
    ],
  },
];

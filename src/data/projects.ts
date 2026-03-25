import tipdirectLogo from "@/assets/logos/tipdirect.svg";
import tipdirectLogoWhite from "@/assets/logos/tipdirect-white.png";
import tippingChallenge from "@/assets/images/tipping-challenge.png";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  workDescription?: string;
  tags: string[];
  timeline: string;
  pillImage: string;
  headerImage: string;
  clientLogoDark?: string;
  liveLink?: string;
  description: string;
  challenge?: string;
  challengeImageRight?: boolean;
  stats?: { value: string; label: string }[];
  quote?: { text: string; author: string };
  images?: { src: string; alt: string; wide?: boolean }[];
  whatIWorkedOn?: string[];
  nextProject?: string;
  comingSoon?: boolean;
  client?: string;
  clientLogo?: string;
  researchFindings?: string[];
  howItWorks?: { step: string; title: string; text: string }[];
  features?: { title: string; desc: string }[];
  designProcess?: { num: string; title: string; desc: string }[];
  designProcessDetails?: { num: string; title: string; text: string; outcomes?: string; image?: string }[];
  sharingMethods?: string[];
  mobileImage?: string;
  toolsImage?: string;
  toolsUsedImage?: string;
  exploration?: string;
  explorationVideo?: string;
  buildingTheFeature?: string;
  launchAnalytics?: { intro?: string; documentation: string[]; analytics: string[] };
  challengeImage?: string;
  designSystemLinks?: { label: string; url: string }[];
  designGoals?: { title: string; desc: string }[];
  coreDesignPrinciples?: { title: string; desc: string }[];
  mobileAdaptations?: { title: string; desc: string }[];
  prototyping?: string;
  prototypingDetails?: { title: string; desc: string }[];
  prototypeLink?: string;
  coreFunctionality?: { title: string; desc: string }[];
  releaseReception?: string;
  engagementConsiderations?: { title: string; desc: string }[];
  trimmingDown?: string;
  alternativeIntegrations?: { title: string; desc: string; image: string }[];
  explorationDetail?: string;
  solutionDetail?: string;
  researchIntro?: string;
  solutionIntro?: string;
  featureImpact?: { period: string; value: string; label: string; description: string }[];
  tippingFlow?: string;
  tippingFlowGif?: string;
  designSystemDescription?: string;
  componentLibraryDescription?: string;
  designHandoff?: string;
  designHandoffOutcomes?: string;
  uatLaunch?: string;
  uatLaunchOutcomes?: string;
  heroSubtitle?: string;
  newSkills?: string;
  componentFocused?: string;
  initialApproach?: string;
  componentLibrary?: string;
  launchTraction?: string;
  ecommerce?: string;
  vimeoEmbed?: string;
  // Whitelabel-specific fields
  journeyUnderstanding?: string;
  journeyStages?: { phase: string; text: string }[];
  atomicDesignSystem?: string;
  atomicDesignSystemRight?: string;
  displayingTours?: string;
  displayingToursTemplates?: string[];
  activityDetailPage?: string;
  closingTextLeft?: string;
  closingTextRight?: string;
  scalingPartnership?: string;
  improvingProduct?: string;
  improvingProductReportLink?: string;
  scalingVideo?: string;
}

export const projects: Project[] = [
  {
    id: "marsh-design-system",
    title: "Marsh Design System Rebrand",
    subtitle: "Rebranding an enterprise component library with an AI-first workflow",
    workDescription: "A full rebrand of the CORE design system — 60+ components updated, documented in Storybook, and shipped to GitHub before the official launch.",
    tags: ["Design Systems", "Brand Implementation", "AI Workflow"],
    timeline: "2 months",
    client: "Marsh",
    pillImage: "/images/work/marsh-design-system.webp",
    headerImage: "/images/work/marsh-design-system.webp",
    description: "",
    nextProject: "marsh-internal-tooling",
  },
  {
    id: "marsh-internal-tooling",
    title: "Marsh Internal Tooling",
    subtitle: "Three enterprise internal tools designed and shipped simultaneously",
    workDescription: "Three enterprise tools designed and shipped in parallel — built on a shared component library and an AI-accelerated design process.",
    tags: ["Product Design", "Design Systems", "AI Workflow"],
    timeline: "Ongoing",
    client: "Marsh",
    pillImage: "/images/work/marsh-storybook-prototype.png",
    headerImage: "/images/work/marsh-storybook-prototype.png",
    description: "",
    nextProject: "ai-reviews",
  },
  {
    id: "ai-reviews",
    title: "AI Assisted Reviews",
    subtitle: "Leveraging AI to increase 5-star reviews by 45% on average",
    heroSubtitle: "Leveraging the power of AI to generate personalised reviews for tour and activity providers",
    workDescription: "I worked with TripAdmit to leverage the power of AI generating reviews for tour and activity providers at the end of their experiences.",
    tags: ["UI/UX", "Project Planning", "Interaction Design", "Analytics"],
    timeline: "3 months",
    client: "TipDirect",
    clientLogo: tipdirectLogo,
    clientLogoDark: tipdirectLogoWhite,
    pillImage: "/images/work/ai-pill.webp",
    headerImage: "/images/work/ai-header.webp",
    mobileImage: "/images/work/ai-mobile.webp",
    toolsImage: "/images/work/ai-reviews-tools-used.webp",
    toolsUsedImage: "/images/work/ai-reviews-tools-used.webp",
    liveLink: "https://tip.direct/platform-admin/",
    challengeImage: "/images/work/ai-challenge.webp",
    description: "TipDirect, the only product offering a dedicated digital tipping solution for travel guides aimed to expand its offering by incorporating AI assisted reviews at the end of the tipping process in order to ensure that satisfied guests left a positive review of their tour experience.\n\nBy leveraging ChatGPT, we've significantly reduced the time and effort required to create personalised review requests, while simultaneously increasing the likelihood of guests leaving timely and meaningful feedback. This innovative approach not only improves the quantity and quality of reviews but also enhances the overall guest experience by providing a seamless and personalised post-tour interaction.",
    challenge: "Tour operators consistently struggle to capture timely reviews from guests immediately after their experiences. This challenge persists even when guests have thoroughly enjoyed their tours, creating a significant disconnect between customer satisfaction and documented feedback.\n\nIn this case study, we'll explore how me and our team tackled this challenge through comprehensive quantitative UX research. Using a combination of card sorting exercises and in-depth customer interviews, we sought to understand the core barriers preventing tourists from leaving timely reviews.",
    exploration: "A team wide exploration of the best ways to incorporate AI into our product, a lot of great ideas generated. From this session, the idea of incorporating ChatGPT into review generation came about.",
    explorationVideo: "/videos/chatgpt-brainstorm.mp4",
    researchFindings: [
      "Timing Issues: Guests often delay writing reviews until long after their experience. Details and emotional impressions fade with time. Competing priorities post-tour distract from review writing.",
      "Engagement Barriers: Lack of immediate motivation to leave feedback. Timing – leaving reviews takes time. Technical friction in review platforms.",
      "Business Impact: Lost opportunities for social proof and marketing content. Delayed feedback for service improvement. Reduced visibility on review platforms.",
    ],
    buildingTheFeature: "Building upon an existing tipping product, we broke down the user flow of a review into its essential steps. We decided to add a flow at the end of the tipping process that prompts users to leave a personalised, positive review of their recent experience. To ensure that the review was attributed to the individual guide, we decided that all generated reviews should include the guide's name automatically.",
    researchIntro: "TripAdmit was fortunate to have a highly engaged user base actively seeking a review feature for their tour experiences. Through comprehensive quantitative research involving interview feedback sessions, we were able to compile a detailed understanding of user needs and preferences. Our research yielded several significant findings, outlined below:",
    solutionIntro: "A crucial aspect of implementing AI-generated personalised reviews was ensuring accurate guide attribution and tour identification. This required a specific setup process in the TipDirect admin dashboard:\n\nTours needed to be individually configured in the back office system. Each tour had to be explicitly assigned to specific guides by admin users. This manual setup process ensured accurate guide attribution in reviews.\n\nThis structured approach to tour management was essential for maintaining the integrity of the AI review system while ensuring a smooth user experience for customers leaving reviews.",
    howItWorks: [
      { step: "01", title: "Create Tour", text: "In the TipDirect admin panel, an account owner sets up individual tours and their respective review links. Once created, these tours can be assigned to guide users on the business owner's account. This enables personalised reviews on individual tours." },
      { step: "02", title: "Prompt Guests", text: "Guides prompt visitors to tap a NFC card to the back of their phones, this triggers a UI flow for visitors to leave a review. Visitors select keywords that best describe their experience, ChatGPT then compiles a review based on the keyword, the guides name and the experience they were booked on." },
      { step: "03", title: "Track Reviews", text: "Once the visitor has left their review it is documented in the TipDirect admin panel. This enables admin to track the increase in reviews but also enables admins to run incentive schemes for their guides and attribute reviews individually." },
    ],
    featureImpact: [
      { period: "Short term", value: "26%", label: "of all tipping guests left a positive review", description: "The initial success was significant: over a quarter of guests left reviews using the AI review feature, creating an immediate positive impact on review volume." },
      { period: "Medium term", value: "96%", label: "of guests left a 5 star review", description: "The hypothesis that guests who tip are more likely to leave a positive review was validated, with nearly 100% of these guests providing 5-star ratings." },
      { period: "Long term", value: "Bookings++", label: "reports of increased bookings", description: "The increased social proof has proven highly successful, with feature users reporting a rise in online bookings." },
    ],
    designSystemLinks: [
      { label: "Design System", url: "https://tipdirect-design.com/" },
      { label: "Components", url: "https://www.figma.com/design/kvqj5raBxuBkAxibfK1BFi/TipDirect_StyleGuide?node-id=53-82&t=PXzTHBWZl3BJ88Cx-1" },
    ],
    launchAnalytics: {
      documentation: [
        "Created detailed knowledge base articles explaining feature functionality",
        "Provided step-by-step guides for setting up and using AI reviews",
        "Crafted email and direct outreach initiatives",
      ],
      analytics: [
        "Integrated Mixpanel tracking across key user interactions",
        "Monitored review completion rates",
        "Tracked user engagement with AI-generated content",
      ],
    },
    stats: [
      { value: "26%", label: "of tipping guests left a positive review (short term)" },
      { value: "96%", label: "of guests left a 5-star review (medium term)" },
      { value: "45%", label: "avg increase in 5-star reviews per company" },
    ],
    quote: {
      text: "Leveraging the power of AI & expanding our product to attract a new type of user could only have been possible with Dave on our team",
      author: "Andrew Kelly, CTO TipDirect",
    },
    whatIWorkedOn: ["UI Design", "UX Strategy", "User Interviews", "Marketing", "Growth Strategy", "Feature Analysis"],
    images: [
      { src: "/images/work/ai-review-steps.webp", alt: "AI Review Steps", wide: true },
      { src: "/images/work/ai-nfc.webp", alt: "NFC tap" },
      { src: "/images/work/ai-create-review.webp", alt: "Create review" },
      { src: "/images/work/ai-review-output.webp", alt: "Review output" },
      { src: "/images/work/ai-challenge.webp", alt: "Group overview" },
      { src: "/images/work/ai-mixpanel-report.webp", alt: "Mixpanel analytics report", wide: true },
    ],
    nextProject: "digital-tipping",
  },
  {
    id: "digital-tipping",
    title: "Digital Tipping",
    subtitle: "Enabling tour guides to receive an average tip of $25 through digital tipping",
    workDescription: "This digital tipping solution enables tour guides to take tips on the go, receiving immediate remittance via their selected payout method.",
    tags: ["UI/UX", "Project Planning", "Interaction Design", "Analytics"],
    timeline: "6 months",
    client: "TipDirect",
    clientLogo: tipdirectLogo,
    clientLogoDark: tipdirectLogoWhite,
    pillImage: "/images/work/tipping-pill.webp",
    headerImage: "/images/work/tipping-header.webp",
    mobileImage: "/images/work/tipping-mobile.webp",
    toolsImage: "/images/work/ai-reviews-tools-used.webp",
    liveLink: "https://tip.direct/",
    description: "TipDirect aims to transform the tipping experience in the travel industry by providing a seamless, digital solution for visitors to show appreciation to their guides. This innovative platform leverages cutting-edge technology to create a user-friendly, efficient, and secure tipping system.\n\nBy digitizing the tipping process, we seeked to enhance the overall travel experience, fostering stronger connections between visitors and guides while streamlining financial transactions in the tourism sector.",
    challengeImage: tippingChallenge,
    challenge: "In today's world, visitors to tourist attractions are increasingly going cashless. We were tasked with developing an easy-to-use, mobile solution that would allow tour guides to collect tips and reviews from groups at the end of their tours.\n\nTo accomplish this, we leveraged multiple methods for sharing a guide's profile on the go: NFC cards, QR codes, and shareable links.\n\nBy implementing quick tip options and integrating popular digital payment methods like Apple Pay and Google Pay, we simplified the tipping process. This reduced the cognitive load on visitors, making it a quicker and easier decision when they're on the move.",
    researchIntro: "TripAdmit was fortunate to have a highly engaged user base actively seeking a review feature for their tour experiences. Through comprehensive quantitative research involving interview feedback sessions, we were able to compile a detailed understanding of user needs and preferences. Our research yielded several significant findings, outlined below:",
    exploration: "From customer interviews and shadowing, we quickly determined that tour guides required multiple ways of sharing their profiles with varying group sizes. For this reason, we chose to employ three methods. Crucially, once any of these methods had been used to access a profile, it was imperative that the tipping user didn't have to deduce what was being asked of them.\n\nFacial ID payments drastically reduce the time required to make an impulsive payment decision, while contactless payments appear 15% less to the tipper than if they were to leave gratuity in cash. After the tip, we aimed to leverage a captivated, satisfied audience by prompting them to leave a review, engage with the company's social media channels, or avail themselves of another experience by booking with a promo code.",
    sharingMethods: ["NFC cards", "QR codes", "Shareable links"],
    buildingTheFeature: "TipDirect offers multiple tipping methods through its platform: links, QR codes, and NFC-enabled cards. To ensure a consistent user experience, we designed an identical payment flow regardless of which method a guide shares with their customer. We prioritised convenient \"on-the-go\" tipping by prominently featuring Google Pay and Apple Pay options. Once a customer completes their tip, we leverage this engagement moment to request a review—a feature that eventually expanded to include social media prompts and upsell opportunities.",
    tippingFlow: "The tipping flow is straightforward: the guide presents one of their tipping methods to the guest, who then follows the provided link to a screen where they can choose their tip amount.\n\nAfter completing the transaction, guests are prompted to leave a review of their tour with help from an AI assistant.\n\nWe deliberately designed the flow to be as quick as possible for users on the go.\n\nWhen a tour guide uses the platform for the first time, there's no need to set up a preferred payout method initially. After receiving their first tip, guides get an email prompting them to set up their payout preferences. All subsequent tips are then paid directly to the guide through their chosen method.",
    tippingFlowGif: "/images/work/tipping-flow.gif",
    designSystemLinks: [
      { label: "Design System", url: "https://tipdirect-design.com/" },
      { label: "Components", url: "https://www.figma.com/design/kvqj5raBxuBkAxibfK1BFi/TipDirect_StyleGuide?node-id=53-82&t=PXzTHBWZl3BJ88Cx-1" },
    ],
    launchAnalytics: {
      intro: "The initial feature set of the TipDirect platform consisted of digital tipping coupled with AI-assisted reviews. Through early conversations with potential customers, we were fortunate to have several eager early adopters ready to use the product. However, we still placed high importance on the following.",
      documentation: [
        "Created detailed knowledge base articles explaining feature functionality",
        "Provided step-by-step guides for setting up and using digital tipping",
        "Crafted email and direct outreach initiatives",
      ],
      analytics: [
        "Integrated Mixpanel tracking across key user interactions",
        "Monitored flow completion rates",
        "A/B tests for feature variations",
      ],
    },
    whatIWorkedOn: ["UI Design", "UX Strategy", "User Interviews", "Marketing", "Growth Strategy", "Feature Analysis"],
    featureImpact: [
      { period: "Local Currency", value: "31%", label: "conversion rate increase", description: "When we used AI to automatically detect a user's own currency." },
      { period: "Average Tip", value: "$24.26", label: "received", description: "Guides who used the TipDirect platform received on average $24.26 per tip." },
      { period: "Largest Tip", value: "$4,000", label: "for a group booking", description: "In summer 2024, a guide using the TipDirect platform received a tip of $4,000." },
    ],
    stats: [
      { value: "31%", label: "conversion rate increase (local currency AI detection)" },
      { value: "$24.26", label: "average tip received" },
      { value: "$4,000", label: "largest tip (group booking, summer 2024)" },
      { value: "75%", label: "of users active at least once per week" },
    ],
    images: [
      { src: "/images/work/tipping-tech.webp", alt: "Tech stack" },
      { src: "/images/work/tipping-survey.jpg", alt: "Survey example" },
      { src: "/images/work/tipping-mindmap.jpg", alt: "Mind map" },
      { src: "/images/work/tipping-rd.jpg", alt: "Research document" },
      { src: "/images/work/tipping-userflow.png", alt: "User flow", wide: true },
      { src: "/images/work/tipping-stats2.webp", alt: "Stats overview", wide: true },
      { src: "/images/work/tipping-stats1.webp", alt: "Stats detail 1", wide: true },
      { src: "/images/work/tipping-stats3.webp", alt: "Stats detail 2", wide: true },
      { src: "/images/work/tipping-stats4.webp", alt: "Stats detail 3", wide: true },
    ],
    nextProject: "admin-dashboard",
  },
  {
    id: "admin-dashboard",
    title: "Admin Dashboard",
    subtitle: "A comprehensive admin platform processing €6,000,000+ in tips",
    heroSubtitle: "A case study on building the central management interface for TipDirect",
    workDescription: "We built a dashboard for the TipDirect platform, providing customers with all the tools needed to facilitate digital tipping.",
    tags: ["UI/UX", "Project Planning", "Interaction Design", "Analytics"],
    timeline: "Ongoing",
    client: "TipDirect",
    clientLogo: tipdirectLogo,
    clientLogoDark: tipdirectLogoWhite,
    challengeImageRight: true,
    challengeImage: "/images/work/admin-tourguides.webp",
    pillImage: "/images/work/admin-pill.webp",
    headerImage: "/images/work/admin-header.webp",
    mobileImage: "/images/work/admin-mobile.webp",
    toolsImage: "/images/work/ai-reviews-tools-used.webp",
    toolsUsedImage: "/images/work/marsh-tools.webp",
    liveLink: "https://eu.tip.direct/signup?landingUrl=/signin",
    description: "The TipDirect Admin Dashboard serves as the central management interface for company administrators to oversee and control platform operations. This comprehensive tool is designed to streamline the onboarding and management processes for tour guides and platform resources.\n\nThe dashboard implements role-based access control to provide different functionality and views based on user types.",
    challenge: "In today's cashless society, tour guides face a key challenge: travelers rarely carry local currency, hindering the tipping system many guides depend on. Tour companies also lack efficient ways to collect customer reviews. To address these challenges we built TipDirect, a digital tipping and review collection platform.\n\nOur vision goes beyond solving payment and review collection issues; we aimed to build a community where guides share workloads and opportunities in a connected tourism ecosystem.\n\nTo realise this, we needed a unified platform for both tour admins and their guides.",
    whatIWorkedOn: ["Research", "UX Strategy", "Project Planning", "UI Design", "Design System", "Growth Strategy"],
    designSystemDescription: "To establish a scalable design system, I implemented a reference-based architecture in Figma that emphasised component reusability and standardisation. Creating a comprehensive library of atomic components (buttons, form fields, typography) that served as building blocks for more complex interface elements. The system follows a variant-based approach to manage state changes and contextual adaptations, minimising redundant design work and ensuring consistency.\n\nBy implementing naming conventions and organisation structures, I was able to quickly locate and build upon components. This systematic approach reduced decision making during feature development, accelerated the design-to-development handoff process and provided easy to follow, consistent implementation patterns, also ensuring visual coherence across the entire platform as it scaled.",
    designProcess: [
      { num: "01", title: "Research & Ideation", desc: "Honing in on the customer success team, I leveraged their contacts to conduct user interviews, identifying pain points in the tipping and review gathering process." },
      { num: "02", title: "Functional Specs & Wireframes", desc: "We established a new structure for the platform based on the two user types. I created low definition wireframes for initial conversations with the lead dev." },
      { num: "03", title: "Feature Planning & Roadmap", desc: "Working closely with senior management and the lead developer, we clearly defined product features and their scope, adding them to a roadmap which follows the kanban methodology." },
      { num: "04", title: "Design System", desc: "Building upon an existing platform, I wanted to create a scalable atomic design system that would be easy to scale up as new features were required." },
      { num: "05", title: "Design Handoff", desc: "I met regularly with the lead developer to discuss upcoming features before each sprint. Once finalised, designs were handed off and prepared for development." },
      { num: "06", title: "UAT, Launch & Measurement", desc: "Before launch, each feature underwent user acceptance testing. After deployment, we monitored performance using predefined success metrics." },
    ],
    designProcessDetails: [
      {
        num: "01",
        title: "Research & Ideation",
        text: "This phase consisted of the following:\n- Initial UX exercises to validate the problem space and opportunities\n- Stakeholder interviews to understand pain points and appetite\n- User journey mapping\n- Define project scope and success metrics",
        outcomes: "As a crucial part of any new product design, this phase uncovered several challenges and opportunities for building the product. Key findings included how users would interact with the dashboard, with major emphasis on mobile-friendly administration for on-the-go management and ensuring tipping guests wouldn't need to download additional software.",
        image: "/images/work/admin-ux-initial.webp",
      },
      {
        num: "02",
        title: "Functional Specifications & Wireframes",
        text: "We began a process of exploring each feature we planned to build using a low-fidelity approach. This involved iterating through flows, constructing diagrams, wireframes, and rough sketches. This quick and iterative approach provided the foundation for concept validation before we started pivoting the existing dashboard toward its new focus.",
        outcomes: "During this phase, we identified significant onboarding challenges that needed addressing to ensure on-the-go usability, particularly regarding NFC card-profile pairing. This exploratory work also allowed our development team to accurately scope features, enabling us to create a roadmap that aligned with senior stakeholders' vision.",
      },
      {
        num: "03",
        title: "Feature Planning & Roadmap",
        text: "After consolidating all the information gathered in the first two phases, we organized and planned features in a Gantt chart format.\n\nThis approach ensured we prioritised customer needs while efficiently allocating development resources.\n\nThe planning format also allowed me to stay consistently ahead of development timelines whilst also maintaining my own level of concept validation with users through our robust design prototype built in Figma.",
        image: "/images/work/admin-gantt.webp",
      },
      {
        num: "04",
        title: "Establishing a Design System",
        text: "To establish a scalable design system, I implemented a reference-based architecture in Figma that emphasised component reusability and standardisation. Creating a comprehensive library of atomic components (buttons, form fields, typography) that served as building blocks for more complex interface elements. The system follows a variant-based approach to manage state changes and contextual adaptations, minimising redundant design work and ensuring consistency.\n\nBy implementing naming conventions and organisation structures, I was to quickly locate and build upon components. This systematic approach reduced decision making during feature development, accelerated the design-to-development handoff process and provided easy to follow, consistent implementation patterns, also ensuring visual coherence across the entire platform as it scaled.",
      },
      {
        num: "05",
        title: "Design Handoff",
        text: "The design handoff process for TipDirect followed a structured approach to ensure seamless implementation. It began with setting context for the development team, providing clear explanations of user needs and business requirements that drove each design decision. This was enhanced by additional contextual information like user research findings and competitive analysis insights. Every handoff included comprehensive checklists for responsive behavior, accessibility requirements, and edge cases, alongside detailed annotations explaining design rationale and interaction details.",
        outcomes: "This systematic handoff process yielded significant improvements in development efficiency and design fidelity. By implementing clear annotations and comprehensive documentation, we reduced developer questions, allowing the team to maintain momentum during implementation sprints. The interactive prototypes proved particularly valuable, decreasing implementation errors compared to previous projects.",
        image: "/images/work/admin-devhandoff.webp",
      },
      {
        num: "06",
        title: "UAT, Launch & Measurement",
        text: "The User Acceptance Testing (UAT) phase for TipDirect employed a structured approach managed through a ClickUp kanban board, allowing for transparent tracking of issues and feature validation. Prior to launch, we established key performance indicators derived from our initial brief, including user adoption rates, average tip amount, review submission percentage, and guide retention metrics.",
        outcomes: "As a result of our meticulous planning and implementation, the product remained agile and easy to build upon. TipDirect itself achieved remarkable outcomes within its first years. The platform processed thousands of tips totaling more than €6,000,000 in value, the platform continues to enjoy steady growth as it moves into new markets.",
        image: "/images/work/admin-header.webp",
      },
    ],
    features: [
      { title: "Dashboard", desc: "Easy access to tipping methods, a run-down of daily activity, display tipping group information and everyday functionality" },
      { title: "Get Tips", desc: "Everything needed to access and gather tips on the go: QR codes, personal tip links & printouts" },
      { title: "Profile", desc: "Profile photo, details, bio and preferred tip amounts & currency. Personalised accounts perform better" },
      { title: "Payments", desc: "Track all payments and their status on the way to your account" },
      { title: "Setup", desc: "For admins, setup reviews link, social & custom links" },
      { title: "Reports", desc: "Usage analytics provides real-time metrics of platform effectiveness" },
      { title: "Users", desc: "A user management portal for all guides on an admin's account" },
      { title: "Resources", desc: "Add physical assets that guides & drivers can tag onto and earn tips from" },
      { title: "Settings", desc: "Account settings, access to the knowledge base and subscription" },
    ],
    stats: [
      { value: "€6M+", label: "total tips processed" },
      { value: "6", label: "design phases completed" },
      { value: "9", label: "core features delivered" },
    ],
    images: [
      { src: "/images/work/admin-tourguides.webp", alt: "Tour Guides" },
      { src: "/images/work/admin-ux-initial.webp", alt: "UX Initial Phases", wide: true },
      { src: "/images/work/admin-ticketing.webp", alt: "Ticketing System", wide: true },
      { src: "/images/work/admin-designsystem-header.webp", alt: "Design System", wide: true },
      { src: "/images/work/admin-colour.webp", alt: "Colour palette" },
      { src: "/images/work/admin-typography.webp", alt: "Typography" },
      { src: "/images/work/admin-components.webp", alt: "Components", wide: true },
      { src: "/images/work/admin-dashboard-screen.webp", alt: "Dashboard" },
      { src: "/images/work/admin-gettips.webp", alt: "Get Tips" },
      { src: "/images/work/admin-profile.webp", alt: "Profile" },
      { src: "/images/work/admin-payments.webp", alt: "Payments" },
      { src: "/images/work/admin-setup.webp", alt: "Setup" },
      { src: "/images/work/admin-reports.webp", alt: "Reports" },
      { src: "/images/work/admin-users.webp", alt: "Users" },
      { src: "/images/work/admin-resources.webp", alt: "Resources" },
      { src: "/images/work/admin-settings.webp", alt: "Settings" },
      { src: "/images/work/admin-fullplatform.webp", alt: "Full platform overview", wide: true },
      { src: "/images/work/admin-devhandoff.webp", alt: "Dev handoff", wide: true },
      { src: "/images/work/admin-header.webp", alt: "UAT & Launch", wide: true },
    ],
    nextProject: "website-tipdirect",
  },
  {
    id: "website-tipdirect",
    title: "TipDirect Marketing Website — Travel-Tech UI/UX Case Study",
    subtitle: "Designing and developing a conversion-focused marketing website for a digital tipping platform",
    heroSubtitle: "How Lacuna Digital designed and built a marketing website that established TipDirect as a standalone brand in the travel-tech space",
    workDescription: "Lacuna Digital led the end-to-end UI/UX design and front-end development of the TipDirect marketing website — a digital tipping platform for the global tours and activities industry, built by TripAdmit.",
    tags: ["UI/UX", "Web Dev", "Branding"],
    timeline: "2 months",
    client: "TripAdmit",
    clientLogo: tipdirectLogo,
    clientLogoDark: tipdirectLogoWhite,
    pillImage: "/images/work/tipdirect-marketing-site.webp",
    headerImage: "/images/work/tipdirect-marketing-site.webp",
    mobileImage: "/images/work/tipdirect-marketing-site.webp",
    toolsImage: "/images/work/web-tipdirect-tools-header.webp",
    liveLink: "https://tip.direct/",
    description: "Situation: TipDirect began as an internal product within TripAdmit — a tours and activities booking platform. As the tipping product gained traction with over 10,000 daily active users across two continents, TripAdmit needed a dedicated marketing website that positioned TipDirect as an independent, trustworthy brand rather than a subsidiary feature.\n\nTask: Lacuna Digital was engaged to design and develop a conversion-focused marketing website from scratch. The site needed to clearly communicate TipDirect's value proposition to tour operators, establish visual credibility independent of TripAdmit's existing brand, and drive sign-up conversions from operators discovering the platform for the first time.\n\nAction: I led the full design and development process using WordPress with Elementor, making deliberate decisions to establish a distinct visual identity. Rather than relying on image-heavy layouts, I built a library of reusable components — custom CTAs, testimonial blocks, feature grids, and responsive hero sections — ensuring consistency and scalability. The design followed a mobile-first approach, critical given that many tour operators browse on mobile between tours. I crafted the information architecture to guide visitors through a clear narrative: problem → solution → social proof → sign-up.\n\nResult: The launched website successfully established TipDirect as a standalone brand in the travel-tech space. The component-driven approach reduced page load times and enabled the marketing team to create new landing pages independently. The site now supports a platform processing over €6,000,000 in digital tips, serving operators across Europe and North America.",
    vimeoEmbed: "https://player.vimeo.com/video/1086437551",
    whatIWorkedOn: ["UI/UX Design", "Web Development", "Brand Strategy", "Information Architecture", "SEO"],
    newSkills: "Leading the TipDirect website project was a pivotal moment in my development as a designer. Taking full ownership — from information architecture through to deployment — pushed me to think beyond aesthetics and into conversion strategy, brand positioning, and technical performance.\n\nThe biggest challenge was creating a brand identity that felt premium and trustworthy while remaining visually distinct from TripAdmit. I spent considerable time on the typography system, colour palette, and component hierarchy to ensure the site communicated authority in the fintech-adjacent travel space. This project also deepened my understanding of building for scalability — every component was designed to be reused, modified, and extended by non-designers on the marketing team.",
    componentFocused: "Rather than defaulting to bespoke, image-heavy page sections, I challenged myself to build a modular component system. Custom CTAs, testimonial carousels, feature comparison grids, and pricing blocks were all designed as reusable elements. This component-first approach meant the marketing team could assemble new landing pages without design support, significantly reducing time-to-publish for campaigns.",
    images: [
      { src: "/images/work/web-tipdirect-cta.webp", alt: "TipDirect CTA section with conversion-focused design", wide: true },
      { src: "/images/work/marsh-design-system.webp", alt: "Reusable component library built for TipDirect", wide: true },
      { src: "/images/work/web-tipdirect-mobile.webp", alt: "Mobile-first responsive design for tour operators", wide: true },
      { src: "/images/work/tipping-mobile.webp", alt: "Social proof and success stories section", wide: true },
      { src: "/images/work/admin-devhandoff.webp", alt: "Tech stack and tools used in development" },
    ],
    nextProject: "tipdirect-app",
  },
  {
    id: "tipdirect-app",
    title: "TipDirect App",
    subtitle: "Native mobile app serving 10,000+ daily active users across 2 continents",
    heroSubtitle: "An app for managing and collecting tips",
    workDescription: "iOS & Android App for the guides using the TipDirect platform",
    tags: ["UI/UX", "Atomic Design", "App"],
    timeline: "6 Months",
    client: "TipDirect",
    clientLogo: tipdirectLogo,
    clientLogoDark: tipdirectLogoWhite,
    pillImage: "/images/work/app-pill.webp",
    headerImage: "/images/work/app-header.webp",
    mobileImage: "/images/work/admin-mobile.webp",
    toolsImage: "/images/work/ai-reviews-tools-used.webp",
    toolsUsedImage: "/images/work/marsh-tools.webp",
    description: "The TipDirect app was designed as a natural extension of the TipDirect platform, providing tour guides with a streamlined, mobile-first solution for collecting tips on the go. As the lead designer, I focused on creating an experience that would complement the existing platform while addressing the unique needs of guides working in the field.",
    whatIWorkedOn: ["UI/UX Design", "Product Research", "Project Management", "Customer Success"],
    designGoals: [
      { title: "Simplified Experience", desc: "Create a slimmed-down version of the platform focusing on the core functionality guides need while working on the go." },
      { title: "Enhanced User Engagement", desc: "Foster a stickier relationship with guides by leveraging push notifications to keep them informed about their tips and getting the most from using the product." },
      { title: "Seamless Integration", desc: "Ensure the app experience felt cohesive with the broader TipDirect ecosystem while being purpose-built for its primary workflow." },
    ],
    trimmingDown: "To optimise the TipDirect platform for mobile, we analysed the two user types on the web app: admins and guides. Using the guide persona as our baseline, we constructed information architecture diagrams that formed the foundation of the app's structure.\n\nOver time, we've introduced select admin features alongside the core guide functionality, whilst maintaining a clear distinction: the app serves as a tool for collecting tips and reviews in the field, whilst the web platform handles broader administrative tasks.",
    engagementConsiderations: [
      { title: "Context of Use", desc: "Tour guides are constantly on the move, often in outdoor environments or crowded tourist locations where pulling out a laptop is impractical. They needed a solution that could be accessed quickly with one hand while managing groups." },
      { title: "Time Sensitivity", desc: "The moment immediately following a tour represents the peak opportunity for tip collection. Guides needed to share their tip links or QR codes instantly, without friction." },
      { title: "Connectivity Challenges", desc: "Many popular tour locations have spotty wifi or cellular coverage. The app needed to be lightweight and capable of functioning effectively even in low-bandwidth situations." },
      { title: "Habit Formation", desc: "By placing TipDirect directly on guides' home screens and leveraging push notifications, we could build daily touchpoints that kept the platform top-of-mind." },
    ],
    designSystemDescription: "The TipDirect app utilises the same comprehensive design system as the TipDirect web platform, ensuring visual consistency and a cohesive brand experience across all touchpoints. This shared design language reinforces brand recognition and allows users to transition seamlessly between the web and mobile environments.",
    coreDesignPrinciples: [
      { title: "Consistent Visual Language", desc: "The app employs the same colour palette, typography, iconography, and spacing system as the web platform, creating immediate familiarity." },
      { title: "Component Library", desc: "We maintained the same foundational UI components such as buttons, form fields, cards and navigation elements, adapted for touch interactions." },
      { title: "Brand Identity", desc: "The TipDirect brand personality and visual aesthetic remain consistent, reinforcing trust and recognition regardless of which platform users access." },
    ],
    mobileAdaptations: [
      { title: "Simplified Navigation", desc: "The navigation structure was streamlined into a bottom tab bar, prioritising the most critical actions guides need while working." },
      { title: "Optimised Typography", desc: "Font sizes were adjusted to ensure readability on smaller screens and in varying outdoor lighting conditions." },
      { title: "Contextual Components", desc: "We introduced mobile-specific patterns like swipe gestures, pull-to-refresh, and bottom sheets that felt native to the mobile experience." },
    ],
    prototyping: "Before moving into development, I created a comprehensive interactive prototype of the TipDirect app in Figma. This prototyping phase proved essential to the design process, serving multiple critical functions that shaped the final product.",
    prototypingDetails: [
      { title: "Early Validation", desc: "The prototype allowed us to test user flows and interaction patterns before writing a single line of code. We could identify usability issues, confusing navigation, or missing functionality at a stage where changes cost time rather than engineering resources." },
      { title: "Developer Handoff", desc: "The prototype served as a living specification for the development team. Engineers could interact with the intended behaviour, understand transition states, and clarify edge cases before implementation." },
      { title: "Iteration Speed", desc: "Figma's collaborative environment enabled rapid iteration. I could make adjustments based on feedback in real-time during review sessions, immediately demonstrating alternative approaches." },
      { title: "Documentation", desc: "The prototype became a reference point throughout development and beyond. It captured design decisions, interaction patterns, and the intended user experience in a format that could be referenced by anyone on the team." },
    ],
    prototypeLink: "https://www.figma.com/proto/kXnls8kYwzJJkHeBeRlF4w/TipDirect_App?page-id=0%3A1&node-id=1-2&p=f&viewport=16%2C295%2C0.5&t=k5YW9JjSfgAgnsjN-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A392&show-proto-sidebar=1",
    coreFunctionality: [
      { title: "Tip Collection", desc: "The app's primary function enables guides to share their unique tip links or QR codes instantly with tour participants. The tip collection interface was designed for speed and simplicity." },
      { title: "Reviews", desc: "The review request is intentionally tied into the tip collection flow. When tourists complete a tip payment, they're immediately prompted to leave a review whilst the positive experience is still fresh." },
    ],
    features: [
      { title: "Payment Links", desc: "Enabled guides to take bespoke payments on the go" },
      { title: "Tipping Groups", desc: "Ability to team up and gather tips and reviews as a team" },
      { title: "Tiered Plans", desc: "Featured gated functionality unlocked through tiered plans" },
      { title: "Voice Reviews", desc: "Enabled guests to leave a review through voice, cleaned up with AI" },
      { title: "Analytics", desc: "Deep analytics tracking customer engagement" },
      { title: "Group Management", desc: "Ability to join, leave teams and claim resources on the go" },
    ],
    releaseReception: "The TipDirect app launched in 2024 and quickly gained traction across Europe and North America. What began as a mobile complement to the web platform rapidly became an essential tool for tour guides working in the field.\n\nToday, the app is used daily by over 10,000 guides across multiple markets, representing a significant milestone in TipDirect's growth. This widespread adoption has driven remarkable business results: the platform experienced 225% gross volume growth in revenue.\n\nThe reception from guides has been overwhelmingly positive. The ability to collect tips and reviews instantly has made the app an indispensable part of their touring operations.",
    designSystemLinks: [
      { label: "Design System", url: "https://tipdirect-design.com/" },
    ],
    stats: [
      { value: "10K+", label: "daily active users on 2 continents" },
      { value: "+225%", label: "revenue growth YOY (2024 to 2025)" },
      { value: "$4,000", label: "largest tip received" },
    ],
    images: [
      { src: "/images/work/app-ia.png", alt: "Information architecture", wide: true },
      { src: "/images/work/app-overview.webp", alt: "App overview", wide: true },
      { src: "/images/work/app-pill5.webp", alt: "Payment Links" },
      { src: "/images/work/app-pill3.webp", alt: "Tipping Groups" },
      { src: "/images/work/app-pill1.webp", alt: "Tiered Plans" },
      { src: "/images/work/app-pill2.webp", alt: "Voice Reviews" },
      { src: "/images/work/app-pill4.webp", alt: "Analytics" },
      { src: "/images/work/app-pill6.webp", alt: "Group Management" },
      { src: "/images/work/admin-colour.webp", alt: "Colour system" },
      { src: "/images/work/admin-typography.webp", alt: "Typography system" },
      { src: "/images/work/admin-tourguides.webp", alt: "Tour guides" },
    ],
    nextProject: "spotify",
  },
  {
    id: "spotify",
    title: "Spotify Tipping Integration",
    subtitle: "RFP design for integrating digital tipping into Spotify",
    heroSubtitle: "Digital Tipping For Artists & Creators",
    workDescription: "TipDirect explored a request for proposal (RFP) for integrating tipping into the Spotify platform.",
    tags: ["UI/UX", "Integration"],
    timeline: "N/A",
    client: "Spotify",
    clientLogo: "/images/work/spotify-pill.webp",
    pillImage: "/images/work/spotify-pill.webp",
    headerImage: "/images/work/spotify-header.webp",
    mobileImage: "/images/work/spotify-mobile.webp",
    description: "The TipDirect integration on the Spotify platform is designed to empower users to express their appreciation directly and provide meaningful financial support for content creators who enrich their listening experience on the audio streaming platform. This innovative feature aims to create a more direct connection between listeners and artists, enabling a new way for fans to contribute to the success and sustainability of their favourite content creators while enjoying their work on Spotify.\n\nWe embarked on a meticulous process of deconstructing the TipDirect platform, carefully analyzing and stripping back its components to their most fundamental elements. This methodical approach was essential to ensure a seamless integration with Spotify's existing user interface architecture.\n\nWhile our previous experience with Whitelabel integrations had provided valuable insights into platform integration methodologies, we recognized that incorporating the TipDirect platform in a subtle and unobtrusive manner would present unique challenges that would require innovative solutions and careful consideration of user experience design principles.",
    explorationDetail: "Our primary challenge was determining the optimal placement of the tipping integration—whether within a Spotify artist's profile or alongside a currently playing song. The player interface already contained numerous functional elements, and adding a tipping button prominently in the center would likely frustrate users. Therefore, we decided to avoid placing the tipping prompt within the initial viewport of the user's screen.\n\nFortunately, the solution for prompt placement was found further down the screen. Spotify already encourages users to explore artists through features like lyrics, videos, artist information, and ticket sales in the second-page fold. This section proved to be the ideal location for our tipping prompt.",
    solutionDetail: "Our primary challenge was determining the optimal placement of the tipping integration. The player interface already contained numerous functional elements, and adding a tipping button prominently in the center would likely frustrate users.\n\nFortunately, the solution for prompt placement was found further down the screen. Spotify already encourages users to explore artists through features like lyrics, videos, artist information, and ticket sales in the second-page fold. This section proved to be the ideal location for our tipping prompt, a module placed just below the main UI was the selected placement.",
    whatIWorkedOn: ["UI Design", "Presentation"],
    tippingFlow: "The tipping flow integrates seamlessly into the Spotify experience, allowing listeners to tip artists directly from the platform.",
    alternativeIntegrations: [
      { title: "Artist Profile", desc: "Within the artist's profile, there is a monthly listeners module that includes information such as links to social media. This placement would be ideal since users viewing this section are highly engaged with the artist and more likely to tip.", image: "/images/work/spotify-alt-step2.png" },
      { title: "Track Dropdown", desc: "Each track on Spotify has a dropdown menu with additional options. Adding a tipping option here would be a subtle way to include it in every artist's profile.", image: "/images/work/spotify-alt-step3.png" },
      { title: "Spotify Stories", desc: "Spotify's new Stories feature, designed to increase user engagement on the platform, could highlight TipDirect's charitable aspect. We believe this would be an ideal placement that emphasizes the altruistic nature of donating to a cause.", image: "/images/work/ai-create-review.webp" },
    ],
    images: [
      { src: "/images/work/spotify-concept.webp", alt: "Spotify integration concept" },
      { src: "/images/work/spotify-placement.webp", alt: "Placement options" },
      { src: "/images/work/spotify-placement.webp", alt: "Spotify UI placement", wide: true },
      { src: "/images/work/spotify-flow-desktop.webp", alt: "Tipping flow desktop", wide: true },
      { src: "/images/work/spotify-flow-mobile.webp", alt: "Tipping flow mobile" },
    ],
    nextProject: "whitelabel",
  },
  {
    id: "whitelabel",
    title: "Airline Tour & Activity White-label",
    subtitle: "Lead designer on airline white-label product — 85 airlines approached, 17 launched",
    workDescription: "During my time at TripAdmit, I was the lead designer on the airline white label product.",
    tags: ["UI/UX", "Product Research", "Atomic Design"],
    timeline: "2 years",
    client: "TripAdmit",
    clientLogo: "/logos/tripadmit.svg",
    pillImage: "/images/work/wl-pill.webp",
    headerImage: "/images/work/wl-header.webp",
    mobileImage: "/images/work/wl-mobile.webp",
    toolsImage: "/images/whitelabel-tools.png",
    // liveLink removed - old site shows "Not Active"
    description: "TripAdmit was founded on the belief that tours and activities represent a largely untapped revenue source in the airline industry. These experiences can be sold as ancillary products to travelers during their booking and travel journey, similar to how car rentals, hotel bookings, baggage allowances, and seat selections are offered. Tours and activities were seen as a natural addition to the booking experience.\n\nTripAdmit aimed to capitalise on this opportunity in two ways: by fostering relationships with large online travel agencies such as Viator and GetYourGuide, and by securing partnerships with airlines to provide them with a branded white-label solution integrated into their systems.",
    whatIWorkedOn: ["UI Design", "UX Strategy", "User Interviews", "Product Research", "Customer Success"],
    exploration: "As part of the design process, we conducted a comprehensive study of the entire airline passenger booking journey. This involved mapping out every touchpoint from initial flight search to post-booking management, identifying pain points, and understanding user expectations at each stage. We conducted in-depth interviews with frequent flyers and analysed booking patterns across different demographics. This research provided invaluable insights into user behaviour and preferences, directly informing our design decisions and ensuring the white-label solution would seamlessly integrate into the natural flow of travel planning.",
    challenge: "TripAdmit needed a white-label product that could be seamlessly integrated into airline booking flows, packaging 30,000+ tours and activities in 100+ countries while maintaining each airline's unique brand identity.",
    journeyUnderstanding: "Understanding the passenger journey was critical to TripAdmit's success. Airlines needed to identify the optimal moments throughout the travel experience to present tours and activities as relevant, appealing options rather than intrusive distractions.\n\nThis journey mapping revealed that different passenger segments had varying receptiveness at different stages. Business travelers might engage during pre-departure planning, while leisure travelers often showed interest during the initial booking phase when they were most excited about their trip. By understanding these patterns, TripAdmit could help airlines deliver personalized, contextually relevant offers that enhanced the passenger experience rather than disrupting it.",
    journeyStages: [
      { phase: "Pre-booking phase", text: "When travelers are researching destinations and comparing flight options, their mindset is exploratory and open to inspiration about what they might do at their destination." },
      { phase: "Booking phase", text: "During flight purchase, when ancillary products like baggage and seat selection are traditionally offered, tours could be presented as part of a complete travel package." },
      { phase: "Pre-departure phase", text: "In the weeks and days leading up to travel, passengers are actively planning their itineraries and are highly receptive to activity suggestions." },
      { phase: "In-flight phase", text: "Through in-flight entertainment systems or mobile apps, passengers with time to browse could explore experiences awaiting them at their destination." },
      { phase: "Post-arrival phase", text: "Through mobile notifications or airport communications, last-minute activity bookings could capture spontaneous travelers." },
    ],
    atomicDesignSystem: "I applied atomic design methodology, breaking down the interface into five distinct levels:\n\n**Atoms:** I designed foundational elements such as buttons, icons, typography, color palettes, and input fields to be flexible enough to adopt airline brand colors and fonts while maintaining functional consistency.\n\n**Molecules:** I created simple combinations of atoms, such as search bars with buttons, activity card headers with pricing, and rating displays with review counts. These reusable components ensured common patterns remained consistent.\n\n**Organisms:** I developed more complex components like complete activity cards, filter panels, and booking widgets that formed the major sections of the product catalogue interface.\n\n**Templates:** I designed page-level layouts that defined the structure of search results, activity detail pages, and booking confirmation screens.\n\n**Pages:** I created the final implementation with real content from OTA APIs, demonstrating how the system worked with actual tour and activity data.",
    atomicDesignSystemRight: "By mapping the API response structures to design components, I created a system where new OTA partners could be integrated with minimal design work.\n\nI designed the atomic components to gracefully handle varying data quality, displaying default states when images were unavailable, truncating lengthy descriptions consistently, and managing missing pricing information without breaking the layout.\n\nThis design system approach delivered significant benefits: airlines could launch their branded activity marketplace rapidly, the user experience remained consistent regardless of which OTA provided the underlying content, and the development team could maintain and enhance the platform efficiently across all airline partners simultaneously.",
    displayingTours: "With the atomic design foundation established, I extended the system to create comprehensive templates and pages for TripAdmit's white-label solution. This layer was crucial for delivering a complete, functional booking experience that potential airline partners could immediately understand and envision within their own digital ecosystems.\n\nThe white-label system needed to enable users to seamlessly browse, filter, and book tours and activities with confidence. I designed several core template structures:",
    displayingToursTemplates: [
      "Search Results Page — A responsive grid of activity cards with advanced filtering by category, price, duration, and availability. The layout adapted to show relevant sorting options and displayed real-time availability status.",
      "Activity Detail Page — A comprehensive template presenting all necessary information for booking decisions: image galleries, detailed descriptions, highlights, inclusions and exclusions, meeting point information, cancellation policies, and verified customer reviews.",
      "Booking & Payment Flow — A streamlined checkout process with date selection, participant counts, add-on options, and secure payment integration. The flow was optimised for conversion with progress indicators and trust signals.",
      "Confirmation & Voucher — Post-booking screens with booking summaries, downloadable vouchers, and integration points for email notifications.",
    ],
    activityDetailPage: "I developed a comprehensive template that presented all necessary information for booking decisions: an image gallery, detailed descriptions, highlights, inclusions and exclusions, meeting point information, cancellation policies, and verified customer reviews. The booking widget remained persistently visible, allowing users to select dates and participant numbers without scrolling. We conducted extensive A/B testing with multiple variations of the booking widget to measure which designs were most effective for conversions, iterating on placement, visual prominence, and interaction patterns to optimize booking completion rates.",
    closingTextLeft: "Each template was built to be highly customizable, allowing airlines to inject their brand colors, typography, and visual language while maintaining the underlying functional structure. I created comprehensive page examples using real data from Viator and GetYourGuide APIs, demonstrating how the system performed with actual tour and activity content across various destinations — from London walking tours to Dubai desert safaris.",
    closingTextRight: "The template and page layer completed the atomic design system, transforming abstract components into a cohesive, fully functional booking platform. This approach allowed TripAdmit to demonstrate the complete user experience to prospective airline partners, showing exactly how their passengers would discover, evaluate, and book tours and activities. The system's flexibility meant each airline could see their brand reflected in the experience while TripAdmit maintained a single, efficient codebase across all implementations.",
    stats: [
      { value: "30K+", label: "tours & activities" },
      { value: "100+", label: "countries" },
      { value: "17", label: "airlines launched" },
    ],
    images: [
      { src: "/images/work/admin-designsystem-header.webp", alt: "Atomic design system", wide: true },
      { src: "/images/work/wl-journey.jpg", alt: "Passenger journey map", wide: true },
      { src: "/images/work/wl-displaying-tours.webp", alt: "Displaying tours", wide: true },
      { src: "/images/work/wl-tour-option.webp", alt: "Tour option UI", wide: true },
      { src: "/images/work/wl-design-overview.webp", alt: "Design overview", wide: true },
      { src: "/images/work/wl-ticketing-slider.webp", alt: "Ticketing system slider", wide: true },
    ],
    scalingPartnership: "With a fully developed white-label booking platform, TripAdmit entered an ambitious growth phase focused on securing airline partnerships worldwide. The company's sales and business development teams embarked on a comprehensive tender process, presenting the solution to over 85 airlines across different regions and market segments.\n\nBy the time of the project's conclusion, TripAdmit had successfully launched the white-label solution with approximately 17 airlines — representing roughly 20% of the carriers that had been approached. These implementations spanned various airline types, including low-cost carriers eager to maximize ancillary revenue, regional airlines serving popular tourist destinations, and a few full-service carriers testing the concept with specific routes.",
    scalingVideo: "/videos/trip-admit-reel-vistara.mp4",
    improvingProduct: "I conducted a comprehensive heuristic evaluation of the TripAdmit white label product by analysing its performance across key consumer psychology and UX principles. The evaluation was structured around two primary frameworks:\n\n**Cognitive Biases & Nudging:** I assessed how effectively the product leverages psychological principles such as category heuristics, authority bias, social proof, the power of now, scarcity bias, and the power of free to influence user behaviour and drive conversions.\n\n**Landing Page UX:** I examined the product's visual communication and user experience design, evaluating elements including non-verbal communication, eye tracking patterns, directional cues, white space usage, attention ratio, form design, and checkout flow optimisation.\n\nEach section was scored using spider web evaluations to create a visual representation of the product's strengths and areas for improvement. This structured approach allowed me to identify specific opportunities to enhance user engagement and conversion rates through evidence-based design principles and psychological best practices.",
    improvingProductReportLink: "/docs/UX_Consumer_Psychology_Report_TripAdmit_White_Label_April_2023.pdf",
    nextProject: "booking-app",
  },
  {
    id: "ticketing",
    title: "Ticketing System",
    subtitle: "Ticketing System for the tours and activity sector",
    tags: ["UI/UX", "Product Research"],
    timeline: "TBC",
    pillImage: "/images/work/admin-ticketing.webp",
    headerImage: "/images/work/admin-ticketing.webp",
    description: "Ticketing System developed for the tours and activity sector.",
    comingSoon: true,
  },
  {
    id: "booking-app",
    title: "Booking App & Site",
    subtitle: "Digital transformation of Therapie Clinic — £13m in online sales in first year",
    heroSubtitle: "I led the digital transformation of an international beauty chain by developing and implementing online booking and ecommerce solutions",
    workDescription: "A booking and appointments app for the beauty industry",
    tags: ["UI/UX", "App Design", "E-commerce"],
    timeline: "2 years",
    client: "Therapie Clinic",
    clientLogo: "/images/work/therapie-roundel.webp",
    pillImage: "/images/work/therapie-pill.webp",
    headerImage: "/images/work/therapie-header.webp",
    mobileImage: "/images/work/therapie-pill.webp",
    toolsImage: "/images/work/therapie-tools.webp",
    description: "As the focal point for digital transformation at Therapie Clinic from April 2018 to March 2020, I led the design and implementation of three critical initiatives: a comprehensive booking and appointment scheduling application, a new eCommerce platform for their skincare product range, and the establishment of a digital style guide and component library. These foundational systems enhanced the patient experience whilst setting the groundwork for continued digital innovation across the organisation.",
    whatIWorkedOn: ["UI/UX Design", "Product Research", "Project Management"],
    initialApproach: "Contracted to revitalise project that lacked strategic direction and execution capability, I began by establishing a solid foundation. Through thorough research, I identified and defined the distinct user types engaging with Therapie Clinic's services from first-time enquiries to returning patients seeking specific treatments. Comprehensive requirement gathering sessions with stakeholders across the business enabled me to develop a detailed scope of work and prioritised feature list that aligned technical feasibility with business objectives.\n\nThis groundwork allowed me to map out intuitive user journeys for the booking process, ensuring each touchpoint addressed real user needs while supporting the clinic's operational requirements. The strategic reset transformed a failing project into a structured initiative with clear direction and achievable milestones.",
    componentLibrary: "The component library was built from the ground up, starting with atomic design principles. I catalogued foundational elements such as colour palettes, typography systems, spacing scales, and iconography before progressing to more complex components like form inputs, buttons, cards, and navigation patterns. Each component was meticulously documented with usage guidelines, accessibility considerations, and implementation specifications, ensuring consistency whether designed by myself or implemented by development teams.\n\nThe benefits of this component-driven approach extended far beyond efficiency gains. For Therapie Clinic as an organisation, the component library established a single source of truth for design decisions, reducing ambiguity and enabling faster decision-making. It empowered stakeholders across the business to understand and communicate about digital experiences using a shared vocabulary.",
    launchTraction: "The booking and appointment scheduling application launched in early 2019 to astounding success, immediately validating the strategic approach and extensive groundwork that had preceded it. In its first year alone, the platform generated an additional £13 million in revenue for Therapie Clinic, a remarkable achievement that exceeded all initial projections. Even more significantly, the digital booking channel quickly outpaced traditional walk-in foot traffic across all clinic locations, fundamentally shifting how patients engaged with the business and signalling a permanent transformation in customer behaviour.\n\nA critical factor in this success was the seamless integration with Phorest, the clinic management software used across all Therapie Clinic locations. This integration ensured that bookings made through both the mobile application and web platform were automatically synchronised with the calendars of front-of-house staff and therapists in real-time.",
    ecommerce: "Running parallel to the booking application development, I undertook a comprehensive redesign of Therapie Clinic's existing website, which had become outdated and no longer reflected the premium positioning of the brand. The website refresh required balancing multiple objectives: modernising the visual identity, improving information architecture for better treatment discovery, and preparing the technical foundation for an integrated eCommerce capability that would allow patients to purchase Therapie Clinic's skincare product range directly online.\n\nThe website redesign drew heavily upon the component library being developed for the booking application, ensuring visual and functional consistency across all digital touchpoints.",
    challenge: "Therapie Clinic needed a complete digital transformation — from a traditional walk-in model to a fully integrated online booking and eCommerce platform across multiple international locations.",
    stats: [
      { value: "£13M", label: "in online sales in first year" },
      { value: "Online", label: "bookings overtook foot traffic" },
      { value: "Integrated", label: "App, Site & Phorest software" },
    ],
    images: [
      { src: "/images/work/therapie-journey.png", alt: "User journey map", wide: true },
      { src: "/images/work/therapie-app-screens.webp", alt: "App screens" },
      { src: "/images/work/therapie-artboard.jpg", alt: "Design artboard", wide: true },
      { src: "/images/work/therapie-wireframes.jpg", alt: "Architecture wireframes", wide: true },
      { src: "/images/work/therapie-styleguide.jpg", alt: "iOS Style Guide" },
      { src: "/images/work/therapie-booking.webp", alt: "Booking system", wide: true },
      { src: "/images/work/therapie-highdef.jpg", alt: "High definition renders" },
      { src: "/images/work/therapie-shop.webp", alt: "Shop integration" },
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  workDescription?: string;
  tags: string[];
  timeline: string;
  pillImage: string;
  headerImage: string;
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
  exploration?: string;
  explorationVideo?: string;
  buildingTheFeature?: string;
  launchAnalytics?: { documentation: string[]; analytics: string[] };
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
    id: "ai-reviews",
    title: "AI Assisted Reviews",
    subtitle: "Leveraging AI to increase 5-star reviews by 45% on average",
    workDescription: "I worked with TripAdmit to leverage the power of AI generating reviews for tour and activity providers at the end of their experiences.",
    tags: ["UI/UX", "Project Planning", "Interaction Design", "Analytics"],
    timeline: "3 months",
    client: "TipDirect",
    clientLogo: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/TipDirect_Logo.webp?fit=800%2C196&ssl=1",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/AIPill-2.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/AI_Header-1.webp?fit=4107%2C2089&ssl=1",
    mobileImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/MobileAI.webp?fit=800%2C764&ssl=1",
    toolsImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Tools-1.webp?fit=800%2C115&ssl=1",
    liveLink: "https://tip.direct/platform-admin/",
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
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/AIReview_Steps.webp?fit=4500%2C2007&ssl=1", alt: "AI Review Steps", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/02/NFC.webp?fit=800%2C741&ssl=1", alt: "NFC tap" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/02/Create.webp?fit=800%2C741&ssl=1", alt: "Create review" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/02/Review.webp?fit=800%2C741&ssl=1", alt: "Review output" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Group-4.webp?fit=800%2C800&ssl=1", alt: "Group overview" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Mixpanel_Report.webp?fit=4062%2C2169&ssl=1", alt: "Mixpanel analytics report", wide: true },
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
    clientLogo: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/TipDirect_Logo.webp?fit=800%2C196&ssl=1",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2024/09/Pill2.webp?fit=800%2C800&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Tipping_HeaderProfile.webp?fit=4107%2C2089&ssl=1",
    mobileImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Tipping-Profile-1.webp?fit=800%2C942&ssl=1",
    toolsImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Tools-1.webp?fit=800%2C115&ssl=1",
    liveLink: "https://tip.direct/",
    description: "TipDirect aims to transform the tipping experience in the travel industry by providing a seamless, digital solution for visitors to show appreciation to their guides. This innovative platform leverages cutting-edge technology to create a user-friendly, efficient, and secure tipping system.\n\nBy digitizing the tipping process, we seeked to enhance the overall travel experience, fostering stronger connections between visitors and guides while streamlining financial transactions in the tourism sector.",
    challenge: "In today's world, visitors to tourist attractions are increasingly going cashless. We were tasked with developing an easy-to-use, mobile solution that would allow tour guides to collect tips and reviews from groups at the end of their tours.\n\nTo accomplish this, we leveraged multiple methods for sharing a guide's profile on the go: NFC cards, QR codes, and shareable links.\n\nBy implementing quick tip options and integrating popular digital payment methods like Apple Pay and Google Pay, we simplified the tipping process. This reduced the cognitive load on visitors, making it a quicker and easier decision when they're on the move.",
    exploration: "From customer interviews and shadowing, we quickly determined that tour guides required multiple ways of sharing their profiles with varying group sizes. For this reason, we chose to employ three methods. Crucially, once any of these methods had been used to access a profile, it was imperative that the tipping user didn't have to deduce what was being asked of them.\n\nFacial ID payments drastically reduce the time required to make an impulsive payment decision, while contactless payments appear 15% less to the tipper than if they were to leave gratuity in cash. After the tip, we aimed to leverage a captivated, satisfied audience by prompting them to leave a review, engage with the company's social media channels, or avail themselves of another experience by booking with a promo code.",
    sharingMethods: ["NFC cards", "QR codes", "Shareable links"],
    buildingTheFeature: "TipDirect offers multiple tipping methods through its platform: links, QR codes, and NFC-enabled cards. To ensure a consistent user experience, we designed an identical payment flow regardless of which method a guide shares with their customer. We prioritised convenient \"on-the-go\" tipping by prominently featuring Google Pay and Apple Pay options. Once a customer completes their tip, we leverage this engagement moment to request a review—a feature that eventually expanded to include social media prompts and upsell opportunities.",
    tippingFlow: "The tipping flow is straightforward: the guide presents one of their tipping methods to the guest, who then follows the provided link to a screen where they can choose their tip amount.\n\nAfter completing the transaction, guests are prompted to leave a review of their tour with help from an AI assistant.\n\nWe deliberately designed the flow to be as quick as possible for users on the go.\n\nWhen a tour guide uses the platform for the first time, there's no need to set up a preferred payout method initially. After receiving their first tip, guides get an email prompting them to set up their payout preferences. All subsequent tips are then paid directly to the guide through their chosen method.",
    tippingFlowGif: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Flow.gif?fit=622%2C1024&ssl=1",
    designSystemLinks: [
      { label: "Design System", url: "https://tipdirect-design.com/" },
      { label: "Components", url: "https://www.figma.com/design/kvqj5raBxuBkAxibfK1BFi/TipDirect_StyleGuide?node-id=53-82&t=PXzTHBWZl3BJ88Cx-1" },
    ],
    launchAnalytics: {
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
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Tech.webp?fit=800%2C800&ssl=1", alt: "Tech stack" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/SurveyExample%401x-1.jpg?fit=595%2C595&ssl=1", alt: "Survey example" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Mindmap-Example%401x-1.jpg?fit=595%2C595&ssl=1", alt: "Mind map" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/RD-Example%401x-1.jpg?fit=595%2C595&ssl=1", alt: "Research document" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2024/09/Screenshot-2024-09-24-at-22.00.12.png?fit=800%2C325&ssl=1", alt: "User flow", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Stats2.webp?fit=800%2C373&ssl=1", alt: "Stats overview", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Stats1.webp?fit=800%2C373&ssl=1", alt: "Stats detail 1", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Stats3.webp?fit=800%2C373&ssl=1", alt: "Stats detail 2", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Stats4.webp?fit=800%2C373&ssl=1", alt: "Stats detail 3", wide: true },
    ],
    nextProject: "admin-dashboard",
  },
  {
    id: "admin-dashboard",
    title: "Admin Dashboard",
    subtitle: "A comprehensive admin platform processing €6,000,000+ in tips",
    workDescription: "We built a dashboard for the TipDirect platform, providing customers with all the tools needed to facilitate digital tipping.",
    tags: ["UI/UX", "Project Planning", "Interaction Design", "Analytics"],
    timeline: "Ongoing",
    client: "TipDirect",
    clientLogo: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/TipDirect_Logo.webp?fit=800%2C196&ssl=1",
    challengeImageRight: true,
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/AdminDashboard.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/TipDirectHeader_Web-2.webp?fit=4018%2C2426&ssl=1",
    mobileImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/TipDirect_headerMobileWeb.webp?fit=655%2C1024&ssl=1",
    toolsImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Tools-1.webp?fit=800%2C115&ssl=1",
    liveLink: "https://eu.tip.direct/signup",
    description: "The TipDirect Admin Dashboard serves as the central management interface for company administrators to oversee and control platform operations. This comprehensive tool is designed to streamline the onboarding and management processes for tour guides and platform resources.\n\nThe dashboard implements role-based access control to provide different functionality and views based on user types.",
    challenge: "In today's cashless society, tour guides face a key challenge: travelers rarely carry local currency, hindering the tipping system many guides depend on. Tour companies also lack efficient ways to collect customer reviews. To address these challenges we built TipDirect, a digital tipping and review collection platform.\n\nOur vision goes beyond solving payment and review collection issues; we aimed to build a community where guides share workloads and opportunities in a connected tourism ecosystem.\n\nTo realise this, we needed a unified platform for both tour admins and their guides.",
    whatIWorkedOn: ["Research", "UX Strategy", "Project Planning", "UI Design", "Design System", "Growth Strategy"],
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
        image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/UX_InitalPhases-3.webp?fit=8471%2C3855&ssl=1",
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
        image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Gantt_TipDirect.webp?fit=800%2C421&ssl=1",
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
        image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/DevHandoff.webp?fit=5555%2C2764&ssl=1",
      },
      {
        num: "06",
        title: "UAT, Launch & Measurement",
        text: "The User Acceptance Testing (UAT) phase for TipDirect employed a structured approach managed through a ClickUp kanban board, allowing for transparent tracking of issues and feature validation. Prior to launch, we established key performance indicators derived from our initial brief, including user adoption rates, average tip amount, review submission percentage, and guide retention metrics.",
        outcomes: "As a result of our meticulous planning and implementation, the product remained agile and easy to build upon. TipDirect itself achieved remarkable outcomes within its first years. The platform processed thousands of tips totaling more than €6,000,000 in value, the platform continues to enjoy steady growth as it moves into new markets.",
        image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/UAT-Launch.webp?fit=7401%2C4131&ssl=1",
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
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/TourGuides.webp?fit=800%2C979&ssl=1", alt: "Tour Guides" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/UX_InitalPhases.webp?fit=8471%2C3855&ssl=1", alt: "UX Initial Phases", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/TicketingSystem.webp?fit=800%2C517&ssl=1", alt: "Ticketing System", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/DesignSystem_header.webp?fit=7401%2C4131&ssl=1", alt: "Design System", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Colour.webp?fit=800%2C787&ssl=1", alt: "Colour palette" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Typography.webp?fit=800%2C787&ssl=1", alt: "Typography" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Components.webp?fit=4107%2C2089&ssl=1", alt: "Components", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Dashboard-1.webp?fit=800%2C741&ssl=1", alt: "Dashboard" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/GetTips.webp?fit=800%2C741&ssl=1", alt: "Get Tips" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Profile-1.webp?fit=800%2C741&ssl=1", alt: "Profile" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Group-12.webp?fit=800%2C741&ssl=1", alt: "Payments" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Group-11.webp?fit=800%2C741&ssl=1", alt: "Setup" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Group-10.webp?fit=800%2C741&ssl=1", alt: "Reports" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Users-1.webp?fit=800%2C741&ssl=1", alt: "Users" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Resources-1.webp?fit=800%2C741&ssl=1", alt: "Resources" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Settings.webp?fit=800%2C741&ssl=1", alt: "Settings" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Group-16.webp?fit=7263%2C4866&ssl=1", alt: "Full platform overview", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/DevHandoff.webp?fit=5555%2C2764&ssl=1", alt: "Dev handoff", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/UAT-Launch.webp?fit=7401%2C4131&ssl=1", alt: "UAT & Launch", wide: true },
    ],
    nextProject: "website-tipdirect",
  },
  {
    id: "website-tipdirect",
    title: "Website: TipDirect",
    subtitle: "Designing and developing the TipDirect marketing website",
    heroSubtitle: "A case study of the development and launch of the TipDirect website",
    workDescription: "Using Elementor on WordPress, I created a new marketing website for the TipDirect platform.",
    tags: ["UI/UX", "Web Dev"],
    timeline: "2 months",
    client: "TipDirect",
    clientLogo: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/TipDirect_Logo.webp?fit=800%2C196&ssl=1",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Website.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Web_Web.webp?fit=4107%2C2089&ssl=1",
    mobileImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Web_Mobile.webp?fit=800%2C755&ssl=1",
    toolsImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Group-22.webp?fit=800%2C138&ssl=1",
    liveLink: "https://tip.direct/",
    description: "I designed and developed the TipDirect website using WordPress with Elementor as the primary page builder, carefully crafting a distinct visual identity that maintained its own unique character while acknowledging its origins as a TripAdmit spinoff. The site was implemented with responsive design principles ensuring mobile-first functionality, and I created custom widgets and templates to establish a fresh, independent brand presence throughout.",
    vimeoEmbed: "https://player.vimeo.com/video/1086437551",
    whatIWorkedOn: ["Web Development", "Launch Strategy", "SEO", "Branding"],
    newSkills: "Taking on the TipDirect website project marked a significant milestone in my professional development as a designer. Though WordPress is often seen as a simpler solution than custom development, leading this project from start to finish pushed me to expand my skills and creative horizons.\n\nThe project challenged me to make key technical decisions independently, a responsibility that helped me step outside my comfort zone. Rather than defaulting to image-based solutions where I felt most confident, I challenged myself to build reusable components wherever possible.",
    componentFocused: "The project challenged me to make key technical decisions independently, a responsibility that helped me step outside my comfort zone. Rather than defaulting to image-based solutions where I felt most confident, I challenged myself to build reusable components wherever possible.",
    images: [
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/TipDirect_CTA-1.webp?fit=4172%2C2249&ssl=1", alt: "CTA section", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/TipDIrect_Components-1.webp?fit=2372%2C2241&ssl=1", alt: "Component library", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Web_Mobile-1.webp?fit=2372%2C2241&ssl=1", alt: "Mobile responsive views", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/TipDirect_SuccessStories-1.webp?fit=4172%2C2249&ssl=1", alt: "Success stories section", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Group-22-2.webp?fit=800%2C752&ssl=1", alt: "Tools & tech stack" },
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
    clientLogo: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/TipDirect_Logo.webp?fit=800%2C196&ssl=1",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/TipDirect_App.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/TipDIrect_App_Header.webp?fit=4107%2C2089&ssl=1",
    mobileImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/WL_BannerMobileWeb.webp?w=800&ssl=1",
    toolsImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Tools-1.webp?fit=800%2C115&ssl=1",
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
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/Screenshot-2025-11-04-at-16.38.09.png?fit=1901%2C961&ssl=1", alt: "Information architecture", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/Group-21.webp?fit=3615%2C1259&ssl=1", alt: "App overview", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/Pill5.webp?fit=800%2C1014&ssl=1", alt: "Payment Links" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/Pill3.webp?fit=800%2C1014&ssl=1", alt: "Tipping Groups" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/Pill1.webp?fit=800%2C1014&ssl=1", alt: "Tiered Plans" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/Pill2.webp?fit=800%2C1014&ssl=1", alt: "Voice Reviews" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/Pill4.webp?fit=800%2C1014&ssl=1", alt: "Analytics" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/11/Pill6.webp?fit=800%2C1014&ssl=1", alt: "Group Management" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Colour.webp?fit=800%2C787&ssl=1", alt: "Colour system" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/Typography.webp?fit=800%2C787&ssl=1", alt: "Typography system" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/09/TourGuides.webp?fit=800%2C979&ssl=1", alt: "Tour guides" },
    ],
    nextProject: "spotify",
  },
  {
    id: "spotify",
    title: "Spotify Tipping Integration",
    subtitle: "RFP design for integrating digital tipping into Spotify",
    workDescription: "TipDirect explored a request for proposal (RFP) for integrating tipping into the Spotify platform.",
    tags: ["UI/UX", "Integration"],
    timeline: "N/A",
    client: "Spotify",
    clientLogo: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2024/11/SpotifyLogo.webp?fit=800%2C240&ssl=1",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/Spotify.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/SpotifyHeader_Web.webp?fit=4107%2C2089&ssl=1",
    mobileImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/SpotifyHeader_Mobile.webp?fit=800%2C825&ssl=1",
    description: "The TipDirect integration on the Spotify platform is designed to empower users to express their appreciation directly and provide meaningful financial support for content creators who enrich their listening experience on the audio streaming platform. This innovative feature aims to create a more direct connection between listeners and artists, enabling a new way for fans to contribute to the success and sustainability of their favourite content creators while enjoying their work on Spotify.\n\nWe embarked on a meticulous process of deconstructing the TipDirect platform, carefully analyzing and stripping back its components to their most fundamental elements. This methodical approach was essential to ensure a seamless integration with Spotify's existing user interface architecture.\n\nWhile our previous experience with Whitelabel integrations had provided valuable insights into platform integration methodologies, we recognized that incorporating the TipDirect platform in a subtle and unobtrusive manner would present unique challenges that would require innovative solutions and careful consideration of user experience design principles.",
    explorationDetail: "Our primary challenge was determining the optimal placement of the tipping integration—whether within a Spotify artist's profile or alongside a currently playing song. The player interface already contained numerous functional elements, and adding a tipping button prominently in the center would likely frustrate users. Therefore, we decided to avoid placing the tipping prompt within the initial viewport of the user's screen.\n\nFortunately, the solution for prompt placement was found further down the screen. Spotify already encourages users to explore artists through features like lyrics, videos, artist information, and ticket sales in the second-page fold. This section proved to be the ideal location for our tipping prompt.",
    solutionDetail: "Our primary challenge was determining the optimal placement of the tipping integration. The player interface already contained numerous functional elements, and adding a tipping button prominently in the center would likely frustrate users.\n\nFortunately, the solution for prompt placement was found further down the screen. Spotify already encourages users to explore artists through features like lyrics, videos, artist information, and ticket sales in the second-page fold. This section proved to be the ideal location for our tipping prompt, a module placed just below the main UI was the selected placement.",
    whatIWorkedOn: ["UI Design", "Presentation"],
    tippingFlow: "The tipping flow integrates seamlessly into the Spotify experience, allowing listeners to tip artists directly from the platform.",
    alternativeIntegrations: [
      { title: "Artist Profile", desc: "Within the artist's profile, there is a monthly listeners module that includes information such as links to social media. This placement would be ideal since users viewing this section are highly engaged with the artist and more likely to tip.", image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2024/11/Alt_Step2.png?fit=499%2C1024&ssl=1" },
      { title: "Track Dropdown", desc: "Each track on Spotify has a dropdown menu with additional options. Adding a tipping option here would be a subtle way to include it in every artist's profile.", image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2024/11/Alt_Step3.png?fit=499%2C1024&ssl=1" },
      { title: "Spotify Stories", desc: "Spotify's new Stories feature, designed to increase user engagement on the platform, could highlight TipDirect's charitable aspect. We believe this would be an ideal placement that emphasizes the altruistic nature of donating to a cause.", image: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2024/11/Alt_Step1.png?fit=499%2C1024&ssl=1" },
    ],
    images: [
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/Group-7.webp?fit=800%2C944&ssl=1", alt: "Spotify integration concept" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/03/Group-12.webp?fit=800%2C754&ssl=1", alt: "Placement options" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2024/11/Screenshot-2024-11-26-at-16.52.53.png?fit=800%2C154&ssl=1", alt: "Spotify UI placement", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2024/12/Group-13.webp?fit=800%2C425&ssl=1", alt: "Tipping flow desktop", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2024/12/Group-13-1.webp?fit=548%2C1024&ssl=1", alt: "Tipping flow mobile" },
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
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/AirlineWhitelabel.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Whitelabel_Header.webp?fit=4107%2C2358&ssl=1",
    mobileImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/MobileWhitelabel.webp?fit=648%2C1024&ssl=1",
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
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Atoms_Molecules_Organisms3-2.webp?fit=4107%2C2089&ssl=1", alt: "Atomic design system", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/05/Airline-Passenger-User-Journey-Map.jpg?fit=3047%2C1550&ssl=1", alt: "Passenger journey map", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/DisplayingTours.webp?fit=800%2C532&ssl=1", alt: "Displaying tours", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/WL_TourOption.webp?fit=800%2C607&ssl=1", alt: "Tour option UI", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Group-10.webp?fit=4107%2C2089&ssl=1", alt: "Design overview", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/TicketingSystem_Slider.webp?fit=2383%2C496&ssl=1", alt: "Ticketing system slider", wide: true },
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
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/TicketingSystem_PillMobileWeb.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/TicketingSystem_PillMobileWeb.webp?fit=800%2C741&ssl=1",
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
    clientLogo: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Roundel_Colour-3.webp?fit=300%2C252&ssl=1",
    pillImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Therapie_PillMobileWeb.webp?fit=800%2C741&ssl=1",
    headerImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Group-16.webp?fit=4107%2C2089&ssl=1",
    mobileImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Therapie_PillMobileWeb.webp?fit=800%2C741&ssl=1",
    toolsImage: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/tools.webp?fit=800%2C238&ssl=1",
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
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Group.png?fit=12872%2C3211&ssl=1", alt: "User journey map", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Group-3.webp?fit=800%2C610&ssl=1", alt: "App screens" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Artboard.jpg?fit=800%2C394&ssl=1", alt: "Design artboard", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/ArchWireframes-1.jpg?fit=800%2C565&ssl=1", alt: "Architecture wireframes", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/iOS-Style-Guide.jpg?fit=559%2C1024&ssl=1", alt: "iOS Style Guide" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/TherapieBooking_Group-2.webp?fit=4107%2C2089&ssl=1", alt: "Booking system", wide: true },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/HighDef.jpg?fit=800%2C780&ssl=1", alt: "High definition renders" },
      { src: "https://i0.wp.com/lacunadigital.io/wp-content/uploads/2025/10/Therapie_PillShop.webp?fit=1712%2C2339&ssl=1", alt: "Shop integration" },
    ],
  },
];

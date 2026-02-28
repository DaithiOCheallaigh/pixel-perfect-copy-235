import React from "react";

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: React.ReactNode;
}

export const blogPosts: BlogPost[] = [
  {
    id: "navigating-design-2025",
    title: "Navigating Design in 2025: Challenges and Opportunities in a Transformed Industry",
    date: "October 22, 2025",
    readTime: "5 min read",
    image: "/images/blog/navigating-design-2025.webp",
    excerpt: "The design industry stands at a fascinating crossroads in 2025. Exploring the perfect storm of 5 challenges and 8 strategies for designers to thrive.",
    content: (
      <>
        <p>The design industry stands at a fascinating crossroads in 2025. After years of unprecedented growth, rapid technological advancement, and shifting cultural expectations, designers face a landscape that's simultaneously more challenging and more opportunity-rich than ever before. Let's explore the key challenges shaping our field and how designers can not just survive, but thrive in this evolving environment.</p>

        <h2>The Perfect Storm: Understanding Today's Challenges</h2>

        <h3>The AI Reckoning</h3>
        <p>Artificial intelligence has moved from novelty to necessity faster than most predicted. AI tools can now generate interfaces, create brand identities, and produce design variations in seconds. Whilst this hasn't replaced designers—as many feared—it has fundamentally changed what being a designer means. The uncomfortable truth is that purely executional design work is increasingly commoditised. Designers who position themselves as pixel-pushers rather than strategic thinkers are finding their value proposition eroded.</p>

        <h3>Economic Uncertainty and the "Efficiency Era"</h3>
        <p>The tech industry's contraction has rippled through the entire design ecosystem. Companies that once maintained large, specialised design teams are consolidating. The era of growth at all costs has given way to what some call the "efficiency era"—doing more with less. Design roles are being eliminated or transformed into hybrid positions requiring proficiency in product management, research, and data analysis alongside traditional design skills.</p>

        <h3>The Paradox of Accessibility</h3>
        <p>Design tools have never been more accessible. Figma, Canva, and AI assistants have democratised design creation, which is wonderful for humanity but challenging for professionals. When anyone can create something that looks "good enough," designers must articulate their value beyond aesthetics. The barrier to entry has lowered dramatically, intensifying competition whilst raising the bar for what constitutes truly excellent design work.</p>

        <h3>Sustainability and Ethical Complexity</h3>
        <p>Designers in 2025 can no longer ignore the broader impact of their work. Questions about dark patterns, attention economy ethics, environmental impact, and inclusive design have moved from nice-to-haves to essential considerations. This adds complexity to every decision and requires designers to become versed in ethics, psychology, and systems thinking.</p>

        <h3>Remote Work's Hidden Costs</h3>
        <p>Whilst remote work offers flexibility, it has also fragmented the spontaneous collaboration and mentorship that once defined design culture. Junior designers struggle to learn through osmosis. Teams lose the creative spark of in-person brainstorming. Building a personal brand and network feels simultaneously more important and more difficult when everyone is a Zoom rectangle.</p>

        <h2>The Designer's Response: Adapting Without Losing Your Soul</h2>
        <p>Despite these challenges, 2025 also presents unprecedented opportunities for designers willing to evolve. Here's how to navigate this landscape:</p>

        <h2>Embrace Strategic Thinking</h2>
        <p>The most resilient designers are those who've expanded beyond craft into strategy. This means deeply understanding business metrics, user psychology, and market dynamics. Learn to speak the language of impact: How does your design work drive retention? Reduce support costs? Increase conversion? When you can connect design decisions to business outcomes, you become indispensable.</p>
        <p>Start attending strategy meetings. Ask questions about OKRs and KPIs. Read business books alongside design publications. Your goal isn't to become a business person, but to position design as a strategic lever rather than a service function.</p>

        <h2>Partner With AI, Don't Compete</h2>
        <p>Fighting AI is futile. Instead, learn to wield it as a superpower. Use AI for rapid ideation, creating variations, handling repetitive tasks, and exploring possibilities you might not have considered. This frees you to focus on what humans do best: understanding nuanced emotional needs, making judgement calls in ambiguous situations, and crafting experiences with soul and meaning.</p>
        <p>The designers thriving in 2025 aren't those with the best Photoshop skills—they're those who can prompt-engineer their way through dozens of concepts in an hour, then apply human judgement to refine and perfect the most promising directions.</p>

        <h2>Develop T-Shaped Expertise</h2>
        <p>The generalist-specialist debate is over. The answer is both. Develop deep expertise in one area, perhaps motion design, design systems, or UX research, whilst building competency across adjacent disciplines. Learn enough code to collaborate effectively with engineers. Understand data analysis to validate your decisions. Grasp the basics of product management to advocate for users within business constraints.</p>
        <p>This T-shaped approach makes you valuable as both a specialist who can solve hard problems and a collaborator who can work across disciplines.</p>

        <h2>Build in Public</h2>
        <p>In a fragmented, remote-first world, visibility is currency. Share your process, insights, and work publicly. Write case studies that focus on thinking rather than final pixels. Post design teardowns on LinkedIn. Contribute to design communities. Start a newsletter or YouTube channel exploring design topics you're passionate about.</p>
        <p>This isn't about self-promotion, it's about contributing to the collective knowledge whilst building a professional presence that transcends any single company. When the next wave of redundancies comes (and in this economy, there will be more), your public body of work becomes your safety net.</p>

        <h2>Prioritise Systems Over Screens</h2>
        <p>As organisations flatten and teams shrink, systems thinking becomes essential. Rather than designing individual screens, focus on creating scalable design systems, establishing principles, and building frameworks that empower others to make good design decisions without you. This multiplies your impact and positions you as infrastructure rather than overhead.</p>
        <p>Document everything. Create component libraries. Write design principles. Build tools that help non-designers make design decisions. Make yourself valuable by making others capable.</p>

        <h2>Commit to Continuous Learning</h2>
        <p>The half-life of design skills is shorter than ever. What you learnt two years ago may already be outdated. Cultivate a learning mindset. Set aside time weekly for skill development. Explore emerging tools. Study adjacent fields like behavioural psychology, cognitive science, and systems thinking.</p>
        <p>Consider that your competition isn't just other designers—it's AI, templates, and automation. Your only sustainable advantage is your ability to learn, adapt, and apply knowledge in novel ways.</p>

        <h2>Find Your Niche</h2>
        <p>In an overcrowded field, specialisation creates opportunity. Rather than being a "product designer," become "the product designer who specialises in complex B2B workflows for healthcare systems" or "the designer who makes financial products accessible to non-English speakers." Specificity attracts opportunity and allows you to charge premium rates because you offer rare, valuable expertise.</p>

        <h2>Advocate for Design's Value</h2>
        <p>With design teams shrinking, every designer must become an advocate for design thinking within their organisation. This means documenting impact, presenting to leadership, building cross-functional relationships, and educating stakeholders about design's strategic value.</p>
        <p>Don't wait for a seat at the table, demonstrate why design perspective is essential to business success. Build allies in product, engineering, and business teams. Make design's value visible and measurable.</p>

        <h2>Looking Forward: The Opportunity in Crisis</h2>
        <p>Yes, 2025 presents real challenges for designers. The industry has matured, competition has intensified, and technology has disrupted traditional workflows. But challenges create opportunity for those willing to adapt.</p>
        <p>The designers who will thrive aren't necessarily the most talented in traditional terms. They're the most adaptable, strategic, and business-savvy. They're the ones who view AI as a tool rather than a threat, who can articulate design's value in business terms, and who've built skills and networks that transcend any single role or company.</p>
        <p>The old model of being a specialist in visual craft is dying. What's emerging is more interesting: designers as strategic thinkers, systems builders, and cross-functional leaders who happen to use design as their primary medium for creating value.</p>
        <p>This transformation is uncomfortable. It requires learning new skills, adopting new mindsets, and sometimes doing work that doesn't feel like "real design." But on the other side of this discomfort lies a more mature, more valuable, and ultimately more fulfilling version of what it means to be a designer.</p>
        <p>The industry isn't dying, it's evolving. And evolution, whilst challenging, ultimately strengthens those who adapt. Welcome to design in 2025. It's harder than before, but also more important than ever.</p>
      </>
    ),
  },
  {
    id: "strategic-ux",
    title: 'Why Your Digital Product Needs More Than Just "Good Design"',
    date: "October 22, 2025",
    readTime: "5 min read",
    image: "/images/blog/strategic-ux.webp",
    excerpt: 'Great design isn\'t decoration — it\'s problem-solving with pixels. "What problem are we solving?" not "What colours do you like?"',
    content: (
      <>
        <p>As a UI/UX designer, I've lost count of how many times I've heard: "We just need it to look good."</p>
        <p>And while aesthetics matter—nobody wants to use an ugly app—there's a fundamental misunderstanding happening here. Great design isn't decoration. It's problem-solving with pixels.</p>

        <h2>The Real Job of UI/UX Design</h2>
        <p>When I start a new project, my first question isn't "What colours do you like?" It's "What problem are we solving for your users?"</p>
        <p>Take a recent project I worked on with TipDirect. The brief wasn't to create a pretty tipping interface. The real challenge was addressing a cultural shift: people don't carry cash anymore. Service workers were losing out on tips, and customers felt awkward about it.</p>
        <p>The design solution needed to:</p>
        <ul>
          <li>Remove friction from the tipping process</li>
          <li>Feel trustworthy and legitimate</li>
          <li>Work seamlessly in real-world service environments</li>
          <li>Actually increase tips, not just digitize existing behaviour</li>
        </ul>
        <p>The result? A 45% average increase in 5-star reviews. Not because the interface "looked nice," but because it solved a genuine problem for everyone involved.</p>

        <h2>The Strategy Before the Pixels</h2>
        <p>Every project begins with understanding your vision—but more importantly, understanding your users' needs. Here's my approach:</p>
        <p><strong>1. Listen More Than You Design</strong> The best insights come from conversations, not assumptions. What keeps your users up at night? What makes them abandon their cart? Where do they get confused?</p>
        <p><strong>2. Challenge the Brief</strong> Sometimes what a client thinks they need isn't what will actually move the needle. My job is to push back constructively and explore alternatives that might work better.</p>
        <p><strong>3. Design for Outcomes, Not Outputs</strong> A beautiful landing page means nothing if it doesn't convert. A slick app is worthless if users can't complete their tasks. I measure success by business results, not just portfolio pieces.</p>

        <h2>Why Collaboration Beats Perfection</h2>
        <p>I'm not precious about my designs. In fact, some of my best work has come from collaborative feedback and being willing to pivot.</p>
        <p>One client recently mentioned they appreciated my willingness to provide "valuable feedback, even if it meant suggesting something different from what they initially wanted." That's because I'm not here to execute your exact specifications—I'm here to help you succeed.</p>
        <p>Good design is iterative. It's messy. It involves testing, failing, learning, and improving. The designers who can't handle that feedback loop are the ones producing work that looks great in Dribbble but fails in the real world.</p>

        <h2>Standing Out in a Competitive Landscape</h2>
        <p>Today's digital landscape is crowded. Your competitors are probably pretty good too. So how do you differentiate?</p>
        <p>Not through trendy gradients or the latest micro-interactions (though those have their place). You stand out by deeply understanding your users and solving their problems better than anyone else.</p>
        <p>Purpose-driven design resonates because it connects with real human needs. It's the difference between a product people use and a product people love.</p>

        <h2>The Bottom Line</h2>
        <p>If you're looking for someone to "make it pretty," you don't need a UI/UX designer—you need a graphic designer (and that's a perfectly valid need).</p>
        <p>But if you're looking to:</p>
        <ul>
          <li>Increase conversions</li>
          <li>Improve user satisfaction</li>
          <li>Reduce support tickets</li>
          <li>Drive business growth through strategic design</li>
        </ul>
        <p>Then you need someone who sees design as a business tool, not an art project.</p>
        <p>Great design solves problems. Everything else is just decoration.</p>
        <p className="italic text-muted-foreground mt-8">I am a freelance UI/UX designer focused on creating purpose-driven digital experiences that drive business results. Based in Ireland, I help businesses stand out through strategic design thinking and user-centered solutions.</p>
        <p className="italic text-muted-foreground">Want to discuss your project? Let's talk about the problems you're trying to solve.</p>
      </>
    ),
  },
  {
    id: "design-trends-2025",
    title: "Design Trends to Watch in 2025: Shaping the Future of Digital Aesthetics",
    date: "November 21, 2024",
    readTime: "8 min read",
    image: "/images/blog/design-trends-2025.webp",
    excerpt: "As we approach 2025, design evolves at an unprecedented pace. Exploring 9 key trends from immersive 3D experiences to ethical and inclusive design.",
    content: (
      <>
        <h2>Overview</h2>
        <p>As we approach 2025, the world of design is evolving at an unprecedented pace. Influenced by technological advancements, societal shifts, and changing user expectations, the design landscape is set to undergo significant transformations. Let's explore the key design trends that are poised to dominate in 2025 and beyond.</p>

        <h2>1. Immersive 3D Experiences</h2>
        <p>With the rapid advancement of augmented reality (AR) and virtual reality (VR) technologies, immersive 3D experiences are set to revolutionize web and app design in unprecedented ways. Designers will push the boundaries of creativity, crafting highly interactive and captivating interfaces that seamlessly merge the digital realm with our physical surroundings.</p>
        <p>These cutting-edge designs will not only engage users on a visual level but also create multi-sensory experiences that challenge our perception of reality. As the line between the virtual and physical worlds becomes increasingly blurred, users will find themselves immersed in rich, dynamic environments that respond to their actions and adapt to their preferences in real-time.</p>

        <h2>2. Sustainable and Eco-Friendly Design</h2>
        <p>As environmental concerns continue to gain prominence, sustainable design practices will become increasingly important in the digital realm. This trend will manifest in various ways, including the adoption of eco-friendly color palettes that evoke nature and promote a sense of environmental consciousness.</p>
        <p>Furthermore, there will be a growing emphasis on designs that promote energy efficiency in digital products, such as optimizing layouts and graphics to reduce power consumption on devices. This shift towards sustainable design not only aligns with global environmental goals but also resonates with environmentally-conscious consumers.</p>

        <h2>3. AI-Powered Personalization</h2>
        <p>Artificial Intelligence will play a pivotal role in revolutionizing user experiences through hyper-personalization. As AI algorithms become more sophisticated, they will analyze vast amounts of user data in real-time, including browsing history, interaction patterns, and contextual information.</p>
        <p>For instance, AI-powered systems might adjust color schemes based on a user's mood, reorganize content layouts to prioritize frequently accessed information, or even predict and preemptively display relevant options before the user actively seeks them.</p>

        <h2>4. Neomorphism 2.0</h2>
        <p>Building on the neomorphism trend, we'll witness a more sophisticated and practical application of soft UI elements in 2025. This evolved style will seamlessly blend the tactile feel of neomorphism with enhanced usability and accessibility features.</p>
        <p>This advanced approach will strike a delicate balance between aesthetic appeal and functional design, addressing previous criticisms of neomorphism's potential usability challenges. By incorporating more contrast and clearer visual hierarchies, Neomorphism 2.0 will offer users an intuitive, visually pleasing experience that feels both modern and familiar.</p>

        <h2>5. Micro-Interactions and Animations</h2>
        <p>Subtle animations and micro-interactions will evolve into more sophisticated and purposeful design elements in 2025. These refined visual cues will play a crucial role in enhancing user engagement and providing a more intuitive navigation experience.</p>
        <p>Importantly, this evolution in design will prioritize performance optimization, ensuring that these enhanced interactive features do not compromise loading times or overall system responsiveness.</p>

        <h2>6. Voice User Interfaces (VUI)</h2>
        <p>As voice-activated devices become increasingly ubiquitous in our daily lives, designers are shifting their focus towards creating seamless and intuitive voice user interfaces (VUIs). This evolving design paradigm goes beyond mere voice recognition, encompassing a holistic approach that harmoniously blends auditory and visual elements.</p>
        <p>This multi-modal approach ensures that users receive clear feedback through both auditory and visual channels, thereby reducing cognitive load and potential frustrations associated with voice-only interactions.</p>

        <h2>7. Dark Mode Evolution</h2>
        <p>Dark mode will continue to evolve beyond simple color inversion, ushering in a new era of sophisticated and nuanced design approaches. Designers will delve deeper into the realm of color theory and visual perception to create dark themes that are not only visually striking but also highly functional and energy-efficient.</p>
        <p>This evolution will involve the careful exploration of diverse color palettes, each meticulously crafted to maintain optimal readability while reducing eye strain in low-light environments.</p>

        <h2>8. Brutalism Meets Minimalism</h2>
        <p>A captivating fusion of brutalist web design and minimalism is set to emerge, creating a unique aesthetic that combines the raw, exposed elements characteristic of brutalism with the clean, purposeful layouts of minimalism.</p>
        <p>This hybrid approach will particularly appeal to brands seeking to differentiate themselves in a crowded digital landscape, offering a fresh and daring visual identity that commands attention.</p>

        <h2>9. Ethical and Inclusive Design</h2>
        <p>In 2025, the design community will witness a significant shift towards creating more inclusive and ethically-conscious digital experiences. This evolution will be characterized by a heightened focus on developing designs that are truly accessible to all users, regardless of their physical abilities, cognitive differences, or cultural backgrounds.</p>
        <p>Simultaneously, ethical considerations in design choices will transition from being an afterthought to becoming a fundamental aspect of the design process. Designers will proactively address potential ethical implications of their work, considering factors such as data privacy, algorithmic bias, and the broader societal impact of their designs.</p>

        <h2>Conclusion</h2>
        <p>The design trends of 2025 reflect a future where technology, sustainability, and user-centricity converge. As designers, it's crucial to stay ahead of these trends while focusing on creating meaningful, accessible, and engaging experiences for users. By embracing these emerging design directions, we can shape a digital future that is not only visually stunning but also inclusive and sustainable.</p>
        <p>Are you ready to incorporate these future design trends into your projects? At Lacuna Digital, we're always at the forefront of design innovation. Contact us to learn how we can help your brand stay ahead of the curve with cutting-edge design solutions.</p>
      </>
    ),
  },
  {
    id: "partner-for-agencies",
    title: "Why Lacuna Digital is the Perfect Partner for Agencies",
    date: "November 21, 2024",
    readTime: "6 min read",
    image: "/images/blog/partner-for-agencies.webp",
    excerpt: "8 reasons Lacuna Digital is ideal for agency partnerships — from comprehensive digital expertise to dedicated support and continuous innovation.",
    content: (
      <>
        <h2>Overview</h2>
        <p>In today's rapidly evolving digital landscape, agencies are constantly seeking ways to expand their service offerings and stay competitive. Enter Lacuna Digital – the ideal partner for agencies looking to broaden their horizons and deliver more value to their clients. Let's explore why Lacuna Digital stands out as the perfect collaboration choice for forward-thinking agencies.</p>

        <h2>1. Comprehensive Digital Expertise</h2>
        <p>Lacuna Digital brings a wealth of experience across various digital domains. From web development and UX design to digital marketing and data analytics, our team possesses the skills and knowledge to complement and enhance your existing services. By partnering with us, you gain access to a diverse range of digital capabilities, allowing you to offer your clients a more comprehensive solution.</p>

        <h2>2. Seamless Integration</h2>
        <p>We understand the importance of maintaining your agency's brand identity and client relationships. Lacuna Digital is designed to integrate seamlessly with your existing processes, acting as an extension of your team rather than a separate entity. This approach ensures a smooth collaboration that enhances your services without disrupting your established workflows.</p>

        <h2>3. Scalability and Flexibility</h2>
        <p>As your agency grows and client demands evolve, Lacuna Digital offers the scalability and flexibility to adapt to your changing needs. Whether you require additional resources for a large project or specialized skills for a niche client, our partnership model allows you to scale up or down as needed, ensuring you always have the right resources at your disposal.</p>

        <h2>4. Cutting-Edge Technology</h2>
        <p>Staying ahead of the technological curve is crucial in the digital world. Lacuna Digital invests heavily in the latest tools, platforms, and methodologies. By partnering with us, your agency gains access to cutting-edge technology and innovative approaches, enabling you to offer state-of-the-art solutions to your clients without the overhead of constant tech investments.</p>

        <h2>5. Quality Assurance</h2>
        <p>We pride ourselves on delivering high-quality work that meets and exceeds industry standards. Our rigorous quality assurance processes ensure that every project we collaborate on is executed to perfection. This commitment to excellence helps enhance your agency's reputation and build stronger, long-lasting client relationships.</p>

        <h2>6. Cost-Effective Expansion</h2>
        <p>Expanding your service offering internally can be costly and time-consuming. Partnering with Lacuna Digital provides a cost-effective alternative, allowing you to broaden your services without the overhead of hiring and training new staff or investing in new infrastructure. This approach enables you to remain competitive and increase your profit margins.</p>

        <h2>7. Continuous Learning and Innovation</h2>
        <p>At Lacuna Digital, we're committed to continuous learning and innovation. Our team stays up-to-date with the latest industry trends and best practices. By collaborating with us, your agency benefits from this culture of innovation, gaining insights and approaches that can be applied across your entire service offering.</p>

        <h2>8. Dedicated Support</h2>
        <p>When you partner with Lacuna Digital, you're not just getting a service provider; you're gaining a dedicated support system. Our team is committed to your success, offering ongoing consultation, training, and support to ensure that your agency can make the most of our partnership and deliver exceptional results to your clients.</p>

        <h2>Conclusion</h2>
        <p>In an increasingly competitive digital landscape, partnering with Lacuna Digital offers agencies a strategic advantage. Our comprehensive expertise, seamless integration, scalability, and commitment to quality make us the ideal choice for agencies looking to expand their service offering. By choosing Lacuna Digital as your partner, you're not just expanding your capabilities – you're positioning your agency for long-term success and growth in the digital realm.</p>
        <p>Ready to take your agency to the next level? Contact Lacuna Digital today and discover how our partnership can transform your service offering and drive your business forward.</p>
      </>
    ),
  },
  {
    id: "benefits-digital-agency",
    title: "The Benefits of Using A Digital Agency",
    date: "November 19, 2024",
    readTime: "6 min read",
    image: "/images/blog/benefits-digital-agency.webp",
    excerpt: "Lacuna Digital is an end-to-end digital agency offering comprehensive solutions, local expertise with a global perspective, and scalable solutions for growing businesses.",
    content: (
      <>
        <h2>Overview</h2>
        <p>In today's digital landscape, businesses need comprehensive solutions to stay competitive. Lacuna Digital, an end-to-end digital agency located in North Dublin, offers a range of benefits for business owners looking to enhance their online presence and digital strategies.</p>

        <h2>1. Comprehensive Digital Solutions</h2>
        <p>Lacuna Digital provides a full spectrum of digital services, allowing business owners to streamline their digital needs through a single agency. This comprehensive approach ensures consistency across all digital touchpoints and eliminates the need to coordinate with multiple service providers.</p>

        <h2>2. Local Expertise with a Global Perspective</h2>
        <p>Being based in North Dublin, Lacuna Digital offers the advantage of local market knowledge combined with a global digital perspective. This unique positioning allows them to create strategies that resonate with local audiences while leveraging international best practices.</p>

        <h2>3. Cost-Effective and Time-Efficient</h2>
        <p>By choosing an end-to-end agency like Lacuna Digital, business owners can save both time and money. Working with a single agency for all digital needs reduces overhead costs and simplifies project management, leading to more efficient outcomes.</p>

        <h2>4. Tailored Strategies for Business Growth</h2>
        <p>Lacuna Digital understands that each business has unique needs and goals. They offer customized digital strategies that align with specific business objectives, ensuring that every digital initiative contributes directly to business growth and success.</p>

        <h2>5. Cutting-Edge Technology and Trends</h2>
        <p>As a dedicated digital agency, Lacuna Digital stays at the forefront of technological advancements and digital trends. Business owners benefit from this expertise, ensuring their digital presence remains modern, relevant, and competitive.</p>

        <h2>6. Seamless Integration of Services</h2>
        <p>From website development to digital marketing and analytics, Lacuna Digital's services are designed to work seamlessly together. This integration ensures a cohesive digital strategy and maximizes the effectiveness of each component.</p>

        <h2>7. Scalable Solutions for Growing Businesses</h2>
        <p>As businesses evolve, their digital needs change. Lacuna Digital offers scalable solutions that can grow and adapt with the business, providing long-term value and support throughout different stages of business development.</p>

        <h2>8. Dedicated Support and Communication</h2>
        <p>With Lacuna Digital, business owners enjoy the benefit of a dedicated team that understands their brand and objectives. This leads to better communication, faster problem-solving, and a more personalized service experience.</p>

        <h2>Conclusion</h2>
        <p>Partnering with Lacuna Digital offers business owners in North Dublin and beyond a strategic advantage in the digital realm. Their end-to-end services provide a comprehensive, efficient, and effective approach to digital presence and marketing, making them an invaluable asset for businesses looking to thrive in the digital age.</p>
      </>
    ),
  },
];

import { DemoProject, AgencyService, TeamMember, Testimonial, FAQItem } from "./types";



export const AGENCY_SERVICES: AgencyService[] = [

  {

    id: "ai-powered-solutions",

    title: "AI-Powered Solutions",

    description:

      "Chatbots & AI assistants, workflow automation, smart data processing, and AI integrations for existing platforms — designed with AI at the core, not as an afterthought.",

    details: [

      "Chatbots & AI assistants for businesses",

      "Workflow automation using AI tools",

      "Smart data processing & analytics",

      "AI integrations for existing platforms",

      "Custom AI agents for support, sales & ops"

    ],

    iconName: "Bot",

    badge: "AI-First",

    heroColor: "from-cyan-400 to-blue-500",

    caseStudyRef: "promptmind-ai",

    category: "AI & Automation"

  },

  {

    id: "software-development",

    title: "Software Development",

    description:

      "Web applications, mobile-ready systems, API development, custom dashboards, and admin panels — production-grade software built for real business needs.",

    details: [

      "Web application development",

      "Mobile-ready digital systems",

      "API development & third-party integrations",

      "Custom dashboards & admin panels",

      "React, TypeScript & scalable architecture"

    ],

    iconName: "Monitor",

    badge: "Full-Stack",

    heroColor: "from-blue-400 to-indigo-600",

    caseStudyRef: "lumina-portal",

    category: "Software Development"

  },

  {

    id: "digital-transformation",

    title: "Digital Transformation",

    description:

      "Moving offline businesses online, replacing manual processes with software, WhatsApp & social commerce systems, and e-commerce platforms for growth.",

    details: [

      "Moving offline businesses online",

      "Replacing manual processes with software",

      "WhatsApp & social commerce systems",

      "E-commerce & ordering platforms",

      "Digital process automation"

    ],

    iconName: "Cpu",

    badge: "Growth",

    heroColor: "from-emerald-400 to-teal-600",

    caseStudyRef: "xsender",

    category: "Software Development"

  },

  {

    id: "startup-support",

    title: "Startup Support",

    description:

      "MVP development for early-stage startups, product strategy & roadmap planning, tech stack selection, and rapid prototyping with launch support.",

    details: [

      "MVP development for early-stage startups",

      "Product strategy & roadmap planning",

      "Tech stack selection & architecture",

      "Rapid prototyping & launch support",

      "Startup-focused development sprints"

    ],

    iconName: "Smartphone",

    badge: "MVP Focus",

    heroColor: "from-violet-400 to-purple-600",

    caseStudyRef: "fintech-ledger",

    category: "Software Development"

  }

];



export const CASE_STUDIES: DemoProject[] = [

  {

    id: "lumina-portal",

    title: "Lumina Telehealth Patient Portal",

    clientName: "Lumina Health Inc",

    category: "SaaS",

    tagline: "Securing patient intake with HIPAA compliant microservices and high-contrast charts.",

    description: "Lumina Health required an express-engineered platform to digitize patient intake for 40,000+ monthly clinical users. Promptly developed a responsive web terminal featuring secure scheduling, digital check-ins, and self-updating visual analytics.",

    longDescription: "The challenge was keeping data secure while serving an extremely friendly interface for older patients. Promptly engineered a modular state system using React and styled with deep-contrast slate items. Utilizing the client-portal architecture concept, Lumina representatives can audit intake metrics in real-time. By structuring DB triggers around regional secure datastores, we optimized speed and guaranteed HIPAA parameters.",

    metrics: [

      "42% Decrease in Admin Wait-Times",

      "99.98% Telehealth Uptime Reached",

      "User Rating increased from 3.1 to 4.8"

    ],

    technologies: ["React", "TypeScript", "Tailwind CSS", "Express.js", "PostgreSQL", "Google Cloud Run"],

    visualTheme: "from-cyan-500 via-teal-500 to-blue-600",

    featured: true,

    testimonial: {

      quote: "Working with Promptly was a revelation. They translated our abstract security specification into a beautiful, performant portal in weeks. Patient feedback is incredible.",

      author: "Dr. Sarah Jenkins",

      role: "Chief Medical Officer",

      company: "Lumina Health"

    }

  },

  {

    id: "fintech-ledger",

    title: "FinTech Scale Asset Ledger",

    clientName: "FinTech Scale Ltd",

    category: "Mobile",

    tagline: "Deploying a bulletproof wealth tracking tool with microsecond synchronization.",

    description: "A secure asset management application that tracks fractional commodities, automated stock actions, and real-time transaction records on full-screen layouts.",

    longDescription: "FinTech Scale needed an MVP ready for a Series A showcase in exactly 45 days. Promptly assembled an expert sprint team that deployed a cross-platform React Native asset ledger. The app utilizes biometric lock-down scopes, displays instant ticker tickers via modular serverless endpoints, and provides a beautiful, clean transaction drawer that matches the Swiss minimalist look our designer curated.",

    metrics: [

      "$120M+ Asset Transactions Tracked",

      "Delivered in 36 Days (under budget)",

      "Zero Security Incident logs since launch"

    ],

    technologies: ["React Native", "TypeScript", "Tailwind CSS", "Node.js", "Redis Cache", "Docker"],

    visualTheme: "from-emerald-400 via-teal-500 to-cyan-500",

    featured: true,

    testimonial: {

      quote: "Promptly operates with an honesty and visual craft that is rare in today’s agency landscape. They delivered a production-ready ledger we are proud to demo to our venture partners.",

      author: "Alex Rivera",

      role: "VP of Product",

      company: "FinTech Scale"

    }

  },

  {

    id: "georoute",

    title: "GeoRoute Global Logistics Suite",

    clientName: "GeoRoute Transport",

    category: "Cloud",

    tagline: "Automating fleet routing engines for 1,200 commercial carriers across North America.",

    description: "An intensive backend overhaul establishing intelligent routing optimization webs and real-time vehicle dispatch maps.",

    longDescription: "GeoRoute's old legacy routing server was dropping webhook triggers and delaying carrier dispatch. Promptly stepped in and rebuilt their infrastructure into an auto-scaling, cloud-native containerized platform. We decoupled fleet scheduling using high-performance queue brokers and designed a sleek dashboard layout matching our signature dark slate aesthetic.",

    metrics: [

      "14.8% Savings on Fleet Fuel Consumption",

      "99.9% Webhook Delivery reliability",

      "90ms Average API Response time"

    ],

    technologies: ["Node.js", "Express.js", "Redis", "Docker", "Google Cloud SQL", "Mapbox APIs"],

    visualTheme: "from-orange-500 via-red-500 to-rose-600",

    featured: false,

    testimonial: {

      quote: "Promptly saved our relationship with 200 of our primary carrier clients. The dispatch lag is entirely gone, and our fleet fuel expenses dropped instantly.",

      author: "Marcus Vance",

      role: "Director of Fleet Operations",

      company: "GeoRoute Transport"

    }

  },

  {

    id: "promptmind-ai",

    title: "PromptMind Agentic Sentiment Dashboard",

    clientName: "MindCorp Group",

    category: "AI Integration",

    tagline: "Analyzing millions of client chat logs automatically with live text summarization models.",

    description: "An advanced natural language processing microservice utilizing the Gemini LLM pipeline to analyze user feedback trends on server proxies.",

    longDescription: "MindCorp operates customer forums with over 10 million posts. Standard regex searches were unable to isolate critical customer health issues. Promptly deployed an AI engine proxying gemini-3.5-flash to stream semantic mood alerts directly to service channels, turning feedback noise into actionable roadmap inputs.",

    metrics: [

      "78% Reduction in Support Response times",

      "5.2 Million chat logs ingested daily",

      "Auto-categorization error rate under 1.2%"

    ],

    technologies: ["React", "Vite", "Gemini 3.5 Flash", "Express.js", "PostgreSQL", "Node.js"],

    visualTheme: "from-cyan-400 via-indigo-500 to-purple-600",

    featured: true,

    testimonial: {

      quote: "An absolute game-changer. Promptly proved that AI is not just hype when engineered with architecturally sound code guidelines. Our product team now acts on user complaints immediately.",

      author: "Elena Rostov",

      role: "Head of Customer Relations",

      company: "MindCorp Group"

    }

  },

  {

    id: "xsender",

    title: "xSender WhatsApp Order Management System",

    clientName: "Promptly",

    category: "SaaS",

    tagline: "Transforming messy WhatsApp chats into a professional ordering system for businesses globally.",

    description: "A flagship product that turns WhatsApp into a powerful commerce platform with product catalogs, one-click ordering, and comprehensive order management dashboard.",

    longDescription: "Millions of businesses run sales through WhatsApp, but the platform is built for chatting—not commerce. xSender solves this by providing a professional product catalog system where customers can browse products and place structured orders with one tap. Business owners get a complete dashboard to track orders from pending to dispatch, with instant alerts and category-based navigation. Built mobile-first and designed for global scalability, xSender works for fashion, food, retail, and service businesses of any size.",

    metrics: [

      "One-time setup pricing model",

      "Deployed in days not weeks",

      "Supports unlimited product catalogs"

    ],

    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "WhatsApp Business API", "PostgreSQL", "Vite"],

    visualTheme: "from-green-400 via-emerald-500 to-teal-600",

    featured: true,

    testimonial: {

      quote: "xSender transformed how we handle orders. No more lost messages or confused customers—just clean, professional ordering that actually works.",

      author: "Local Business Owner",

      role: "Early Adopter",

      company: "Fashion Retail"

    }

  }

];



export const TEAM_MEMBERS: TeamMember[] = [

  {

    id: "team-1",

    name: "Mahad Mateen Butt",

    role: "Founder & CEO",

    bio: "Mahad is a Full Stack Developer & AI Consultant leading Promptly's business strategy, product vision, and AI automation architecture. As the final decision maker, he drives client consulting, strategic partnerships, and the overall direction of the agency.",

    specialties: ["Business Strategy", "Product Vision", "AI & Automation Architecture", "Client Consulting", "Partnerships", "Full Stack Dev", "AI Consulting", "Final Decision Maker"],

    svgAvatarIndex: 1,

    image: "/images/212.png",

    experience: "5+ years"

  },

  {

    id: "team-5",

    name: "Misbah Adil",

    role: "Founding Member & Director of Engineering",

    bio: "Misbah leads the development team as Founding Member & Director of Engineering. She drives project delivery, sprint planning, code reviews, and software development — ensuring every product meets Promptly's standards from first commit to final deployment.",

    specialties: ["Development Team Lead", "Project Delivery", "Sprint Planning", "Code Reviews", "Software Development", "Technical Documentation"],

    svgAvatarIndex: 5,

    image: "/images/misbah.jpeg",

    experience: "6+ years"

  },

  {

    id: "team-2",

    name: "Iqra Iqbal",

    role: "Co-Founder & CTO",

    bio: "Iqra leads the entire technical direction of Promptly as Co-Founder & CTO. She owns technical leadership, system architecture, AI & software strategy, and upholds the engineering standards that govern every product we ship.",

    specialties: ["Technical Leadership", "System Architecture", "AI & Software Strategy", "Technical Hiring", "Code Quality", "Engineering Standards"],

    svgAvatarIndex: 2,

    image: "/images/iqbal.png",

    experience: "5+ years"

  },

  {

    id: "team-6",

    name: "Hasnain Farooq",

    role: "Sales & Business Development Manager",

    bio: "Hasnain owns the full sales engine at Promptly — from lead generation and client outreach to proposals, CRM management, and strategic partnerships. He drives the predictable revenue growth that fuels the agency's expansion.",

    specialties: ["Lead Generation", "Client Outreach", "Sales Calls", "Proposal Follow-ups", "CRM Management", "Partnerships"],

    svgAvatarIndex: 6,

    image: "/images/hasnain.jpeg",

    experience: "5+ years"

  },

  {

    id: "team-advisor",

    name: "Dr. Qurat ul Ain Akram",

    role: "Strategic Advisor",

    bio: "Dr. Qurat ul Ain Akram is a PhD-level professor and Strategic Advisor at Promptly. With over 10+ years of academic and research experience, she specializes in computer vision, Optical Character Recognition (OCR), and related image processing technologies, steering Promptly's research and advanced technical strategies.",

    specialties: ["Computer Vision", "Optical Character Recognition (OCR)", "Image Processing", "Strategic Advisory", "PhD Research", "Deep Learning"],

    svgAvatarIndex: 7,

    image: "/images/qurat.png",

    experience: "10+ years"

  }

];



export const CLIENT_TESTIMONIALS: Testimonial[] = [

  {

    id: "test-1",

    quote: "AutoReach360 saved my sales team 30+ hours a week. From prospecting to replies — it's all automated. Our cold outreach reply rate jumped by 80%. It's a no-brainer if you're scaling B2B sales.",

    author: "Rayan Dalton",

    role: "VP Sales",

    company: "LeadWave Inc.",

    rating: 5,

    flag: "🇺🇸",

    country: "United States"

  },

  {

    id: "test-2",

    quote: "Their team integrated seamlessly with our backend systems and built a beautiful React Native app. But more importantly, they truly understood our business goals. Highly professional and deadline-focused.",

    author: "Omar",

    role: "Head of Engineering",

    company: "Elevated Culture",

    rating: 5,

    flag: "🇺🇸",

    country: "United States",

    avatar: "panther"

  },

  {

    id: "test-3",

    quote: "We were stuck with an outdated legacy portal. Promptly modernized our entire stack and moved us to the cloud with zero downtime. Their support during and after delivery was phenomenal.",

    author: "Mario Mason",

    role: "Product Manager",

    company: "EduTrack",

    rating: 5,

    flag: "🇲🇽",

    country: "Mexico"

  },

  {

    id: "test-4",

    quote: "Promptly isn't just a software agency. They're a tech strategy partner. We came with an idea — they challenged it, improved it, and delivered better than expected. Can't recommend them enough.",

    author: "Ceem Klodin",

    role: "CEO",

    company: "StratusLogic",

    rating: 5,

    flag: "🇬🇧",

    country: "United Kingdom"

  },

  {

    id: "test-5",

    quote: "Promptly delivered our MVP way ahead of schedule. The code quality is top-notch, and their communication was seamless throughout the process.",

    author: "Akin",

    role: "CEO & Founder",

    company: "G-COSMOS",

    rating: 5,

    flag: "🇬🇪",

    country: "Georgia"

  }

];



export const SYSTEM_FAQS: FAQItem[] = [

  {

    id: "faq-1",

    question: "How does Promptly's 'Prompt-to-Architecture' process work?",

    answer: "We represent a new breed of engineering firm. Instead of long-winded specification cycles, clients submit direct functional prompts defining their product vision. Our AI-augmented pipelines parse these ideas, generate robust database schema models, isolate core UI flows, and scaffold accurate pricing sheets. From there, elite human engineers build national-grade production apps upon this ultra-clean blueprint."

  },

  {

    id: "faq-2",

    question: "Do you build custom servers or client-only applications?",

    answer: "Both! We default to lightweight Single Page Apps (Vite, React, Tailwind) for general requirements, but instantly scale to full-stack microservice systems (Express servers, streaming APIs, Gemini LLM agents, PostgreSQL, Cloud Run) when the app involves API secrets, payment routes, or cognitive computations."

  },

  {

    id: "faq-3",

    question: "What is your typical software development timeframe?",

    answer: "A standard elite MVP (minimum viable product) takes between 4 to 8 weeks depending on integration density. Larger architectural microservices ranges between 8 to 12 weeks. We execute with agile sprint blocks, deploying working code to staging targets weekly."

  },

  {

    id: "faq-4",

    question: "Where are our software configurations and APIs hosted?",

    answer: "We deploy secure build pipelines primarily onto sandbox structures or production GCP instances (Google Cloud Run/Firestore) tailored with SSL configs and rigorous firewalls. We hand over comprehensive git repositories upon project milestones."

  }

];


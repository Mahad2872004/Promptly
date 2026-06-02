import { DemoProject, AgencyService, TeamMember, Testimonial, FAQItem } from "./types";

export const AGENCY_SERVICES: AgencyService[] = [
  {
    id: "web-applications",
    title: "Web Applications",
    description:
      "Production-grade SaaS dashboards, client portals, and enterprise web platforms—with AI-assisted UX, smart search, and intelligent workflows baked in from day one.",
    details: [
      "React, TypeScript & scalable full-stack web architecture",
      "AI-assisted onboarding, search, and in-app copilots",
      "Multi-tenant SaaS, subscriptions & role-based access",
      "Premium UI systems with conversion-focused layouts",
      "Secure APIs, analytics dashboards & real-time data layers"
    ],
    iconName: "Monitor",
    badge: "AI-Enhanced Web",
    heroColor: "from-blue-400 to-indigo-600",
    caseStudyRef: "lumina-portal"
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    description:
      "Intelligent automations that replace manual ops—agentic workflows, trigger-based AI tasks, and seamless integrations across your existing tools and CRMs.",
    details: [
      "Custom AI agents for support, sales & internal ops",
      "Workflow automation across email, Slack, CRM & ERP",
      "Document parsing, classification & routing pipelines",
      "Scheduled jobs, webhooks & event-driven AI triggers",
      "Human-in-the-loop review with audit-ready logging"
    ],
    iconName: "Bot",
    badge: "Core AI",
    heroColor: "from-cyan-400 to-blue-500",
    caseStudyRef: "promptmind-ai"
  },
  {
    id: "ai-systems",
    title: "AI Systems",
    description:
      "End-to-end AI infrastructure—RAG pipelines, vector databases, model orchestration, and secure inference layers designed for reliability at scale.",
    details: [
      "RAG pipelines with embeddings & semantic retrieval",
      "Gemini & multi-model orchestration with fallbacks",
      "Vector databases, chunking strategies & eval suites",
      "Server-side proxies, guardrails & data isolation",
      "Monitoring, cost controls & production observability"
    ],
    iconName: "Cpu",
    badge: "Enterprise AI",
    heroColor: "from-indigo-400 to-violet-600",
    caseStudyRef: "promptmind-ai"
  },
  {
    id: "app-development",
    title: "App Development",
    description:
      "Native and cross-platform mobile apps plus progressive web experiences—built with AI features like voice, vision, personalization, and on-device intelligence.",
    details: [
      "React Native, iOS & Android production sprints",
      "AI chat, recommendations & smart notifications",
      "Offline-first sync, auth & secure device APIs",
      "App Store & Play Store launch pipelines",
      "Shared codebase with web—one product, every screen"
    ],
    iconName: "Smartphone",
    badge: "AI-Ready Apps",
    heroColor: "from-violet-400 to-purple-600",
    caseStudyRef: "fintech-ledger"
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
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Mahad Mateen",
    role: "CEO & Principal Architect",
    bio: "Mahad has spent 5 years orchestrating high-throughput distributed architectures, microservices, and secure API gateways. He loves elegant typography and clean database schemas.",
    specialties: ["System Architecture", "TypeScript", "Express.js", "PostgreSQL", "Scaling"],
    svgAvatarIndex: 1,
    image: "/images/mahad.png"
  },
  {
    id: "team-2",
    name: "Iqra Iqbal",
    role: "CTO & Senior Software Engineer",
    bio: "Iqra has spent 5 years building high-performance web applications and mobile apps. She loves clean code and efficient user interfaces.",
    specialties: ["SaaS Design", "Tailwind CSS", "React & Motion", "Visual Balance", "Typography", "React Native","GHL","Lip Sync"],
    svgAvatarIndex: 2,
    image: "/images/iqra.png"
  },
  {
    id: "team-3",
    name: "Rabiya Malik",
    role: "Senior Product Designer",
    bio: "Rabiya has spent 5 years building high-performance web applications and mobile apps. She loves clean and efficient user interfaces.",
    specialties: ["UI/UX Design", "Figma", "Wireframing", "Prototyping", "User Research","Design Systems","Branding","Saas Design"],
    svgAvatarIndex: 3,
    image: "/images/rabiya.png"
  },
  {
    id: "team-4",
    name: "Nimra Jabran",
    role: "Senior AI Engineer",
    bio: "Nimra is passionate about building intelligent systems. She has 5 years of experience specializing in prompt optimization, RAG pipelines, and model orchestration.",
    specialties: ["AI Engineering", "Gemini Solutions", "Vector Databases", "Prompt Tuning", "RAG Pipelines", "Node.js"],
    svgAvatarIndex: 4,
    image: "/images/nimra.jpeg"
  }
];

export const CLIENT_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "Promptly understands engineering at a level few agencies do. They don't just write templates; they write robust, production-ready systems that scale natively.",
    author: "Elena Rostov",
    role: "Head of Customer Relations",
    company: "MindCorp Group",
    rating: 5
  },
  {
    id: "test-2",
    quote: "They delivered our wealth tracking ledger under an extreme timeline, and the UI layout is simply beautiful (our investors were blown away). Truly a high-caliber team.",
    author: "Alex Rivera",
    role: "VP of Product",
    company: "FinTech Scale",
    rating: 5
  },
  {
    id: "test-3",
    quote: "We spent months talking to agencies who wanted to over-engineer a simple core concept. Promptly got the vision instantly, modeled it, and had an MVP running in three weeks.",
    author: "Marcus Vance",
    role: "Director of Operations",
    company: "GeoRoute Transport",
    rating: 5
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

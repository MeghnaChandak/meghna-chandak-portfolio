// ============================================================
// EDIT THIS FILE ONLY. Every real fact about you lives here.
// None of the component files (in src/components/) need editing
// unless you want to change how something LOOKS, not what it SAYS.
//
// Everything below marked TODO is a placeholder. Replace it with
// something you can defend in an interview - real numbers, real
// project status. See the conversation notes for why this matters.
// ============================================================

export const profile = {
  name: "Meghna C.", 
  fullName: "Meghna Chandak",
  role: "Python Developer · FastAPI · React · MySQL",
  location: "Pune, India",
  email: "meghnachandak5@gmail.com",
  github: "https://github.com/MeghnaChandak",
  linkedin: "https://www.linkedin.com/in/meghnachandak/",
  resumeFile: "/resume.pdf", // put your actual resume PDF in the public/ folder with this name

  // One or two sentences. Shown on the entry screen and near the top of the page.
  tagline:
    "I build scalable backend systems and full-stack applications - turning complex business workflows into reliable software",

  // Shown as a small pill near the hero. Keep it short and true.
  availability: "Open to backend / full-stack roles",

  // ------------------------------------------------------------
  // MARQUEE
  // Short phrases for the horizontal scrolling strip. Mix real,
  // verifiable facts (from your actual resume/background) with
  // short personality lines. Don't invent numbers here either -
  // "national-level athlete" only belongs if it's true for you.
  // ------------------------------------------------------------
  marquee: [
    "TURNING “JUST ONE SMALL CHANGE” INTO A FEATURE",
    "CAFFEINE IN, BUGS OUT",
    "I TALK TO APIS FOR A LIVING",
    "IT WORKS ON MY MACHINE™",
    "CTRL + S IS A LIFESTYLE",
    "BUILD • BREAK • DEBUG • REPEAT",
    "SOMEHOW, IT WAS A REDIS ISSUE",
  ],

  // ------------------------------------------------------------
  // STATS
  // Real, countable numbers only - not invented engagement metrics.
  // Good candidates: years coding, number of finished projects,
  // number of production endpoints you've personally written, etc.
  // ------------------------------------------------------------
  stats: [
    { value: "1+", label: "years writing production code" },
    { value: "50+", label: "ERP modules & workflows" },
    { value: "500+", label: "ERP users supported" },
    { value: "₹47.86L+", label: "material tracked through returns" },
  ],

  // ------------------------------------------------------------
  // ABOUT PARAGRAPHS
  // Real, flowing prose - not emoji cards. Use **word** to bold a
  // phrase inline (see Interests.jsx for how that's parsed). Write
  // these in your own voice; the drafts below are honest placeholders
  // built from what you've told me, not invented specifics - replace
  // the TODOs with real detail (which trails, which relay distance,
  // which animals) before this goes live.
  // ------------------------------------------------------------
aboutParagraphs: [
  "I build **backend systems and full-stack applications**, especially where the business problem is more complicated than the code initially suggests. I enjoy **solving messy business problems** and, more than anything, seeing something I've built become part of someone's actual day-to-day work — not just another demo on a screen.",

  "Outside of code, I'm a **national-level 4×400m relay athlete**. I enjoy **trekking** and have explored various mountains. When I'm not coding or on a trail, you'll probably find me **reading a book, watching a series, or spending time with my pet**"
],

  // ------------------------------------------------------------
  // EXPERIENCE
  // One entry per job. Add more objects to the array for more jobs.
  // 'bullets' should be things YOU can explain in an interview -
  // no borrowed numbers from someone else's resume.
  // ------------------------------------------------------------
  experience: [
    {
      company: "Integrated Active Monitoring (IAM)",
      role: "Software Developer",
      dates: "Apr 2025 - Present",
      bullets: [
        "Built and enhanced a large-scale ERP platform using FastAPI, React, MySQL and Redis, serving 500+ users across 50+ business modules spanning Operations, Sales, Projects, Inventory, Material, Services, AMC and Administration.",
        "Developed extensive REST APIs, CRUD workflows and business logic covering the complete operational lifecycle — Purchase → Inventory → BOQ → Quotation → PO → Material Request → DC → Installation → Return → QC → OEM → In Stock / Discard..",
        "Implemented complex approval workflows and role/scope-based access control for multiple operational teams and Regional Managers, with JWT authentication and Redis-backed session/scoping.",
        "Built live operational tracking for 100+ field engineers and workflows supporting 50+ daily tickets, giving management real-time visibility into field activity.",
        "Containerized and deployed production services using Docker, Portainer and Nginx, managing builds, versioned releases and ongoing production enhancements.",
      ],
    },
  ],

  // ------------------------------------------------------------
  // PROJECTS
  // status: 'live' | 'in-progress'
  // Only use 'live' once the link actually works. A dead "live"
  // link is one of the fastest ways to lose a recruiter's trust.
  // ------------------------------------------------------------
  // NOTE: these 3 are HYPOTHETICAL placeholders, just to get the layout and
  // wiring working end-to-end. Swap them for your real, finished projects
  // before this goes live - see the conversation notes on why an unfinished
  // or fictional project listed here is a problem once it's public.
  projects: [
    {
      name: "(placeholder) Helpdesk & Ticketing System",
      description:
        "Example only: a support-ticket app with role-based access and live status updates.",
      stack: ["FastAPI", "React", "MySQL"],
      status: "in-progress",
      liveUrl: "",
      githubUrl: "",
    },
    {
      name: "(placeholder) Multi-Tenant SaaS Starter",
      description:
        "Example only: a subscription app template with per-tenant data isolation and billing.",
      stack: ["FastAPI", "PostgreSQL", "Stripe"],
      status: "in-progress",
      liveUrl: "",
      githubUrl: "",
    },
    {
      name: "(placeholder) Notification Service",
      description:
        "Example only: a rules-based service that routes events to email and in-app alerts.",
      stack: ["FastAPI", "SQLAlchemy", "Redis"],
      status: "in-progress",
      liveUrl: "",
      githubUrl: "",
    },
  ],

  // ------------------------------------------------------------
  // SKILLS
  // Grouped so the "Skills" section can render them as columns.
  // Only list what you can talk about for a few minutes if asked.
  // ------------------------------------------------------------
skills: {
  Languages: ['Python', 'JavaScript', 'SQL'],
  'Frameworks & Libraries': ['FastAPI', 'React', 'SQLAlchemy', 'Pydantic', 'Ant Design'],
  Databases: ['MySQL', 'Redis'],
  'APIs & Authentication': ['REST APIs', 'JWT', 'Socket.IO'],
  'DevOps & Tools': ['Git', 'Docker', 'Portainer', 'Nginx', 'GitHub Actions'],
},

  // ------------------------------------------------------------
  // AI ASSISTANT SAMPLE Q&A
  // These are the starter questions shown as clickable chips.
  // The REAL assistant (once wired to a backend) will read the
  // fields above and answer from them. These are just the fallback
  // / demo answers used before that backend exists - see Chat.jsx.
  // ------------------------------------------------------------
  sampleQA: [
    {
      question: "What has she built with WebSockets?",
      answer: "TODO: a real answer, drawn from the experience/projects above.",
    },
    {
      question: "What's her strongest project?",
      answer: "TODO: a real answer, once the projects above are finalized.",
    },
    {
      question: "What is the weather in Paris?",
      answer:
        "That's outside what this assistant covers - it only answers questions about " +
        "Meghna: her projects, skills and experience. Try asking about a project instead.",
    },
  ],
};

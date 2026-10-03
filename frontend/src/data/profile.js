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
  name: 'Meghna C.', // TODO: confirm display name
  fullName: 'Meghna Chandak', // TODO: confirm - shown in page title / resume link
  role: 'Python Developer · FastAPI · React · MySQL',
  location: 'Pune, India',
  email: 'TODO@example.com',
  github: 'https://github.com/TODO',
  linkedin: 'https://linkedin.com/in/TODO',
  resumeFile: '/resume.pdf', // put your actual resume PDF in the public/ folder with this name

  // One or two sentences. Shown on the entry screen and near the top of the page.
  tagline: 'TODO: one line about what you build and who you build it for.',

  // Shown as a small pill near the hero. Keep it short and true.
  availability: 'Open to backend / full-stack roles',

  // ------------------------------------------------------------
  // MARQUEE
  // Short phrases for the horizontal scrolling strip. Mix real,
  // verifiable facts (from your actual resume/background) with
  // short personality lines. Don't invent numbers here either -
  // "national-level athlete" only belongs if it's true for you.
  // ------------------------------------------------------------
  marquee: [
    'BUILDS BACKENDS THAT HOLD UP',
    'NATIONAL-LEVEL 4×400M RELAY ATHLETE', // TODO: confirm this is accurate to keep/edit
    'SHIPS WORKING CODE, NOT JUST DEMOS',
    'STATE-LEVEL DANCER', // TODO: confirm
    'TREKS SUMMITS ON WEEKENDS', // TODO: confirm
    'READS THE STACK TRACE BEFORE PANICKING',
    'LOVES ANIMALS, ESPECIALLY CATS', // TODO: confirm/adjust
  ],

  // ------------------------------------------------------------
  // STATS
  // Real, countable numbers only - not invented engagement metrics.
  // Good candidates: years coding, number of finished projects,
  // number of production endpoints you've personally written, etc.
  // ------------------------------------------------------------
  stats: [
    { value: 'TODO', label: 'years writing production code' },
    { value: 'TODO', label: 'projects shipped' },
    { value: 'TODO', label: 'endpoints built' },
  ],

  // ------------------------------------------------------------
  // INTERESTS ("beyond the code")
  // Real paragraphs, not just labels - this is what actually makes
  // a portfolio memorable. Write these yourself once you're happy
  // with the structure; these are honest starting drafts based on
  // what you've told me, not invented specifics.
  // ------------------------------------------------------------
  interests: [
    {
      icon: '🏔️',
      title: 'Trekking',
      body: 'TODO: a real paragraph - which trails or ranges, what you like about it, maybe one specific trek.',
    },
    {
      icon: '🏃',
      title: 'Athletics',
      body: 'TODO: a real paragraph about running/relay - how you got into it, what it taught you.',
    },
    {
      icon: '🐾',
      title: 'Animals',
      body: 'TODO: a real paragraph - pets, strays you feed, volunteering, whatever is actually true.',
    },
  ],

  // ------------------------------------------------------------
  // EXPERIENCE
  // One entry per job. Add more objects to the array for more jobs.
  // 'bullets' should be things YOU can explain in an interview -
  // no borrowed numbers from someone else's resume.
  // ------------------------------------------------------------
  experience: [
    {
      company: 'TODO: Company name',
      role: 'TODO: Job title',
      dates: 'TODO: e.g. Apr 2025 - Present',
      bullets: [
        'TODO: what you built, in what tech, at what scale (endpoints, screens, users)',
        'TODO: a real, measured improvement if you have one - otherwise leave this out',
        'TODO: anything about auth, testing, or deployment you actually did',
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
      name: '(placeholder) Helpdesk & Ticketing System',
      description: 'Example only: a support-ticket app with role-based access and live status updates.',
      stack: ['FastAPI', 'React', 'MySQL'],
      status: 'in-progress',
      liveUrl: '',
      githubUrl: '',
    },
    {
      name: '(placeholder) Multi-Tenant SaaS Starter',
      description: 'Example only: a subscription app template with per-tenant data isolation and billing.',
      stack: ['FastAPI', 'PostgreSQL', 'Stripe'],
      status: 'in-progress',
      liveUrl: '',
      githubUrl: '',
    },
    {
      name: '(placeholder) Notification Service',
      description: 'Example only: a rules-based service that routes events to email and in-app alerts.',
      stack: ['FastAPI', 'SQLAlchemy', 'Redis'],
      status: 'in-progress',
      liveUrl: '',
      githubUrl: '',
    },
  ],

  // ------------------------------------------------------------
  // SKILLS
  // Grouped so the "Skills" section can render them as columns.
  // Only list what you can talk about for a few minutes if asked.
  // ------------------------------------------------------------
  skills: {
    Languages: ['Python', 'JavaScript', 'SQL'],
    'Frameworks & Libraries': ['FastAPI', 'React', 'SQLAlchemy', 'Pydantic'],
    Databases: ['MySQL', 'Redis'],
    'Tools & Practices': ['Git', 'Docker', 'GitHub Actions', 'REST APIs', 'JWT'],
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
      question: 'What has she built with WebSockets?',
      answer: 'TODO: a real answer, drawn from the experience/projects above.',
    },
    {
      question: "What's her strongest project?",
      answer: 'TODO: a real answer, once the projects above are finalized.',
    },
    {
      question: 'What is the weather in Paris?',
      answer:
        "That's outside what this assistant covers - it only answers questions about " +
        'Meghna: her projects, skills and experience. Try asking about a project instead.',
    },
  ],
}

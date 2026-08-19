"use client"
import { useState, useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { Github, Linkedin, Download, Menu, X, ArrowUpRight, ArrowUp } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const RESUME_PATH = "/Pranav_Puppala_Resume_v4.pdf"

const projects = [
  {
    title: "ExpenseTracker",
    description: "Full-stack expense management app with JWT auth, real-time search, and trend dashboards.",
    image: "/ExpenseTracker.jpeg",
    tech: ["React", "Django", "PostgreSQL", "JWT"],
    link: "https://github.com/PranavPuppala/ExpenseTracker-App",
  },
  {
    title: "EDA Agent",
    description: "Autonomous LangGraph agent that investigates CSVs across self-directed loops and writes reports.",
    image: "/EDAAgent.png",
    tech: ["Django REST", "React", "LangGraph", "Groq", "Pandas"],
    link: "https://github.com/PranavPuppala/EDA-Agent",
  },
  {
    title: "KnowledgeAtlas",
    description: "RAG application delivering grounded, citation-backed answers from user-uploaded PDFs.",
    image: "/KnowledgeAtlas.png",
    tech: ["Django REST", "React", "LangChain", "Celery", "Docker"],
    link: "https://github.com/PranavPuppala/KnowledgeAtlas",
  },
]

const experience = [
  {
    role: "Software Engineer Intern (Capstone Project)",
    org: "UT Southwestern Medical Center",
    location: "Dallas, TX",
    period: "Feb 2026 – May 2026",
    logo: "/UTSW_logo.jpg",
    points: [
      "Built a hybrid RAG pipeline using vector retrieval and cross-encoder reranking to generate persona-aware patient simulation responses for medical training.",
      "Designed a synthetic persona generation pipeline that extracts structured clinical profiles from conversational transcripts to enable real-time simulation.",
      "Developed a real-time patient simulation system with structured behavioral metadata tagging to output natural dialogue and structured JSON schema.",
    ],
  },
  {
    role: "Undergraduate Research Assistant",
    org: "The University of Texas at Dallas",
    location: "Richardson, TX",
    period: "Feb 2024 – May 2025",
    logo: "/UTD_logo.webp",
    points: [
      "Developed network intrusion detection systems using RandomForest, EllipticEnvelope, and regression models.",
      "Trained models to identify network traffic anomalies, focusing on SYN flood and DDoS attack detection.",
      "Reduced false positive rates by 30% and reached 92% precision / 88% recall with one-class classifiers in Python.",
    ],
  },
]

const education = [
  {
    degree: "M.S. Computer Science, Intelligent Systems",
    org: "The University of Texas at Dallas",
    period: "Aug 2026 – Dec 2027",
    logo: "/UTD_logo.webp",
  },
  {
    degree: "B.S. Computer Science",
    org: "The University of Texas at Dallas",
    period: "Jan 2023 – May 2026",
    logo: "/UTD_logo.webp",
  },
]

const techStack: Record<string, string[]> = {
  Languages: ["Java", "Python", "C++", "SQL", "PostgreSQL", "JavaScript", "HTML", "CSS"],
  Frameworks: ["React", "Next.js", "Django", "Scikit-Learn", "TensorFlow"],
  "Developer Tools": ["Git", "VS Code", "GitHub", "Claude Code", "Docker"],
  Libraries: ["Pandas", "NumPy", "Matplotlib", "Axios", "Prisma", "Tailwind CSS", "LangChain", "LangGraph", "Groq", "Redis", "Celery", "ChromaDB"],
}

const techColors: Record<string, { bg: string; text: string }> = {
  Java: { bg: "#f89820", text: "white" },
  Python: { bg: "#3776ab", text: "white" },
  "C++": { bg: "#00599C", text: "white" },
  SQL: { bg: "#336791", text: "white" },
  PostgreSQL: { bg: "#336791", text: "white" },
  JavaScript: { bg: "#F7DF1E", text: "black" },
  HTML: { bg: "#E34F26", text: "white" },
  CSS: { bg: "#264DE4", text: "white" },
  React: { bg: "#61DAFB", text: "black" },
  "Next.js": { bg: "#000000", text: "white" },
  Django: { bg: "#092E20", text: "white" },
  "Django REST": { bg: "#A30000", text: "white" },
  JWT: { bg: "#D63AFF", text: "white" },
  "Scikit-Learn": { bg: "#F7931E", text: "white" },
  TensorFlow: { bg: "#FF6F00", text: "white" },
  LangChain: { bg: "#1C3C3C", text: "white" },
  LangGraph: { bg: "#1C3C3C", text: "white" },
  Groq: { bg: "#F55036", text: "white" },
  Celery: { bg: "#37814A", text: "white" },
  Docker: { bg: "#2496ED", text: "white" },
  Git: { bg: "#F05032", text: "white" },
  "VS Code": { bg: "#007ACC", text: "white" },
  GitHub: { bg: "#181717", text: "white" },
  "Claude Code": { bg: "#D97757", text: "white" },
  Pandas: { bg: "#150458", text: "white" },
  NumPy: { bg: "#013243", text: "white" },
  Matplotlib: { bg: "#11557c", text: "white" },
  Axios: { bg: "#5A29E4", text: "white" },
  Prisma: { bg: "#2D3748", text: "white" },
  "Tailwind CSS": { bg: "#06B6D4", text: "white" },
  Redis: { bg: "#DC382D", text: "white" },
  ChromaDB: { bg: "#4B3F72", text: "white" },
}

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll                                                    */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`v4-reveal ${shown ? "v4-reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentText, setCurrentText] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const progressBarRef = useRef<HTMLDivElement>(null)

  const texts = ["a Backend Engineer", "an Aspiring AI Engineer"]

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentText]
        if (!isDeleting) {
          if (displayText.length < current.length) {
            setDisplayText(current.substring(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 1800)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(current.substring(0, displayText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentText((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 40 : 80,
    )
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayText, isDeleting, currentText])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
        if (progressBarRef.current) progressBarRef.current.style.width = `${progress}%`
        setShowBackToTop(scrollTop > 700)
        setScrolled(scrollTop > 12)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-40% 0px -50% 0px" },
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setMobileMenuOpen(false)
  }

  const downloadResume = () => {
    const a = document.createElement("a")
    a.href = RESUME_PATH
    a.download = "Pranav_Puppala_Resume.pdf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="v4-root min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');

        .v4-root {
          --bg: #FAF6EF;
          --bg-alt: #F3ECDD;
          --surface: #FFFFFF;
          --border: #E4DBC7;
          --ink: #2A2420;
          --muted: #746B5E;
          --accent: #C2653A;
          --accent-dark: #A34F2A;
          --accent-soft: #F1E0D3;
          background: var(--bg);
          color: var(--ink);
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
        }
        .v4-root h1, .v4-root h2, .v4-root h3, .v4-root .v4-serif {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .v4-progress-track { position: fixed; top: 0; left: 0; width: 100%; height: 2px; z-index: 70; background: var(--border); }
        .v4-progress-bar { height: 100%; width: 0%; background: var(--accent); transition: width .1s linear; }

        .v4-nav {
          position: sticky; top: 0; z-index: 60;
          background: rgba(250,246,239,0.9);
          backdrop-filter: blur(6px);
          border-bottom: 1px solid transparent;
          transition: border-color .3s ease, box-shadow .3s ease;
        }
        .v4-nav.scrolled { border-bottom-color: var(--border); box-shadow: 0 1px 0 rgba(0,0,0,0.02); }

        .v4-nav-link { position: relative; color: var(--muted); font-size: 14px; font-weight: 500; transition: color .2s ease; padding-bottom: 4px; }
        .v4-nav-link:hover { color: var(--ink); }
        .v4-nav-link.active { color: var(--ink); }
        .v4-nav-link::after {
          content: ''; position: absolute; left: 0; bottom: 0; height: 1.5px; width: 0;
          background: var(--accent); transition: width .25s cubic-bezier(.16,1,.3,1);
        }
        .v4-nav-link.active::after, .v4-nav-link:hover::after { width: 100%; }

        .v4-mobile-overlay {
          position: fixed; inset: 0; z-index: 65;
          background: var(--bg);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: opacity .3s ease;
        }

        .v4-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 8px;
          font-weight: 600; font-size: 14px;
          color: #FFFDF9;
          background: var(--accent);
          border: 1px solid var(--accent);
          cursor: pointer;
          transition: background-color .2s ease, transform .2s ease;
        }
        .v4-btn-primary:hover { background: var(--accent-dark); border-color: var(--accent-dark); transform: translateY(-1px); }

        .v4-btn-outline {
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--ink);
          transition: border-color .2s ease, color .2s ease, transform .2s ease;
        }
        .v4-btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }
        .v4-icon-github:hover { background: #181717; border-color: #181717; color: #FFFFFF; }
        .v4-icon-linkedin:hover { background: #0A66C2; border-color: #0A66C2; color: #FFFFFF; }

        .v4-hero-photo {
          border-radius: 50%;
          border: 1px solid var(--border);
          overflow: hidden;
          background: var(--bg-alt);
        }
        .v4-hero-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .v4-reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); }
        .v4-reveal-in { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .v4-reveal { opacity: 1; transform: none; transition: none; } }

        .v4-kicker { font-size: 12.5px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--accent); }

        .v4-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;
        }
        .v4-card:hover { border-color: #D8B79C; transform: translateY(-3px); box-shadow: 0 8px 24px -12px rgba(42,36,32,0.18); }

        .v4-exp-row { border-top: 1px solid var(--border); transition: background-color .2s ease; }
        .v4-exp-row:hover { background: var(--bg-alt); }

        .v4-badge {
          padding: 5px 11px; border-radius: 6px; font-size: 12.5px; font-weight: 500;
          transition: transform .18s ease;
        }
        .v4-badge:hover { transform: translateY(-1px); }

        .v4-back-to-top {
          position: fixed; bottom: 24px; right: 24px; z-index: 50;
          width: 44px; height: 44px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: var(--ink); color: var(--bg);
          box-shadow: 0 6px 18px -6px rgba(42,36,32,0.35);
          transition: transform .25s cubic-bezier(.16,1,.3,1), opacity .25s ease;
          cursor: pointer; border: none;
        }
        .v4-back-to-top:hover { transform: translateY(-3px); }

        .v4-link-underline { position: relative; color: var(--muted); transition: color .2s ease; }
        .v4-link-underline::after {
          content: ''; position: absolute; left: 0; bottom: -2px; width: 0; height: 1px;
          background: var(--ink); transition: width .25s cubic-bezier(.16,1,.3,1);
        }
        .v4-link-underline:hover { color: var(--ink); }
        .v4-link-underline:hover::after { width: 100%; }

        .v4-divider { height: 1px; background: var(--border); }
      `}</style>

      {/* Progress bar */}
      <div className="v4-progress-track">
        <div ref={progressBarRef} className="v4-progress-bar" />
      </div>

      {/* Nav */}
      <nav className={`v4-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between h-16">
          <button onClick={() => scrollToSection("home")} className="v4-serif text-lg font-semibold">
            Pranav Puppala
          </button>

          <div className="hidden md:flex items-center gap-9">
            {sections.slice(1).map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`v4-nav-link ${activeSection === s.id ? "active" : ""}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="v4-mobile-overlay">
          <button
            className="absolute top-5 right-6"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col items-center gap-6">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="v4-serif text-3xl"
                style={{ color: activeSection === s.id ? "var(--accent)" : "var(--ink)" }}
              >
                {s.label}
              </button>
            ))}
            <button onClick={downloadResume} className="v4-btn-primary mt-4">
              <Download size={15} />
              Resume
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
      <section id="home" className="px-6 pt-20 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-14 items-center">
          <div>
            <Reveal>
              <span className="v4-kicker">Open to 2027 SWE / AI internships</span>
            </Reveal>
            <Reveal delay={70}>
              <h1 className="mt-4 text-5xl sm:text-6xl leading-[1.08]">
                Hi, I'm Pranav.
              </h1>
              <div className="v4-serif text-5xl sm:text-6xl leading-[1.08] min-h-[104px] sm:min-h-[130px]">
                I'm <span style={{ color: "var(--accent)" }}>{displayText}</span>
                <span style={{ color: "var(--accent)" }}>|</span>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-md text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                M.S. Computer Science at UT Dallas. I love designing APIs, building backend systems, integrating
                LLMs, and creating software that's genuinely useful.
              </p>
            </Reveal>
            <Reveal delay={210}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button className="v4-btn-primary" onClick={downloadResume}>
                  <Download size={16} />
                  Download Resume
                </button>
                <a href="https://github.com/PranavPuppala" target="_blank" rel="noreferrer" className="v4-btn-outline v4-icon-github">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/pranav-puppala" target="_blank" rel="noreferrer" className="v4-btn-outline v4-icon-linkedin">
                  <Linkedin size={18} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="flex justify-center">
            <div className="v4-hero-photo w-full max-w-[340px] aspect-square lg:-translate-y-8 lg:-translate-x-8">
              <img src="/Pranav.jpeg" alt="Pranav Puppala" />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="v4-divider max-w-5xl mx-auto" />

      {/* About */}
      <section id="about" className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <span className="v4-kicker">About</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Backend-first, AI-curious.</h2>
          </Reveal>
          <div className="mt-8 space-y-5 text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            <Reveal delay={60}>
              <p>
                I'm Pranav Puppala, a Computer Science graduate from the University of Texas at Dallas and currently
                a Master's student in Computer Science at UTD.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p>
                I enjoy building software from the ground up, with a particular interest in backend development. I
                like designing APIs, working with databases, and thinking about how different pieces of a system fit
                together. I'm also interested in AI engineering and exploring how AI agents and LLMs can be used to
                create software that goes beyond simple demonstrations and solves real problems.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p>
                While backend development is where I feel most at home, I enjoy working across the stack and have
                experience with React and JavaScript as well. I'm naturally curious and enjoy learning by building,
                whether that means picking up a new technology, tackling a difficult problem, or experimenting with a
                new idea. I also enjoy collaborating with others and believe some of the best software comes from
                combining different perspectives.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="v4-divider max-w-5xl mx-auto" />

      {/* Experience */}
      <section id="experience" className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <span className="v4-kicker">Experience</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Where I've worked.</h2>
          </Reveal>

          <div className="mt-10">
            {experience.map((job, i) => (
              <Reveal key={job.role} delay={i * 80}>
                <div className="v4-exp-row px-4 -mx-4 py-8 rounded-lg">
                  <div className="flex items-start gap-4">
                    <img src={job.logo} alt={job.org} className="w-11 h-11 object-contain flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="v4-serif text-xl">{job.role}</h3>
                        <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>{job.period}</span>
                      </div>
                      <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{job.org} · {job.location}</p>
                      <ul className="mt-4 space-y-2.5">
                        {job.points.map((p, k) => (
                          <li key={k} className="flex gap-3 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
                            <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <span className="v4-kicker">Education</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Academic background.</h2>
          </Reveal>
          <div className="mt-8">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 80}>
                <div className="v4-exp-row px-4 -mx-4 py-6 rounded-lg flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <div className="flex items-center gap-4">
                    <img src={e.logo} alt={e.org} className="w-11 h-11 object-contain flex-shrink-0" />
                    <div>
                      <h3 className="v4-serif text-lg">{e.degree}</h3>
                      <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{e.org}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>{e.period}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="v4-divider max-w-5xl mx-auto" />

      {/* Projects */}
      <section id="projects" className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className="v4-kicker">Projects</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Things I've built.</h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 90} className="h-full">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="v4-card block overflow-hidden h-full flex flex-col"
                >
                  <div className="aspect-video overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="v4-serif text-lg">{p.title}</h3>
                      <ArrowUpRight size={16} style={{ color: "var(--muted)" }} />
                    </div>
                    <p className="text-sm flex-1" style={{ color: "var(--muted)" }}>{p.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {p.tech.map((t) => {
                        const colors = techColors[t] || { bg: "#6b7280", text: "white" }
                        return (
                          <span key={t} className="v4-badge" style={{ backgroundColor: colors.bg, color: colors.text }}>
                            {t}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="v4-divider max-w-5xl mx-auto" />

      {/* Skills */}
      <section id="skills" className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className="v4-kicker">Skills</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Tools I reach for.</h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(techStack).map(([category, skills], i) => (
              <Reveal key={category} delay={i * 70} className="h-full">
                <div className="v4-card p-6 h-full">
                  <h3 className="v4-serif text-base mb-4" style={{ color: "var(--accent)" }}>{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => {
                      const colors = techColors[s] || { bg: "#6b7280", text: "white" }
                      return (
                        <span key={s} className="v4-badge" style={{ backgroundColor: colors.bg, color: colors.text }}>
                          {s}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className="px-6 py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <span className="v4-kicker">Contact</span>
            <h2 className="mt-3 text-3xl sm:text-5xl">
              Let's build something <span style={{ color: "var(--accent)" }}>worth shipping.</span>
            </h2>
            <p className="mt-5 text-lg" style={{ color: "var(--muted)" }}>
              Open to Software Engineering and AI/ML internship opportunities for 2027.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=pranav.puppala0206%40gmail.com"
                target="_blank"
                rel="noreferrer"
                className="v4-btn-primary"
              >
                pranav.puppala0206@gmail.com
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a href="https://github.com/PranavPuppala" target="_blank" rel="noreferrer" className="v4-btn-outline v4-icon-github">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/pranav-puppala" target="_blank" rel="noreferrer" className="v4-btn-outline v4-icon-linkedin">
                <Linkedin size={18} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="max-w-5xl mx-auto mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm" style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}>
          <span>© 2026 Pranav Puppala</span>
          <div className="flex items-center gap-6">
            <button onClick={downloadResume} className="v4-link-underline">Résumé</button>
            <a href="https://github.com/PranavPuppala" target="_blank" rel="noreferrer" className="v4-link-underline">GitHub</a>
            <a href="https://www.linkedin.com/in/pranav-puppala" target="_blank" rel="noreferrer" className="v4-link-underline">LinkedIn</a>
          </div>
        </div>
      </section>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="v4-back-to-top"
        style={{ opacity: showBackToTop ? 1 : 0, pointerEvents: showBackToTop ? "auto" : "none" }}
      >
        <ArrowUp size={17} />
      </button>
    </div>
  )
}

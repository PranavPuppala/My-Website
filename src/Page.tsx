"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import type { ReactNode } from "react"
import { Github, Linkedin, Download, Menu, X, ExternalLink, ArrowUp, Sparkles } from "lucide-react"

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
  },
  {
    degree: "B.S. Computer Science",
    org: "The University of Texas at Dallas",
    period: "Jan 2023 – May 2026",
  },
]

const techStack: Record<string, string[]> = {
  Languages: ["Java", "Python", "C++", "SQL", "PostgreSQL", "JavaScript", "HTML", "CSS"],
  Frameworks: ["React", "Next.js", "Django", "Scikit-Learn", "TensorFlow"],
  "Developer Tools": ["Git", "VS Code", "GitHub", "Claude Code", "Docker"],
  Libraries: ["Pandas", "NumPy", "Matplotlib", "Axios", "Prisma", "Tailwind CSS", "LangChain", "LangGraph", "Groq", "Redis", "Celery", "ChromaDB"],
}

// Official/brand colors for technologies, matching the previous site
const techColors: Record<string, { bg: string; text: string }> = {
  // Languages
  Java: { bg: "#f89820", text: "white" },
  Python: { bg: "#3776ab", text: "white" },
  "C++": { bg: "#00599C", text: "white" },
  SQL: { bg: "#336791", text: "white" },
  PostgreSQL: { bg: "#336791", text: "white" },
  JavaScript: { bg: "#F7DF1E", text: "black" },
  HTML: { bg: "#E34F26", text: "white" },
  CSS: { bg: "#264DE4", text: "white" },
  // Frameworks
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
  // Developer Tools
  Git: { bg: "#F05032", text: "white" },
  "VS Code": { bg: "#007ACC", text: "white" },
  GitHub: { bg: "#181717", text: "white" },
  "Claude Code": { bg: "#D97757", text: "white" },
  // Libraries
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
/*  Reveal-on-scroll wrapper                                           */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
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
      className={`v3-reveal ${shown ? "v3-reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ["--reveal-y" as string]: `${y}px` }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Spotlight card: gradient glow follows the cursor                   */
/* ------------------------------------------------------------------ */

function SpotlightCard({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    ref.current?.style.setProperty("--x", `${e.clientX - rect.left}px`)
    ref.current?.style.setProperty("--y", `${e.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} onMouseMove={onMove} onClick={onClick} className={`v3-spotlight-card ${className}`}>
      <div className="v3-spotlight-glow" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Magnetic button: nudges toward the cursor within its bounds        */
/* ------------------------------------------------------------------ */

function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25
    if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)"
  }

  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      <div ref={ref} className="v3-magnetic-inner">
        {children}
      </div>
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
  const spotlightRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)
  const timelineFillRef = useRef<HTMLDivElement>(null)
  const timelineWrapRef = useRef<HTMLDivElement>(null)

  const texts = ["Backend Engineer", "Aspiring AI Engineer"]

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

  // Scroll progress + back-to-top + navbar shrink (rAF-throttled)
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
        setScrolled(scrollTop > 30)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Active-section tracking for nav
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

  // Cursor spotlight glow in the hero
  const handleHeroMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    spotlightRef.current?.style.setProperty("--sx", `${e.clientX - rect.left}px`)
    spotlightRef.current?.style.setProperty("--sy", `${e.clientY - rect.top}px`)

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    if (heroImgRef.current) {
      heroImgRef.current.style.transform = `rotateY(${cx * 12}deg) rotateX(${-cy * 12}deg)`
    }
  }, [])
  const handleHeroLeave = useCallback(() => {
    if (heroImgRef.current) heroImgRef.current.style.transform = "rotateY(0deg) rotateX(0deg)"
  }, [])

  // Timeline fill grows as the experience section scrolls into view
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const wrap = timelineWrapRef.current
        const fill = timelineFillRef.current
        if (wrap && fill) {
          const rect = wrap.getBoundingClientRect()
          const vh = window.innerHeight
          const total = rect.height
          const visible = Math.min(Math.max(vh * 0.75 - rect.top, 0), total)
          fill.style.height = `${(visible / total) * 100}%`
        }
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
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
    <div className="v3-root min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

        .v3-root {
          --bg: #05070d;
          --bg-elev: #0b0f1a;
          --border: rgba(255,255,255,0.08);
          --text: #e8eaf0;
          --muted: #8890a4;
          --accent1: #6366f1;
          --accent2: #22d3ee;
          --accent3: #a855f7;
          background: var(--bg);
          color: var(--text);
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
          position: relative;
          overflow-x: hidden;
        }
        .v3-root h1, .v3-root h2, .v3-root h3, .v3-root .v3-heading-font {
          font-family: "Space Grotesk", "Inter", sans-serif;
        }
        .v3-gradient-text {
          background: linear-gradient(90deg, var(--accent2), var(--accent1) 45%, var(--accent3));
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: v3-gradient-shift 6s ease-in-out infinite;
        }
        @keyframes v3-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Ambient noise texture */
        .v3-noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.035;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* Progress bar */
        .v3-progress-track { position: fixed; top: 0; left: 0; width: 100%; height: 3px; z-index: 70; background: rgba(255,255,255,0.05); }
        .v3-progress-bar { height: 100%; width: 0%; background: linear-gradient(90deg, var(--accent2), var(--accent1), var(--accent3)); transition: width .1s linear; box-shadow: 0 0 12px rgba(99,102,241,0.7); }

        /* Nav */
        .v3-nav {
          position: fixed;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
          align-items: center;
          gap: 4px;
          padding: 8px 8px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(11,15,26,0.6);
          backdrop-filter: blur(16px);
          transition: box-shadow .3s ease, padding .3s ease, background .3s ease;
        }
        .v3-nav.scrolled { box-shadow: 0 8px 30px rgba(0,0,0,0.5); background: rgba(11,15,26,0.85); }
        .v3-nav-item {
          position: relative;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
          transition: color .25s ease;
          white-space: nowrap;
        }
        .v3-nav-item:hover { color: var(--text); }
        .v3-nav-item.active { color: #fff; }
        .v3-nav-pill {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--accent1), var(--accent3));
          z-index: -1;
          transition: transform .4s cubic-bezier(.16,1,.3,1), opacity .3s ease;
        }

        /* Mobile nav */
        .v3-mobile-toggle { z-index: 61; }
        .v3-mobile-overlay {
          position: fixed; inset: 0; z-index: 55;
          background: rgba(5,7,13,0.97);
          backdrop-filter: blur(20px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: opacity .3s ease, visibility .3s ease;
        }

        /* Hero */
        .v3-hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; }
        .v3-mesh {
          position: absolute; inset: -10%; z-index: 0; pointer-events: none;
        }
        .v3-mesh-blob { position: absolute; border-radius: 9999px; filter: blur(90px); opacity: 0.45; }
        .v3-mesh-1 { width: 480px; height: 480px; background: radial-gradient(circle, var(--accent1), transparent 70%); top: 5%; left: 8%; animation: v3-drift-1 16s ease-in-out infinite; }
        .v3-mesh-2 { width: 520px; height: 520px; background: radial-gradient(circle, var(--accent2), transparent 70%); bottom: -5%; right: 5%; animation: v3-drift-2 20s ease-in-out infinite; }
        .v3-mesh-3 { width: 380px; height: 380px; background: radial-gradient(circle, var(--accent3), transparent 70%); top: 40%; left: 45%; animation: v3-drift-3 18s ease-in-out infinite; }
        @keyframes v3-drift-1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(60px,40px) scale(1.1); } }
        @keyframes v3-drift-2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,-40px) scale(1.08); } }
        @keyframes v3-drift-3 { 0%,100% { transform: translate(-20px,0) scale(1); } 50% { transform: translate(30px,-30px) scale(0.95); } }
        @media (prefers-reduced-motion: reduce) {
          .v3-mesh-blob { animation: none; }
        }

        .v3-spotlight {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: radial-gradient(600px circle at var(--sx,50%) var(--sy,50%), rgba(99,102,241,0.14), transparent 70%);
        }

        .v3-grid-overlay {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%);
        }

        .v3-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--accent2);
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(34,211,238,0.25);
          background: rgba(34,211,238,0.06);
        }

        .v3-cta-primary {
          position: relative;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          border-radius: 999px;
          font-weight: 600; font-size: 14px;
          color: #05070d;
          background: linear-gradient(90deg, var(--accent2), var(--accent1));
          cursor: pointer;
          border: none;
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease;
          box-shadow: 0 8px 30px -8px rgba(99,102,241,0.6);
        }
        .v3-cta-primary:hover { box-shadow: 0 12px 40px -6px rgba(99,102,241,0.85); }

        .v3-cta-secondary {
          display: inline-flex; align-items: center; justify-content: center;
          width: 48px; height: 48px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.03);
          color: var(--text);
          cursor: pointer;
          transition: all .3s ease;
        }
        .v3-cta-secondary:hover { border-color: var(--accent2); color: var(--accent2); background: rgba(34,211,238,0.08); transform: translateY(-3px); }

        /* Hero portrait */
        .v3-portrait-wrap { perspective: 1000px; }
        .v3-portrait-tilt { transition: transform .2s ease-out; transform-style: preserve-3d; will-change: transform; }
        .v3-portrait-ring {
          position: relative;
          width: 300px; height: 300px;
          border-radius: 32px;
          padding: 3px;
          background: linear-gradient(135deg, var(--accent2), var(--accent1), var(--accent3));
        }
        .v3-portrait-inner {
          width: 100%; height: 100%;
          border-radius: 29px;
          overflow: hidden;
          background: var(--bg-elev);
        }
        .v3-portrait-inner img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Reveal */
        .v3-reveal { opacity: 0; transform: translateY(var(--reveal-y, 28px)); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
        .v3-reveal-in { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .v3-reveal { opacity: 1; transform: none; transition: none; } }

        /* Section heading */
        .v3-section-tag { font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent2); margin-bottom: 12px; }
        .v3-section-heading { font-size: clamp(28px, 4vw, 42px); font-weight: 700; color: var(--text); }

        /* Glass card base */
        .v3-glass {
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--border);
          border-radius: 20px;
          backdrop-filter: blur(12px);
        }

        /* Spotlight card (projects / stats) */
        .v3-spotlight-card {
          position: relative;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.025);
          overflow: hidden;
          transition: transform .4s cubic-bezier(.16,1,.3,1), border-color .4s ease;
          height: 100%;
        }
        .v3-spotlight-card:hover { transform: translateY(-6px); border-color: rgba(99,102,241,0.4); }
        .v3-spotlight-glow {
          position: absolute; inset: 0;
          background: radial-gradient(280px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,0.18), transparent 70%);
          opacity: 0; transition: opacity .4s ease;
          pointer-events: none;
        }
        .v3-spotlight-card:hover .v3-spotlight-glow { opacity: 1; }

        /* Magnetic */
        .v3-magnetic-inner { transition: transform .25s cubic-bezier(.16,1,.3,1); }

        /* Timeline */
        .v3-timeline-track { position: absolute; left: 15px; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,0.08); }
        .v3-timeline-fill { position: absolute; left: 0; top: 0; width: 100%; height: 0%; background: linear-gradient(180deg, var(--accent2), var(--accent1), var(--accent3)); transition: height .1s linear; }
        .v3-timeline-dot {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--bg-elev);
          border: 2px solid var(--accent1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          z-index: 2;
          box-shadow: 0 0 20px -4px rgba(99,102,241,0.7);
        }

        /* Skill category card badges */
        .v3-badge { padding: 6px 12px; border-radius: 999px; font-size: 12.5px; font-weight: 500; border: 1px solid var(--border); color: var(--text); background: rgba(255,255,255,0.03); transition: transform .2s cubic-bezier(.34,1.56,.64,1), border-color .2s ease; }
        .v3-badge:hover { transform: translateY(-2px) scale(1.06); border-color: var(--accent2); }

        /* Stat card */
        .v3-stat { text-align: center; padding: 24px 16px; }
        .v3-stat-value { font-family: "Space Grotesk", sans-serif; font-size: clamp(24px, 3vw, 32px); font-weight: 700; }
        .v3-stat-label { font-size: 12.5px; color: var(--muted); margin-top: 6px; }

        /* Back to top */
        .v3-back-to-top {
          position: fixed; bottom: 28px; right: 28px; z-index: 50;
          width: 48px; height: 48px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, var(--accent2), var(--accent1));
          color: #05070d;
          box-shadow: 0 8px 24px -6px rgba(99,102,241,0.6);
          transition: transform .3s cubic-bezier(.16,1,.3,1), opacity .3s ease;
          cursor: pointer;
          border: none;
        }
        .v3-back-to-top:hover { transform: translateY(-4px) scale(1.08); }

        .v3-link-underline { position: relative; }
        .v3-link-underline::after {
          content: ''; position: absolute; left: 0; bottom: -3px; width: 0; height: 1px;
          background: var(--accent2); transition: width .3s cubic-bezier(.16,1,.3,1);
        }
        .v3-link-underline:hover::after { width: 100%; }

        .v3-divider { height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); }
      `}</style>

      <div className="v3-noise" />

      {/* Progress bar */}
      <div className="v3-progress-track">
        <div ref={progressBarRef} className="v3-progress-bar" />
      </div>

      {/* Nav */}
      <nav className={`v3-nav hidden md:flex ${scrolled ? "scrolled" : ""}`}>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className={`v3-nav-item ${activeSection === s.id ? "active" : ""}`}
          >
            {activeSection === s.id && <span className="v3-nav-pill" />}
            {s.label}
          </button>
        ))}
      </nav>

      {/* Mobile nav toggle */}
      <button
        className="v3-mobile-toggle fixed top-4 right-4 md:hidden w-11 h-11 rounded-full flex items-center justify-center v3-glass"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div
        className="v3-mobile-toggle fixed top-4 left-4 md:hidden text-sm font-semibold v3-heading-font px-4 py-2.5 v3-glass rounded-full"
      >
        PP
      </div>

      {mobileMenuOpen && (
        <div className="v3-mobile-overlay">
          <div className="flex flex-col items-center gap-2">
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="v3-heading-font text-4xl font-semibold py-3"
                style={{ color: activeSection === s.id ? "var(--accent2)" : "var(--text)", opacity: 0, animation: `v3-fade-up .5s ${i * 0.06}s forwards` }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <style>{`@keyframes v3-fade-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Hero */}
      <section
        id="home"
        className="v3-hero px-6 flex-col"
        onMouseMove={handleHeroMove}
        onMouseLeave={() => spotlightRef.current?.style.setProperty("--sx", "50%")}
      >
        <div className="v3-mesh">
          <div className="v3-mesh-blob v3-mesh-1" />
          <div className="v3-mesh-blob v3-mesh-2" />
          <div className="v3-mesh-blob v3-mesh-3" />
        </div>
        <div className="v3-grid-overlay" />
        <div ref={spotlightRef} className="v3-spotlight" />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center py-32">
          <div className="min-w-0">
            <Reveal>
              <span className="v3-eyebrow">
                <Sparkles size={13} /> Open to 2027 SWE / AI internships
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
                Hi, I'm Pranav
              </h1>
              <div className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] min-h-[70px] sm:min-h-[86px] lg:min-h-[104px]">
                <span className="v3-gradient-text">{displayText}</span>
                <span className="animate-pulse" style={{ color: "var(--accent2)" }}>|</span>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-lg" style={{ color: "var(--muted)" }}>
                M.S. Computer Science at UT Dallas. I love designing APIs, building backend systems, integrating
                LLMs, and creating software that's genuinely useful.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <button className="v3-cta-primary" onClick={downloadResume}>
                    <Download size={16} />
                    Download Resume
                  </button>
                </Magnetic>
                <a href="https://github.com/PranavPuppala" target="_blank" rel="noreferrer" className="v3-cta-secondary">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/pranav-puppala" target="_blank" rel="noreferrer" className="v3-cta-secondary">
                  <Linkedin size={18} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="flex justify-center lg:justify-center">
            <div className="v3-portrait-wrap" onMouseMove={handleHeroMove} onMouseLeave={handleHeroLeave}>
              <div ref={heroImgRef} className="v3-portrait-tilt">
                <div className="v3-portrait-ring">
                  <div className="v3-portrait-inner">
                    <img src="/Pranav.jpeg" alt="Pranav Puppala" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-28 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="v3-section-tag">01 · About</div>
            <h2 className="v3-section-heading">Backend-first, AI-curious.</h2>
          </Reveal>
          <div className="mt-8 space-y-5 text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            <Reveal delay={80}>
              <p>
                I'm Pranav Puppala, a Computer Science graduate from the University of Texas at Dallas and currently
                a Master's student in Computer Science at UTD.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p>
                I enjoy building software from the ground up, with a particular interest in backend development. I
                like designing APIs, working with databases, and thinking about how different pieces of a system fit
                together. I'm also interested in AI engineering and exploring how AI agents and LLMs can be used to
                create software that goes beyond simple demonstrations and solves real problems.
              </p>
            </Reveal>
            <Reveal delay={240}>
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

      <div className="v3-divider max-w-6xl mx-auto" />

      {/* Experience + Education */}
      <section id="experience" className="px-6 py-28 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="v3-section-tag">02 · Experience</div>
            <h2 className="v3-section-heading">Where I've worked.</h2>
          </Reveal>

          <div ref={timelineWrapRef} className="relative mt-16 pl-14">
            <div className="v3-timeline-track">
              <div ref={timelineFillRef} className="v3-timeline-fill" />
            </div>

            {experience.map((job, i) => (
              <Reveal key={job.role} delay={i * 100} className="relative mb-14 last:mb-0">
                <div className="v3-timeline-dot absolute" style={{ left: "-56px", top: "0" }}>
                  <img src={job.logo} alt={job.org} className="w-4 h-4 object-contain" />
                </div>
                <div className="v3-glass p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <h3 className="text-xl font-semibold v3-heading-font">{job.role}</h3>
                    <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ color: "var(--accent2)", border: "1px solid rgba(34,211,238,0.25)" }}>
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>{job.org} • {job.location}</p>
                  <ul className="space-y-3">
                    {job.points.map((p, k) => (
                      <li key={k} className="flex gap-3 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
                        <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent1)" }} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20">
            <div className="v3-section-tag">03 · Education</div>
            <h2 className="v3-section-heading">Academic background.</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 100}>
                <div className="v3-glass p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-white p-1.5 mb-4">
                    <img src="/UTD_logo.webp" alt="UTD" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-semibold v3-heading-font">{e.degree}</h3>
                  <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{e.org}</p>
                  <p className="text-xs mt-3" style={{ color: "var(--accent2)" }}>{e.period}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="v3-divider max-w-6xl mx-auto" />

      {/* Projects */}
      <section id="projects" className="px-6 py-28 relative z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="v3-section-tag">04 · Projects</div>
            <h2 className="v3-section-heading">Things I've built.</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 100} className="h-full">
                <SpotlightCard onClick={() => window.open(p.link, "_blank")} className="cursor-pointer flex flex-col">
                  <div className="aspect-video overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold v3-heading-font">{p.title}</h3>
                      <ExternalLink size={15} style={{ color: "var(--muted)" }} />
                    </div>
                    <p className="text-sm flex-1" style={{ color: "var(--muted)" }}>{p.description}</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {p.tech.map((t) => {
                        const colors = techColors[t] || { bg: "#6b7280", text: "white" }
                        return (
                          <span
                            key={t}
                            className="v3-badge"
                            style={{ backgroundColor: colors.bg, color: colors.text, border: "none" }}
                          >
                            {t}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="v3-divider max-w-6xl mx-auto" />

      {/* Skills */}
      <section id="skills" className="px-6 py-28 relative z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="v3-section-tag">05 · Skills</div>
            <h2 className="v3-section-heading">Tools I reach for.</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(techStack).map(([category, skills], i) => (
              <Reveal key={category} delay={i * 80}>
                <div className="v3-glass p-6 h-full">
                  <h3 className="v3-heading-font font-semibold mb-4" style={{ color: "var(--accent2)" }}>{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => {
                      const colors = techColors[s] || { bg: "#6b7280", text: "white" }
                      return (
                        <span
                          key={s}
                          className="v3-badge"
                          style={{ backgroundColor: colors.bg, color: colors.text, border: "none" }}
                        >
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
      <section id="contact" className="px-6 py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="v3-section-tag">06 · Contact</div>
            <h2 className="v3-section-heading">
              Let's build something <span className="v3-gradient-text">worth shipping.</span>
            </h2>
            <p className="mt-6 text-lg" style={{ color: "var(--muted)" }}>
              Open to Software Engineering and AI/ML internship opportunities for 2027.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=pranav.puppala0206%40gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="v3-cta-primary"
                >
                  pranav.puppala0206@gmail.com
                </a>
              </Magnetic>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="https://github.com/PranavPuppala" target="_blank" rel="noreferrer" className="v3-cta-secondary">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/pranav-puppala" target="_blank" rel="noreferrer" className="v3-cta-secondary">
                <Linkedin size={18} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="v3-divider max-w-6xl mx-auto mt-24 mb-8" />
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: "var(--muted)" }}>
          <span>© 2026 Naga Pranav Puppala</span>
          <div className="flex items-center gap-6">
            <button onClick={downloadResume} className="v3-link-underline">Résumé</button>
            <a href="https://github.com/PranavPuppala" target="_blank" rel="noreferrer" className="v3-link-underline">GitHub</a>
            <a href="https://www.linkedin.com/in/pranav-puppala" target="_blank" rel="noreferrer" className="v3-link-underline">LinkedIn</a>
          </div>
        </div>
      </section>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="v3-back-to-top"
        style={{ opacity: showBackToTop ? 1 : 0, pointerEvents: showBackToTop ? "auto" : "none" }}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  )
}

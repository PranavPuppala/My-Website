"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Instagram, Linkedin, Download, Menu, X, ExternalLink } from "lucide-react"

export default function Portfolio() {
  const [currentText, setCurrentText] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const texts = ["Computer Science Student", "Machine Learning Enthusiast", "Aspiring Full Stack Developer"]

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentText]
        if (!isDeleting) {
          if (displayText.length < current.length) {
            setDisplayText(current.substring(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
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
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentText, texts])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const projects = [
    {
      title: "ExpenseTracker",
      description: "Full-stack expenses tracking application",
      image: "/ExpenseTracker.jpeg",
      tech: ["React", "Django", "PostgreSQL"],
      link: "https://github.com/PranavPuppala/ExpenseTracker-App"
    },
    {
      title: "Resumind",
      description: "AI powered resume analyzer",
      image: "/Resumind.jpeg",
      tech: ["React"],
      link: "https://resume-analyzer-indol.vercel.app/"
    },
    {
      title: "Commerce-Electronics",
      description: "Full-stack e-commerce website",
      image: "/Commerce-Electronics.jpeg",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      link: "https://github.com/PranavPuppala/Ecommerce-Website"
    },
  ]

  const techStack = {
    Languages: ["Java", "Python", "C++", "SQL (Postgres)", "JavaScript", "HTML/CSS"],
    Frameworks: ["React", "Next.js", "Django", "Scikit-Learn"],
    "Developer Tools": ["Git", "VS Code", "Github"],
    Libraries: ["Pandas", "NumPy", "Matplotlib", "Axios", "Prisma", "Tailwind CSS"],
  }

  // Official brand colors for technologies
  const techColors: { [key: string]: { bg: string; text: string } } = {
    // Languages
    Java: { bg: "#f89820", text: "white" },
    Python: { bg: "#3776ab", text: "white" },
    "C++": { bg: "#00599C", text: "white" },
    "SQL (Postgres)": { bg: "#336791", text: "white" },
    JavaScript: { bg: "#F7DF1E", text: "black" },
    "HTML/CSS": { bg: "#E34F26", text: "white" },
    // Frameworks
    React: { bg: "#61DAFB", text: "black" },
    "Next.js": { bg: "#000000", text: "white" },
    Django: { bg: "#092E20", text: "white" },
    "Scikit-Learn": { bg: "#F7931E", text: "white" },
    // Developer Tools
    Git: { bg: "#F05032", text: "white" },
    "VS Code": { bg: "#007ACC", text: "white" },
    Github: { bg: "#181717", text: "white" },
    // Libraries
    Pandas: { bg: "#150458", text: "white" },
    NumPy: { bg: "#013243", text: "white" },
    Matplotlib: { bg: "#11557c", text: "white" },
    Axios: { bg: "#5A29E4", text: "white" },
    Prisma: { bg: "#2D3748", text: "white" },
    "Tailwind CSS": { bg: "#06B6D4", text: "white" },
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        /* Hero section social icons hover effects */
        .hero-social-icon {
          transition: all 0.3s ease;
        }
        .hero-social-icon:hover {
          transform: scale(1.2);
        }
        .hero-github-icon:hover {
          background-color: #000000;
          border-color: #000000;
          color: white;
        }
        .hero-linkedin-icon:hover {
          background-color: #0077B5;
          border-color: #0077B5;
          color: white;
        }
        .hero-instagram-icon:hover {
          background-color: #E4405F;
          border-color: #E4405F;
          color: white;
        }
        /* Navbar hover effects */
        .nav-item {
          position: relative;
          transition: all 0.3s ease;
        }
        .nav-item:hover {
          color: #2563eb;
          transform: translateY(-2px);
        }
        .nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          background-color: #2563eb;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-item:hover::after {
          width: 100%;
        }
        /* Footer social icons - NO hover effects */
        .footer-social-icon {
          /* No special hover effects - just default button behavior */
        }
        /* Mobile menu specific styles */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          z-index: 40;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease-out;
          transform: translateX(100%);
        }
        .mobile-menu-overlay.open {
          transform: translateX(0);
        }
        .mobile-menu-close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 50;
        }
        /* Project image container styles */
        .project-image-container {
          width: 100%;
          height: 200px;
          overflow: hidden;
          border-radius: 0.75rem 0.75rem 0 0;
          background-color: #f3f4f6;
        }
        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.3s ease;
          display: block;
        }
        .project-image:hover {
          transform: scale(1.05);
        }
        /* Hero profile image styles */
        .hero-image-container {
          width: 320px;
          height: 320px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f3f4f6;
        }
        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-900">Pranav Puppala</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-gray-900 transition-colors nav-item"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-gray-900 transition-colors nav-item"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-gray-700 hover:text-gray-900 transition-colors nav-item"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-gray-700 hover:text-gray-900 transition-colors nav-item"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="text-gray-700 hover:text-gray-900 transition-colors nav-item"
              >
                Skills
              </button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Overlay */}
          <div className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`}>
            <button className="mobile-menu-close-button" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} className="text-gray-900" />
            </button>
            <div className="flex flex-col space-y-8 text-center">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 text-2xl font-semibold hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 text-2xl font-semibold hover:text-gray-900 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-gray-700 text-2xl font-semibold hover:text-gray-900 transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-gray-700 text-2xl font-semibold hover:text-gray-900 transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="text-gray-700 text-2xl font-semibold hover:text-gray-900 transition-colors"
              >
                Skills
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">I'm Pranav Puppala</h1>
                <div className="text-2xl md:text-3xl text-blue-600 font-semibold h-12">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-gray-600">BS in Computer Science</p>
                <p className="text-lg text-gray-600">The University of Texas at Dallas</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                const link = document.createElement('a');
                link.href = 'Pranav_Resume.pdf'; 
                link.download = 'Pranav_Puppala_Resume.pdf';  
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                }}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hero-social-icon hero-github-icon bg-transparent"
                    onClick={() => window.open("https://github.com/PranavPuppala", "_blank")}
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hero-social-icon hero-instagram-icon bg-transparent"
                    onClick={() => window.open("https://www.instagram.com/pranav_puppala", "_blank")}
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hero-social-icon hero-linkedin-icon bg-transparent"
                    onClick={() => window.open("https://www.linkedin.com/in/pranav-puppala", "_blank")}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="hero-image-container">
                <img src="public\Pranav.jpeg" alt="Pranav Puppala" className="hero-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">About Me</h2>
          <div className="text-lg text-gray-600 leading-relaxed">
            <p>
              My name is Naga Pranav Puppala, and I'm a senior at the University of Texas at Dallas, pursuing a
              Bachelor's degree in Computer Science. My areas of interest are web development and machine learning, and I
              am extremely passionate about these fields. I enjoy solving problems and collaborating with my peers to
              achieve common goals. I love learning new skills and taking on challenges that help me expand my knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Work Experience</h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Undergraduate Research Assistant</CardTitle>
              <CardDescription className="text-lg">
                The University of Texas at Dallas • Richardson, TX <br />
                <span className="font-semibold">Feb 2024 – Present</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Participating in an undergraduate research group focused on developing advanced network intrusion
                  detection systems using machine learning techniques.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Trained machine learning models such as RandomForest, EllipticEnvelope, and regression techniques to
                  identify anomalies in network traffic, focusing on detecting threats like SYN flood and DDoS attacks.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Reduced false positive rates by 30% and achieved a precision of 92% and recall of 88% by implementing
                  one-class classifiers with unsupervised machine learning techniques in Python.
                </li>
              </ul>
            </CardContent>
          </Card>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Education</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Bachelor of Science in Computer Science</CardTitle>
              <CardDescription className="text-lg">
                University of Texas at Dallas <br />
                <span className="font-semibold">2023 – Present</span>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                style={{ paddingTop: '0px' }}
                onClick={() => window.open(project.link, "_blank")}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    style={{ display: 'block' }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {project.title}
                    <ExternalLink className="h-4 w-4" />
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => {
                      const colors = techColors[tech] || { bg: "#6b7280", text: "white" }
                      return (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            border: "none",
                          }}
                        >
                          {tech}
                        </Badge>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(techStack).map(([category, skills]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => {
                      const colors = techColors[skill] || { bg: "#6b7280", text: "white" }
                      return (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-sm border-0"
                          style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                          }}
                        >
                          {skill}
                        </Badge>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Pranav Puppala</h3>
            <p className="text-gray-400 mb-6">
              Computer Science Student | Machine Learning Enthusiast | Aspiring Full Stack Developer
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <Button
                variant="ghost"
                size="icon"
                className="footer-social-icon text-white"
                onClick={() => window.open("https://github.com/PranavPuppala", "_blank")}
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="footer-social-icon text-white"
                onClick={() => window.open("https://www.instagram.com/pranav_puppala", "_blank")}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="footer-social-icon text-white"
                onClick={() => window.open("https://www.linkedin.com/in/pranav-puppala", "_blank")}
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">© 2025 Pranav Puppala. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

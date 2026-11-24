import { useEffect, useState } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import SkillsUniverse from './components/SkillsUniverse'
import ProjectsShowcase from './components/ProjectsShowcase'
import ExperienceCards from './components/ExperienceCards'
import EducationJourney from './components/EducationJourney'
import AchievementsCertifications from './components/AchievementsCertifications'
import {
  ArrowUpRight, Github, Linkedin, Mail, Download, Menu, X,
  Code2, BrainCircuit, Database, Workflow, BarChart3, MapPin,
  ChevronDown, Sparkles
} from 'lucide-react'

const github = import.meta.env.VITE_GITHUB_URL || 'https://github.com/yash0taywade'
const linkedin = import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/yash-taywade-155550387/'
const leetcode = import.meta.env.VITE_LEETCODE_URL || 'https://leetcode.com/u/yash_taywade/'
const email = `mailto:${import.meta.env.VITE_EMAIL || 'yashtaywade83757@gmail.com'}`
const portraitUrl = import.meta.env.VITE_PORTRAIT_URL || `${import.meta.env.BASE_URL}yash-hero-profile.png`
const resumeUrl = `${import.meta.env.BASE_URL}YASH__TAYWADE%20.pdf`

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } }
}

const pageNames = ['about', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact']
const readPage = () => {
  const segment = window.location.pathname.replace(/\/$/, '').split('/').pop()
  return pageNames.includes(segment) ? segment : 'home'
}

function App() {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(readPage)

  useEffect(() => {
    const syncPage = () => setPage(readPage())
    window.addEventListener('popstate', syncPage)
    return () => window.removeEventListener('popstate', syncPage)
  }, [])

  const navigate = (event, path) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.history.pushState({}, '', path)
    setPage(readPage())
    setOpen(false)
    window.scrollTo(0, 0)
  }

  const followNavLink = (event, path) => {
    if (path.startsWith('#')) {
      setOpen(false)
      return
    }
    navigate(event, path)
  }

  const nav = [
    ['About', page === 'home' ? '#about' : '/about'],
    ['Skills', page === 'home' ? '#skills' : '/skills'],
    ['Projects', page === 'home' ? '#projects' : '/projects'],
    ['Experience', page === 'home' ? '#experience' : '/experience'],
    ['Contact', page === 'home' ? '#contact' : '/contact'],
  ]

  return (
    <MotionConfig reducedMotion="user">
    <div className="site-shell min-h-screen selection:bg-violet-500/30">
      <div className="noise" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <header className="site-header sticky top-0 z-50 w-full border-b border-white/[0.06] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:px-8">
          <a href="/" onClick={event => navigate(event, '/')} className="group flex items-center gap-3">
            <span className="brand-mark grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-bold shadow-lg shadow-violet-500/10">YT</span>
            <span className="hidden text-sm font-semibold tracking-wide sm:block">Yash Taywade</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map(([label, href]) => (
              <a key={label} href={href} onClick={event => followNavLink(event, href)} className="nav-link" aria-current={page !== 'home' && page === href.slice(1) ? 'page' : undefined}>{label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={page === 'home' ? '#contact' : '/contact'} onClick={event => followNavLink(event, page === 'home' ? '#contact' : '/contact')} className="talk-btn hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium transition hover:border-violet-400/40 hover:bg-violet-500/10 md:flex">Let's Talk <ArrowUpRight size={15} /></a>
          </div>

          <button onClick={() => setOpen(!open)} className="rounded-lg border border-white/10 p-2 md:hidden" aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/[0.06] bg-[#09090d] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              {nav.map(([label, href]) => (
                <a key={label} href={href} onClick={event => followNavLink(event, href)} className="text-sm text-white/70 hover:text-white" aria-current={page !== 'home' && page === href.slice(1) ? 'page' : undefined}>{label}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      <motion.main key={page} data-page={page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .28, ease: 'easeOut' }}>
        <section id="top" className="hero-section relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-6xl items-center px-5 pb-24 pt-14 lg:px-8">
          <div className="hero-grid grid w-full items-center gap-14 lg:grid-cols-[1.12fr_.88fr]">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3 py-1.5 text-xs font-medium text-violet-200">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Available for opportunities
              </div>

              <p className="hero-eyebrow mb-4 text-sm font-medium uppercase tracking-[0.28em] text-white/40">Hello, I'm</p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[88px]">
                Yash <span className="gradient-text">Taywade.</span>
              </h1>
              <h2 className="mt-7 text-xl font-medium text-white/80 sm:text-2xl">
                AI/ML Developer <span className="text-white/25">·</span> Python Developer
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
                I build intelligent applications, machine learning solutions and automated workflows that solve real-world problems using Python, AI and modern technologies.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#projects" className="primary-btn">View My Work <ArrowUpRight size={17} /></a>
                <a href={resumeUrl} download className="secondary-btn"><Download size={16} /> Download Resume</a>
              </div>

              <div className="mt-9 flex items-center gap-5 text-white/45">
                <a className="social" href={github} target="_blank" rel="noreferrer"><Github size={19} /></a>
                <a className="social" href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={19} /></a>
                <a className="social" href={leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode profile" title="LeetCode"><Code2 size={19} /></a>
                <a className="social" href={email}><Mail size={19} /></a>
                <span className="h-5 w-px bg-white/10" />
                <span className="flex items-center gap-2 text-xs"><MapPin size={14} /> Bhopal, India</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: .96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .8, delay: .15 }}
              className="hero-profile-wrap portrait-stage relative mx-auto w-full"
              aria-label="Animated orbital rings and developer skill cards"
            >
              <div className="neon-orbit orbit-one" aria-hidden="true" />
              <div className="neon-orbit orbit-two" aria-hidden="true" />
              <div className="neon-orbit orbit-three" aria-hidden="true" />
              <div className="portrait-aura" aria-hidden="true" />
              {portraitUrl && <img className="hero-portrait" src={portraitUrl} alt="Yash Taywade working on a laptop" />}
              <div className="floating-skill skill-python"><Code2 size={19} /><div><strong>Python</strong><span>Build · Analyze · Automate</span></div></div>
              <div className="floating-skill skill-ai"><BrainCircuit size={20} /><div><strong>AI / ML</strong><span>Models · Applications</span></div></div>
              <div className="floating-skill skill-sql"><Database size={19} /><div><strong>SQL &amp; Data</strong><span>Query · Analyze</span></div></div>
              <div className="floating-skill skill-automation"><Workflow size={20} /><div><strong>Automation</strong><span>APIs · Workflows</span></div></div>
              <div className="floating-skill skill-analytics"><BarChart3 size={19} /><div><strong>Data Analytics</strong><span>Insights · Visualization</span></div></div>
            </motion.div>
          </div>

          <div className="hero-bottomline absolute bottom-5 left-5 right-5 flex items-center justify-between lg:left-8 lg:right-8">
            <p className="hero-tagline">Designing intelligence <span>·</span> Building solutions <span>·</span> Automating the future</p>
            <a href="#about" className="scroll-cue flex items-center gap-2 text-xs"><span>Scroll to explore</span><ChevronDown size={15} /></a>
          </div>
        </section>

        <section id="about" className="section">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={fadeUp}>
            <div className="section-label">01 — About</div>
            <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
              <h2 className="section-title">Curious by nature.<br /><span className="muted">Builder by choice.</span></h2>
              <div>
                <p className="large-copy">I'm a Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning, with a strong interest in software development, AI applications, and intelligent automation.</p>
                <p className="mt-5 leading-7 text-white/45">I enjoy turning ideas into practical solutions by combining programming, machine learning, data analytics, and modern technologies. My experience includes working on AI-driven applications, backend development, computer vision systems, and automated workflows.</p>
                <p className="mt-5 leading-7 text-white/45">I'm passionate about solving real-world problems, continuously learning new technologies, and building solutions that are practical, efficient, and meaningful.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {(page === 'home' || page === 'skills') && <SkillsUniverse />}

        <ProjectsShowcase />

        <section id="experience" className="section border-y border-white/[0.05]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={fadeUp}>
            <div className="section-label">04 — Professional Experience</div>
            <div className="experience-intro">
              <h2 className="section-title">From code fundamentals to<br /><span className="muted">intelligent workflows.</span></h2>
              <p>Experience across Python development, AI and operational automation.</p>
            </div>
            <ExperienceCards />
          </motion.div>
        </section>

        <section id="education" className="section education-section border-b border-white/[0.05]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={fadeUp}>
            <div className="section-label">05 — Education</div>
            <div className="education-intro">
              <h2 className="section-title">From school foundations<br /><span className="muted">to AI &amp; ML specialization.</span></h2>
              <p>My academic journey from school to Computer Science and Engineering.</p>
            </div>
            <EducationJourney />
          </motion.div>
        </section>

        <section id="certifications" className="section certifications-section border-b border-white/[0.05]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={fadeUp}>
            <div className="section-label">06 — Achievements &amp; Certifications</div>
            <AchievementsCertifications />
          </motion.div>
        </section>

        <section id="contact" className="section">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={fadeUp} className="contact-card">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-violet-300/20 bg-violet-400/10"><Mail size={19} className="text-violet-200" /></div>
              <p className="section-label justify-center">07 — Contact</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Let's build something<br /><span className="gradient-text">useful together.</span></h2>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/40">Open to software development, AI/ML and practical engineering opportunities.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={email} className="primary-btn">Send me an email <ArrowUpRight size={17} /></a>
                <a href={linkedin} target="_blank" rel="noreferrer" className="secondary-btn"><Linkedin size={16} /> LinkedIn</a>
              </div>
            </div>
          </motion.div>
        </section>
      </motion.main>

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© 2026 Yash Taywade. Built with React.</span>
          <div className="flex gap-5">
            <a href={github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
            <a href={leetcode} target="_blank" rel="noreferrer" className="hover:text-white">LeetCode</a>
          </div>
        </div>
      </footer>
    </div>
    </MotionConfig>
  )
}

export default App

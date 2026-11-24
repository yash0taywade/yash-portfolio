import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, AudioLines,
  ChartNoAxesColumnIncreasing, Check, ClipboardList,
  Code2, GraduationCap, HeartPulse, ScanEye, ShieldCheck, Github,
  Workflow, X,
} from 'lucide-react'
import { projectCategories, projects } from '../data/projects'

const projectIcons = {
  vision: ScanEye,
  health: HeartPulse,
  agent: Workflow,
  analytics: ChartNoAxesColumnIncreasing,
  activity: Activity,
  tasks: ClipboardList,
  education: GraduationCap,
  shield: ShieldCheck,
  voice: AudioLines,
}

function ProjectVisual({ project, featured = false }) {
  const Icon = projectIcons[project.visual] || Code2
  return (
    <div className={`project-visual visual-${project.visual} ${featured ? 'is-featured' : ''}`} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-orbit visual-orbit-one" />
      <div className="visual-orbit visual-orbit-two" />
      <div className="visual-core"><Icon strokeWidth={1.35} /></div>
      {project.visual === 'voice' && <div className="voice-visual-content">
        <div className="voice-waveform" aria-label="Animated voice waveform visualization">{Array.from({ length: 31 }, (_, index) => <i key={index} style={{ '--wave-index': index, '--wave-height': `${12 + [0, 2, 4, 1, 5, 3][index % 6] * 8}px` }} />)}</div>
        <div className="voice-agent-modules">{project.agents.map((agent, index) => <span key={agent}><i>0{index + 1}</i>{agent}</span>)}</div>
      </div>}
      <span className="visual-signal signal-one" />
      <span className="visual-signal signal-two" />
      <span className="visual-signal signal-three" />
      <span className="visual-caption">{project.number} <i /> {project.category}</span>
    </div>
  )
}

function ProjectTags({ project, selectedTechnology, onSelect, interactive = true, limit = 4 }) {
  if (!project.technologies.length) return <span className="project-tags-pending">Stack pending verification</span>
  const visibleTags = project.technologies.slice(0, limit)
  return (
    <div className="project-tags">
      {visibleTags.map(tag => interactive ? (
        <button type="button" key={tag} className={`project-tech-tag ${selectedTechnology === tag ? 'is-active' : ''}`} onClick={() => onSelect(selectedTechnology === tag ? '' : tag)} aria-pressed={selectedTechnology === tag} aria-label={`Filter projects by ${tag}`}>{tag}</button>
      ) : <span className="project-tech-tag" key={tag}>{tag}</span>)}
      {project.technologies.length > visibleTags.length && <span className="project-tech-more">+{project.technologies.length - visibleTags.length}</span>}
    </div>
  )
}

function ProjectDetail({ project, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const focusable = [...dialogRef.current.querySelectorAll('button:not(:disabled),a[href]')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus?.()
    }
  }, [onClose])

  const Icon = projectIcons[project.visual] || Code2
  return (
    <motion.div className="project-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <motion.section
        ref={dialogRef}
        className={`project-modal accent-${project.accent}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        initial={{ opacity: 0, y: 24, scale: .98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: .985 }}
        transition={{ duration: .24, ease: 'easeOut' }}
      >
        <div className="modal-topline"><span className="modal-kicker"><i /> PROJECT CASE STUDY · {project.number}</span><button ref={closeButtonRef} className="modal-close" type="button" onClick={onClose} aria-label="Close project details"><X size={18} /></button></div>
        <div className="modal-project-heading"><span className="modal-project-icon"><Icon size={21} /></span><div><span className="modal-category">{project.category}</span><h2 id="project-modal-title">{project.title}</h2></div></div>
        <div className="modal-scroll-area">
          <p className="modal-overview">{project.description}</p>
          <div className="modal-detail-grid">
            <div className="modal-detail-block"><span className="modal-label">THE PROBLEM</span><p>{project.problem}</p></div>
            <div className="modal-detail-block"><span className="modal-label">THE APPROACH</span><p>{project.solution}</p></div>
          </div>
          <div className="modal-features"><span className="modal-label">FEATURES & CAPABILITIES</span><ul>{project.features.map(feature => <li key={feature}><Check size={14} />{feature}</li>)}</ul></div>
          <div className="modal-stack"><span className="modal-label">TECHNOLOGY STACK</span><ProjectTags project={project} interactive={false} limit={project.technologies.length} /></div>
          <div className="modal-implementation"><span className="modal-label">IMPLEMENTATION NOTES</span><p>{project.implementation}</p></div>
        </div>
        <div className="modal-footer"><span>{project.number} <i /> {projects.length.toString().padStart(2, '0')}</span>{project.repository && <a className="project-repo-link" href={project.repository} target="_blank" rel="noreferrer"><Github size={14} /> View source</a>}<div className="modal-project-nav"><button type="button" onClick={() => onNavigate(-1)} aria-label="Previous project"><ArrowLeft size={17} /></button><button type="button" onClick={() => onNavigate(1)} aria-label="Next project"><ArrowRight size={17} /></button></div></div>
      </motion.section>
    </motion.div>
  )
}

function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [selectedTechnology, setSelectedTechnology] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const gridRef = useRef(null)

  const filteredProjects = useMemo(() => projects.filter(project => {
    const matchesCategory = activeCategory === 'All Projects' || project.categories.includes(activeCategory)
    const matchesTechnology = !selectedTechnology || project.technologies.includes(selectedTechnology)
    return matchesCategory && matchesTechnology
  }), [activeCategory, selectedTechnology])

  const featuredProject = filteredProjects.find(project => project.featured) || filteredProjects[0]
  const gridProjects = filteredProjects.filter(project => project !== featuredProject)

  const openProject = project => setSelectedProject(project)
  const closeProject = useCallback(() => setSelectedProject(null), [])
  const navigateProject = useCallback(direction => {
    const currentIndex = projects.findIndex(project => project.number === selectedProject?.number)
    const nextIndex = (currentIndex + direction + projects.length) % projects.length
    setSelectedProject(projects[nextIndex])
  }, [selectedProject])
  const setCategory = category => {
    setActiveCategory(category)
    setSelectedTechnology('')
  }
  const setTechnology = technology => {
    setSelectedTechnology(technology)
    if (technology) requestAnimationFrame(() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
  }

  return (
    <section id="projects" className="section projects-section">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .08 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: .07 } } }}>
        <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: .5 } } }}>
          <div className="section-label">03 — Selected work</div>
          <div className="projects-heading-row">
            <div><h2 className="section-title">Projects that<br /><span className="muted">solve problems.</span></h2><p className="projects-lede">A closer look at the ideas, workflows and applications behind my work.</p></div>
            <a href={import.meta.env.VITE_GITHUB_URL || 'https://github.com/yash0taywade'} target="_blank" rel="noreferrer" className="projects-github-link">View GitHub <ArrowUpRight size={15} /></a>
          </div>
          <div className="project-stats" aria-label="Portfolio project statistics"><div><strong>{projects.length.toString().padStart(2, '0')}</strong><span>PROJECTS</span></div><i /><div><strong>{projectCategories.length.toString().padStart(2, '0')}</strong><span>DOMAINS</span></div><p>Selected work <ArrowDownRight size={14} /></p></div>
        </motion.div>

        <motion.div className="project-explorer" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: .5 } } }}>
          <div className="project-filter-row" aria-label="Filter projects by category">
            <span className="filter-caption">EXPLORE BY</span>
            {['All Projects', ...projectCategories].map(category => <button key={category} type="button" className={activeCategory === category ? 'is-active' : ''} onClick={() => setCategory(category)} aria-pressed={activeCategory === category}>{category}</button>)}
          </div>

          <AnimatePresence mode="wait">
            {filteredProjects.length ? <motion.div key={`${activeCategory}-${selectedTechnology}`} className="project-results" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: .2 }}>
              <div className="results-count"><span><b>{filteredProjects.length.toString().padStart(2, '0')}</b> {filteredProjects.length === 1 ? 'project' : 'projects'}</span>{selectedTechnology && <button type="button" onClick={() => setTechnology('')}>Filtered by {selectedTechnology} <X size={12} /></button>}</div>
              {featuredProject && <article className={`featured-project accent-${featuredProject.accent}`} onPointerMove={event => { if (event.pointerType !== 'touch') { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--glow-x', `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty('--glow-y', `${event.clientY - rect.top}px`) } }}>
                <ProjectVisual project={featuredProject} featured />
                <div className="featured-copy"><div className="featured-meta"><span className="featured-label"><span /> FEATURED PROJECT</span><span className="featured-number">{featuredProject.number} / {projects.length.toString().padStart(2, '0')}</span></div><span className="project-category-label">{featuredProject.category}</span><h3>{featuredProject.title}</h3><p>{featuredProject.description}</p><ProjectTags project={featuredProject} selectedTechnology={selectedTechnology} onSelect={setTechnology} /><div className="project-actions"><button className="project-detail-link" type="button" onClick={() => openProject(featuredProject)}>Explore case study <ArrowUpRight size={15} /></button>{featuredProject.repository && <a className="project-repo-link" href={featuredProject.repository} target="_blank" rel="noreferrer"><Github size={14} /> View source</a>}</div></div>
                <span className="featured-watermark" aria-hidden="true">{featuredProject.number}</span>
              </article>}

              <div ref={gridRef} className="project-grid" aria-label="Project cards">
                {gridProjects.map((project, index) => <motion.article key={project.number} className={`project-card-v2 accent-${project.accent}`} onPointerMove={event => { if (event.pointerType !== 'touch') { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--glow-x', `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty('--glow-y', `${event.clientY - rect.top}px`) } }} initial={{ opacity: 0, y: 17 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .38, delay: Math.min(index * .045, .18) }}>
                  <button className="project-card-open" type="button" onClick={() => openProject(project)} aria-label={`Open ${project.title} case study`}>
                    <ProjectVisual project={project} />
                    <div className="project-card-meta"><span>{project.number} <i /> {project.category}</span><span className="project-card-arrow"><ArrowUpRight size={16} /></span></div>
                    <h3>{project.title}</h3><p>{project.description}</p>
                    <span className="project-card-more">VIEW CASE STUDY <ArrowRight size={13} /></span>
                  </button>
                  <ProjectTags project={project} selectedTechnology={selectedTechnology} onSelect={setTechnology} />
                  {project.repository && <a className="project-repo-link project-repo-card-link" href={project.repository} target="_blank" rel="noreferrer"><Github size={13} /> View source <ArrowUpRight size={12} /></a>}
                </motion.article>)}
              </div>
              {gridProjects.length === 0 && filteredProjects.length === 1 && <p className="project-grid-note">This is the only project matching the selected filter.</p>}
            </motion.div> : <motion.div className="project-empty-state" key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span>No matching projects</span><button type="button" onClick={() => { setCategory('All Projects'); setTechnology('') }}>Reset filters</button></motion.div>}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <AnimatePresence>{selectedProject && <ProjectDetail project={selectedProject} onClose={closeProject} onNavigate={navigateProject} />}</AnimatePresence>
    </section>
  )
}

export default ProjectsShowcase

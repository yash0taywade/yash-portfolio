import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, BarChart3, BrainCircuit, Braces, Check, Code2,
  Database, GitBranch, Layers3, Network, Palette, Sparkles, Terminal,
  Workflow, Wrench, X,
} from 'lucide-react'
import { skillCategories } from '../data/skills'

const iconMap = {
  brain: BrainCircuit, branch: GitBranch, chart: BarChart3, code: Code2,
  database: Database, network: Network, palette: Palette, spark: Sparkles,
  terminal: Terminal, tools: Wrench, workflow: Workflow,
}
const networkEdges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3], [1, 4], [2, 5]]

function SkillIcon({ name, size = 16 }) {
  const Icon = iconMap[name] || Braces
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />
}

function SkillsUniverse() {
  const [activeCategory, setActiveCategory] = useState('programming')
  const [activeTechnology, setActiveTechnology] = useState(null)

  const selectCategory = id => {
    setActiveCategory(id)
    setActiveTechnology(null)
  }
  const handlePointerMove = event => {
    if (event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    event.currentTarget.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
  }

  const activeCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter(category => category.id === activeCategory)

  return (
    <section id="skills" className="section skills-section">
      <motion.div className="skills-content" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .12 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: .09 } } }}>
        <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: .55 } } }}>
          <div className="section-label">02 — Skills</div>
          <div className="skills-intro">
            <div><h2 className="skills-title">Beyond the code.<br /><span>Inside my toolkit.</span></h2></div>
            <div className="skills-intro-copy">
              <p>Technologies, tools and concepts I use to turn ideas into practical solutions.</p>
              <span className="explore-cue"><span className="explore-pulse" /> Explore my stack</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="universe-panel"
          onPointerMove={handlePointerMove}
          onPointerLeave={event => {
            event.currentTarget.style.setProperty('--pointer-x', '50%')
            event.currentTarget.style.setProperty('--pointer-y', '50%')
          }}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: .6 } } }}
          role="region"
          aria-label="Interactive developer toolkit visualization"
        >
          <div className="universe-glow" aria-hidden="true" />
          <div className="universe-topline">
            <span className="universe-label"><span className="status-dot" /> LIVE SYSTEM MAP</span>
            <span className="universe-hint">Select a node to explore</span>
          </div>

          <div className="universe-stage">
            <svg className="universe-connections" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
              {networkEdges.map(([fromIndex, toIndex], index) => {
                const from = skillCategories[fromIndex]
                const to = skillCategories[toIndex]
                const isActive = activeCategory === 'all' || activeCategory === from.id || activeCategory === to.id
                const midX = (from.position.x + to.position.x) / 2
                const midY = (from.position.y + to.position.y) / 2
                return <motion.path key={`${from.id}-${to.id}`} className={`universe-link ${isActive ? 'is-active' : ''}`} d={`M ${from.position.x} ${from.position.y} Q ${midX} ${midY} ${to.position.x} ${to.position.y}`} initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: isActive ? .76 : .2 }} animate={{ opacity: isActive ? .76 : .2 }} transition={{ pathLength: { duration: .7, delay: index * .04 }, opacity: { duration: .3 } }} />
              })}
              {[[340, 170, 1], [660, 315, 1.6], [415, 430, 2.2], [580, 120, 2.8], [300, 340, 3.4], [700, 205, 4]].map(([cx, cy, delay], index) => (
                <motion.circle key={index} className="universe-particle" cx={cx} cy={cy} r="2" animate={{ opacity: [.2, .8, .2], scale: [.8, 1.4, .8] }} transition={{ duration: 3.4, delay, repeat: Infinity, ease: 'easeInOut' }} />
              ))}
            </svg>

            {skillCategories.map((category, index) => {
              const Icon = iconMap[category.icon] || Layers3
              return (
                <motion.button
                  type="button" key={category.id}
                  className={`universe-node node-${category.id} ${activeCategory === category.id ? 'is-selected' : ''}`}
                  style={{ left: `${category.position.x / 10}%`, top: `${category.position.y / 5.6}%`, '--node-delay': `${index * -.7}s` }}
                  onClick={() => selectCategory(category.id)} whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: .97 }}
                  aria-pressed={activeCategory === category.id}
                >
                  <span className="node-icon"><Icon size={17} /></span>
                  <span className="node-copy"><strong>{category.nodeLabel}</strong><small>{String(category.technologies.length).padStart(2, '0')} technologies</small></span>
                  <span className="node-indicator" />
                </motion.button>
              )
            })}
          </div>

          <div className="mobile-category-picker" aria-label="Choose a technology category">
            {skillCategories.map(category => <button type="button" key={category.id} onClick={() => selectCategory(category.id)} className={activeCategory === category.id ? 'is-selected' : ''} aria-pressed={activeCategory === category.id}><SkillIcon name={category.icon} size={15} />{category.label}</button>)}
          </div>

          <div className="category-filter" aria-label="Technology filters">
            <span>FILTER STACK</span>
            <button type="button" className={activeCategory === 'all' ? 'is-active' : ''} onClick={() => selectCategory('all')} aria-pressed={activeCategory === 'all'}><Layers3 size={14} /> All technologies</button>
            {skillCategories.map(category => <button type="button" key={category.id} className={activeCategory === category.id ? 'is-active' : ''} onClick={() => selectCategory(category.id)} aria-pressed={activeCategory === category.id}>{category.label}</button>)}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} className="technology-panel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .24 }}>
            <div className="technology-panel-heading">
              <div><span className="panel-overline">{activeCategory === 'all' ? 'COMPLETE STACK' : 'SELECTED DOMAIN'}</span><h3>{activeCategory === 'all' ? 'All technologies' : activeCategories[0]?.label}</h3></div>
              <span className="panel-count">{activeCategories.reduce((total, category) => total + category.technologies.length, 0)} TOOLS</span>
            </div>
            <div className={activeCategory === 'all' ? 'all-tech-groups' : ''}>
              {activeCategories.map(category => (
                <div className="technology-group" key={category.id}>
                  {activeCategory === 'all' && <h4><SkillIcon name={category.icon} size={16} />{category.label}</h4>}
                  <div className="technology-chips">
                    {category.technologies.map((technology, index) => {
                      const isActive = activeTechnology?.name === technology.name
                      return <motion.button type="button" key={technology.name} className={`tech-chip ${isActive ? 'is-active' : ''}`} style={{ '--chip-index': index }} onClick={() => setActiveTechnology(isActive ? null : { ...technology, categoryLabel: category.label })} whileHover={{ y: -3 - (index % 3), scale: 1.03 + (index % 3) * .005, rotate: ((index % 5) - 2) * .45 }} whileTap={{ scale: .97 }} aria-expanded={isActive} aria-controls={isActive ? 'technology-detail' : undefined}><SkillIcon name={technology.icon} size={14} /><span>{technology.name}</span>{isActive ? <X size={12} className="chip-action-icon" /> : <ArrowRight size={12} className="chip-action-icon" />}</motion.button>
                    })}
                  </div>
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {activeTechnology && <motion.aside id="technology-detail" key={activeTechnology.name} className="technology-detail" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}><span className="detail-check"><Check size={15} /></span><div><strong>{activeTechnology.name}</strong><p>{activeTechnology.projects?.length ? `Related portfolio projects: ${activeTechnology.projects.join(', ')}.` : `Listed in ${activeTechnology.categoryLabel}; no related project is tagged on this portfolio.`}</p></div><button type="button" onClick={() => setActiveTechnology(null)} aria-label="Close technology detail"><X size={16} /></button></motion.aside>}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

      </motion.div>
    </section>
  )
}

export default SkillsUniverse

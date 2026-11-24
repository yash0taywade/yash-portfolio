import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownToLine, ArrowUpRight, Award, BriefcaseBusiness, ChevronDown, Code2, FolderKanban, GraduationCap } from 'lucide-react'

const publicAsset = filename => `${import.meta.env.BASE_URL}${filename}`

const achievements = [
  {
    number: '08',
    title: 'Projects built from the ground up',
    description: 'Eight hands-on projects across AI/ML, full-stack, automation, analytics and productivity.',
    detail: 'The portfolio ranges from a cyberbullying detection system and healthcare chatbot to a RAG agent, SmartEdu analytics and practical productivity tools.',
    icon: FolderKanban,
    accent: 'violet',
  },
  {
    number: '05',
    title: 'AI & machine learning projects',
    description: 'Applied AI to vision, language, healthcare and activity-recognition problems.',
    detail: 'Work includes crop-pest image analysis, cyberbullying text analysis, a healthcare chatbot, a RAG AI agent and wearable-activity recognition.',
    icon: Code2,
    accent: 'blue',
  },
  {
    number: '02',
    title: 'Career milestones',
    description: 'Python development training followed by hands-on AI/ML and automation work.',
    detail: 'Completed software development training at Braktt Technologies and worked on AI-driven communication and operational workflows at Remote Physios.',
    icon: BriefcaseBusiness,
    accent: 'cyan',
  },
]

const certifications = [
  {
    title: 'Python for Data Science',
    issuer: 'NPTEL · IIT Madras',
    year: '2024',
    detail: 'Certificate provided by Yash Taywade.',
    certificate: publicAsset('certificates/python-for-data-science-nptel.pdf'),
  },
  {
    title: 'Power BI',
    issuer: 'Microsoft / SkillUp',
    year: '2025',
    detail: 'Certification details supplied for the portfolio.',
  },
  {
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL · IIT Madras',
    year: '2026',
    detail: 'Certificate provided by Yash Taywade.',
    certificate: publicAsset('certificates/introduction-to-machine-learning-nptel.pdf'),
  },
  {
    title: 'Programming in Python',
    issuer: 'NTA',
    year: '2026',
    score: '93 / 100',
    detail: 'Certificate provided by Yash Taywade.',
    certificate: publicAsset('certificates/programming-in-python-nta.pdf'),
  },
]

function AchievementCard({ item, index }) {
  const Icon = item.icon
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article className={`ac-card ac-achievement ac-${item.accent}`} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .07, duration: .4 }}>
      <div className="ac-card-top"><span className="ac-icon"><Icon size={17} /></span><span className="ac-number">{item.number}</span></div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <button className="ac-expand" type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>
        {expanded ? 'Show less' : 'Explore milestone'} <ChevronDown size={14} className={expanded ? 'is-open' : ''} />
      </button>
      <AnimatePresence initial={false}>
        {expanded && <motion.div className="ac-expanded-copy" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .24 }}><p>{item.detail}</p></motion.div>}
      </AnimatePresence>
    </motion.article>
  )
}

function CertificationCard({ item, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article className="ac-card ac-certification" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .055, duration: .4 }}>
      <div className="ac-card-top"><span className="ac-icon"><Award size={17} /></span><span className="ac-year">{item.year}</span></div>
      <h3>{item.title}</h3>
      <div className="ac-issuer"><GraduationCap size={13} />{item.issuer}</div>
      {item.score && <span className="ac-score">Score <strong>{item.score}</strong></span>}
      <button className="ac-expand" type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>
        {expanded ? 'Hide details' : 'View details'} <ChevronDown size={14} className={expanded ? 'is-open' : ''} />
      </button>
      <AnimatePresence initial={false}>
        {expanded && <motion.div className="ac-expanded-copy" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .24 }}>
          <p>{item.detail}</p>
          {item.certificate && <a className="ac-certificate-link" href={item.certificate} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={13} /></a>}
        </motion.div>}
      </AnimatePresence>
      {item.certificate && <a className="ac-download" href={item.certificate} download aria-label={`Download ${item.title} certificate`}><ArrowDownToLine size={14} /></a>}
    </motion.article>
  )
}

export default function AchievementsCertifications() {
  const [filter, setFilter] = useState('all')
  const showAchievements = filter !== 'certifications'
  const showCertifications = filter !== 'achievements'

  return (
    <div className="ac-showcase">
      <div className="ac-intro">
        <div>
          <h2 className="section-title">Achievements <span className="gradient-text">&amp; Certifications</span></h2>
          <p>Milestones and credentials built through learning, projects and practice.</p>
        </div>
        <div className="ac-filters" role="group" aria-label="Filter achievements and certifications">
          {[['all', 'All'], ['achievements', 'Achievements'], ['certifications', 'Certifications']].map(([value, label]) => <button type="button" key={value} className={filter === value ? 'is-active' : ''} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={filter} className="ac-content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .2 }}>
          {showAchievements && <section className="ac-group" aria-labelledby="ac-achievements-title"><div className="ac-group-heading"><span className="ac-group-mark">01</span><h3 id="ac-achievements-title">Achievements</h3><span className="ac-group-rule" /></div><div className="ac-achievement-grid">{achievements.map((item, index) => <AchievementCard key={item.title} item={item} index={index} />)}</div></section>}
          {showCertifications && <section className="ac-group" aria-labelledby="ac-certifications-title"><div className="ac-group-heading"><span className="ac-group-mark">02</span><h3 id="ac-certifications-title">Certifications</h3><span className="ac-group-rule" /></div><div className="ac-certification-grid">{certifications.map((item, index) => <CertificationCard key={item.title} item={item} index={index} />)}</div></section>}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

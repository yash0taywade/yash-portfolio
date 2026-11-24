import { BriefcaseBusiness, CalendarDays } from 'lucide-react'

const experienceItems = [
  {
    id: 'remote-physios',
    number: '01',
    type: 'RECENT EXPERIENCE',
    timeline: 'SEP 2026',
    designation: 'AIML & Automation Intern',
    company: 'Remote Physios (OsteoQure Healthcare Pvt. Ltd.)',
    description: 'Building intelligent communication systems and automating operational workflows through AI, APIs and integrations.',
    contributions: [
      'WhatsApp automation & onboarding',
      'CRM and API integrations',
      'AI-driven enquiry processing',
      'Automated drip marketing pipelines',
      'Patient and physiotherapist onboarding workflows',
      'Workflow architecture and JavaScript logic',
    ],
    technologies: ['n8n', 'JavaScript', 'WhatsApp Cloud API', 'Zoho CRM', 'Google Sheets', 'REST APIs', 'Webhooks', 'AI/LLM Integration'],
    recent: true,
  },
  {
    id: 'braktt-trainee',
    number: '02',
    type: 'PREVIOUS EXPERIENCE',
    timeline: 'DEC 2024',
    designation: 'Software Development Trainee (Python)',
    company: 'Braktt Technologies Pvt. Ltd. · Bhopal',
    description: 'Completed hands-on software development training focused on Python programming, programming fundamentals, logical thinking and problem-solving.',
    contributions: [
      'Python programming fundamentals and practical coding.',
      'Problem-solving through programming exercises.',
      'Implementation of core Python concepts.',
      'Understanding structured code and programming logic.',
    ],
    technologies: ['Python', 'Programming Fundamentals', 'Problem Solving', 'Logical Thinking'],
    recent: false,
  },
]

function ExperienceCards() {
  return (
    <div className="experience-grid">
      {experienceItems.map(item => (
        <article key={item.id} className={`experience-card ${item.recent ? 'is-recent' : 'is-previous'}`}>
          <div className="experience-card-topline">
            <span className="experience-number">{item.number}</span>
            <span className={`experience-status ${item.recent ? 'status-recent' : 'status-previous'}`}><i />{item.type}</span>
            <span className="experience-timeline"><CalendarDays size={12} />{item.timeline}</span>
          </div>
          <div className="experience-summary">
            <div className="experience-title-row">
              <span className="experience-role-icon"><BriefcaseBusiness size={17} /></span>
              <h3>{item.designation}</h3>
            </div>
            <p className="experience-company">{item.company}</p>
            <p className="experience-description">{item.description}</p>
          </div>
          <div className="experience-details">
            <div className="experience-contributions">
              <span className="experience-detail-label">{item.recent ? 'CORE CONTRIBUTIONS' : 'KEY CONTRIBUTIONS'}</span>
              <ul>{item.contributions.map(contribution => <li key={contribution}><i />{contribution}</li>)}</ul>
            </div>
            <div className="experience-technologies">
              <span className="experience-detail-label">TECHNOLOGIES & SKILLS</span>
              <div className="experience-tags">{item.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ExperienceCards

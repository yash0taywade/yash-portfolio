import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, MapPin, School } from 'lucide-react'

const educationStops = [
  {
    id: 'school',
    number: '01',
    label: 'SCHOOL EDUCATION',
    title: 'Kempfort Public Co-Ed Sr. Sec. School',
    location: 'Bhopal · CBSE',
    icon: School,
    results: [['CLASS X', '79%'], ['CLASS XII', '63%']],
  },
  {
    id: 'degree',
    number: '02',
    label: 'UNDERGRADUATE',
    title: 'B.Tech — Computer Science & Engineering',
    location: 'Sagar Institute of Research and Technology · Bhopal',
    icon: GraduationCap,
    timeline: '2023 — PRESENT',
    specialization: 'Artificial Intelligence & Machine Learning',
    result: 'CGPA 7.16',
  },
]

function EducationJourney() {
  const [activeStop, setActiveStop] = useState('degree')

  return (
    <div className="education-journey">
      <svg className="education-route education-route-desktop" viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 260 92 C 365 145 466 137 550 100 S 700 39 820 52" />
      </svg>
      <svg className="education-route education-route-mobile" viewBox="0 0 40 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 20 10 C 20 115 11 145 20 245 S 29 375 20 490" />
      </svg>

      <button type="button" className={`education-stop education-stop-school ${activeStop === 'school' ? 'is-active' : ''}`} onClick={() => setActiveStop('school')} aria-pressed={activeStop === 'school'} aria-label="Select school education stop">
        <span className="education-stop-pin"><MapPin size={34} /><School className="education-stop-symbol" size={13} /></span><span className="education-stop-label">01 <i /> SCHOOL</span>
      </button>
      <button type="button" className={`education-stop education-stop-degree ${activeStop === 'degree' ? 'is-active' : ''}`} onClick={() => setActiveStop('degree')} aria-pressed={activeStop === 'degree'} aria-label="Select undergraduate degree stop">
        <span className="education-stop-pin"><MapPin size={34} /><GraduationCap className="education-stop-symbol" size={13} /></span><span className="education-stop-label">02 <i /> SIRT</span>
      </button>

      <div className="education-path">
        {educationStops.map(stop => {
          const Icon = stop.icon
          const active = activeStop === stop.id
          return (
            <motion.button
              type="button"
              key={stop.id}
              className={`education-entry ${stop.id === 'degree' ? 'education-degree' : 'education-school'} ${active ? 'is-selected' : ''}`}
              onClick={() => setActiveStop(stop.id)}
              aria-pressed={active}
              whileHover={{ y: -3 }}
              whileTap={{ scale: .99 }}
            >
              <span className="education-entry-top"><span>{stop.number}</span><span>{stop.label}</span>{stop.timeline && <span>{stop.timeline}</span>}</span>
              <span className="education-entry-title"><span className="education-entry-icon"><Icon size={17} /></span><strong>{stop.title}</strong></span>
              <span className="education-institution">{stop.location}</span>
              {stop.results && <span className="education-results">{stop.results.map(([label, result]) => <span key={label}><span>{label}</span><strong>{result}</strong></span>)}</span>}
              {stop.specialization && <span className="education-degree-footer"><span>Specialization · {stop.specialization}</span><strong>{stop.result}</strong></span>}
              <span className="education-selected-note">{active ? 'JOURNEY STOP SELECTED' : 'SELECT THIS STOP'}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default EducationJourney

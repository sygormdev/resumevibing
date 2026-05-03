import { CVData } from '@/types/cv'

interface Props {
  data: CVData
}

export default function Template10({ data }: Props) {
  const { personalInfo, experience, education, skills, languages, certifications, projects, awards } = data
  const primaryColor = data.colorScheme || '#6366f1'
  const fontFamily = data.fontFamily || 'Inter'

  const sectionOrder = data.sectionOrder || ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'awards']

  const renderSection = (sectionId: string, isLeft: boolean) => {
    switch (sectionId) {
      case 'experience':
        return experience.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h3 className="font-bold text-white">{exp.position}</h3>
                <p className="text-sm" style={{ color: primaryColor }}>{exp.company}</p>
                <p className="text-neutral-500 text-xs">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                <p className="text-neutral-400 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </section>
        ) : null
      case 'education':
        return education.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold text-white text-sm">{edu.school}</h3>
                <p className="text-neutral-400 text-xs">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                <p className="text-neutral-500 text-xs">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        ) : null
      case 'skills':
        return skills.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs text-neutral-300 px-2 py-1 rounded" style={{ backgroundColor: '#262626' }}>{skill.name}</span>
              ))}
            </div>
          </section>
        ) : null
      case 'languages':
        return languages.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Languages</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-sm text-neutral-300 mb-1">{lang.name} <span style={{ color: primaryColor }}>({lang.level})</span></p>
            ))}
          </section>
        ) : null
      case 'certifications':
        return certifications.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <p className="text-white text-sm">{cert.name}</p>
                <p className="text-neutral-500 text-xs">{cert.issuer}, {cert.date}</p>
              </div>
            ))}
          </section>
        ) : null
      case 'projects':
        return projects.length > 0 ? (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <h3 className="font-medium text-white text-sm">{proj.name}</h3>
                <p className="text-neutral-400 text-xs">{proj.description}</p>
                {proj.technologies.length > 0 && <p className="text-neutral-500 text-xs">{proj.technologies.join(', ')}</p>}
              </div>
            ))}
          </section>
        ) : null
      case 'awards':
        return awards.length > 0 ? (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Awards</h2>
            {awards.map((award) => (
              <div key={award.id} className="mb-2">
                <p className="text-white text-sm">{award.name}</p>
                <p className="text-neutral-500 text-xs">{award.issuer}, {award.date}</p>
              </div>
            ))}
          </section>
        ) : null
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily, backgroundColor: '#171717' }}>
      <div className="max-w-[800px] mx-auto my-8 shadow-2xl border" style={{ backgroundColor: '#0c0c0c', borderColor: '#262626' }}>
        <div className="px-8 py-10 border-b" style={{ borderColor: '#262626' }}>
          <div className="flex items-center gap-6 mb-4">
            {personalInfo.photo && (
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2" style={{ borderColor: primaryColor }}>
                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex items-end justify-between flex-1">
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
                <p className="text-sm uppercase tracking-widest" style={{ color: primaryColor }}>{personalInfo.title || 'Professional Title'}</p>
              </div>
              <div className="flex gap-4 text-xs text-neutral-500">
                {personalInfo.email && <span>{personalInfo.email}</span>}
                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                {personalInfo.location && <span>{personalInfo.location}</span>}
                {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                {personalInfo.website && <span>{personalInfo.website}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {personalInfo.summary && (
            <section className="mb-6">
              <p className="text-neutral-400 text-sm leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          <div className="grid grid-cols-2 gap-8">
            <div>
              {sectionOrder.map((sectionId) => (
                <div key={sectionId}>{renderSection(sectionId, true)}</div>
              ))}
            </div>
            <div>
              {/* Right column - mirror of left but different styling can be applied */}
              {sectionOrder.map((sectionId) => (
                <div key={sectionId}>{renderSection(sectionId, false)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

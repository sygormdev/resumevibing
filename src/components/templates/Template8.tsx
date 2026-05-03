import { CVData } from '@/types/cv'

interface Props {
  data: CVData
}

export default function Template8({ data }: Props) {
  const { personalInfo, experience, education, skills, languages, certifications, projects, awards } = data
  const primaryColor = data.colorScheme || '#d97706'
  const fontFamily = data.fontFamily || 'Cambria'

  const sectionOrder = data.sectionOrder || ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'awards']

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'experience':
        return experience.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Career History</h2>
            {experience.map((exp, index) => (
              <div key={exp.id} className="mb-5 relative pl-6">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                {index < experience.length - 1 && <div className="absolute left-1 w-0.5 h-full bg-gray-200 top-5"></div>}
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-sm font-medium" style={{ color: primaryColor }}>{exp.company}</p>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </section>
        ) : null
      case 'education':
        return education.length > 0 ? (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Academic Background</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">{edu.school}</h3>
                <p className="text-sm" style={{ color: primaryColor }}>{edu.degree} {edu.field && `in ${edu.field}`}</p>
                <p className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        ) : null
      case 'skills':
        return skills.length > 0 ? (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Core Competencies</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">{skill.name}</span>
              ))}
            </div>
          </section>
        ) : null
      case 'languages':
        return languages.length > 0 ? (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Languages</h2>
            <div className="flex gap-4">
              {languages.map((lang) => (
                <span key={lang.id} className="text-sm text-gray-700">{lang.name} <span className="text-gray-500">({lang.level})</span></span>
              ))}
            </div>
          </section>
        ) : null
      case 'certifications':
        return certifications.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <span className="font-medium text-gray-900 text-sm">{cert.name}</span>
                <span className="text-gray-500 text-xs"> — {cert.issuer}, {cert.date}</span>
              </div>
            ))}
          </section>
        ) : null
      case 'projects':
        return projects.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <span className="font-medium text-gray-900 text-sm">{proj.name}</span>
                {proj.url && <a href={proj.url} className="text-xs ml-2" style={{ color: primaryColor }}>↗</a>}
                <p className="text-gray-600 text-xs">{proj.description}</p>
                {proj.technologies.length > 0 && <p className="text-gray-400 text-xs">{proj.technologies.join(', ')}</p>}
              </div>
            ))}
          </section>
        ) : null
      case 'awards':
        return awards.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Awards</h2>
            {awards.map((award) => (
              <div key={award.id} className="mb-2">
                <span style={{ color: primaryColor }}>★ </span>
                <span className="font-medium text-gray-900 text-sm">{award.name}</span>
                <p className="text-gray-500 text-xs">{award.issuer}, {award.date}</p>
              </div>
            ))}
          </section>
        ) : null
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily }}>
      <div className="max-w-[800px] mx-auto bg-white shadow-lg">
        <div className="text-center px-8 py-10 text-white flex flex-col items-center gap-4" style={{ backgroundColor: '#1c1917' }}>
          {personalInfo.photo && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2" style={{ borderColor: primaryColor }}>
              <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold tracking-wide">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-gray-400 mt-2 uppercase tracking-widest text-sm" style={{ color: primaryColor }}>{personalInfo.title || 'Professional Title'}</p>
            <div className="flex justify-center gap-6 mt-4 text-xs text-gray-400">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
            </div>
          </div>
        </div>

        <div className="p-8">
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: primaryColor }}>Profile</h2>
              <p className="text-gray-700 text-sm leading-relaxed border-l-4 pl-4" style={{ borderColor: primaryColor }}>{personalInfo.summary}</p>
            </section>
          )}
          {sectionOrder.map((sectionId) => <div key={sectionId}>{renderSection(sectionId)}</div>)}
        </div>
      </div>
    </div>
  )
}

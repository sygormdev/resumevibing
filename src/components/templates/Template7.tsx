import { CVData } from '@/types/cv'

interface Props {
  data: CVData
  pageIndex?: number
}

export default function Template7({ data }: Props) {
  const { personalInfo, experience, education, skills, languages, certifications, projects, awards } = data
  const primaryColor = data.colorScheme || '#0ea5e9'
  const fontFamily = data.fontFamily || 'Segoe UI'

  const sectionOrder = data.sectionOrder || ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'awards']

  const renderSidebarSection = (sectionId: string) => {
    switch (sectionId) {
      case 'skills':
        return skills.length > 0 ? (
          <div className="mt-6">
            <h3 className="font-bold text-sm uppercase tracking-wide mb-3 text-white/70">Skills</h3>
            <div className="space-y-1">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}></span>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ) : null
      case 'languages':
        return languages.length > 0 ? (
          <div className="mt-6">
            <h3 className="font-bold text-sm uppercase tracking-wide mb-3 text-white/70">Languages</h3>
            {languages.map((lang) => (
              <p key={lang.id} className="text-sm">{lang.name} <span className="text-white/60">({lang.level})</span></p>
            ))}
          </div>
        ) : null
      default:
        return null
    }
  }

  const renderMainSection = (sectionId: string) => {
    switch (sectionId) {
      case 'experience':
        return experience.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>Work Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 flex gap-4">
                <div className="w-1.5 rounded-full self-stretch" style={{ backgroundColor: primaryColor + '40' }}></div>
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-xs text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-sm" style={{ color: primaryColor }}>{exp.company}</p>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </section>
        ) : null
      case 'education':
        return education.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="flex gap-4">
                <div className="w-1.5 rounded-full self-stretch" style={{ backgroundColor: primaryColor + '40' }}></div>
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                    <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-sm" style={{ color: primaryColor }}>{edu.degree} {edu.field && `in ${edu.field}`}</p>
                </div>
              </div>
            ))}
          </section>
        ) : null
      case 'certifications':
        return certifications.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>Certifications</h2>
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-3 rounded" style={{ backgroundColor: primaryColor + '10' }}>
                  <p className="font-medium text-gray-900 text-sm">{cert.name}</p>
                  <p className="text-xs" style={{ color: primaryColor }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null
      case 'projects':
        return projects.length > 0 ? (
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 p-3 rounded" style={{ backgroundColor: primaryColor + '10' }}>
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                <p className="text-gray-600 text-sm">{proj.description}</p>
                {proj.technologies.length > 0 && <p className="text-xs mt-1" style={{ color: primaryColor }}>Tech: {proj.technologies.join(', ')}</p>}
              </div>
            ))}
          </section>
        ) : null
      case 'awards':
        return awards.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>Awards</h2>
            {awards.map((award) => (
              <div key={award.id} className="mb-2 flex gap-3">
                <span style={{ color: primaryColor }}>★</span>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{award.name}</p>
                  <p className="text-gray-500 text-xs">{award.issuer}, {award.date}</p>
                </div>
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
        <div className="flex">
          <div className="w-2/3 text-white px-8 py-10" style={{ backgroundColor: primaryColor + 'dd' }}>
            {personalInfo.photo && (
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 mb-4">
                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="mt-1 opacity-80">{personalInfo.title || 'Professional Title'}</p>
            <p className="text-sm mt-4 leading-relaxed opacity-80">{personalInfo.summary}</p>
          </div>
          <div className="w-1/3 text-white p-6" style={{ backgroundColor: primaryColor }}>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-3 text-white/70">Contact</h3>
            <div className="space-y-2 text-sm">
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
              {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
              {personalInfo.website && <p>{personalInfo.website}</p>}
            </div>
            {sectionOrder.map((sectionId) => <div key={sectionId}>{renderSidebarSection(sectionId)}</div>)}
          </div>
        </div>

        <div className="p-8">
          {sectionOrder.map((sectionId) => {
            if (['skills', 'languages'].includes(sectionId)) return null
            return <div key={sectionId}>{renderMainSection(sectionId)}</div>
          })}
        </div>
      </div>
    </div>
  )
}

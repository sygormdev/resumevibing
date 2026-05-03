import { CVData } from '@/types/cv'

interface Props {
  data: CVData
}

export default function Template2({ data }: Props) {
  const { personalInfo, experience, education, skills, languages, certifications, projects, awards } = data
  const primaryColor = data.colorScheme || '#9333ea'
  const fontFamily = data.fontFamily || 'system-ui'

  const sectionOrder = data.sectionOrder || ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'awards']

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'experience':
        return experience.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>Work Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 border-l-2 pl-4" style={{ borderColor: primaryColor + '40' }}>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-xs" style={{ color: primaryColor }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-sm font-medium" style={{ color: primaryColor }}>{exp.company}</p>
                <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </section>
        ) : null

      case 'education':
        return education.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                <p className="text-sm" style={{ color: primaryColor }}>{edu.degree} {edu.field && `in ${edu.field}`}</p>
                <p className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        ) : null

      case 'skills':
        return skills.length > 0 ? (
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-2 text-white/70">Skills</h3>
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
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-2 text-white/70">Languages</h3>
            {languages.map((lang) => (
              <p key={lang.id} className="text-sm">{lang.name} <span className="text-white/60">({lang.level})</span></p>
            ))}
          </div>
        ) : null

      case 'certifications':
        return certifications.length > 0 ? (
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-2 text-white/70">Certifications</h3>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm mb-2">
                <p className="font-medium">{cert.name}</p>
                <p className="text-white/60 text-xs">{cert.issuer}</p>
              </div>
            ))}
          </div>
        ) : null

      case 'projects':
        return projects.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2 p-3 bg-gray-50 rounded">
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                <p className="text-gray-600 text-sm">{proj.description}</p>
                {proj.technologies.length > 0 && <p className="text-xs mt-1" style={{ color: primaryColor }}>Tech: {proj.technologies.join(', ')}</p>}
              </div>
            ))}
          </section>
        ) : null

      case 'awards':
        return awards.length > 0 ? (
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>Awards</h2>
            {awards.map((award) => (
              <div key={award.id} className="mb-2 flex gap-2">
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
    <div className="min-h-screen bg-gray-100" style={{ fontFamily }}>
      <div className="max-w-[850px] mx-auto my-8 bg-white shadow-xl">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-1/3 text-white p-6" style={{ backgroundColor: primaryColor }}>
            {personalInfo.photo && (
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30">
                  <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
              <p className="text-white/70 text-sm mt-1">{personalInfo.title || 'Professional Title'}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-2 text-white/70">Contact</h3>
                <div className="space-y-2 text-sm">
                  {personalInfo.email && <p>{personalInfo.email}</p>}
                  {personalInfo.phone && <p>{personalInfo.phone}</p>}
                  {personalInfo.location && <p>{personalInfo.location}</p>}
                  {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
                  {personalInfo.website && <p>{personalInfo.website}</p>}
                </div>
              </div>

              {/* Dynamic sidebar sections */}
              {sectionOrder.map((sectionId) => (
                <div key={sectionId}>
                  {renderSection(sectionId)}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="w-2/3 p-6">
            {personalInfo.summary && (
              <section className="mb-6">
                <h2 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>About Me</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
              </section>
            )}

            {/* Main content sections based on order - excluding sidebar-only sections */}
            {sectionOrder.map((sectionId) => {
              if (['skills', 'languages', 'certifications'].includes(sectionId)) return null
              return <div key={sectionId}>{renderSection(sectionId)}</div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
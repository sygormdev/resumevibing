import { CVData } from '@/types/cv'

interface Props {
  data: CVData
}

export default function Template5({ data }: Props) {
  const { personalInfo, experience, education, skills, languages, certifications, projects, awards } = data
  const primaryColor = data.colorScheme || '#f97316'
  const fontFamily = data.fontFamily || 'Trebuchet MS'

  const sectionOrder = data.sectionOrder || ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'awards']

  const renderSidebarSection = (sectionId: string) => {
    switch (sectionId) {
      case 'skills':
        return skills.length > 0 ? (
          <div>
            <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wide mb-2" style={{ color: primaryColor }}>Skills</h3>
            <ul className="space-y-1">
              {skills.map((skill) => (
                <li key={skill.id} className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null
      case 'languages':
        return languages.length > 0 ? (
          <div>
            <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wide mb-2" style={{ color: primaryColor }}>Languages</h3>
            {languages.map((lang) => (
              <p key={lang.id} className="text-sm text-gray-700">{lang.name} - <span className="capitalize">{lang.level}</span></p>
            ))}
          </div>
        ) : null
      case 'certifications':
        return certifications.length > 0 ? (
          <div>
            <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wide mb-2" style={{ color: primaryColor }}>Certifications</h3>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm mb-2">
                <p className="font-medium">{cert.name}</p>
                <p className="text-gray-500">{cert.issuer}</p>
              </div>
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
            <h2 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>Work History</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <p className="text-sm font-medium" style={{ color: primaryColor }}>{exp.company}</p>
                <p className="text-gray-500 text-xs mb-2">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </section>
        ) : null
      case 'education':
        return education.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                <p className="text-gray-600 text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                <p className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        ) : null
      case 'projects':
        return projects.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <h3 className="font-medium text-gray-900">{proj.name}</h3>
                <p className="text-gray-600 text-sm">{proj.description}</p>
                {proj.technologies.length > 0 && <p className="text-xs" style={{ color: primaryColor }}>Tech: {proj.technologies.join(', ')}</p>}
              </div>
            ))}
          </section>
        ) : null
      case 'awards':
        return awards.length > 0 ? (
          <section>
            <h2 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>Awards</h2>
            {awards.map((award) => (
              <div key={award.id} className="mb-2">
                <span className="font-medium text-gray-900">{award.name}</span>
                <p className="text-gray-500 text-xs">{award.issuer} • {award.date}</p>
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
      <div className="max-w-[800px] mx-auto my-8 bg-white shadow-2xl">
        <div className="text-white px-8 py-8" style={{ backgroundColor: primaryColor }}>
          <div className="flex items-center gap-6 mb-4">
            {personalInfo.photo && (
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white/30">
                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-black uppercase">{personalInfo.fullName || 'Your Name'}</h1>
              <p className="opacity-80 font-medium">{personalInfo.title || 'Professional Title'}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-80">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>

        <div className="flex">
          <div className="w-1/3 bg-gray-100 p-6">
            <div className="space-y-6">
              {sectionOrder.map((sectionId) => (
                <div key={sectionId}>{renderSidebarSection(sectionId)}</div>
              ))}
            </div>
          </div>

          <div className="w-2/3 p-6">
            {personalInfo.summary && (
              <section className="mb-6">
                <h2 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>About Me</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
              </section>
            )}
            {sectionOrder.map((sectionId) => (
              <div key={sectionId}>{renderMainSection(sectionId)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

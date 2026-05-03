import { CVData } from '@/types/cv'

interface Props {
  data: CVData
  pageIndex?: number
}

export default function Template6({ data }: Props) {
  const { personalInfo, experience, education, skills, languages, certifications, projects, awards } = data
  const primaryColor = data.colorScheme || '#e11d48'
  const fontFamily = data.fontFamily || 'Georgia'

  const sectionOrder = data.sectionOrder || ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'awards']

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'experience':
        return experience.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-5 text-center">
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-sm" style={{ color: primaryColor }}>{exp.company}</p>
                <p className="text-gray-400 text-xs">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed max-w-xl mx-auto">{exp.description}</p>
              </div>
            ))}
          </section>
        ) : null
      case 'education':
        return education.length > 0 ? (
          <section>
            <h2 className="text-center text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="text-center mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">{edu.school}</h3>
                <p className="text-xs" style={{ color: primaryColor }}>{edu.degree} {edu.field && `in ${edu.field}`}</p>
                <p className="text-gray-400 text-xs">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        ) : null
      case 'skills':
        return skills.length > 0 ? (
          <section>
            <h2 className="text-center text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Expertise</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs px-2 py-1 rounded border" style={{ borderColor: primaryColor, color: primaryColor }}>{skill.name}</span>
              ))}
            </div>
          </section>
        ) : null
      case 'languages':
        return languages.length > 0 ? (
          <section className="mt-6 text-center">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Languages</h2>
            <p className="text-gray-600 text-sm">
              {languages.map((lang, i) => (
                <span key={lang.id}>{lang.name} <span className="capitalize text-gray-400">({lang.level})</span>{i < languages.length - 1 && ' • '}</span>
              ))}
            </p>
          </section>
        ) : null
      case 'certifications':
        return certifications.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Certifications</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-center">
                  <p className="font-medium text-gray-900 text-sm">{cert.name}</p>
                  <p className="text-xs" style={{ color: primaryColor }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null
      case 'projects':
        return projects.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="text-center mb-2">
                <p className="font-medium text-gray-900 text-sm">{proj.name}</p>
                <p className="text-gray-500 text-xs">{proj.description}</p>
              </div>
            ))}
          </section>
        ) : null
      case 'awards':
        return awards.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Awards</h2>
            {awards.map((award) => (
              <div key={award.id} className="text-center mb-1">
                <span style={{ color: primaryColor }}>★ </span>
                <span className="font-medium text-gray-900 text-sm">{award.name}</span>
                <span style={{ color: primaryColor }}> ★</span>
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
        <div className="text-center px-8 py-10 border-b-2" style={{ borderColor: primaryColor + '30' }}>
          {personalInfo.photo && (
            <div className="mb-4 flex justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2" style={{ borderColor: primaryColor }}>
                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          <h1 className="text-4xl font-light text-gray-800 tracking-wide">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="mt-2 text-sm tracking-widest uppercase" style={{ color: primaryColor }}>{personalInfo.title || 'Professional Title'}</p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>

        <div className="p-8">
          {personalInfo.summary && (
            <section className="mb-6 text-center">
              <p className="text-gray-600 text-sm leading-relaxed italic max-w-xl mx-auto">{personalInfo.summary}</p>
            </section>
          )}
          {sectionOrder.map((sectionId) => <div key={sectionId}>{renderSection(sectionId)}</div>)}
        </div>
      </div>
    </div>
  )
}

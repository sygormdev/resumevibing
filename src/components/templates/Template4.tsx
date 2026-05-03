import { CVData } from '@/types/cv'

interface Props {
  data: CVData
  pageIndex?: number
}

export default function Template4({ data }: Props) {
  const { personalInfo, experience, education, skills, languages, certifications, projects, awards } = data
  const primaryColor = data.colorScheme || '#4f46e5'
  const fontFamily = data.fontFamily || 'Helvetica'

  const sectionOrder = data.sectionOrder || ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'awards']

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'experience':
        return experience.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-medium text-gray-900">{exp.position}</span>
                    <span className="text-gray-400"> — </span>
                    <span className="text-gray-600 text-sm">{exp.company}</span>
                  </div>
                  <span className="text-xs text-gray-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{exp.description}</p>
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
                <div className="flex justify-between">
                  <div>
                    <span className="font-medium text-gray-900 text-sm">{edu.school}</span>
                    <span className="text-gray-400"> — </span>
                    <span className="text-gray-600 text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</span>
                  </div>
                  <span className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</span>
                </div>
                {edu.gpa && <p className="text-gray-400 text-xs mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </section>
        ) : null

      case 'skills':
        return skills.length > 0 ? (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs text-white px-2 py-1 rounded" style={{ backgroundColor: primaryColor }}>{skill.name}</span>
              ))}
            </div>
          </section>
        ) : null

      case 'languages':
        return languages.length > 0 ? (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Languages</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-sm text-gray-600">{lang.name} <span className="text-gray-400">— {lang.level}</span></p>
            ))}
          </section>
        ) : null

      case 'certifications':
        return certifications.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <span className="font-medium text-gray-900 text-sm">{cert.name}</span>
                <span className="text-gray-400 text-xs"> — {cert.issuer}, {cert.date}</span>
              </div>
            ))}
          </section>
        ) : null

      case 'projects':
        return projects.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <span className="font-medium text-gray-900 text-sm">{proj.name}</span>
                {proj.url && <a href={proj.url} className="text-blue-500 text-xs ml-2">↗</a>}
                <p className="text-gray-500 text-xs">{proj.description}</p>
                {proj.technologies.length > 0 && <p className="text-gray-400 text-xs">{proj.technologies.join(', ')}</p>}
              </div>
            ))}
          </section>
        ) : null

      case 'awards':
        return awards.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Awards</h2>
            {awards.map((award) => (
              <div key={award.id} className="mb-2">
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
    <div className="min-h-screen bg-slate-50" style={{ fontFamily }}>
      <div className="max-w-[800px] mx-auto bg-white shadow-lg">
        <header className="px-8 pt-12 pb-6">
          <div className="flex items-center gap-6 mb-4">
            {personalInfo.photo && (
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-light tracking-tight text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
              <p className="mt-2 text-sm uppercase tracking-widest" style={{ color: primaryColor }}>{personalInfo.title || 'Professional Title'}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </header>

        <div className="px-8 pb-8">
          <hr className="border-gray-200 mb-6" style={{ borderColor: primaryColor + '30' }} />

          {personalInfo.summary && (
            <section className="mb-6">
              <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {sectionOrder.map((sectionId) => (
            <div key={sectionId}>{renderSection(sectionId)}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

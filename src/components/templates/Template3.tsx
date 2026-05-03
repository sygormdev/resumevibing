import { CVData } from '@/types/cv'

interface Props {
  data: CVData
}

export default function Template3({ data }: Props) {
  const { personalInfo, experience, education, skills, languages, certifications, projects, awards } = data
  const primaryColor = data.colorScheme || '#16a34a'
  const fontFamily = data.fontFamily || 'Arial'

  const sectionOrder = data.sectionOrder || ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'awards']

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'experience':
        return experience.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>💼 Work Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-500 px-2 py-1 rounded" style={{ backgroundColor: primaryColor + '15' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-sm" style={{ color: primaryColor }}>{exp.company}</p>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </section>
        ) : null

      case 'education':
        return education.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>🎓 Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 p-3 rounded-lg" style={{ backgroundColor: primaryColor + '10' }}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: primaryColor + '20', color: primaryColor }}>{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-sm" style={{ color: primaryColor }}>{edu.degree} {edu.field && `• ${edu.field}`}</p>
                {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </section>
        ) : null

      case 'skills':
        return skills.length > 0 ? (
          <section>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>⚡ Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="px-3 py-1 rounded text-xs font-medium text-white" style={{ backgroundColor: primaryColor }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        ) : null

      case 'languages':
        return languages.length > 0 ? (
          <section>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>🗣️ Languages</h2>
            {languages.map((lang) => (
              <div key={lang.id} className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{lang.name}</span>
                <span className="capitalize" style={{ color: primaryColor }}>{lang.level}</span>
              </div>
            ))}
          </section>
        ) : null

      case 'certifications':
        return certifications.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>📜 Certifications</h2>
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-3 rounded-lg" style={{ backgroundColor: primaryColor + '10' }}>
                  <p className="font-medium text-gray-900 text-sm">{cert.name}</p>
                  <p className="text-sm" style={{ color: primaryColor }}>{cert.issuer}</p>
                  <p className="text-gray-500 text-xs">{cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null

      case 'projects':
        return projects.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>🚀 Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 p-3 rounded-lg" style={{ backgroundColor: primaryColor + '10' }}>
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                <p className="text-gray-600 text-sm">{proj.description}</p>
                {proj.technologies.length > 0 && <p className="text-sm mt-1" style={{ color: primaryColor }}>Tech: {proj.technologies.join(', ')}</p>}
              </div>
            ))}
          </section>
        ) : null

      case 'awards':
        return awards.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>🏆 Awards</h2>
            {awards.map((award) => (
              <div key={award.id} className="mb-2 flex gap-3">
                <span style={{ color: primaryColor }}>★</span>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{award.name}</p>
                  <p className="text-gray-500 text-xs">{award.issuer} • {award.date}</p>
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
        {/* Header */}
        <div className="text-white px-8 py-8" style={{ backgroundColor: primaryColor }}>
          <div className="flex items-center gap-6 mb-4">
            {personalInfo.photo && (
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white/30">
                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
              <p className="opacity-80">{personalInfo.title || 'Professional Title'}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-80">
            {personalInfo.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span>☎ {personalInfo.phone}</span>}
            {personalInfo.location && <span>⌖ {personalInfo.location}</span>}
            {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
            {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
          </div>
        </div>

        <div className="p-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: primaryColor }}>📋 Profile</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Dynamic Sections */}
          {sectionOrder.map((sectionId) => (
            <div key={sectionId}>
              {renderSection(sectionId)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
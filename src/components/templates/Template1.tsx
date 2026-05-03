import { CVData } from '@/types/cv'

interface Props {
  data: CVData
  pageIndex?: number
}

export default function Template1({ data, pageIndex = 0 }: Props) {
  const { personalInfo, experience, education, skills, languages, certifications, projects, awards } = data
  const primaryColor = data.colorScheme || '#4f46e5'
  const fontFamily = data.fontFamily || 'Georgia'

  // Get sections for this page
  const currentPage = data.pages[pageIndex] || data.pages[0]
  const pageSections = currentPage.sections

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return personalInfo.summary ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor, color: '#1e293b' }}>PROFESSIONAL SUMMARY</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
          </section>
        ) : null
      case 'experience':
        return experience.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor, color: '#1e293b' }}>WORK EXPERIENCE</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </section>
        ) : null
      case 'education':
        return education.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor, color: '#1e293b' }}>EDUCATION</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                    <p className="text-gray-600 text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                  </div>
                  <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
                </div>
                {edu.gpa && <p className="text-gray-400 text-xs mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </section>
        ) : null
      case 'skills':
        return skills.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor, color: '#1e293b' }}>SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="px-3 py-1 rounded text-xs" style={{ backgroundColor: primaryColor + '20', color: primaryColor }}>{skill.name}</span>
              ))}
            </div>
          </section>
        ) : null
      case 'languages':
        return languages.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor, color: '#1e293b' }}>LANGUAGES</h2>
            {languages.map((lang) => (
              <p key={lang.id} className="text-gray-700 text-sm mb-1">{lang.name} <span className="text-gray-500">— {lang.level}</span></p>
            ))}
          </section>
        ) : null
      case 'certifications':
        return certifications.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor, color: '#1e293b' }}>CERTIFICATIONS</h2>
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-3 rounded" style={{ backgroundColor: primaryColor + '10' }}>
                  <p className="font-medium text-gray-900 text-sm">{cert.name}</p>
                  <p className="text-gray-600 text-xs">{cert.issuer} — {cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null
      case 'projects':
        return projects.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor, color: '#1e293b' }}>PROJECTS</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 p-3 rounded" style={{ backgroundColor: primaryColor + '10' }}>
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                <p className="text-gray-600 text-sm">{proj.description}</p>
                {proj.technologies.length > 0 && <p className="text-gray-500 text-xs mt-1">Tech: {proj.technologies.join(', ')}</p>}
              </div>
            ))}
          </section>
        ) : null
      case 'awards':
        return awards.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor, color: '#1e293b' }}>AWARDS</h2>
            {awards.map((award) => (
              <div key={award.id} className="mb-2 flex gap-3">
                <span style={{ color: primaryColor }}>★</span>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{award.name}</p>
                  <p className="text-gray-500 text-xs">{award.issuer} — {award.date}</p>
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
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily }}>
      <div className="max-w-[800px] mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="text-white p-8" style={{ backgroundColor: primaryColor }}>
          <div className="flex items-center gap-6 mb-4">
            {personalInfo.photo && (
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white/30">
                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
              <p className="text-lg text-white/80">{personalInfo.title || 'Professional Title'}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {personalInfo.email && <span>📧 {personalInfo.email}</span>}
            {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
            {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
            {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {pageSections.map((sectionId) => (
            <div key={sectionId}>{renderSection(sectionId)}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

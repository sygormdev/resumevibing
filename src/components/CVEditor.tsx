'use client'

import { useState } from 'react'
import { CVData, Experience, Education, Skill, Language, Certification, Project, Award } from '@/types/cv'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  data: CVData
  onChange: (data: CVData) => void
}

function SortableItem({ id, label }: { id: string; label: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-move hover:bg-gray-100"
      {...attributes}
      {...listeners}
    >
      <span className="text-gray-400">☰</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  )
}

export default function CVEditor({ data, onChange }: Props) {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'languages' | 'certifications' | 'projects' | 'awards' | 'settings'>('personal')

  const updatePersonal = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    })
  }

  // Experience
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    }
    onChange({ ...data, experience: [...data.experience, newExp] })
  }

  const updateExperience = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    })
  }

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(exp => exp.id !== id) })
  }

  // Education
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    }
    onChange({ ...data, education: [...data.education, newEdu] })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    })
  }

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(edu => edu.id !== id) })
  }

  // Skills
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'intermediate',
      category: 'Technical'
    }
    onChange({ ...data, skills: [...data.skills, newSkill] })
  }

  const updateSkill = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      skills: data.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    })
  }

  const removeSkill = (id: string) => {
    onChange({ ...data, skills: data.skills.filter(skill => skill.id !== id) })
  }

  // Languages
  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: '',
      level: 'fluent'
    }
    onChange({ ...data, languages: [...data.languages, newLang] })
  }

  const updateLanguage = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    })
  }

  const removeLanguage = (id: string) => {
    onChange({ ...data, languages: data.languages.filter(lang => lang.id !== id) })
  }

  // Certifications
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiry: '',
      url: ''
    }
    onChange({ ...data, certifications: [...data.certifications, newCert] })
  }

  const updateCertification = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      certifications: data.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    })
  }

  const removeCertification = (id: string) => {
    onChange({ ...data, certifications: data.certifications.filter(cert => cert.id !== id) })
  }

  // Projects
  const addProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      url: '',
      technologies: [],
      startDate: '',
      endDate: ''
    }
    onChange({ ...data, projects: [...data.projects, newProj] })
  }

  const updateProject = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    })
  }

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(proj => proj.id !== id) })
  }

  // Awards
  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      description: ''
    }
    onChange({ ...data, awards: [...data.awards, newAward] })
  }

  const updateAward = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      awards: data.awards.map(award =>
        award.id === id ? { ...award, [field]: value } : award
      )
    })
  }

  const removeAward = (id: string) => {
    onChange({ ...data, awards: data.awards.filter(award => award.id !== id) })
  }

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'projects', label: 'Projects' },
    { id: 'awards', label: 'Awards' },
    { id: 'settings', label: '⚙️ Settings' }
  ]

  const sectionLabels: Record<string, string> = {
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    certifications: 'Certifications',
    projects: 'Projects',
    awards: 'Awards'
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = data.sectionOrder.indexOf(active.id as string)
      const newIndex = data.sectionOrder.indexOf(over?.id as string || '')
      const newOrder = arrayMove(data.sectionOrder, oldIndex, newIndex)
      onChange({ ...data, sectionOrder: newOrder })
    }
  }

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-4 text-sm font-medium capitalize whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-gray-50 text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* PERSONAL */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            {/* Photo Upload */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                {data.personalInfo.photo ? (
                  <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-3xl">👤</span>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        updatePersonal('photo', reader.result as string)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:bg-gray-800 file:text-white hover:file:bg-gray-700"
                />
                <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={data.personalInfo.fullName} onChange={(e) => updatePersonal('fullName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Professional Title</label>
                <input type="text" value={data.personalInfo.title} onChange={(e) => updatePersonal('title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Senior Software Engineer" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Professional Summary</label>
              <textarea value={data.personalInfo.summary} onChange={(e) => updatePersonal('summary', e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="A brief overview of your career, goals, and key strengths..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={data.personalInfo.email} onChange={(e) => updatePersonal('email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={data.personalInfo.phone} onChange={(e) => updatePersonal('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="+1 234 567 8900" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={data.personalInfo.location} onChange={(e) => updatePersonal('location', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="San Francisco, CA" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn</label>
                <input type="text" value={data.personalInfo.linkedin} onChange={(e) => updatePersonal('linkedin', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="linkedin.com/in/johndoe" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Website/Portfolio</label>
                <input type="text" value={data.personalInfo.website} onChange={(e) => updatePersonal('website', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="johndoe.com" />
              </div>
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">Experience</span>
                  <button onClick={() => removeExperience(exp.id)} className="text-red-500 text-xs hover:text-red-700">Remove</button>
                </div>
                <input type="text" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Position/Job Title" />
                <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Company Name" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Start Date (e.g. Jan 2020)" />
                  <input type="text" value={exp.current ? 'Present' : exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="End Date" />
                </div>
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} />
                  Currently working here
                </label>
                <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Job responsibilities and overview..." />
              </div>
            ))}
            <button onClick={addExperience} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400">+ Add Experience</button>
          </div>
        )}

        {/* EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">Education</span>
                  <button onClick={() => removeEducation(edu.id)} className="text-red-500 text-xs hover:text-red-700">Remove</button>
                </div>
                <input type="text" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="School/University Name" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Degree (e.g. Bachelor's)" />
                  <input type="text" value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Field of Study" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Start" />
                  <input type="text" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="End" />
                  <input type="text" value={edu.gpa} onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="GPA (opt)" />
                </div>
                <textarea value={edu.description} onChange={(e) => updateEducation(edu.id, 'description', e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Notable coursework, achievements, activities..." />
              </div>
            ))}
            <button onClick={addEducation} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400">+ Add Education</button>
          </div>
        )}

        {/* SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="p-4 bg-gray-50 rounded-lg flex gap-3 items-center">
                <input type="text" value={skill.name} onChange={(e) => updateSkill(skill.id, 'name', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Skill (e.g. JavaScript)" />
                <select value={skill.level} onChange={(e) => updateSkill(skill.id, 'level', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <select value={skill.category} onChange={(e) => updateSkill(skill.id, 'category', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="Technical">Technical</option>
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="Tools">Tools</option>
                  <option value="Other">Other</option>
                </select>
                <button onClick={() => removeSkill(skill.id)} className="text-red-500 hover:text-red-700">✕</button>
              </div>
            ))}
            <button onClick={addSkill} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400">+ Add Skill</button>
          </div>
        )}

        {/* LANGUAGES */}
        {activeTab === 'languages' && (
          <div className="space-y-4">
            {data.languages.map((lang) => (
              <div key={lang.id} className="p-4 bg-gray-50 rounded-lg flex gap-3 items-center">
                <input type="text" value={lang.name} onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Language (e.g. English)" />
                <select value={lang.level} onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="basic">Basic</option>
                  <option value="conversational">Conversational</option>
                  <option value="fluent">Fluent</option>
                  <option value="native">Native</option>
                </select>
                <button onClick={() => removeLanguage(lang.id)} className="text-red-500 hover:text-red-700">✕</button>
              </div>
            ))}
            <button onClick={addLanguage} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400">+ Add Language</button>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-gray-500">Certification</span>
                  <button onClick={() => removeCertification(cert.id)} className="text-red-500 text-xs hover:text-red-700">Remove</button>
                </div>
                <input type="text" value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Certification Name" />
                <input type="text" value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Issuing Organization" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={cert.date} onChange={(e) => updateCertification(cert.id, 'date', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Date Obtained" />
                  <input type="text" value={cert.expiry} onChange={(e) => updateCertification(cert.id, 'expiry', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Expiry (opt)" />
                </div>
                <input type="text" value={cert.url} onChange={(e) => updateCertification(cert.id, 'url', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Verification URL (opt)" />
              </div>
            ))}
            <button onClick={addCertification} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400">+ Add Certification</button>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-gray-500">Project</span>
                  <button onClick={() => removeProject(proj.id)} className="text-red-500 text-xs hover:text-red-700">Remove</button>
                </div>
                <input type="text" value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Project Name" />
                <textarea value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Project description and your contributions..." />
                <input type="text" value={proj.technologies.join(', ')} onChange={(e) => updateProject(proj.id, 'technologies', e.target.value.split(',').map(t => t.trim()))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Technologies (comma-separated)" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={proj.startDate} onChange={(e) => updateProject(proj.id, 'startDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Start Date" />
                  <input type="text" value={proj.endDate} onChange={(e) => updateProject(proj.id, 'endDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="End Date" />
                </div>
                <input type="text" value={proj.url} onChange={(e) => updateProject(proj.id, 'url', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Project URL / GitHub Link" />
              </div>
            ))}
            <button onClick={addProject} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400">+ Add Project</button>
          </div>
        )}

        {/* AWARDS */}
        {activeTab === 'awards' && (
          <div className="space-y-4">
            {data.awards.map((award) => (
              <div key={award.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-gray-500">Award/Honor</span>
                  <button onClick={() => removeAward(award.id)} className="text-red-500 text-xs hover:text-red-700">Remove</button>
                </div>
                <input type="text" value={award.name} onChange={(e) => updateAward(award.id, 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Award Name" />
                <input type="text" value={award.issuer} onChange={(e) => updateAward(award.id, 'issuer', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Issuing Organization" />
                <input type="text" value={award.date} onChange={(e) => updateAward(award.id, 'date', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Date Received" />
                <textarea value={award.description} onChange={(e) => updateAward(award.id, 'description', e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white" placeholder="Description or details about this award..." />
              </div>
            ))}
            <button onClick={addAward} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400">+ Add Award</button>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Color Scheme</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Indigo', color: '#4f46e5' },
                  { name: 'Purple', color: '#9333ea' },
                  { name: 'Blue', color: '#2563eb' },
                  { name: 'Green', color: '#16a34a' },
                  { name: 'Red', color: '#dc2626' },
                  { name: 'Orange', color: '#ea580c' },
                  { name: 'Teal', color: '#0d9488' },
                  { name: 'Pink', color: '#db2777' },
                  { name: 'Slate', color: '#475569' },
                ].map((scheme) => (
                  <button
                    key={scheme.color}
                    onClick={() => onChange({ ...data, colorScheme: scheme.color })}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      data.colorScheme === scheme.color 
                        ? 'border-gray-900 ring-2 ring-gray-900' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: scheme.color }}
                    title={scheme.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={data.colorScheme}
                  onChange={(e) => onChange({ ...data, colorScheme: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={data.colorScheme}
                  onChange={(e) => onChange({ ...data, colorScheme: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="#4f46e5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
              <select
                value={data.fontFamily}
                onChange={(e) => onChange({ ...data, fontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="Georgia">Georgia (Classic)</option>
                <option value="Arial">Arial (Modern)</option>
                <option value="Times New Roman">Times New Roman (Traditional)</option>
                <option value="Helvetica">Helvetica (Clean)</option>
                <option value="Verdana">Verdana (Readable)</option>
                <option value="Trebuchet MS">Trebuchet (Friendly)</option>
                <option value="Courier">Courier (Typewriter)</option>
                <option value="Palatino">Palatino (Elegant)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Section Order (Drag to reorder)</label>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={data.sectionOrder}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {data.sectionOrder.map((sectionId) => (
                      <SortableItem key={sectionId} id={sectionId} label={sectionLabels[sectionId] || sectionId} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
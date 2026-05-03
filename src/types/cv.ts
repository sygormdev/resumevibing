export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  title: string
  summary: string
  linkedin: string
  website: string
  photo: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
  description: string
}

export interface Skill {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  category: string
}

export interface Language {
  id: string
  name: string
  level: 'basic' | 'conversational' | 'fluent' | 'native'
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiry: string
  url: string
}

export interface Project {
  id: string
  name: string
  description: string
  url: string
  technologies: string[]
  startDate: string
  endDate: string
}

export interface Award {
  id: string
  name: string
  issuer: string
  date: string
  description: string
}

export interface CVPage {
  id: string
  name: string
  // Which sections to show on this page
  sections: string[]
}

export interface CVData {
  // All CV content (shared across pages)
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  certifications: Certification[]
  projects: Project[]
  awards: Award[]
  
  // Section order for the first page (used if pages array is empty)
  sectionOrder: string[]
  
  // Pages - each page can have different sections
  pages: CVPage[]
  activePage: number
  
  // Settings
  colorScheme: string
  fontFamily: string
}

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    linkedin: '',
    website: '',
    photo: ''
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  awards: [],
  pages: [
    { id: '1', name: 'Page 1', sections: ['summary', 'experience', 'education', 'skills', 'languages'] },
    { id: '2', name: 'Page 2', sections: ['certifications', 'projects', 'awards'] }
  ],
  activePage: 0,
  sectionOrder: ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'awards'],
  colorScheme: '#4f46e5',
  fontFamily: 'Georgia'
}

export interface Template {
  id: string
  name: string
  preview: string
  color: string
}

export const colorSchemes = [
  { name: 'Indigo', color: '#4f46e5' },
  { name: 'Purple', color: '#9333ea' },
  { name: 'Blue', color: '#2563eb' },
  { name: 'Green', color: '#16a34a' },
  { name: 'Red', color: '#dc2626' },
  { name: 'Orange', color: '#ea580c' },
  { name: 'Teal', color: '#0d9488' },
  { name: 'Pink', color: '#db2777' },
  { name: 'Slate', color: '#475569' },
  { name: 'Custom', color: '#custom' }
]

export const fontFamilies = [
  { name: 'Georgia (Classic)', value: 'Georgia' },
  { name: 'Arial (Modern)', value: 'Arial' },
  { name: 'Times New Roman (Traditional)', value: '"Times New Roman"' },
  { name: 'Helvetica (Clean)', value: 'Helvetica' },
  { name: 'Verdana (Readable)', value: 'Verdana' },
  { name: 'Trebuchet (Friendly)', value: '"Trebuchet MS"' },
  { name: 'Courier (Typewriter)', value: 'Courier' },
  { name: 'Palatino (Elegant)', value: 'Palatino' }
]

export const allSections = [
  { id: 'summary', name: 'Summary' },
  { id: 'experience', name: 'Experience' },
  { id: 'education', name: 'Education' },
  { id: 'skills', name: 'Skills' },
  { id: 'languages', name: 'Languages' },
  { id: 'certifications', name: 'Certifications' },
  { id: 'projects', name: 'Projects' },
  { id: 'awards', name: 'Awards' }
]

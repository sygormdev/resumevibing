export { default as Template1 } from './Template1'
export { default as Template2 } from './Template2'
export { default as Template3 } from './Template3'
export { default as Template4 } from './Template4'
export { default as Template5 } from './Template5'
export { default as Template6 } from './Template6'
export { default as Template7 } from './Template7'
export { default as Template8 } from './Template8'
export { default as Template9 } from './Template9'
export { default as Template10 } from './Template10'

export const sampleCVData = {
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@techcorp.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    title: 'Senior Software Engineer',
    summary: 'Results-driven software engineer with 6+ years of experience building scalable web applications and leading cross-functional teams. Passionate about clean code, user experience, and mentoring junior developers.',
    linkedin: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
    photo: '/alex.jpg'
  },
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      current: true,
      description: 'Leading a team of 5 engineers building cloud-native microservices. Architected and implemented RESTful APIs serving 2M+ daily requests. Reduced system latency by 40% through optimization.'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      current: false,
      description: 'Built React-based dashboard serving 500+ enterprise clients. Implemented CI/CD pipelines reducing deployment time by 60%. Collaborated with UX team to redesign core features.'
    },
    {
      id: '3',
      company: 'WebSolutions Co.',
      position: 'Junior Developer',
      startDate: 'Jul 2016',
      endDate: 'May 2018',
      current: false,
      description: 'Developed responsive websites using JavaScript and PHP. Maintained legacy systems while migrating to modern frameworks. Participated in agile ceremonies.'
    }
  ],
  education: [
    {
      id: '1',
      school: 'Massachusetts Institute of Technology',
      degree: "Bachelor's",
      field: 'Computer Science',
      startDate: '2012',
      endDate: '2016',
      gpa: '3.85'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript/TypeScript' },
    { id: '2', name: 'React & Next.js' },
    { id: '3', name: 'Node.js & Express' },
    { id: '4', name: 'Python & Django' },
    { id: '5', name: 'PostgreSQL & MongoDB' },
    { id: '6', name: 'AWS & Docker' }
  ],
  languages: [
    { id: '1', name: 'English', level: 'Native' },
    { id: '2', name: 'Spanish', level: 'Conversational' }
  ],
  certifications: [
    { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: 'Mar 2023', url: '' },
    { id: '2', name: 'Google Cloud Professional', issuer: 'Google', date: 'Nov 2022', url: '' }
  ],
  projects: [
    { id: '1', name: 'E-Commerce Platform', description: 'Full-stack marketplace with payment integration and real-time inventory management', technologies: ['React', 'Node.js', 'PostgreSQL'], dates: '2022', url: '' },
    { id: '2', name: 'Task Management App', description: 'Collaborative project tool with real-time updates and team analytics', technologies: ['Next.js', 'Firebase', 'Tailwind'], dates: '2021', url: '' }
  ],
  awards: [
    { id: '1', name: 'Employee of the Year', issuer: 'TechCorp Inc.', date: '2023', description: 'Recognized for exceptional technical leadership' },
    { id: '2', name: 'Hackathon Winner', issuer: 'MIT Innovation Challenge', date: '2015', description: 'Built winning AR navigation app for campus' }
  ],
  sectionOrder: ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'awards'],
  colorScheme: '#4f46e5',
  fontFamily: 'Georgia'
}

export const templates = [
  { id: '1', name: 'Classic', color: '#1e3a5f' },
  { id: '2', name: 'Creative', color: '#6366f1' },
  { id: '3', name: 'Professional', color: '#059669' },
  { id: '4', name: 'Minimal', color: '#374151' },
  { id: '5', name: 'Bold', color: '#f97316' },
  { id: '6', name: 'Elegant', color: '#e11d48' },
  { id: '7', name: 'Modern', color: '#0ea5e9' },
  { id: '8', name: 'Executive', color: '#d97706' },
  { id: '9', name: 'Fresh', color: '#14b8a6' },
  { id: '10', name: 'Dark', color: '#6366f1' },
]
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ResumeVibing - Create Your Perfect Resume',
  description: 'Build and export professional resumes with multiple templates, customization options, and PDF export.',
  icons: {
    icon: '/resumevibing.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
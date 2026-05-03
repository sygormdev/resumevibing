import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CV Creator',
  description: 'Build your professional resume',
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
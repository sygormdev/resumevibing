'use client'

import { useState } from 'react'
import { CVData } from '@/types/cv'
import { templates, sampleCVData } from '@/components/templates'
import CVEditor from '@/components/CVEditor'
import SettingsModal from '@/components/SettingsModal'
import * as TemplateComponents from '@/components/templates'

function TemplatePreview({ templateId, data, pageIndex }: { templateId: string; data: CVData; pageIndex: number }) {
  switch (templateId) {
    case '1': return <TemplateComponents.Template1 data={data} pageIndex={pageIndex} />
    case '2': return <TemplateComponents.Template2 data={data} pageIndex={pageIndex} />
    case '3': return <TemplateComponents.Template3 data={data} pageIndex={pageIndex} />
    case '4': return <TemplateComponents.Template4 data={data} pageIndex={pageIndex} />
    case '5': return <TemplateComponents.Template5 data={data} pageIndex={pageIndex} />
    case '6': return <TemplateComponents.Template6 data={data} pageIndex={pageIndex} />
    case '7': return <TemplateComponents.Template7 data={data} pageIndex={pageIndex} />
    case '8': return <TemplateComponents.Template8 data={data} pageIndex={pageIndex} />
    case '9': return <TemplateComponents.Template9 data={data} pageIndex={pageIndex} />
    case '10': return <TemplateComponents.Template10 data={data} pageIndex={pageIndex} />
    default: return null
  }
}

interface Props {
  onCreate: () => void
}

export default function LandingPage({ onCreate }: Props) {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: 'url(/resumevibingbg.png)' }}
    >
      {/* Content overlay */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <button
            onClick={onCreate}
            className="px-12 py-4 bg-gray-900 text-white text-xl font-bold rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-2xl"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

// Keep the editor export for the main app
export function EditorApp({ cvData, setCvData, selectedTemplate, setSelectedTemplate, showEditor, setShowEditor, showSettings, setShowSettings, previewRef, isExporting, exportProgress, pdfReady, downloadUrl, handleExportPDF, handleDownload, closeExportModal, handleTemplateClick, handleSelectPage, handleAddPage, handleDeletePage }: {
  cvData: CVData
  setCvData: (data: CVData) => void
  selectedTemplate: string
  setSelectedTemplate: (id: string) => void
  showEditor: boolean
  setShowEditor: (show: boolean) => void
  showSettings: boolean
  setShowSettings: (show: boolean) => void
  previewRef: React.RefObject<HTMLDivElement>
  isExporting: boolean
  exportProgress: number
  pdfReady: boolean
  downloadUrl: string | null
  handleExportPDF: () => void
  handleDownload: () => void
  closeExportModal: () => void
  handleTemplateClick: (id: string) => void
  handleSelectPage: (index: number) => void
  handleAddPage: () => void
  handleDeletePage: (index: number) => void
}) {
  return null // This is just for type sharing
}

export { TemplatePreview }
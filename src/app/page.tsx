'use client'

import { useState, Suspense, useRef } from 'react'
import { CVData } from '@/types/cv'
import { templates, sampleCVData } from '@/components/templates'
import CVEditor from '@/components/CVEditor'
import * as TemplateComponents from '@/components/templates'

function TemplatePreview({ templateId, data }: { templateId: string; data: CVData }) {
  switch (templateId) {
    case '1': return <TemplateComponents.Template1 data={data} />
    case '2': return <TemplateComponents.Template2 data={data} />
    case '3': return <TemplateComponents.Template3 data={data} />
    case '4': return <TemplateComponents.Template4 data={data} />
    case '5': return <TemplateComponents.Template5 data={data} />
    case '6': return <TemplateComponents.Template6 data={data} />
    case '7': return <TemplateComponents.Template7 data={data} />
    case '8': return <TemplateComponents.Template8 data={data} />
    case '9': return <TemplateComponents.Template9 data={data} />
    case '10': return <TemplateComponents.Template10 data={data} />
    default: return null
  }
}

export default function Home() {
  const [cvData, setCvData] = useState<CVData>(sampleCVData)
  const [selectedTemplate, setSelectedTemplate] = useState('1')
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [pdfReady, setPdfReady] = useState(false)
  const [showEditor, setShowEditor] = useState(true)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleTemplateClick = (templateId: string) => {
    setSelectedTemplate(templateId)
    setCvData(sampleCVData)
  }

  const handleExportPDF = async () => {
    if (!previewRef.current) return

    setIsExporting(true)
    setExportProgress(0)
    setDownloadUrl(null)
    setPdfReady(false)

    try {
      setExportProgress(10)
      
      const { toJpeg } = await import('html-to-image')
      const { jsPDF } = await import('jspdf')

      setExportProgress(20)

      // Find the actual template element
      const templateEl = previewRef.current.querySelector('.min-h-screen') as HTMLElement
      
      if (!templateEl) {
        throw new Error('Template not found')
      }

      setExportProgress(30)

      // Wait for images to fully load
      const images = templateEl.getElementsByTagName('img')
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                resolve()
              } else {
                img.onload = () => resolve()
                img.onerror = () => resolve()
              }
            })
        )
      )

      setExportProgress(40)
      
      // Save original styles
      const previewContainer = previewRef.current
      const originalTransform = previewContainer.style.transform
      const originalWidth = previewContainer.style.width
      
      // Set container to actual content width (800px max from template)
      // The content should fill this width naturally
      previewContainer.style.transform = 'none'
      previewContainer.style.width = '800px'
      
      // Wait for layout recalculation
      await new Promise(resolve => setTimeout(resolve, 200))
      
      setExportProgress(50)

      // Capture - the element will be captured at its natural size within 800px
      const dataUrl = await toJpeg(templateEl, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#ffffff'
      })

      setExportProgress(80)

      // Restore original styles
      previewContainer.style.transform = originalTransform
      previewContainer.style.width = originalWidth

      // Create PDF - fit to page width
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      
      pdf.addImage(dataUrl, 'JPEG', 0, 0, pageWidth, pageHeight)

      setExportProgress(95)
      
      const pdfBlob = pdf.output('blob')
      const url = URL.createObjectURL(pdfBlob)

      setExportProgress(100)
      setPdfReady(true)
      setDownloadUrl(url)
    } catch (error) {
      console.error('PDF export failed:', error)
      alert('PDF export failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
      setIsExporting(false)
    }
  }

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `${cvData.personalInfo.fullName || 'cv'}-resume.pdf`
      link.click()
    }
  }

  const closeExportModal = () => {
    setIsExporting(false)
    setExportProgress(0)
    setDownloadUrl(null)
    setPdfReady(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Export Modal */}
      {isExporting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs text-center shadow-2xl">
            {!pdfReady ? (
              <>
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                    <circle
                      cx="40" cy="40" r="36"
                      stroke="#4b5563" strokeWidth="4" fill="none"
                      strokeDasharray={`${exportProgress * 2.26} 226`}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">
                    {exportProgress}%
                  </span>
                </div>
                <p className="text-gray-600 font-medium">Generating PDF...</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl text-white">✓</span>
                </div>
                <p className="text-gray-800 font-semibold mb-4">PDF Ready!</p>
                <button onClick={handleDownload} className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 mb-2">
                  Download PDF
                </button>
                <button onClick={closeExportModal} className="text-gray-500 text-sm hover:text-gray-700">
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-900">CV Creator</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile toggle buttons */}
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="lg:hidden px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            {showEditor ? 'Preview' : 'Edit'}
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {isExporting ? '...' : 'Export'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Template Selection - Horizontal on Mobile */}
        <div className="lg:hidden w-full bg-white border-b border-gray-200 p-3 overflow-x-auto">
          <div className="flex gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template.id)}
                className={`flex-shrink-0 w-16 h-10 rounded-lg border-2 transition-all ${
                  selectedTemplate === template.id
                    ? 'border-gray-900 ring-2 ring-gray-900'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ backgroundColor: template.color }}
              >
                <span className="text-white text-xs font-bold">{template.name.substring(0, 3)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Panel */}
        <div className={`w-full lg:w-[400px] ${showEditor ? 'block' : 'hidden lg:block'} flex-shrink-0`}>
          <div className="h-[calc(100vh-56px)] lg:h-[calc(100vh-56px)] overflow-y-auto bg-gray-50">
            <CVEditor data={cvData} onChange={setCvData} />
          </div>
        </div>

        {/* Preview Panel */}
        <div className={`flex-1 ${showEditor ? 'hidden lg:block' : 'block'}`}>
          <div className="h-[calc(100vh-56px)] p-3 lg:p-6 bg-gray-200 overflow-auto">
            {/* Mobile preview label */}
            <div className="flex justify-center mb-2 lg:mb-4">
              <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full shadow">Live Preview</span>
            </div>
            
            {/* Template selector on desktop */}
            <div className="hidden lg:block mb-4">
              <div className="flex justify-center">
                <div className="inline-flex gap-3 bg-white p-2 rounded-xl shadow-lg">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateClick(template.id)}
                      className={`w-12 h-8 rounded-lg border-2 transition-all ${
                        selectedTemplate === template.id
                          ? 'border-gray-900'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: template.color }}
                      title={template.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="flex justify-center">
              <div className="w-full lg:w-full max-w-[800px] shadow-xl rounded-lg overflow-hidden bg-white">
                <div ref={previewRef} className="transform scale-[0.4] lg:scale-[0.5] origin-top-left w-[250%] lg:w-[200%]">
                  <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
                    <TemplatePreview templateId={selectedTemplate} data={cvData} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar for Quick Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-between items-center z-30">
        <button
          onClick={() => setShowEditor(true)}
          className={`flex-1 py-2 text-sm font-medium ${showEditor ? 'text-gray-900 bg-gray-100' : 'text-gray-500 bg-gray-50'} rounded-lg mr-2`}
        >
          Edit
        </button>
        <button
          onClick={() => setShowEditor(false)}
          className={`flex-1 py-2 text-sm font-medium ${!showEditor ? 'text-gray-900 bg-gray-100' : 'text-gray-500 bg-gray-50'} rounded-lg`}
        >
          Preview
        </button>
      </div>
    </div>
  )
}

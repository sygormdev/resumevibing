'use client'

import { useState, Suspense, useRef } from 'react'
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

// Landing Page Component
function LandingPage({ onManuel }: { onManuel: () => void }) {
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #fefeff 0%, #fefeff 35%, #B7E8EB 100%)'
      }}
    >
      {/* Animated Ocean Waves */}
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      <style jsx>{`
        .ocean {
          height: 5%;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          background: #015871;
        }
        .wave {
          background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg) repeat-x;
          position: absolute;
          top: -198px;
          width: 6400px;
          height: 198px;
          animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
          transform: translate3d(0, 0, 0);
        }
        .wave:nth-of-type(2) {
          top: -175px;
          animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite, swell 7s ease -1.25s infinite;
          opacity: 1;
        }
        @keyframes wave {
          0% { margin-left: 0; }
          100% { margin-left: -1600px; }
        }
        @keyframes swell {
          0%, 100% { transform: translate3d(0, -25px, 0); }
          50% { transform: translate3d(0, 5px, 0); }
        }
      `}</style>

      {/* Glass Navbar */}
      <header className="relative z-40 px-4 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/30 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src="/resumevibing.png" alt="ResumeVibing" className="h-10 w-auto" />
                <span className="text-xl font-bold text-gray-800">ResumeVibing</span>
              </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg">
                Create
              </button>
              <button 
                onClick={onManuel}
                className="px-5 py-2 bg-white/50 backdrop-blur-sm text-gray-800 font-semibold rounded-xl hover:bg-white/70 transition-all border border-white/60"
              >
                Manuel
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Center Content */}
      <div className="relative z-30 flex-1 flex flex-col items-center justify-center">
        <button 
          onClick={onManuel}
          className="px-14 py-5 bg-white/30 backdrop-blur-xl text-gray-800 text-2xl font-bold rounded-2xl hover:bg-white/50 transition-all transform hover:scale-105 shadow-xl border border-white/50"
          style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.6)'
          }}
        >
          Create
        </button>
        <p className="mt-6 text-gray-600 text-sm">Build your perfect resume in minutes</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [showLanding, setShowLanding] = useState(true)
  const [cvData, setCvData] = useState<CVData>(sampleCVData)
  const [selectedTemplate, setSelectedTemplate] = useState('1')
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [pdfReady, setPdfReady] = useState(false)
  const [showEditor, setShowEditor] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleManuel = () => {
    setShowLanding(false)
  }

  const handleTemplateClick = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleAddPage = () => {
    const newPage = {
      id: String(cvData.pages.length + 1),
      name: `Page ${cvData.pages.length + 1}`,
      sections: ['summary', 'experience', 'skills']
    }
    setCvData({
      ...cvData,
      pages: [...cvData.pages, newPage]
    })
  }

  const handleDeletePage = (index: number) => {
    if (cvData.pages.length <= 1) return
    
    const newPages = cvData.pages.filter((_, i) => i !== index)
    let newActivePage = cvData.activePage
    
    if (index <= newActivePage) {
      newActivePage = Math.max(0, newActivePage - 1)
    }
    
    setCvData({
      ...cvData,
      pages: newPages,
      activePage: newActivePage
    })
  }

  const handleSelectPage = (index: number) => {
    setCvData({
      ...cvData,
      activePage: index
    })
  }

  const handleExportPDF = async () => {
    if (!previewRef.current) return

    setIsExporting(true)
    setExportProgress(0)
    setDownloadUrl(null)
    setPdfReady(false)

    const originalActivePage = cvData.activePage

    try {
      const { toJpeg } = await import('html-to-image')
      const { jsPDF } = await import('jspdf')

      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      
      const totalPages = cvData.pages.length

      for (let i = 0; i < totalPages; i++) {
        setExportProgress(10 + (i / totalPages) * 80)
        
        setCvData(prev => ({ ...prev, activePage: i }))
        
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const templateEl = previewRef.current.querySelector('.min-h-screen') as HTMLElement
        if (!templateEl) continue

        const images = templateEl.getElementsByTagName('img')
        await Promise.all(
          Array.from(images).map(
            (img) =>
              new Promise<void>((resolve) => {
                if (img.complete) resolve()
                else {
                  img.onload = () => resolve()
                  img.onerror = () => resolve()
                }
              })
          )
        )

        const previewContainer = previewRef.current
        const originalTransform = previewContainer.style.transform
        const originalWidth = previewContainer.style.width
        const originalOverflow = previewContainer.style.overflow
        
        previewContainer.style.overflow = 'visible'
        previewContainer.style.transform = 'none'
        
        await new Promise(resolve => setTimeout(resolve, 200))

        const actualWidth = templateEl.offsetWidth
        const actualHeight = templateEl.offsetHeight
        
        const captureWidth = actualWidth > 0 ? actualWidth : 800
        const captureHeight = actualHeight > 0 ? actualHeight : 1131

        const dataUrl = await toJpeg(templateEl, {
          quality: 0.95,
          pixelRatio: 2,
          cacheBust: true,
          backgroundColor: '#ffffff',
          width: captureWidth,
          height: captureHeight
        })

        previewContainer.style.transform = originalTransform
        previewContainer.style.width = originalWidth
        previewContainer.style.overflow = originalOverflow

        if (i > 0) {
          pdf.addPage()
        }
        
        const imgHeight = pageWidth * (captureHeight / captureWidth)
        pdf.addImage(dataUrl, 'JPEG', 0, 0, pageWidth, imgHeight)
      }

      setExportProgress(95)
      
      setCvData(prev => ({ ...prev, activePage: originalActivePage }))
      
      const pdfBlob = pdf.output('blob')
      const url = URL.createObjectURL(pdfBlob)

      setExportProgress(100)
      setPdfReady(true)
      setDownloadUrl(url)
    } catch (error) {
      console.error('PDF export failed:', error)
      setCvData(prev => ({ ...prev, activePage: originalActivePage }))
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

  // Show landing page
  if (showLanding) {
    return <LandingPage onManuel={handleManuel} />
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

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          data={cvData}
          onChange={setCvData}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src="/resumevibing.png" alt="ResumeVibing" className="h-8 w-auto" />
          <h1 className="text-lg font-bold text-gray-900 hidden sm:block">ResumeVibing</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            ⚙️ Settings
          </button>
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
            
            {/* Page Selector - Below Live Preview label */}
            <div className="flex justify-center mb-3">
              <div className="flex gap-2 items-center bg-white px-4 py-2 rounded-xl shadow-lg">
                {cvData.pages.map((page, index) => (
                  <div key={page.id} className="relative group">
                    <button
                      onClick={() => handleSelectPage(index)}
                      className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                        cvData.activePage === index
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {page.name}
                    </button>
                    {cvData.pages.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeletePage(index)
                        }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleAddPage}
                  className="px-3 py-2 text-sm rounded-lg font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 border border-dashed border-gray-300"
                >
                  + Add
                </button>
              </div>
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
                    <TemplatePreview templateId={selectedTemplate} data={cvData} pageIndex={cvData.activePage} />
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
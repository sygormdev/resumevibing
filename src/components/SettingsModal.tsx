'use client'

import { CVData } from '@/types/cv'
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
  onClose: () => void
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

export default function SettingsModal({ data, onChange, onClose }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = data.sectionOrder.indexOf(active.id as string)
      const newIndex = data.sectionOrder.indexOf(over.id as string)
      onChange({
        ...data,
        sectionOrder: arrayMove(data.sectionOrder, oldIndex, newIndex)
      })
    }
  }

  const sectionLabels: Record<string, string> = {
    summary: 'Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    certifications: 'Certifications',
    projects: 'Projects',
    awards: 'Awards'
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        
        <div className="p-6 space-y-6">
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
      </div>
    </div>
  )
}
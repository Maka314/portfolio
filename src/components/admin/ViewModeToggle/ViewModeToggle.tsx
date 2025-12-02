import { ViewMode } from '@/types/admin'

interface ViewModeToggleProps {
  viewMode: ViewMode
  onChange: (mode: ViewMode) => void
}

export default function ViewModeToggle({ viewMode, onChange }: ViewModeToggleProps) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onChange('editor')}
        className={`px-4 py-2 rounded transition-colors ${
          viewMode === 'editor' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
        }`}
        title="Only show editor"
      >
        📝 Editor
      </button>
      <button
        onClick={() => onChange('split')}
        className={`px-4 py-2 rounded transition-colors ${
          viewMode === 'split' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
        }`}
        title="Split view - editor and preview"
      >
        ⚡ Split
      </button>
      <button
        onClick={() => onChange('preview')}
        className={`px-4 py-2 rounded transition-colors ${
          viewMode === 'preview' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
        }`}
        title="Only show preview"
      >
        👁️ Preview
      </button>
    </div>
  )
}

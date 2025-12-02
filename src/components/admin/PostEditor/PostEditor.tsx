import { MetadataFormData, ViewMode } from '@/types/admin'
import MetadataForm from '../MetadataForm/MetadataForm'
import ViewModeToggle from '../ViewModeToggle/ViewModeToggle'
import ContentEditor from '../ContentEditor/ContentEditor'
import PreviewPane from '../PreviewPane/PreviewPane'

interface PostEditorProps {
  metadata: MetadataFormData
  content: string
  viewMode: ViewMode
  isNewPost: boolean
  saving: boolean
  error: string
  success: string
  onMetadataChange: (field: keyof MetadataFormData, value: string) => void
  onContentChange: (value: string) => void
  onViewModeChange: (mode: ViewMode) => void
  onSave: () => void
  onDelete: () => void
  onCancel: () => void
}

export default function PostEditor({
  metadata,
  content,
  viewMode,
  isNewPost,
  saving,
  error,
  success,
  onMetadataChange,
  onContentChange,
  onViewModeChange,
  onSave,
  onDelete,
  onCancel
}: PostEditorProps) {
  return (
    <div className="p-6">
      {/* Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded text-green-200">
          {success}
        </div>
      )}

      {/* Metadata Form */}
      <MetadataForm 
        data={metadata}
        isNewPost={isNewPost}
        onChange={onMetadataChange}
      />

      {/* View Mode Toggle */}
      <ViewModeToggle 
        viewMode={viewMode}
        onChange={onViewModeChange}
      />

      {/* Content Editor/Preview */}
      <div className={`mb-6 ${viewMode === 'split' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}`}>
        {(viewMode === 'editor' || viewMode === 'split') && (
          <ContentEditor 
            content={content}
            onChange={onContentChange}
          />
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <PreviewPane 
            content={content}
            height={viewMode === 'split' ? '520px' : 'auto'}
            minHeight={viewMode === 'preview' ? '520px' : 'auto'}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onSave}
          disabled={saving}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        {!isNewPost && (
          <button
            onClick={onDelete}
            disabled={saving}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors"
          >
            Delete
          </button>
        )}
        <button
          onClick={onCancel}
          disabled={saving}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

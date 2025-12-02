interface ActionButtonsProps {
  isNewPost: boolean
  saving: boolean
  onSave: () => void
  onDelete: () => void
  onCancel: () => void
}

export default function ActionButtons({ 
  isNewPost, 
  saving, 
  onSave, 
  onDelete, 
  onCancel 
}: ActionButtonsProps) {
  return (
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
  )
}

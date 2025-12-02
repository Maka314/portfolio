interface EmptyStateProps {
  success?: string
}

export default function EmptyState({ success }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-gray-400">
        <p className="text-xl mb-4">Select a post to edit or create a new one</p>
        {success && (
          <p className="text-green-500 mb-2">{success}</p>
        )}
      </div>
    </div>
  )
}

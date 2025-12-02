interface ContentEditorProps {
  content: string
  onChange: (value: string) => void
}

export default function ContentEditor({ content, onChange }: ContentEditorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        rows={20}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 font-mono text-sm resize-none"
        placeholder="Write your markdown content here..."
      />
    </div>
  )
}

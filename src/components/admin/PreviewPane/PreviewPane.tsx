import ReactMarkdown from 'react-markdown'

interface PreviewPaneProps {
  content: string
  height?: string
  minHeight?: string
}

export default function PreviewPane({ content, height, minHeight }: PreviewPaneProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Live Preview</label>
      <div 
        className="bg-gray-800 p-6 rounded-lg border border-gray-600 overflow-y-auto" 
        style={{ height, minHeight }}
      >
        <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white prose-code:text-pink-400 prose-pre:bg-gray-900">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

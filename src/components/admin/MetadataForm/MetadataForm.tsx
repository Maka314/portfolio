import { MetadataFormData } from '@/types/admin'

interface MetadataFormProps {
  data: MetadataFormData
  isNewPost: boolean
  onChange: (field: keyof MetadataFormData, value: string) => void
}

export default function MetadataForm({ data, isNewPost, onChange }: MetadataFormProps) {
  const handleTitleChange = (value: string) => {
    onChange('title', value)
    
    // Auto-generate slug for new posts
    if (isNewPost && !data.slug) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      onChange('slug', generatedSlug)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Post Metadata</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="Post title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slug *</label>
          <input
            type="text"
            value={data.slug}
            onChange={(e) => onChange('slug', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="post-slug"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => onChange('date', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
          <input
            type="text"
            value={data.tags}
            onChange={(e) => onChange('tags', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="Next.js, React, TypeScript"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => onChange('description', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="Short description"
          />
        </div>
      </div>
    </div>
  )
}

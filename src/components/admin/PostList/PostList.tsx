import { Post } from '@/types/admin'

interface PostListProps {
  posts: Post[]
  selectedSlug: string | null
  loading: boolean
  onSelectPost: (slug: string) => void
  onNewPost: () => void
}

export default function PostList({ 
  posts, 
  selectedSlug, 
  loading, 
  onSelectPost, 
  onNewPost 
}: PostListProps) {
  return (
    <div className="p-4">
      <button
        onClick={onNewPost}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors mb-4"
      >
        + New Post
      </button>

      {loading ? (
        <p className="text-gray-400 text-center">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400 text-center">No posts yet</p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.slug}
              onClick={() => onSelectPost(post.slug)}
              className={`p-3 rounded cursor-pointer transition-colors ${
                selectedSlug === post.slug
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <h3 className="font-semibold truncate">{post.title}</h3>
              <p className="text-sm text-gray-400">{post.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

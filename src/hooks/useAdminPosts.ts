import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Post, PostData, ViewMode, MetadataFormData } from '@/types/admin'

export function useAdminPosts() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [currentPost, setCurrentPost] = useState<PostData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isNewPost, setIsNewPost] = useState(false)
  
  const [metadata, setMetadata] = useState<MetadataFormData>({
    slug: '',
    title: '',
    date: '',
    description: '',
    tags: ''
  })
  const [content, setContent] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('split')

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/posts')
      if (res.status === 401) {
        router.push('/login')
        return
      }
      if (res.ok) {
        const data = await res.json()
        setPosts(data.posts)
      } else {
        setError('Failed to load posts')
      }
    } catch {
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const loadPost = async (postSlug: string) => {
    try {
      const res = await fetch(`/api/posts/${postSlug}`)
      if (res.ok) {
        const data = await res.json()
        setCurrentPost(data)
        setMetadata({
          slug: data.slug,
          title: data.frontmatter.title,
          date: data.frontmatter.date,
          description: data.frontmatter.description,
          tags: Array.isArray(data.frontmatter.tags) ? data.frontmatter.tags.join(', ') : ''
        })
        setContent(data.content)
        setIsEditing(true)
        setIsNewPost(false)
        setError('')
        setSuccess('')
      }
    } catch {
      setError('Failed to load post')
    }
  }

  const handleNewPost = () => {
    setCurrentPost(null)
    setMetadata({
      slug: '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      tags: ''
    })
    setContent('')
    setIsEditing(true)
    setIsNewPost(true)
    setError('')
    setSuccess('')
  }

  const handleSave = async () => {
    if (!metadata.slug || !metadata.title) {
      setError('Slug and title are required')
      return
    }

    try {
      setSaving(true)
      setError('')
      setSuccess('')

      const tagsArray = metadata.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t)
      const body = {
        slug: metadata.slug,
        title: metadata.title,
        date: metadata.date,
        description: metadata.description,
        tags: tagsArray,
        content,
      }

      let res
      if (isNewPost) {
        res = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      } else {
        res = await fetch(`/api/posts/${currentPost?.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      }

      if (res.ok) {
        setSuccess('Post saved successfully!')
        await loadPosts()
        setIsEditing(false)
        setIsNewPost(false)
        setCurrentPost(null)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save post')
      }
    } catch {
      setError('Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!currentPost) return

    if (!confirm(`Are you sure you want to delete "${currentPost.frontmatter.title}"?`)) {
      return
    }

    try {
      setSaving(true)
      setError('')
      setSuccess('')

      const res = await fetch(`/api/posts/${currentPost.slug}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setSuccess('Post deleted successfully!')
        await loadPosts()
        setIsEditing(false)
        setCurrentPost(null)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete post')
      }
    } catch {
      setError('Failed to delete post')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setIsNewPost(false)
    setCurrentPost(null)
    setError('')
    setSuccess('')
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const handleMetadataChange = (field: keyof MetadataFormData, value: string) => {
    setMetadata(prev => ({ ...prev, [field]: value }))
  }

  return {
    posts,
    loading,
    saving,
    error,
    success,
    currentPost,
    isEditing,
    isNewPost,
    metadata,
    content,
    viewMode,
    loadPost,
    handleNewPost,
    handleSave,
    handleDelete,
    handleCancel,
    handleLogout,
    handleMetadataChange,
    setContent,
    setViewMode,
  }
}


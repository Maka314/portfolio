'use client'

import AdminHeader from '@/components/admin/AdminHeader/AdminHeader'
import ResizableSidebar from '@/components/admin/ResizableSidebar/ResizableSidebar'
import PostList from '@/components/admin/PostList/PostList'
import PostEditor from '@/components/admin/PostEditor/PostEditor'
import { useAdminPosts } from '@/hooks/useAdminPosts'

export default function AdminDashboard() {
  const {
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
  } = useAdminPosts()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminHeader onLogout={handleLogout} />

      <div className="flex h-[calc(100vh-73px)]">
        <ResizableSidebar>
          <PostList
            posts={posts}
            selectedSlug={currentPost?.slug || null}
            loading={loading}
            onSelectPost={loadPost}
            onNewPost={handleNewPost}
          />
        </ResizableSidebar>

        <div className="flex-1 overflow-y-auto">
          {!isEditing ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <p className="text-xl mb-4">Select a post to edit or create a new one</p>
                {success && (
                  <p className="text-green-500 mb-2">{success}</p>
                )}
              </div>
            </div>
          ) : (
            <PostEditor
              metadata={metadata}
              content={content}
              viewMode={viewMode}
              isNewPost={isNewPost}
              saving={saving}
              error={error}
              success={success}
              onMetadataChange={handleMetadataChange}
              onContentChange={setContent}
              onViewModeChange={setViewMode}
              onSave={handleSave}
              onDelete={handleDelete}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  )
}

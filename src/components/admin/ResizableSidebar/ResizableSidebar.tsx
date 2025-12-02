import { ReactNode, useEffect, useState } from 'react'

interface ResizableSidebarProps {
  children: ReactNode
  defaultWidth?: number
  minWidth?: number
  maxWidth?: number
  storageKey?: string
}

export default function ResizableSidebar({ 
  children, 
  defaultWidth = 320,
  minWidth = 200,
  maxWidth = 600,
  storageKey = 'adminSidebarWidth'
}: ResizableSidebarProps) {
  const [sidebarWidth, setSidebarWidth] = useState(defaultWidth)
  const [isResizing, setIsResizing] = useState(false)

  useEffect(() => {
    const savedWidth = localStorage.getItem(storageKey)
    if (savedWidth) {
      setSidebarWidth(parseInt(savedWidth, 10))
    }
  }, [storageKey])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth)
      setSidebarWidth(newWidth)
    }

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false)
        localStorage.setItem(storageKey, sidebarWidth.toString())
      }
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, sidebarWidth, minWidth, maxWidth, storageKey])

  return (
    <>
      <div 
        className="bg-gray-800 border-r border-gray-700 overflow-y-auto flex-shrink-0"
        style={{ width: `${sidebarWidth}px` }}
      >
        {children}
      </div>
      
      <div
        onMouseDown={() => setIsResizing(true)}
        className={`w-1 bg-gray-700 hover:bg-blue-500 cursor-col-resize transition-colors flex-shrink-0 ${
          isResizing ? 'bg-blue-500' : ''
        }`}
        title="拖拽调节侧边栏宽度"
      />
    </>
  )
}

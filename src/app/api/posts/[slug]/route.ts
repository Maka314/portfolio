import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

// GET: 读取单篇文章
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await verifyAuth()
  if (!auth.authorized) {
    return auth.response
  }

  try {
    const { slug } = await params
    const filePath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return NextResponse.json({
      slug,
      frontmatter: data,
      content,
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to read post' },
      { status: 500 }
    )
  }
}

// PUT: 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await verifyAuth()
  if (!auth.authorized) {
    return auth.response
  }

  try {
    const { slug: currentSlug } = await params
    const body = await request.json()
    const { slug: newSlug, title, date, description, tags, content } = body

    if (!newSlug || !title) {
      return NextResponse.json(
        { error: 'Slug and title are required' },
        { status: 400 }
      )
    }

    const currentFilePath = path.join(postsDirectory, `${currentSlug}.md`)

    if (!fs.existsSync(currentFilePath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // 创建新的 frontmatter
    const frontmatter = {
      title,
      date: date || new Date().toISOString().split('T')[0],
      description: description || '',
      tags: tags || [],
    }

    const fileContent = matter.stringify(content || '', frontmatter)

    // 如果 slug 改变了，需要重命名文件
    if (currentSlug !== newSlug) {
      const newFilePath = path.join(postsDirectory, `${newSlug}.md`)

      // 检查新文件名是否已存在
      if (fs.existsSync(newFilePath)) {
        return NextResponse.json(
          { error: 'Post with new slug already exists' },
          { status: 409 }
        )
      }

      // 写入新文件并删除旧文件
      fs.writeFileSync(newFilePath, fileContent, 'utf8')
      fs.unlinkSync(currentFilePath)
    } else {
      // 只是更新文件内容
      fs.writeFileSync(currentFilePath, fileContent, 'utf8')
    }

    return NextResponse.json({ success: true, slug: newSlug })
  } catch {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE: 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await verifyAuth()
  if (!auth.authorized) {
    return auth.response
  }

  try {
    const { slug } = await params
    const filePath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    fs.unlinkSync(filePath)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}

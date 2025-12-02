import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

// GET: 获取所有文章列表
export async function GET() {
  const auth = await verifyAuth()
  if (!auth.authorized) {
    return auth.response
  }

  try {
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          slug,
          title: data.title || slug,
          date: data.date || '',
          description: data.description || '',
          tags: data.tags || [],
        }
      })
      .sort((a, b) => {
        if (a.date < b.date) {
          return 1
        } else {
          return -1
        }
      })

    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json(
      { error: 'Failed to read posts' },
      { status: 500 }
    )
  }
}

// POST: 创建新文章
export async function POST(request: NextRequest) {
  const auth = await verifyAuth()
  if (!auth.authorized) {
    return auth.response
  }

  try {
    const body = await request.json()
    const { slug, title, date, description, tags, content } = body

    if (!slug || !title) {
      return NextResponse.json(
        { error: 'Slug and title are required' },
        { status: 400 }
      )
    }

    // 确保目录存在
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }

    const filePath = path.join(postsDirectory, `${slug}.md`)

    // 检查文件是否已存在
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Post with this slug already exists' },
        { status: 409 }
      )
    }

    // 创建 frontmatter 和内容
    const frontmatter = {
      title,
      date: date || new Date().toISOString().split('T')[0],
      description: description || '',
      tags: tags || [],
    }

    const fileContent = matter.stringify(content || '', frontmatter)

    // 写入文件
    fs.writeFileSync(filePath, fileContent, 'utf8')

    return NextResponse.json({ success: true, slug })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

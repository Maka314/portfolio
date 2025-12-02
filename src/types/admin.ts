export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export interface PostData {
  slug: string
  frontmatter: {
    title: string
    date: string
    description: string
    tags: string[]
  }
  content: string
}

export type ViewMode = 'editor' | 'split' | 'preview'

export interface MetadataFormData {
  slug: string
  title: string
  date: string
  description: string
  tags: string
}

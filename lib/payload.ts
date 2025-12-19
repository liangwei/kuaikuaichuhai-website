/**
 * Payload CMS API 客户端
 * 用于从 Next.js 前端获取 CMS 数据
 */

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL

export interface Article {
  id: string
  title: string
  slug: string
  description: string
  coverImage?: {
    url: string
    alt: string
  }
  content: any
  type: 'seo' | 'geo' | 'social'
  tags?: Tag[]
  author: string
  viewCount: number
  status: 'draft' | 'published'
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  description?: string
}

export interface Service {
  id: string
  title: string
  slug: 'seo' | 'geo' | 'social'
  description?: string
  heroTitle?: string
  heroSubtitle?: string
  coverImage?: {
    url: string
    alt: string
  }
  content: any
  features?: Array<{
    title: string
    description: string
    icon?: string
  }>
}

interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

/**
 * 获取所有文章
 */
export async function getArticles(options?: {
  type?: 'seo' | 'geo' | 'social'
  tag?: string
  limit?: number
  page?: number
  status?: 'draft' | 'published'
}): Promise<PayloadResponse<Article>> {
  const params = new URLSearchParams()

  if (options?.type) params.append('where[type][equals]', options.type)
  if (options?.tag) params.append('where[tags][in]', options.tag)
  if (options?.limit) params.append('limit', options.limit.toString())
  if (options?.page) params.append('page', options.page.toString())
  if (options?.status) params.append('where[status][equals]', options.status)

  // 默认只获取已发布的文章
  if (!options?.status) params.append('where[status][equals]', 'published')

  // 按发布时间倒序排列
  params.append('sort', '-publishedAt')

  const res = await fetch(`${PAYLOAD_API_URL}/articles?${params}`, {
    next: { revalidate: 60 }, // ISR: 60秒重新验证
  })

  if (!res.ok) throw new Error('Failed to fetch articles')

  return res.json()
}

/**
 * 根据 slug 获取单个文章
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[status][equals]': 'published',
    limit: '1',
  })

  const res = await fetch(`${PAYLOAD_API_URL}/articles?${params}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) return null

  const data: PayloadResponse<Article> = await res.json()
  return data.docs[0] || null
}

/**
 * 根据 ID 获取单个文章
 */
export async function getArticleById(id: string): Promise<Article | null> {
  const res = await fetch(`${PAYLOAD_API_URL}/articles/${id}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) return null

  return res.json()
}

/**
 * 获取相关文章（同类型的其他文章）
 */
export async function getRelatedArticles(
  articleId: string,
  type: 'seo' | 'geo' | 'social',
  limit: number = 6
): Promise<Article[]> {
  const params = new URLSearchParams({
    'where[type][equals]': type,
    'where[status][equals]': 'published',
    'where[id][not_equals]': articleId,
    limit: limit.toString(),
    sort: '-publishedAt',
  })

  const res = await fetch(`${PAYLOAD_API_URL}/articles?${params}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) return []

  const data: PayloadResponse<Article> = await res.json()
  return data.docs
}

/**
 * 增加文章浏览量
 */
export async function incrementArticleViewCount(id: string): Promise<void> {
  // 客户端调用，不缓存
  await fetch(`${PAYLOAD_API_URL}/articles/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      viewCount: { $inc: 1 },
    }),
    cache: 'no-store',
  })
}

/**
 * 获取所有标签
 */
export async function getTags(): Promise<Tag[]> {
  const res = await fetch(`${PAYLOAD_API_URL}/tags?limit=100`, {
    next: { revalidate: 3600 }, // 1小时缓存
  })

  if (!res.ok) return []

  const data: PayloadResponse<Tag> = await res.json()
  return data.docs
}

/**
 * 根据 slug 获取标签
 */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    limit: '1',
  })

  const res = await fetch(`${PAYLOAD_API_URL}/tags?${params}`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) return null

  const data: PayloadResponse<Tag> = await res.json()
  return data.docs[0] || null
}

/**
 * 根据 slug 获取服务页面
 */
export async function getServiceBySlug(slug: 'seo' | 'geo' | 'social'): Promise<Service | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    limit: '1',
  })

  const res = await fetch(`${PAYLOAD_API_URL}/services?${params}`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) return null

  const data: PayloadResponse<Service> = await res.json()
  return data.docs[0] || null
}

/**
 * 获取最新文章
 */
export async function getLatestArticles(limit: number = 6): Promise<Article[]> {
  const params = new URLSearchParams({
    'where[status][equals]': 'published',
    limit: limit.toString(),
    sort: '-publishedAt',
  })

  const res = await fetch(`${PAYLOAD_API_URL}/articles?${params}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) return []

  const data: PayloadResponse<Article> = await res.json()
  return data.docs
}

/**
 * 获取最新标签（按文章数量）
 */
export async function getPopularTags(limit: number = 10): Promise<Tag[]> {
  // 简化版：只获取所有标签
  // 生产环境可以在后端实现按文章数量排序
  const res = await fetch(`${PAYLOAD_API_URL}/tags?limit=${limit}`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) return []

  const data: PayloadResponse<Tag> = await res.json()
  return data.docs
}

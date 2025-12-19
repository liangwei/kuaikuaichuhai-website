import { MetadataRoute } from 'next'
import { getArticles, getPopularTags, getCases } from '@/lib/strapi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.kuaikuaichuhai.com'

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/seo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/geo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/social`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  let articlePages: MetadataRoute.Sitemap = []
  let tagPages: MetadataRoute.Sitemap = []
  let casePages: MetadataRoute.Sitemap = []

  try {
    // 获取所有文章
    const articles = await getArticles({ status: 'published', limit: 1000 })
    articlePages = articles.docs.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // 获取所有标签
    const tags = await getPopularTags(100)
    tagPages = tags.map((tag) => ({
      url: `${baseUrl}/news?tag=${tag.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // 获取所有案例
    const cases = await getCases({ limit: 1000 })
    casePages = cases.docs
      .filter((caseItem) => caseItem.slug)
      .map((caseItem) => ({
        url: `${baseUrl}/cases/${caseItem.slug}`,
        lastModified: new Date(caseItem.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  } catch (error) {
    console.error('Failed to fetch dynamic pages for sitemap:', error)
    // 构建时如果 API 不可用，只返回静态页面
  }

  return [...staticPages, ...articlePages, ...tagPages, ...casePages]
}

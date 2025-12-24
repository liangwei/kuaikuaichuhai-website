import { MetadataRoute } from 'next'
import { getArticles, getCases, getTags } from '@/lib/strapi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.kuaikuaichuhai.com'

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
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

  // 获取所有文章
  const articlesResponse = await getArticles({ limit: 1000 })
  const articles: MetadataRoute.Sitemap = articlesResponse.docs.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // 获取所有案例
  const casesResponse = await getCases({ limit: 1000 })
  const cases: MetadataRoute.Sitemap = casesResponse.docs.map((caseItem) => ({
    url: `${baseUrl}/cases/${caseItem.slug}`,
    lastModified: new Date(caseItem.updatedAt || caseItem.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // 获取所有标签
  const tags = await getTags()
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tag/${tag.slug}`,
    lastModified: new Date(tag.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  return [...staticPages, ...articles, ...cases, ...tagPages]
}

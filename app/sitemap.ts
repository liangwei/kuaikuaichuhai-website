import { MetadataRoute } from 'next'
import { getArticles, getTags } from '@/lib/payload'

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
  ]

  // 获取所有文章
  const articles = await getArticles({ status: 'published', limit: 1000 })
  const articlePages: MetadataRoute.Sitemap = articles.docs.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // 获取所有标签
  const tags = await getTags()
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tag/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticPages, ...articlePages, ...tagPages]
}

import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getServiceBySlug, getArticles } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'SEO服务 - 快快出海',
  description: '专业的SEO优化服务，帮助中国品牌在全球搜索引擎中获得更好的排名和曝光',
}

export default async function SEOPage() {
  // 从CMS获取服务页面内容
  const service = await getServiceBySlug('seo')

  // 获取SEO类型的最新6篇文章
  const articlesResponse = await getArticles({
    type: 'seo',
    limit: 6,
    status: 'published',
  })

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              {service?.heroTitle || 'SEO服务'}
            </h1>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
              {service?.heroSubtitle || '专业的SEO优化服务，帮助您的品牌在全球市场脱颖而出'}
            </p>
          </div>
        </section>

        {/* Service Content */}
        {service && (
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              {/* Main Content */}
              <div className="prose prose-lg max-w-none mb-16">
                {/* 这里应该渲染富文本内容，暂时显示占位 */}
                <div className="text-gray-700 leading-relaxed">
                  {service.content ? (
                    <div dangerouslySetInnerHTML={{ __html: JSON.stringify(service.content) }} />
                  ) : (
                    <p>服务内容加载中...</p>
                  )}
                </div>
              </div>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-center mb-12">服务特点</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {articlesResponse.docs.length > 0 && (
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">相关技术动态</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articlesResponse.docs.map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                  >
                    {article.coverImage && (
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={article.coverImage.url}
                          alt={article.coverImage.alt || article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{article.author}</span>
                        <time>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

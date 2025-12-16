import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getArticles, getLatestArticles, getPopularTags } from '@/lib/payload'

export const metadata: Metadata = {
  title: '技术动态 - 快快出海',
  description: '了解最新的出海营销趋势、技术动态和行业洞察',
}

interface NewsPageProps {
  searchParams: Promise<{
    page?: string
    type?: 'seo' | 'geo' | 'social'
  }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const type = params.type

  // 获取文章列表
  const articlesResponse = await getArticles({
    type,
    limit: 12,
    page: currentPage,
    status: 'published',
  })

  // 获取最新文章（侧边栏）
  const latestArticles = await getLatestArticles(6)

  // 获取热门标签（侧边栏）
  const popularTags = await getPopularTags(10)

  const typeLabels = {
    seo: 'SEO服务',
    geo: 'GEO服务',
    social: '社媒服务',
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              技术动态
            </h1>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
              {type ? `${typeLabels[type]} 相关文章` : '了解最新的出海营销趋势、技术动态和行业洞察'}
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="flex-1">
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <Link
                    href="/news"
                    className={`px-6 py-2 rounded-full transition-colors ${
                      !type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    全部
                  </Link>
                  <Link
                    href="/news?type=seo"
                    className={`px-6 py-2 rounded-full transition-colors ${
                      type === 'seo'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    SEO服务
                  </Link>
                  <Link
                    href="/news?type=geo"
                    className={`px-6 py-2 rounded-full transition-colors ${
                      type === 'geo'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    GEO服务
                  </Link>
                  <Link
                    href="/news?type=social"
                    className={`px-6 py-2 rounded-full transition-colors ${
                      type === 'social'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    社媒服务
                  </Link>
                </div>

                {/* Articles Grid */}
                {articlesResponse.docs.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                className={`px-3 py-1 text-xs font-medium rounded-full ${
                                  article.type === 'seo'
                                    ? 'bg-blue-100 text-blue-700'
                                    : article.type === 'geo'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-purple-100 text-purple-700'
                                }`}
                              >
                                {typeLabels[article.type]}
                              </span>
                            </div>
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

                    {/* Pagination */}
                    {articlesResponse.totalPages > 1 && (
                      <div className="flex justify-center gap-2">
                        {articlesResponse.hasPrevPage && (
                          <Link
                            href={`/news?page=${currentPage - 1}${type ? `&type=${type}` : ''}`}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            上一页
                          </Link>
                        )}

                        {Array.from({ length: articlesResponse.totalPages }, (_, i) => i + 1).map(
                          (page) => (
                            <Link
                              key={page}
                              href={`/news?page=${page}${type ? `&type=${type}` : ''}`}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                page === currentPage
                                  ? 'bg-blue-600 text-white'
                                  : 'border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </Link>
                          )
                        )}

                        {articlesResponse.hasNextPage && (
                          <Link
                            href={`/news?page=${currentPage + 1}${type ? `&type=${type}` : ''}`}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            下一页
                          </Link>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">暂无文章</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:w-80 space-y-8">
                {/* Latest Articles */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4 pb-4 border-b">最新发布</h3>
                  <div className="space-y-4">
                    {latestArticles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/news/${article.slug}`}
                        className="block group"
                      >
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                          {article.title}
                        </h4>
                        <time className="text-xs text-gray-500">
                          {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                        </time>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                {popularTags.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4 pb-4 border-b">热门标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/tag/${tag.slug}`}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

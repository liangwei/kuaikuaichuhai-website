import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import { getArticles, getLatestArticles, getPopularTags, getStrapiMediaUrl } from '@/lib/strapi'
import { Newspaper, TrendingUp, Tag, Clock, User, Sparkles } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        {/* Enhanced Hero Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative max-w-7xl mx-auto">
            <FadeInWhenVisible>
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                技术动态
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
                {type ? `${typeLabels[type]} 相关文章` : '了解最新的出海营销趋势、技术动态和行业洞察'}
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="flex-1">
                {/* Enhanced Filter Buttons */}
                <FadeInWhenVisible>
                  <div className="flex flex-wrap gap-3 mb-12">
                    <Link
                      href="/news"
                      className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        !type
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                      }`}
                    >
                      {!type && (
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity" />
                      )}
                      <span className="relative flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        全部
                      </span>
                    </Link>
                    <Link
                      href="/news?type=seo"
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        type === 'seo'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                      }`}
                    >
                      SEO服务
                    </Link>
                    <Link
                      href="/news?type=geo"
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        type === 'geo'
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                      }`}
                    >
                      GEO服务
                    </Link>
                    <Link
                      href="/news?type=social"
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        type === 'social'
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                      }`}
                    >
                      社媒服务
                    </Link>
                  </div>
                </FadeInWhenVisible>

                {/* Enhanced Articles Grid */}
                {articlesResponse.docs.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      {articlesResponse.docs.map((article, index) => (
                        <FadeInWhenVisible key={article.id} delay={index * 0.1}>
                          <Link
                            href={`/news/${article.slug}`}
                            className="block group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                          >
                            {article.coverImage && (
                              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                                <img
                                  src={getStrapiMediaUrl(article.coverImage.url) || ''}
                                  alt={article.coverImage.alternativeText || article.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            )}
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <span
                                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
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
                              <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all line-clamp-2">
                                {article.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                                {article.description}
                              </p>
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {article.author}
                                </span>
                                <time className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                                </time>
                              </div>
                            </div>
                          </Link>
                        </FadeInWhenVisible>
                      ))}
                    </div>

                    {/* Enhanced Pagination */}
                    {articlesResponse.totalPages > 1 && (
                      <FadeInWhenVisible>
                        <div className="flex justify-center gap-2">
                          {articlesResponse.hasPrevPage && (
                            <Link
                              href={`/news?page=${currentPage - 1}${type ? `&type=${type}` : ''}`}
                              className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all font-medium"
                            >
                              上一页
                            </Link>
                          )}

                          {Array.from({ length: Math.min(articlesResponse.totalPages, 5) }, (_, i) => {
                            let page: number;
                            if (articlesResponse.totalPages <= 5) {
                              page = i + 1;
                            } else if (currentPage <= 3) {
                              page = i + 1;
                            } else if (currentPage >= articlesResponse.totalPages - 2) {
                              page = articlesResponse.totalPages - 4 + i;
                            } else {
                              page = currentPage - 2 + i;
                            }
                            return (
                              <Link
                                key={page}
                                href={`/news?page=${page}${type ? `&type=${type}` : ''}`}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                                  page === currentPage
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                    : 'bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md'
                                }`}
                              >
                                {page}
                              </Link>
                            );
                          })}

                          {articlesResponse.hasNextPage && (
                            <Link
                              href={`/news?page=${currentPage + 1}${type ? `&type=${type}` : ''}`}
                              className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all font-medium"
                            >
                              下一页
                            </Link>
                          )}
                        </div>
                      </FadeInWhenVisible>
                    )}
                  </>
                ) : (
                  <FadeInWhenVisible>
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-gray-100 rounded-full">
                          <Newspaper className="w-12 h-12 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-gray-500 text-lg">暂无文章</p>
                    </div>
                  </FadeInWhenVisible>
                )}
              </div>

              {/* Enhanced Sidebar */}
              <aside className="lg:w-80 space-y-6">
                {/* Latest Articles */}
                <FadeInWhenVisible delay={0.2}>
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-bold">最新发布</h3>
                    </div>
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
                          <time className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                          </time>
                        </Link>
                      ))}
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* Popular Tags */}
                {popularTags.length > 0 && (
                  <FadeInWhenVisible delay={0.3}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                        <Tag className="w-5 h-5 text-purple-600" />
                        <h3 className="text-lg font-bold">热门标签</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => (
                          <Link
                            key={tag.id}
                            href={`/tag/${tag.slug}`}
                            className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-200 text-gray-700 hover:text-blue-600 text-sm rounded-full transition-all hover:shadow-md font-medium"
                          >
                            #{tag.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </FadeInWhenVisible>
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

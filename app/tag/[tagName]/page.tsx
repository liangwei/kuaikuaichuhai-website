import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getTagBySlug, getArticles, getStrapiMediaUrl } from '@/lib/strapi'

interface TagPageProps {
  params: Promise<{
    tagName: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tagName } = await params
  const tag = await getTagBySlug(tagName)

  if (!tag) {
    return {
      title: '标签不存在 - 快快出海',
    }
  }

  return {
    title: tag.title || `${tag.name} - 快快出海`,
    description: tag.description || `查看所有关于 ${tag.name} 的文章`,
  }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tagName } = await params
  const searchParamsValue = await searchParams
  const currentPage = Number(searchParamsValue.page) || 1

  const tag = await getTagBySlug(tagName)

  if (!tag) {
    notFound()
  }

  // 获取该标签下的所有文章
  const articlesResponse = await getArticles({
    tag: tag.name,
    limit: 12,
    page: currentPage,
    status: 'published',
  })

  const typeLabels = {
    seo: 'SEO服务',
    geo: 'GEO服务',
    social: '社媒服务',
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Page Header */}
        <section className=" px-4 py-24 bg-linear-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-lg font-medium mb-6">
              #{tag.name}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {tag.title || tag.name}
            </h1>
            {tag.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {tag.description}
              </p>
            )}
            <p className="text-gray-500 mt-4">
              共 {articlesResponse.totalDocs} 篇文章
            </p>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {articlesResponse.docs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {articlesResponse.docs.map((article) => (
                    <Link
                      key={article.id}
                      href={`/news/${article.slug}`}
                      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                    >
                      {article.coverImage && (
                        <div className="aspect-video bg-gray-200 overflow-hidden">
                          <img
                            src={getStrapiMediaUrl(article.coverImage.url) || ''}
                            alt={article.coverImage.alternativeText || article.title}
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
                        href={`/tag/${tagName}?page=${currentPage - 1}`}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        上一页
                      </Link>
                    )}

                    {Array.from({ length: articlesResponse.totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Link
                          key={page}
                          href={`/tag/${tagName}?page=${page}`}
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
                        href={`/tag/${tagName}?page=${currentPage + 1}`}
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
                <p className="text-gray-500">该标签下暂无文章</p>
                <Link
                  href="/news"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  浏览所有文章
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

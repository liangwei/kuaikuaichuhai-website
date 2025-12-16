import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getArticleBySlug, getRelatedArticles } from '@/lib/payload'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: '文章不存在 - 快快出海',
    }
  }

  return {
    title: `${article.title} - 快快出海`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.coverImage ? [article.coverImage.url] : [],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // 获取相关文章
  const relatedArticles = await getRelatedArticles(article.id, article.type, 6)

  const typeLabels = {
    seo: 'SEO服务',
    geo: 'GEO服务',
    social: '社媒服务',
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <article className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-6">
                <Link
                  href={`/news?type=${article.type}`}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    article.type === 'seo'
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : article.type === 'geo'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  {typeLabels[article.type]}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
                <div className="flex items-center gap-2">
                  <span className="font-medium">作者:</span>
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">发布时间:</span>
                  <time>{new Date(article.publishedAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</time>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">阅读:</span>
                  <span>{article.viewCount}</span>
                </div>
              </div>

              {/* Cover Image */}
              {article.coverImage && (
                <div className="aspect-video rounded-lg overflow-hidden mb-8">
                  <img
                    src={article.coverImage.url}
                    alt={article.coverImage.alt || article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <p className="text-xl text-gray-700 leading-relaxed">
                {article.description}
              </p>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              {/* 这里需要渲染Lexical富文本内容 */}
              {/* 暂时显示JSON，生产环境需要proper的富文本渲染器 */}
              <div className="text-gray-800 leading-relaxed">
                {typeof article.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <div>
                    {/* Lexical内容需要专门的渲染器，这里先显示占位 */}
                    <p className="text-gray-500 italic">
                      富文本内容渲染器开发中...
                    </p>
                    <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">
                      {JSON.stringify(article.content, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-12 pb-12 border-b">
                <h3 className="text-lg font-bold mb-4">相关标签</h3>
                <div className="flex flex-wrap gap-3">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/tag/${tag.slug}`}
                      className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">相关推荐</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/news/${relatedArticle.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                  >
                    {relatedArticle.coverImage && (
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={relatedArticle.coverImage.url}
                          alt={relatedArticle.coverImage.alt || relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {relatedArticle.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{relatedArticle.author}</span>
                        <time>
                          {new Date(relatedArticle.publishedAt).toLocaleDateString('zh-CN')}
                        </time>
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

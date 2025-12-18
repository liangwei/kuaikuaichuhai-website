import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import { getArticleBySlug, getRelatedArticles, getStrapiMediaUrl } from '@/lib/strapi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Calendar, User, Eye, Tag as TagIcon, Clock, ArrowLeft } from 'lucide-react'

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

  const typeColors = {
    seo: {
      badge: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      gradient: 'from-blue-600 to-purple-600',
      accent: 'text-blue-600',
    },
    geo: {
      badge: 'bg-green-100 text-green-700 hover:bg-green-200',
      gradient: 'from-green-600 to-teal-600',
      accent: 'text-green-600',
    },
    social: {
      badge: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      gradient: 'from-purple-600 to-pink-600',
      accent: 'text-purple-600',
    },
  }

  const colors = typeColors[article.type]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-4">
          <FadeInWhenVisible>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              返回列表
            </Link>
          </FadeInWhenVisible>
        </div>

        <article className="pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              {/* Category Badge */}
              <FadeInWhenVisible delay={0.1}>
                <div className="flex items-center gap-2 mb-6">
                  <Link
                    href={`/news?type=${article.type}`}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all hover:shadow-md ${colors.badge}`}
                  >
                    {typeLabels[article.type]}
                  </Link>
                </div>
              </FadeInWhenVisible>

              {/* Title */}
              <FadeInWhenVisible delay={0.2}>
                <h1 className={`text-4xl md:text-5xl font-bold mb-8 leading-tight bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                  {article.title}
                </h1>
              </FadeInWhenVisible>

              {/* Meta Info */}
              <FadeInWhenVisible delay={0.3}>
                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time>{new Date(article.publishedAt).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</time>
                  </div>
                  {article.viewCount && (
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{article.viewCount} 阅读</span>
                    </div>
                  )}
                </div>
              </FadeInWhenVisible>

              {/* Cover Image */}
              {article.coverImage && (
                <FadeInWhenVisible delay={0.4}>
                  <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-xl">
                    <img
                      src={getStrapiMediaUrl(article.coverImage.url) || ''}
                      alt={article.coverImage.alternativeText || article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </FadeInWhenVisible>
              )}

              {/* Description */}
              {article.description && (
                <FadeInWhenVisible delay={0.5}>
                  <div className="bg-gradient-to-r from-gray-50 to-white border-l-4 border-gray-300 pl-6 py-4 rounded-r-lg mb-8">
                    <p className="text-xl text-gray-700 leading-relaxed font-medium">
                      {article.description}
                    </p>
                  </div>
                </FadeInWhenVisible>
              )}
            </header>

            {/* Article Content */}
            <FadeInWhenVisible delay={0.6}>
              <div className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className={`text-3xl font-bold mt-8 mb-4 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`} {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-6 leading-relaxed text-gray-700 text-lg" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc list-inside mb-6 space-y-3" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal list-inside mb-6 space-y-3" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-4 text-gray-700" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className={`border-l-4 pl-6 italic my-6 text-gray-700 bg-gradient-to-r from-gray-50 to-transparent py-4 rounded-r-lg border-${article.type === 'seo' ? 'blue' : article.type === 'geo' ? 'green' : 'purple'}-500`} {...props} />
                    ),
                    code: ({ node, inline, ...props }: any) =>
                      inline ? (
                        <code className={`bg-${article.type === 'seo' ? 'blue' : article.type === 'geo' ? 'green' : 'purple'}-100 px-2 py-1 rounded text-sm font-mono text-${article.type === 'seo' ? 'blue' : article.type === 'geo' ? 'green' : 'purple'}-700`} {...props} />
                      ) : (
                        <code className="block bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm font-mono mb-6 shadow-lg" {...props} />
                      ),
                    a: ({ node, ...props }) => (
                      <a className={`${colors.accent} hover:underline font-medium transition-colors`} target="_blank" rel="noopener noreferrer" {...props} />
                    ),
                    img: ({ node, ...props }) => (
                      <img className="rounded-xl my-8 max-w-full h-auto shadow-lg" {...props} alt={props.alt || ''} />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-8 rounded-lg shadow-lg">
                        <table className="min-w-full border-collapse" {...props} />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th className={`border border-gray-200 px-6 py-3 bg-gradient-to-r ${colors.gradient} text-white font-bold text-left`} {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="border border-gray-200 px-6 py-3 bg-white" {...props} />
                    ),
                  }}
                >
                  {article.content || ''}
                </ReactMarkdown>
              </div>
            </FadeInWhenVisible>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <FadeInWhenVisible delay={0.7}>
                <div className="mb-12 pb-12 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-6">
                    <TagIcon className={`w-5 h-5 ${colors.accent}`} />
                    <h3 className="text-xl font-bold">相关标签</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/tag/${tag.slug}`}
                        className={`px-5 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-${article.type === 'seo' ? 'blue' : article.type === 'geo' ? 'green' : 'purple'}-50 hover:to-${article.type === 'seo' ? 'blue' : article.type === 'geo' ? 'green' : 'purple'}-100 border border-gray-200 text-gray-700 hover:${colors.accent} rounded-full transition-all hover:shadow-md font-medium`}
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeInWhenVisible>
            )}
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 px-4 bg-white border-t border-gray-200">
            <div className="max-w-6xl mx-auto">
              <FadeInWhenVisible>
                <div className="text-center mb-12">
                  <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                    相关推荐
                  </h2>
                  <p className="text-gray-600 text-lg">更多精彩内容等你探索</p>
                </div>
              </FadeInWhenVisible>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.slice(0, 6).map((relatedArticle, index) => (
                  <FadeInWhenVisible key={relatedArticle.id} delay={index * 0.1}>
                    <Link
                      href={`/news/${relatedArticle.slug}`}
                      className="block group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                    >
                      {relatedArticle.coverImage && (
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                          <img
                            src={getStrapiMediaUrl(relatedArticle.coverImage.url) || ''}
                            alt={relatedArticle.coverImage.alternativeText || relatedArticle.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className={`text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r ${colors.gradient} group-hover:bg-clip-text transition-all line-clamp-2`}>
                          {relatedArticle.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                          {relatedArticle.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {relatedArticle.author}
                          </span>
                          <time className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(relatedArticle.publishedAt).toLocaleDateString('zh-CN')}
                          </time>
                        </div>
                      </div>
                    </Link>
                  </FadeInWhenVisible>
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

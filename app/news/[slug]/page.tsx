import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import { getArticleBySlug, getLatestArticles, getPopularTags, getStrapiMediaUrl } from '@/lib/strapi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Calendar, User, Eye, Tag as TagIcon, Clock, TrendingUp } from 'lucide-react'

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
      authors: article.author ? [article.author] : [],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // 获取最新文章（侧边栏）
  const latestArticles = await getLatestArticles(6)

  // 获取热门标签（侧边栏）
  const popularTags = await getPopularTags(10)

  const typeLabels = {
    seo: 'SEO服务',
    geo: 'GEO服务',
    social: '社媒服务',
  }

  const typeColors: Record<string, { badge: string; gradient: string; accent: string }> = {
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

  // 默认颜色配置，防止 article.type 不匹配时出错
  const defaultColors = {
    badge: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    gradient: 'from-gray-600 to-gray-800',
    accent: 'text-gray-600',
  }

  const colors = typeColors[article.type] || defaultColors

  // 构建JSON-LD结构化数据
  const jsonLd = {
    "@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
    "@id": `https://www.kuaikuaichuhai.com/news/${article.slug}`,
    "pubDate": article.publishedAt,
    "upDate": article.updatedAt || article.publishedAt
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 百度时间因子 JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-4">
          {/* 面包屑导航 */}
          <Breadcrumb
            items={[
              { label: '技术动态', href: '/news' },
              { label: article.title }
            ]}
          />
        </div>

        <div className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <article className="flex-1">
                {/* Article Header */}
                <header className="mb-12">
                  {/* Title */}
                  <FadeInWhenVisible delay={0.1}>
                    <h1 className={`text-4xl md:text-5xl font-bold mb-8 leading-tight bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                      {article.title}
                    </h1>
                  </FadeInWhenVisible>

                  {/* Meta Info */}
                  <FadeInWhenVisible delay={0.2}>
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
                    <FadeInWhenVisible delay={0.3}>
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
                    <FadeInWhenVisible delay={0.4}>
                      <div className="bg-gradient-to-r from-gray-50 to-white border-l-4 border-gray-300 pl-6 py-4 rounded-r-lg mb-8">
                        <p className="text-xl text-gray-700 leading-relaxed font-medium">
                          {article.description}
                        </p>
                      </div>
                    </FadeInWhenVisible>
                  )}
                </header>

                {/* Article Content */}
                <FadeInWhenVisible delay={0.5}>
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
              </article>

              {/* Sidebar - Latest Articles & Popular Tags */}
              <aside className="lg:w-80">
                <div className="sticky top-24 space-y-6">
                  {/* Latest Articles */}
                  <FadeInWhenVisible delay={0.2}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-bold">最新发布</h3>
                      </div>
                      <div className="space-y-4">
                        {latestArticles.map((latestArticle) => (
                          <Link
                            key={latestArticle.id}
                            href={`/news/${latestArticle.slug}`}
                            className="block group"
                          >
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                              {latestArticle.title}
                            </h4>
                            <time className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(latestArticle.publishedAt).toLocaleDateString('zh-CN')}
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
                          <TagIcon className="w-5 h-5 text-purple-600" />
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
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

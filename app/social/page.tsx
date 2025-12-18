import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getServiceBySlug, getArticles, getStrapiMediaUrl } from '@/lib/strapi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import CounterAnimation from '@/components/CounterAnimation'
import { Share2, Heart, TrendingUp, Users2, Sparkles, Zap, Video, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: '社媒服务 - 快快出海',
  description: '全球社交媒体营销服务，覆盖TikTok、Instagram、Facebook等主流平台',
}

const featureIcons = [Share2, Users2, Video, Zap]

export default async function SocialPage() {
  const service = await getServiceBySlug('social')
  const articlesResponse = await getArticles({
    type: 'social',
    limit: 6,
    status: 'published',
  })

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section with Enhanced Design */}
        <section className="relative py-24 px-4 overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-fuchsia-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]" />

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-purple-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="relative max-w-6xl mx-auto">
            <FadeInWhenVisible>
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
                {service?.heroTitle || service?.title || '社媒服务'}
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {service?.heroSubtitle || service?.shortDescription || '全球社交媒体营销服务，让品牌在社交平台上发光发热'}
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className="flex justify-center gap-4 mt-10">
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  开始咨询
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
                  查看案例
                </button>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <FadeInWhenVisible delay={0}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <CounterAnimation end={10} suffix="+" />
                  </div>
                  <div className="text-purple-100">社交平台</div>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <CounterAnimation end={500} suffix="万+" />
                  </div>
                  <div className="text-purple-100">累计粉丝</div>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.2}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <CounterAnimation end={100000} suffix="+" />
                  </div>
                  <div className="text-purple-100">网红资源</div>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.3}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <CounterAnimation end={300} suffix="%" />
                  </div>
                  <div className="text-purple-100">平均互动增长</div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* Service Content */}
        {service && (
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              {/* Main Content */}
              {service.content && (
                <FadeInWhenVisible>
                  <div className="prose prose-lg max-w-none mb-20">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-12 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-900" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-800" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-6 leading-relaxed text-gray-700 text-lg" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-6 space-y-3" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-6 space-y-3" {...props} />,
                        li: ({ node, ...props }) => <li className="ml-4 text-gray-700" {...props} />,
                        blockquote: ({ node, ...props }) => (
                          <blockquote className="border-l-4 border-purple-500 pl-6 italic my-6 text-gray-700 bg-purple-50 py-4 rounded-r-lg" {...props} />
                        ),
                        code: ({ node, inline, ...props }: any) =>
                          inline ? (
                            <code className="bg-purple-100 px-2 py-1 rounded text-sm font-mono text-purple-700" {...props} />
                          ) : (
                            <code className="block bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm font-mono mb-6 shadow-lg" {...props} />
                          ),
                        a: ({ node, ...props }) => (
                          <a className="text-purple-600 hover:text-pink-600 underline decoration-2 underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
                        ),
                      }}
                    >
                      {service.content}
                    </ReactMarkdown>
                  </div>
                </FadeInWhenVisible>
              )}

              {/* Features with Icons and Animations */}
              {service.features && service.features.length > 0 && (
                <div className="mb-20">
                  <FadeInWhenVisible>
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        服务特点
                      </h2>
                      <p className="text-gray-600 text-lg">让品牌在社交平台引爆流量</p>
                    </div>
                  </FadeInWhenVisible>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.features.map((feature, index) => {
                      const Icon = featureIcons[index % featureIcons.length]
                      return (
                        <FadeInWhenVisible key={feature.id || index} delay={index * 0.1}>
                          <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 overflow-hidden">
                            {/* Gradient Background on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Icon */}
                            <div className="relative flex items-start gap-4">
                              <div className="flex-shrink-0 p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                                <Icon className="w-6 h-6 text-white" />
                              </div>

                              <div className="flex-1">
                                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                                  {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                  {feature.description}
                                </p>
                              </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                          </div>
                        </FadeInWhenVisible>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {articlesResponse.docs.length > 0 && (
          <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-6xl mx-auto">
              <FadeInWhenVisible>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    相关技术动态
                  </h2>
                  <p className="text-gray-600 text-lg">了解最新的社交媒体营销趋势</p>
                </div>
              </FadeInWhenVisible>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articlesResponse.docs.slice(0, 6).map((article, index) => (
                  <FadeInWhenVisible key={article.id} delay={index * 0.1}>
                    <Link
                      href={`/news/${article.slug}`}
                      className="block group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                      {article.coverImage && (
                        <div className="aspect-video bg-gray-200 overflow-hidden">
                          <img
                            src={getStrapiMediaUrl(article.coverImage.url) || ''}
                            alt={article.coverImage.alternativeText || article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                          {article.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="font-medium">{article.author}</span>
                          <time>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</time>
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

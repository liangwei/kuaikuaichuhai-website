import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import { getCaseBySlug, getRelatedCases, getStrapiMediaUrl } from '@/lib/strapi'
import { Building2, TrendingUp, Target, CheckCircle2, ArrowLeft, Lightbulb, Rocket } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface CasePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params
  const caseItem = await getCaseBySlug(slug)

  if (!caseItem) {
    return {
      title: '案例不存在 - 快快出海',
    }
  }

  return {
    title: `${caseItem.title} - 快快出海`,
    description: caseItem.description,
  }
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params
  const caseItem = await getCaseBySlug(slug)

  if (!caseItem) {
    notFound()
  }

  const relatedCases = await getRelatedCases(caseItem.id, caseItem.serviceType, 3)

  const typeLabels = {
    seo: 'SEO服务',
    geo: 'GEO服务',
    social: '社媒服务',
  }

  const typeColors = {
    seo: {
      badge: 'bg-blue-100 text-blue-700',
      gradient: 'from-blue-600 to-purple-600',
      accent: 'text-blue-600',
    },
    geo: {
      badge: 'bg-green-100 text-green-700',
      gradient: 'from-green-600 to-teal-600',
      accent: 'text-green-600',
    },
    social: {
      badge: 'bg-purple-100 text-purple-700',
      gradient: 'from-purple-600 to-pink-600',
      accent: 'text-purple-600',
    },
  }

  const colors = typeColors[caseItem.serviceType]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <FadeInWhenVisible>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              返回案例列表
            </Link>
          </FadeInWhenVisible>
        </div>

        {/* Case Header */}
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <header className="mb-12">
              {/* Service Badge & Client */}
              <FadeInWhenVisible delay={0.1}>
                <div className="flex items-center gap-4 mb-6">
                  <span className={`px-4 py-2 text-sm font-semibold rounded-full ${colors.badge}`}>
                    {typeLabels[caseItem.serviceType]}
                  </span>
                  {caseItem.client && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="w-5 h-5" />
                      <span className="font-medium">{caseItem.client}</span>
                    </div>
                  )}
                </div>
              </FadeInWhenVisible>

              {/* Title */}
              <FadeInWhenVisible delay={0.2}>
                <h1 className={`text-4xl md:text-5xl font-bold mb-8 leading-tight bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                  {caseItem.title}
                </h1>
              </FadeInWhenVisible>

              {/* Description */}
              {caseItem.description && (
                <FadeInWhenVisible delay={0.3}>
                  <div className="prose prose-xl max-w-none mb-8">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {caseItem.description}
                    </ReactMarkdown>
                  </div>
                </FadeInWhenVisible>
              )}

              {/* Cover Image */}
              {caseItem.coverImage && (
                <FadeInWhenVisible delay={0.4}>
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-xl mb-8">
                    <img
                      src={getStrapiMediaUrl(caseItem.coverImage.url) || ''}
                      alt={caseItem.coverImage.alternativeText || caseItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </FadeInWhenVisible>
              )}

              {/* Results */}
              {caseItem.results && caseItem.results.length > 0 && (
                <FadeInWhenVisible delay={0.5}>
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <TrendingUp className={`w-6 h-6 ${colors.accent}`} />
                      成果数据
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {caseItem.results.map((result) => (
                        <div key={result.id} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                          <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                            {result.value}
                          </div>
                          <div className="text-gray-600">{result.metric}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInWhenVisible>
              )}
            </header>

            {/* Challenge */}
            {caseItem.challenge && (
              <FadeInWhenVisible delay={0.6}>
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Target className={`w-6 h-6 ${colors.accent}`} />
                    面临的挑战
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {caseItem.challenge}
                    </ReactMarkdown>
                  </div>
                </div>
              </FadeInWhenVisible>
            )}

            {/* Solution */}
            {caseItem.solution && (
              <FadeInWhenVisible delay={0.7}>
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Lightbulb className={`w-6 h-6 ${colors.accent}`} />
                    解决方案
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {caseItem.solution}
                    </ReactMarkdown>
                  </div>
                </div>
              </FadeInWhenVisible>
            )}

            {/* Images Gallery */}
            {caseItem.images && caseItem.images.length > 0 && (
              <FadeInWhenVisible delay={0.8}>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6">项目展示</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {caseItem.images.map((image, index) => (
                      <div key={index} className="aspect-video rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={getStrapiMediaUrl(image.url) || ''}
                          alt={image.alternativeText || `项目图片${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInWhenVisible>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInWhenVisible>
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/20 rounded-full">
                  <Rocket className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                想要获得类似的成果？
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                立即联系我们，让专业团队为您定制出海方案
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                开始咨询
              </Link>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Related Cases */}
        {relatedCases.length > 0 && (
          <section className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <FadeInWhenVisible>
                <div className="text-center mb-12">
                  <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                    更多案例
                  </h2>
                  <p className="text-gray-600 text-lg">查看更多成功案例</p>
                </div>
              </FadeInWhenVisible>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedCases.map((relatedCase, index) => (
                  <FadeInWhenVisible key={relatedCase.id} delay={index * 0.1}>
                    <Link
                      href={`/cases/${relatedCase.slug}`}
                      className="block group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                    >
                      {relatedCase.coverImage && (
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                          <img
                            src={getStrapiMediaUrl(relatedCase.coverImage.url) || ''}
                            alt={relatedCase.coverImage.alternativeText || relatedCase.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className={`text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r ${colors.gradient} group-hover:bg-clip-text transition-all line-clamp-2`}>
                          {relatedCase.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {relatedCase.description}
                        </p>
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

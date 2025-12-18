import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import { getCases, getStrapiMediaUrl } from '@/lib/strapi'
import { Briefcase, TrendingUp, Building2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '成功案例 - 快快出海',
  description: '查看我们的成功案例，了解如何帮助企业实现全球化增长',
}

interface CasesPageProps {
  searchParams: Promise<{
    type?: 'seo' | 'geo' | 'social'
  }>
}

export default async function CasesPage({ searchParams }: CasesPageProps) {
  const params = await searchParams
  const type = params.type

  const casesResponse = await getCases({
    serviceType: type,
    limit: 12,
  })

  const typeLabels = {
    seo: 'SEO服务',
    geo: 'GEO服务',
    social: '社媒服务',
  }

  const typeColors = {
    seo: {
      badge: 'bg-blue-100 text-blue-700',
      gradient: 'from-blue-600 to-purple-600',
    },
    geo: {
      badge: 'bg-green-100 text-green-700',
      gradient: 'from-green-600 to-teal-600',
    },
    social: {
      badge: 'bg-purple-100 text-purple-700',
      gradient: 'from-purple-600 to-pink-600',
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
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
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                成功案例
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
                {type ? `${typeLabels[type]} 相关案例` : '真实案例，见证我们助力企业全球化成功的每一步'}
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Filter & Cases */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filter Buttons */}
            <FadeInWhenVisible>
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <Link
                  href="/cases"
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    !type
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                  }`}
                >
                  全部案例
                </Link>
                <Link
                  href="/cases?type=seo"
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    type === 'seo'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                  }`}
                >
                  SEO服务
                </Link>
                <Link
                  href="/cases?type=geo"
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    type === 'geo'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                  }`}
                >
                  GEO服务
                </Link>
                <Link
                  href="/cases?type=social"
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

            {/* Cases Grid */}
            {casesResponse.docs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {casesResponse.docs.map((caseItem, index) => {
                  const colors = typeColors[caseItem.serviceType]
                  return (
                    <FadeInWhenVisible key={caseItem.id} delay={index * 0.1}>
                      <Link
                        href={`/cases/${caseItem.slug}`}
                        className="block group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                      >
                        {/* Cover Image */}
                        {caseItem.coverImage && (
                          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                            <img
                              src={getStrapiMediaUrl(caseItem.coverImage.url) || ''}
                              alt={caseItem.coverImage.alternativeText || caseItem.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                            {/* Service Badge */}
                            <div className="absolute top-4 left-4">
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors.badge}`}>
                                {typeLabels[caseItem.serviceType]}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="p-6">
                          {/* Client */}
                          {caseItem.client && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                              <Building2 className="w-4 h-4" />
                              {caseItem.client}
                            </div>
                          )}

                          {/* Title */}
                          <h3 className={`text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r ${colors.gradient} group-hover:bg-clip-text transition-all line-clamp-2`}>
                            {caseItem.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                            {caseItem.description}
                          </p>

                          {/* Results Preview */}
                          {caseItem.results && caseItem.results.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {caseItem.results.slice(0, 2).map((result) => (
                                <div key={result.id} className="flex items-center gap-1 text-xs bg-gray-50 px-3 py-1.5 rounded-full">
                                  <TrendingUp className="w-3 h-3 text-green-600" />
                                  <span className="font-semibold text-green-600">{result.value}</span>
                                  <span className="text-gray-600">{result.metric}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Read More */}
                          <div className="flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:gap-3 transition-all">
                            查看详情
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Link>
                    </FadeInWhenVisible>
                  )
                })}
              </div>
            ) : (
              <FadeInWhenVisible>
                <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <Briefcase className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-gray-500 text-lg">暂无案例</p>
                </div>
              </FadeInWhenVisible>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

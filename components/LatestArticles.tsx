'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import FadeInWhenVisible from './FadeInWhenVisible'
import { Newspaper, ArrowRight } from 'lucide-react'

interface Article {
    id: string | number
    title: string
    slug: string
    type: 'seo' | 'geo' | 'social'
}

export default function LatestArticles() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch('/api/latest-articles')
                if (response.ok) {
                    const data = await response.json()
                    setArticles(data.articles || [])
                }
            } catch (error) {
                console.error('Failed to fetch articles:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchArticles()
    }, [])

    if (loading) {
        return null
    }

    if (articles.length === 0) {
        return null
    }

    const typeColors = {
        seo: 'from-blue-500 to-blue-600',
        geo: 'from-green-500 to-green-600',
        social: 'from-purple-500 to-purple-600',
    }

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <FadeInWhenVisible>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                            <Newspaper className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-semibold text-gray-700">最新动态</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            技术前沿资讯
                        </h2>
                        <p className="text-gray-600 text-lg">了解最新的出海营销趋势与技术动态</p>
                    </div>
                </FadeInWhenVisible>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {articles.slice(0, 6).map((article, index) => (
                        <FadeInWhenVisible key={article.id} delay={index * 0.1}>
                            <Link
                                href={`/news/${article.slug}`}
                                className="group block bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`flex-shrink-0 w-1 h-16 rounded-full bg-gradient-to-b ${typeColors[article.type]}`} />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all line-clamp-3 leading-relaxed">
                                            {article.title}
                                        </h3>
                                    </div>
                                    <ArrowRight className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        </FadeInWhenVisible>
                    ))}
                </div>

                {/* View More Button */}
                <FadeInWhenVisible delay={0.6}>
                    <div className="text-center">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            <span>查看更多文章</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </FadeInWhenVisible>
            </div>
        </section>
    )
}

import { NextResponse } from 'next/server'
import { getLatestArticles } from '@/lib/strapi'

export async function GET() {
    try {
        const articles = await getLatestArticles(6)

        return NextResponse.json({
            articles: articles.map(article => ({
                id: article.id,
                title: article.title,
                slug: article.slug,
                type: article.type,
            }))
        })
    } catch (error) {
        console.error('Error fetching latest articles:', error)
        return NextResponse.json({ articles: [] }, { status: 500 })
    }
}

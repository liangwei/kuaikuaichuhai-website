'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import FadeInWhenVisible from './FadeInWhenVisible'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <FadeInWhenVisible>
            <nav aria-label="面包屑导航" className="mb-6">
                <ol className="flex items-center flex-wrap gap-2 text-sm">
                    {/* 首页 */}
                    <li className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            <span>首页</span>
                        </Link>
                    </li>

                    {/* 其他面包屑项 */}
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-gray-900 font-medium">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </FadeInWhenVisible>
    )
}

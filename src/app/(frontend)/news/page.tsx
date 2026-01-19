import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/Motion'
import { Media } from '@/payload-types'

export const metadata = {
    title: 'News | Black Widow Company',
    description: 'Latest operational reports and community updates.',
}

export default async function NewsIndexPage() {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
        collection: 'news',
        sort: '-publishedDate',
        limit: 12,
    })

    return (
        <div className="bg-background min-h-screen py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <FadeIn className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white mb-4">
                        Intel Feed
                    </h1>
                    <div className="h-1 w-24 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)] mb-8" />
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {result.docs.map((post) => {
                        const coverUrl = typeof post.coverImage === 'object' && post.coverImage?.url ? post.coverImage.url : null
                        const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })

                        return (
                            <StaggerItem key={post.id} className="h-full">
                                <Link
                                    href={`/news/${post.slug}`}
                                    className="group flex flex-col h-full bg-card border border-white/5 overflow-hidden rounded-lg hover:border-primary/50 transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative h-56 w-full overflow-hidden">
                                        {coverUrl ? (
                                            <Image
                                                src={coverUrl}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-secondary flex items-center justify-center">
                                                <span className="text-white/20 font-bold uppercase tracking-widest">No Image</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                                            {date}
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <div className="mt-auto pt-4 flex items-center text-gray-400 text-sm font-medium group-hover:text-white transition-colors">
                                            <span>Read Report</span>
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </StaggerItem>
                        )
                    })}
                </StaggerContainer>
            </div>
        </div>
    )
}

import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Content } from '@/components/blocks/Content'
import { Media } from '@/payload-types'

type Props = {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
        collection: 'news',
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    const post = result.docs[0]

    if (!post) {
        return {
            title: 'Not Found | Black Widow Company',
        }
    }

    return {
        title: `${post.title} | Black Widow Company`,
        description: `News report from the Black Widow Company.`,
    }
}

export default async function NewsPostPage({ params }: Props) {
    const { slug } = await params
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'news',
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    const post = result.docs[0]

    if (!post) {
        return notFound()
    }

    const coverUrl = typeof post.coverImage === 'object' && post.coverImage?.url ? post.coverImage.url : null
    const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Header */}
            <div className="relative h-[50vh] min-h-[400px] w-full flex items-end">
                {coverUrl && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={coverUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-background opacity-100" />
                    </div>
                )}

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-12 md:pb-20">
                    <div className="text-primary text-sm font-bold uppercase tracking-widest mb-4 inline-block bg-black/60 backdrop-blur px-3 py-1 rounded border border-primary/30">
                        {date}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white drop-shadow-lg leading-tight">
                        {post.title}
                    </h1>
                    {/* Author could go here if properly expanded */}
                    <div className="mt-8 h-1 w-24 bg-primary rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4">
                <Content richText={post.content} />
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
        collection: 'news',
        limit: 100,
    })

    return posts.docs.map(({ slug }) => ({ slug }))
}

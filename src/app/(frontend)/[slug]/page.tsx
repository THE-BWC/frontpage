import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Hero } from '@/components/blocks/Hero'
import { Content } from '@/components/blocks/Content'
import { Timeline } from '@/components/blocks/Timeline'
import { Memorial } from '@/components/blocks/Memorial'
import { Header } from '@/components/blocks/Header'

type Props = {
    params: Promise<{
        slug: string
    }>
}

export default async function Page({ params }: Props) {
    const { slug } = await params
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    const page = result.docs[0]

    if (!page) {
        return notFound()
    }

    return (
        <div className="bg-background min-h-screen">
            {page.layout?.map((block, index) => {
                switch (block.blockType) {
                    case 'hero':
                        return <Hero key={index} {...block} />
                    case 'content':
                        return <Content key={index} {...block} />
                    case 'timeline':
                        return <Timeline key={index} {...block} />
                    case 'memorial':
                        return <Memorial key={index} {...block} />
                    case 'header':
                        return <Header key={index} {...block} />
                    default:
                        return null
                }
            })}
        </div>
    )
}

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
        collection: 'pages',
        limit: 100,
    })

    return pages.docs.map(({ slug }) => ({ slug }))
}

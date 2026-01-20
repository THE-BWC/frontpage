import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { FadeIn } from '@/components/animations/Motion'

type CheckMedia = Media | number | string | null | undefined

type Event = {
    year: string
    title?: string | null
    description?: any | null
    image?: CheckMedia
    id?: string | null
}

type Props = {
    events?: Event[] | null
}

export const Timeline = ({ events }: Props) => {
    if (!events || events.length === 0) return null

    return (
        <div className="py-20 px-4 max-w-5xl mx-auto">
            <div className="relative border-l-2 border-white/10 ml-4 md:ml-12 space-y-16">
                {events.map((event, index) => {
                    const imageUrl = typeof event.image === 'object' && event.image?.url ? event.image.url : null

                    return (
                        <FadeIn key={event.id || index} className="relative pl-8 md:pl-16">
                            {/* Dot */}
                            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_10px_rgba(212,175,55,0.5)]" />

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                <div className="md:col-span-2">
                                    <span className="text-primary font-bold text-xl tracking-widest">{event.year}</span>
                                    <h3 className="text-2xl font-bold text-white mt-1">{event.title}</h3>
                                </div>

                                <div className="md:col-span-10 space-y-4">
                                    {event.description && (
                                        <RichText data={event.description} className="text-gray-300 leading-relaxed rich-text" />
                                    )}

                                    {imageUrl && (
                                        <div className="relative h-64 w-full rounded-lg overflow-hidden border border-white/10 mt-4 group">
                                            <Image
                                                src={imageUrl}
                                                alt={event.title || 'Timeline Event'}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </FadeIn>
                    )
                })}
            </div>
        </div>
    )
}

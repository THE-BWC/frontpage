import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/Motion'

type CheckMedia = Media | number | string | null | undefined

type Member = {
    name: string
    callsign?: string | null
    rank?: string | null
    dateOfPassing?: string | null
    tribute?: any | null
    image?: CheckMedia
    id?: string | null
}

type Props = {
    members?: Member[] | null
}

export const Memorial = ({ members }: Props) => {
    if (!members || members.length === 0) return null

    return (
        <section className="py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {members.map((member, index) => {
                        const imageUrl = typeof member.image === 'object' && member.image?.url ? member.image.url : null
                        const dateStr = member.dateOfPassing
                            ? new Date(member.dateOfPassing).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })
                            : null

                        return (
                            <StaggerItem key={member.id || index}>
                                <div className="group relative bg-card/40 border border-white/5 rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(144,25,25,0.15)]">
                                    {/* Image Container */}
                                    <div className="relative h-110 w-full transition-all duration-700 overflow-hidden">
                                        {imageUrl ? (
                                            <Image
                                                src={imageUrl}
                                                alt={member.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                                                <div className="w-20 h-20 border-2 border-white/5 rounded-full flex items-center justify-center">
                                                    <span className="text-white/10 font-bold uppercase tracking-widest text-xs">Fallen</span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                                        {/* Fallen Ribbon/Accent */}
                                        <div className="absolute top-4 right-4 h-12 w-1 bg-primary shadow-[0_0_10px_rgba(144,25,25,0.8)]" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 relative">
                                        <div className="mb-4">
                                            {member.rank && (
                                                <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-1">
                                                    {member.rank}
                                                </span>
                                            )}
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                                                {member.name}
                                                {member.callsign && (
                                                    <span className="text-white/40 ml-2 font-bold italic tracking-normal capitalize text-lg">
                                                        "{member.callsign}"
                                                    </span>
                                                )}
                                            </h3>
                                            {dateStr && (
                                                <span className="text-white/30 text-xs font-medium uppercase tracking-wider block mt-2">
                                                    Fallen: {dateStr}
                                                </span>
                                            )}
                                        </div>

                                        {member.tribute && (
                                            <div className="mt-6 pt-6 border-t border-white/5">
                                                <RichText
                                                    data={member.tribute}
                                                    className="text-gray-400 text-sm leading-relaxed italic rich-text"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </StaggerItem>
                        )
                    })}
                </StaggerContainer>
            </div>
        </section>
    )
}

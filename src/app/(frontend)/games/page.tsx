import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/Motion'
import { Media } from '@/payload-types'

export const metadata = {
    title: 'Active Games | Black Widow Company',
    description: 'The operational theaters of the Black Widow Company.',
}

export default async function GamesPage() {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
        collection: 'games',
        sort: 'title',
        limit: 100,
    })

    return (
        <div className="bg-background min-h-screen py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <FadeIn className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white mb-4">
                        Active Operations
                    </h1>
                    <div className="h-1 w-24 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)] mb-8" />
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We deploy across multiple theaters of war. Choose your battleground.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {result.docs.map((game) => {
                        const coverUrl = typeof game.coverImage === 'object' && game.coverImage?.url ? game.coverImage.url : null

                        return (
                            <StaggerItem
                                key={game.id}
                                className="group relative bg-card border border-white/5 overflow-hidden rounded-lg hover:border-primary/50 transition-all duration-300"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    {coverUrl ? (
                                        <Image
                                            src={coverUrl}
                                            alt={game.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                                            <span className="text-white/20 font-bold uppercase tracking-widest">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
                                </div>

                                {/* Content */}
                                <div className="relative p-6 -mt-12 z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-primary text-xs font-bold uppercase tracking-widest border border-primary/30 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
                                            {game.genre}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                        {game.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {game.description}
                                    </p>

                                    <button className="w-full py-3 border border-white/10 text-white text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-black hover:border-primary transition-all duration-300">
                                        View Roster
                                    </button>
                                </div>
                            </StaggerItem>
                        )
                    })}
                </StaggerContainer>
            </div>
        </div>
    )
}

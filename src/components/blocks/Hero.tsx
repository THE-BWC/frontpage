import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

type CheckMedia = Media | string | null | undefined

type Props = {
    title: string
    subtitle?: string | null
    type?: 'default' | 'fullscreen' | null
    backgroundImage: CheckMedia
    backgroundVideo?: CheckMedia
    youtubeVideoID?: string | null
}

export const Hero = ({ title, subtitle, type, backgroundImage, backgroundVideo, youtubeVideoID }: Props) => {
    const bgUrl = typeof backgroundImage === 'object' && backgroundImage?.url ? backgroundImage.url : null
    const videoUrl = typeof backgroundVideo === 'object' && backgroundVideo?.url ? backgroundVideo.url : null
    const heightClass = type === 'fullscreen' ? 'h-screen' : 'h-[600px]'

    return (
        <div className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden`}>
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                {youtubeVideoID ? (
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        <iframe
                            src={`https://www.youtube.com/embed/${youtubeVideoID}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full aspect-video"
                            allow="autoplay; fullscreen"
                            frameBorder="0"
                        />
                    </div>
                ) : videoUrl ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src={videoUrl} type="video/mp4" />
                        {bgUrl && <Image src={bgUrl} alt="Background" fill className="object-cover" />}
                    </video>
                ) : bgUrl && (
                    <Image
                        src={bgUrl}
                        alt={typeof backgroundImage === 'object' ? backgroundImage.alt || title : title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-black/60 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white mb-6 drop-shadow-lg">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-xl text-gray-200 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                )}
                <div className="mt-8">
                    <div className="h-1 w-24 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(144,25,25,0.5)]" />
                </div>
            </div>
        </div>
    )
}

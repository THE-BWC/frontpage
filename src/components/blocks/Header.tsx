import { RichText } from '@payloadcms/richtext-lexical/react'
import { FadeIn } from '@/components/animations/Motion'

type Props = {
    title: string
    subtitle?: any | null
    showLine?: boolean | null
    alignment?: 'left' | 'center' | null
}

export const Header = ({ title, subtitle, showLine = true, alignment = 'left' }: Props) => {
    const isCenter = alignment === 'center'

    return (
        <section className="pt-32 pb-8 px-4 md:px-8">
            <div className={`max-w-7xl mx-auto ${isCenter ? 'text-center' : 'text-left'}`}>
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white mb-4">
                        {title}
                    </h2>
                    {showLine && (
                        <div className={`h-1 w-24 bg-primary rounded-full shadow-[0_0_15px_rgba(144,25,25,0.5)] ${isCenter ? 'mx-auto' : ''}`} />
                    )}
                    {subtitle && (
                        <div className={`mt-8 ${isCenter ? 'mx-auto' : ''}`}>
                            <RichText
                                data={subtitle}
                                className="text-gray-300 leading-relaxed rich-text"
                            />
                        </div>
                    )}
                </FadeIn>
            </div>
        </section>
    )
}

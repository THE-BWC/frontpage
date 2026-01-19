import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
    richText: any
    alignment?: 'left' | 'center' | 'right' | null
}

export const Content = ({ richText, alignment = 'left' }: Props) => {
    const alignClass = alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'

    return (
        <div className={`py-12 md:py-20 px-4 max-w-4xl mx-auto ${alignClass}`}>
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-wide prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-hover">
                <RichText data={richText} />
            </div>
        </div>
    )
}

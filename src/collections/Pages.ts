import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { ContentBlock } from '../blocks/ContentBlock'
import { TimelineBlock } from '../blocks/TimelineBlock'
import { MemorialBlock } from '../blocks/MemorialBlock'
import { HeaderBlock } from '../blocks/HeaderBlock'

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            unique: true,
            required: true,
        },
        {
            name: 'layout',
            type: 'blocks',
            required: true,
            blocks: [
                HeroBlock,
                ContentBlock,
                TimelineBlock,
                MemorialBlock,
                HeaderBlock,
            ],
        }
    ],
}

import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { ContentBlock } from '../blocks/ContentBlock'
import { TimelineBlock } from '../blocks/TimelineBlock'

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
            ],
        }
    ],
}

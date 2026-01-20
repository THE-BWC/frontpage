import type { Block } from 'payload'

export const TimelineBlock: Block = {
    slug: 'timeline',
    fields: [
        {
            name: 'events',
            type: 'array',
            fields: [
                {
                    name: 'year',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'title',
                    type: 'text',
                },
                {
                    name: 'description',
                    type: 'richText',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
        },
    ],
}

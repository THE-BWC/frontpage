import type { Block } from 'payload'

export const ContentBlock: Block = {
    slug: 'content',
    fields: [
        {
            name: 'richText',
            type: 'richText',
            required: true,
        },
        {
            name: 'alignment',
            type: 'select',
            defaultValue: 'left',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
            ],
        },
    ],
}

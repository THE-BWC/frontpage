import type { Block } from 'payload'

export const HeaderBlock: Block = {
    slug: 'header',
    labels: {
        singular: 'Section Header',
        plural: 'Section Headers',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'subtitle',
            type: 'richText',
        },
        {
            name: 'showLine',
            type: 'checkbox',
            label: 'Show Accent Line',
            defaultValue: true,
        },
        {
            name: 'alignment',
            type: 'select',
            defaultValue: 'left',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
            ],
        },
    ],
}

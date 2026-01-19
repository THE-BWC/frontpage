import type { Block } from 'payload'

export const HeroBlock: Block = {
    slug: 'hero',
    fields: [
        {
            name: 'type',
            type: 'select',
            defaultValue: 'default',
            options: [
                { label: 'Default', value: 'default' },
                { label: 'Full Screen', value: 'fullscreen' },
            ],
        },
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'subtitle',
            type: 'textarea',
        },
        {
            name: 'youtubeVideoID',
            type: 'text',
            label: 'YouTube Video ID',
            admin: {
                description: 'Enter the YouTube Video ID (e.g., dQw4w9WgXcQ) to use a YouTube embed as background.',
            },
        },
        {
            name: 'backgroundVideo',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
    ],
}

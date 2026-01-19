import type { CollectionConfig } from 'payload'

export const Games: CollectionConfig = {
    slug: 'games',
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
            name: 'genre',
            type: 'text',
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'platformIcons',
            type: 'array',
            fields: [
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'name',
                    type: 'text',
                }
            ]
        }
    ],
}

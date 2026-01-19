import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    upload: {
        staticDir: 'public/media',
        // @ts-ignore - staticURL is valid in Payload 3.0 but types may be outdated
        staticURL: '/media',
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
    },
    hooks: {
        afterRead: [
            ({ doc }) => {
                // Fix URL paths from /api/media/file/ to /media/
                if (doc.url) {
                    doc.url = doc.url.replace('/api/media/file/', '/media/')
                }
                if (doc.thumbnailURL) {
                    doc.thumbnailURL = doc.thumbnailURL.replace('/api/media/file/', '/media/')
                }
                return doc
            },
        ],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'externalURL',
            type: 'text',
            label: 'Sideload from URL',
            admin: {
                description: 'Bypasses CORS. Paste a direct image URL here and click the button below.',
                position: 'sidebar',
                components: {
                    afterInput: [
                        '@/components/admin/SideloadButton#SideloadButton'
                    ]
                }
            },
        },
    ],
}

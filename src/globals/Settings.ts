import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
    slug: 'settings',
    fields: [
        {
            name: 'siteTitle',
            type: 'text',
            required: true,
            defaultValue: 'Black Widow Company',
        },
        {
            name: 'joinUrl',
            type: 'text',
            label: 'Apply Now URL',
            defaultValue: 'https://blackwidowcompany.com/join',
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'socialLinks',
            type: 'array',
            fields: [
                {
                    name: 'platform',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}

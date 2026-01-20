import type { Block } from 'payload'

export const MemorialBlock: Block = {
    slug: 'memorial',
    labels: {
        singular: 'Memorial Entry',
        plural: 'Memorial Entries',
    },
    fields: [
        {
            name: 'members',
            type: 'array',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'callsign',
                    type: 'text',
                },
                {
                    name: 'rank',
                    type: 'text',
                },
                {
                    name: 'dateOfPassing',
                    type: 'date',
                    admin: {
                        date: {
                            pickerAppearance: 'dayOnly',
                            displayFormat: 'MMMM d, yyyy',
                        },
                    },
                },
                {
                    name: 'tribute',
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

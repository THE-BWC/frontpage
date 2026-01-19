import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
    path: path.resolve(dirname, '../.env'),
})

import configPromise from './payload.config'
import { getPayload } from 'payload'

const seed = async () => {
    try {
        const payload = await getPayload({ config: configPromise })

        console.log('Seeding Database...')

        // 1. Create Media (Placeholder)
        const existingMedia = await payload.find({ collection: 'media', limit: 1 })
        let mediaId = existingMedia.docs[0]?.id

        if (!mediaId) {
            console.log('No media found. Proceeding without images.')
        } else {
            console.log(`Using existing media ID: ${mediaId}`)
        }

        // 2. Seed Games
        console.log('Seeding Games...')
        const games = [
            {
                title: 'Star Citizen',
                genre: 'Space Sim',
                description: 'A dedicated division focusing on unparalleled industrial support, security, and exploration.',
                slug: 'star-citizen',
            },
            {
                title: 'Planetside 2',
                genre: 'FPS',
                description: 'Rapid deployment shock troops specializing in point holds and tactical overwhelming force.',
                slug: 'planetside-2',
            },
            {
                title: 'MechWarrior Online',
                genre: 'Mech Sim',
                description: 'Heavy armor division. We bring the rain.',
                slug: 'mwo',
            }
        ]

        for (const game of games) {
            const existing = await payload.find({ collection: 'games', where: { title: { equals: game.title } } })
            if (existing.docs.length === 0) {
                await payload.create({
                    collection: 'games',
                    data: {
                        ...game,
                        coverImage: mediaId ? mediaId : undefined,
                    }
                })
                console.log(`Created Game: ${game.title}`)
            } else {
                console.log(`Game already exists: ${game.title}`)
            }
        }

        // 3. Seed News
        console.log('Seeding News...')
        const newsItems = [
            {
                title: 'Deployment successful',
                slug: 'deployment-success',
                publishedDate: new Date().toISOString(),
                content: {
                    root: {
                        type: 'root',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        type: 'text',
                                        detail: 0,
                                        format: 0,
                                        mode: 'normal',
                                        style: '',
                                        text: 'Operation Red Dawn was a massive success. The BWC secured all objectives with minimal casualties.',
                                        version: 1,
                                    }
                                ],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                textFormat: 0,
                                version: 1,
                            }
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    }
                }
            },
            {
                title: 'New Recruits Wanted',
                slug: 'recruitment-drive',
                publishedDate: new Date(Date.now() - 86400000).toISOString(),
                content: {
                    root: {
                        type: 'root',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        type: 'text',
                                        detail: 0,
                                        format: 0,
                                        mode: 'normal',
                                        style: '',
                                        text: 'We are opening our doors for a limited time. Apply now to join the ranks.',
                                        version: 1,
                                    }
                                ],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                textFormat: 0,
                                version: 1,
                            }
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    }
                }
            }
        ]

        for (const news of newsItems) {
            const existing = await payload.find({ collection: 'news', where: { slug: { equals: news.slug } } })
            if (existing.docs.length === 0) {
                // Need to find a fallback user if ID 1 doesn't exist, but for now we try/catch
                try {
                    await payload.create({
                        collection: 'news',
                        data: {
                            ...news,
                            coverImage: mediaId ? mediaId : undefined,
                            author: 1,
                        }
                    })
                    console.log(`Created News: ${news.title}`)
                } catch (e) {
                    console.log(`Could not create news ${news.title}, likely missing author ID 1. Skipping.`)
                }
            } else {
                console.log(`News already exists: ${news.title}`)
            }
        }

        console.log('Seeding Complete.')
        process.exit(0)
    } catch (error) {
        console.error('Fatal Seed Error:', error)
        process.exit(1)
    }
}

seed()

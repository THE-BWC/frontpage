import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import path from 'path'

export async function POST(req: NextRequest) {
    try {
        const { url: imageUrl, alt } = await req.json()

        if (!imageUrl || !alt) {
            return NextResponse.json({ error: 'URL and Alt text are required' }, { status: 400 })
        }

        const payload = await getPayload({ config: configPromise })

        // Fetch the image on the server (bypasses CORS)
        const response = await fetch(imageUrl)
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`)
        }

        const arrayBuffer = await response.arrayBuffer()
        const contentType = response.headers.get('content-type') || 'image/webp'

        const url = new URL(imageUrl)
        let fileName = path.basename(url.pathname) || `sideload-${Date.now()}`
        if (!path.extname(fileName)) {
            fileName += '.webp'
        }

        // Programmatically create the media record
        const result = await payload.create({
            collection: 'media',
            data: {
                alt,
            },
            file: {
                data: Buffer.from(arrayBuffer),
                mimetype: contentType,
                name: fileName,
                size: arrayBuffer.byteLength,
            },
        })

        return NextResponse.json({ success: true, media: result })
    } catch (error) {
        console.error('Error sideloading media:', error)
        return NextResponse.json({ error: 'Failed to sideload image' }, { status: 500 })
    }
}

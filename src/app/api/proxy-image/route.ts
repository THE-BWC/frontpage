import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const imageUrl = searchParams.get('url')

    if (!imageUrl) {
        return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
    }

    try {
        const response = await fetch(imageUrl)

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`)
        }

        const contentType = response.headers.get('content-type')
        const buffer = await response.arrayBuffer()

        return new NextResponse(Buffer.from(buffer), {
            headers: {
                'Content-Type': contentType || 'image/webp',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    } catch (error) {
        console.error('Error proxying image:', error)
        return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 })
    }
}

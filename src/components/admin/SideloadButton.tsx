'use client'
import React, { useState } from 'react'
import { useField, useForm, useConfig } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'

export const SideloadButton = () => {
    const { value: url, setValue } = useField<string>({ path: 'externalURL' })
    const { value: alt } = useField<string>({ path: 'alt' })
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const router = useRouter()

    const handleSideload = async () => {
        if (!url || !alt) {
            setMsg('URL and Alt are required!')
            return
        }

        setLoading(true)
        setMsg('Sideloading...')

        try {
            const res = await fetch('/api/media/sideload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, alt }),
            })

            const data = await res.json()

            if (data.success) {
                setMsg('Success! Redirecting...')
                // Redirect to the new media item
                router.push(`/admin/collections/media/${data.media.id}`)
            } else {
                setMsg(`Error: ${data.error}`)
            }
        } catch (err) {
            setMsg('Failed to fetch API')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ marginTop: '10px' }}>
            <button
                type="button"
                onClick={handleSideload}
                disabled={loading || !url}
                className="btn btn--style-primary"
                style={{ width: '100%', marginBottom: '5px' }}
            >
                {loading ? 'Processing...' : 'Sideload Now'}
            </button>
            {msg && <p style={{ fontSize: '12px', color: msg.includes('Error') ? 'red' : 'green' }}>{msg}</p>}
        </div>
    )
}

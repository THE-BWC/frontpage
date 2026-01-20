import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function Navbar() {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({
        slug: 'settings',
    })

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                                <Image src="/bwc-logo.svg" alt="BWC Logo" fill className="object-contain" />
                            </div>
                            <span className="text-xl font-bold tracking-wider uppercase text-white group-hover:text-primary transition-colors">
                                {settings.siteTitle}
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/games">Games</NavLink>
                            <NavLink href="/news">Intel</NavLink>
                            <NavLink href="/history">History</NavLink>
                            <NavLink href="/memorial">Memorial</NavLink>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Link
                            href={settings.joinUrl || '#'}
                            className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(144,25,25,0.3)] hover:shadow-[0_0_20px_rgba(144,25,25,0.5)]"
                        >
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-gray-300 hover:text-primary hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium uppercase tracking-widest transition-all duration-200"
        >
            {children}
        </Link>
    )
}

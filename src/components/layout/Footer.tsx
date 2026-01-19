import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function Footer() {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({
        slug: 'settings',
    })

    const year = new Date().getFullYear()

    return (
        <footer className="bg-card border-t border-white/5 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-300">
                                <Image src="/bwc-logo.svg" alt="BWC Logo" fill className="object-contain" />
                            </div>
                            <span className="font-bold tracking-wider uppercase text-white group-hover:text-primary transition-colors">
                                {settings.siteTitle}
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            An elite gaming community established in 2003. Dedicated to tactical excellence and brotherhood.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Community</h3>
                        <ul className="space-y-2">
                            <li><FooterLink href="/games">Games</FooterLink></li>
                            <li><FooterLink href="/history">History</FooterLink></li>
                            <li><FooterLink href="/memorial">Memorial</FooterLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Connect</h3>
                        <ul className="space-y-2">
                            {settings.socialLinks?.map((link) => (
                                <li key={link.platform}>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.platform}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Enlist</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Think you have what it takes? Join the ranks of the Black Widow Company.
                        </p>
                        <Link
                            href="/apply"
                            className="inline-block bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded uppercase tracking-wider text-sm transition-colors"
                        >
                            Apply Now
                        </Link>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {year} {settings.siteTitle}. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="text-gray-400 hover:text-white transition-colors text-sm">
            {children}
        </Link>
    )
}

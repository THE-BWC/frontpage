import config from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
    children: React.ReactNode
    params: Promise<{
        segments: string[]
    }>
    searchParams: Promise<{
        [key: string]: string | string[]
    }>
}

const serverFunction = async (args: Args) => {
    'use server'
    return handleServerFunctions({
        ...args,
        config,
        importMap,
    })
}

const Layout = ({ children, params, searchParams }: Args) => (
    <RootLayout
        config={config}
        importMap={importMap}
        serverFunction={serverFunction}
    >
        {children}
    </RootLayout>
)

export default Layout

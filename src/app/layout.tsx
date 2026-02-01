import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'

import { importMap } from './(payload)/admin/importMap.js'
import './(payload)/custom.scss'

type Args = {
  children: React.ReactNode
}

const configPromise = Promise.resolve(config)

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function RootLayoutWrapper({ children }: Readonly<Args>) {
  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

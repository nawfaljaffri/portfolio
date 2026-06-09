import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schema'

export default defineConfig({
  name: 'default',
  title: 'Nawfal Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ix8hcmkh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})

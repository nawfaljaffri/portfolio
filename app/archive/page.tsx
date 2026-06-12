import fs from 'fs'
import path from 'path'
import { client } from '@/lib/sanity/client'
import ArchiveClient from '@/components/ui/ArchiveClient'

export const revalidate = 0 // Disable cache for instant updates during dev

export default async function ArchivePage() {
  // Fetch posters from sanity
  const sanityPosters = await client.fetch(`*[_type == "poster"] | order(_createdAt desc) {
    _id,
    title,
    date,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      }
    }
  }`)

  // Fetch local bulk-posters
  let localPosters: any[] = []
  try {
    const bulkDir = path.join(process.cwd(), 'public', 'bulk-posters')
    if (fs.existsSync(bulkDir)) {
      const files = fs.readdirSync(bulkDir).filter(file => file.match(/\.(png|jpe?g|gif|webp)$/i))
      localPosters = files.map((file, i) => ({
        _id: `local-${i}`,
        isLocal: true,
        title: file.replace(/\.[^/.]+$/, ""),
        url: `/bulk-posters/${file}`,
      }))
    }
  } catch (err) {
    console.error('Error reading bulk-posters:', err)
  }

  const allPosters = [...sanityPosters, ...localPosters]

  return <ArchiveClient items={allPosters} />
}

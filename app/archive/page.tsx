import { client } from '@/lib/sanity/client'
import ArchiveClient from '@/components/ui/ArchiveClient'

export const revalidate = 0 // Disable cache for instant updates during dev

export default async function ArchivePage() {
  // Fetch posters from sanity
  const posters = await client.fetch(`*[_type == "poster"] | order(_createdAt desc) {
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

  return <ArchiveClient items={posters} />
}

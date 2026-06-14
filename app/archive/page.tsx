import { client } from '@/lib/sanity/client'
import ArchiveClient from '@/components/ui/ArchiveClient'

// Revalidate occasionally, no need to force-dynamic since they're in Sanity now
export const revalidate = 60

async function getPosters() {
  return client.fetch(`
    *[_type == "poster"] | order(coalesce(order, 999) asc, _createdAt desc) {
      _id,
      title,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      date
    }
  `)
}

export default async function ArchivePage() {
  const sanityPosters = await getPosters()
  
  return <ArchiveClient items={sanityPosters} />
}

import { client } from '@/lib/sanity/client'
import MasonryGrid from '@/components/ui/MasonryGrid'
import Link from 'next/link'

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

  return (
    <main className="min-h-screen bg-[#111] text-white selection:bg-white selection:text-black pt-24 pb-32">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <Link href="/" className="text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-4 inline-block">&larr; Back Home</Link>
            <h1 className="text-5xl md:text-8xl font-medium tracking-tight">Archive</h1>
          </div>
          <p className="max-w-xs text-sm opacity-60">A curated collection of posters, graphic design concepts, and visual experiments.</p>
        </div>

        {/* Masonry Grid */}
        {posters.length > 0 ? (
          <MasonryGrid items={posters} />
        ) : (
          <div className="text-center py-32 opacity-50 flex flex-col items-center gap-4">
            <p>No posters found.</p>
            <p className="text-sm">Go to <a href="/studio" className="underline hover:text-white">/studio</a> to add your first poster!</p>
          </div>
        )}

      </div>
    </main>
  )
}

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
    <main className="min-h-screen bg-white text-[#111] selection:bg-black selection:text-white pt-24 pb-32">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col border-b border-black/10 pb-8 relative">
          <Link href="/" className="absolute top-0 right-0 w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300">
            <span className="sr-only">Back Home</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </Link>
          
          <h1 className="text-6xl md:text-9xl font-semibold tracking-tighter mb-4">Archive</h1>
          <p className="max-w-sm text-sm font-medium opacity-60">A curated collection of posters, graphic design concepts, and visual experiments.</p>
        </div>

        {/* Masonry Grid with View Switcher */}
        {posters.length > 0 ? (
          <MasonryGrid items={posters} />
        ) : (
          <div className="text-center py-32 opacity-50 flex flex-col items-center gap-4">
            <p className="font-bold">No posters found.</p>
            <p className="text-sm">Go to <a href="/studio" className="underline hover:opacity-50">/studio</a> to add your first poster!</p>
          </div>
        )}

      </div>
    </main>
  )
}

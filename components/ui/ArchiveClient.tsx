'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'

type ViewMode = 'grid' | 'compact' | 'wide'

export default function ArchiveClient({ items }: { items: any[] }) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // We duplicate the items array so that the infinite CSS marquee has enough content to loop seamlessly
  const loopedItems = [...items, ...items, ...items, ...items, ...items]

  // Columns for standard grid (3 cols)
  const gridCol1 = loopedItems.filter((_, i) => i % 3 === 0)
  const gridCol2 = loopedItems.filter((_, i) => i % 3 === 1)
  const gridCol3 = loopedItems.filter((_, i) => i % 3 === 2)

  // Columns for compact grid (4 cols)
  const compactCol1 = loopedItems.filter((_, i) => i % 4 === 0)
  const compactCol2 = loopedItems.filter((_, i) => i % 4 === 1)
  const compactCol3 = loopedItems.filter((_, i) => i % 4 === 2)
  const compactCol4 = loopedItems.filter((_, i) => i % 4 === 3)

  return (
    <main className="min-h-screen bg-white text-[#111] selection:bg-black selection:text-white pt-24 pb-32">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col relative mb-12">
          {/* Back Home Button Top Left */}
          <Link href="/" className="absolute -top-16 left-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
            <span className="text-lg leading-none">&larr;</span> Back Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full border-b border-black/10 pb-8">
            <div>
              <h1 className="text-6xl md:text-9xl font-semibold tracking-tighter mb-4">Archive</h1>
              <p className="max-w-sm text-sm font-medium opacity-60">A curated collection of posters, graphic design concepts, and visual experiments.</p>
            </div>
            
            {/* View Modes aligned to the right on the same bottom line */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest opacity-40 mr-4">View Mode</span>
              <button 
                onClick={() => setViewMode('compact')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-colors ${viewMode === 'compact' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              >
                Compact
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-colors ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              >
                Grid
              </button>
              <button 
                onClick={() => setViewMode('wide')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-colors ${viewMode === 'wide' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              >
                Wide
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Infinite Grids */}
        {items.length === 0 ? (
          <div className="text-center py-32 opacity-50 flex flex-col items-center gap-4">
            <p className="font-bold">No posters found.</p>
            <p className="text-sm">Go to <a href="/studio" className="underline hover:opacity-50">/studio</a> to add your first poster!</p>
          </div>
        ) : (
          <div className="relative w-full h-[80vh] overflow-hidden group">
            
            {/* GRID MODE (3 Cols Vertical Infinite) */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 items-start h-full">
                <VerticalMarquee speed={30} data={gridCol1} />
                <VerticalMarquee speed={45} data={gridCol2} reverse={true} />
                <VerticalMarquee speed={25} data={gridCol3} />
              </div>
            )}

            {/* COMPACT MODE (4 Cols Vertical Infinite) */}
            {viewMode === 'compact' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start h-full">
                <VerticalMarquee speed={35} data={compactCol1} />
                <VerticalMarquee speed={25} data={compactCol2} reverse={true} />
                <VerticalMarquee speed={40} data={compactCol3} />
                <VerticalMarquee speed={30} data={compactCol4} reverse={true} />
              </div>
            )}

            {/* WIDE MODE (Horizontal Infinite Carousel) */}
            {viewMode === 'wide' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <HorizontalMarquee speed={40} data={loopedItems} />
              </div>
            )}

            {/* Fades for top and bottom edges (vertical modes only) */}
            {viewMode !== 'wide' && (
              <>
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
              </>
            )}
          </div>
        )}

      </div>
      
      {/* Global CSS for Infinite Marquees */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-up {
          animation: scroll-up linear infinite;
        }
        .animate-scroll-down {
          animation: scroll-down linear infinite;
        }
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        /* Pause animations when hovering anywhere in the group */
        .group:hover .animate-scroll-up,
        .group:hover .animate-scroll-down,
        .group:hover .animate-scroll-left {
          animation-play-state: paused;
        }
      `}} />
    </main>
  )
}

function VerticalMarquee({ data, speed, reverse = false }: { data: any[], speed: number, reverse?: boolean }) {
  // We render the content twice inside the scrolling container so it seamlessly loops at the 50% mark
  return (
    <div className="h-full overflow-hidden w-full relative">
      <div 
        className={`flex flex-col gap-4 md:gap-8 w-full ${reverse ? 'animate-scroll-down' : 'animate-scroll-up'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex flex-col gap-4 md:gap-8 w-full">
          {data.map((poster, index) => (
            <PosterCard key={`${poster._id}-${index}`} poster={poster} />
          ))}
        </div>
        <div className="flex flex-col gap-4 md:gap-8 w-full">
          {data.map((poster, index) => (
            <PosterCard key={`${poster._id}-dup-${index}`} poster={poster} />
          ))}
        </div>
      </div>
    </div>
  )
}

function HorizontalMarquee({ data, speed }: { data: any[], speed: number }) {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap flex items-center">
      <div 
        className="flex items-center gap-8 animate-scroll-left"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex items-center gap-8">
          {data.map((poster, index) => (
            <div key={`${poster._id}-${index}`} className="w-[40vw] md:w-[25vw] shrink-0">
              <PosterCard poster={poster} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-8">
          {data.map((poster, index) => (
            <div key={`${poster._id}-dup-${index}`} className="w-[40vw] md:w-[25vw] shrink-0">
              <PosterCard poster={poster} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PosterCard({ poster }: { poster: any }) {
  return (
    <div className="relative overflow-hidden bg-black/5 w-full rounded-2xl">
      {poster.image?.asset?.url ? (
        <img 
          src={urlForImage(poster.image).url()} 
          alt={poster.title || 'Poster'} 
          className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-64 bg-black/5" />
      )}
    </div>
  )
}

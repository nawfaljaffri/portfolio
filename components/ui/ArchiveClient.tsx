'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'

export default function ArchiveClient({ items }: { items: any[] }) {
  // Pad items to ensure a healthy native scroll length (e.g. 30 items)
  // This allows the user to scroll down the page comfortably like Pinterest,
  // without the container being claustrophobic or excessively 8000px long.
  const safeItems = useMemo(() => {
    let res = [...items]
    if (res.length > 0) {
      while (res.length < 30) {
        res.push(...items)
      }
    }
    return res
  }, [items])

  // Split into 5 columns
  const scrollCol1 = safeItems.filter((_, i) => i % 5 === 0)
  const scrollCol2 = safeItems.filter((_, i) => i % 5 === 1)
  const scrollCol3 = safeItems.filter((_, i) => i % 5 === 2)
  const scrollCol4 = safeItems.filter((_, i) => i % 5 === 3)
  const scrollCol5 = safeItems.filter((_, i) => i % 5 === 4)

  return (
    <main className="min-h-screen bg-white text-[#111] selection:bg-black selection:text-white pt-16 md:pt-24 flex flex-col overflow-x-hidden">
      
      {/* Fixed bottom fade to ensure the screen bottom always has a clean disappearing line */}
      <div className="fixed bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent pointer-events-none z-40" />

      <div className="w-full mx-auto px-6 md:px-12 flex flex-col relative pb-32">
        
        {/* Header - Natively in the document flow */}
        <div className="flex flex-col relative mb-12 shrink-0 max-w-screen-2xl mx-auto w-full z-50">
          <Link href="/" className="absolute -top-16 left-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
            <span className="text-lg leading-none">&larr;</span> Back Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full border-b border-black/10 pb-8 bg-white/80 backdrop-blur-sm">
            <div>
              <h1 className="text-6xl md:text-9xl font-semibold tracking-tighter mb-4">Archive</h1>
              <p className="max-w-sm text-sm font-medium opacity-60">A curated collection of posters, graphic design concepts, and visual experiments.</p>
            </div>
          </div>
        </div>

        {/* Dynamic Views */}
        {items.length === 0 ? (
          <div className="text-center py-32 opacity-50 flex flex-col items-center gap-4 w-full">
            <p className="font-bold">No posters found.</p>
            <p className="text-sm">Go to <a href="/studio" className="underline hover:opacity-50">/studio</a> to add your first poster!</p>
          </div>
        ) : (
          <div className="relative w-full max-w-screen-2xl mx-auto mt-8 z-10">
            {/* Top Fade specific to the grid container, sitting exactly below the header */}
            <div className="absolute -top-8 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-40" />
            
            <div 
              className="items-start w-full"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2rem' }}
            >
              {/* Perfectly leveled at the top, alternating directions, identical speed, infinite wrap */}
              <LuxuryMarquee data={scrollCol1} speed={1.2} reverse={true} />
              <LuxuryMarquee data={scrollCol2} speed={1.2} reverse={false} />
              <LuxuryMarquee data={scrollCol3} speed={1.2} reverse={true} />
              <LuxuryMarquee data={scrollCol4} speed={1.2} reverse={false} />
              <LuxuryMarquee data={scrollCol5} speed={1.2} reverse={true} />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

// -------------------------------------------------------------
// LUXURY MARQUEE ENGINE (V5 - Perfectly Leveled + Fast + Infinite)
// -------------------------------------------------------------
function LuxuryMarquee({ data, speed, reverse = false }: { data: any[], speed: number, reverse?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isHovered = useRef(false)
  const offset = useRef(0)
  const animationRef = useRef<number>(0)
  const isInitialized = useRef(false)

  useEffect(() => {
    const loop = () => {
      if (!containerRef.current) return;
      const halfHeight = containerRef.current.scrollHeight / 2;
      
      // Initialize downward moving columns to halfHeight so they start perfectly flush at the top!
      if (reverse && !isInitialized.current) {
        offset.current = halfHeight;
        isInitialized.current = true;
      }
      
      // Slow down drastically on hover, otherwise move fast
      const timeIncrement = isHovered.current ? 0.2 : 1.0;
      offset.current += timeIncrement * speed * (reverse ? -1 : 1);
      
      if (offset.current > halfHeight) {
        offset.current -= halfHeight;
      } else if (offset.current < 0) {
        offset.current += halfHeight;
      }
      
      containerRef.current.style.transform = `translate3d(0, ${-offset.current}px, 0)`;
      animationRef.current = requestAnimationFrame(loop)
    }

    animationRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animationRef.current!)
  }, [speed, reverse])

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => { isHovered.current = true }}
      onMouseLeave={() => { isHovered.current = false }}
    >
      <div ref={containerRef} className="flex flex-col gap-4 md:gap-8 w-full will-change-transform">
        {[...data, ...data].map((poster, index) => (
          <PosterCard key={`${poster._id}-${index}`} poster={poster} />
        ))}
      </div>
    </div>
  )
}

function PosterCard({ poster }: { poster: any }) {
  const dim = poster.image?.asset?.metadata?.dimensions
  const aspectRatio = poster.isLocal ? 3/4 : (dim ? dim.width / dim.height : 1)

  return (
    <div 
      className="relative overflow-hidden bg-[#f0f0f0] rounded-sm group transition-all duration-700 ease-out hover:scale-[1.03] hover:z-20 hover:shadow-2xl w-full"
      style={{ aspectRatio }}
    >
      {(poster.isLocal || poster.image?.asset?.url) && (
        <img 
          src={poster.isLocal ? poster.url : urlForImage(poster.image).width(800).url()} 
          alt={poster.title || 'Poster'} 
          className="w-full h-full object-cover pointer-events-none" 
          draggable="false"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  )
}

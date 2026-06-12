'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'

export default function ArchiveClient({ items }: { items: any[] }) {
  // NO DUPLICATION. We use the exact items provided. 
  // This completely fixes the "way too long", "odd columns looping twice", and "slower loading" issues.
  const safeItems = items;

  // Split into 5 staggered columns
  const scrollCol1 = safeItems.filter((_, i) => i % 5 === 0)
  const scrollCol2 = safeItems.filter((_, i) => i % 5 === 1)
  const scrollCol3 = safeItems.filter((_, i) => i % 5 === 2)
  const scrollCol4 = safeItems.filter((_, i) => i % 5 === 3)
  const scrollCol5 = safeItems.filter((_, i) => i % 5 === 4)

  return (
    <main className="min-h-screen bg-white text-[#111] selection:bg-black selection:text-white pt-16 md:pt-24 flex flex-col overflow-x-hidden">


      <div className="w-full mx-auto px-6 md:px-12 flex flex-col relative pb-32">
        
        {/* Header - Natively in the document flow */}
        <div className="flex flex-col relative mb-12 shrink-0 max-w-screen-2xl mx-auto w-full z-50">
          <Link href="/" className="absolute -top-16 left-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
            <span className="text-lg leading-none">&larr;</span> Back Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full border-b border-black/10 pb-8">
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
            <div 
              className="items-start w-full"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2rem' }}
            >
              {/* Added physical top margins to recreate the Version 1 stagger effect natively */}
              <FloatingColumn data={scrollCol1} speed={1.0} phase={0} className="mt-0" />
              <FloatingColumn data={scrollCol2} speed={0.8} phase={1} reverse={true} className="mt-12 md:mt-24" />
              <FloatingColumn data={scrollCol3} speed={1.1} phase={2} className="mt-24 md:mt-48" />
              <FloatingColumn data={scrollCol4} speed={0.9} phase={3} reverse={true} className="mt-12 md:mt-24" />
              <FloatingColumn data={scrollCol5} speed={1.05} phase={4} className="mt-0" />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

// -------------------------------------------------------------
// FLOATING COLUMN ENGINE (V4 - Native Scroll + Sine Wave Bobbing)
// -------------------------------------------------------------
function FloatingColumn({ data, speed, phase, reverse = false, className = '' }: { data: any[], speed: number, phase: number, reverse?: boolean, className?: string }) {
  const columnRef = useRef<HTMLDivElement>(null)
  
  const isHovered = useRef(false)
  const time = useRef(phase)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const loop = () => {
      // If hovered, slow down the time progression to practically a halt
      const timeIncrement = isHovered.current ? 0.001 : 0.005;
      time.current += timeIncrement * speed;
      
      // Calculate floating offset using a sine wave
      // Amplitude of 50px means it travels 100px total (up 50, down 50) over a long period.
      // It gently bobs in place, never infinitely scrolling away, completely fixing the loop bug!
      const offset = Math.sin(time.current) * 50 * (reverse ? -1 : 1);
      
      if (columnRef.current) {
        columnRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }

      animationRef.current = requestAnimationFrame(loop)
    }

    animationRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animationRef.current!)
  }, [speed, reverse])

  return (
    <div 
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => { isHovered.current = true }}
      onMouseLeave={() => { isHovered.current = false }}
    >
      <div ref={columnRef} className="flex flex-col gap-4 md:gap-8 w-full will-change-transform">
        {data.map((poster, index) => (
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
      className="relative overflow-hidden bg-black/5 rounded-sm group transition-all duration-[1s] ease-out hover:scale-[1.05] hover:z-20 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] w-full"
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

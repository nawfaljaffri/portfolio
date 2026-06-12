'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'

export default function ArchiveClient({ items }: { items: any[] }) {
  // Ensure we have enough items for marquee if they only have a few, but don't duplicate if they have a ton
  const safeItems = useMemo(() => {
    let res = [...items]
    while (res.length > 0 && res.length < 15) {
      res.push(...items)
    }
    return res
  }, [items])

  // Split into 5 staggered columns for Scroll Mode
  const scrollCol1 = safeItems.filter((_, i) => i % 5 === 0)
  const scrollCol2 = safeItems.filter((_, i) => i % 5 === 1)
  const scrollCol3 = safeItems.filter((_, i) => i % 5 === 2)
  const scrollCol4 = safeItems.filter((_, i) => i % 5 === 3)
  const scrollCol5 = safeItems.filter((_, i) => i % 5 === 4)

  return (
    <main className="h-[50000px] bg-white text-[#111] selection:bg-black selection:text-white">
      {/* FIXED VIEWPORT FOR INFINITE MARQUEE */}
      <div className="fixed inset-0 w-full h-[100dvh] flex flex-col pt-16 md:pt-24 pointer-events-none z-0">
        <div className="w-full h-full mx-auto px-6 md:px-12 flex flex-col relative pb-0 pointer-events-auto">
          
          {/* Header */}
          <div className="flex flex-col relative mb-12 shrink-0 max-w-screen-2xl mx-auto w-full z-50">
            <Link href="/" className="absolute -top-16 left-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity pointer-events-auto">
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
          <div className="relative w-full h-full flex-grow overflow-hidden max-w-screen-2xl mx-auto">
            {/* SCROLL MODE (Luxurious Vertical Masonry - 5 Columns) */}
            <div className="w-full h-full relative group">
              <div 
                className="items-start h-full"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2rem' }}
              >
                <LuxuryMarquee data={scrollCol1} speed={0.4} vertical={true} />
                <LuxuryMarquee data={scrollCol2} speed={0.6} vertical={true} reverse={true} />
                <LuxuryMarquee data={scrollCol3} speed={0.3} vertical={true} />
                <LuxuryMarquee data={scrollCol4} speed={0.5} vertical={true} reverse={true} />
                <LuxuryMarquee data={scrollCol5} speed={0.4} vertical={true} />
              </div>
              {/* Edge Fades */}
              <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
            </div>

          </div>
        )}
      </div>
    </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  )
}

// -------------------------------------------------------------
// LUXURY MARQUEE ENGINE
// -------------------------------------------------------------
function LuxuryMarquee({ data, speed, vertical = false, reverse = false }: { data: any[], speed: number, vertical?: boolean, reverse?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const pos = useRef(0)
  const currentSpeed = useRef(speed)
  const targetSpeed = useRef(speed)
  const isDragging = useRef(false)
  const lastMousePos = useRef(0)
  const animationRef = useRef<number>(0)
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)

  const direction = reverse ? 1 : -1

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const loop = () => {
      // Lerp the speed for ultra-smooth slow down / speed up
      currentSpeed.current += (targetSpeed.current - currentSpeed.current) * 0.05
      
      if (!isDragging.current) {
        pos.current += currentSpeed.current * direction
      }

      // NATIVE SCROLL SYNC
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY.current
      lastScrollY.current = currentScrollY
      
      if (scrollDelta !== 0) {
        // Multiplier creates parallax between columns while scrolling!
        pos.current -= scrollDelta * (1 + speed)
      }

      const size = vertical ? contentRef.current?.scrollHeight : contentRef.current?.scrollWidth
      
      if (size && containerRef.current) {
        // Infinite Wrap Logic
        if (pos.current <= -size) {
          pos.current += size
        } else if (pos.current > 0) {
          pos.current -= size
        }

        containerRef.current.style.transform = vertical 
          ? `translate3d(0, ${pos.current}px, 0)` 
          : `translate3d(${pos.current}px, 0, 0)`
      }

      animationRef.current = requestAnimationFrame(loop)
    }

    animationRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animationRef.current!)
  }, [direction, vertical, speed])

  // Drag Interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    lastMousePos.current = vertical ? e.clientY : e.clientX
    targetSpeed.current = 0
    currentSpeed.current = 0
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const currentMousePos = vertical ? e.clientY : e.clientX
    const delta = currentMousePos - lastMousePos.current
    pos.current += delta * 2 // Multiplier for faster scrubbing
    lastMousePos.current = currentMousePos
  }

  const handlePointerUp = () => {
    isDragging.current = false
    targetSpeed.current = speed
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
  }

  const handleMouseEnter = () => {
    if (!isDragging.current) targetSpeed.current = speed * 0.1 // Slow down gracefully
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    targetSpeed.current = speed // Accelerate gracefully back
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
  }

  const gapClass = vertical ? 'gap-8' : 'gap-8'
  const flexDir = vertical ? 'flex-col' : 'flex-row items-center'

  return (
    <div 
      className={`relative w-full h-full cursor-grab ${vertical ? 'overflow-hidden' : 'overflow-visible flex items-center'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={containerRef} className={`flex ${flexDir} ${gapClass} w-full will-change-transform`}>
        {/* Render Original Group */}
        <div ref={contentRef} className={`flex ${flexDir} ${gapClass} ${vertical ? 'w-full' : 'shrink-0'}`}>
          {data.map((poster, index) => (
            <PosterCard key={`${poster._id}-${index}`} poster={poster} />
          ))}
        </div>
        {/* Render Duplicate Group for Seamless Infinity */}
        <div className={`flex ${flexDir} ${gapClass} ${vertical ? 'w-full' : 'shrink-0'}`}>
          {data.map((poster, index) => (
            <PosterCard key={`${poster._id}-dup-${index}`} poster={poster} />
          ))}
        </div>
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
          src={poster.isLocal ? poster.url : urlForImage(poster.image).url()} 
          alt={poster.title || 'Poster'} 
          className="w-full h-full object-cover pointer-events-none" 
          draggable="false"
        />
      )}
    </div>
  )
}

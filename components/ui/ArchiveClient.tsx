'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'

type ViewMode = 'grid' | 'scroll' | 'slide'

export default function ArchiveClient({ items }: { items: any[] }) {
  const [viewMode, setViewMode] = useState<ViewMode>('scroll')

  // We duplicate items slightly just to ensure we have enough content to fill the screen initially
  const paddedItems = [...items, ...items, ...items]

  // Splitting into columns for the Scroll (Masonry) view
  const scrollCol1 = paddedItems.filter((_, i) => i % 3 === 0)
  const scrollCol2 = paddedItems.filter((_, i) => i % 3 === 1)
  const scrollCol3 = paddedItems.filter((_, i) => i % 3 === 2)

  return (
    <main className="min-h-screen bg-white text-[#111] selection:bg-black selection:text-white pt-24 pb-32 overflow-hidden">
      <div className="w-full mx-auto px-6 md:px-12 flex flex-col h-screen">
        
        {/* Header */}
        <div className="flex flex-col relative mb-12 shrink-0 max-w-7xl mx-auto w-full">
          <Link href="/" className="absolute -top-16 left-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
            <span className="text-lg leading-none">&larr;</span> Back Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full border-b border-black/10 pb-8">
            <div>
              <h1 className="text-6xl md:text-9xl font-semibold tracking-tighter mb-4">Archive</h1>
              <p className="max-w-sm text-sm font-medium opacity-60">A curated collection of posters, graphic design concepts, and visual experiments.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest opacity-40 mr-4">View Mode</span>
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-colors ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              >
                Grid
              </button>
              <button 
                onClick={() => setViewMode('scroll')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-colors ${viewMode === 'scroll' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              >
                Scroll
              </button>
              <button 
                onClick={() => setViewMode('slide')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-colors ${viewMode === 'slide' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              >
                Slide
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Views */}
        {items.length === 0 ? (
          <div className="text-center py-32 opacity-50 flex flex-col items-center gap-4 max-w-7xl mx-auto w-full">
            <p className="font-bold">No posters found.</p>
            <p className="text-sm">Go to <a href="/studio" className="underline hover:opacity-50">/studio</a> to add your first poster!</p>
          </div>
        ) : (
          <div className="relative w-full flex-grow overflow-hidden">
            
            {/* GRID MODE (Editorial static numbered squares) */}
            {viewMode === 'grid' && (
              <div className="w-full max-w-7xl mx-auto h-full overflow-y-auto pb-32 hide-scrollbar">
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4">
                  {items.map((poster, index) => (
                    <div key={`${poster._id}-${index}`} className="relative group cursor-pointer aspect-square bg-black/5 overflow-hidden">
                      <div className="absolute top-2 left-2 z-10 text-[10px] font-mono font-bold bg-white/80 backdrop-blur-sm px-1 rounded-sm">
                        {(index + 1).toString().padStart(2, '0')}.
                      </div>
                      {poster.image?.asset?.url && (
                        <img 
                          src={urlForImage(poster.image).url()} 
                          alt={poster.title || 'Poster'} 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCROLL MODE (Luxurious Vertical Masonry) */}
            {viewMode === 'scroll' && (
              <div className="w-full max-w-7xl mx-auto h-full relative group">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 items-start h-full">
                  <LuxuryMarquee data={scrollCol1} speed={0.5} vertical={true} />
                  <LuxuryMarquee data={scrollCol2} speed={0.8} vertical={true} reverse={true} />
                  <LuxuryMarquee data={scrollCol3} speed={0.4} vertical={true} />
                </div>
                {/* Edge Fades */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
              </div>
            )}

            {/* SLIDE MODE (Edge-to-Edge Horizontal Strip) */}
            {viewMode === 'slide' && (
              <div className="absolute inset-0 flex items-center -mx-6 md:-mx-12">
                <LuxuryMarquee data={paddedItems} speed={1.2} vertical={false} />
              </div>
            )}

          </div>
        )}
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
  const dragStartPos = useRef(0)
  const lastMousePos = useRef(0)
  const animationRef = useRef<number>(0)

  const direction = reverse ? 1 : -1

  useEffect(() => {
    const loop = () => {
      // Lerp the speed for ultra-smooth slow down / speed up
      currentSpeed.current += (targetSpeed.current - currentSpeed.current) * 0.05
      
      if (!isDragging.current) {
        pos.current += currentSpeed.current * direction
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
  }, [direction, vertical])

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
    pos.current += delta
    lastMousePos.current = currentMousePos
  }

  const handlePointerUp = () => {
    isDragging.current = false
    targetSpeed.current = speed
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
  }

  const handleMouseEnter = () => {
    if (!isDragging.current) targetSpeed.current = speed * 0.1 // Slow down gracefully to 10% speed
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    targetSpeed.current = speed // Accelerate gracefully back to 100% speed
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
  }

  return (
    <div 
      className={`relative w-full h-full cursor-grab ${vertical ? 'overflow-hidden' : 'overflow-hidden flex items-center'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={containerRef} className={`flex ${vertical ? 'flex-col gap-6 md:gap-12' : 'flex-row gap-6 md:gap-12 items-center'} w-full will-change-transform`}>
        {/* Render Original Group */}
        <div ref={contentRef} className={`flex ${vertical ? 'flex-col gap-6 md:gap-12 w-full' : 'flex-row gap-6 md:gap-12 items-center shrink-0'}`}>
          {data.map((poster, index) => (
            <PosterCard key={`${poster._id}-${index}`} poster={poster} vertical={vertical} />
          ))}
        </div>
        {/* Render Duplicate Group for Seamless Infinity */}
        <div className={`flex ${vertical ? 'flex-col gap-6 md:gap-12 w-full' : 'flex-row gap-6 md:gap-12 items-center shrink-0'}`}>
          {data.map((poster, index) => (
            <PosterCard key={`${poster._id}-dup-${index}`} poster={poster} vertical={vertical} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PosterCard({ poster, vertical }: { poster: any, vertical: boolean }) {
  // Pre-calculate aspect ratio so height is reserved before image loads. Prevents layout jumping!
  const dim = poster.image?.asset?.metadata?.dimensions
  const aspectRatio = dim ? dim.width / dim.height : 1

  return (
    <div 
      className={`relative overflow-hidden bg-black/5 rounded-2xl group transition-transform duration-[1.5s] ease-out hover:scale-[1.03] hover:z-10 ${vertical ? 'w-full' : 'w-[75vw] md:w-[35vw] shrink-0'}`}
      style={{ aspectRatio: vertical ? aspectRatio : undefined }}
    >
      {poster.image?.asset?.url ? (
        <img 
          src={urlForImage(poster.image).url()} 
          alt={poster.title || 'Poster'} 
          className="w-full h-full object-cover pointer-events-none" 
          draggable="false"
        />
      ) : (
        <div className="w-full h-full" />
      )}
    </div>
  )
}

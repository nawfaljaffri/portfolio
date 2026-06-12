'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'

type ViewMode = 'grid' | 'scroll' | 'slide'

export default function ArchiveClient({ items }: { items: any[] }) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // Generate heavily duplicated arrays so the layouts look rich even with only 4 posters
  const massiveItems = []
  for (let i = 0; i < 20; i++) {
    massiveItems.push(...items)
  }

  // Generate 5 columns for the Scroll (Masonry) view
  const scrollCol1 = massiveItems.filter((_, i) => i % 5 === 0)
  const scrollCol2 = massiveItems.filter((_, i) => i % 5 === 1)
  const scrollCol3 = massiveItems.filter((_, i) => i % 5 === 2)
  const scrollCol4 = massiveItems.filter((_, i) => i % 5 === 3)
  const scrollCol5 = massiveItems.filter((_, i) => i % 5 === 4)

  return (
    <main className="min-h-screen bg-white text-[#111] selection:bg-black selection:text-white pt-24 pb-32 overflow-hidden">
      <div className="w-full mx-auto px-6 md:px-12 flex flex-col h-screen">
        
        {/* Header */}
        <div className="flex flex-col relative mb-12 shrink-0 max-w-screen-2xl mx-auto w-full z-50">
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
          <div className="text-center py-32 opacity-50 flex flex-col items-center gap-4 w-full">
            <p className="font-bold">No posters found.</p>
            <p className="text-sm">Go to <a href="/studio" className="underline hover:opacity-50">/studio</a> to add your first poster!</p>
          </div>
        ) : (
          <div className="relative w-full flex-grow overflow-hidden max-w-screen-2xl mx-auto">
            
            {/* GRID MODE (Editorial static numbered tiny images) */}
            {viewMode === 'grid' && (
              <div className="w-full h-full overflow-y-auto pb-32 hide-scrollbar">
                <div 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
                    gap: '4rem 2rem' 
                  }}
                >
                  {massiveItems.slice(0, 40).map((poster, index) => (
                    <div key={`${poster._id}-${index}`} className="flex flex-col items-center group cursor-pointer">
                      {/* Number Top Left of Cell */}
                      <div className="w-full text-left mb-4">
                        <span className="text-[10px] font-bold tracking-widest opacity-40">
                          {(index + 1).toString().padStart(2, '0')}.
                        </span>
                      </div>
                      
                      {/* Tiny Image */}
                      <div className="w-full aspect-[3/4] relative transition-transform duration-700 ease-out group-hover:scale-110 group-hover:shadow-2xl bg-black/5">
                        {(poster.isLocal || poster.image?.asset?.url) && (
                          <img 
                            src={poster.isLocal ? poster.url : urlForImage(poster.image).url()} 
                            alt={poster.title || 'Poster'} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCROLL MODE (Luxurious Vertical Masonry - 5 Columns) */}
            {viewMode === 'scroll' && (
              <div className="w-full h-full relative group">
                <div 
                  className="items-start h-full"
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2rem' }}
                >
                  <LuxuryMarquee data={scrollCol1} speed={0.4} vertical={true} mode="scroll" />
                  <LuxuryMarquee data={scrollCol2} speed={0.6} vertical={true} reverse={true} mode="scroll" />
                  <LuxuryMarquee data={scrollCol3} speed={0.3} vertical={true} mode="scroll" />
                  <LuxuryMarquee data={scrollCol4} speed={0.5} vertical={true} reverse={true} mode="scroll" />
                  <LuxuryMarquee data={scrollCol5} speed={0.4} vertical={true} mode="scroll" />
                </div>
                {/* Edge Fades */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
              </div>
            )}

            {/* SLIDE MODE (Edge-to-Edge Horizontal Strip with Expanding Widths) */}
            {viewMode === 'slide' && (
              <div className="absolute inset-0 flex items-start pt-8 md:pt-16 justify-center -mx-12 overflow-visible">
                <LuxuryMarquee data={massiveItems.slice(0, 30)} speed={1.2} vertical={false} mode="slide" />
              </div>
            )}

          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Custom physics for Slide mode expansions */
        .slide-item {
          height: 40vh;
          width: max-content;
          display: flex;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .slide-item:hover {
          transform: scale(1.05);
          z-index: 20;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
        }
      `}} />
    </main>
  )
}

// -------------------------------------------------------------
// LUXURY MARQUEE ENGINE
// -------------------------------------------------------------
function LuxuryMarquee({ data, speed, vertical = false, reverse = false, mode }: { data: any[], speed: number, vertical?: boolean, reverse?: boolean, mode: 'scroll' | 'slide' }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const pos = useRef(0)
  const currentSpeed = useRef(speed)
  const targetSpeed = useRef(speed)
  const isDragging = useRef(false)
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
            <PosterCard key={`${poster._id}-${index}`} poster={poster} mode={mode} />
          ))}
        </div>
        {/* Render Duplicate Group for Seamless Infinity */}
        <div className={`flex ${flexDir} ${gapClass} ${vertical ? 'w-full' : 'shrink-0'}`}>
          {data.map((poster, index) => (
            <PosterCard key={`${poster._id}-dup-${index}`} poster={poster} mode={mode} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PosterCard({ poster, mode }: { poster: any, mode: 'scroll' | 'slide' }) {
  const dim = poster.image?.asset?.metadata?.dimensions
  const aspectRatio = poster.isLocal ? 3/4 : (dim ? dim.width / dim.height : 1)

  if (mode === 'scroll') {
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

  // SLIDE MODE
  return (
    <div className="relative overflow-hidden bg-black/5 rounded-md group slide-item cursor-pointer flex-shrink-0">
      {(poster.isLocal || poster.image?.asset?.url) && (
        <img 
          src={poster.isLocal ? poster.url : urlForImage(poster.image).url()} 
          alt={poster.title || 'Poster'} 
          className="h-full w-auto object-contain pointer-events-none transition-transform duration-[2s] ease-out group-hover:scale-105" 
          draggable="false"
        />
      )}
    </div>
  )
}

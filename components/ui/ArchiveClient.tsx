'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Settings2 } from 'lucide-react'

export default function ArchiveClient({ items }: { items: any[] }) {
  // Split the ORIGINAL items into 5 distinct buckets FIRST.
  // This guarantees that no poster is ever repeated across different columns!
  const baseCol1 = items.filter((_, i) => i % 5 === 0)
  const baseCol2 = items.filter((_, i) => i % 5 === 1)
  const baseCol3 = items.filter((_, i) => i % 5 === 2)
  const baseCol4 = items.filter((_, i) => i % 5 === 3)
  const baseCol5 = items.filter((_, i) => i % 5 === 4)

  const [viewMode, setViewMode] = React.useState<'scroll' | 'grid'>('scroll')
  const [selectedPoster, setSelectedPoster] = React.useState<any | null>(null)
  const [showSettings, setShowSettings] = React.useState(false)
  const [gridCols, setGridCols] = React.useState<2|4|6|8>(6)

  useEffect(() => {
    // Force smooth scroll plugins to recalculate height when the layout radically changes
    window.dispatchEvent(new Event('resize'))
  }, [viewMode])

  return (
    <main className="min-h-screen bg-white text-[#111] selection:bg-black selection:text-white pt-16 md:pt-24 flex flex-col overflow-x-hidden relative">
      
      <div className="w-full mx-auto px-6 md:px-12 flex flex-col relative pb-32">
        
        {/* Header - Back to clean text, no white background block */}
        <div className="flex flex-col relative mb-12 shrink-0 max-w-screen-2xl mx-auto w-full z-50">
          <Link href="/" className="absolute -top-16 left-0 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
            <span className="text-lg leading-none">&larr;</span> Back Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full border-b border-black/10 pb-8">
            <div>
              <h1 className="text-6xl md:text-9xl font-semibold tracking-tighter mb-4">Archive</h1>
              <p className="max-w-sm text-sm font-medium opacity-60">A curated collection of posters, graphic design concepts, and visual experiments.</p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
              <span className="opacity-50 hidden md:block">View Mode</span>
              
              {/* Settings Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors opacity-50 hover:opacity-100"
                >
                  <Settings2 size={16} />
                </button>
                
                <AnimatePresence>
                  {showSettings && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 bg-white border border-black/10 shadow-2xl rounded-xl p-4 z-[60] min-w-[200px]"
                    >
                      <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Grid Columns</span>
                        <div className="flex gap-2">
                          {[2, 4, 6, 8].map(num => (
                            <button
                              key={num}
                              onClick={() => setGridCols(num as any)}
                              className={`w-8 h-8 rounded-md text-xs font-bold transition-colors ${gridCols === num ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  Grid
                </button>
                <button 
                  onClick={() => setViewMode('scroll')}
                  className={`px-4 py-2 rounded-full transition-colors ${viewMode === 'scroll' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  Scroll
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Views */}
        {items.length === 0 ? (
          <div className="text-center py-32 opacity-50 flex flex-col items-center gap-4 w-full">
            <p className="font-bold">No posters found.</p>
            <p className="text-sm">Go to <a href="/studio" className="underline hover:opacity-50">/studio</a> to add your first poster!</p>
          </div>
        ) : viewMode === 'scroll' ? (
          <div className="relative w-full max-w-screen-2xl mx-auto z-10">
            {/* 
              The Beautiful Container Logic:
              Fixed large height (250vh) so you can natively scroll down the page, 
              but it has overflow-hidden to perfectly level the top and bottom edges.
            */}
            <div className="relative w-full h-[250vh] min-h-[2000px] overflow-hidden">
              
              {/* Internal Container Fades - creates the perfect disappearing edges inside the box */}
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent pointer-events-none z-40" />
              <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent pointer-events-none z-40" />
              
              <div 
                className="w-full h-full"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2rem' }}
              >
                {/* Alternating directions, identical speed, mathematically perfect seamless wrap */}
                <LuxuryMarquee data={baseCol1} speed={1.2} reverse={true} onSelectPoster={setSelectedPoster} />
                <LuxuryMarquee data={baseCol2} speed={1.2} reverse={false} onSelectPoster={setSelectedPoster} />
                <LuxuryMarquee data={baseCol3} speed={1.2} reverse={true} onSelectPoster={setSelectedPoster} />
                <LuxuryMarquee data={baseCol4} speed={1.2} reverse={false} onSelectPoster={setSelectedPoster} />
                <LuxuryMarquee data={baseCol5} speed={1.2} reverse={true} onSelectPoster={setSelectedPoster} />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-screen-2xl mx-auto z-10 pt-4 pb-32">
            <div 
              className="grid gap-x-6 gap-y-12"
              style={{ 
                gridTemplateColumns: `repeat(var(--custom-cols, 2), minmax(0, 1fr))` 
              }}
              // Tailwind doesn't support dynamic variables in pure classes easily without arbitrary values,
              // so we use CSS variables and update them inline for responsiveness.
              ref={(el) => {
                if (el) {
                  // Default to 2 on mobile, 4 on tablet, custom on desktop
                  if (typeof window !== 'undefined') {
                    if (window.innerWidth >= 1024) el.style.setProperty('--custom-cols', gridCols.toString());
                    else if (window.innerWidth >= 768) el.style.setProperty('--custom-cols', '4');
                    else el.style.setProperty('--custom-cols', '2');
                  }
                }
              }}
            >
              {items.map((poster, idx) => (
                <div key={poster._id || idx} className="flex flex-col gap-3">
                  <span className="text-[10px] font-mono opacity-50">{(idx + 1).toString().padStart(2, '0')}</span>
                  <PosterCard poster={poster} onClick={() => setSelectedPoster(poster)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedPoster(null)}
          >
            <button 
              className="absolute top-6 left-6 z-[110] w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/40 transition-colors" 
              onClick={() => setSelectedPoster(null)}
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-full max-w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedPoster.isLocal ? selectedPoster.url : urlForImage(selectedPoster.image).width(1200).url()} 
                alt={selectedPoster.title || 'Poster Preview'}
                className="max-h-[85vh] md:max-h-[90vh] max-w-[90vw] object-contain rounded-md shadow-2xl pointer-events-none"
              />
              {selectedPoster.title && (
                <p className="mt-6 text-white text-lg md:text-xl font-medium tracking-wide drop-shadow-md">{selectedPoster.title}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

// -------------------------------------------------------------
// LUXURY MARQUEE ENGINE (V6 - Mathematically Flawless Loop + No Column Mixing)
// -------------------------------------------------------------
function LuxuryMarquee({ data, speed, reverse = false, onSelectPoster }: { data: any[], speed: number, reverse?: boolean, onSelectPoster: (p: any) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const copy2Ref = useRef<HTMLDivElement>(null)
  const isHovered = useRef(false)
  const offset = useRef(0)
  const animationRef = useRef<number>(0)
  const isInitialized = useRef(false)

  // Pad data heavily to ensure one copy is always taller than the 250vh container.
  // This guarantees we never run out of items or see empty bottoms.
  const paddedData = useMemo(() => {
    let res = [...data]
    if (res.length === 0) return res
    while (res.length < 20) {
      res.push(...data)
    }
    return res
  }, [data])

  useEffect(() => {
    const loop = () => {
      if (!containerRef.current || !copy2Ref.current) return;
      
      // Calculate the EXACT pixel distance to jump for a flawless loop (accounts for all gaps/paddings)
      const jumpDistance = copy2Ref.current.offsetTop;
      
      // Initialize downward moving columns to jumpDistance so they start perfectly flush at the top
      if (reverse && !isInitialized.current) {
        offset.current = jumpDistance;
        isInitialized.current = true;
      }
      
      // Slow down drastically on hover, otherwise move fast
      const timeIncrement = isHovered.current ? 0.2 : 1.0;
      offset.current += timeIncrement * speed * (reverse ? -1 : 1);
      
      // Loop wrapping logic
      if (offset.current >= jumpDistance) {
        offset.current -= jumpDistance;
      } else if (offset.current <= 0) {
        offset.current += jumpDistance;
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
        <div className="flex flex-col gap-4 md:gap-8 w-full">
          {paddedData.map((poster, index) => (
            <PosterCard key={`copy1-${poster._id}-${index}`} poster={poster} onClick={() => onSelectPoster(poster)} />
          ))}
        </div>
        <div ref={copy2Ref} className="flex flex-col gap-4 md:gap-8 w-full">
          {paddedData.map((poster, index) => (
            <PosterCard key={`copy2-${poster._id}-${index}`} poster={poster} onClick={() => onSelectPoster(poster)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PosterCard({ poster, onClick }: { poster: any, onClick?: () => void }) {
  // Use a standard portrait poster aspect ratio for the grey container
  const containerRatio = 3/4 

  return (
    <div 
      onClick={onClick}
      className="relative overflow-hidden bg-[#f0f0f0] rounded-sm group transition-all duration-700 ease-out hover:scale-[1.03] hover:z-20 hover:shadow-2xl w-full flex items-center justify-center p-4 md:p-6 cursor-pointer"
      style={{ aspectRatio: containerRatio }}
    >
      {(poster.isLocal || poster.image?.asset?.url) && (
        <img 
          src={poster.isLocal ? poster.url : urlForImage(poster.image).width(800).url()} 
          alt={poster.title || 'Poster'} 
          className="w-full h-full object-contain pointer-events-none drop-shadow-md transition-transform duration-700 group-hover:scale-[1.02]" 
          draggable="false"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  )
}

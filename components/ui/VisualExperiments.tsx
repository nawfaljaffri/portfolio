'use client'

import React, { useRef, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { useCursor } from '@/context/CursorContext'

export default function VisualExperiments({ items }: { items: any[] }) {
  const { setCursor } = useCursor()
  const [selectedPoster, setSelectedPoster] = useState<any | null>(null)
  const [gridCols, setGridCols] = useState(6)

  // Live update columns based on device size and orientation
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const isLandscape = w > h;
        
        if (w < 768) {
          setGridCols(2); // Phones
        } else if (w < 1367) { 
          // 768px to 1366px covers virtually all iPads (Mini to Pro)
          setGridCols(isLandscape ? 5 : 4);
        } else {
          setGridCols(6); // Desktops
        }
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  // Dynamically split items into exactly N columns
  const scrollColumns = useMemo(() => {
    return Array.from({ length: gridCols }, (_, colIndex) => 
      items.filter((_, i) => i % gridCols === colIndex)
    )
  }, [items, gridCols])

  if (items.length === 0) return null;

  return (
    <section className="w-full bg-white text-[#111] pt-0 pb-8 md:pb-32 flex flex-col relative overflow-hidden">
      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Visual Experiments</h3>
            <p className="max-w-md text-lg opacity-60">A curated selection of posters, graphic design concepts, and visual explorations.</p>
          </div>
          <Link 
            href="/archive" 
            onMouseEnter={() => setCursor('hover', 'EXPLORE')}
            onMouseLeave={() => setCursor('default')}
            className="w-fit flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-gray-100 hover:bg-black hover:text-white text-black px-4 py-2 rounded-full transition-colors mb-2 md:mb-6"
          >
            <span>View Archive</span>
            <span className="text-lg leading-none mt-[-2px]">→</span>
          </Link>
        </div>
      </div>

      <div className="relative w-full max-w-[1300px] mx-auto h-[60vh] md:h-[80vh] min-h-[500px] overflow-hidden bg-white px-6 md:px-12">
        {/* Internal Container Fades - creates the perfect disappearing edges inside the box */}
        <div className="absolute top-0 left-0 w-full h-24 md:h-40 bg-gradient-to-b from-white to-transparent pointer-events-none z-40" />
        <div className="absolute bottom-0 left-0 w-full h-24 md:h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-40" />
        
        <div 
          className="w-full h-full grid gap-4 md:gap-8 py-8"
          style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
        >
          {scrollColumns.map((colData, idx) => (
            <LuxuryMarquee 
              key={`mq-${gridCols}-${idx}`}
              data={colData} 
              speed={0.8} 
              reverse={idx % 2 === 0} 
              onSelectPoster={setSelectedPoster} 
            />
          ))}
        </div>
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
                src={selectedPoster.isLocal ? selectedPoster.url : urlForImage(selectedPoster.image).width(800).url()} 
                alt="Poster Preview"
                className="max-h-[85vh] md:max-h-[90vh] max-w-[90vw] object-contain rounded-md shadow-2xl pointer-events-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// -------------------------------------------------------------
// LUXURY MARQUEE ENGINE (V6)
// -------------------------------------------------------------
function LuxuryMarquee({ data, speed, reverse = false, onSelectPoster }: { data: any[], speed: number, reverse?: boolean, onSelectPoster: (p: any) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const copy2Ref = useRef<HTMLDivElement>(null)
  const isHovered = useRef(false)
  const offset = useRef(0)
  const animationRef = useRef<number>(0)
  const isInitialized = useRef(false)

  // Pad data heavily to ensure one copy is always taller than the container
  const paddedData = useMemo(() => {
    let res = [...data]
    if (res.length === 0) return res
    while (res.length < 15) {
      res.push(...data)
    }
    return res
  }, [data])

  useEffect(() => {
    const loop = () => {
      if (!containerRef.current || !copy2Ref.current) return;
      
      const jumpDistance = copy2Ref.current.offsetTop;
      
      if (reverse && !isInitialized.current) {
        offset.current = jumpDistance;
        isInitialized.current = true;
      }
      
      const timeIncrement = isHovered.current ? 0.2 : 1.0;
      offset.current += timeIncrement * speed * (reverse ? -1 : 1);
      
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

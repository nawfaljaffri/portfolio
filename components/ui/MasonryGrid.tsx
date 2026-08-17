'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useAnimationFrame } from 'framer-motion'
import { urlForImage } from '@/lib/sanity/image'
import { useCursor } from '@/context/CursorContext'

type ViewMode = 'grid' | 'compact' | 'wide'

export default function MasonryGrid({ items }: { items: any[] }) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const { setCursor } = useCursor()
  
  // Auto-scrolling state
  const [autoScrollY, setAutoScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Subtle auto-scroll loop
  useAnimationFrame((time, delta) => {
    if (!isHovered && viewMode === 'grid') {
      setAutoScrollY((prev) => prev + delta * 0.05)
    }
  })

  // Columns for standard grid (3 cols)
  const gridCol1 = items.filter((_, i) => i % 3 === 0)
  const gridCol2 = items.filter((_, i) => i % 3 === 1)
  const gridCol3 = items.filter((_, i) => i % 3 === 2)

  // Columns for compact grid (4 cols)
  const compactCol1 = items.filter((_, i) => i % 4 === 0)
  const compactCol2 = items.filter((_, i) => i % 4 === 1)
  const compactCol3 = items.filter((_, i) => i % 4 === 2)
  const compactCol4 = items.filter((_, i) => i % 4 === 3)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Parallax transforms combined with auto-scroll
  // We use scrollYProgress to drive native parallax, and subtract autoScrollY for continuous drift
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])

  const renderColumn = (data: any[], yOffset: any, className: string = '') => {
    return (
      <motion.div 
        style={{ y: viewMode === 'grid' ? yOffset : 0 }} 
        className={`flex flex-col gap-4 md:gap-6 w-full ${className}`}
        animate={{ y: viewMode === 'grid' ? -autoScrollY : 0 }}
        transition={{ ease: "linear", duration: 0 }}
      >
        {data.map((poster) => (
          <div 
            key={poster._id} 
            className="relative overflow-hidden bg-black/5 w-full rounded-2xl cursor-pointer"
            onMouseEnter={() => setCursor('hover', 'VIEW')}
            onMouseLeave={() => setCursor('default')}
          >
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
        ))}
      </motion.div>
    )
  }

  return (
    <div 
      className="flex flex-col gap-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* View Switcher Controls */}
      <div className="flex items-center justify-end gap-2 border-b border-black/5 pb-4">
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

      {/* Dynamic Grid Container */}
      <div ref={containerRef} className="overflow-hidden py-12">
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 items-start">
            {renderColumn(gridCol1, y1)}
            {renderColumn(gridCol2, y2, "md:mt-32")}
            {renderColumn(gridCol3, y3)}
          </div>
        )}

        {viewMode === 'compact' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
            {renderColumn(compactCol1, 0)}
            {renderColumn(compactCol2, 0)}
            {renderColumn(compactCol3, 0)}
            {renderColumn(compactCol4, 0)}
          </div>
        )}

        {viewMode === 'wide' && (
          <div className="flex flex-col gap-12 items-center max-w-4xl mx-auto">
            {items.map((poster) => (
              <div key={poster._id} className="w-full">
                {poster.image?.asset?.url && (
                  <img 
                    src={urlForImage(poster.image).url()} 
                    alt={poster.title || 'Poster'} 
                    className="w-full h-auto rounded-3xl shadow-sm"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { urlForImage } from '@/lib/sanity/image'

export default function MasonryGrid({ items }: { items: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position to power the parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Split items into 3 columns
  const col1 = items.filter((_, i) => i % 3 === 0)
  const col2 = items.filter((_, i) => i % 3 === 1)
  const col3 = items.filter((_, i) => i % 3 === 2)

  // Different parallax scroll speeds for each column
  // As the user scrolls down, col2 will move up faster, col1 moves slower, col3 moves fastest.
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]) 
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])

  const Column = ({ data, y, className }: { data: any[], y: any, className?: string }) => (
    <motion.div style={{ y }} className={`flex flex-col gap-6 md:gap-8 w-full ${className || ''}`}>
      {data.map((poster) => (
        <div key={poster._id} className="relative group overflow-hidden bg-white/5 w-full cursor-pointer">
          {poster.image?.asset?.url ? (
            <img 
              src={urlForImage(poster.image).url()} 
              alt={poster.title} 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-64 bg-white/10" />
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center backdrop-blur-sm">
            <div>
               <h3 className="text-xl md:text-3xl font-bold tracking-tight text-white mb-2">{poster.title}</h3>
               {poster.date && <p className="text-xs font-bold uppercase tracking-widest text-white/50">{poster.date}</p>}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start pb-32">
      <Column data={col1} y={y1} />
      <Column data={col2} y={y2} className="md:mt-32" /> {/* Stagger the middle column */}
      <Column data={col3} y={y3} />
    </div>
  )
}

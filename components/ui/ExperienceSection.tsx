'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const experience = [
  {
    company: "Susty",
    location: "Dubai, UAE",
    roles: [
      { title: "Application Content Developer", date: "05/2025–Present" }
    ]
  },
  {
    company: "AIESEC in UAE",
    location: "Abu Dhabi",
    roles: [
      { title: "Marketing Local Vice President", date: "05/2026–Present" }
    ]
  },
  {
    company: "University Of Birmingham Dubai",
    location: "Dubai, UAE",
    roles: [
      { title: "Google Developer's Group Lead", date: "05/2026–Present" },
      { title: "Founder & VP, Food and Health Society", date: "09/2025–06/2026" },
      { title: "Lead Graphic Designer, Student Association", date: "09/2025–Present" }
    ]
  },
  {
    company: "Alyx Society",
    location: "Dubai, UAE",
    roles: [
      { title: "Director of Event Management", date: "10/2023–11/2024" },
      { title: "Media and Marketing Co-Head", date: "04/2023–10/2023" }
    ]
  },
  {
    company: "Unipreneur Inc.",
    location: "Dubai, UAE",
    roles: [
      { title: "Event Co-ordinator & Ambassador", date: "10/2023–12/2024" }
    ]
  },
  {
    company: "QuixMun",
    location: "Dubai, UAE",
    roles: [
      { title: "Head of Business Development", date: "08/2023–06/2024" }
    ]
  }
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  })

  // Smooth bouncy fill
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  const [cols, setCols] = useState(3)
  const [mounted, setMounted] = useState(false)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setMounted(true)
    const updateCols = () => {
      if (window.innerWidth < 768) setCols(1)
      else if (window.innerWidth < 1024) setCols(2)
      else setCols(3)
    }
    updateCols()
    window.addEventListener('resize', updateCols)
    return () => window.removeEventListener('resize', updateCols)
  }, [])

  // Exact pixel measurement to prevent SVG vector-effect bugs with framer-motion pathLength
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(entries => {
      setSize({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height
      })
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const paddedExperience = [...experience]
  while (paddedExperience.length % cols !== 0) {
    paddedExperience.push({ isPlaceholder: true } as any)
  }

  const rows = Math.ceil(paddedExperience.length / cols)

  // Generate exact pixel coordinates for the snake path
  let d = ""
  if (size.width > 0 && size.height > 0) {
    for (let i = 0; i < experience.length; i++) {
      const r = Math.floor(i / cols)
      const c = r % 2 === 0 ? (i % cols) : (cols - 1 - (i % cols))
      const x = (c + 0.5) * (size.width / cols)
      const y = (r + 0.5) * (size.height / rows)
      if (i === 0) d += `M ${x} ${y} `
      else d += `L ${x} ${y} `
    }
  }

  const getOrder = (i: number) => {
    const r = Math.floor(i / cols)
    if (r % 2 === 0) return i
    const start = r * cols
    const offset = i - start
    return start + (cols - 1 - offset)
  }

  if (!mounted) return <section className="min-h-screen" />

  return (
    <section id="experience" className="relative w-full bg-white text-[#111] py-16 md:py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Matching 'Selected Works' format */}
        <div className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest opacity-60 border-b border-black/10 pb-4 mb-4">
            Professional Timeline
          </h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter">Experience</h3>
        </div>
        
        <div className="relative w-full" ref={containerRef}>
          
          {size.width > 0 && (
            <>
              {/* SVG Snake Line Background */}
              <svg className="absolute inset-0 pointer-events-none z-0" width={size.width} height={size.height}>
                <path 
                  d={d} 
                  fill="none" 
                  stroke="#f3f4f6"
                  strokeWidth="24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>

              {/* SVG Snake Line Foreground (Animated) */}
              <svg className="absolute inset-0 pointer-events-none z-10" width={size.width} height={size.height}>
                <motion.path 
                  d={d} 
                  fill="none" 
                  stroke="#111"
                  strokeWidth="24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{ pathLength: smoothProgress }}
                />
              </svg>
            </>
          )}

          {/* Grid of Cards */}
          <div 
            className="grid w-full relative z-20"
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            {paddedExperience.map((item: any, i) => (
              <div 
                key={i} 
                className="p-8 md:p-12 lg:p-16 w-full flex flex-col justify-center items-center"
                style={{ order: getOrder(i) }}
              >
                {!item.isPlaceholder && (
                  <div className="w-full bg-white/70 backdrop-blur-2xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:bg-white transition-all duration-500 relative group text-left rounded-3xl p-6 md:p-8">
                    <div className="mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 bg-black/5 px-2 py-1 rounded-sm">{item.location}</span>
                      <h4 className="text-xl md:text-2xl font-bold tracking-tight mt-3">{item.company}</h4>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      {item.roles.map((role: any, roleIdx: number) => (
                        <div key={roleIdx} className={`flex flex-col gap-1 ${roleIdx !== 0 ? 'pt-4 border-t border-black/5' : ''}`}>
                          <p className="text-sm md:text-base font-semibold opacity-90">{role.title}</p>
                          <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{role.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  )
}

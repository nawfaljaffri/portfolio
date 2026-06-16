'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Project = {
  id: string
  title: string
  category: string
  description: string
  color: string
  colSpan?: string
  rowSpan?: string
  imageLayout?: 'mockup-iphone' | 'mockup-ipad' | 'full' | 'pixel-art' | 'terminal'
  videoSrc?: string
  liveLink?: string
  technologies?: string
}

const projects: Project[] = [
  {
    id: '5',
    title: '8-Bit Adventure',
    category: 'Game Dev',
    description: 'Custom pixel-art game exploring algorithmic logic and physics.',
    color: 'bg-[#FAFAFA] border border-gray-100 text-[#111]',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    imageLayout: 'pixel-art',
    technologies: 'C++, SDL2, WebAssembly'
  },
  {
    id: '2',
    title: 'Language Learner',
    category: 'iOS / iPadOS',
    description: 'Immersive language learning application built for dual-screen environments.',
    color: 'bg-[#F5F5F5] border border-gray-100 text-[#111]',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-2',
    imageLayout: 'mockup-ipad',
    technologies: 'Swift, SwiftUI, CoreData'
  },
  {
    id: '3',
    title: 'Social Questionnaire',
    category: 'Social App',
    description: 'Tinder-style card swipe mechanics for friends to ask deep questions and connect.',
    color: 'bg-[#FAFAFA] border border-gray-100 text-[#111]',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    imageLayout: 'mockup-iphone',
    technologies: 'React Native, Firebase'
  },
  {
    id: '4',
    title: 'Finance Tracker',
    category: 'Fintech',
    description: 'Clean financial tracking and budgeting with a minimalist approach.',
    color: 'bg-[#F9F9F9] border border-gray-100 text-[#111]',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    imageLayout: 'mockup-iphone',
    technologies: 'Next.js, Tailwind, Prisma'
  },
  {
    id: '1',
    title: 'School Bus Tracker',
    category: 'Map Integration',
    description: 'Traffic control & parent booking system to track children securely on their school routes.',
    color: 'bg-[#F5F5F5] border border-gray-100 text-[#111]',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    imageLayout: 'mockup-iphone',
    technologies: 'Mapbox, React, Node.js'
  },
  {
    id: '6',
    title: 'CRT Terminal OS',
    category: 'Web Dev',
    description: 'Fully functional retro operating system built in React with interactive command line mechanics.',
    color: 'bg-[#FAFAFA] border border-gray-100 text-[#111]',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    imageLayout: 'terminal',
    videoSrc: '/projects/crtos.mp4',
    liveLink: 'https://crt-terminal-os-web.vercel.app',
    technologies: 'React, Framer Motion, TypeScript'
  }
]

export default function BentoGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedProject])

  return (
    <>
      <section id="projects" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest border-t border-gray-200 pt-4 mb-4 text-gray-400">
            Computer Science & Design
          </h2>
          <h3 className="text-4xl md:text-6xl font-medium tracking-tight text-[#111]">Selected Works</h3>
        </motion.div>

        {/* Increased row height to give items more breathing room */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[380px]">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => project.liveLink && setSelectedProject(project)}
              className={`group relative overflow-hidden rounded-[2.5rem] p-8 flex flex-col justify-start ${project.color} ${project.colSpan} ${project.rowSpan} transition-all duration-500 hover:shadow-2xl ${project.liveLink ? 'cursor-pointer' : ''}`}
            >
              {/* Text Content - Tightly restricted width to NEVER overlap the bottom-right graphics */}
              <div className={`z-20 relative pointer-events-none flex flex-col items-start ${project.colSpan === 'md:col-span-2' ? 'w-[75%] md:w-[40%]' : 'w-[80%] md:w-[65%]'}`}>
                <span className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2 block">
                  {project.category}
                </span>
                <h4 className="text-2xl font-bold tracking-tight mb-3">
                  {project.title}
                </h4>
                <p className="text-sm font-medium opacity-70 leading-relaxed">
                  {project.description}
                </p>
                {project.liveLink && (
                  <span className={`inline-block mt-6 text-xs font-bold px-4 py-2 rounded-full transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 shadow-sm ${project.color.includes('text-white') ? 'bg-white/10 text-white backdrop-blur-md border border-white/10' : 'bg-black/5 text-black border border-black/5'}`}>
                    Click to explore →
                  </span>
                )}
              </div>

              {/* Graphic Placeholders & Videos */}
              
              {/* Abstract Full / Pixel Art - Nice curved shape hugging the corner */}
              {(project.imageLayout === 'full' || project.imageLayout === 'pixel-art') && (
                <div className="absolute -bottom-10 -right-10 w-[85%] h-[85%] bg-black opacity-[0.03] rounded-tl-[3rem] transform group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-700 ease-out z-0" />
              )}

              {/* Terminal Frame - Anchored strictly to the bottom right and bleeding off */}
              {project.imageLayout === 'terminal' && (
                <div className="absolute -bottom-16 -right-12 md:-bottom-20 md:-right-16 w-[360px] h-[260px] md:w-[480px] md:h-[340px] bg-black border-[2px] md:border-[4px] border-[#222] rounded-xl md:rounded-2xl shadow-2xl transform group-hover:-translate-y-6 group-hover:-translate-x-6 transition-transform duration-700 ease-out flex flex-col overflow-hidden z-10">
                  {/* MacOS style window bar */}
                  <div className="h-5 md:h-8 w-full bg-[#1A1A1A] flex items-center px-3 gap-1.5 md:gap-2 shrink-0 border-b border-white/10">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  {project.videoSrc ? (
                    <div className="flex-1 w-full bg-black relative">
                      <video 
                        src={project.videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 bg-black p-4 text-[#00FF41] font-mono text-[10px] md:text-xs leading-relaxed opacity-80">
                      guest@nawfal:~$ boot<br/>
                      Loading system modules...<br/>
                      [OK] Kernel init<br/>
                      [OK] UI loaded<br/>
                      guest@nawfal:~$ _
                    </div>
                  )}
                </div>
              )}
              
              {/* iPhone Mockup - Smaller, tucked tightly into the bottom right corner */}
              {project.imageLayout === 'mockup-iphone' && (
                <div className="absolute -bottom-16 -right-6 md:-bottom-20 md:-right-8 w-[140px] h-[303px] md:w-[160px] md:h-[346px] bg-black border-[5px] md:border-[6px] border-[#111] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl transform group-hover:-translate-y-6 transition-transform duration-700 ease-out z-10 overflow-hidden flex flex-col items-center justify-start pt-2 md:pt-3">
                  <div className="w-[92%] h-[97%] bg-[#1A1A1A] rounded-[1.6rem] md:rounded-[2rem] border border-white/5 shadow-inner flex flex-col items-center justify-center text-white/20 text-xs overflow-hidden relative">
                    {/* Dynamic Island Notch */}
                    <div className="absolute top-1.5 md:top-2 w-[35%] h-[12px] md:h-[14px] bg-black rounded-full z-20"></div>
                    {project.videoSrc ? (
                      <video src={project.videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : (
                      <span className="opacity-50">↓</span>
                    )}
                  </div>
                </div>
              )}
              
              {/* iPad Mockup - Anchored deep into the bottom right corner */}
              {project.imageLayout === 'mockup-ipad' && (
                <div className="absolute -bottom-24 -right-16 w-[300px] h-[430px] md:w-[360px] md:h-[510px] bg-[#111] border-[10px] md:border-[12px] border-[#111] rounded-[1.5rem] md:rounded-[2rem] shadow-2xl transform group-hover:-translate-y-12 transition-transform duration-700 ease-out z-10 overflow-hidden flex items-center justify-center">
                  <div className="w-[96%] h-[97%] bg-[#1A1A1A] rounded-[1rem] md:rounded-[1.2rem] border border-white/5 shadow-inner flex flex-col items-center justify-center text-white/20 text-xs overflow-hidden">
                    {project.videoSrc ? (
                      <video src={project.videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : (
                      <span className="opacity-50">↓</span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Live Embed Modal */}
      <AnimatePresence>
        {selectedProject && selectedProject.liveLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/40 backdrop-blur-3xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-7xl h-full max-h-[90vh] bg-[#111]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1A1A1A]/50 backdrop-blur-md z-10 shrink-0">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    {selectedProject.title}
                  </h3>
                  {selectedProject.technologies && (
                    <div className="flex items-center mt-0.5">
                      <span className="text-[13px] font-medium text-white/50" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                        {selectedProject.technologies}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <a 
                    href={selectedProject.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs sm:text-sm font-bold rounded-full transition-colors hidden sm:inline-block"
                  >
                    Open in New Tab ↗
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              {/* Modal Iframe */}
              <div className="flex-1 w-full bg-[#0A0A0A] relative overflow-hidden">
                <iframe 
                  src={selectedProject.liveLink}
                  className="absolute inset-0 w-full h-full border-none"
                  loading="lazy"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

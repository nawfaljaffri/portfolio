'use client'

import React, { useState } from 'react'
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
}

const projects: Project[] = [
  {
    id: '1',
    title: 'School Bus Tracker',
    category: 'Map Integration',
    description: 'Traffic control & parent booking system to track children securely on their school routes.',
    color: 'bg-blue-50',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    imageLayout: 'full'
  },
  {
    id: '2',
    title: 'Language Learner',
    category: 'iOS / iPadOS',
    description: 'Immersive language learning application built for dual-screen environments.',
    color: 'bg-green-50',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-2',
    imageLayout: 'mockup-ipad'
  },
  {
    id: '3',
    title: 'Social Questionnaire',
    category: 'Social App',
    description: 'Tinder-style card swipe mechanics for friends to ask deep questions and connect.',
    color: 'bg-yellow-50',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    imageLayout: 'mockup-iphone'
  },
  {
    id: '4',
    title: 'Finance Tracker',
    category: 'Fintech',
    description: 'Clean financial tracking and budgeting with a minimalist approach.',
    color: 'bg-purple-50',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    imageLayout: 'mockup-iphone'
  },
  {
    id: '5',
    title: '8-Bit Adventure',
    category: 'Game Dev',
    description: 'Custom pixel-art game exploring algorithmic logic and physics.',
    color: 'bg-red-50',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    imageLayout: 'pixel-art'
  },
  {
    id: '6',
    title: 'CRT Terminal OS',
    category: 'Web Dev',
    description: 'Fully functional retro operating system built in React with interactive command line mechanics.',
    color: 'bg-orange-50 text-[#111]',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    imageLayout: 'terminal',
    videoSrc: '/projects/crtos.mp4',
    liveLink: 'https://crt-terminal-os-web.vercel.app'
  }
]

export default function BentoGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section id="projects" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 bg-white text-[#111]">
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
          <h3 className="text-4xl md:text-6xl font-medium tracking-tight">Selected Works</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => project.liveLink && setSelectedProject(project)}
              className={`group relative overflow-hidden rounded-[2.5rem] p-8 flex flex-col justify-between ${project.color} ${project.colSpan} ${project.rowSpan} transition-shadow duration-500 hover:shadow-xl ${project.liveLink ? 'cursor-pointer' : ''}`}
            >
              {/* Text Content */}
              <div className="z-20 relative pr-4">
                <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2 block">
                  {project.category}
                </span>
                <h4 className="text-2xl font-bold tracking-tight mb-3">
                  {project.title}
                </h4>
                <p className="text-sm font-medium opacity-80 max-w-sm md:max-w-[60%]">
                  {project.description}
                </p>
                {project.liveLink && (
                  <span className="inline-block mt-4 text-xs font-bold bg-black/5 px-3 py-1.5 rounded-full transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                    Click to explore →
                  </span>
                )}
              </div>

              {/* Abstract Graphic Placeholder for Apps */}
              {(project.imageLayout === 'full' || project.imageLayout === 'pixel-art') && (
                <div className="absolute -bottom-10 -right-10 w-3/4 h-3/4 bg-black/5 rounded-tl-[3rem] transform group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-700 ease-out z-0" />
              )}

              {project.imageLayout === 'terminal' && (
                <div className="absolute -bottom-4 -right-4 w-64 h-48 bg-black border-[4px] border-gray-700 rounded-xl shadow-2xl transform group-hover:-translate-y-8 group-hover:-translate-x-4 transition-transform duration-700 ease-out flex flex-col overflow-hidden z-10">
                  <div className="h-6 w-full bg-gray-800 flex items-center px-2 gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
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
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 bg-black p-2 text-green-500 font-mono text-[8px] leading-tight opacity-80">
                      guest@nawfal:~$ boot<br/>
                      Loading system modules...<br/>
                      [OK] Kernel init<br/>
                      [OK] UI loaded<br/>
                      guest@nawfal:~$ _
                    </div>
                  )}
                </div>
              )}
              
              {project.imageLayout === 'mockup-iphone' && (
                <div className="absolute -bottom-24 right-8 w-40 h-80 bg-black border-[6px] border-black rounded-[2.5rem] shadow-lg transform group-hover:-translate-y-24 transition-transform duration-700 ease-out z-10 overflow-hidden flex flex-col items-center justify-start pt-4">
                  <div className="w-[90%] h-full bg-[#111] rounded-[2rem] border border-white/10 shadow-inner flex flex-col items-center justify-center text-white/20 text-xs overflow-hidden">
                    {project.videoSrc ? (
                      <video src={project.videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : '↓'}
                  </div>
                </div>
              )}
              
              {project.imageLayout === 'mockup-ipad' && (
                <div className="absolute -bottom-32 -right-10 w-72 h-96 bg-black border-[8px] border-black rounded-[1.5rem] shadow-lg transform group-hover:-translate-y-32 transition-transform duration-700 ease-out z-10 overflow-hidden flex items-center justify-center">
                  <div className="w-[95%] h-[95%] bg-[#111] rounded-[1rem] border border-white/10 shadow-inner flex flex-col items-center justify-center text-white/20 text-xs overflow-hidden">
                    {project.videoSrc ? (
                      <video src={project.videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : '↓'}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-sm z-10 shrink-0">
                <div>
                  <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-1">
                    {selectedProject.category}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <a 
                    href={selectedProject.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-black text-white text-xs sm:text-sm font-bold rounded-full hover:bg-black/80 transition-colors hidden sm:inline-block"
                  >
                    Open in New Tab
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-black rounded-full transition-colors font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              {/* Modal Iframe */}
              <div className="flex-1 w-full bg-gray-50 relative overflow-hidden">
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

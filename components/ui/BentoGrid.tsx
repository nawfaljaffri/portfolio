'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Project = {
  id: string
  title: string
  category: string
  description?: string
  color: string
  colSpan?: string
  rowSpan?: string
  imageLayout?: 'mockup-iphone' | 'mockup-ipad' | 'mockup-iphone-social' | 'full' | 'pixel-art' | 'terminal'
  liveLink?: string
  technologies?: string
  buttonText?: string
  videoSrc?: string
}

const projects: Project[] = [
  {
    id: '3',
    title: 'Social Questionnaire',
    category: 'Social App',
    color: 'bg-[#FAFAFA] text-[#111]',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    imageLayout: 'mockup-iphone-social',
    videoSrc: '/projects/cwjtappdemorec.webm',
    liveLink: 'https://cwjt.vercel.app/',
    technologies: 'Next.js, Tailwind, Framer Motion, Figma',
    buttonText: 'View App'
  },
  {
    id: '4',
    title: 'Finance Tracker',
    category: 'Fintech',
    color: 'bg-[#F5F5F5] text-[#111]',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    imageLayout: 'mockup-iphone',
    technologies: 'Figma',
    videoSrc: '/projects/breadappdemonew.webm',
    liveLink: 'https://embed.figma.com/proto/L48mT4cjZsnOk0pB4QQykT/Bread?node-id=15-237&starting-point-node-id=15%3A237&embed-host=share',
    buttonText: 'View Prototype'
  },
  {
    id: '1',
    title: 'School Bus Tracker',
    category: 'Map Integration',
    color: 'bg-[#FAFAFA] text-[#111]',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    imageLayout: 'mockup-iphone',
    technologies: 'Figma, Anti Gravity, Claude',
    liveLink: '/projects/masar-case-study.pdf',
    buttonText: 'View Case Study'
  },
  {
    id: '2',
    title: 'Language Learner',
    category: 'iOS / iPadOS',
    color: 'bg-[#F9F9F9] text-[#111]',
    colSpan: 'md:col-span-3',
    rowSpan: 'md:row-span-1',
    imageLayout: 'mockup-ipad',
    videoSrc: '/projects/JERN_RECORDING.webm',
    liveLink: 'https://jern-v2.vercel.app',
    technologies: 'Next.js, TypeScript, Tailwind, Framer Motion',
    buttonText: 'View App'
  },
  {
    id: '6',
    title: 'CRT Terminal OS',
    category: 'Web Dev',
    color: 'bg-[#F5F5F5] text-[#111]',
    colSpan: 'md:col-span-3',
    rowSpan: 'md:row-span-1',
    imageLayout: 'terminal',
    videoSrc: '/projects/crtos.webm',
    liveLink: 'https://crt-terminal-os-web.vercel.app',
    technologies: 'Next.js, Three.js, React Three Fiber, Framer Motion',
    buttonText: 'View Demo'
  }
]

export default function BentoGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const crtVideoRef = useRef<HTMLVideoElement>(null)

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

  useEffect(() => {
    if (crtVideoRef.current) {
      crtVideoRef.current.playbackRate = 0.75;
    }
  }, [])

  return (
    <>
      <section id="projects" className="w-full max-w-[1300px] mx-auto px-6 md:px-12 py-24 bg-white">
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111] mb-4">Selected Works</h3>
              <p className="max-w-md text-lg opacity-60">A showcase of software engineering, UI/UX design, and full-stack development projects.</p>
            </div>
          </div>
        </motion.div>

        {/* Increased row height to give items more breathing room */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[380px]">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => project.liveLink && setSelectedProject(project)}
              className={`group relative overflow-hidden isolate [clip-path:inset(0_0_0_0_round_2.5rem)] rounded-[2.5rem] p-8 flex flex-col justify-start ${project.color} ${project.colSpan} ${project.rowSpan} transition-all duration-500 hover:shadow-2xl ${project.liveLink ? 'cursor-pointer' : ''}`}
            >
              {/* Top Right Button */}
              {project.liveLink && (
                <div className="absolute top-8 right-8 z-40 pointer-events-none flex items-start">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:border-black ${project.color.includes('text-white') ? 'bg-white/10 text-white backdrop-blur-md border border-white/10 group-hover:bg-white group-hover:text-black group-hover:border-white' : 'bg-white text-black border border-gray-100'}`}>
                    {project.buttonText || 'View Project'}
                  </span>
                </div>
              )}

              {/* Text Content */}
              <div className="z-20 relative pointer-events-none flex flex-col items-start w-full md:w-[70%]">
                <h4 className="text-2xl font-bold tracking-tight mb-1">
                  {project.title}
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mt-1">
                  {project.technologies || project.category}
                </span>
              </div>

              {/* Graphic Placeholders & Videos */}
              <div className="absolute inset-0 z-0">
                {/* Subtle bottom glow behind mockups */}
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-white/20 blur-[60px] rounded-full pointer-events-none"></div>

                {/* CRT Terminal OS - Simple text mock */}
              </div>
              
              {/* Abstract Full / Pixel Art - Nice curved shape hugging the corner */}
              {(project.imageLayout === 'full' || project.imageLayout === 'pixel-art') && (
                <div className="absolute -bottom-8 -right-8 w-[85%] h-[85%] bg-black opacity-[0.03] rounded-tl-[3rem] transform group-hover:-translate-y-4 transition-transform duration-700 ease-out z-0" />
              )}


              
              {/* iPhone Mockup - Silver sleek frame for standard iPhone projects */}
              {project.imageLayout === 'mockup-iphone' && (
                <div className={`absolute top-[110px] md:top-[120px] left-1/2 -translate-x-1/2 w-[180px] h-[378px] md:w-[240px] md:h-[505px] bg-black border-[3px] md:border-[4px] ${project.color.includes('text-white') ? 'border-[#E5E5EA]' : 'border-[#18181B]'} rounded-[2rem] md:rounded-[2.5rem] shadow-2xl transform-gpu group-hover:-translate-y-6 transition-transform duration-700 ease-out z-10 flex items-center justify-center p-[2px] md:p-[3px]`}>
                  {/* Inner Screen */}
                  <div className="w-full h-full bg-[#1A1A1A] rounded-[1.8rem] md:rounded-[2.25rem] overflow-hidden relative border border-white/5 shadow-inner">
                    {/* Dynamic Island Notch */}
                    <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-[30%] h-[12px] md:h-[16px] bg-black rounded-full z-20 shadow-sm border border-white/5"></div>
                    {project.videoSrc ? (
                      <video src={project.videoSrc} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">↓</div>
                    )}
                  </div>
                </div>
              )}
              
              {/* iPhone Social Mockup - Exact 0.4838 aspect ratio, notchless, silver sleek frame */}
              {project.imageLayout === 'mockup-iphone-social' && (
                <div className={`absolute top-[110px] md:top-[120px] left-1/2 -translate-x-1/2 w-[180px] h-[360px] md:w-[250px] md:h-[500px] bg-black border-[3px] md:border-[4px] ${project.color.includes('text-white') ? 'border-[#E5E5EA]' : 'border-[#18181B]'} rounded-[2rem] md:rounded-[2.5rem] shadow-2xl transform-gpu group-hover:-translate-y-6 transition-transform duration-700 ease-out z-10 flex items-center justify-center p-[2px] md:p-[3px]`}>
                  {/* Inner Screen */}
                  <div className="w-full h-full bg-[#1A1A1A] rounded-[1.8rem] md:rounded-[2.25rem] overflow-hidden relative border border-white/5 shadow-inner">
                    {project.videoSrc ? (
                      <video src={project.videoSrc} autoPlay loop muted playsInline className="absolute -top-[2%] md:-top-[3%] left-0 w-full h-[102%] md:h-[103%] object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">↓</div>
                    )}
                  </div>
                </div>
              )}
              
              {/* iPad Mockup - Peaking from right, silver frame */}
              {project.imageLayout === 'mockup-ipad' && (
                <div className={`absolute top-[110px] md:top-[120px] -right-[80px] md:-right-[120px] w-[520px] h-[350px] md:w-[600px] md:h-[403px] bg-black border-[3px] md:border-[4px] ${project.color.includes('text-white') ? 'border-[#E5E5EA]' : 'border-[#18181B]'} rounded-[1.5rem] md:rounded-[2rem] shadow-2xl transform-gpu group-hover:-translate-y-6 transition-transform duration-700 ease-out z-10 flex items-center justify-center p-[8px] md:p-[11px]`}>
                  <div className="w-full h-full bg-[#1A1A1A] rounded-[0.8rem] md:rounded-[1rem] border border-white/5 shadow-inner flex flex-col items-center justify-center text-white/20 text-xs overflow-hidden relative">
                    {project.videoSrc ? (
                      <video src={project.videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : (
                      <span className="opacity-50">↓</span>
                    )}
                  </div>
                </div>
              )}

              {/* Terminal Window for OS/CLI projects */}
              {project.imageLayout === 'terminal' && (
                <div className="absolute top-[110px] md:top-[120px] -right-[40px] md:-right-[60px] w-[400px] h-[283px] md:w-[540px] md:h-[382px] bg-black border-[2px] md:border-[4px] border-[#222] rounded-xl md:rounded-2xl shadow-2xl transform group-hover:-translate-y-6 transition-transform duration-700 ease-out flex flex-col overflow-hidden z-10">
                  {/* MacOS style window bar */}
                  <div className="h-5 md:h-8 w-full bg-[#1A1A1A] flex items-center px-3 gap-1.5 md:gap-2 shrink-0 border-b border-white/10">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  {project.videoSrc ? (
                    <div className="flex-1 w-full bg-black relative">
                      <video 
                        ref={project.title === 'CRT Terminal OS' ? crtVideoRef : undefined}
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
                      [OK] Initializing core modules...<br/>
                      [OK] Loading UI components...<br/>
                      [OK] Establishing connection...<br/>
                      <span className="animate-pulse">_</span>
                    </div>
                  )}
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

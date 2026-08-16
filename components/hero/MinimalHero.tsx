'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

export default function MinimalHero() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  const wordAnim: Variants = {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] bg-white text-[#111] flex flex-col justify-between pt-8 md:pt-12">
      
      {/* Top Nav */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-start gap-8 md:gap-4 text-xs font-semibold uppercase tracking-widest z-20"
      >
        <div className="flex justify-between w-full md:w-auto">
          <span className="font-bold text-sm tracking-tight normal-case">Nawfal®</span>
          <span className="md:hidden opacity-50">DUBAI, UAE</span>
        </div>
        
        <div className="flex flex-col gap-2">
          <a href="/#projects" className="hover:opacity-50 transition-opacity cursor-pointer">Projects</a>
          <a href="/#experience" className="hover:opacity-50 transition-opacity cursor-pointer">Experience</a>
          <Link href="/archive" className="hover:opacity-50 transition-opacity cursor-pointer">Archive</Link>
          <a href="/#about" className="hover:opacity-50 transition-opacity cursor-pointer">About</a>
        </div>
        
        <div className="flex flex-col gap-2">
          <a href="mailto:nawfaljafri@gmail.com" className="hover:opacity-50 transition-opacity cursor-pointer">Contact</a>
          <a href="https://www.linkedin.com/in/nawfaljaffri/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity cursor-pointer">LinkedIn</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity cursor-pointer">Resume</a>
        </div>
        
        <div className="hidden md:flex flex-col gap-2 text-right">
          <span className="opacity-50">DUBAI, UAE</span>
        </div>
      </motion.nav>

      {/* Massive Bottom Typography (Left Aligned, Equal Padding) & Scroll Indicator */}
      <div className="w-full flex justify-between items-end pb-6 md:pb-12 z-20 px-6 md:px-12 overflow-hidden">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="font-black text-[#111] leading-none tracking-tighter flex flex-wrap gap-x-4 md:gap-x-8"
          style={{ fontSize: 'clamp(4rem, 12vw, 15rem)' }}
        >
          <div className="overflow-hidden pb-2 pr-2 md:pr-4">
            <motion.span 
              variants={wordAnim}
              className="inline-block will-change-transform"
            >
              Nawfal
            </motion.span>
          </div>
          <div className="overflow-hidden pb-2 pr-2 md:pr-4">
            <motion.span 
              variants={wordAnim}
              className="inline-block will-change-transform"
            >
              Jaffri
            </motion.span>
          </div>
        </motion.div>

        {/* Subtle Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="hidden md:flex flex-col items-center gap-4 mb-2 cursor-pointer group"
          onClick={() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-[2px] h-20 bg-black/10 overflow-hidden relative rounded-full">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-black rounded-full"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-80 group-hover:opacity-100 transition-opacity" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        </motion.div>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ScrollHighlightText from '../typography/ScrollHighlightText'

export default function AboutSection() {
  return (
    <section id="about" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 bg-white text-[#111]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-xs font-bold uppercase tracking-widest border-t border-gray-200 pt-4 mb-4 text-gray-400">
          About Me
        </h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-12 lg:gap-24">
        
        {/* Massive Text (Left Side) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-7 flex flex-col gap-6 lg:gap-8"
        >
          <ScrollHighlightText 
            text="Hi, I'm Nawfal Jaffri. A student at University Of Birmingham Dubai studying Artificial Intelligence with Computer Science."
            className="text-4xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.2]"
          />
          <p className="text-lg md:text-lg lg:text-xl font-medium opacity-60 max-w-2xl leading-relaxed">
            I have a wide range of skillsets such as brand development, events management, marketing, graphic, UI and UX design.
          </p>
        </motion.div>

        {/* Right: Profile Picture Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-5 flex justify-center md:justify-end mt-8 md:mt-0"
        >
          <div className="w-full max-w-sm aspect-[3/4] bg-gray-100 rounded-[2rem] overflow-hidden shadow-2xl relative">
            <img 
              src="/profile.jpg" 
              alt="Nawfal Jaffri" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center -z-10">
              <span className="text-xs uppercase tracking-widest font-bold opacity-30 text-center px-4">
                IMAGE PENDING<br/><span className="lowercase font-normal opacity-50 text-[10px] mt-2 block">upload profile.jpg to public/</span>
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PhysicsSkillsView from './PhysicsSkillsView'

const skills = [
  "Python", "Java", "HTML", "CSS", "C++", "Assembly", "Three.js", "WebGL", "SQL",
  "Affinity", "Illustrator", "Canva", "DaVinci", "Figma", "Framer", "Blender", "Unity", "Autodesk"
]

export default function SkillsMarquee() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      // Treat iPads (up to 1366px) and phones as touch/physics devices
      setIsTouchDevice(window.innerWidth < 1367)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return (
    <section className="w-full py-12 md:py-24 overflow-hidden bg-white flex flex-col justify-center">
      <div className="mb-8 md:mb-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <h2 className="text-xs font-bold uppercase tracking-widest border-t border-gray-200 pt-4 mb-4 text-gray-400">
          Toolkit & Languages
        </h2>
      </div>
      
      {isTouchDevice ? (
        <PhysicsSkillsView skills={skills} />
      ) : (
        <div className="relative flex overflow-x-hidden w-full">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-4 px-4">
            {[...skills, ...skills, ...skills].map((skill, index) => (
              <span 
                key={index} 
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 rounded-full text-2xl font-medium text-[#111] cursor-default whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PhysicsSkillsView from './PhysicsSkillsView'

const skills = [
  "Python", "Java", "HTML", "CSS", "C++", "Assembly", "Three.js", "WebGL", "SQL",
  "Affinity", "Illustrator", "Canva", "DaVinci", "Figma", "Framer", "Blender", "Unity", "Autodesk"
]

export default function SkillsMarquee() {
  return (
    <section className="w-full overflow-hidden bg-white flex flex-col justify-center pt-8 md:pt-12">
      <div className="max-w-[1300px] mx-auto w-full px-6 md:px-12">
        <PhysicsSkillsView skills={skills} />
      </div>
    </section>
  )
}

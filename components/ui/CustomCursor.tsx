'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useCursor } from '@/context/CursorContext'

export default function CustomCursor() {
  const { variant, text } = useCursor()
  
  // Mouse position
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Smooth spring physics for following the cursor
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)
  
  // State for the hero loop text
  const [heroText, setHeroText] = useState<string | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Hero section animation loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined
    let isFirstTime = true
    let isRunning = true

    const runHeroLoop = async () => {
      if (!isRunning) return
      if (isFirstTime) {
        setHeroText('HI!')
        await new Promise(r => { timeoutId = setTimeout(r, 1000) })
        isFirstTime = false
      }

      while (isRunning) {
        setHeroText(null) // circle
        await new Promise(r => { timeoutId = setTimeout(r, 1000) })
        if (!isRunning) break
        
        setHeroText('SCROLL DOWN')
        await new Promise(r => { timeoutId = setTimeout(r, 2000) })
        if (!isRunning) break
        
        setHeroText(null) // circle
        await new Promise(r => { timeoutId = setTimeout(r, 2000) })
        if (!isRunning) break
        
        setHeroText('SCROLL DOWN')
        await new Promise(r => { timeoutId = setTimeout(r, 4000) })
      }
    }

    if (variant === 'hero') {
      runHeroLoop()
    } else {
      isRunning = false
      clearTimeout(timeoutId)
    }

    return () => {
      isRunning = false
      clearTimeout(timeoutId)
    }
  }, [variant])

  // Determine current active text based on variant
  let activeText: string | null = null
  if (variant === 'hero') activeText = heroText
  if (variant === 'hover') activeText = text

  // Variant configurations
  const variants = {
    default: {
      width: 16,
      height: 16,
      borderRadius: 16,
      backgroundColor: '#000',
    },
    hero: {
      width: activeText ? 'auto' : 16,
      height: activeText ? 32 : 16,
      borderRadius: 32,
      backgroundColor: '#000',
    },
    hover: {
      width: 'auto',
      height: 32,
      borderRadius: 32,
      backgroundColor: '#000',
    },
    'easter-egg': {
      width: 'auto',
      height: 32,
      borderRadius: 32,
      backgroundColor: '#000',
    }
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden hidden md:flex"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%'
      }}
      variants={variants}
      animate={variant === 'hero' ? 'hero' : variant}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <AnimatePresence mode="wait">
        {activeText && (
          <motion.span
            key={activeText}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
            className="text-white text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap px-4"
          >
            {activeText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

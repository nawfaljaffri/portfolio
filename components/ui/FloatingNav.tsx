'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  
  // This ref prevents the scroll spy from bouncing around while the page is smooth scrolling
  const isScrolling = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      // 1. Manage visibility
      if (window.scrollY > window.innerHeight * 0.2) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // If we are currently in an automated smooth-scroll (user clicked a nav link),
      // we freeze the scroll spy so it doesn't bounce around as it passes other sections.
      if (isScrolling.current) return;

      // 2. Manage Active State
      const sections = ['about', 'projects', 'experience', 'contact']
      let currentSection = ''

      // We look at a specific line on the screen (30% from the top).
      // Whichever section currently crosses this line is the active one.
      const triggerLine = window.innerHeight * 0.3 

      for (const id of sections) {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if the triggerLine falls BETWEEN the top and bottom of the element.
          // This perfectly solves the issue of small sections being swallowed by the next section.
          if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
            currentSection = id
          }
        }
      }

      // 3. Absolute bottom fallback
      // If the user has scrolled to the absolute bottom of the page, force 'contact'
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentSection = 'contact'
      }

      // 4. Top fallback
      if (!currentSection && window.scrollY < window.innerHeight * 0.3) {
        currentSection = 'home'
      }

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'About', href: '/#about', id: 'about' },
    { name: 'Projects', href: '/#projects', id: 'projects' }, 
    { name: 'Experience', href: '/#experience', id: 'experience' },
    { name: 'Contact', href: '/#contact', id: 'contact' }
  ]

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (window.location.pathname === '/') {
      e.preventDefault()
      
      // Freeze the scroll spy
      isScrolling.current = true
      
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setActiveSection('home')
      } else {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(id)
        }
      }

      // Unfreeze the scroll spy after the scrolling animation finishes (approx 800ms)
      setTimeout(() => {
        isScrolling.current = false
      }, 800)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-8 left-1/2 z-[100] flex items-center justify-center"
        >
          {/* 
            Bright & Frosty Base Track 
          */}
          <div 
            className="flex items-center p-1.5 rounded-full"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(32px) saturate(150%)',
              WebkitBackdropFilter: 'blur(32px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            }}
          >
            
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id

              return (
                <Link 
                  key={idx} 
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.id)}
                  className={`relative px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-wide rounded-full transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-black/50 hover:text-black/80'
                  }`}
                >
                  {/* 
                    Clean Frosty Droplet
                  */}
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.8)'
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

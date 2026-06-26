'use client'
import { useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Refresh ScrollTrigger after navigation
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.refresh()
      document.documentElement.style.removeProperty('overflow')
      document.body.style.removeProperty('overflow')
    }
  }, [pathname])

  return <>{children}</>
}

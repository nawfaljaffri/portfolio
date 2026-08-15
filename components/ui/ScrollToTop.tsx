'use client'

import { useEffect } from 'react'

export default function ScrollToTop() {
  // Ensure the page loads at the very top (fixing the scroll bug)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}

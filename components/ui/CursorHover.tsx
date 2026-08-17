'use client'

import React, { ReactNode } from 'react'
import { useCursor } from '@/context/CursorContext'

interface CursorHoverProps {
  children: ReactNode
  text: string
  className?: string
}

export default function CursorHover({ children, text, className = '' }: CursorHoverProps) {
  const { setCursor } = useCursor()

  return (
    <div
      className={className}
      onMouseEnter={() => setCursor('hover', text)}
      onMouseLeave={() => setCursor('default')}
    >
      {children}
    </div>
  )
}

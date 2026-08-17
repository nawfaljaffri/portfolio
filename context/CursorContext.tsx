'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type CursorVariant = 'default' | 'hero' | 'hover' | 'easter-egg'

interface CursorContextType {
  variant: CursorVariant
  text: string
  setCursor: (variant: CursorVariant, text?: string) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [text, setText] = useState('')

  const setCursor = (newVariant: CursorVariant, newText: string = '') => {
    setVariant(newVariant)
    setText(newText)
  }

  return (
    <CursorContext.Provider value={{ variant, text, setCursor }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}

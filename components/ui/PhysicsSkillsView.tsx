'use client'

import React, { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'

export default function PhysicsSkillsView({ skills }: { skills: string[] }) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const [elements, setElements] = useState<{ body: Matter.Body, id: string, skill: string }[]>([])
  const elementsMapRef = useRef(new Map<string, HTMLDivElement>())
  const pillBodiesRef = useRef<{ body: Matter.Body, id: string, skill: string }[]>([])
  const dragConstraintRef = useRef<Matter.Constraint | null>(null)

  useEffect(() => {
    if (!sceneRef.current) return

    const { Engine, Render, Runner, World, Bodies, Composite, Events, Body } = Matter

    const width = sceneRef.current.clientWidth
    const isMobile = window.innerWidth < 768
    const height = sceneRef.current.clientHeight || (isMobile ? 400 : 180)
    
    // Create engine
    const engine = Engine.create()
    engine.gravity.y = 1.5 // Stronger gravity for snappier falls
    engineRef.current = engine
    
    // Create walls - Extremely thick to prevent explosive tunneling
    const wallOptions = { isStatic: true, render: { visible: false } }
    const ground = Bodies.rectangle(width / 2, height + 500, width * 5, 1000, wallOptions)
    const ceiling = Bodies.rectangle(width / 2, -500, width * 5, 1000, wallOptions)
    const leftWall = Bodies.rectangle(-500, height / 2, 1000, height * 5, wallOptions)
    const rightWall = Bodies.rectangle(width + 500, height / 2, 1000, height * 5, wallOptions)
    
    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall])

    // Create pill bodies
    const pillBodies: { body: Matter.Body, id: string, skill: string }[] = []
    const shuffledSkills = [...skills].sort(() => 0.5 - Math.random())
    
    shuffledSkills.forEach((skill, i) => {
      // Estimate larger DOM sizes for desktop physics body match
      const estimatedWidth = skill.length * 12 + 64
      const estimatedHeight = 56
      
      // Distribute evenly to prevent overlapping explosions on mount
      const columns = Math.max(2, Math.floor(width / 120))
      const col = i % columns
      const row = Math.floor(i / columns)
      
      const x = col * (width / columns) + (width / columns / 2) + (Math.random() * 20 - 10)
      const y = row * 50 + 50 + (Math.random() * 20 - 10)
      
      const body = Bodies.rectangle(x, y, estimatedWidth, estimatedHeight, {
        chamfer: { radius: estimatedHeight / 2 },
        restitution: 0.2, // Low bounce
        friction: 0.1,
        frictionAir: 0.005, // Less floaty
        density: 0.002,
      })
      
      Body.setAngle(body, (Math.random() - 0.5) * 0.5)
      const id = `pill-${i}`
      pillBodies.push({ body, id, skill })
      Composite.add(engine.world, body)
    })
    
    pillBodiesRef.current = pillBodies
    setElements(pillBodies)

    // Handle dynamic resizing (e.g. device rotation or split screen)
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width
        const newHeight = entry.contentRect.height
        // Update horizontal wall positions
        Body.setPosition(rightWall, { x: newWidth + 500, y: newHeight / 2 })
        Body.setPosition(leftWall, { x: -500, y: newHeight / 2 })
        Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 500 })
        Body.setPosition(ceiling, { x: newWidth / 2, y: -500 })
        
        // Push any escaped pills back inside
        pillBodiesRef.current.forEach(({ body }) => {
          if (body.position.x > newWidth) {
            Body.setPosition(body, { x: newWidth - 50, y: body.position.y })
          }
        })
      }
    })
    resizeObserver.observe(sceneRef.current)

    // Sync DOM elements with Physics bodies
    Events.on(engine, 'afterUpdate', () => {
      pillBodies.forEach(({ body, id }) => {
        const el = elementsMapRef.current.get(id)
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`
        }
      })
    })

    // Start engine runner
    const runner = Runner.create()
    Runner.run(runner, engine)
    
    // Scroll velocity forces
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const velocity = currentScrollY - lastScrollY
      lastScrollY = currentScrollY
      
      // If we scroll quickly, apply a force to all bodies
      if (Math.abs(velocity) > 2) {
        // Always fly UP when scrolling fast in either direction, simulating a rollercoaster lift
        const forceMagnitude = -Math.abs(velocity) * 0.0008
        
        pillBodies.forEach(({ body }) => {
          Body.applyForce(body, body.position, { 
            x: (Math.random() - 0.5) * 0.002, 
            y: forceMagnitude 
          })
        })
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      Runner.stop(runner)
      Engine.clear(engine)
    }
  }, [skills])

  // Custom Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    
    if (!engineRef.current) return
    const bodyObj = pillBodiesRef.current.find(b => b.id === id)
    if (!bodyObj) return

    const { Constraint, Composite } = Matter
    
    const rect = sceneRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Create a spring constraint from the pointer to the body
    const constraint = Constraint.create({
      pointA: { x, y },
      bodyB: bodyObj.body,
      pointB: { x: 0, y: 0 },
      stiffness: 0.05,
      damping: 0.1,
      render: { visible: false }
    })
    
    Composite.add(engineRef.current.world, constraint)
    dragConstraintRef.current = constraint
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragConstraintRef.current && sceneRef.current) {
      const rect = sceneRef.current.getBoundingClientRect()
      dragConstraintRef.current.pointA = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId)
    
    if (dragConstraintRef.current && engineRef.current) {
      Matter.Composite.remove(engineRef.current.world, dragConstraintRef.current)
      dragConstraintRef.current = null
    }
  }

  return (
    <div 
      ref={sceneRef} 
      className="relative w-full overflow-hidden bg-white h-[400px] md:h-[180px]" 
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {elements.map(({ id, skill }) => (
        <div
          key={id}
          ref={(el) => {
            if (el) elementsMapRef.current.set(id, el)
            else elementsMapRef.current.delete(id)
          }}
          onPointerDown={(e) => handlePointerDown(e, id)}
          className="absolute top-0 left-0 inline-flex items-center justify-center px-5 py-2.5 md:px-8 md:py-3.5 bg-gray-100 rounded-full text-sm md:text-lg font-bold text-[#111] cursor-grab active:cursor-grabbing select-none whitespace-nowrap"
          style={{ 
            willChange: 'transform',
            touchAction: 'none' // Prevents scrolling when dragging a pill
          }}
        >
          {skill}
        </div>
      ))}
    </div>
  )
}

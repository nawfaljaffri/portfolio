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
    const height = 400 // Fixed height for mobile view
    
    // Create engine
    const engine = Engine.create()
    engineRef.current = engine
    
    // Create walls
    const wallOptions = { isStatic: true, render: { visible: false } }
    // Add extra thickness to walls to prevent tunneling. Add ceiling to keep them contained.
    const ground = Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions)
    const ceiling = Bodies.rectangle(width / 2, -50, width * 2, 100, wallOptions)
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions)
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions)
    
    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall])

    // Create pill bodies
    const pillBodies: { body: Matter.Body, id: string, skill: string }[] = []
    
    // Scramble skills to drop them randomly
    const shuffledSkills = [...skills].sort(() => 0.5 - Math.random())
    
    shuffledSkills.forEach((skill, i) => {
      // Estimate width: ~10px per character + 48px padding
      const estimatedWidth = skill.length * 10 + 48
      const estimatedHeight = 44
      
      const x = Math.random() * (width - estimatedWidth) + estimatedWidth / 2
      // Spawn them randomly within the upper bounds of the container
      const y = Math.random() * (height / 2)
      
      const body = Bodies.rectangle(x, y, estimatedWidth, estimatedHeight, {
        chamfer: { radius: estimatedHeight / 2 },
        restitution: 0.2, // Low bounce (rigid plastic feel)
        friction: 0.1,
        frictionAir: 0.01,
        density: 0.002,
      })
      
      // Add random slight rotation
      Body.setAngle(body, (Math.random() - 0.5) * 0.5)
      
      const id = `pill-${i}`
      pillBodies.push({ body, id, skill })
      Composite.add(engine.world, body)
    })
    
    pillBodiesRef.current = pillBodies
    setElements(pillBodies)

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
        // Inertia: if we scroll down (positive velocity), the viewport moves down,
        // so objects in the viewport should fly UP (negative force).
        const forceMagnitude = -velocity * 0.0005
        
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
      className="relative w-full overflow-hidden bg-white" 
      style={{ height: '400px' }}
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
          className="absolute top-0 left-0 inline-flex items-center justify-center px-5 py-2.5 bg-gray-100 rounded-full text-sm font-bold text-[#111] cursor-grab active:cursor-grabbing select-none"
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

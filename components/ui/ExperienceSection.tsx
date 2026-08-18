'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const experience = [
  { 
    company: "Murtabit", 
    location: "Dubai, UAE", 
    roles: [
      { 
        title: "UI/UX Designer", 
        date: "07/2026–Present",
        description: [
          "Designed B-side merchant tools and C-side NFC payment flows for a comprehensive SoftPOS platform.",
          "Prototyped a dual-state POS/calculator interface optimized for rapid numeric entry and native bill splitting."
        ]
      }
    ] 
  },
  { 
    company: "rremm", 
    location: "Dubai, UAE", 
    roles: [
      { 
        title: "Brand Designer & Art Director", 
        date: "07/2026–Present",
        description: [
          "Directing the brand identity and editorial web design for high-profile fine art clients, including bespoke digital positioning for artists painting for the UAE Royal Family.",
          "Developing heritage-inspired luxury color systems, typography hierarchies, and editorial layout frameworks tailored for fine art exhibition and digital storytelling."
        ]
      }
    ] 
  },
  { 
    company: "Susty", 
    location: "Dubai, UAE", 
    roles: [
      { 
        title: "Application Content Developer", 
        date: "05/2025–Present",
        description: [
          "Developed 70+ interactive sustainability experiences (quizzes, stories, and gamification modules).",
          "Boosted new users by 53% and overall platform user engagement by 48%.",
          "Partnered with 40+ local brands and universities to align content with campaigns."
        ]
      }
    ] 
  },
  { 
    company: "AIESEC in UAE", 
    location: "Abu Dhabi", 
    roles: [
      { 
        title: "Marketing Local Vice President", 
        date: "05/2026–Present",
        description: [
          "Trained & Hosted multiple Workshops on Graphic Design, Branding, & Marketing",
          "Led & Created a scalable brand identity & design system for seamless handoff to future teams."
        ]
      }
    ] 
  },
  { 
    company: "University Of Birmingham Dubai", 
    location: "Dubai, UAE", 
    roles: [
      { 
        title: "President Lead, Google Developer's Group On Campus", 
        date: "06/2026–Present",
        description: [
          "Direct all organizational strategy, recruitment, & technical event planning for the chapter.",
          "Lead the creative direction for all assets, driving community engagement across campus."
        ]
      },
      { 
        title: "Founder & VP, Food and Health Society", 
        date: "09/2025–06/2026",
        description: [
          "Led debut campus event: sold 500+ tickets and generated 10,000+ AED in revenue.",
          "Managed all finance, marketing, design, and business development operations."
        ]
      },
      { 
        title: "Lead Graphic Designer, Student Association", 
        date: "09/2025–Present",
        description: [
          "Designed high-quality posters and managed social media marketing for all university events."
        ]
      }
    ] 
  },
  { 
    company: "Bread (Antler Startup)", 
    location: "Dubai, UAE", 
    roles: [
      { 
        title: "UI/UX Designer", 
        date: "03/2024–11/2024",
        description: [
          "Designed a gamified financial literacy application integrating interactive progress tracking to drive consumer retention.",
          "Prototyped high-fidelity fintech dashboards to translate complex transaction data into accessible user interfaces."
        ]
      }
    ] 
  },
  { 
    company: "Alyx Society", 
    location: "Dubai, UAE", 
    roles: [
      { 
        title: "Director of Event Management", 
        date: "10/2023–11/2024",
        description: [
          "Secured major partnerships with GITEX, Unipreneur Inc, and AIESEC in UAE.",
          "Directed logistics, finance, branding, and screened 50+ staff applicants for events."
        ]
      },
      { 
        title: "Media and Marketing Co-Head", 
        date: "04/2023–10/2023",
        description: [
          "Pitched Indus Hospital fundraising events specifically targeting cancer patients.",
          "Led brand design, driving 121k+ views, 450+ applications, and 40,000 AED in funding."
        ]
      }
    ] 
  },
  { 
    company: "Unipreneur Inc.", 
    location: "Dubai, UAE", 
    roles: [
      { 
        title: "Event Co-ordinator & Ambassador", 
        date: "10/2023–12/2024",
        description: [
          "Co-led management & Emceed the Logimotion'24 exhibition event at DWTC.",
          "Youth speaker at AIIC (GETEX '24) and MUN Roundtable Speaker during GITEX '23."
        ]
      }
    ] 
  },
  { 
    company: "QuixMun", 
    location: "Dubai, UAE", 
    roles: [
      { 
        title: "Head of Business Development", 
        date: "08/2023–06/2024",
        description: [
          "Developed brand USP, detailed rules of procedure, and departmental operations.",
          "Secured 800+ applications (435% above cap) and successfully raised 1,200 AED for charity."
        ]
      }
    ] 
  }
]

const ExperienceCard = ({ item }: { item: any }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div 
      className="w-full relative z-30 cursor-pointer group/card"
      onClick={() => {
        if (window.matchMedia("(max-width: 767px)").matches) {
          setIsFlipped(!isFlipped)
        }
      }}
      onMouseEnter={() => {
        if (window.matchMedia("(min-width: 768px)").matches) {
          setIsFlipped(true)
        }
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(min-width: 768px)").matches) {
          setIsFlipped(false)
        }
      }}
      style={{ perspective: 1000 }}
    >
      {/* Decoupled 2D Shadow Layer for buttery smooth Safari rendering */}
      <div className="absolute inset-0 rounded-[2rem] shadow-sm group-hover/card:shadow-xl transition-shadow duration-200 will-change-[box-shadow] pointer-events-none z-0" />

      <motion.div
        className="w-full relative grid z-10 will-change-transform"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div 
          className="w-full bg-white border border-gray-100 rounded-[2rem] p-6 flex flex-col group/front [grid-area:1/1]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="mb-4 shrink-0">
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-50 bg-black/5 px-2 py-1 rounded-sm">{item.location}</span>
            <h4 className="text-xl font-bold tracking-tight mt-2 leading-tight">{item.company}</h4>
          </div>
          
          <div className="flex flex-col gap-3 my-auto">
            {item.roles.map((role: any, roleIdx: number) => (
              <div key={roleIdx} className={`flex flex-col gap-1 ${roleIdx !== 0 ? 'pt-3 border-t border-black/5' : ''}`}>
                <p className="text-sm font-semibold opacity-90 leading-snug">{role.title}</p>
                <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">{role.date}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-auto pt-4 border-t border-gray-50 flex justify-end shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-30 group-hover/card:opacity-60 transition-opacity duration-200 flex items-center gap-1">
              <span className="md:hidden">Tap for Details</span>
              <span className="hidden md:inline">Hover for Details</span>
              <span className="text-[16px] ml-0.5">⟲</span>
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="w-full h-full bg-gray-50 border border-gray-200 rounded-[2rem] p-6 flex flex-col [grid-area:1/1]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h4 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-4 pb-4 border-b border-gray-200 shrink-0">
            Role Details
          </h4>
          <div className="flex flex-col gap-6">
            {item.roles.map((role: any, roleIdx: number) => (
              <div key={roleIdx}>
                 {item.roles.length > 1 && <h5 className="font-bold text-xs text-balance uppercase opacity-60 mb-2">{role.title}</h5>}
                 <ul className="list-disc pl-4 text-sm opacity-80 font-medium space-y-1 text-pretty">
                   {role.description ? role.description.map((point: string, i: number) => (
                     <li key={i}>{point}</li>
                   )) : <li>Details forthcoming.</li>}
                 </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 })

  return (
    <section id="experience" className="relative w-full pt-12 pb-24 md:py-24 bg-white text-[#111]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        
        <div className="mb-12 md:mb-24">
          <h2 className="text-xs font-bold uppercase tracking-widest border-t border-gray-200 pt-4 mb-4 text-gray-400">
            Professional Timeline
          </h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Experience</h3>
              <p className="max-w-md text-lg opacity-60">A timeline of my professional roles, internships, and creative positions.</p>
            </div>
          </div>
        </div>
        
        <div className="relative w-full" ref={containerRef}>
          
          {/* Desktop Central Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-3 bg-gray-200 -translate-x-1/2 rounded-full z-0" />
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-3 -translate-x-1/2 z-10 pointer-events-none">
            <motion.div 
              className="w-full h-full bg-black rounded-full origin-top will-change-transform"
              style={{ scaleY: smoothProgress }}
            />
          </div>

          {/* Mobile Left Line */}
          <div className="md:hidden absolute left-4 top-4 bottom-4 w-2 bg-gray-200 -translate-x-1/2 rounded-full z-0" />
          <div className="md:hidden absolute left-4 top-4 bottom-4 w-2 -translate-x-1/2 z-10 pointer-events-none">
            <motion.div 
              className="w-full h-full bg-black rounded-full origin-top will-change-transform"
              style={{ scaleY: smoothProgress }}
            />
          </div>

          {/* Mobile Layout (Standard 1 column) */}
          <div className="md:hidden flex flex-col gap-12 w-full pl-10 relative z-20">
            {experience.map((item, i) => (
              <div key={i} className="relative w-full group min-w-0">
                <div className="absolute top-12 -left-10 w-10 h-1 bg-gray-200 group-hover:bg-black transition-colors duration-200 ease-out z-0" />
                <div className="absolute top-12 -left-[20px] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-gray-300 group-hover:border-black group-hover:scale-125 transition-[transform,colors,border-color] duration-200 ease-out will-change-transform z-20" />
                <ExperienceCard item={item} />
              </div>
            ))}
          </div>

          {/* Desktop Layout (Masonry 2 column alternating) */}
          <div className="hidden md:flex flex-row gap-16 relative z-20 min-w-0">
            
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-12 min-w-0">
              {experience.map((item, i) => {
                if (i % 2 !== 0) return null
                return (
                  <div key={i} className="relative w-full group min-w-0">
                    <div className="absolute top-16 -right-8 w-8 h-1 bg-gray-200 group-hover:bg-black transition-colors duration-200 ease-out z-0" />
                    <div className="absolute top-16 -right-8 translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-[4px] border-gray-200 group-hover:border-black group-hover:scale-125 transition-[transform,colors,border-color] duration-200 ease-out will-change-transform z-20" />
                    <ExperienceCard item={item} />
                  </div>
                )
              })}
            </div>

            {/* Right Column (Staggered) */}
            <div className="flex-1 flex flex-col gap-12 pt-32 min-w-0">
              {experience.map((item, i) => {
                if (i % 2 === 0) return null
                return (
                  <div key={i} className="relative w-full group min-w-0">
                    <div className="absolute top-16 -left-8 w-8 h-1 bg-gray-200 group-hover:bg-black transition-colors duration-200 ease-out z-0" />
                    <div className="absolute top-16 -left-8 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-[4px] border-gray-200 group-hover:border-black group-hover:scale-125 transition-[transform,colors,border-color] duration-200 ease-out will-change-transform z-20" />
                    <ExperienceCard item={item} />
                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

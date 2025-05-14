"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface CrossedBannersProps {
  topText: string
  bottomText: string
  className?: string
}

export function CrossedBanners({ topText, bottomText, className = "" }: CrossedBannersProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Faster animation duration for mobile
  const animationDuration = isMobile ? 12 : 20

  return (
    <div className={`relative h-32 ${className}`}>
      {/* Top Banner - Beige */}
      <div
        className="absolute w-[150%] left-[-25%] overflow-hidden py-3 bg-[#ccb699] z-11"
        style={{
          transform: "rotate(-2deg)",
          zIndex: 11,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: animationDuration,
            ease: "linear",
            repeatType: "loop",
          }}
          className="whitespace-nowrap"
        >
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="inline-block mx-4 font-medium text-black">
                {topText}
              </span>
            ))}
        </motion.div>
      </div>

      {/* Bottom Banner - Dark */}
      <div
        className="absolute w-[150%] left-[-25%] overflow-hidden py-3 bg-[#222222] z-10"
        style={{
          transform: "rotate(2deg)",
          zIndex: 10,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: animationDuration,
            ease: "linear",
            repeatType: "loop",
          }}
          className="whitespace-nowrap"
        >
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="inline-block mx-4 font-medium text-white">
                {bottomText}
              </span>
            ))}
        </motion.div>
      </div>
    </div>
  )
}

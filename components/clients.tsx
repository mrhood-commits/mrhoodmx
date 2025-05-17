"use client"

import Image from "next/image"
import { useCountry } from "./country-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Clients() {
  const { language } = useCountry()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Detectar tamaño de pantalla para responsive
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // Lista actualizada de clientes con todas las imágenes
  const clients = [
    {
      name: "Sanborns",
      logo: "/images/sanborns.jpeg",
    },
    {
      name: "La Veinte Cantina",
      logo: "/images/laveinte.png",
    },
    {
      name: "Ruben's Hamburgers",
      logo: "/images/rubens.png",
    },
    {
      name: "Patagonia Parrilla de Campo",
      logo: "/images/patagonia.jpeg",
    },
    {
      name: "Buffalo Wild Wings",
      logo: "/images/buffalo.png",
    },
    {
      name: "Meta",
      logo: "/images/meta.jpeg",
    },
    {
      name: "Buena Barra",
      logo: "/images/buenabarra.png",
    },
    {
      name: "Comedor de Milagros",
      logo: "/images/comedor.jpeg",
    },
    {
      name: "Grupo Carolo",
      logo: "/images/grupocarolo.png",
    },
    // Nuevas imágenes añadidas
    {
      name: "Ilios Greek Estiatorio",
      logo: "/images/ilios.jpeg",
    },
    {
      name: "Porfirio's Restaurante",
      logo: "/images/porfirios.jpeg",
    },
    {
      name: "La Parrillita",
      logo: "/images/laparrillita.jpeg",
    },
    {
      name: "Cotorritos",
      logo: "/images/cotorritos.png",
    },
    {
      name: "Grupo Castellano",
      logo: "/images/grupocastellano.png",
    },
    {
      name: "Sushiitto",
      logo: "/images/sushiitto.jpeg",
    },
  ]

  // Ajustar número de items por slide según el tamaño de pantalla
  const getItemsPerSlide = () => {
    if (isMobile) return 3 // 3 imágenes por slide en móvil
    if (isTablet) return 3
    return 4 // Desktop
  }

  const itemsPerSlide = getItemsPerSlide()
  const totalSlides = Math.ceil(clients.length / itemsPerSlide)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }, [totalSlides])

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval)
  }, [autoplay, nextSlide])

  // Resetear el slide actual cuando cambia el número de items por slide
  useEffect(() => {
    setCurrentSlide(0)
  }, [itemsPerSlide])

  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  // Determinar el ancho de cada logo según el número de items por slide
  const getLogoWidth = () => {
    switch (itemsPerSlide) {
      case 3:
        return "w-1/3"
      case 4:
        return "w-1/4"
      default:
        return "w-1/3"
    }
  }

  return (
    <section id="clientes" className="py-20 bg-white dark:bg-[#1c1c1c]">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          {language === "es" ? "NUESTROS CLIENTES" : "OUR CLIENTS"}
        </motion.h2>

        <motion.div
          className="relative max-w-6xl mx-auto px-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex justify-center gap-2 md:gap-6">
                  {clients.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((client, index) => (
                    <motion.div
                      key={index}
                      className={`flex justify-center ${getLogoWidth()}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="h-20 md:h-24 w-full max-w-[120px] md:max-w-[160px] relative flex items-center justify-center filter grayscale hover:grayscale-0 transition-all duration-300">
                        <Image
                          src={client.logo || "/placeholder.svg"}
                          alt={client.name}
                          fill
                          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-[#2a2a2a]/80 hover:bg-white dark:hover:bg-[#333333] rounded-full p-2 shadow-md z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-[#cccccc]" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-[#2a2a2a]/80 hover:bg-white dark:hover:bg-[#333333] rounded-full p-2 shadow-md z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 dark:text-[#cccccc]" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? "w-6 bg-[#ccb699]" : "w-2 bg-gray-300 dark:bg-[#444444]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

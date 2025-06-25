"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface CityMarker {
  name: string
  nameEs: string
  x: number
  y: number
  whatsapp: string
  comingSoon?: boolean
  labelPosition?: "top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

interface MexicoMapProps {
  language: "es" | "en"
}

export function MexicoMap({ language }: MexicoMapProps) {
  const [activeCity, setActiveCity] = useState<string | null>(null)

  // Coordenadas actualizadas - Monterrey ya no es "coming soon"
  const cities: CityMarker[] = [
    {
      name: "Mexico City",
      nameEs: "Ciudad de México",
      x: 55.2,
      y: 68.9,
      whatsapp: "+525512991343",
      labelPosition: "top",
    },
    {
      name: "Playa del Carmen",
      nameEs: "Playa del Carmen",
      x: 95.4,
      y: 66,
      whatsapp: "+529982426454",
      labelPosition: "left",
    },
    {
      name: "Mérida",
      nameEs: "Mérida",
      x: 88.5,
      y: 60.1,
      whatsapp: "+529982426454",
      labelPosition: "left",
    },
    {
      name: "Tulum",
      nameEs: "Tulum",
      x: 94.3,
      y: 69.8,
      whatsapp: "+529982426454",
      labelPosition: "bottom",
    },
    {
      name: "Cancún",
      nameEs: "Cancún",
      x: 94.8,
      y: 59.4,
      whatsapp: "+529982426454",
      labelPosition: "top-left",
    },
    {
      name: "Monterrey",
      nameEs: "Monterrey",
      x: 55.2,
      y: 42,
      whatsapp: "+5218130852922", // Nuevo número de WhatsApp para Monterrey
      labelPosition: "top",
    },
  ]

  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/\+/g, "").replace(/\s/g, "")
  }

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${formatPhoneForWhatsApp(phone)}`, "_blank")
  }

  // Función para obtener la transformación CSS según la posición de la etiqueta
  const getLabelTransform = (
    position: "top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "bottom-left" | "bottom-right" = "top",
  ) => {
    switch (position) {
      case "top":
        return "translate(-50%, -130%)"
      case "right":
        return "translate(20%, -50%)"
      case "bottom":
        return "translate(-50%, 130%)"
      case "left":
        return "translate(-120%, -50%)"
      case "top-left":
        return "translate(-120%, -100%)"
      case "top-right":
        return "translate(20%, -100%)"
      case "bottom-left":
        return "translate(-120%, 50%)"
      case "bottom-right":
        return "translate(20%, 50%)"
      default:
        return "translate(-50%, -130%)"
    }
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] bg-white dark:bg-[#2a2a2a] rounded-xl shadow-md p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[#f8f8f8] dark:bg-[#333333] rounded-xl"></div>

      {/* Map Image */}
      <div className="relative w-full h-full">
        <Image
          src="/images/mexico-3d-map-clean.png"
          alt="Map of Mexico with service regions"
          fill
          style={{ objectFit: "contain" }}
          className="opacity-100 dark:brightness-90 dark:contrast-110"
          priority
        />

        {/* City Markers */}
        {cities.map((city) => (
          <div
            key={city.name}
            className="absolute"
            style={{
              left: `${city.x}%`,
              top: `${city.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
          >
            {/* City Label - Posición personalizada */}
            <div
              className={`absolute px-2 py-1 bg-white dark:bg-[#2a2a2a] rounded-md shadow-md text-xs md:text-sm font-medium whitespace-nowrap text-black dark:text-white`}
              style={{
                transform: getLabelTransform(city.labelPosition),
                minWidth: "max-content",
              }}
            >
              {language === "es" ? city.nameEs : city.name}
            </div>

            {/* City Marker */}
            <motion.div
              className="cursor-pointer"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              onHoverStart={() => setActiveCity(city.name)}
              onHoverEnd={() => setActiveCity(null)}
              onClick={() => openWhatsApp(city.whatsapp)}
            >
              <motion.div className="relative flex flex-col items-center">
                <motion.div
                  className={`w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#ccb699] ${
                    activeCity === city.name ? "ring-4 ring-[#ccb699]/30" : ""
                  } shadow-md`}
                  animate={{
                    backgroundColor: activeCity === city.name ? "#b39c7d" : "#ccb699",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Legend - Actualizada sin "próximamente" */}
      <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-[#2a2a2a]/90 p-2 rounded-md text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#ccb699] mr-2"></div>
          <span className="dark:text-white">{language === "es" ? "Ciudades activas" : "Active cities"}</span>
        </div>
      </div>
    </div>
  )
}

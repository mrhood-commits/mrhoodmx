"use client"

import { useCountry } from "./country-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"
import { CrossedBanners } from "./crossed-banners"
import { MexicoMap } from "./mexico-map"

export function Locations() {
  const { language } = useCountry()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/\+/g, "").replace(/\s/g, "")
  }

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${formatPhoneForWhatsApp(phone)}`, "_blank")
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#222222] relative overflow-hidden">
      {/* Crossed Banners - Texto actualizado */}
      <CrossedBanners
        topText="Nueva apertura en Monterrey"
        bottomText="Nueva apertura en Playa del Carmen - Mérida - Tulum - Cancún"
        className="mb-16"
      />

      <div className="container mx-auto px-4 pt-8">
        <motion.div
          ref={ref}
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Smaller "PRESENTES EN" Design */}
          <motion.div
            className="text-center mb-16 relative"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-300 dark:bg-gray-700 transform -translate-y-1/2"></div>
            <div className="inline-block relative bg-gray-50 dark:bg-[#222222] px-8">
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
                  {language === "es" ? "PRESENTES EN" : "PRESENT IN"}
                </h2>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#ccb699]"></div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Mexico Map */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MexicoMap language={language} />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              {language === "es"
                ? "Haz clic en una ciudad para contactarnos por WhatsApp"
                : "Click on a city to contact us via WhatsApp"}
            </p>
          </motion.div>

          {/* Request Quote Cards - Ahora con 3 tarjetas incluyendo Monterrey */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <motion.div
              className="bg-white dark:bg-[#2a2a2a] p-8 rounded-lg shadow-md border-t-4 border-[#ccb699] flex flex-col justify-between relative overflow-hidden group"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ccb699]/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-[#ccb699] mr-2" />
                  <h3 className="text-xl font-bold text-black dark:text-white">
                    {language === "es" ? "CIUDAD DE MÉXICO" : "MEXICO CITY"}
                  </h3>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => openWhatsApp("+525512991343")}
                  className="bg-black hover:bg-gray-800 dark:bg-[#333333] dark:hover:bg-[#444444] text-white font-medium px-6 py-3 rounded-full w-full group-hover:bg-[#ccb699] transition-colors duration-300"
                >
                  {language === "es" ? "SOLICITAR PRESUPUESTO" : "REQUEST A QUOTE"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-[#2a2a2a] p-8 rounded-lg shadow-md border-t-4 border-[#ccb699] flex flex-col justify-between relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ccb699]/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-[#ccb699] mr-2" />
                  <h3 className="text-xl font-bold text-black dark:text-white">
                    {language === "es" ? "CARIBE MEXICANO" : "MEXICAN CARIBBEAN"}
                  </h3>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => openWhatsApp("+529982426454")}
                  className="bg-black hover:bg-gray-800 dark:bg-[#333333] dark:hover:bg-[#444444] text-white font-medium px-6 py-3 rounded-full w-full group-hover:bg-[#ccb699] transition-colors duration-300"
                >
                  {language === "es" ? "SOLICITAR PRESUPUESTO" : "REQUEST A QUOTE"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            {/* Nueva tarjeta para Monterrey */}
            <motion.div
              className="bg-white dark:bg-[#2a2a2a] p-8 rounded-lg shadow-md border-t-4 border-[#ccb699] flex flex-col justify-between relative overflow-hidden group"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ccb699]/10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-[#ccb699] mr-2" />
                  <h3 className="text-xl font-bold text-black dark:text-white">
                    {language === "es" ? "MONTERREY" : "MONTERREY"}
                  </h3>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => openWhatsApp("+5218130852922")}
                  className="bg-black hover:bg-gray-800 dark:bg-[#333333] dark:hover:bg-[#444444] text-white font-medium px-6 py-3 rounded-full w-full group-hover:bg-[#ccb699] transition-colors duration-300"
                >
                  {language === "es" ? "SOLICITAR PRESUPUESTO" : "REQUEST A QUOTE"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

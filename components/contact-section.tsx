"use client"
import { useCountry } from "./country-provider"
import { MapPin, Phone, Mail, ExternalLink, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function ContactSection() {
  const { language, contactInfo } = useCountry()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/\+/g, "").replace(/\s/g, "")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="contacto" className="py-20 bg-[#222222] dark:bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          {language === "es" ? "CONTACTO" : "CONTACT"}
        </motion.h2>

        <motion.div
          className="max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={item} className="bg-[#2a2a2a] dark:bg-[#222222] rounded-xl p-8 mb-10">
            <h3 className="text-2xl font-bold mb-8 border-b border-[#ccb699] pb-2 inline-block">
              {language === "es" ? "Información de Contacto" : "Contact Information"}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* CDMX Section */}
              <motion.div
                className="space-y-6"
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                <h4 className="text-xl font-semibold text-[#ccb699]">
                  {language === "es" ? "CIUDAD DE MÉXICO" : "MEXICO CITY"}
                </h4>

                <motion.div className="flex items-start" variants={item} whileHover={{ x: 5 }}>
                  <MapPin className="h-5 w-5 text-[#ccb699] mr-3 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-semibold mb-1 text-sm">{language === "es" ? "Dirección" : "Address"}</h5>
                    <a
                      href="https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 dark:text-[#cccccc] hover:text-[#ccb699] transition-colors text-sm leading-relaxed break-words"
                    >
                      Xola 154 Álamos - Ciudad de México y alrededores
                      <ExternalLink className="inline ml-1 h-3 w-3" />
                    </a>
                  </div>
                </motion.div>

                <motion.div className="flex items-start" variants={item} whileHover={{ x: 5 }}>
                  <Phone className="h-5 w-5 text-[#ccb699] mr-3 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-semibold mb-1 text-sm">{language === "es" ? "Teléfonos" : "Phones"}</h5>
                    <div className="space-y-1">
                      <a
                        href="https://wa.me/525552957168"
                        className="text-gray-300 dark:text-[#cccccc] hover:text-[#ccb699] transition-colors block text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +52 55 5295 7168
                      </a>
                      <a
                        href="https://wa.me/525512991343"
                        className="text-gray-300 dark:text-[#cccccc] hover:text-[#ccb699] transition-colors block text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +52 55 1299 1343
                      </a>
                      <a
                        href="https://wa.me/525565364142"
                        className="text-gray-300 dark:text-[#cccccc] hover:text-[#ccb699] transition-colors block text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +52 55 6536 4142
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="flex items-start" variants={item} whileHover={{ x: 5 }}>
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-semibold mb-1 text-sm">{language === "es" ? "URGENCIAS" : "EMERGENCIES"}</h5>
                    <a
                      href="https://wa.me/525565364142"
                      className="text-gray-300 dark:text-[#cccccc] hover:text-[#ccb699] transition-colors text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {language === "es" ? "las 24 hs. +52 55 6536 4142" : "24/7 +52 55 6536 4142"}
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              {/* Caribe Mexicano Section */}
              <motion.div
                className="space-y-6"
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                <h4 className="text-xl font-semibold text-[#ccb699]">
                  {language === "es" ? "CARIBE MEXICANO" : "MEXICAN CARIBBEAN"}
                </h4>

                <motion.div className="flex items-start" variants={item} whileHover={{ x: 5 }}>
                  <MapPin className="h-5 w-5 text-[#ccb699] mr-3 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-semibold mb-1 text-sm">{language === "es" ? "Dirección" : "Address"}</h5>
                    <a
                      href="https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 dark:text-[#cccccc] hover:text-[#ccb699] transition-colors text-sm leading-relaxed break-words"
                    >
                      Carretera Federal y Calle 23 Sur, Ejidal, 77710 Playa del Carmen, Q.R.
                      <ExternalLink className="inline ml-1 h-3 w-3" />
                    </a>
                    <p className="text-gray-400 dark:text-[#999999] mt-1 text-xs">
                      Playa del Carmen, Cancun, Tulum, Merida
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start" variants={item} whileHover={{ x: 5 }}>
                  <Phone className="h-5 w-5 text-[#ccb699] mr-3 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-semibold mb-1 text-sm">{language === "es" ? "Teléfono" : "Phone"}</h5>
                    <a
                      href="https://wa.me/529982426454"
                      className="text-gray-300 dark:text-[#cccccc] hover:text-[#ccb699] transition-colors text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +52 998 242 6454
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              {/* Monterrey Section */}
              <motion.div
                className="space-y-6"
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                <h4 className="text-xl font-semibold text-[#ccb699]">
                  {language === "es" ? "MONTERREY" : "MONTERREY"}
                </h4>

                <motion.div className="flex items-start" variants={item} whileHover={{ x: 5 }}>
                  <MapPin className="h-5 w-5 text-[#ccb699] mr-3 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-semibold mb-1 text-sm">{language === "es" ? "Dirección" : "Address"}</h5>
                    <a
                      href="https://maps.app.goo.gl/YourMonterreyMapLink"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 dark:text-[#cccccc] hover:text-[#ccb699] transition-colors text-sm leading-relaxed break-words"
                    >
                      Calle Sahuaro #326, fraccionamiento Cerrada De Cumbres, Sector Sahuaro, Monterrey, Nuevo León,
                      C.P. 64349
                      <ExternalLink className="inline ml-1 h-3 w-3" />
                    </a>
                  </div>
                </motion.div>

                <motion.div className="flex items-start" variants={item} whileHover={{ x: 5 }}>
                  <Phone className="h-5 w-5 text-[#ccb699] mr-3 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-semibold mb-1 text-sm">{language === "es" ? "Teléfono" : "Phone"}</h5>
                    <a
                      href="https://wa.me/5218130852922"
                      className="text-gray-300 dark:text-[#cccccc] hover:text-[#ccb699] transition-colors text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +52 1 81 3085 2922
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Email - Common for all */}
            <motion.div
              className="flex items-start mt-8 pt-6 border-t border-gray-600"
              variants={item}
              whileHover={{ x: 5 }}
            >
              <Mail className="h-5 w-5 text-[#ccb699] mr-3 mt-1 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h5 className="font-semibold mb-1 text-sm">{language === "es" ? "Correo Electrónico" : "Email"}</h5>
                <a
                  href="mailto:ventas@limpiezadecampanas.com.mx"
                  className="text-gray-300 dark:text-[#cccccc] hover:text-[#ccb699] transition-colors text-sm"
                >
                  ventas@limpiezadecampanas.com.mx
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

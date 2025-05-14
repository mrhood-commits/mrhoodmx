"use client"

import { useCountry } from "./country-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, Shield, Clock } from "lucide-react"

export function Stats() {
  const { language } = useCountry()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: <Award className="h-10 w-10 text-[#ccb699]" />,
      titleEs: "SERVICIO CERTIFICADO",
      titleEn: "CERTIFIED SERVICE",
      descriptionEs: "Contamos con certificaciones que avalan la calidad de nuestro trabajo",
      descriptionEn: "We have certifications that guarantee the quality of our work",
    },
    {
      icon: <Shield className="h-10 w-10 text-[#ccb699]" />,
      titleEs: "GARANTÍA DE CALIDAD",
      titleEn: "QUALITY GUARANTEE",
      descriptionEs: "Ofrecemos garantía en todos nuestros servicios de limpieza",
      descriptionEn: "We offer warranty on all our cleaning services",
    },
    {
      icon: <Clock className="h-10 w-10 text-[#ccb699]" />,
      titleEs: "ATENCIÓN INMEDIATA",
      titleEn: "IMMEDIATE ATTENTION",
      descriptionEs: "Respondemos rápidamente a todas las solicitudes de servicio",
      descriptionEn: "We respond quickly to all service requests",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 bg-[#222222] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-[#2a2a2a] rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center min-h-[200px] flex flex-col justify-center items-center"
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="mb-4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-[#ccb699]">
                {language === "es" ? feature.titleEs : feature.titleEn}
              </h3>
              <p className="text-sm text-gray-300">
                {language === "es" ? feature.descriptionEs : feature.descriptionEn}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

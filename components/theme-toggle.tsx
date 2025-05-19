"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  // Función para obtener el siguiente tema al hacer clic
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  // Obtener el icono correcto según el tema actual
  const getIcon = () => {
    if (!mounted) return null

    if (theme === "system") {
      return <Monitor className="h-5 w-5" />
    } else if (resolvedTheme === "dark" || theme === "dark") {
      return <Moon className="h-5 w-5" />
    } else {
      return <Sun className="h-5 w-5" />
    }
  }

  // Obtener el texto para el tooltip según el tema actual
  const getTooltipText = () => {
    if (!mounted) return ""

    if (theme === "system") {
      return "Usando preferencia del sistema"
    } else if (theme === "dark") {
      return "Cambiar a modo claro"
    } else {
      return "Cambiar a modo oscuro"
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-[#333333] text-gray-800 dark:text-gray-200 transition-colors"
        aria-label={getTooltipText()}
      >
        {getIcon()}
      </motion.button>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {getTooltipText()}
      </div>
    </div>
  )
}

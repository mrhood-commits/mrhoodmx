"use client"

import { useEffect } from "react"

export function ThemeScript() {
  useEffect(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem("theme")

    // Si hay un tema guardado, aplicarlo
    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }
    // Si no hay tema guardado, detectar preferencia del sistema
    else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", systemPrefersDark)
    }

    // Configurar un listener para cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      // Solo aplicar cambios si el tema está configurado como "system"
      if (localStorage.getItem("theme") === "system" || !localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", e.matches)
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return null
}

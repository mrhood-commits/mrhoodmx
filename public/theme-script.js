// Este script se ejecuta inmediatamente para evitar el parpadeo
;(() => {
  // Verificar si hay un tema guardado en localStorage
  const savedTheme = localStorage.getItem("theme")

  // Determinar el tema a aplicar
  let theme
  if (savedTheme === "dark" || savedTheme === "light") {
    theme = savedTheme
  } else {
    // Si no hay tema guardado o está en "system", detectar preferencia del sistema
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  // Aplicar el tema
  document.documentElement.classList.toggle("dark", theme === "dark")
})()

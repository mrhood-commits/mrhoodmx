import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MR HOOD - Limpieza Profesional de Campanas",
  description:
    "Profesionales en la limpieza de campanas, ductos y sistemas de extracción. Más de 30 años de experiencia avalan nuestros servicios.",
  icons: {
    icon: "/images/mrhoodlogo.png",
    apple: "/images/mrhoodlogo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/mrhoodlogo.png" sizes="any" />
        <meta name="color-scheme" content="light dark" />

        {/* Script para detectar preferencia del sistema y aplicar tema inicial */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Verificar si hay un tema guardado en localStorage
                const savedTheme = localStorage.getItem("theme");
                
                if (savedTheme === "dark" || savedTheme === "light") {
                  // Si hay un tema guardado, aplicarlo
                  document.documentElement.classList.toggle("dark", savedTheme === "dark");
                } else {
                  // Si no hay tema guardado, detectar preferencia del sistema
                  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  document.documentElement.classList.toggle("dark", systemPrefersDark);
                  
                  // Guardar la preferencia detectada
                  localStorage.setItem("theme", systemPrefersDark ? "dark" : "light");
                }
              })();
            `,
          }}
        />

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KZ9GB755');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16466325038" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16466325038');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KZ9GB755"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
          }}
        />
        {/* End Google Tag Manager (noscript) */}

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

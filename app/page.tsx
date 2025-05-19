import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Locations } from "@/components/locations"
import { WhyChooseUs } from "@/components/why-choose-us"
import { HowWeDoIt } from "@/components/how-we-do-it"
import { Clients } from "@/components/clients"
import { Franchise } from "@/components/franchise"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CountryProvider } from "@/components/country-provider"
import { ThemeScript } from "./theme-script"

export default function Home() {
  return (
    <CountryProvider>
      <ThemeScript />
      <div className="relative">
        <Header />
        <main>
          <Hero />
          <Locations />
          <WhyChooseUs />
          <HowWeDoIt />
          <Clients />
          <Franchise />
          <ContactSection />
        </main>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
      </div>
    </CountryProvider>
  )
}

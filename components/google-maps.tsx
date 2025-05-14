"use client"

import { useEffect, useRef, useState } from "react"

interface CityMarker {
  name: string
  nameEs: string
  lat: number
  lng: number
  whatsapp: string
  comingSoon?: boolean
}

interface GoogleMapsProps {
  language: "es" | "en"
}

// Declare google variable
declare global {
  interface Window {
    google: any
  }
}

export function GoogleMaps({ language }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [activeCity, setActiveCity] = useState<string | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [infoWindows, setInfoWindows] = useState<google.maps.InfoWindow[]>([])

  const cities: CityMarker[] = [
    {
      name: "Mexico City",
      nameEs: "Ciudad de México",
      lat: 19.4326,
      lng: -99.1332,
      whatsapp: "+525512991343",
    },
    {
      name: "Playa del Carmen",
      nameEs: "Playa del Carmen",
      lat: 20.6296,
      lng: -87.0739,
      whatsapp: "+529982426454",
    },
    {
      name: "Mérida",
      nameEs: "Mérida",
      lat: 20.9674,
      lng: -89.5926,
      whatsapp: "+529982426454",
    },
    {
      name: "Tulum",
      nameEs: "Tulum",
      lat: 20.2114,
      lng: -87.4654,
      whatsapp: "+529982426454",
    },
    {
      name: "Cancún",
      nameEs: "Cancún",
      lat: 21.1619,
      lng: -86.8515,
      whatsapp: "+529982426454",
    },
    {
      name: "Monterrey",
      nameEs: "Monterrey",
      lat: 25.6866,
      lng: -100.3161,
      whatsapp: "+525512991343",
      comingSoon: true,
    },
  ]

  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/\+/g, "").replace(/\s/g, "")
  }

  const openWhatsApp = (phone: string) => {
    window.open(`https://web.whatsapp.com/send?l=en&phone=${formatPhoneForWhatsApp(phone)}`, "_blank")
  }

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBnpWFz2KdchEsOOYI9YPCjJ5CtVQOXwgc&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      document.head.appendChild(script)
    }

    loadGoogleMapsScript()

    return () => {
      // Clean up markers and info windows
      if (markers.length) {
        markers.forEach((marker) => marker.setMap(null))
      }
      setMarkers([])
      setInfoWindows([])
    }
  }, [])

  // Initialize map
  const initializeMap = () => {
    if (!mapRef.current) return

    // Custom map style to match the website's design
    const mapStyles = [
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ color: "#f8f8f8" }],
      },
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#333333" }],
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{ color: "#e6e6e6" }],
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [{ color: "#cccccc" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#c9c9c9" }],
      },
    ]

    const mapOptions: google.maps.MapOptions = {
      center: { lat: 23.6345, lng: -102.5528 }, // Center of Mexico
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      styles: mapStyles,
    }

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
    setMap(newMap)

    // Add markers for each city
    const newMarkers: google.maps.Marker[] = []
    const newInfoWindows: google.maps.InfoWindow[] = []

    cities.forEach((city) => {
      // Create custom marker icon
      const markerIcon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: city.comingSoon ? "#999999" : "#ccb699",
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 10,
      }

      // Create marker
      const marker = new window.google.maps.Marker({
        position: { lat: city.lat, lng: city.lng },
        map: newMap,
        title: language === "es" ? city.nameEs : city.name,
        icon: markerIcon,
        animation: window.google.maps.Animation.DROP,
      })

      // Create info window content
      const contentString = `
        <div style="padding: 10px; text-align: center;">
          <h3 style="margin: 0; font-weight: bold; color: #000;">${language === "es" ? city.nameEs : city.name}</h3>
          ${city.comingSoon ? `<p style="margin: 5px 0 0; color: #f59e0b; font-size: 12px;">${language === "es" ? "(Próximamente)" : "(Coming Soon)"}</p>` : ""}
        </div>
      `

      const infoWindow = new window.google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200,
      })

      newInfoWindows.push(infoWindow)

      // Add event listeners
      marker.addListener("click", () => {
        if (!city.comingSoon) {
          openWhatsApp(city.whatsapp)
        }
      })

      marker.addListener("mouseover", () => {
        infoWindow.open(newMap, marker)
        setActiveCity(city.name)
      })

      marker.addListener("mouseout", () => {
        infoWindow.close()
        setActiveCity(null)
      })

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)
    setInfoWindows(newInfoWindows)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] bg-white rounded-xl shadow-md overflow-hidden">
      <div ref={mapRef} className="w-full h-full"></div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/90 p-2 rounded-md text-xs">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-[#ccb699] mr-2"></div>
          <span>{language === "es" ? "Ciudades activas" : "Active cities"}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
          <span>{language === "es" ? "Próximamente" : "Coming soon"}</span>
        </div>
      </div>
    </div>
  )
}

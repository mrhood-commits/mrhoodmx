// Extend Window interface to include gtag
interface Window {
  dataLayer: any[]
  gtag: (...args: any[]) => void
  YT: {
    Player: any
    PlayerState: {
      ENDED: number
      PLAYING: number
      PAUSED: number
      BUFFERING: number
      CUED: number
    }
  }
  onYouTubeIframeAPIReady: (() => void) | null
  google: any
}

// Google Maps types
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions)
      setCenter(latLng: LatLng | LatLngLiteral): void
      setZoom(zoom: number): void
      setOptions(options: MapOptions): void
      panTo(latLng: LatLng | LatLngLiteral): void
      panBy(x: number, y: number): void
      fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral): void
      getBounds(): LatLngBounds
      getCenter(): LatLng
      getDiv(): Element
      getZoom(): number
      setMapTypeId(mapTypeId: string): void
    }

    class Marker {
      constructor(opts?: MarkerOptions)
      setMap(map: Map | null): void
      setPosition(latLng: LatLng | LatLngLiteral): void
      setTitle(title: string): void
      setLabel(label: string | MarkerLabel): void
      setIcon(icon: string | Icon | Symbol): void
      getPosition(): LatLng
      getTitle(): string
      getLabel(): string | MarkerLabel
      getIcon(): string | Icon | Symbol
      addListener(eventName: string, handler: Function): MapsEventListener
      setAnimation(animation: any): void
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions)
      open(map: Map, anchor?: MVCObject): void
      close(): void
      setContent(content: string | Node): void
      setPosition(latLng: LatLng | LatLngLiteral): void
      getContent(): string | Node
      getPosition(): LatLng
      setZIndex(zIndex: number): void
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral
      zoom?: number
      mapTypeId?: string
      mapTypeControl?: boolean
      streetViewControl?: boolean
      fullscreenControl?: boolean
      zoomControl?: boolean
      styles?: any[]
    }

    interface MarkerOptions {
      position: LatLng | LatLngLiteral
      map?: Map
      title?: string
      label?: string | MarkerLabel
      icon?: string | Icon | Symbol
      draggable?: boolean
      animation?: any
    }

    interface InfoWindowOptions {
      content?: string | Node
      position?: LatLng | LatLngLiteral
      maxWidth?: number
      pixelOffset?: Size
      zIndex?: number
    }

    interface LatLng {
      lat(): number
      lng(): number
      toString(): string
    }

    interface LatLngLiteral {
      lat: number
      lng: number
    }

    interface LatLngBounds {
      contains(latLng: LatLng | LatLngLiteral): boolean
      equals(other: LatLngBounds | LatLngBoundsLiteral): boolean
      extend(point: LatLng | LatLngLiteral): LatLngBounds
      getCenter(): LatLng
      getNorthEast(): LatLng
      getSouthWest(): LatLng
      intersects(other: LatLngBounds | LatLngBoundsLiteral): boolean
      isEmpty(): boolean
      toJSON(): LatLngBoundsLiteral
      toSpan(): LatLng
      toString(): string
      union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds
    }

    interface LatLngBoundsLiteral {
      east: number
      north: number
      south: number
      west: number
    }

    interface Size {
      width: number
      height: number
      equals(other: Size): boolean
      toString(): string
    }

    interface Point {
      x: number
      y: number
      equals(other: Point): boolean
      toString(): string
    }

    interface Icon {
      url: string
      size?: Size
      scaledSize?: Size
      origin?: Point
      anchor?: Point
      labelOrigin?: Point
    }

    interface Symbol {
      path: string | number
      fillColor?: string
      fillOpacity?: number
      scale?: number
      strokeColor?: string
      strokeOpacity?: number
      strokeWeight?: number
    }

    interface MarkerLabel {
      text: string
      color?: string
      fontFamily?: string
      fontSize?: string
      fontWeight?: string
    }

    interface MVCObject {
      addListener(eventName: string, handler: Function): MapsEventListener
    }

    interface MapsEventListener {
      remove(): void
    }

    const Animation: {
      BOUNCE: number
      DROP: number
    }

    const SymbolPath: {
      BACKWARD_CLOSED_ARROW: number
      BACKWARD_OPEN_ARROW: number
      CIRCLE: number
      FORWARD_CLOSED_ARROW: number
      FORWARD_OPEN_ARROW: number
    }

    const MapTypeId: {
      HYBRID: string
      ROADMAP: string
      SATELLITE: string
      TERRAIN: string
    }
  }
}

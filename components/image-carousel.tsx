"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHoveringCenter, setIsHoveringCenter] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Array de imágenes de muestra (reemplazar con tus propias imágenes)
  const images = [
    "/placeholder.svg?height=600&width=800&text=Alberca 1",
    "/placeholder.svg?height=600&width=800&text=Alberca 2",
    "/placeholder.svg?height=600&width=800&text=Alberca 3",
    "/placeholder.svg?height=600&width=800&text=Alberca 4",
    "/placeholder.svg?height=600&width=800&text=Alberca 5",
  ]

  // Función para avanzar a la siguiente imagen
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Función para retroceder a la imagen anterior
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Iniciar/detener el intervalo automático
  useEffect(() => {
    // Iniciar el intervalo cuando el componente se monta
    intervalRef.current = setInterval(() => {
      nextImage()
    }, 5000) // Cambiar imagen cada 5 segundos

    // Limpiar el intervalo cuando el componente se desmonta
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Pausar el carrusel automático cuando el usuario interactúa con él
  const handleInteraction = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Reiniciar el intervalo después de la interacción
    intervalRef.current = setInterval(() => {
      nextImage()
    }, 5000)
  }

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
      {/* Imagen actual con efecto de zoom en el centro */}
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Alberca de ensueño ${currentIndex + 1}`}
          fill
          className={`object-cover transition-transform duration-300 ${isHoveringCenter ? "scale-110" : "scale-100"}`}
          priority
        />
      </div>

      {/* Overlay para las tres secciones interactivas */}
      <div className="absolute inset-0 flex">
        {/* Sección izquierda - Retroceder */}
        <div
          className="w-1/3 h-full cursor-pointer flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity"
          onClick={() => {
            prevImage()
            handleInteraction()
          }}
        >
          <div className="bg-white/80 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#1e3d59]"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
        </div>

        {/* Sección central - Zoom */}
        <div
          className="w-1/3 h-full cursor-pointer"
          onMouseEnter={() => setIsHoveringCenter(true)}
          onMouseLeave={() => setIsHoveringCenter(false)}
          onClick={handleInteraction}
        ></div>

        {/* Sección derecha - Avanzar */}
        <div
          className="w-1/3 h-full cursor-pointer flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity"
          onClick={() => {
            nextImage()
            handleInteraction()
          }}
        >
          <div className="bg-white/80 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#1e3d59]"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Indicadores de imagen actual */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
          ></div>
        ))}
      </div>
    </div>
  )
}


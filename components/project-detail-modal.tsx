"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ProjectDetailModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: number
    title: string
    description: string
    mainImage: string
    processImages: string[]
    details: {
      client?: string
      location?: string
      year?: string
      size?: string
      duration?: string
      features?: string[]
    }
  }
}

export default function ProjectDetailModal({ isOpen, onClose, project }: ProjectDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.processImages.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.processImages.length) % project.processImages.length)
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#1e3d59]">{project.title}</h2>
              <p className="text-gray-600 mt-1">{project.description}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imágenes del proceso */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1e3d59]">Proceso de Construcción</h3>
              
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden border">
                {project.processImages.length > 0 ? (
                  <>
                    <Image 
                      src={project.processImages[currentImageIndex] || "/placeholder.svg"}
                      alt={`Proceso de construcción ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Controles del carrusel */}
                    {project.processImages.length > 1 && (
                      <>
                        <button 
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-md"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="h-5 w-5 text-[#1e3d59]" />
                        </button>
                        <button 
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-md"
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-5 w-5 text-[#1e3d59]" />
                        </button>
                        
                        {/* Indicadores */}
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                          {project.processImages.map((_, index) => (
                            <div 
                              key={index} 
                              className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">No hay imágenes del proceso disponibles</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Detalles del proyecto */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1e3d59]">Detalles del Proyecto</h3>
              
              <div className="space-y-3">
                {project.details.client && (
                  <div className="grid grid-cols-3">
                    <span className="font-medium text-gray-700">Cliente:</span>
                    <span className="col-span-2">{project.details.client}</span>
                  </div>
                )}
                
                {project.details.location && (
                  <div className="grid grid-cols-3">
                    <span className="font-medium text-gray-700">Ubicación:</span>
                    <span className="col-span-2">{project.details.location}</span>
                  </div>
                )}
                
                {project.details.year && (
                  <div className="grid grid-cols-3">
                    <span className="font-medium text-gray-700">Año:</span>
                    <span className="col-span-2">{project.details.year}</span>
                  </div>
                )}
                
                {project.details.size && (
                  <div className="grid grid-cols-3">
                    <span className="font-medium text-gray-700">Tamaño:</span>
                    <span className="col-span-2">{project.details.size}</span>
                  </div>
                )}
                
                {project.details.duration && (
                  <div className="grid grid-cols-3">
                    <span className="font-medium text-gray-700">Duración:</span>
                    <span className="col-span-2">{project.details.duration}</span>
                  </div>
                )}
              </div>
              
              {project.details.features && project.details.features.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Características:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {project.details.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* Imagen principal grande */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#1e3d59] mb-3">Resultado Final</h3>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden border">
              <Image 
                src={project.mainImage || "/placeholder.svg"} 
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-[#1e3d59] text-[#1e3d59] hover:bg-[#1e3d59] hover:text-white"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

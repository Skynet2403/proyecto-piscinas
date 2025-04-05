"use client"

import { useState } from "react"
import Image from "next/image"
import { Phone, MessageCircle, Facebook, Instagram, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ImageCarousel from "@/components/image-carousel"
import ProjectDetailModal from "@/components/project-detail-modal"

// Datos de muestra para los proyectos
const projectsData = [
  {
    id: 1,
    title: "Alberca Residencial Moderna",
    description: "Diseño y construcción de alberca moderna con acabados de lujo para residencia en zona exclusiva.",
    mainImage: "/placeholder.svg?height=600&width=800&text=Proyecto 1",
    processImages: [
      "/placeholder.svg?height=600&width=800&text=Proceso 1.1",
      "/placeholder.svg?height=600&width=800&text=Proceso 1.2",
      "/placeholder.svg?height=600&width=800&text=Proceso 1.3",
    ],
    details: {
      client: "Familia Rodríguez",
      location: "Interlomas, CDMX",
      year: "2023",
      size: "8m x 4m",
      duration: "6 semanas",
      features: [
        "Iluminación LED subacuática",
        "Sistema de calefacción solar",
        "Cascada decorativa",
        "Deck de madera tratada",
        "Sistema automatizado de limpieza",
      ],
    },
  },
  {
    id: 2,
    title: "Alberca Infinity con Vista al Mar",
    description: "Espectacular alberca infinity con borde al infinito y vista panorámica al océano.",
    mainImage: "/placeholder.svg?height=600&width=800&text=Proyecto 2",
    processImages: [
      "/placeholder.svg?height=600&width=800&text=Proceso 2.1",
      "/placeholder.svg?height=600&width=800&text=Proceso 2.2",
      "/placeholder.svg?height=600&width=800&text=Proceso 2.3",
    ],
    details: {
      client: "Hotel Paraíso",
      location: "Puerto Vallarta, Jalisco",
      year: "2022",
      size: "15m x 6m",
      duration: "12 semanas",
      features: [
        "Borde infinito con vista al océano",
        "Revestimiento de piedra natural",
        "Bar acuático integrado",
        "Sistema de olas artificiales",
        "Iluminación RGB programable",
      ],
    },
  },
  {
    id: 3,
    title: "Alberca Familiar con Tobogán",
    description: "Alberca familiar con área recreativa, tobogán acuático y zona de chapoteo para niños.",
    mainImage: "/placeholder.svg?height=600&width=800&text=Proyecto 3",
    processImages: [
      "/placeholder.svg?height=600&width=800&text=Proceso 3.1",
      "/placeholder.svg?height=600&width=800&text=Proceso 3.2",
      "/placeholder.svg?height=600&width=800&text=Proceso 3.3",
    ],
    details: {
      client: "Familia Gómez",
      location: "Cuernavaca, Morelos",
      year: "2023",
      size: "10m x 5m",
      duration: "8 semanas",
      features: [
        "Tobogán acuático de 5m",
        "Área de chapoteo para niños",
        "Sistema de purificación avanzado",
        "Iluminación LED de colores",
        "Cubierta automática de seguridad",
      ],
    },
  },
  {
    id: 4,
    title: "Alberca Interior Climatizada",
    description: "Alberca interior climatizada con sistema de nado contracorriente y spa integrado.",
    mainImage: "/placeholder.svg?height=600&width=800&text=Proyecto 4",
    processImages: [
      "/placeholder.svg?height=600&width=800&text=Proceso 4.1",
      "/placeholder.svg?height=600&width=800&text=Proceso 4.2",
      "/placeholder.svg?height=600&width=800&text=Proceso 4.3",
    ],
    details: {
      client: "Residencial Los Pinos",
      location: "Monterrey, Nuevo León",
      year: "2022",
      size: "12m x 4m",
      duration: "10 semanas",
      features: [
        "Sistema de climatización avanzado",
        "Nado contracorriente",
        "Spa con hidromasaje integrado",
        "Deshumidificador automático",
        "Ventanas panorámicas",
      ],
    },
  },
  {
    id: 5,
    title: "Alberca Ecológica Natural",
    description: "Alberca ecológica con sistema de filtración natural mediante plantas acuáticas.",
    mainImage: "/placeholder.svg?height=600&width=800&text=Proyecto 5",
    processImages: [
      "/placeholder.svg?height=600&width=800&text=Proceso 5.1",
      "/placeholder.svg?height=600&width=800&text=Proceso 5.2",
      "/placeholder.svg?height=600&width=800&text=Proceso 5.3",
    ],
    details: {
      client: "Eco Resort Valle Verde",
      location: "Tepoztlán, Morelos",
      year: "2023",
      size: "20m x 8m",
      duration: "16 semanas",
      features: [
        "Filtración biológica con plantas",
        "Cero químicos",
        "Integración con el paisaje natural",
        "Zona de regeneración vegetal",
        "Ahorro de agua del 90% vs albercas tradicionales",
      ],
    },
  },
  {
    id: 6,
    title: "Alberca para Entrenamiento Olímpico",
    description: "Alberca semiolímpica para entrenamiento profesional con carriles reglamentarios.",
    mainImage: "/placeholder.svg?height=600&width=800&text=Proyecto 6",
    processImages: [
      "/placeholder.svg?height=600&width=800&text=Proceso 6.1",
      "/placeholder.svg?height=600&width=800&text=Proceso 6.2",
      "/placeholder.svg?height=600&width=800&text=Proceso 6.3",
    ],
    details: {
      client: "Club Deportivo Acuático",
      location: "Guadalajara, Jalisco",
      year: "2022",
      size: "25m x 12.5m",
      duration: "20 semanas",
      features: [
        "6 carriles reglamentarios",
        "Profundidad variable 1.4m - 2m",
        "Plataformas de salida profesionales",
        "Sistema de cronometraje electrónico",
        "Gradas para espectadores",
      ],
    },
  },
]

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProjectDetail = (project: (typeof projectsData)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectDetail = () => {
    setIsModalOpen(false)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1e3d59] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">Albercas Premium</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#inicio" className="hover:text-[#63c5da] transition-colors">
                Inicio
              </a>
              <a href="#galeria" className="hover:text-[#63c5da] transition-colors">
                Galería
              </a>
              <a href="#testimonios" className="hover:text-[#63c5da] transition-colors">
                Testimonios
              </a>
              <a href="#faq" className="hover:text-[#63c5da] transition-colors">
                FAQ
              </a>
              <a href="#contacto" className="hover:text-[#63c5da] transition-colors">
                Contacto
              </a>
            </nav>
            <Button className="md:hidden" variant="ghost">
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
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative bg-[#63c5da] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 text-white z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Albercas de Ensueño</h2>
              <p className="text-xl md:text-2xl mb-8">
                Diseñamos y construimos la alberca perfecta para transformar su espacio en un oasis de relajación y
                diversión.
              </p>
              <Button className="bg-[#2ec4b6] hover:bg-[#2ec4b6]/90 text-white px-8 py-6 text-lg">
                Solicitar Cotización
              </Button>
            </div>
            <div className="w-full md:w-1/2">
              <ImageCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-16 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e3d59]">Galería de Proyectos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => openProjectDetail(project)}
              >
                <Image
                  src={project.mainImage || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-semibold">{project.title}</h3>
                  <p className="text-white/80 text-sm mt-1 line-clamp-2">{project.description}</p>
                  <div className="mt-3 flex items-center text-white/90 text-sm">
                    <Search className="w-4 h-4 mr-1" />
                    <span>Ver detalles</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button className="bg-[#1e3d59] hover:bg-[#1e3d59]/90 text-white">Ver Más Proyectos</Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e3d59]">Testimonios de Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Rodríguez",
                location: "Ciudad de México",
                text: "Excelente servicio desde el diseño hasta la instalación. Nuestra alberca quedó perfecta y ahora es el centro de reuniones familiares.",
              },
              {
                name: "María González",
                location: "Guadalajara",
                text: "Profesionales en todo momento. Cumplieron con los tiempos establecidos y el resultado superó nuestras expectativas. Totalmente recomendados.",
              },
              {
                name: "Roberto Sánchez",
                location: "Monterrey",
                text: "La calidad de los materiales y acabados es impresionante. Después de 2 años, nuestra alberca sigue luciendo como nueva. Gran inversión.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#63c5da] flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e3d59]">Preguntas Frecuentes</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "¿Cuánto tiempo toma construir una alberca?",
                  answer:
                    "El tiempo de construcción varía según el tamaño y complejidad del proyecto, pero generalmente toma entre 4 a 8 semanas desde el inicio hasta que está lista para usar.",
                },
                {
                  question: "¿Qué tipos de albercas ofrecen?",
                  answer:
                    "Ofrecemos albercas de concreto, fibra de vidrio y vinilo. Cada tipo tiene sus ventajas y nuestros expertos pueden asesorarle sobre cuál es la mejor opción para sus necesidades.",
                },
                {
                  question: "¿Incluyen sistemas de mantenimiento?",
                  answer:
                    "Sí, ofrecemos sistemas automatizados de mantenimiento que incluyen filtración, cloración y control de pH. También ofrecemos contratos de mantenimiento periódico.",
                },
                {
                  question: "¿Cuál es la garantía de sus albercas?",
                  answer:
                    "Nuestras albercas tienen una garantía de 10 años en la estructura y 2 años en equipos e instalaciones. Además, ofrecemos servicio técnico permanente.",
                },
                {
                  question: "¿Trabajan en toda la República Mexicana?",
                  answer:
                    "Sí, tenemos capacidad para realizar proyectos en todo el país. Contamos con equipos locales en las principales ciudades.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-[#1e3d59] hover:text-[#63c5da]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contacto" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e3d59]">Contáctanos</h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#1e3d59]">Envíanos un mensaje</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <Input id="nombre" placeholder="Tu nombre" className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <Input id="telefono" placeholder="Tu teléfono" className="w-full" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Tu email" className="w-full" />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <Textarea id="mensaje" placeholder="¿En qué podemos ayudarte?" className="w-full min-h-[120px]" />
                </div>
                <Button className="w-full bg-[#2ec4b6] hover:bg-[#2ec4b6]/90 text-white">Enviar Mensaje</Button>
              </form>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#1e3d59]">Información de Contacto</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 mb-2">
                    Estamos disponibles para atenderte de lunes a viernes de 9:00 a 18:00 hrs y sábados de 9:00 a 13:00
                    hrs.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#2ec4b6] mr-3" />
                    <span className="text-gray-700">+52 (55) 1234-5678</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 text-[#2ec4b6] mr-3" />
                    <span className="text-gray-700">info@albercaspremium.com</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-3 text-[#1e3d59]">Síguenos en redes sociales</h4>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-[#63c5da] text-[#63c5da] hover:bg-[#63c5da] hover:text-white"
                    >
                      <Facebook className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-[#63c5da] text-[#63c5da] hover:bg-[#63c5da] hover:text-white"
                    >
                      <Instagram className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-[#63c5da] text-[#63c5da] hover:bg-[#63c5da] hover:text-white"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3d59] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Albercas Premium</h3>
              <p className="text-gray-300">
                Transformamos espacios en oasis de relajación y diversión con las mejores albercas del mercado.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#inicio" className="text-gray-300 hover:text-white transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="text-gray-300 hover:text-white transition-colors">
                    Galería
                  </a>
                </li>
                <li>
                  <a href="#testimonios" className="text-gray-300 hover:text-white transition-colors">
                    Testimonios
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-gray-300 hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horario de Atención</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Lunes a Viernes: 9:00 - 18:00</li>
                <li>Sábados: 9:00 - 13:00</li>
                <li>Domingos: Cerrado</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>© {new Date().getFullYear()} Albercas Premium. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5212345678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
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
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>

      {/* Modal para detalles del proyecto */}
      {selectedProject && (
        <ProjectDetailModal isOpen={isModalOpen} onClose={closeProjectDetail} project={selectedProject} />
      )}
    </main>
  )
}


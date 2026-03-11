"use client"

import React, { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"


export default function TestimonialsCarousel({testimonials}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="relative mx-auto w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6"> 
          {testimonials.map(testimonial =>(
          <div key={testimonial.id} className="text-white text-center z-10 w-full flex-shrink-0 p-6">
          <p>{testimonial.text}</p>
          <h3 className="font-semibold">{testimonial.name}</h3>
          </div> 
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-3 top-10/12 z-10 -translate-y-1/2 rounded-full border p-2 shadow text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-3 top-10/12 z-10 -translate-y-1/2 rounded-full border p-2 shadow text-white"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </section>
  )
}



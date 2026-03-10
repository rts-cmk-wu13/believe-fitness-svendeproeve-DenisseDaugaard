import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function TestimonialsCarousel({testimonials}) {
  return (
    <Carousel className="relative w-full p-8 text-center">
      <CarouselContent>
       {testimonials.map(testimonial =>(
       <CarouselItem key={testimonial.id} className="text-white z-10">
        <p>{testimonial.text}</p>
        <h3 className="font-semibold">{testimonial.name}</h3>
       </CarouselItem> 
       ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

// import * as React from "react"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/app/components/ui"

export default function TestimonialsCarousel({testimonials}) {
  return (
    // <Carousel className="relative w-full p-8 text-center">
    //   <CarouselContent>
    <>
       {testimonials.map(testimonial =>(
       <div key={testimonial.id} className="text-white z-10">
        <p>{testimonial.text}</p>
        <h3 className="font-semibold">{testimonial.name}</h3>
       </div> 
       ))}
    </>
    //   </CarouselContent>
    //   <CarouselPrevious />
    //   <CarouselNext />
    // </Carousel>
  )
}

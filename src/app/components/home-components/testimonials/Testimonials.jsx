import DataErrorMessage from "@/app/components/global-components/DataError";
import TestimonialsCarousel from "./Carousel";

export default function Testimonials({testimonials}) {

    //console.log('Here 👩🏻', testimonials)
  
    if (!testimonials || testimonials.length === 0) {
        return(
        <section className="relative mb-8 h-80" 
             style={{ backgroundImage: "url('/app-images/testimonials.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <DataErrorMessage
                title="No testimonials available"
                message="We apologize, but there are currently no testimonials to display. Please check back later for updates."
            />
        </section>
        )
    }

    return(
        <section className="relative mb-8 h-96" 
        style={{ backgroundImage: "url('/app-images/testimonials.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <h2 className="text-2xl text-white text-center p-4
         font-bold mb-4">A word from other Believers</h2>  
        <TestimonialsCarousel testimonials={testimonials}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </section>
    )
}
    
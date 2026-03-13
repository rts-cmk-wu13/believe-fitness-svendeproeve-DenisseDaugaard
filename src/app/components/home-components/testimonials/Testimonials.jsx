import DataErrorMessage from "@/app/components/global-components/DataError";
import TestimonialsCarousel from "./Carousel";

export default function Testimonials({testimonials}) {

    //console.log('Here 👩🏻', testimonials)
  
    if (!testimonials || testimonials.length === 0) {
        return(
        <section className="relative mb-8 h-70" 
             style={{ backgroundImage: "url('/app-images/testimonials.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <DataErrorMessage
                title="No testimonials available"
                message="We apologize, but there are currently no testimonials to display. Please check back later for updates."
            />
        </section>
        )
    }

    return(
        <section className="relative h-70" 
        style={{ backgroundImage: "url('/app-images/testimonials.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <h2 className="text-2xl text-white text-center p-4
         font-bold mb-2">A word from other Believers</h2>  
        <TestimonialsCarousel testimonials={testimonials}/>
        </section>
    )
}
    
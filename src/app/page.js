import Hero from "./components/home-components/Hero";
import NewsCard from "./components/home-components/news/NewsCard";
import NewsLetter from "./components/home-components/newsletter/NewsLetter";
import { getJSON } from "@/app/lib/dal/global-http"
import Testimonials from "./components/home-components/testimonials/Testimonials";
import Contact from "./components/home-components/contact/ContactForm"


export default async function Home() {
  const newsUrl = "http://localhost:4000/api/v1/news";
  const testimonialsUrl = "http://localhost:4000/api/v1/testimonials";
  
  const news = await getJSON(newsUrl);
  const testimonials = await getJSON(testimonialsUrl);

  
  return (
      <article>
       
        <Hero/>
        <NewsCard data={news?.data} />
        <NewsLetter />
        <Testimonials testimonials={testimonials?.data}/>
        <Contact/>

      </article>
  );
}

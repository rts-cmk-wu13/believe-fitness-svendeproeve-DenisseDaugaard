import Hero from "./components/home-components/Hero";
import NewsCard from "./components/home-components/news/NewsCard";
import NewsLetter from "./components/home-components/news-letters/NewsLetter";
import { getJSON } from "@/app/lib/dal/global-http";


export default async function Home() {
  const newsUrl = "http://localhost:4000/api/v1/news";
  const { ok, data } = await getJSON(newsUrl);
  
  return (
      <article>
       
        <Hero/>
        <NewsCard data={data} />
        <NewsLetter />

      </article>
  );
}

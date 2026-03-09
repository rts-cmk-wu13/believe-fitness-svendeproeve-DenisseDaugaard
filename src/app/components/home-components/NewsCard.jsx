import Image from "next/image"
export default function NewsCard({ data }) {
    if(!data){
        return{
            title: "No news available",
            description: "Please check back later for updates."
        }
    }
    return(
        <div>
        <Image
        href={data.url}
        src={data.urlToImage || "/app-images/welcome.jpg"}
        alt={data.title}
        />
        <h3 className="text-2xl">{data.title}</h3>
        <p>{data.description}</p>
        </div>
    )
}
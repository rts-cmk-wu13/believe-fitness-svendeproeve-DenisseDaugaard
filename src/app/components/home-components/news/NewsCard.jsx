import Image from "next/image"
export default function NewsCard({data}) {
    //console.log(data);
    
    if(!data || data.length === 0 || data === null || data === undefined) {
       return(
        <section className="p-4 my-8">
            <h1 className="text-[var(--primary-color)] text-2xl">
                No news available at the moment.
            </h1>
            <p className="text-1xl mt-2"> Please check back later.🦾</p>
       </section>
       )
    }

    return(
        <section className="p-6 mt-8">
    <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-2">News</h1>
   
        {data?.map(classItem => (
            <div className="mb-12" key={classItem.id}>
                {/* {console.log(classItem?.asset?.url)} */}
                <h3 className="title">{classItem.title}</h3>
                <Image
                width={600}
                height={400}
                src={classItem?.asset?.url || "/app-images/welcome.jpg"}
                alt={classItem.title}
                unoptimized // this allows loading images from localhost without optimization, which is useful during development
                loading="lazy"
                />
                <p>{classItem.text}</p>
             </div>
        ))}
        </section>
    )
}
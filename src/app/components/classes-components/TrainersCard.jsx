import Image from "next/image";
export default function TrainersCard({ item}) {
    return(
        <>
         <figure className="h-[100px] w-[100px] rounded-[2rem] mr-4 shadow-lg">
                      <Image
                        src={item.asset.url}
                        width={100}
                        height={100}
                        unoptimized
                        alt={item.trainerName}
                        className="image rounded-[1rem]"
                         loading="lazy"
                        placeholder="blur"
                        blurDataURL="/app-images/placeholder.jpg"
                      />
                    </figure>
                    <p className="font-semibold">{item.trainerName}</p>
        </>
    )
}
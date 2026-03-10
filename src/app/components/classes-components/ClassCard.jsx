import Image from "next/image";
import Link from "next/link";   

export default function ClassCard({classItem, style}){
    return(
       <>
        <figure className={style}>
            <Link href={`/popular/${classItem?.id}`} className="w-full h-full">
            <Image
             src={classItem?.asset?.url}
            width={200}
            height={200}
            unoptimized
            alt={classItem?.className}
            className="rounded-[1rem] image"/>
            </Link>
        </figure>
        <div 
        className="class_card_name h-[5rem] w-full text-xs">
        {classItem?.className}</div>
       </>
    )
}
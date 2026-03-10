import Image from "next/image";

export default function ClassCard({classItem, style}){
    return(
       <>
        <figure className={style}>
            <Image
             src={classItem?.asset?.url}
            width={200}
            height={200}
            unoptimized
            alt={classItem?.className}
            className="rounded-[1rem] image"/>
        </figure>
        <div 
        className="class_card_name h-[5rem] w-full text-xs">
        {classItem?.className}</div>
       </>
    )
}
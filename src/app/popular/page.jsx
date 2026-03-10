import { getJSON } from "../lib/dal/global-http"
import ClassCard from "@/app/popular/ClassCard"
import Image from "next/image"

export default async function Popular() {
    const url = "http://localhost:4000/api/v1/classes";

    const {ok, data } = await getJSON(url)
    console.log(data)
    const classes = data || []
    return(
        <article className="p-8">
            <span className="text-2xl">
               Popular Classes
            </span>
        <section className="relative mt-12">
            <figure className="w-full h-[350px] rounded-[1rem] overflow-hidden">
                <Image
                src={classes[3]?.asset?.url}
                width={200}
                height={200}
                unoptimized
                alt={classes[3]?.className}
                className="rounded-[1rem] image"/>
            </figure>
            <div 
            className="class_card_name h-[5rem] w-[80%] text-sm">
            {classes[3]?.className}</div>
        </section>
            <section className="mt-12">
            <h2 className="font-semibold my-4 text-2xl">Classes for you</h2>
            <ul className="class_list">
                {classes.map(classItem => (
                    <li key={classItem.id} className="relative rounded-[1rem]">
                    <ClassCard classItem={classItem} 
                    style="w-[200px] h-[200px]" 
                    font="text-xs"/>
                    </li>
                ))}
            </ul>
            </section>
        </article>
    )
}
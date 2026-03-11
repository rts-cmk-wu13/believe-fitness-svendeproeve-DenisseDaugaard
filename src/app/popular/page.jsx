import { getJSON } from "../lib/dal/global-http"
import ClassCard from "@/app/components/classes-components/ClassCard"
import Image from "next/image"
import Link from "next/link"

export default async function Popular() {
    const url = "http://localhost:4000/api/v1/classes";

    const {ok, data } = await getJSON(url)
    console.log(data)
    const classes = data || []

    if(!ok) {
        return(
            <article className="p-8">
                <span className="text-2xl">
                   Popular Classes
                </span>
                <p className="mt-4">Failed to load classes. Please try again later.</p>
            </article>
        )
    }
    return(
        <article className="p-8">
            <span className="text-2xl">
               Popular Classes
            </span>
        <section className="relative mt-12">
            <figure className="w-full h-[350px] rounded-[1rem] overflow-hidden">
               <Link href={`/popular/${classes[3]?.id}`} className="w-full h-full">
                <Image
                src={classes[3]?.asset?.url}
                width={200}
                height={200}
                unoptimized
                alt={classes[3]?.className}
                className="rounded-[1rem] image"/>
               </Link>
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
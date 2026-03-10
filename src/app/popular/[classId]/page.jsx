import Image from "next/image"
import { getJSON } from "../../lib/dal/global-http"
import Link from "next/link"
import { IoArrowBack } from "react-icons/io5";

export default async function PopularClass({params}) {
    const { classId } = await params
    const url = `http://localhost:4000/api/v1/classes/${classId}`;
    const {data} = await getJSON(url);
    const classData = data || {};
    console.log(classData);

    return(

        <article className="p-8">
            <div className="mt-2 absolute top-8 left-8 z-50">
                <Link href="/popular">
                    <IoArrowBack color="white" size={25} className="text-shadow-md"/>
                </Link>
            </div>
            <figure className="absolute top-0 left-0 h-[300px] w-full">
                <Image
                src={classData?.asset?.url}
                width={500}
                height={500}
                unoptimized
                alt={classData?.className}
                className="image"
                />
            </figure>
           <section className="absolute top-[150px]">
            <h1 className="font-bold text-4xl text-[var(--primary-color)]">{classData?.className}</h1>
            <p className="text-xl text-yellow-500">rating ⭐⭐⭐⭐ </p>
           </section>
           <section className="absolute top-[320px] left-0 p-6">
            <span className="font-semibold">{classData?.classDay} - {classData?.classTime}</span>
            <p>{classData?.classDescription}</p>
            <div className="py-4">
                <h3 className="py-2 font-bold">Trainer</h3>
                <section className="flex items-center justify-center gap-4 p-4">
                    <Image
                    src="/app-images/fallback-trainer.png"
                    width={100}
                    height={100}
                    alt={classData?.trainer?.trainerName}
                    />
                    <p>{classData?.trainer?.trainerName}</p>
                </section>
                <button className="btn w-full">SIGN UP</button>
            </div>
           </section>
        </article>

    )
}
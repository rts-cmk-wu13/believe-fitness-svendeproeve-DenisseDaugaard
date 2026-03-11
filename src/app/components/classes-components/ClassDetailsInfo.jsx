import Image from "next/image";
import Rating from "./Rating";

export default function ClassDetailsInfo({classData, averageRating, instructorData, isEnrolled, isLoggedIn}) {
    return(

    <>
     <section className="absolute top-[180px] text-shadow-lg/20">
            <h1 className="font-bold text-4xl text-yellow-300 ">{classData?.className}</h1>
            <Rating averageRating={averageRating} />
        </section>
        <section className="absolute top-[320px] left-0 p-6">
            <span className="font-semibold">{classData?.classDay} - {classData?.classTime}</span>
            <p>{classData?.classDescription}</p>
            <div className="py-4">
                <h3 className="py-2 font-bold">Trainer</h3>
                <section className="flex items-center justify-center gap-4 p-4">
                    <figure className="w-[100px] h-[100px]">
                        <Image
                        src={instructorData?.asset?.url}
                        unoptimized
                        loading="eager"
                        width={300}
                        height={400}
                        alt={instructorData?.trainerName}
                        className="rounded-lg image border shadow-lg rounded-lg"
                        />
                    </figure>
                    <p>{instructorData?.trainerName}</p>
                </section>
                {!isEnrolled ? (
                    isLoggedIn ? 
                    (
                        <button className="btn w-10/12 absolute top-[300px] left-1/2 -translate-x-1/2 bg-[#9AE630] text-white font-bold rounded-lg">
                            SIGN UP
                        </button>
                    ):null
                   
                ) : ( <button className="btn w-10/12 absolute top-[300px] left-1/2 -translate-x-1/2 bg-[#9AE630] text-white font-bold rounded-lg">
                            LEAVE
                        </button>)}
                
            </div>
        </section>
    </>
    )
}
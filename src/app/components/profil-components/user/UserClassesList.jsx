import Link from "next/link"

export default function UserClassesList({ userClasses }) {
    console.log(userClasses)

    if(!userClasses || userClasses.length === 0){
        return(
           <section className="text-black w-10/12 mx-auto flex flex-col items-center gap-4">
               <p className="">You are not enrolled in any classes yet.</p> 
               <span> Check out the most popular classes <Link href="/popular" className="underline text-purple-500">Here</Link></span>
           </section> 
        )
    }
    return(
        <>
        {userClasses?.map(classItem =>(
            <section  className="p-4 border border-gray-500 rounded-[1rem]" key={classItem.id}>
                    <div>
                        <h3 className="text-2xl font-semibold">{classItem.className}</h3>
                        <p className="text-gray-60 my-2">{classItem.classDay} - {classItem.classTime}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                        <Link href={`/popular/${classItem.id}`} className="btn">Show Class</Link>
                        <button className="btn">Leave</button>
                    </div>
            </section>
        ))}
        </>
    )
}
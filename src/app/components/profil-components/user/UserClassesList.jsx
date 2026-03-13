"use client"

import Link from "next/link"
import LeaveModal from "../../classes-components/leave/LeaveActivityModal"
import { useRef, useState } from "react";

export default function UserClassesList({ userClasses }) {
    //console.log(userClasses)

    if(!userClasses || userClasses.length === 0){
        return(
           <section className="text-black w-10/12 mx-auto flex flex-col items-center gap-4">
               <p className="">You are not enrolled in any classes yet.</p> 
               <span> Check out the most popular classes <Link href="/popular" className="underline text-purple-500">Here</Link></span>
           </section> 
        )
    }
     
    const [selectedActivity, setSelectedActivity] = useState(null);
    const modalRef = useRef(null);
    const openModal = (activity) => {
    setSelectedActivity(activity);
    modalRef.current?.showModal();
  };
  

    return(
        <>
        {userClasses?.map(classItem =>(
            <section key={classItem?.id} className="p-4 border border-gray-500 rounded-[1rem] mb-8">
                    <div>
                        <h3 className="text-2xl font-semibold">{classItem.className}</h3>
                        <p className="text-gray-60 my-2">{classItem.classDay} - {classItem.classTime}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                        <Link href={`/popular/${classItem.id}`} className="btn">Show Class</Link>
                        <button className="btn" onClick={() => openModal(classItem)}>Leave</button>
                    </div>
            </section>
        ))}

        <LeaveModal
        actId={selectedActivity?.id}
        modalRef={modalRef}
        title={"Leave Class"}
        message={`Are you sure you want to leave ${selectedActivity?.className}?`}
        style="w-10/12 mx-auto my-auto"/>
        </>
    )
}
"use client"

import Image from "next/image";
import Rating from "./Rating";
import SignUpButton from "./signup/SignUpBtn";
import LeaveModal from "./leave/LeaveActivityModal";
import { useState, useRef } from "react";


export default function ClassDetailsInfo({classData, averageRating, instructorData, isEnrolled, isLoggedIn}) {
    //console.log( 'is enrolled', isEnrolled);
    //console.log( 'is logged in', isLoggedIn);

       
    const [selectedActivity, setSelectedActivity] = useState(null);
    const modalRef = useRef(null);
    const openModal = (activity) => {
        setSelectedActivity(activity);
        modalRef.current?.showModal();
    };
      
    
    return(

    <>
     <section className="absolute top-[180px] text-shadow-lg/20">
            <h1 className="font-bold text-4xl text-yellow-300 ">{classData?.className}</h1>
            <Rating averageRating={averageRating} />
        </section>
        <section className="absolute top-[320px] left-0 p-6">
            <span className="font-semibold">{classData?.classDay} - {classData?.classTime}</span>
            <p className="mt-4">{classData?.classDescription}</p>
            <div className="py-4">
                <h3 className="py-2 font-bold">Trainer</h3>
                <section className="flex items-center gap-4 py-4">
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
                {!isEnrolled && isLoggedIn ? 
                (<SignUpButton classId={classData?.id} />) 
                 : 
                 (<button className="btn w-full" onClick={() => openModal(classData)}>Leave</button>)}
                
            </div>
        </section>
        
          <LeaveModal
                actId={selectedActivity?.id}
                modalRef={modalRef}
                title={"Leave Class"}
                message={`Are you sure you want to leave ${selectedActivity?.className}?`}
                style="w-10/12 mx-auto my-auto"/>
    </>
    )
}
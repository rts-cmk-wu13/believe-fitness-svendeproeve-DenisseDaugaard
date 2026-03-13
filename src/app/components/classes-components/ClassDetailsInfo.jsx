"use client"

import Rating from "./Rating";
import SignUpButton from "./signup/SignUpBtn";
import LeaveModal from "./leave/LeaveActivityModal";
import { useState, useRef } from "react";
import TrainersCard from "./TrainersCard";


export default function ClassDetailsInfo({classData, averageRating, instructorData, isEnrolled, isLoggedIn, isSameDay}) {
    //console.log( 'is enrolled', isEnrolled);
    //console.log( 'is logged in', isLoggedIn);
    //console.log('isSameDay', isSameDay);

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
                    <TrainersCard item={instructorData} />
                </section>

                {!isEnrolled && isLoggedIn && !isSameDay && (<SignUpButton classId={classData?.id} />) }
                 {isSameDay && !isEnrolled && isLoggedIn && 
                 (<p className="p-2 bg-yellow-200 rounded-lg shadow-md mt-4">
                    You are already enrolled in another class on the same day. If you want to enrole to {classData?.className}, you should leave the other class.</p>)}
                 {isEnrolled && isLoggedIn && (<button className="btn w-full" onClick={() => openModal(classData)}>Leave</button>)}
                 {!isLoggedIn && !isEnrolled && (null)}
                
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
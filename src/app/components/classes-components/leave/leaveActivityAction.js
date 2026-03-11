"use server"

import { deleteJSON } from "@/app/lib/dal/global-http";
import { cookies } from "next/headers";
import { getCookiesValues } from "@/app/lib/dal/cookiesStore";


export async function leaveClass(activityId) {
    const { token, userId, userClasses } = await getCookiesValues();
    
    const cookieStore = await cookies();

    if (!token || !userId) return {
        ok: false,
        data: null,
        text: "Manglende token eller bruger-id"
    };

    const url = `http://localhost:4000/api/v1/users/${userId}/classes/${activityId}`;
    const response = await deleteJSON(url, token);

    if(!response.ok) {
    console.log(activityId);
    console.log('this are the activities from the leave action',userClasses);
    
        return{
            ok: false,
            data: null,
            text: "There was a problem leaving the class, please try later +++"
        }
    }

        // console.log("User successfully deleted from activity");
        // //console.log("📜❌", response);

        // // this works because the cookie is an aray of ids, like [1,7]
        const updatedActivities = userClasses.filter(classItem => classItem.id !== activityId);
        // this will update the cookie with the new list of activities after deletion
         cookieStore.set("userClasses", JSON.stringify(updatedActivities));

         return{ 
             ok: true,
             data: null,
             text: "You have been successfully removed from the activity"
            }
            
                
    // returning something will prevent of my response being empty and causing an error 
    // in the frontend when trying to access response.ok, 
    // because if the response is empty, response.ok will be undefined 
    // and will throw an error when trying to access it.
}
import { contactScheme } from "@/app/lib/zodValidationSchemas/baseSchema";

import z from "zod";
import { postJSON } from "@/app/lib/dal/global-http";


export async function sendMessage(_, formData) {

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const url = "http://localhost:4000/api/v1/messages";

    //console.log(name, email,message);
    
    const result = contactScheme.safeParse({
        name,
        email,
        message,
    });

    if(!result.success){
        return{
        values:{name, email, message},
        errors:z.flattenError(result.error).fieldErrors, // errors from zod showed in the -> form client side/ browser.
        }
    }

    const response = await postJSON(url, 
        {   
            name: result.data.name,
            email: result.data.email ,
            message: result.data.message,
        });

        if(response.status === 404){
            return {
                values: { name:"", email: "", message: "" },
                serverMessage: { error:"An error ocurred while sending your message. Try again later"},
            };
        }

        if (!response.ok) {
            //console.log('❌', response);
            return {
                values: { name:"", email: "", message: "" },
                serverMessage: { error: ` ${response.text}` || "It was not possble to send your message. Try again later"},
            };
        }

        if(response.ok){
            //console.log('😁', response );
            // change to a toast notification or something else that is not an error message, since this is a success message.
             return {
                values: { name: "", email: "", message: "" },
                serverMessage: { success:"Thanks for your message. you will hear from us as soon as possible" },
            }; 
        }
        
        return response.data

}
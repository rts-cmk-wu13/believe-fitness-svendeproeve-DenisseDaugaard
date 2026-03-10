"use server"

import z from "zod";
import { getCookiesValues } from "@/app/lib/dal/cookiesStore";
import { postJSON } from "@/app/lib/dal/global-http";
import { cookies } from "next/headers";
import { newsLetterScheme } from "@/app/lib/zodValidationSchemas/baseSchema";

export async function signupNewsLetters(_, formData) {

    const newsLetterUrl = "http://localhost:4000/api/v1/newsletter";
    const email = formData.get("email");
    const cookiesStore = await cookies();
    const { newsLetters } = await getCookiesValues();
    //console.log("📧 Newsletter:", newsLetters);

    if(JSON.stringify(newsLetters).includes(email)){
        return {
            values: { email: "" },
            serverMessage: { error: "You are already subscribed to the newsletter." },
        };
    }

     const result = newsLetterScheme.safeParse({
            email,
        });

        if(!result.success){
            return{
                values:{email: ""},
                errors:z.flattenError(result.error).fieldErrors, // errors from zod showed in the -> form client side/ browser.
            }
        }
        //console.log(result);
        

       const response = await postJSON(newsLetterUrl, { email: result.data.email });

    //    if(response.status === 500){
    //        return{
    //            values: { email: "" },
    //            serverMessage: { error:"Resource not found. Please try again later." },
    //        }
    //    }

        if (!response.ok) {
            console.log('❌',response);
            return {
                values: { email: "" },
                serverMessage: { error:` ${response.text} ` || "Unable to sign up, please try again later" },
            };
        }
    
          
        const newsLettersEmails = newsLetters ? JSON.parse(newsLetters) : [];
        newsLettersEmails.push(result.data.email);
        cookiesStore.set("newsLetters", JSON.stringify(newsLettersEmails), { path: "/", maxAge: 60 * 60 * 24 * 365 }); // Expires in 1 year
        return {
            ok: true,
            values: { email: "" },
            serverMessage: { success:"Successfully signed up for the newsletter!" },
        }; 

}
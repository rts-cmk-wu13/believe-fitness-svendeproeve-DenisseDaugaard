"use server";

import { signUpSchema } from "@/app/lib/zodValidationSchemas/baseSchema";
import { postJSON } from "@/app/lib/dal/global-http";
import { z } from "zod";


export async function SignUpAction(_, formData) {
  const inputData = Object.fromEntries(formData.entries());
  //console.log(inputData, 'inputData');

  const url = "http://localhost:4000/api/v1/users";
  const values = {
    userFirstName: inputData.userFirstName ?? "",
    userLastName: inputData.userLastName ?? "",
    username: inputData.username ?? "",
    password: inputData.password ?? "",
    confirmPassword: inputData.confirmPassword ?? "",
  };
 
  if(values.password !== values.confirmPassword){
    return {
      values,
      errors: { confirmPassword: "Passwords do not match" },
    };
  }

  const result = signUpSchema.safeParse(inputData);

  if (!result.success) {
    console.log('validation failed ☠️', result.error);
      return {
          values,
          errors: z.flattenError(result.error).fieldErrors
        }; 
    }
    
    //remove confirmPassword from payload and add a role: "default" before sending to API
        const { confirmPassword, ...res } = result.data;
        console.log('☺️', res);

    const response = await postJSON(url, res);

       if(response.status === 404){ 
          return{
            values,
            serverResponse: { error: "Resource not found. Contact support." }
          }
       }  


      if (!response.ok) {
           //console.log('❌', response);
      return {
              values, 
              serverResponse: { error: response.text || "An error occurred while creating the user, please try again later." },
              };
      }
      
      return{
        values:{},
        serverResponse: { success: "You have signed up successfully!" }
      };

}
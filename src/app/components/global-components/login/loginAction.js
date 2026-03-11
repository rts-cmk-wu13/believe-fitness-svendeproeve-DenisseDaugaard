"use server"
import { z } from "zod"
import { postJSON } from "@/app/lib/dal/global-http"
import { loginSchema } from "@/app/lib/zodValidationSchemas/baseSchema"
import { redirect } from "next/navigation"
import { cookies } from "next/headers";
import { getUserById } from "@/app/lib/dal/users/getUserById"
import { getJSON } from "@/app/lib/dal/global-http"


export async function loginUser(_, formData) {

    const url = "http://localhost:4000/auth/token";
    
    const username = formData.get("username");
    const password = formData.get("password");
    const cookieStore = await cookies();
    
      
         const result = loginSchema.safeParse({
                username,
                password,
            });
    
            if(!result.success){
                return{
                    values:{username: "", password: ""},
                    errors:z.flattenError(result.error).fieldErrors, // erros from zod showed in the -> form client side/ browser.
                }
            }
            console.log(result); 
    
           const response = await postJSON(url, 
            { username: result.data.username, 
                password: result.data.password 
            });

            if(response.status === 404){
                return {
                    values: { username: "", password: "" },
                    serverMessage:{ error:"Resources not found. Contact administrator"},
                }
            }

            if(response.status === 401){
                return {
                    values: { username: "", password: "" },
                    serverMessage:{ error:"Wrong credentials, check your data and try again" || response.text},
                }
            }
           
           if(!response.ok){
            //console.log('❌', response);
               return {
                   values: { username: "", password: "" },
                  serverMessage:{ error: `${response.text}` || "Wrong credentials, check your data and try again" },
                };
            }

            console.log('📩', response.data);


            const { token, userId, role, validUntil } = response.data;
            
            cookieStore.set("token", token);
            cookieStore.set("userId", userId);
            cookieStore.set("expirationTime", validUntil); 
            
            if (role === "admin"){
                cookieStore.set("role", "Admin");
                const classesResponse = await getJSON("http://localhost:4000/api/v1/classes");

                    if(!classesResponse.ok){
                        return{
                            data: null,
                            serverMessage:{ error:"An error occurred while fetching classes. Try again later."},
                        }
                    }
                const classesData = await classesResponse.data;
                const classesIds = classesData.map(c => c.id);
                cookieStore.set("allClassesIds", JSON.stringify(classesIds) || []);
            }

            if (role === "default") cookieStore.set("role", "Member");
            
            const userData = await getUserById(`http://localhost:4000/api/v1/users/${userId}`);
            
            if(!userData.ok){
                return{
                    data: null,
                    serverMessage:{ error:"An error occurred while fetching user data. Try again later."},
                }
            }
            console.log(userData.data);
            
            cookieStore.set("firstname", userData.data.userFirstName);
            cookieStore.set("lastname", userData.data.userLastName);
            cookieStore.set("userClasses", JSON.stringify(userData?.data?.classes || []));


            return redirect("/profile");


}
"use server";

import {createClassSchema} from "@/app/lib/zodValidationSchemas/classSchema";
import  z  from "zod";
import { postAsset } from "@/app/lib/dal/classes/postAsset";
import { postJSON, getJSON } from "@/app/lib/dal/global-http";
import { redirect } from "next/navigation";
import { getCookiesValues } from "@/app/lib/dal/cookiesStore";
import {cookies} from "next/headers";
import { revalidatePath } from "next/cache";




export async function createClass(prevState, formData) {
    
    const { classesIds, token } = await getCookiesValues();
    
    const inputData = Object.fromEntries(formData);
    // const prevValues = prevState?.values || {};
    const url = "http://localhost:4000/api/v1/classes"; 
    //console.log('this is my ID !!!!!', inputData.id);
    const assetUrl = "http://localhost:4000/api/v1/assets";
    const {data} = await getJSON(assetUrl);
    const assetIds = data?.map(asset => Number(asset.id)) || [];
    //console.log('this are the assets 📁', assetIds);
    const lastAssetId = assetIds.at(-1);
    //console.log(lastAssetId);
    // console.log('prevValues: 🧩', prevValues);
    // console.log('inputData: 🧩🧩', inputData);

    
    const values = {
        trainerId: inputData.trainerId ? inputData.trainerId : "", //
        assetId: lastAssetId ? lastAssetId + 1 : null, // 
        className: inputData.className ? inputData.className : "", // Name is required for the update, so we include it even if it hasn't changed
        classDescription: inputData.classDescription ? inputData.classDescription : "",
        classDay: inputData.classDay ? inputData.classDay : "",
        classTime: inputData.classTime ? inputData.classTime : "",
        maxParticipants: inputData.maxParticipants ? inputData.maxParticipants : "",
        file: inputData.file && inputData.file.size > 0 ? inputData.file : null, // Only include file if a new one is uploaded 
    }

    //console.log('this are the values 📁', values);

    const result = createClassSchema.safeParse(values);

    if(!result.success) {
        return{
            ok:false,
            errors: z.flattenError(result.error).fieldErrors,
            values: values, // Keep previous values in the form
        }
    }

    const validatedData = result.data;
    //console.log('validation success ✅', validatedData);
    const { file, ...classData } = validatedData;
    console.log('this is the data to sent to classes the API ⭐', classData);
    const fileData = { file };
    //console.log('this is the info for assets API ⭐', fileData);
        
    
    const res = await postJSON(url, classData, token);
    if(res.status == 404){
        return{
            values,
            serverMessage: {error: "There was an error creating the class. Try again later."}
        }
    }
    if (!res.ok) {
        console.log('this is the error res: 🛑❌', res);
        
        return{
            values,
            serverMessage: {error: res.text || "Something went wrong while creating the class. Please try again."}
        }
    }
    
    const assetRes = await postAsset(assetUrl, fileData, token);
     if(assetRes.status == 404){
        return{
            values,
            serverMessage: {error: "There was an error at uploading the image. Try again later."}
        }
    }
    if (!assetRes.ok) {
        console.log('this is the error res from asset upload: 🛑❌', assetRes)
        return{
            ok: false,
            errors: {}, // No validation errors since the issue is with the file upload, not the form data
            values: prevState?.values, // Keep previous values in the form
            serverMessage: {error: assetRes.text || "Something went wrong while uploading the file. Please try again."}
        }
    };
            classesIds.push(res.data.id);
             cookies().set("classesIds", JSON.stringify(classesIds));

            //console.log('this is the res: 😁✅ ', res);
            revalidatePath("/popular"); 
            redirect("/popular/") // Redirect to activities page on success
            
            // return {
            //         values: {}, // Clear form values on success
            //         serverMessage: {success: "The class was successfully created!"}
            //     }
            
}
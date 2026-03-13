"use server";

import { cookies } from "next/headers";
import { postJSON } from "@/app/lib/dal/global-http";
import { redirect } from "next/navigation";
import { getCookiesValues } from "@/app/lib/dal/cookiesStore";
import { revalidatePath } from "next/cache";

export async function SignUpToAClass(_, formData) {
  const { token, userId, userClasses } = await getCookiesValues(); 
  const cookieStore = await cookies();

  const classId = formData.get("classId");
  //console.log(classId, '🤓');
  

  if (!token || !userId) {
    return {
      serverResponse: { message: "Are you logged in? Please log in and try again." },
    };
  }

  const url = `http://localhost:4000/api/v1/users/${userId}/classes/${classId}`;

  const response = await postJSON(url, {}, token);

  if (!response.ok) {
    //console.log('☠️', response);
    return {
      serverResponse: {
        message: "An error occurred while signing up. Please try again later.",
      },
    };
  }

  //console.log(' 🤺 here is the class' , response);
  
  const updatedUserClasses = userClasses ? [...userClasses, response.data] : [response.data];
  cookieStore.set("userClasses", JSON.stringify(updatedUserClasses));

  revalidatePath("/popular/[classId]");
    redirect("/profile");
}
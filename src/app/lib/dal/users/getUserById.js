
import { cookies } from "next/headers"; 

export async function getUserById(url) {

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const id = cookieStore.get("userId")?.value
    
     try{

    const res = await fetch(url,{
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-store", // helpful in dev
    });

    const contentType = res.headers.get("content-type") || "";
    let data = null;

    if(!id || !token) {
      return {
        ok: false,
        status: 401,
        text: "Unauthorized: Missing token or user ID. Please log in again.",
      }
    }
    
    if (!res.ok) {
      throw new Error("Something went wrong while fetching user data. Please try logging in again later.");
    }

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    } 


    return { ok: res.ok, status: res.status, data };

  } catch (error) {
    
    return {
      ok: false,
      status: 500,
      data: null, 
      text: "It was not possible to fetch user data, please try logging in again." || String(error)};
  }
 

}
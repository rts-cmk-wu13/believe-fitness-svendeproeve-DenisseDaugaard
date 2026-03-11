"use server"
import { cookies } from "next/headers";

export async function getCookiesValues() {
    const cookieStore = await cookies();
    return {
        token: cookieStore.get("token")?.value || null,
        newsLetters: cookieStore.get("newsLetters")?.value || null,
        expirationTime: cookieStore.get("expirationTime")?.value || null,
        firstname: cookieStore.get("firstname")?.value || null,
        lastname: cookieStore.get("lastname")?.value || null,
        role: cookieStore.get("role")?.value || null,
        userId: cookieStore.get("userId")?.value || null,
        userClasses: cookieStore.get("userClasses")?.value ? JSON.parse(cookieStore.get("userClasses").value) : [],
        allClassesIds: cookieStore.get("allClassesIds")?.value ? JSON.parse(cookieStore.get("allClassesIds").value) : [],
    }
};
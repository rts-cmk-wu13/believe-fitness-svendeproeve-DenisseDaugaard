import { getCookiesValues } from "../lib/dal/cookiesStore"

export default async function Profile(){
    const { token, firstname, lastname, userClasses } = await getCookiesValues()

    if(!token){
        return(
            <article className="p-8 h-screen flex bg-gray-100 flex-col items-center justify-center">   
                <h1 className="text-2xl font-bold">Profile</h1>
                <p>You must be logged in to view this page.</p>
            </article>
        )
    }

    return(
        <article className="p-8">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p>First Name: {firstname}</p>
            <p>Last Name: {lastname}</p>
        </article>
    )
}
import { getCookiesValues } from "../lib/dal/cookiesStore"
import ProfileHeader from "../components/profil-components/ProfileHeader"
import UserClassesList from "../components/profil-components/user/UserClassesList"
import AllClassesList from "../components/profil-components/admin/AdminProfile"

export default async function Profile(){
    const { token, firstname, lastname, userClasses, role , classesIds} = await getCookiesValues()
    const isAdmin = role === "Admin"
    //console.log(isAdmin);
    
    if(!token){
        return(
            <article className="p-8 h-screen flex bg-gray-100 flex-col items-center justify-center">   
                <h1 className="text-2xl font-bold">Profile</h1>
                <p>You must be logged in to view this page.</p>
            </article>
        )
    }

    //console.log(userClasses);
    
    return(
        <article className="p-8">
            <span className="text-2xl">
               My Profile
            </span>
            <ProfileHeader 
            firstname={firstname} 
            lastname={lastname} 
            role={role} />

            {isAdmin && (
                <AllClassesList classesIds={classesIds} />
            )}

            {!isAdmin && (
                <UserClassesList userClasses={userClasses} />
            )}

        </article>
    )
}
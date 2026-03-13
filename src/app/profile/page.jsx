import { getCookiesValues } from "../lib/dal/cookiesStore"
import ProfileHeader from "../components/profil-components/ProfileHeader"
import UserClassesList from "../components/profil-components/user/UserClassesList"
import AllClassesList from "../components/profil-components/admin/AdminProfile"
import ErrorMessage from "../components/global-components/ErrorMesage"

export default async function Profile(){
    const { token, firstname, lastname, userClasses, role , classesIds} = await getCookiesValues()
    const isAdmin = role === "Admin"
    //console.log(isAdmin);
    
    if(!token){
        return(
            <ErrorMessage message="You need to be logged in to view your profile."
            href="/login"
            linkText="Go to Login"
            title="Login Required"
            />
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
import { getJSON } from "@/app/lib/dal/global-http";
import ProfileHeader from "@/app/components/profil-components/ProfileHeader";
import { getCookiesValues } from "@/app/lib/dal/cookiesStore";
import { FaUserLarge } from "react-icons/fa6";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default async function ClassParticipants({params}) {
    const { token, role, firstname, lastname } = await getCookiesValues();

    if(!token || role !== "Admin"){
        return (
            <p>You must be an admin to view this page.</p>
        )
    }

    const { classId } = await params;
    const {ok, data} = await getJSON(`http://localhost:4000/api/v1/classes/${classId}`);

    if(!ok){
        return (
            <p>Could not fetch class participants. Please try again later.</p>
        )
    }
    //console.log(data);
    
    return (
        <article className="p-8">
            <div className="mt-2 absolute top-8 left-8 z-50">
                <Link href="/profile">
                    <IoArrowBack color="gray" size={25} className="text-shadow-md"/>
                </Link>
            </div>
            <div className="mt-8">
              <ProfileHeader 
                firstname={firstname} 
                lastname={lastname} 
                role={role}
            /> 
            </div>
            {data?.users?.length === 0 
            ? (<p className="text-gray-500 font-semibold text-lg">There are no participants enrolled in this class.</p>) 
            : (
            <section className="mt-8">
                <h1 className="text-xl font-bold">{data?.className}</h1>
                <h2 className="font-semibold text-lg my-4">Participants:</h2>
                <ul className="">
                    {data?.users?.map(user => (
                        <li className="border rounded-[3rem] px-4 py-2 my-2 flex items-center gap-2"
                            key={user.id}>
                            <FaUserLarge className="inline-block mr-2" />
                            <p>{user.userFirstName} {user.userLastName}</p>
                        </li>
                    ))}
                </ul>
            </section>
            )}
          
        </article>
    )

}
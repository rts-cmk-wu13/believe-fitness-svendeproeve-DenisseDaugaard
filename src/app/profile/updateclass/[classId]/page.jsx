import { getCookiesValues } from "@/app/lib/dal/cookiesStore";
import ErrorMessage from "@/app/components/global-components/ErrorMesage";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { getJSON } from "@/app/lib/dal/global-http";
import UpdateClassForm from "@/app/components/profil-components/admin/update-class/UpDateForm";
import { updateClass } from "@/app/components/profil-components/admin/update-class/updateAction";

export default async function UpdateClassPage({ params }) { 
    const {token, role} = await getCookiesValues();
    if(!token || role !== "Admin") {
        return(
            <ErrorMessage 
            title="Unauthorized Access"
            message={"You are not authorized to view this page."} 
            linkText="Go back to home"
            href={"/"}
            />
        )
    }

    const { classId } = await params;
    const classUrl = `http://localhost:4000/api/v1/classes/${classId}`;
    const {ok,data} = await getJSON(classUrl);
    if(!ok || !data) {
        return(
            <ErrorMessage
            title="Server Error"
            message={"Its not possible to update this class right now. Try agaun later."}
            linkText="Go back to profile"
            href="/profile"
            />
            )
        }
    console.log(data);
    return(
        <article className="p-8">
            <div className="mt-2 absolute top-8 left-8 z-50">
                <Link href="/profile">
                    <IoArrowBack size={28} className="arrow_back"/>
                </Link>
            </div>
             < h1 className="text-2xl mb-4 ml-12 mt-[2px]">Update Class</h1>
            <UpdateClassForm  
            initialState={{values: data}} 
            updateActivity={updateClass} 
            id={classId}/>
        </article>
    )
}

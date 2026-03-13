import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import CreateClassForm from "@/app/components/profil-components/admin/create-class/CreateClassForm";
import { getCookiesValues } from "@/app/lib/dal/cookiesStore";
import ErrorMessage from "@/app/components/global-components/ErrorMesage";

export default async function CreateClass(){
    const {role} = await getCookiesValues();

    if(role !== "Admin"){
        return(
            <ErrorMessage message="You do not have the necessary permissions to access this page."
            title="Access Denied"
            href="/profile"
            linkText="Go back to profile" 
            />
        )}

    return(
        <article className="p-8">
            <div className="mt-2 absolute top-8 left-8 z-50">
                <Link href="/profile">
                    <IoArrowBack color="gray" size={28} className="arrow_back"/>
                </Link>
            </div>
            <h1 className="text-2xl mb-4 ml-12 mt-[3px]">Create New Class</h1>
            <CreateClassForm />
        </article>
    )
}
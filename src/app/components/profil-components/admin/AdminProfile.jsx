import { getJSON } from "@/app/lib/dal/global-http";
import { getCookiesValues } from "@/app/lib/dal/cookiesStore";
import AdminClassesList from "./AdminClassCard";

export default async function AdminProfile({ classesIds }) {
    //console.log(classesIds);
    const classesData = await Promise.all(classesIds.map(async (id) => {
        const response = await getJSON(`http://localhost:4000/api/v1/classes/${id}`);
            if (response.ok) {
                return response.data;
            }
            return null;
        }));

    //console.log(classesData);
    
    const { token, role } = await getCookiesValues();
    if(!token || role !== "Admin"){
        return (
            <p>You must be an admin to view this page.</p>
        )
    }

    return (
        <AdminClassesList classesData={classesData} />
    )
}
import { getJSON } from "@/app/lib/dal/global-http";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import Link from "next/link";
export default async function AllClassesList({ allClassesIds }) {
    console.log(allClassesIds);
    const classesData = await Promise.all(allClassesIds.map(async (id) => {
        const response = await getJSON(`http://localhost:4000/api/v1/classes/${id}`);
        if (response.ok) {

            return response.data;
        }
        return null;
    }));

    console.log(classesData);
    
    return (
        <section>
            {classesData?.map(classItem =>(
                 <section key={classItem?.id} className="p-4 border border-gray-500 rounded-[1rem] mb-8">
                    <div>
                        <h3 className="text-2xl font-semibold">{classItem.className}</h3>
                        <p className="text-gray-60 my-2">{classItem.classDay} - {classItem.classTime}</p>
                        <div className="flex justify-between">
                            <p className="text-gray-60 my-2">Max participants : {classItem.maxParticipants}</p>
                            <p className="text-gray-60 my-2">Joined : {classItem.users?.length}</p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <Link href="/profile/participants" className="btn">PARTICIPANTS</Link>
                            <div className="flex gap-2">
                                <Link href="/profile/update-class" className="btn"><FiEdit/></Link>
                                <button className="btn"><RiDeleteBin7Line /></button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                       
                    </div>
            </section>
            ))}
        </section>
    )
}
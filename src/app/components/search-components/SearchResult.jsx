
import ClassCard from "../classes-components/ClassCard";
import Image from "next/image";

export default function SearchResult({ searchResults }) {
    console.log('💬',searchResults);
    
    return (
        <div>
           <section className="mt-12">
            <h2 className="text-2xl mb-4">Classes</h2>
                       <ul className="class_list">
                           {searchResults?.classes?.map(classItem => (
                               <li key={classItem.id} className="relative rounded-[1rem]">
                               <ClassCard classItem={classItem} 
                               style="w-[200px] h-[200px]" 
                               font="text-xs"/>
                               </li>
                           ))}
                       </ul>
                       </section>
            <h2 className="text-2xl mt-12 mb-4">Trainers</h2>
            <ul>
                {searchResults?.trainers?.map((item) => (
                    <li key={item.id} className="flex items-center mb-4">
                        <figure className="h-[100px] w-[100px] rounded-[2rem] mr-4">
                            <Image
                                src={item.asset.url}
                                width={100}
                                height={100}
                                unoptimized
                                alt={item.trainerName}  
                                className="image rounded-[1rem]"
                                />
                        </figure>
                        <p className="font-semibold">{item.trainerName}</p>
                       
                    </li>
                ))}
            </ul>
        </div>
    );
}
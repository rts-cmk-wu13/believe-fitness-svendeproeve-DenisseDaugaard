"use client";

import { useSearchParams } from "next/navigation";
import ClassCard from "../classes-components/ClassCard";
import TrainersCard from "../classes-components/TrainersCard";

export default function SearchResult({ searchResults }) {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  //console.log('💬',searchResults);
  //console.log('🔍', q);
  

  const filteredClasses = !q
    ? searchResults?.classes ?? []
    : (searchResults?.classes ?? []).filter((classItem) => {
        const dataToFind = [
          classItem.className,
          classItem.classDay,
          classItem.classTime,
          classItem.classDescription,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return dataToFind.includes(q);
      });

  const filteredTrainers = !q
    ? searchResults?.trainers ?? []
    : (searchResults?.trainers ?? []).filter((trainer) => {
        const dataToFind = [trainer.trainerName]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return dataToFind.includes(q);
      });

      //console.log('🦾', filteredClasses);
      //console.log('👩🏻', filteredTrainers);

  const noResults =
    q && filteredClasses.length === 0 && filteredTrainers.length === 0;

  return (
    <div>
      {noResults ? (
        <p className="mt-12 text-center text-gray-500 font-medium">
          No results found
        </p>
      ) : (
        <>
          <section className="mt-12">
            {filteredClasses.length > 0 ?( <h2 className="text-2xl mb-4">Classes</h2>) :(null)}
            {filteredClasses.length > 0 ? (
              <ul className="class_list">
                {filteredClasses.map((classItem) => (
                  <li key={classItem.id} className="relative rounded-[1rem]">
                    <ClassCard
                      classItem={classItem}
                      style="w-[200px] h-[200px]"
                      font="text-xs"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </section>

          <section className="mt-12">
            {filteredTrainers.length < 0 
            ? ( <h2 className="text-2xl mb-4">Trainers</h2>
            ) : null}
           
            {filteredTrainers.length > 0 ? (
              <ul>
                {filteredTrainers.map((item) => (
                  <li key={item.id} className="flex items-center mb-4">
                    <TrainersCard item={item} />
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        </>
      )}
    </div>
  );
}
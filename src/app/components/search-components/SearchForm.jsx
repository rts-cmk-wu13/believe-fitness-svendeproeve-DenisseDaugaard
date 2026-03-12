"use client"; // this component needs to be client-side because it uses state and effects.

import { useEffect, useState } from "react"; 
import { RiSearchLine } from "react-icons/ri";

export default function SearchBar() {
  const [q, setQ] = useState(""); // This state holds the current value of the search input field.
  
  const onSubmit = (e) => {
    e.preventDefault(); // this avoids the default form submission behavior, which would cause a page reload.
    const query = q.trim(); // remove leading and trailing whitespace from the search query
  };

 
  return (
    <>
      <section className="w-full mt-12 mb-4 border rounded-[3rem] flex items-center p-2">
        <RiSearchLine color="gray" className="cursor-pointer" size={26} />

        <form onSubmit={onSubmit} className="w-full">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search classes."
            className="search p-2 w-full"
          />
        </form>
      </section>

    </>
  );
}
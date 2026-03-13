"use client";

import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const router = useRouter(); // Access the router for navigation
  const pathname = usePathname(); // Get the current pathname for constructing the new URL
  const searchParams = useSearchParams(); // Get the current search parameters to preserve them when updating the query

  const submittedQ = searchParams.get("q") ?? ""; 
  const [q, setQ] = useState(submittedQ);

  useEffect(() => {
    setQ(submittedQ);
  }, [submittedQ]);

  const onSubmit = (e) => {
    e.preventDefault();

    const query = q.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (!query) {
      params.delete("q");
      // If the query is empty, we remove the "q" parameter from the URL 
      // to avoid having an empty search query in the URL.
    } else {
      params.set("q", query);
      // If there is a valid query, we set the "q" parameter in the URL to the current search query.
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
    // This will update the URL with the new query parameter, triggering a 
    // re-render of the SearchResult component with the updated search results.
  };

  return (
    <section className="w-full mt-12 mb-4 border rounded-[3rem] flex items-center p-2">
      <button type="submit" form="search-form" className="ml-2">
        <RiSearchLine color="gray" className="cursor-pointer" size={26} />
      </button>

      <form id="search-form" onSubmit={onSubmit} className="w-full">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          placeholder="Search classes"
          className="search p-2 w-full outline-none focus:outline-none focus:ring-0"
        />
      </form>
    </section>
  );
}
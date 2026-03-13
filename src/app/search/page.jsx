import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import SearchForm from "../components/search-components/SearchForm";
import { getJSON } from "../lib/dal/global-http";
import SearchResult from "../components/search-components/SearchResult";

export default async function SearchPage() {
  const classesUrl = "http://localhost:4000/api/v1/classes";
  const trainersUrl = "http://localhost:4000/api/v1/trainers";

  const information = await Promise.all([
    getJSON(classesUrl),
    getJSON(trainersUrl),
  ]);

  const savedData = {
    classes: information[0].data,
    trainers: information[1].data,
  };

  return (
    <article className="p-8">
      <div className="mt-2 absolute top-8 left-8 z-50">
        <Link href="/">
          <IoArrowBack color="gray" size={25} className="text-shadow-md" />
        </Link>
      </div>

      <h1 className="text-2xl mb-4 ml-12 mt-[2px]">Search</h1>

      <SearchForm />
      <SearchResult searchResults={savedData} />
    </article>
  );
}
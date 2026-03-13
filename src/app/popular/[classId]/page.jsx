import Image from "next/image"
import { getJSON } from "../../lib/dal/global-http"
import Link from "next/link"
import { IoArrowBack } from "react-icons/io5";
import { getCookiesValues } from "../../lib/dal/cookiesStore"
import ClassDetailsInfo from "@/app/components/classes-components/ClassDetailsInfo";
import ErrorMessage from "@/app/components/global-components/ErrorMesage";

export default async function PopularClass({params}) {
    const { classId } = await params
    const classUrl = `http://localhost:4000/api/v1/classes/${Number(classId)}`;
    const {ok, data} = await getJSON(classUrl);
    const classData = data || {};
    //console.log(classData);

    if (!ok || !classData || classData === undefined || !classId) {
        return (
            <ErrorMessage message="The class you are looking for was not found." 
            title="Error"
            href="/popular"
            linkText="Go back to popular classes"
            />
        )
    }
    
    const { token, userClasses, role } = await getCookiesValues()
    const isEnrolled = userClasses?.some(userClass => userClass.id === classData.id);
    const isLoggedIn = token !== null && token !== undefined && token !== "" && role === "Member";
    const classDays = userClasses.map(c => c.classDay);
    const isSameday = classDays.includes(classData.classDay);
    // console.log('classDays', classDays);
    // console.log('isSameday', isSameday);
    // console.log('enroled', isEnrolled);
    // console.log('logged ind ', isLoggedIn);
    const ratingUrl = `http://localhost:4000/api/v1/classes/${classId}/ratings`;
    const {data: ratingData} = await getJSON(ratingUrl);
    //console.log(ratingData);
    const averageRating = ratingData?.reduce((acc, rating) => acc + rating.rating, 0) / ratingData.length || 0;
    // here we calculate the average rating by summing up all the ratings and dividing by the number of ratings. If there are no ratings, we default to 0 to avoid division by zero errors.
    //console.log(averageRating);
    
    const instructorUrl = `http://localhost:4000/api/v1/trainers/${classData?.trainer?.id}`;
    const {data: instructorData} = await getJSON(instructorUrl);
    //console.log(instructorData);

    if(!instructorData || instructorData === undefined) {
        return (
            <ErrorMessage message="The class you are looking for was not found." 
            title="Error"   
            href="/popular"
            linkText="Go back to popular classes"
            />
        )
    }
    

    return(

        <article className="p-8 h-[700px] relative">
            <div className="mt-2 absolute top-8 left-8 z-50">
                <Link href="/popular">
                    <IoArrowBack size={28} className="arrow_back"/>
                </Link>
            </div>
            <figure className="absolute top-0 left-0 h-[300px] w-full">
                <Image
                src={classData?.asset?.url}
                width={500}
                height={500}
                unoptimized
                alt={classData?.className}
                className="image"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/app-images/placeholder.jpg"
                />
            </figure>

            <ClassDetailsInfo 
            averageRating={averageRating} 
            classData={classData} 
            instructorData={instructorData} 
            isEnrolled={isEnrolled} 
            isLoggedIn={isLoggedIn}
            isSameDay={isSameday}/>
        </article>

    )
}
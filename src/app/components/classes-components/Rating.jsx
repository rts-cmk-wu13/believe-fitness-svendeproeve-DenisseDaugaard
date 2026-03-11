import { MdOutlineStarPurple500 } from "react-icons/md";

export default function Rating({averageRating}) {

    if(!averageRating) return null;
    const startsNumber  = Math.round(averageRating);
    const emptyStars = (startsNumber) =>{
        const emptyStarsArray = [];
        for(let i = 0; i < 5 - startsNumber; i++){
            emptyStarsArray.push(<MdOutlineStarPurple500 key={i} color="gray" size={20}/>);
        }        return emptyStarsArray;
    }
    return(
        <div className="flex gap-4 items-center mt-[15px]">
        <span className="flex">
            {Array.from({length: startsNumber}, (_, i) => (
                <MdOutlineStarPurple500 key={i} color="yellow" size={20}/>  
            ))}
            {emptyStars(startsNumber)}

        </span>
            <p className="text-xl text-yellow-300">{averageRating} / 5</p>
        </div>
    )
}
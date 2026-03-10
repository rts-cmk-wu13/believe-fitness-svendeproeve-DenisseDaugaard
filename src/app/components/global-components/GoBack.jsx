

import { IoArrowBack } from "react-icons/io5";

export default function GoBack({ handleGoBack }) {
    return(
        <button className="go_back_btn">
            <IoArrowBack color="gray" size={25}/>
        </button>
    )
}
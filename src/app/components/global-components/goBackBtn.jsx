"use client"

import { IoArrowBack } from "react-icons/io5"
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return( 
     <div className="mt-2 absolute top-8 left-8 z-50">
        <button onClick={handleBack}><IoArrowBack color="gray" size={28} className="arrow_back"/></button>
    </div>
)
}
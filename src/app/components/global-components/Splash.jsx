"use client"
import {useState, useEffect} from "react"
export default function Splash() {

    const [isFading, setIsFading] = useState("");

    const removeSplash = ()=>{
        // setIsFading("animate-fadeout");
      const splashElement = document.querySelector(".splash");
      if(splashElement){
        console.log('it existis ');  
        splashElement.classList.add("go_to_home");
    }

    }

    return(
        <div className={`splash fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-center h-screen`}
        style={{ backgroundImage: "url('/app-images/splash-1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
           <div className="w-full mt-[300px]">
             <h1 className="welcome_title">Believe</h1>
             <h1 className="welcome_title">Fitness</h1>
                <div className="message flex items-center gap-2">
                    <div className="h-[2px] w-[20px] bg-white"></div> <span className="font-semibold text-white">Train like a pro</span>
                </div>
           </div>
           <button onClick={removeSplash} className=" btn message mx-auto mt-4">START TRAINING</button>
        </div>
    )
}
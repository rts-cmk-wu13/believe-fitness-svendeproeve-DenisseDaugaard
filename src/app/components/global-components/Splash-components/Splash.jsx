"use client"
import { useState, useEffect} from "react";
import { saveSplash } from "./saveSplash";


export default function Splash() {
    const [isVisible, setIsVisible] = useState("");

    const [splash, setSplash] = useState(null);

    useEffect(() => {
        const storedSplash = sessionStorage.getItem("splash");
        setSplash(storedSplash);
    }, []);

    const removeSplash =() => {
        setIsVisible("go_to_home");
        saveSplash();
    }
   
    return(
        <>
         {splash
          ? null 
          : (
            <div className={`${isVisible} fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-center h-screen`}
            style={{ backgroundImage: "url('/app-images/splash-1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
           <div className="w-full mt-[200px]">
             <h1 className="welcome_title">Believe</h1>
             <h1 className="welcome_title">Fitness</h1>
                <div className="message flex items-center gap-2">
                    <div className="h-[2px] w-[20px] bg-white"></div> <span className="font-semibold text-white">Train like a pro</span>
                </div>
           </div>
           <button onClick={removeSplash} className=" btn message mx-auto mt-4">START TRAINING</button>
        </div>
          )}
        </>
       
        
    )
}
"use client";
import {useState} from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import LogOutBtn from "./log-out/LogOutBtn";

export default function Navigation({token}) {
    //console.log('here is my token in the nav',token);
    const isLoggedIn = token ? "display block" : "hidden";
    
    const pathname = usePathname(); 
    if(pathname === "/login")return null;
    const [isVisible, setIsVisible] = useState(false);

    const isActive = (path) => pathname === path ? "text-[var(--primary-color)]" : "text-black";

    return(
        <>
         {isVisible 
            ? (
                <nav className="col-span-2 col-spna p-4 flex flex-col h-[100vh] transition-all duration-300 bg-white fixed top-0 left-0 w-full z-50">  
                    <button className="text-gray-500 ml-auto p-3 text-4xl" onClick={() => setIsVisible(false)}>×</button> 
                    <ul className=" text-center p-8 flex flex-col justify-between text-3xl h-[100vh]">
                        <li>
                            <Link href="/" className={isActive("/")} onClick={() => setIsVisible(false)}>Home</Link>
                        </li>
                        <li>
                            <Link href="/popular" className={isActive("/popular")} onClick={() => setIsVisible(false)}>Popular classes</Link>
                        </li>
                        <li>
                            <Link href="/search" className={isActive("/search")} onClick={() => setIsVisible(false)}>Search</Link>
                        </li>
                        <li className={isLoggedIn}>
                            <Link href="/profile" className={isActive("/profile")} onClick={() => setIsVisible(false)}>My Profile</Link>
                        </li>
                        <li>
                        {!token ? (<Link href="/login">LOGIN</Link>) : (<LogOutBtn/>)}
                        </li>
                    </ul>
                </nav>) 
            : 
                (<button 
                    className="text-[#9E9E9E] text-4xl flex justify-self-end" 
                    onClick={() => setIsVisible(true)}><HiOutlineMenuAlt3  className="burger_menu"/></button>)
        }
        </>
    )
}
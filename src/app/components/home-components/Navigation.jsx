"use client";
import {useState} from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default function Navigation() {
    const pathname = usePathname();

    if(pathname === "/login")return null;
    const [isVisible, setIsVisible] = useState(false);

    const isActive = (path) => pathname === path ? "text-[var(--primary-color)]" : "text-black";
    return(
        <>
         {isVisible 
            ? (
                <nav className="p-4 flex flex-col h-[100vh] transition-all duration-300 bg-white fixed top-0 left-0 w-full z-50">  
                    <button className="text-gray-500 ml-auto text-4xl" onClick={() => setIsVisible(false)}>×</button> 
                    <ul className=" text-center p-8 flex flex-col justify-between text-3xl h-[100vh]">
                        <li>
                            <Link href="/" className={isActive("/")}>Home</Link>
                        </li>
                        <li>
                            <Link href="/popular" className={isActive("/popular")}>Popular classes</Link>
                        </li>
                        <li>
                            <Link href="/search" className={isActive("/search")}>Search</Link>
                        </li>
                        <li>
                            <Link href="/profile" className={isActive("/profile")}>My Profile</Link>
                        </li>
                        <li>
                        LOG OUT 
                        </li>
                    </ul>
                </nav>) 
            : 
                (<button 
                    className="text-gray-500 text-4xl flex justify-self-end" 
                    onClick={() => setIsVisible(true)}><HiOutlineMenuAlt3 /></button>)
        }
        </>
    )
}
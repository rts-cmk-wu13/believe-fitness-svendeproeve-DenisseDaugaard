import { LoginHeader } from "@/app/components/global-components/login/LoginHeader"
import Link from "next/link"
import { IoArrowBack } from "react-icons/io5"
import SignUpForm from "@/app/components/global-components/login/signup-components/SignupForm"

export default function Signup() {
    return(
        <article className="py-24">
            <div className="mt-2 absolute top-8 left-8 z-50">
                <Link href="/login">
                    <IoArrowBack color="gray" size={28} className="arrow_back"/>
                </Link>
            </div>
            <LoginHeader />
            <section className="p-8">
                <h2 className="text-xl font-semibold mb-4">Sign up as a new user</h2>
                <SignUpForm />
                        
            </section>
        </article>
    )
}
import { LoginHeader } from "../components/global-components/login/LoginHeader"
import LoginForm from "../components/global-components/login/LoginForm"
import Link from "next/link"
import { IoArrowBack } from "react-icons/io5"

export default function Login() {
    return(
        <article className="py-24">
        <div className="mt-2 absolute top-8 left-8 z-50">
            <Link href="/">
                <IoArrowBack color="gray" size={25} className="text-shadow-md"/>
            </Link>
        </div>
            <LoginHeader />
        <section className="p-8">
            <h2 className="text-xl font-semibold mb-4">Log in with your credentials</h2>
            <LoginForm />
            <div className="mt-8 text-center text-gray-600">
                <p>Are You not yet a Believer?</p>
                <span>
                    <Link 
                    href="/login/signup"
                    className="underline">Sign up here</Link> to start training like a pro.
                </span>
            </div>
        </section>
        </article>
    )
}
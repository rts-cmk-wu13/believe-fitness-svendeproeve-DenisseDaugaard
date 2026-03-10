import { LoginHeader } from "../components/login-components/LoginHeader"
import LoginForm from "../components/login-components/LoginForm"

export default function Login() {
    return(
        <article className="py-24">
            <LoginHeader />

        <section className="p-8">
            <h2 className="text-xl font-semibold mb-4">Log in with your credentials</h2>
            <LoginForm />
        </section>
        </article>
    )
}
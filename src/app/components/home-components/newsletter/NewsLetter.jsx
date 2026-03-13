"use client"

import { useActionState, useEffect } from "react"
import { signupNewsLetters } from "./signupNewsLettersAction"
import {toast} from "react-toastify"

export default function NewsLetter(){
    const initialState = {
        email: "",
        errors: {},
        serverMessage: null,
    }
    const [state, formAction, isPending] = useActionState(signupNewsLetters, initialState)

    useEffect(() => {
    if (state?.serverMessage?.success) {
      toast.success(state.serverMessage.success, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [state?.serverMessage?.success]);

    return(
        <section className="p-4 mb-8">
            <h2 className="title">Sign up for our newsletter</h2>
            <p>Sign up to receive the latest news and announcements from Believe Fitness</p>

            <form noValidate action={formAction} className="mt-4">
                <div className="flex items-center">
                    <div className="relative flex flex-col">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="border rounded-[3rem] border-gray-400 mr-2 p-4 text-black"
                        defaultValue={state?.values?.email ?? ""}
                        />
                        {state?.errors?.email && (
                    <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.email}</span>)}
                    </div>
                    <button
                        className="btn font-semibold disabled:bg-gray-300 disabled:opacity-50 text-black text-sm"
                        disabled={isPending}
                        type="submit"
                        >
                        {isPending ? "Vent..." : "SIGN UP"}
                    </button>
                </div>

        {state?.serverMessage?.error && (
          <span className="error_response mt-2">{state.serverMessage.error}</span>
        )}
    
        {/* {state?.serverMessage?.success && (
          <span className="success_response mt-2">{state.serverMessage.success}</span>
        )} */}
            </form>
        </section>
    )
}
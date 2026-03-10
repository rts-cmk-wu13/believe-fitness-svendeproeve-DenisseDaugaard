"use client"
import { useActionState } from "react"
import { loginUser } from "./loginAction"

export default function LoginForm(){

    const initialState = {
       values: { username: "", password: "" },
       errors: {},
       serverMessage:{},
     };
   
     const [state, formAction, isPending] = useActionState(loginUser, initialState);
     //console.log(state);
    
    return(
        <>
        <form noValidate action={formAction}>
            <div>
                <div className="relative flex flex-col mb-10">
                <input
                    type="text"
                    name="username"
                    placeholder="Brugernavn"
                     className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                    defaultValue={state?.values?.username ?? ""}
                    />
                    {state?.errors?.username && (
                <span className="error_response mt-2 absolute left-0 -bottom-10">{state?.errors?.username}</span>)}
                </div>
                <div className="relative flex flex-col mb-10">
                <input
                    type="password"
                    name="password"
                    placeholder="Adgangskode"
                     className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                    defaultValue={state?.values?.password ?? ""}
                    />
                    {state?.errors?.password && (
                <span className="error_response mt-2 absolute left-0 -bottom-10">{state?.errors?.password}</span>)}
                </div>
                {state?.errors?.error && (
                  <span className="error_response mt-2 ">{state.errors.error}</span>
                )}
                {state?.serverMessage?.error && (
                  <span className="error_response mt-2 ">{state.serverMessage.error}</span>
                )}
                
                <button
                    className="btn w-full text-center mt-3 bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm"
                    disabled={isPending}
                    type="submit"
                    >
                    {isPending ? "Wait..." : "LOG IN"}
                </button>
            </div>

        </form>
        </>
    )

}
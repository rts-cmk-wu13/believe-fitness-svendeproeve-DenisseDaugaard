"use client"
import { useActionState } from "react"
import { SignUpAction} from "./signUpAction"
import Link from "next/link";


export default function SignUpForm(){

    const initialState = {
       values: { 
        userFirstName: "",
        userLastName: "",
        username: "", 
        password: "",
        confirmPassword: "",
       },
       errors: {},
       serverResponse:{}
     };
     
     const [state, formAction, isPending] = useActionState(SignUpAction, initialState);
     const isSuccess = Boolean(state?.serverResponse?.success);
     const succesClass = `transition-all duration-300 ${isSuccess ? "opacity-50 blur-sm pointer-events-none h-[100px]" : ""}`;
     

    return(
         <form noValidate action={formAction} >
            <div className={succesClass}>
               <div className="flex flex-col mb-5">
                <input
                    type="text"
                    name="userFirstName"
                    placeholder="Enter your first name..."
                     className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                    defaultValue={state?.values?.userFirstName ?? ""}
                    />
                    {state?.errors?.userFirstName && (
                <span className="error_response mt-2">{state?.errors?.userFirstName}</span>)}
                </div>
               <div className="flex flex-col mb-5">
                <input
                    type="text"
                    name="userLastName"
                    placeholder="Enter your last name..."
                     className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                    defaultValue={state?.values?.userLastName ?? ""}
                    />
                    {state?.errors?.userLastName && (
                <span className="error_response mt-2 ">{state?.errors?.userLastName}</span>)}
                </div>
               <div className="flex flex-col mb-5">
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your username..."
                     className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                    defaultValue={state?.values?.username ?? ""}
                    />
                    {state?.errors?.username && (
                <span className="error_response mt-2 ">{state?.errors?.username}</span>)}
                </div>
               <div className="flex flex-col mb-5">
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password..."
                     className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                    defaultValue={state?.values?.password ?? ""}
                    />
                    {state?.errors?.password && (
                <span className="error_response mt-2">{state?.errors?.password}</span>)}
                </div>
               <div className="flex flex-col mb-5">
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password..."
                     className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                    defaultValue={state?.values?.confirmPassword ?? ""}
                    />
                    {state?.errors?.confirmPassword && (
                <span className="error_response mt-2">{state?.errors?.confirmPassword}</span>)}
                </div>
                {state?.serverResponse?.error && (
                  <span className="error_response mt-2">{state.serverResponse.error}</span>
                )}

</div>
                {state?.serverResponse?.success && (
                  <span className="success_response mt-2 ml-2">{state.serverResponse.success}</span>
                )}

                {state?.serverResponse?.success && !isPending ?(
                    <Link href="/login" className="btn p-4 mt-4 bg-white text-black text-sm inline-block w-11/12  text-center">
                    Go to login
                    </Link>
                ):(
                     <button
                    className="btn w-full p-4 bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm text-center"
                    disabled={isPending}
                    type="submit"
                    >
                    {isPending ? "Wait..." : "SIGN UP"}
                </button>
                )}

      </form>
    )

}
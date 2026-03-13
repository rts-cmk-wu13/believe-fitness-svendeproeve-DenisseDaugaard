"use client";

import { useActionState } from "react";
import { SignUpToAClass } from "./signUpAction";

export default function SignUpButton({ classId }) {
  //console.log('classId', classId);
  
  const initialState = { serverResponse: {} };

  const [state, formAction, isPending] =
    useActionState(SignUpToAClass, initialState);

  return (
    <form noValidate action={formAction}>
      <input type="hidden" name="classId" value={classId} />

    {!isPending && !state?.serverResponse?.message && (
       <button
        className="btn w-10/12 fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#9AE630] text-white font-bold rounded-lg"
        type="submit"
      >
        SIGN UP
      </button>
    )}

      {isPending && !state?.serverResponse?.message && (
       <button
        className="disabled:opacity-50 btn w-10/12 fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#9AE630] text-white font-bold rounded-lg"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Signing up..." : "SIGN UP"}
      </button> 
      )}

      {state?.serverResponse?.message && (
        <p className="text-red-500 absolute left-20 bg-red-100/90 rounded p-2 top-[45%]">{state.serverResponse.message}</p>
      )}

    </form>
  );
}
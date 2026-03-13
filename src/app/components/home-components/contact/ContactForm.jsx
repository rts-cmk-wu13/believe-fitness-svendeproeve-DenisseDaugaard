"use client";
import { useActionState, useEffect } from "react";
import { sendMessage } from "./sendMessageAction";
import { toast } from "react-toastify";

export default function Contact() {
  const initialState = {
    values: {
        name: "",
        email: "",
        message:"",
     },
    errors: {},
    serverMessage:{},
  };

  const [state, formAction, isPending] = useActionState(sendMessage, initialState);

    useEffect(() => {
      if (state?.serverMessage?.success) {
        toast.success(state.serverMessage.success, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }, [state?.serverMessage?.success]);

  //console.log(state);
  
  return (
    <section className="p-8">
      <h1 className="title">Contact us</h1>

      <form noValidate action={formAction}>
        <div className="">
            <div className="relative flex flex-col mb-12">
            <input
                type="text"
                name="name"
                placeholder="Enter your name..."
                className="border rounded-[3rem] border-gray-500 mr-2 p-4 text-black"
                defaultValue={state?.values?.name ?? ""}
                />
                {state?.errors?.name && (
                  <span className="error_response mt-2 absolute left-0 -bottom-12">{state.errors.name}</span>)}
            </div>

            <div className="relative flex flex-col mb-12">
            <input
                type="email"
                name="email"
                placeholder="Enter your email..."
                className="border rounded-[3rem] border-gray-500 mr-2 p-4 text-black"
                defaultValue={state?.values?.email ?? ""}
                />
                {state?.errors?.email && (
                  <span className="error_response mt-2 absolute left-0 -bottom-12">{state.errors.email}</span>)}
            </div>

            <div className="relative flex flex-col mb-12">
            <textarea
                name="message"
                placeholder="Enter your message..."
                rows={7}
                className="border rounded-[2rem] border-gray-500 mr-2 p-4 text-black"
                defaultValue={state?.values?.message ?? ""}
                />
                {state?.errors?.message && (
            <span className="error_response mt-2 absolute left-0 -bottom-12">{state.errors.message}</span>)}
            </div>
            {state?.serverMessage?.error && (
              <span className="error_response mt-2 mb-4">{state.serverMessage.error}</span>
            )}
        
            {/* {state?.serverMessage?.success && (
              <span className="success_response mb-4">{state.serverMessage.success}</span>
            )} */}

            <button
                className="btn w-full bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm"
                disabled={isPending}
                type="submit"
                >
                {isPending ? "Sending..." : "Send Message"}
            </button>
        </div>


      </form>
    </section>
  );
}
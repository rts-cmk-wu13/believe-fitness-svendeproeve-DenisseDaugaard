"use client"

import { useActionState } from "react"
import { createClass } from "./createClassAction";

export default function CreateClassForm() {
    const initialState = {
        values: {
            className: "",
            classDescription: "",
            classDay: "",
            classTime: "",
            maxParticipants: "",
            file: null,
        },
        errors: {},
        serverMessage: null,
    };

    const [state, formAction, isPending] = useActionState(createClass, initialState);

    return( 
        <article>
            <form noValidate action={formAction}>
                <input type="hidden" name="assetId" value={state?.values?.assetId ?? ""} />
                 <div className="relative flex flex-col mb-6">
                    <input
                        type="text"
                        name="className"
                        placeholder="Class name"
                         className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                        defaultValue={state?.values?.className ?? ""}
                        />
                        {state?.errors?.className && (
                    <span className="error_response mt-2">{state?.errors?.className}</span>)}
                </div>
                 <div className="relative flex flex-col mb-6">
                    <textarea
                        name="classDescription"
                        placeholder="Class description"
                         className="border rounded-[1rem] border-gray-500 mr-2 p-3 text-black"
                         rows={5}
                        defaultValue={state?.values?.classDescription ?? ""}
                        />
                        {state?.errors?.classDescription && (
                    <span className="error_response mt-2">{state?.errors?.classDescription}</span>)}
                </div>
                    <div className="relative flex flex-col mb-6">
                        <input
                            type="text"
                            name="classDay"
                            placeholder="Class day"
                             className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                            defaultValue={state?.values?.classDay ?? ""}
                            />
                            {state?.errors?.classDay && (
                        <span className="error_response mt-2">{state?.errors?.classDay}</span>)}
                    </div>
                    <div className="relative flex flex-col mb-6">
                        <input
                            type="time"
                            name="classTime"
                            placeholder="Class time"
                             className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                            defaultValue={state?.values?.classTime ?? ""}
                            />
                            {state?.errors?.classTime && (
                        <span className="error_response mt-2">{state?.errors?.classTime}</span>)}
                    </div>
                    <div className="relative flex flex-col mb-6">
                        <input
                            type="number"
                            name="maxParticipants"
                            placeholder="Maximum participants"
                             className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                            defaultValue={state?.values?.maxParticipants ?? ""}
                            />
                            {state?.errors?.maxParticipants && (
                        <span className="error_response mt-2">{state?.errors?.maxParticipants}</span>)}
                    </div>
                   <div className="relative flex flex-col mb-6">
                    <select
                        name="trainerId"
                        className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                        defaultValue={state?.values?.trainerId ?? ""}
                    >
                        <option value="">Choose trainer</option>
                        <option value="1">Davina Jones</option>
                        <option value="2">Sara Connor</option>
                        <option value="3">Michael Blake</option>
                        <option value="4">Khaled Al-Sadek</option>
                    </select>

                    {state?.errors?.trainerId && (
                        <span className="error_response mt-2">
                        {state?.errors?.trainerId}
                        </span>
                    )}
                    </div>
                <div className="relative flex flex-col mb-6">
                        <label htmlFor="file">Class image:</label>
                        <input
                            type="file"
                            name="file"
                             className="border rounded-[3rem] border-gray-500 mr-2 p-3 text-black"
                            defaultValue={state?.values?.file ?? ""}
                            />
                            {state?.errors?.file && (
                        <span className="error_response mt-2">{state?.errors?.file}</span>)}
                    </div>
                    <button
                    className="btn w-full text-center p-4 mt-4 bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm"
                    disabled={isPending}
                    type="submit"
                    >
                    {isPending ? "Waiting..." : "Create Class"}
                </button>
                {state?.serverMessage?.error && (
                  <span className="error_response mt-2 ">{state.serverMessage.error}</span>
                )}
                {/* {state?.serverMessage?.success && (
                  <span className="success_response mt-2 ">{state.serverMessage.success}</span>
                )} */}
            </form>
        </article>
    )
}
"use client";

import { useActionState, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";

export default function UpdateClassForm({ initialState, updateActivity, id }) {
  const [state, formAction, isPending] = useActionState(updateActivity, initialState);

  // holds which fields are currently editable
  const [enabled, setEnabled] = useState(() => new Set());

  const toggleField = (fieldName) => {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(fieldName)) next.delete(fieldName);
      else next.add(fieldName);
      return next;
    });
  };

  const isEnabled = (fieldName) => enabled.has(fieldName);

  const inputClass = (fieldName) =>
    isEnabled(fieldName) ? "border rounded-[3rem] border-gray-500 mr-2 p-3 text-black" : "";

  return (
    <section className="mt-12">
      <form noValidate action={formAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="trainerId" value={state?.values?.trainer?.id ?? ""} />
        <input type="hidden" name="assetId" value={state?.values?.assetId ?? ""} />
        <div className="relative flex flex-col mb-6">
          <label className="font-semibold" htmlFor="name">Class Name:</label>
          <input
            id="name"
            type="text"
            name="className"
            placeholder="Class Name"
            readOnly={!isEnabled("className")}
            className={inputClass("className")}
            defaultValue={state?.values?.className ?? ""}
          />
          {state?.errors?.className && (
            <span className="error_response mt-2">{state.errors.className}</span>
          )}
           <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("className")}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>

        {/* classDescription */}
        <div className="relative flex flex-col mb-6">
          <label className="font-semibold" htmlFor="classDescription">Class Description:</label>
          <textarea
            id="classDescription"
            name="classDescription"
            placeholder="Class Description"
            readOnly={!isEnabled("classDescription")}
            className={inputClass("classDescription")}
            defaultValue={state?.values?.classDescription ?? ""}
          />
          {state?.errors?.classDescription && (
            <span className="error_response mt-2">{state.errors.classDescription}</span>
          )}
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("classDescription")}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="relative flex flex-col mb-6">
            <label className="font-semibold" htmlFor="classDay">Class Day:</label>
            <input
                id="classDay"
                type="text"
                name="classDay"
                placeholder="Class Day"
                readOnly={!isEnabled("classDay")}
                className={inputClass("classDay")}
                defaultValue={state?.values?.classDay ?? ""}
            />
            {state?.errors?.classDay && (
                <span className="error_response mt-2">{state.errors.classDay}</span>
            )}
            <button
                type="button"
                className="absolute right-0 top-0"
                onClick={() => toggleField("classDay")}
            >
                <MdOutlineModeEditOutline />
            </button>
            </div>
            <div className="relative flex flex-col mb-6">
          <label className="font-semibold" htmlFor="classTime">Class Time:</label>
          <input
            id="classTime"
            type="time"
            name="classTime"
            placeholder="Class Time"
            readOnly={!isEnabled("classTime")}
            className={inputClass("classTime")}
            defaultValue={state?.values?.classTime ?? ""}
          />
          {state?.errors?.classTime && (
            <span className="error_response mt-2">{state.errors.classTime}</span>
          )}
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("classTime")}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>
          </div>
        <div className="relative flex flex-col mb-6">
          <label className="font-semibold" htmlFor="maxParticipants">Max Participants:</label>
          <input
            id="maxParticipants"
            type="number"
            name="maxParticipants"
            placeholder="Max Participants"
            readOnly={!isEnabled("maxParticipants")}
            className={inputClass("maxParticipants")}
            defaultValue={state?.values?.maxParticipants ?? ""}
          />
          {state?.errors?.maxParticipants && (
            <span className="error_response mt-2">{state.errors.maxParticipants}</span>
          )}
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("maxParticipants")}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>
        
        {/* FILE (important: don't use defaultValue on file inputs) */}
        <div className="relative flex flex-col mb-6">
          <label htmlFor="file">Class Picture:</label>
          <input
            id="file"
            type="file"
            name="file"
            readOnly={!isEnabled("file")}
            className={inputClass("file")}
          />
          {state?.errors?.file && (
            <span className="error_response mt-2">{state.errors.file}</span>
          )}
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("file")}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>

        <button
          className="btn p-2 mt-4 bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm w-full"
          disabled={isPending}
          type="submit"
          
        >
          {isPending ? "Wait..." : "UPDATE CLASS"}
        </button>

        {state?.serverMessage?.error && (
          <span className="error_response mt-2">{state.serverMessage.error}</span>
        )}
      </form>
    </section>
  );
}
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResponseView() {
  const { responseId } = useParams();
  const navigate = useNavigate();

  const forms = JSON.parse(localStorage.getItem("forms")) || [];
  const responses = JSON.parse(localStorage.getItem("formResponses")) || [];

  const response = responses.find(
    (r) => String(r.id) === String(responseId)
  );
  if (!response)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EBF6F5]">
        <p className="text-[#1F2933] text-lg font-medium">
          Response not found ❌
        </p>
      </div>
    );

  const form = forms.find(
    (f) => String(f.formId) === String(response.formId)
  );
  if (!form)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EBF6F5]">
        <p className="text-[#1F2933] text-lg font-medium">
          Form not found ❌
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#EBF6F5] py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-md border border-[#5CBDB9]/20 p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2933]">
              {form.title}
            </h1>
            <p className="text-sm text-[#1F2933]/60 mt-1">
              Submitted on{" "}
              {new Date(response.submittedAt).toLocaleDateString("en-IN")}
            </p>
          </div>

          <div className="bg-[#FBE3E8] px-4 py-2 rounded-xl text-sm font-medium text-[#1F2933]">
            Response Details
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-6">
          {form.fields.map((field) => (
            <div
              key={field.id}
              className="bg-[#EBF6F5] rounded-2xl p-5 border border-[#5CBDB9]/10"
            >
              <label className="block text-sm font-semibold text-[#1F2933] mb-2">
                {field.label}
              </label>

              {["text", "email", "number", "phone"].includes(
                field.type
              ) && (
                <input
                  type={field.type === "phone" ? "tel" : field.type}
                  value={response.responses[field.id] || ""}
                  disabled
                  className="w-full bg-white border border-[#5CBDB9]/20 rounded-xl px-4 py-2 text-[#1F2933]"
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  value={response.responses[field.id] || ""}
                  disabled
                  className="w-full bg-white border border-[#5CBDB9]/20 rounded-xl px-4 py-2 text-[#1F2933]"
                />
              )}

              {field.type === "select" && (
                <select
                  value={response.responses[field.id] || ""}
                  disabled
                  className="w-full bg-white border border-[#5CBDB9]/20 rounded-xl px-4 py-2 text-[#1F2933]"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "radio" && (
                <div className="flex gap-6 flex-wrap">
                  {field.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-[#1F2933]"
                    >
                      <input
                        type="radio"
                        checked={response.responses[field.id] === opt}
                        disabled
                        className="accent-[#5CBDB9]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {field.type === "checkbox" && (
                <div className="flex gap-6 flex-wrap">
                  {field.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-[#1F2933]"
                    >
                      <input
                        type="checkbox"
                        checked={
                          response.responses[field.id]?.includes(opt)
                        }
                        disabled
                        className="accent-[#5CBDB9]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="mt-8 text-right">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#5CBDB9] text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

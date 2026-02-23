import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicForm() {
  const [formsFromLocalSt, setFormsFromLocalSt] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem("forms")) || [];
    if (Array.isArray(savedForms)) {
      setFormsFromLocalSt(savedForms);
    }
  }, []);

  // ✅ DIRECT DELETE (No Confirm)
  const handleDelete = (formId) => {
    const updatedForms = formsFromLocalSt.filter(
      (form) => form.formId !== formId
    );

    setFormsFromLocalSt(updatedForms);
    localStorage.setItem("forms", JSON.stringify(updatedForms));
  };

  return (
    <div className="min-h-screen bg-[#EBF6F5] px-6 py-10">

      <div>

      </div>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#1F2933]">
              Public Forms
            </h2>
            <p className="text-[#1F2933]/60 mt-1">
              Browse and access available forms
            </p>
          </div>

          <div className="bg-white px-5 py-2 rounded-xl shadow-sm border border-[#5CBDB9]/20">
            <span className="text-sm text-[#1F2933]/70">
              Total Forms:
            </span>
            <span className="ml-2 font-bold text-[#5CBDB9]">
              {formsFromLocalSt.length}
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        {formsFromLocalSt.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-[#5CBDB9]/20 p-10 text-center">
            <p className="text-[#1F2933]/60">
              No public forms available yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {formsFromLocalSt.map((form) => (
              <div
                key={form.formId}
                className="bg-white rounded-2xl border border-[#5CBDB9]/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
              >
                {/* Top Section */}
                <div>
                  <div className="w-10 h-10 bg-[#FBE3E8] rounded-lg flex items-center justify-center text-lg mb-4">
                    📝
                  </div>

                  <h3 className="text-lg font-semibold text-[#1F2933]">
                    {form.title || "Untitled Form"}
                  </h3>

                  <p className="text-sm text-[#1F2933]/60 mt-2 line-clamp-2">
                    {form.disc || "No description provided."}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs px-3 py-1 bg-[#EBF6F5] text-[#5CBDB9] rounded-full font-medium">
                    {form.fields?.length || 0} Fields
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/form/${form.formId}`)}
                      className="px-4 py-2 text-sm font-semibold bg-[#5CBDB9] text-white rounded-xl hover:opacity-90 transition"
                    >
                      Open
                    </button>

                    {/* <button
                      onClick={() => handleDelete(form.formId)}
                      className="px-4 py-2 text-sm font-semibold bg-[#FBE3E8] text-[#1F2933] rounded-xl hover:bg-[#FBE3E8]/70 transition"
                    >
                      Delete
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

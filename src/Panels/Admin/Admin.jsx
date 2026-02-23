import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const forms = JSON.parse(localStorage.getItem("forms")) || [];
  const responses = JSON.parse(localStorage.getItem("formResponses")) || [];

  const totalForms = forms.length;
  const totalResponses = responses.length;

  const stats = [
    { title: "Total Forms", value: totalForms },
    { title: "Total Responses", value: totalResponses },
  ];

  return (
    <div className="min-h-screen bg-[#EBF6F5] px-8 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-[#1F2933]">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Overview of forms and responses
          </p>
        </div>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

          {/* Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {stats.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[#EBF6F5] border border-[#5CBDB9]/20
                px-6 py-5 shadow-sm"
              >
                <p className="text-xs uppercase tracking-wide text-[#5CBDB9] font-semibold">
                  {item.title}
                </p>
                <h2 className="text-3xl font-bold text-[#1F2933] mt-1">
                  {item.value}
                </h2>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-[#EBF6F5] border border-[#5CBDB9]/20 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#1F2933] mb-5">
              Quick Actions
            </h2>

            <div className="flex flex-col gap-3">
              <button
                className="w-full py-3 rounded-xl
                bg-[#5CBDB9] text-white font-semibold
                hover:opacity-90 transition"
                onClick={() => navigate("/adminpanel/formbuilder")}
              >
                Create New Form
              </button>

              <button
                className="w-full py-3 rounded-xl
                bg-white text-[#1F2933] font-semibold
                hover:bg-[#DFF1EF] transition"
                onClick={() => navigate("/adminpanel/responses")}
              >
                View All Responses
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Recent Responses */}
          <div className="rounded-2xl bg-[#EBF6F5] border border-[#5CBDB9]/20 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-[#1F2933]">
                Recent Responses
              </h2>

              <button
                onClick={() => navigate("/adminpanel/responses")}
                className="text-sm font-medium text-[#5CBDB9] hover:underline"
              >
                View All
              </button>
            </div>

            {responses.length === 0 && (
              <p className="text-sm text-gray-500">No responses yet</p>
            )}

            <div className="space-y-3">
              {responses.slice(-5).reverse().map((resp) => {
                const form = forms.find(
                  (f) => String(f.formId) === String(resp.formId)
                );

                return (
                  <div
                    key={resp.id}
                    className="flex items-center justify-between
                    rounded-xl bg-white px-4 py-3"
                  >
                    <p className="text-sm font-medium text-[#1F2933]">
                      {form?.title || "Unknown Form"}
                    </p>

                    <span className="text-xs text-gray-600">
                      {new Date(resp.submittedAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Forms */}
          <div className="rounded-2xl bg-[#EBF6F5] border border-[#5CBDB9]/20 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-[#1F2933]">
                Recent Forms
              </h2>

              <button
                onClick={() => navigate("/adminpanel/forms")}
                className="text-sm font-medium text-[#5CBDB9] hover:underline"
              >
                View All
              </button>
            </div>

            {forms.length === 0 && (
              <p className="text-sm text-gray-500">No forms created yet</p>
            )}

            <div className="space-y-3">
              {forms.slice(-5).reverse().map((form) => (
                <div
                  key={form.formId}
                  className="flex items-center justify-between
                  rounded-xl bg-white px-4 py-3"
                >
                  <p className="text-sm font-medium text-[#1F2933]">
                    {form.title || "Untitled Form"}
                  </p>

                  <span className="text-xs text-gray-600">
                    {new Date(form.formId).toLocaleDateString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

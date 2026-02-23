import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Responses() {
  const forms = JSON.parse(localStorage.getItem("forms")) || [];
  const [responses, setResponses] = useState(
    JSON.parse(localStorage.getItem("formResponses")) || []
  );

  const deleteResponse = (responseId) => {
    const updated = responses.filter((r) => r.id !== responseId);
    setResponses(updated);
    localStorage.setItem("formResponses", JSON.stringify(updated));
  };

  const totalForms = forms.length;
  const totalResponses = responses.length;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EBF6F5] p-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2933]">Responses</h1>
        <p className="text-[#1F2933]/70 mt-1">
          View and manage form submissions from users.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Responses", value: totalResponses },
          { title: "Today Responses", value: totalResponses },
          { title: "This Week", value: totalResponses },
          { title: "Pending Review", value: 9 },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-md border border-[#5CBDB9]/20"
          >
            <p className="text-sm text-[#1F2933]/60">{card.title}</p>
            <h2 className="text-3xl font-bold text-[#5CBDB9] mt-2">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#5CBDB9]/20 overflow-hidden">
        {/* Table Header */}
        <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FBE3E8]/40">
          <h2 className="text-lg font-bold text-[#1F2933]">
            All Responses
          </h2>

          {/* <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search by name / email"
              className="w-full sm:w-64 border border-[#5CBDB9]/30 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#5CBDB9]"
            />

            <select className="border border-[#5CBDB9]/30 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#5CBDB9]">
              <option>All Forms</option>
              <option>Job Application</option>
              <option>Feedback</option>
              <option>Contact Form</option>
            </select>
          </div> */}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#EBF6F5]">
              <tr className="text-sm text-[#1F2933]/70">
                <th className="px-6 py-4 font-semibold">#</th>
                <th className="px-6 py-4 font-semibold">Form Name</th>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Submitted</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {responses.map((response, index) => {
                const form = forms.find(
                  (f) => String(f.formId) === String(response.formId)
                );
                if (!form) return null;

                const nameField = form.fields.find(
                  (f) => f.label.toLowerCase() === "full name"
                );
                const emailField = form.fields.find(
                  (f) => f.label.toLowerCase() === "email"
                );

                const name = nameField
                  ? response.responses[nameField.id]
                  : "-";
                const email = emailField
                  ? response.responses[emailField.id]
                  : "-";

                return (
                  <tr
                    key={response.id}
                    className="text-sm text-[#1F2933] hover:bg-[#EBF6F5] transition"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-semibold">
                      {form.title}
                    </td>
                    <td className="px-6 py-4">{name}</td>
                    <td className="px-6 py-4">{email}</td>
                    <td className="px-6 py-4 text-[#1F2933]/60">
                      {new Date(response.submittedAt).toLocaleDateString(
                        "en-IN"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(`/adminpanel/responses/view/${response.id}`)
                          }
                          className="px-4 py-2 rounded-xl bg-[#5CBDB9] text-white font-semibold hover:opacity-90 transition"
                        >
                          View
                        </button>

                        {/* <button className="px-4 py-2 rounded-xl bg-[#FBE3E8] text-[#1F2933] font-semibold hover:opacity-80 transition">
                          Download
                        </button> */}

                        <button
                          onClick={() => deleteResponse(response.id)}
                          className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t flex items-center justify-between bg-[#EBF6F5]">
          <p className="text-sm text-[#1F2933]/70">
            Showing {totalResponses} out of {totalResponses} results
          </p>
        </div>
      </div>
    </div>
  );
}

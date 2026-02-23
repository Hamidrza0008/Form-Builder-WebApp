import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PublicFormView() {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const allForms = JSON.parse(localStorage.getItem("forms")) || [];
    const foundForm = allForms.find((f) => String(f.formId) === formId);
    setForm(foundForm);
  }, [formId]);

  const handleChange = (fieldId, value) => {
    setResponses((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allResponses =
      JSON.parse(localStorage.getItem("formResponses")) || [];

    allResponses.push({
      id: Date.now(),
      formId,
      submittedAt: new Date().toISOString(),
      responses: responses,
    });

    localStorage.setItem("formResponses", JSON.stringify(allResponses));

    alert("Form submitted successfully ✅");
    navigate("/");
  };

  const renderField = (field) => {
    const baseInput =
      "w-full border border-[#5CBDB9]/40 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#5CBDB9] bg-white";

    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "phone":
        return (
          <input
            type={field.type === "phone" ? "tel" : field.type}
            placeholder={field.placeholder}
            required={field.required}
            className={baseInput}
            onChange={(e) =>
              handleChange(field.id, e.target.value)
            }
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder}
            required={field.required}
            className={baseInput}
            onChange={(e) =>
              handleChange(field.id, e.target.value)
            }
          />
        );

      case "select":
        return (
          <select
            required={field.required}
            className={baseInput}
            onChange={(e) =>
              handleChange(field.id, e.target.value)
            }
          >
            <option value="">Select</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="flex gap-6 flex-wrap">
            {field.options.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  required={field.required}
                  onChange={(e) =>
                    handleChange(field.id, e.target.value)
                  }
                />
                {opt}
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="flex gap-6 flex-wrap">
            {field.options.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={opt}
                  onChange={(e) => {
                    setResponses((prev) => {
                      const prevArr = prev[field.id] || [];
                      return {
                        ...prev,
                        [field.id]: e.target.checked
                          ? [...prevArr, opt]
                          : prevArr.filter((v) => v !== opt),
                      };
                    });
                  }}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (!form) {
    return (
      <div className="text-center mt-20 text-[#1F2933]/70">
        Form not found ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBF6F5] flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-[#5CBDB9]/20">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1F2933]">
            {form.title}
          </h2>
          <p className="text-[#1F2933]/60 mt-1">
            {form.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {form.fields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium mb-2 text-[#1F2933]">
                {field.label}
                {field.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              {renderField(field)}
            </div>
          ))}

          <button className="w-full bg-[#5CBDB9] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";

export default function FormBuilder() {
    const [forms, setForms] = useState([]);
    const [activeFormId, setActiveFormId] = useState(null);
    const [selectField, setSelectedField] = useState(null);
    const [showToast, setShowToast] = useState(false); // ✅ Success message के लिए state


    useEffect(() => {
        try {
            const savedForms = JSON.parse(localStorage.getItem("forms"));
            if (Array.isArray(savedForms)) {
                setForms(savedForms);
                console.log(forms)
            }
            else {
                setForms([]);
            }
        } catch (error) {
            console.error("Invalid forms data in localStorage", error);
            setForms([]);
        }

    }, [])

    useEffect(() => {
        if (forms.length > 0) {
            localStorage.setItem("forms", JSON.stringify(forms))
        }
    }, [forms])

    const activeForm = forms.find((form) => form.formId === activeFormId);



    const createForm = () => {
        const newForm = {
            formId: Date.now(),
            title: "",
            disc: "",
            fields: []
        };
        setForms((prev) => [...prev, newForm]);
        setActiveFormId(newForm.formId);
    };

    const updateFormMeta = (key, value) => {
        setForms((prevForms) =>
            prevForms.map((form) =>
                form.formId === activeFormId ? { ...form, [key]: value } : form
            )
        );
    };

    const addField = (type) => {
        const newField = {
            id: Date.now(),
            type,
            label: "Untitled Field",
            placeholder: "Enter details...",
            options:
                type === "radio" || type === "checkbox" || type === "select"
                    ? ["Option 1", "Option 2"]
                    : [],
            required: false,
        };

        setForms((prevForms) =>
            prevForms.map((form) =>
                form.formId === activeFormId
                    ? { ...form, fields: [...form.fields, newField] }
                    : form
            )
        );
    };

    const updateField = (id, key, value) => {
        setForms((prevForms) =>
            prevForms.map((form) =>
                form.formId !== activeFormId
                    ? form
                    : {
                        ...form,
                        fields: form.fields.map((field) =>
                            field.id === id ? { ...field, [key]: value } : field
                        ),
                    }
            )
        );

        setSelectedField((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const updateOptions = (fId, index, value) => {
        setForms((prevForms) =>
            prevForms.map((form) =>
                form.formId !== activeFormId
                    ? form
                    : {
                        ...form,
                        fields: form.fields.map((field) => {
                            if (field.id !== fId) return field;
                            const newOptions = [...field.options];
                            newOptions[index] = value;
                            return { ...field, options: newOptions };
                        }),
                    }
            )
        );

        setSelectedField((prev) => {
            const newOptions = [...prev.options];
            newOptions[index] = value;
            return { ...prev, options: newOptions };
        });
    };

    const addOptions = (id) => {
        setForms((prevForms) =>
            prevForms.map((form) =>
                form.formId !== activeFormId
                    ? form
                    : {
                        ...form,
                        fields: form.fields.map((field) =>
                            field.id === id
                                ? { ...field, options: [...field.options, "New Option"] }
                                : field
                        ),
                    }
            )
        );

        setSelectedField((prev) => ({
            ...prev,
            options: [...prev.options, "New Option"],
        }));
    };

    // ✅ Reset and Save Logic
    const saveForm = () => {
        console.log("Saved Forms:", forms);
        setActiveFormId(null);
        setSelectedField(null);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 2000);
    };

    return (
        <div className="p-6 bg-[#EBF6F5] min-h-screen font-sans text-[#1F2933]">

            {showToast && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[#5CBDB9] text-white px-6 py-3 rounded-2xl shadow-xl z-50 animate-bounce">
                    ✅ Form Saved Successfully!
                </div>
            )}

            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#1F2933] tracking-tight">
                        Form Builder
                    </h1>
                    <p className="text-[#1F2933]/60">
                        Create, customize and manage your forms
                    </p>
                </div>

                {!activeForm && (
                    <button
                        onClick={createForm}
                        className="bg-[#5CBDB9] hover:opacity-90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg"
                    >
                        + Create New Form
                    </button>
                )}
            </div>

            <div className="grid grid-cols-12 gap-6 h-[75vh]">

                {/* LEFT */}
                <div className="col-span-12 lg:col-span-3 bg-white border border-[#EBF6F5] rounded-3xl p-5 shadow-sm overflow-y-auto">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-[#5CBDB9] rounded-full"></span>
                        Fields
                    </h2>

                    {activeForm ? (
                        <div className="space-y-2">
                            {[
                                ["text", "Text Input"],
                                ["email", "Email"],
                                ["number", "Number"],
                                ["textarea", "Textarea"],
                                ["radio", "Radio Button"],
                                ["checkbox", "Checkbox"],
                                ["select", "Dropdown"],
                            ].map(([type, label]) => (
                                <button
                                    key={type}
                                    onClick={() => addField(type)}
                                    className="w-full px-4 py-3 bg-[#EBF6F5] hover:bg-[#FBE3E8] rounded-2xl font-medium transition-all text-left flex justify-between"
                                >
                                    {label}
                                    <span className="text-[#5CBDB9]">+</span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-[#1F2933]/50 text-sm">
                            Create a form to add fields
                        </div>
                    )}
                </div>

                {/* CENTER */}
                <div className="col-span-12 lg:col-span-6 bg-white border border-[#EBF6F5] rounded-3xl shadow-sm flex flex-col overflow-hidden">

                    <div className="p-5 border-b border-[#EBF6F5] flex justify-between items-center bg-white sticky top-0 z-10">
                        <h2 className="font-bold text-lg text-[#1F2933]">
                            Form Canvas
                        </h2>

                        {activeForm && (
                            <button
                                onClick={saveForm}
                                className="bg-[#5CBDB9] hover:opacity-90 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all"
                            >
                                Finish & Save
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">

                        {activeForm ? (
                            <>
                                <div className="space-y-3">
                                    <input
                                        value={activeForm.title}
                                        onChange={(e) => updateFormMeta("title", e.target.value)}
                                        placeholder="Give your form a title..."
                                        className="w-full text-2xl font-bold outline-none placeholder:text-[#1F2933]/30"
                                    />
                                    <input
                                        value={activeForm.disc}
                                        onChange={(e) => updateFormMeta("disc", e.target.value)}
                                        placeholder="Add a description..."
                                        className="w-full text-[#1F2933]/70 outline-none placeholder:text-[#1F2933]/30"
                                    />
                                </div>

                                <div className="pt-4 border-t border-[#EBF6F5]">
                                    {activeForm.fields.length === 0 && (
                                        <div className="text-center py-20 border-2 border-dashed border-[#EBF6F5] rounded-3xl text-[#1F2933]/50">
                                            Click on fields to add them here
                                        </div>
                                    )}

                                    {activeForm.fields.map((field) => (
                                        <div
                                            key={field.id}
                                            onClick={() => setSelectedField(field)}
                                            className={`mb-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectField?.id === field.id
                                                    ? "border-[#5CBDB9] bg-[#EBF6F5]"
                                                    : "border-transparent bg-[#FBE3E8]/40 hover:bg-[#FBE3E8]/70"
                                                }`}
                                        >
                                            <label className="block font-bold text-sm mb-2 uppercase tracking-wider">
                                                {field.label}
                                                {field.required && (
                                                    <span className="text-red-500"> *</span>
                                                )}
                                            </label>

                                            {(field.type === "text" ||
                                                field.type === "email" ||
                                                field.type === "number") && (
                                                    <input
                                                        disabled
                                                        placeholder={field.placeholder}
                                                        className="w-full bg-white border border-[#EBF6F5] rounded-xl px-4 py-3"
                                                    />
                                                )}

                                            {field.type === "textarea" && (
                                                <textarea
                                                    disabled
                                                    placeholder={field.placeholder}
                                                    className="w-full bg-white border border-[#EBF6F5] rounded-xl px-4 py-3 h-24"
                                                />
                                            )}

                                            {(field.type === "radio" ||
                                                field.type === "checkbox") && (
                                                    <div className="space-y-2">
                                                        {field.options.map((opt, i) => (
                                                            <label key={i} className="flex gap-3 items-center text-[#1F2933]/80">
                                                                <input type={field.type} disabled className="accent-[#5CBDB9]" />
                                                                {opt}
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}

                                            {field.type === "select" && (
                                                <select
                                                    disabled
                                                    className="w-full bg-white border border-[#EBF6F5] rounded-xl px-4 py-3"
                                                >
                                                    {field.options.map((opt, i) => (
                                                        <option key={i}>{opt}</option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-[#1F2933]/60">
                                <div className="w-20 h-20 bg-[#FBE3E8] rounded-full flex items-center justify-center text-3xl">
                                    📝
                                </div>
                                <h3 className="text-xl font-bold">No Active Form</h3>
                                <p className="max-w-xs">
                                    Start by creating a new form to begin the building process.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="col-span-12 lg:col-span-3 bg-white border border-[#EBF6F5] rounded-3xl p-5 shadow-sm overflow-y-auto">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-[#5CBDB9] rounded-full"></span>
                        Settings
                    </h2>

                    {selectField ? (
                        <div className="space-y-5">

                            <div>
                                <label className="text-xs font-bold uppercase mb-1 block text-[#1F2933]/60">
                                    Field Label
                                </label>
                                <input
                                    value={selectField.label}
                                    onChange={(e) => updateField(selectField.id, "label", e.target.value)}
                                    className="w-full border border-[#EBF6F5] rounded-xl px-4 py-3 focus:ring-2 ring-[#5CBDB9]/30 outline-none"
                                />
                            </div>

                            {["text", "email", "number", "textarea"].includes(selectField.type) && (
                                <div>
                                    <label className="text-xs font-bold uppercase mb-1 block text-[#1F2933]/60">
                                        Placeholder
                                    </label>
                                    <input
                                        value={selectField.placeholder}
                                        onChange={(e) => updateField(selectField.id, "placeholder", e.target.value)}
                                        className="w-full border border-[#EBF6F5] rounded-xl px-4 py-3 focus:ring-2 ring-[#5CBDB9]/30 outline-none"
                                    />
                                </div>
                            )}

                            <label className="flex justify-between items-center bg-[#EBF6F5] rounded-xl px-4 py-3 cursor-pointer">
                                <span className="font-medium">Required Field</span>
                                <input
                                    type="checkbox"
                                    checked={selectField.required}
                                    onChange={(e) => updateField(selectField.id, "required", e.target.checked)}
                                    className="w-5 h-5 accent-[#5CBDB9]"
                                />
                            </label>

                            {["radio", "checkbox", "select"].includes(selectField.type) && (
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase block text-[#1F2933]/60">
                                        Options
                                    </label>

                                    {selectField.options.map((opt, i) => (
                                        <input
                                            key={i}
                                            value={opt}
                                            onChange={(e) => updateOptions(selectField.id, i, e.target.value)}
                                            className="w-full border border-[#EBF6F5] rounded-xl px-3 py-2 text-sm focus:ring-2 ring-[#5CBDB9]/30 outline-none"
                                        />
                                    ))}

                                    <button
                                        onClick={() => addOptions(selectField.id)}
                                        className="w-full py-2 border-2 border-dashed border-[#5CBDB9] text-[#5CBDB9] rounded-xl text-sm font-bold hover:bg-[#EBF6F5] transition-all"
                                    >
                                        + Add New Option
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-[#1F2933]/50 text-sm">
                            Select a field on the canvas to edit its properties
                        </div>
                    )}
                </div>

            </div>
        </div>


    );
}
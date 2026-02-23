import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

        if (adminId === "admin" && password === "0008") {
            localStorage.setItem("isAdmin", "true");
            navigate("/adminpanel");
            window.location.reload(); // 👈 ye add karo
        }
        else {
            alert("Invalid Id or Password");
        }
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EBF6F5] px-4">
            <div className="bg-white w-96 p-8 rounded-2xl shadow-lg border border-[#5CBDB9]/20">
                <h2 className="text-2xl font-bold text-center text-[#1F2933] mb-6">
                    Admin Login
                </h2>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Admin ID"
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5CBDB9]"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5CBDB9]"
                    />

                    <button
                        onClick={handleLogin}
                        className="mt-4 py-2 bg-[#5CBDB9] text-white font-semibold rounded-xl hover:opacity-90 transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-gray-500 hover:text-black mt-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
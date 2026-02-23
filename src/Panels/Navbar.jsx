import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  let navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus === "true") {
      setIsAdmin(true)
    }
  },[])

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/")
  }

  return (
    <nav className="fixed top-0 z-50 w-full h-16 bg-white shadow-sm border-b border-teal-100 px-8 flex items-center justify-between">

      {/* Logo */}
      <div className="text-2xl font-bold text-teal-600 tracking-wide">
        HR Forms
      </div>

      {isAdmin ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-xl"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-[#5CBDB9] text-white rounded-xl"
        >
          Login
        </button>
      )}


    </nav>
  );
};

export default Navbar;
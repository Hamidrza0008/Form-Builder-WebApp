import { HashRouter, Routes, Route } from "react-router-dom";
import PublicForm from "./Panels/Public/Public";
import Navbar from "./Panels/Navbar";
import AdminPage from "./Panels/Admin/AdminPage";
import PublicFormView from "./Panels/Admin/PublicFormView";
import Login from "./Panels/Login";
function App() {
  return (
    <div className="h-screen flex flex-col">
      
      {/* Fixed Navbar */}
      <Navbar />

      {/* Scrollable Content */}
      <div className="flex-1 mt-16 overflow-y-auto bg-gray-50">
        <Routes>
          <Route path="/" element={<PublicForm />} />
          <Route path="form/:formId" element={<PublicFormView />} />
          <Route path="/adminpanel/*" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
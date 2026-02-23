import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./Admin";
import FormBuilder from "./Formbuilder";
import Responses from "./Response";
import Sidebar from "./Sidebar";
import PublicForm from "../Public/Public";
import PublicFormView from "./PublicFormView";
import Forms from "./Forms";
import ResponseView from "./responseView";

const AdminPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Fixed Sidebar */}
      <div className="w-64 fixed left-0 top-16 h-[calc(100vh-4rem)]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-2 rounded-2xl ">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="formbuilder" element={<FormBuilder />} />
          <Route path="responses" element={<Responses />} />
          <Route path="forms" element={<Forms />} />
          {/* <Route path="form/:formId" element={<PublicFormView />} /> */}
          <Route path="responses/view/:responseId" element={<ResponseView />} />
        </Routes>
      </div>

    </div>
  );
};

export default AdminPage;
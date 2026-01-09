import { BrowserRouter, Route, Routes } from "react-router-dom";

/* ================= PUBLIC ================= */
import CompanyRegistration from "./pages/auth/CompanyRegistration";
import Login from "./pages/Login";

/* ================= SECURITY ================= */
import ProtectedRoute from "./security/ProtectedRoute";

/* ================= ADMIN ================= */
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

import AddEmployee from "./pages/admin/employees/add/AddEmployee";
import ManagesEmployee from "./pages/admin/employees/manage/ManageEmployee";
import ViewEmployee from "./pages/admin/employees/manage/ViewEmployee";
import UpdateEmployee from "./pages/admin/employees/update/UpdateEmployee";

import AddTask from "./pages/admin/project/AddTask";
import ManageTask from "./pages/admin/project/ManageTask";
import Project from "./pages/admin/project/Project";

import AddCustomer from "./pages/admin/customer/AddCustomer";
import AllTicket from "./pages/admin/customer/AllTicket";
import PermissionSettings from "./pages/admin/settings/PermissionSettings";
import AllTickets from "./pages/admin/Support/AllTicktes";

/* ================= CUSTOMER ================= */
import AddProject from "./pages/admin/customer/AddProject";
import CustomerDashboard from "./pages/admin/customer/CustomerDashboard";
import CustomerLayout from "./pages/admin/customer/CustomerLayout";
import RaiseTicket from "./pages/admin/customer/RaiseTicket";

/* ================= SHARED CHAT ================= */
import AddQuery from "./pages/admin/customer/AddQuery";
import Chats from "./pages/admin/customer/Chats";
import ManageQuery from "./pages/admin/customer/ManageQuery";
import Query from "./pages/admin/customer/QueryCustomer";
import ListQuery from "./pages/admin/customer/QueryList";

/* ================= EMPLOYEE ================= */
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========== PUBLIC ROUTES ========== */}
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CompanyRegistration />} />

        {/* ========== ADMIN ROUTES ========== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="employees/manage" element={<ManagesEmployee />} />
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="employees/update/:id" element={<UpdateEmployee />} />
          <Route path="employees/view/:id" element={<ViewEmployee />} />

          <Route path="project/project/:id" element={<Project />} />
          <Route path="project/addTask/:id" element={<AddTask />} />
          <Route path="project/manageTask" element={<ManageTask />} />

          <Route path="customer/addCustomer" element={<AddCustomer />} />
         <Route path="tickets" element={<AllTickets />} />
         <Route path="settings" element={<PermissionSettings />} />
         <Route path="query" element={<Query/>}/>
         <Route path="manageQuery" element={<ManageQuery/>}/>
         <Route path="query/:id" element={<AddQuery/>}/>
         <Route path="list/:id" element={<ListQuery/>}/>

        </Route>

        {/* ========== CUSTOMER ROUTES ========== */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute role="CUSTOMER">
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="raise-ticket" element={<RaiseTicket />} />
          <Route path="tickets" element={<AllTicket />} />
         

        </Route>

        {/* ========== EMPLOYEE ROUTES ========== */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* ========== SHARED CHAT (ADMIN + CUSTOMER + SUPPORT + EMPLOYEE) ========== */}
        <Route
          path="/chats/:ticketId"
          element={
            <ProtectedRoute role={["ADMIN", "CUSTOMER", "SUPPORT", "EMPLOYEE"]}>
              <Chats />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

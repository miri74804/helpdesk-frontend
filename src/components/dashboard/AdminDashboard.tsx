import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";


const AdminDashboard = () => {



  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard
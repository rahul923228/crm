import { Outlet } from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar";

export default function CustomerLayout() {
  return (
    <div style={{ display: "flex" }}>
      <CustomerSidebar />

      <div style={{ flex: 1, padding: "20px", background: "#f4f6f8" }}>
        <Outlet />
      </div>
    </div>
  );
}

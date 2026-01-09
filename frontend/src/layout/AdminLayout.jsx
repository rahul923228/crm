import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);

  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleComingSoon = () => {
    alert("This module is under development 🚧");
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Welcome {userName}</h2>

        <nav>
          <div style={styles.navItem} onClick={() => navigate("/admin")}>
            Dashboard
          </div>

          <div
            style={styles.navItem}
            onClick={() => navigate("/admin/customer/addCustomer")}
          >
            Clients
          </div>

          {/* EMPLOYEES */}
          <div
            style={styles.navItem}
            onClick={() => setEmployeeOpen(!employeeOpen)}
          >
            Employees {employeeOpen ? "▲" : "▼"}
          </div>

          {employeeOpen && (
            <div style={styles.subMenu}>
              <div
                style={styles.subItem}
                onClick={() => navigate("/admin/employees/manage")}
              >
                Manage Employee
              </div>
              <div
                style={styles.subItem}
                onClick={() => navigate("/admin/employees/add")}
              >
                Add Employee
              </div>
            </div>
          )}

          {/* PROJECTS */}
          <div
            style={styles.navItem}
            onClick={() => setProjectOpen(!projectOpen)}
          >
            Projects {projectOpen ? "▲" : "▼"}
          </div>

          {projectOpen && (
            <div style={styles.subMenu}>
              <div
                style={styles.subItem}
                onClick={() => navigate(`/admin/project/addTask/${userId}`)}
              >
                Add Task
              </div>
              <div
                style={styles.subItem}
                onClick={() => navigate("/admin/project/manageTask")}
              >
                Manage Task
              </div>
            </div>
          )}

          {/* FUTURE MODULES */}
          <div style={styles.disabledNavItem} onClick={handleComingSoon}>
            Attendance (Coming Soon)
          </div>

          <div style={styles.disabledNavItem} onClick={handleComingSoon}>
            Sales (Coming Soon)
          </div>

          <div style={styles.disabledNavItem} onClick={handleComingSoon}>
            Settings (Coming Soon)
          </div>

          {/* CUSTOMER QUERY */}
          <div
            style={styles.navItem}
            onClick={() => setCustomerOpen(!customerOpen)}
          >
            Customer Query {customerOpen ? "▲" : "▼"}
          </div>

          {customerOpen && (
            <div style={styles.subMenu}>
              <div
                style={styles.subItem}
                onClick={() => navigate("/admin/query")}
              >
                Add Customer
              </div>
              <div
                style={styles.subItem}
                onClick={() => navigate("/admin/manageQuery")}
              >
                Manage Customer
              </div>
            </div>
          )}

          <div
            style={styles.navItem}
            onClick={() => navigate("/admin/tickets")}
          >
            Customer Support
          </div>
        </nav>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        <header style={styles.header} />
        <div style={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
  },
  sidebar: {
    width: 240,
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    textAlign: "center",
    marginBottom: 30,
  },
  navItem: {
    padding: "12px 15px",
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  disabledNavItem: {
    padding: "12px 15px",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.03)",
    color: "#94a3b8",
    cursor: "not-allowed",
    fontSize: 14,
  },
  subMenu: {
    marginLeft: 15,
    marginBottom: 10,
  },
  subItem: {
    padding: "10px 15px",
    borderRadius: 6,
    cursor: "pointer",
    marginBottom: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    fontSize: 14,
  },
  logoutBtn: {
    marginTop: "auto",
    padding: 10,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: 60,
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  content: {
    padding: 20,
  },
};

import axios from "axios";
import { useEffect, useState } from "react";

/* ===== ROLE → PERMISSION MAP ===== */
const ROLE_PERMISSIONS = {
  ADMIN: {
    viewTickets: true,
    replyTickets: true,
    closeTickets: true,
    viewProjects: true,
    addTasks: true,
    viewCustomers: true,
  },
  SUPPORT: {
    viewTickets: true,
    replyTickets: true,
    closeTickets: false,
    viewProjects: false,
    addTasks: false,
    viewCustomers: false,
  },
  SALES: {
    viewTickets: false,
    replyTickets: false,
    closeTickets: false,
    viewProjects: true,
    addTasks: false,
    viewCustomers: true,
  },
};

export default function PermissionSettings() {
  const token = localStorage.getItem("token");

  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState(0);
  const [role, setRole] = useState("SUPPORT");
  const [permissions, setPermissions] = useState(
    ROLE_PERMISSIONS.SUPPORT
  );

  /* ============ FETCH EMPLOYEES ============ */
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8080/api/emp/getBasic", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        setEmployees(list);
      })
      .catch(() => alert("Failed to load employees"));
  }, [token]);

  /* ============ AUTO LOAD PERMISSION ON EMP SELECT ============ */
  useEffect(() => {
    if (!empId || !token) return;

    axios
      .get(`http://localhost:8080/api/per/get/${empId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        const data = res.data;

        setRole(data.layout);
        setPermissions({
          viewTickets: data.viewTickets,
          replyTickets: data.replyTickets,
          closeTickets: data.closeTickets,
          viewProjects: data.viewProjects,
          addTasks: data.addTasks,
          viewCustomers: data.viewCustomers,
        });
      })
      .catch(() => {
        // Agar permission set nahi hai to role-based default
        setRole("SUPPORT");
        setPermissions(ROLE_PERMISSIONS.SUPPORT);
      });
  }, [empId, token]);

  /* ============ ROLE CHANGE ============ */
  const changeRole = (r) => {
    setRole(r);
    setPermissions(ROLE_PERMISSIONS[r]);
  };

  /* ============ TOGGLE PERMISSION ============ */
  const toggle = (key) => {
    if (role === "ADMIN") return;

    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* ============ SAVE PERMISSIONS ============ */
  const savePermissions = async () => {
    if (!empId) {
      alert("Please select employee");
      return;
    }

    const payload = {
      layout: role,
      viewTickets: permissions.viewTickets,
      replyTickets: permissions.replyTickets,
      closeTickets: permissions.closeTickets,
      viewProjects: permissions.viewProjects,
      addTasks: permissions.addTasks,
      viewCustomers: permissions.viewCustomers,
    };

    try {
      await axios.post(
        `http://localhost:8080/api/permition/save/${empId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Permissions saved successfully");
    } catch {
      alert("Failed to save permissions");
    }
  };

  /* ============ UI ============ */
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Permission Settings</h2>

        {/* EMPLOYEE */}
        <label style={styles.label}>Employee</label>
        <select
          style={styles.select}
          value={empId}
          onChange={e => setEmpId(Number(e.target.value))}
        >
          <option value={0}>Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.userName}
            </option>
          ))}
        </select>

        {/* ROLE */}
        <div style={styles.roleBox}>
          {["ADMIN", "SUPPORT", "SALES"].map(r => (
            <button
              key={r}
              onClick={() => changeRole(r)}
              style={{
                ...styles.roleBtn,
                background: role === r ? "#2a5298" : "#e4e8f0",
                color: role === r ? "#fff" : "#333",
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* PERMISSIONS */}
        <div style={styles.permissionBox}>
          {Object.entries(permissions).map(([key, value]) => (
            <div key={key} style={styles.permissionRow}>
              <span>{key}</span>
              <input
                type="checkbox"
                checked={value}
                disabled={role === "ADMIN"}
                onChange={() => toggle(key)}
              />
            </div>
          ))}
        </div>

        <button style={styles.saveBtn} onClick={savePermissions}>
          Save Permissions
        </button>
      </div>
    </div>
  );
}

/* ============ STYLES ============ */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#1e3c72,#2a5298)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 420,
    background: "#fff",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(0,0,0,.2)",
  },
  heading: {
    textAlign: "center",
    marginBottom: 20,
    color: "#2a5298",
  },
  label: {
    fontWeight: 600,
    marginBottom: 6,
    display: "block",
  },
  select: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginBottom: 15,
  },
  roleBox: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  roleBtn: {
    flex: 1,
    padding: 10,
    margin: "0 4px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
  permissionBox: {
    background: "#f5f7fb",
    padding: 15,
    borderRadius: 8,
  },
  permissionRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    fontSize: 14,
  },
  saveBtn: {
    width: "100%",
    marginTop: 20,
    padding: 12,
    border: "none",
    borderRadius: 8,
    background: "#2a5298",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
  },
};

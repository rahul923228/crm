import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/employees", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (e) {
      alert("Employees load nahi hue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
        <h2>Employees</h2>
        <button style={styles.btnAdd}>Add Employee</button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>{emp.active ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    style={styles.btnPrimary}
                    onClick={() => navigate(`/admin/employees/${emp.id}`)}
                  >
                    Manage
                  </button>

                  <button
                    style={styles.btnEdit}
                    onClick={() => alert("Edit " + emp.id)}
                  >
                    Edit
                  </button>

                  <button
                    style={styles.btnDelete}
                    onClick={() => alert("Delete " + emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff"
  },
  btnAdd: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#0f766e",
    color: "#fff",
    cursor: "pointer"
  },
  btnPrimary: {
    padding: "6px 10px",
    marginRight: 6,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff"
  },
  btnEdit: {
    padding: "6px 10px",
    marginRight: 6,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#16a34a",
    color: "#fff"
  },
  btnDelete: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#dc2626",
    color: "#fff"
  }
};

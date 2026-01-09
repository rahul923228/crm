import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // 🔹 NEW STATES (ONLY ADDITION)
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  // Fetch employees
  const fetchEmployees = () => {
    axios.get("http://localhost:8080/api/emp/all")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Update
  const handleUpdate = (id) => {
    navigate(`/admin/employees/update/${id}`);
  };

  // 🔹 DELETE → OPEN STATUS MODAL
  const handleDelete = (id) => {
    setSelectedEmployeeId(id);
    setShowStatusModal(true);
  };

  // 🔹 CONFIRM STATUS CHANGE
  const confirmStatusChange = async () => {
    if (!selectedStatus) {
      alert("Please select status");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/emp/delete/${selectedEmployeeId}`,
        { employee_status: selectedStatus }
      );
      alert("Employee status updated");
      setShowStatusModal(false);
      setSelectedStatus("");
      fetchEmployees();
    } catch (err) {
      alert("Status update failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Employees</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
             <th style={styles.th}>employee_status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.basic.id} style={styles.tr}>
              <td style={styles.td}>{emp.basic.id}</td>
              <td style={styles.td}>{emp.basic.userName}</td>
              <td style={styles.td}>{emp.basic.email}</td>
               <td style={styles.td}>{emp.basic.employee_status}</td>

              <td style={styles.td}>
                <button
                  style={styles.updateBtn}
                  onClick={() => handleUpdate(emp.basic.id)}
                >
                  Update
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(emp.basic.id)}
                >
                  INACTIVE / ACTIVE
                </button>

                <button
                  style={styles.viewBtn}
                  onClick={() =>
                    navigate(`/admin/employees/view/${emp.basic.id}`)
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 STATUS MODAL */}
      {showStatusModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3>Change Employee Status</h3>

            <select
              style={styles.input}
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>

            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button style={styles.updateBtn} onClick={confirmStatusChange}>
                Confirm
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => setShowStatusModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  th: { border: "1px solid #ddd", padding: 8, background: "#f3f4f6" },
  td: { border: "1px solid #ddd", padding: 8, textAlign: "center" },
  tr: { borderBottom: "1px solid #ddd" },

  updateBtn: {
    marginRight: 10,
    padding: "5px 10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },

  deleteBtn: {
    marginRight: 10,
    padding: "5px 10px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },

  viewBtn: {
    padding: "5px 10px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },

  input: {
    padding: 8,
    borderRadius: 5,
    border: "1px solid #ccc",
    width: "100%"
  }
};

const modalStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#fff",
    padding: 25,
    borderRadius: 8,
    width: 300
  }
};

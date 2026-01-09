import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const customerId = localStorage.getItem("customerId");
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "Customer";

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!customerId) {
      setError("Customer ID not found. Please login again.");
      setLoading(false);
      return;
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/getTask/${customerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* ===== TOP CARD ===== */}
      <div style={styles.topCard}>
        <div>
          <h2 style={styles.heading}>Welcome, {userName}</h2>
          <p style={styles.subText}>Here is an overview of your projects</p>
        </div>

        <div style={styles.actions}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/customer/add-project")}
          >
            + Add Project
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/customer/raise-ticket")}
          >
            + Raise Ticket
          </button>
        </div>
      </div>

      {/* ===== STATES ===== */}
      {loading && <p style={styles.info}>Loading projects...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* ===== PROJECT TABLE ===== */}
      {!loading && projects.length > 0 && (
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Project Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Budget</th>
                <th>Deadline</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.id}
                  style={styles.row}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#2563eb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#e5e7eb")
                  }
                >
                {/* <td  style={{ ...styles.td, ...styles.leftTd }}>{p.id}</td> */}
                  <td style={{ ...styles.td, fontWeight: 600 }}>{p.name}</td>
                  <td style={styles.td}>{p.type}</td>
                  <td style={{ ...styles.td, ...styles.desc }}>
                    {p.description}
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        background:
                          p.priority === "HIGH"
                            ? "#dc2626"
                            : p.priority === "MEDIUM"
                            ? "#f59e0b"
                            : "#16a34a",
                      }}
                    >
                      {p.priority}
                    </span>
                  </td>
                  <td style={styles.td}>₹ {p.budget || "-"}</td>
                  <td style={{ ...styles.td, ...styles.rightTd }}>{p.deadline || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div style={styles.emptyBox}>
          <h3>No Projects Found</h3>
          <p>Create your first project to get started.</p>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: 30,
    minHeight: "100vh",
    background: "#f1f5f9",
  },

  topCard: {
    background: "linear-gradient(to right, #2563eb, #1d4ed8)",
    padding: 24,
    borderRadius: 16,
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    boxShadow: "0 10px 25px rgba(37,99,235,0.4)",
  },
  leftTd: {
  borderLeft: "1px solid #e5e7eb",
  borderTopLeftRadius: 14,
  borderBottomLeftRadius: 14,
},

rightTd: {
  borderRight: "1px solid #e5e7eb",
  borderTopRightRadius: 14,
  borderBottomRightRadius: 14,
},


  heading: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
  },

  subText: {
    marginTop: 6,
    fontSize: 14,
    color: "#e0e7ff",
  },

  actions: {
    display: "flex",
    gap: 12,
  },

  primaryBtn: {
    padding: "10px 16px",
    background: "#ffffff",
    color: "#1e40af",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "10px 16px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
  },

  tableCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 18,
    boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 12px", // row spacing
  },

  // row: {
  //   border: "1px solid #e5e7eb",
  //   borderRadius: 14,
  //   transition: "0.2s ease",
  //   background: "#ffffff",
  // },

 td: {
  padding: "16px 18px",
  fontSize: 14,
  background: "#ffffff",
  borderTop: "1px solid #e5e7eb",
  borderBottom: "1px solid #e5e7eb",
},


  desc: {
    maxWidth: 260,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  badge: {
    padding: "4px 12px",
    borderRadius: 14,
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
  },

  emptyBox: {
    background: "#fff",
    padding: 40,
    borderRadius: 14,
    textAlign: "center",
    marginTop: 20,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },

  error: {
    color: "#dc2626",
    marginBottom: 10,
  },

  info: {
    color: "#475569",
  },
};

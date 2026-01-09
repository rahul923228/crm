import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const navigate = useNavigate();

  const [project, setProject] = useState({
    name: "",
    type: "",
    description: "",
    deadline: "",
    budget: "",
    priority: "MEDIUM",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const customerId = localStorage.getItem("customerId");
      const token = localStorage.getItem("token");

      if (!customerId || !token) {
        alert("Customer not logged in");
        return;
      }

      const res = await axios.post(
        `http://localhost:8080/api/addTask/${customerId}`,
        project,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("projectId", res.data.id);
      navigate("/customer/dashboard");
    } catch (err) {
      console.error(err);
      alert("Project creation failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* ===== HEADER ===== */}
        <div style={styles.header}>
          <h2 style={styles.title}>Create New Project</h2>
          <p style={styles.subtitle}>
            Provide your project requirements. Our team will review and proceed.
          </p>
        </div>

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Project Name */}
          <div style={styles.field}>
            <label style={styles.label}>Project Name</label>
            <input
              style={styles.input}
              placeholder="e.g. CRM Web Application"
              value={project.name}
              onChange={(e) =>
                setProject({ ...project, name: e.target.value })
              }
              required
            />
          </div>

          {/* Project Type */}
          <div style={styles.field}>
            <label style={styles.label}>Project Type</label>
            <select
              style={styles.input}
              value={project.type}
              onChange={(e) =>
                setProject({ ...project, type: e.target.value })
              }
              required
            >
              <option value="">Select project type</option>
              <option value="WEB">Web Application</option>
              <option value="MOBILE">Mobile Application</option>
            </select>
          </div>

          {/* Description */}
          <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
            <label style={styles.label}>Project Description</label>
            <textarea
              style={styles.textarea}
              placeholder="Describe your project in detail"
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              required
            />
          </div>

          {/* Deadline */}
          <div style={styles.field}>
            <label style={styles.label}>Expected Deadline</label>
            <input
              type="date"
              style={styles.input}
              value={project.deadline}
              onChange={(e) =>
                setProject({ ...project, deadline: e.target.value })
              }
            />
          </div>

          {/* Budget */}
          <div style={styles.field}>
            <label style={styles.label}>Estimated Budget (₹)</label>
            <input
              type="number"
              style={styles.input}
              placeholder="Optional"
              value={project.budget}
              onChange={(e) =>
                setProject({ ...project, budget: e.target.value })
              }
            />
          </div>

          {/* Priority */}
          <div style={styles.field}>
            <label style={styles.label}>Priority</label>
            <select
              style={{
                ...styles.input,
                background:
                  project.priority === "HIGH"
                    ? "#fee2e2"
                    : project.priority === "MEDIUM"
                    ? "#fef3c7"
                    : "#dcfce7",
              }}
              value={project.priority}
              onChange={(e) =>
                setProject({ ...project, priority: e.target.value })
              }
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          {/* ACTION BUTTONS */}
          <div style={styles.actions}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn}>
              Submit Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
    display: "flex",
    justifyContent: "center",
    padding: 40,
  },
  card: {
    width: "100%",
    maxWidth: 900,
    background: "#ffffff",
    borderRadius: 16,
    padding: 30,
    boxShadow: "0 25px 45px rgba(0,0,0,0.15)",
  },
  header: {
    background: "linear-gradient(to right, #2563eb, #1d4ed8)",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    color: "#ffffff",
  },
  title: {
    margin: 0,
    fontSize: 22,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    opacity: 0.9,
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    fontWeight: 600,
    color: "#374151",
  },
  input: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: 14,
  },
  textarea: {
    minHeight: 120,
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    resize: "vertical",
    fontSize: 14,
  },
  actions: {
    gridColumn: "1 / -1",
    display: "flex",
    justifyContent: "flex-end",
    gap: 14,
    marginTop: 10,
  },
  cancelBtn: {
    padding: "12px 20px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    background: "#f9fafb",
    cursor: "pointer",
    fontWeight: 500,
  },
  submitBtn: {
    padding: "12px 24px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(to right, #2563eb, #1e40af)",
    color: "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
  },
};

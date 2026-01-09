import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RaiseTicket() {
  const navigate = useNavigate();

  const customerId = localStorage.getItem("customerId");
  const customerName = localStorage.getItem("customerName") || "";
  const token = localStorage.getItem("token");
  const senderName = localStorage.getItem("userName"); // login user

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [ticket, setTicket] = useState({
    project_id: "",
    projectName: "",
    customerName: customerName,
    title: "",
    description: "",
    priority: "MEDIUM",
  });

  /* ================= LOAD PROJECTS ================= */
  useEffect(() => {
    if (!customerId || !token || !senderName) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/getTask/${customerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticket.project_id) {
      alert("Please select a project");
      return;
    }

    try {
      setSubmitting(true);

      // 1️⃣ Create ticket
      const res = await axios.post(
        `http://localhost:8080/api/addTicket/${customerId}/${ticket.project_id}`,
        ticket,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const ticketId = res.data?.id;
      if (!ticketId) {
        alert("Ticket created but ID not returned");
        return;
      }

      // 2️⃣ Send title as chat
      await axios.post(
        `http://localhost:8080/api/upload/${ticketId}`,
        new URLSearchParams({
          message: `Title: ${ticket.title}`,
          senderName: senderName
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 3️⃣ Send description as chat
      await axios.post(
        `http://localhost:8080/api/upload/${ticketId}`,
        new URLSearchParams({
          message: `Description: ${ticket.description}`,
          senderName: senderName
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await axios.post(
      `http://localhost:8080/api/upload/${ticketId}`,
      new URLSearchParams({
        message: "Our team will contact you in 10 minutes",
        senderName: "System"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      }
    );

      navigate(`/chats/${ticketId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to raise ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Raise Support Ticket</h2>
          <p style={styles.subtitle}>
            Select a project and describe the issue
          </p>
        </div>

        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Project */}
            <div style={styles.field}>
              <label style={styles.label}>Project</label>
              <select
                value={ticket.project_id}
                onChange={(e) => {
                  const projectId = e.target.value;
                  const selectedProject = projects.find(
                    (p) => String(p.id) === projectId
                  );
                  setTicket({
                    ...ticket,
                    project_id: projectId,
                    projectName: selectedProject?.name || "",
                  });
                }}
                style={styles.input}
                required
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div style={styles.field}>
              <label style={styles.label}>Issue Title</label>
              <input
                name="title"
                value={ticket.title}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Description */}
            <div style={styles.field}>
              <label style={styles.label}>Issue Description</label>
              <textarea
                name="description"
                value={ticket.description}
                onChange={handleChange}
                style={styles.textarea}
                required
              />
            </div>

            {/* Priority */}
            <div style={styles.field}>
              <label style={styles.label}>Priority</label>
              <select
                name="priority"
                value={ticket.priority}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            {/* Actions */}
            <div style={styles.actions}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={styles.submitBtn}
              >
                {submitting ? "Creating..." : "Create & Open Chat"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    display: "flex",
    justifyContent: "center",
    padding: 40,
  },
  card: {
    width: "100%",
    maxWidth: 720,
    background: "#fff",
    borderRadius: 16,
    padding: 30,
    boxShadow: "0 25px 45px rgba(0,0,0,0.2)",
  },
  header: {
    background: "linear-gradient(to right, #2563eb, #1d4ed8)",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    color: "#fff",
  },
  title: { margin: 0, fontSize: 22 },
  subtitle: { marginTop: 6, fontSize: 14, opacity: 0.9 },
  form: { display: "flex", flexDirection: "column", gap: 18 },
  field: { display: "flex", flexDirection: "column" },
  label: { fontSize: 13, marginBottom: 6, fontWeight: 600 },
  input: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 14,
  },
  textarea: {
    minHeight: 120,
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 14,
  },
  cancelBtn: {
    padding: "12px 20px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    background: "#f9fafb",
    cursor: "pointer",
  },
  submitBtn: {
    padding: "12px 24px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(to right, #2563eb, #1e40af)",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};

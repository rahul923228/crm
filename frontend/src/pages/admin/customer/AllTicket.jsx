import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllTicket() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/allTicket",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTickets(res.data || []);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>💬 Support Inbox</h2>

        {tickets.map(t => (
          <div
            key={t.id}
            style={styles.row}
            onClick={() => navigate(`/chats/${t.id}`)}
          >
            <div style={styles.left}>
              <div style={styles.title}>
                {t.title || t.description}
              </div>

              <div style={styles.meta}>
                <span style={styles.badge}>{t.priority}</span>
                <span style={styles.date}>
                  {new Date(t.createdTicket).toLocaleString()}
                </span>
              </div>
            </div>

            <div style={styles.arrow}>➜</div>
          </div>
        ))}

        {tickets.length === 0 && (
          <p style={styles.empty}>No tickets found</p>
        )}
      </div>
    </div>
  );
}
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3a8a, #0f172a)",
    padding: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },

  container: {
    width: "100%",
    maxWidth: 900,
    background: "#ffffff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
  },

  heading: {
    marginBottom: 20,
    color: "#1e3a8a",
    fontWeight: 700
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 18px",
    marginBottom: 12,
    borderRadius: 12,
    background: "linear-gradient(to right, #f8fafc, #eef2ff)",
    cursor: "pointer",
    transition: "all 0.25s ease",
    border: "1px solid #e5e7eb"
  },

  left: {
    display: "flex",
    flexDirection: "column",
    gap: 6
  },

  title: {
    fontSize: 16,
    fontWeight: 600,
    color: "#0f172a"
  },

  meta: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },

  badge: {
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    background: "#2563eb",
    color: "#fff"
  },

  date: {
    fontSize: 12,
    color: "#64748b"
  },

  arrow: {
    fontSize: 20,
    color: "#2563eb",
    fontWeight: 700
  },

  empty: {
    textAlign: "center",
    color: "#64748b",
    marginTop: 40
  }
};

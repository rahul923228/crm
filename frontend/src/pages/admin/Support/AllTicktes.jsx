import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/allTicket",
        authHeader
      );
      setTickets(res.data ?? []);
    } catch (err) {
      console.error("Ticket fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Support Inbox</h2>

      {loading && <p>Loading tickets...</p>}

      {!loading && tickets.length === 0 && (
        <p style={styles.empty}>No tickets available</p>
      )}

      {tickets.map((t) => (
        <div
          key={t.id}
          style={styles.card}
          onClick={() => navigate(`/chats/${t.id}`)}
        >
          <div style={{ flex: 1 }}>
            <div style={styles.title}>
              #{t.id} — {t.title}
            </div>

            <div style={styles.row}>
              <span>
                <strong>Customer:</strong> {t.customerName ?? "N/A"}
              </span>
              <span>
                <strong>Project:</strong> {t.projectName ?? "N/A"}
              </span>
              <span>
                <strong>Status:</strong> {t.status ?? "N/A"}
              </span>
            </div>

            <div style={styles.meta}>
              <span style={styles.badge}>{t.priority}</span>
              <span style={styles.date}>
                {new Date(t.createdTicket).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    background: "#fff",
    padding: 24,
    borderRadius: 14,
    maxWidth: 900,
  },
  heading: {
    fontWeight: 700,
    marginBottom: 16,
    color: "#1e3a8a",
  },
  card: {
    display: "flex",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
  },
  title: {
    fontWeight: 700,
    marginBottom: 6,
  },
  row: {
    display: "flex",
    gap: 20,
    fontSize: 13,
    marginBottom: 6,
  },
  meta: {
    display: "flex",
    gap: 12,
    fontSize: 12,
    alignItems: "center",
  },
  badge: {
    background: "#2563eb",
    color: "#fff",
    padding: "3px 10px",
    borderRadius: 20,
  },
  date: {
    color: "#64748b",
  },
  empty: {
    textAlign: "center",
    color: "#64748b",
    marginTop: 30,
  },
};

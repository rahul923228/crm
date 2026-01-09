import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [empId, setEmpId] = useState(null);
  const [empName, setEmpName] = useState("");
  const [loading, setLoading] = useState(true);

  const [myTasks, setMyTasks] = useState([]);
  const [mySupports, setMySupports] = useState([]);

  /* ================= EMP BASIC ================= */
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/api/emp/all/${userId}`)
      .then(res => {
        setEmpId(res.data.basic.id);
        setEmpName(res.data.basic.userName);
        setLoading(false);
      })
      .catch(() => navigate("/login"));
  }, [userId, navigate]);

  /* ================= UPDATE TASK STATUS ================= */
  const updateTaskStatus = async (taskId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/task/${taskId}/status?status=${status}`
      );

      setMyTasks(prev =>
        prev.map(t =>
          t.id === taskId ? { ...t, status } : t
        )
      );
    } catch {
      alert("Status update failed");
    }
  };

  /* ================= LOAD TASKS ================= */
  useEffect(() => {
    if (!empId) return;

    const loadTasks = async () => {
      const res = await axios.get("http://localhost:8080/api/getAllTask");

      const assigned = [];
      for (const task of res.data) {
        const a = await axios.get(
          `http://localhost:8080/api/getAsignTask/${task.id}`
        );

        if (a.data.some(x => x.emp_id === empId)) {
          assigned.push(task);
        }
      }
      setMyTasks(assigned);
    };

    loadTasks();
  }, [empId]);

  /* ================= LOAD SUPPORT ================= */
  useEffect(() => {
    if (!empId) return;

    const loadSupport = async () => {
      const res = await axios.get("http://localhost:8080/api/allTicket");
      const assigned = [];

      for (const t of res.data) {
        const s = await axios.get(`http://localhost:8080/api/getSupport/${t.id}`);
        if (s.data.some(x => x.emp_id === empId)) {
          assigned.push(t);
        }
      }

      setMySupports(assigned);
    };

    loadSupport();
  }, [empId]);

  /* ================= UPDATE SUPPORT STATUS ================= */
  const updateSupportStatus = async (ticketId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/update/${ticketId}/status?status=${status}`
      );

      setMySupports(prev =>
        prev.map(t =>
          t.id === ticketId ? { ...t, status } : t
        )
      );
    } catch {
      alert("Support status update failed");
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  // Separate active and completed tasks
  const activeTasks = myTasks.filter(t => t.status !== "COMPLETED");
  const completedTasks = myTasks.filter(t => t.status === "COMPLETED");

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>Employee Panel</h2>
        <p>👋 {empName}</p>

        <button
          style={styles.logout}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <h1>Dashboard</h1>

        {/* SUMMARY */}
        <div style={styles.summary}>
          <div style={{ ...styles.card, background: "#3b82f6" }}>
            <h2>{activeTasks.length}</h2>
            <p>My Tasks</p>
          </div>
          <div style={{ ...styles.card, background: "#22c55e" }}>
            <h2>{mySupports.length}</h2>
            <p>My Support</p>
          </div>
        </div>

        {/* ACTIVE TASKS */}
        <div style={styles.section}>
          <h3>🎯 My Tasks</h3>
          {activeTasks.length === 0 && <p style={styles.muted}>No active tasks</p>}

          {activeTasks.map(task => (
            <div key={task.id} style={styles.taskCard}>
              <div style={{ flex: 1 }}>
                <h4>{task.name}</h4>
                <p style={styles.desc}>{task.description}</p>
                <small>
                  📅 Deadline: {task.deadline} | 🕒 Created: {task.createdAt?.slice(0, 10)}
                </small>
              </div>

              <select
                value={task.status}
                onChange={e => updateTaskStatus(task.id, e.target.value)}
                style={{
                  ...styles.statusSelect,
                  background:
                    task.status === "TODO"
                      ? "#fb923c"
                      : task.status === "IN_PROGRESS"
                      ? "#3b82f6"
                      : "#22c55e"
                }}
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
          ))}
        </div>

        {/* COMPLETED TASKS */}
        {completedTasks.length > 0 && (
          <div style={styles.section}>
            <h3>✅ Completed Tasks</h3>
            {completedTasks.map(task => (
              <div key={task.id} style={styles.taskCard}>
                <div style={{ flex: 1 }}>
                  <h4>{task.name}</h4>
                  <p style={styles.desc}>{task.description}</p>
                  <small>
                    📅 Deadline: {task.deadline} | 🕒 Created: {task.createdAt?.slice(0, 10)}
                  </small>
                </div>
                <button
                  style={styles.completedBtn}
                  onClick={() => alert(`Task ${task.name} details`)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}

        {/* SUPPORT */}
        <div style={styles.section}>
          <h3>🎧 My Support</h3>
          {mySupports.length === 0 && <p style={styles.muted}>No support assigned</p>}

          {mySupports.map(s => (
            <div key={s.id} style={styles.supportCard}>
              <div style={{ flex: 1 }}>
                <b>{s.title}</b>
                <p style={styles.muted}>Customer: {s.customerName}</p>
              </div>

              <select
                value={s.status}
                onChange={e => updateSupportStatus(s.id, e.target.value)}
                style={{
                  ...styles.statusSelect,
                  background:
                    s.status === "OPEN"
                      ? "#fb923c"
                      : s.status === "IN_PROGRESS"
                      ? "#3b82f6"
                      : "#22c55e"
                }}
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>

              <button
                style={styles.chatBtn}
                onClick={() => navigate(`/chats/${s.id}`)}
              >
                Open Chat
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial"
  },
  sidebar: {
    width: 240,
    background: "#020617",
    color: "#fff",
    padding: 20
  },
  logout: {
    marginTop: 30,
    padding: 10,
    width: "100%",
    background: "#dc2626",
    border: "none",
    color: "#fff",
    borderRadius: 6
  },
  main: {
    flex: 1,
    padding: 30,
    background: "#f1f5f9",
    overflowY: "auto"
  },
  summary: {
    display: "flex",
    gap: 20,
    marginBottom: 30
  },
  card: {
    flex: 1,
    color: "#fff",
    padding: 20,
    borderRadius: 14
  },
  section: {
    background: "#fff",
    padding: 20,
    borderRadius: 14,
    marginBottom: 25
  },
  taskCard: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    background: "#f8fafc"
  },
  supportCard: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    background: "#f8fafc"
  },
  desc: {
    fontSize: 14,
    color: "#475569"
  },
  muted: {
    color: "#64748b",
    fontSize: 13
  },
  statusSelect: {
    padding: "6px 10px",
    borderRadius: 8,
    color: "#fff",
    border: "none",
    fontWeight: 600,
    fontSize: 13,
    width: 150,
    height: 36,
    cursor: "pointer"
  },
  chatBtn: {
    padding: "8px 14px",
    background: "#22c55e",
    border: "none",
    color: "#fff",
    borderRadius: 8
  },
  completedBtn: {
    padding: "8px 14px",
    background: "#64748b",
    border: "none",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer"
  },
  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18
  }
};

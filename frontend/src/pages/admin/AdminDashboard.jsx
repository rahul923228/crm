import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [queryCustomers, setQueryCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= ASSIGN MODAL ================= */
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [assignType, setAssignType] = useState("");
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const hasQueryAlert = queryCustomers.some(c => c.hasTodayFollowup);


  /* ================= HELPERS ================= */
  const isToday = (dt) => {
    if (!dt) return false;
    const d = new Date(dt);
    const t = new Date();
    return (
      d.getDate() === t.getDate() &&
      d.getMonth() === t.getMonth() &&
      d.getFullYear() === t.getFullYear()
    );
  };

  /* ================= FETCH DATA ================= */
  const loadDashboardData = async () => {
    try {
      const [
        clientRes,
        taskRes,
        ticketRes,
        empRes,
        queryCustRes
      ] = await Promise.all([
        axios.get("http://localhost:8080/api/allCustomer"),
        axios.get("http://localhost:8080/api/getAllTask"),
        axios.get("http://localhost:8080/api/allTicket"),
        axios.get("http://localhost:8080/api/emp/all"),
        axios.get("http://localhost:8080/api/getNewCustomer"),
      ]);

      const customersWithAlert = await Promise.all(
        (queryCustRes.data || []).map(async (c) => {
          try {
            const qRes = await axios.get(
              `http://localhost:8080/api/getQuery/${c.id}`
            );
            return {
              ...c,
              hasTodayFollowup: qRes.data?.some(q =>
                isToday(q.next_followup)
              )
            };
          } catch {
            return { ...c, hasTodayFollowup: false };
          }
        })
      );

      setClients(clientRes.data || []);
      setTasks(taskRes.data || []);
      setTickets(ticketRes.data || []);
      setEmployees(empRes.data || []);
      setQueryCustomers(customersWithAlert);
    } catch (e) {
      alert("Dashboard load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  /* ================= UTILS ================= */
  const getCustomerName = (id) =>
    clients.find(c => c.id === id)?.customerName || "N/A";

  const getEmployeeName = (id) =>
    employees.find(e => e.basic?.id === id)?.basic?.userName || `EMP-${id}`;

  /* ================= ASSIGN VIEW ================= */
  const openAssignView = async (item, type) => {
  try {
    setSelectedItem(item);
    setAssignType(type);
    setShowAssignModal(true);

    let url = "";

    if (type === "TASK") {
      url = `http://localhost:8080/api/getAsignTask/${item.id}`;
    } else {
      // 🔴 IMPORTANT: customerId + ticketId
      const customerId = item.customerId || item.customer_id;
      url = `http://localhost:8080/api/getSupport/${customerId}/${item.id}`;
    }

    const res = await axios.get(url);
    setAssignedEmployees(res.data.map(r => r.emp_id));
  } catch (err) {
    console.error(err);
    alert("Assigned employee fetch failed");
  }
};

  if (loading) return <p>Loading...</p>;

  const activeTasks = tasks.filter(t => t.status !== "COMPLETED");
  const completedTasks = tasks.filter(t => t.status === "COMPLETED");

  /* ================= UI ================= */
  return (
    <div className="dashboard">
      {/* TOOLBAR */}
      <div className="toolbar">
        <button className="btnTask"
          onClick={() => document.getElementById("taskSection")?.scrollIntoView({ behavior: "smooth" })}>
          Assign Task
        </button>

        <button className="btnSupport"
          onClick={() => document.getElementById("supportSection")?.scrollIntoView({ behavior: "smooth" })}>
          Assign Support
        </button>

        <button
  className={`btnQuery ${hasQueryAlert ? "alertBtn" : ""}`}
  onClick={() =>
    document.getElementById("querySection")
      ?.scrollIntoView({ behavior: "smooth" })
  }
>
  Query Customer
  {hasQueryAlert && <span className="alertDot">!</span>}
</button>
      </div>

      <h2 className="title">Admin Dashboard</h2>

      {/* SUMMARY */}
      <div className="cards">
        <div className="card blue"><h4>Total Clients</h4><p>{clients.length}</p></div>
        <div className="card purple"><h4>Total Tasks</h4><p>{tasks.length}</p></div>
        <div className="card green"><h4>Completed</h4><p>{completedTasks.length}</p></div>
        <div className="card orange"><h4>Pending</h4><p>{activeTasks.length}</p></div>
      </div>

      {/* ACTIVE TASKS */}
      <div className="box" id="taskSection">
        <h3>Tasks (Active)</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th><th>Customer</th><th>Priority</th><th>Status</th><th>Assigned</th>
            </tr>
          </thead>
          <tbody>
            {activeTasks.map(t => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{getCustomerName(t.customer_id)}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>
                  <button className="assignBtn" onClick={() => openAssignView(t, "TASK")}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TICKETS */}
      <div className="box" id="supportSection">
        <h3>Tickets</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th><th>Customer</th><th>Project</th>
              <th>Priority</th><th>Status</th><th>Assigned</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.customerName}</td>
                <td>{t.projectName}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>
                  <button className="assignBtn" onClick={() => openAssignView(t, "TICKET")}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* QUERY CUSTOMERS */}
      <div className="box" id="querySection">
        <h3>Customer Queries</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Mobile</th><th>Email</th>
              <th>Status</th><th>Alert</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {queryCustomers
              .filter(c => c.status?.toLowerCase() === "active")
              .map(c => (
                <tr key={c.id} className={c.hasTodayFollowup ? "row-alert" : ""}>
                  <td>{c.name}</td>
                  <td>{c.number}</td>
                  <td>{c.email}</td>
                  <td>{c.status}</td>
                  <td>
                    {c.hasTodayFollowup && (
                      <span className="followup-alert">Follow-up Today</span>
                    )}
                  </td>
                  <td>
                   <button
  className="assignBtn"
  onClick={() =>
    navigate(`/admin/list/${c.id}`, {
      state: { customerName: c.name }
    })
  }
>
  View Queries
</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ASSIGN MODAL */}
      {showAssignModal && selectedItem && (
        <div className="modal">
          <div className="modalBox">
            <h3>{assignType === "TASK" ? selectedItem.name : selectedItem.title}</h3>

            {assignedEmployees.length === 0 ? (
              <p className="noAssign">No employee assigned</p>
            ) : (
              assignedEmployees.map(id => (
                <div key={id} className="tickRow">
                  ✔ {getEmployeeName(id)}
                </div>
              ))
            )}

            <button className="closeBtn" onClick={() => setShowAssignModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* CSS (SAME UI AS FIRST DASHBOARD) */}
      <style>{`
        .dashboard{padding:25px;background:#f4f6f8;min-height:100vh;font-family:Arial}
        .toolbar{display:flex;gap:15px;margin-bottom:20px}
        .btnTask{background:#2563eb;color:#fff;padding:10px 18px;border:none;border-radius:8px}
        .btnSupport{background:#16a34a;color:#fff;padding:10px 18px;border:none;border-radius:8px}
        .btnQuery{background:#7c3aed;color:#fff;padding:10px 18px;border:none;border-radius:8px}
        .title{margin-bottom:20px}
        .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:15px;margin-bottom:30px}
        .card{background:#fff;padding:20px;border-radius:10px;box-shadow:0 5px 15px rgba(0,0,0,.1)}
        .blue{border-left:5px solid #2563eb}
        .purple{border-left:5px solid #7c3aed}
        .green{border-left:5px solid #16a34a}
        .orange{border-left:5px solid #ea580c}
        .box{background:#fff;padding:20px;border-radius:10px;margin-bottom:30px;box-shadow:0 5px 15px rgba(0,0,0,.1)}
        table{width:100%;border-collapse:collapse}
        th,td{padding:12px;border-bottom:1px solid #ddd}
        th{background:#f1f5f9}
        .assignBtn{background:#7c3aed;color:#fff;padding:6px 12px;border:none;border-radius:6px}
        .row-alert{background:#fff1f2}
        .followup-alert{background:#fee2e2;color:#b91c1c;padding:4px 8px;border-radius:6px;font-size:12px;font-weight:700}
        .modal{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;justify-content:center;align-items:center}
        .modalBox{background:#fff;padding:25px;width:360px;border-radius:12px}
        .tickRow{background:#ecfdf5;padding:8px;border-radius:6px;margin-bottom:6px}
        .noAssign{color:#ef4444;font-weight:bold}
        .btnQuery {
  position: relative;
}

.alertDot {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  background: #dc2626;
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alertBtn {
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.4);
}

        .closeBtn{margin-top:15px;background:#ef4444;color:#fff;border:none;padding:8px 14px;border-radius:6px}
      `}</style>
    </div>
  );
}

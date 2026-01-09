import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== ASSIGN VIEW STATES ===== */
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [assignType, setAssignType] = useState(""); // TASK | TICKET
  const [assignedEmployees, setAssignedEmployees] = useState([]);

  /* ================= FETCH DASHBOARD DATA ================= */
  const loadDashboardData = async () => {
    try {
      const [clientRes, taskRes, ticketRes, empRes] = await Promise.all([
        axios.get("http://localhost:8080/api/allCustomer"),
        axios.get("http://localhost:8080/api/getAllTask"),
        axios.get("http://localhost:8080/api/allTicket"),
        axios.get("http://localhost:8080/api/emp/all"),
      ]);

      setClients(clientRes.data || []);
      setTasks(taskRes.data || []);
      setTickets(ticketRes.data || []);
      setEmployees(empRes.data || []);
    } catch (err) {
      console.error(err);
      alert("Dashboard load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const getCustomerName = (customerId) => {
    const customer = clients.find((c) => c.id === customerId);
    return customer ? customer.customerName : "N/A";
  };

  const getEmployeeName = (empId) => {
    const emp = employees.find(e => e.basic?.id === empId);
    return emp ? emp.basic.userName : `EMP-${empId}`;
  };

  /* ================= OPEN ASSIGN VIEW ================= */
  const openAssignView = async (item, type) => {
    try {
      setSelectedItem(item);
      setAssignType(type);
      setShowAssignModal(true);

      const url =
        type === "TASK"
          ? `http://localhost:8080/api/getAsignTask/${item.id}`
          : `http://localhost:8080/api/getSupport/${item.id}`;

      const res = await axios.get(url);
      setAssignedEmployees(res.data.map((r) => r.emp_id));
    } catch (err) {
      console.error(err);
      alert("Assigned employee fetch failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  // Separate tasks by status
  const activeTasks = tasks.filter(t => t.status !== "COMPLETED");
  const completedTasks = tasks.filter(t => t.status === "COMPLETED");

  return (
    <div className="dashboard">
      {/* ================= TOP TOOLBAR ================= */}
      <div className="toolbar">
        <button
          className="btnTask"
          onClick={() =>
            document.getElementById("taskSection")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Assign Task
        </button>

        <button
          className="btnSupport"
          onClick={() =>
            document.getElementById("supportSection")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Assign Support
        </button>
      </div>

      <h2 className="title">Admin Dashboard</h2>

      {/* ================= SUMMARY ================= */}
      <div className="cards">
        <div className="card blue">
          <h4>Total Clients</h4>
          <p>{clients.length}</p>
        </div>
        <div className="card purple">
          <h4>Total Tasks</h4>
          <p>{tasks.length}</p>
        </div>
        <div className="card green">
          <h4>Completed</h4>
          <p>{completedTasks.length}</p>
        </div>
        <div className="card orange">
          <h4>Pending</h4>
          <p>{activeTasks.length}</p>
        </div>
      </div>

      {/* ================= ACTIVE TASKS ================= */}
      <div className="box" id="taskSection">
        <h3>Tasks (Active)</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Customer</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned</th>
            </tr>
          </thead>
          <tbody>
            {activeTasks.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{getCustomerName(t.customer_id)}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>
                  <button
                    className="assignBtn"
                    onClick={() => openAssignView(t, "TASK")}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= COMPLETED TASKS ================= */}
      {completedTasks.length > 0 && (
        <div className="box">
          <h3>✅ Completed Tasks</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Customer</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{getCustomerName(t.customer_id)}</td>
                  <td>{t.priority}</td>
                  <td>{t.status}</td>
                  <td>
                    <button
                      className="assignBtn"
                      onClick={() => openAssignView(t, "TASK")}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= TICKET LIST ================= */}
      <div className="box" id="supportSection">
        <h3>Tickets</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Customer</th>
              <th>Project</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned Support</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.customerName}</td>
                <td>{t.projectName}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>
                  <button
                    className="assignBtn"
                    onClick={() => openAssignView(t, "TICKET")}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CLIENT LIST ================= */}
      <div className="box">
        <h3>Clients</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>{c.customerName}</td>
                <td>{c.number}</td>
                <td>{c.status || "ACTIVE"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ASSIGN MODAL ================= */}
      {showAssignModal && selectedItem && (
        <div className="modal">
          <div className="modalBox">
            <h3>{assignType === "TASK" ? selectedItem.name : selectedItem.title}</h3>

            <p className="subTitle">Assigned Employees</p>

            {assignedEmployees.length === 0 ? (
              <p className="noAssign">No employee assigned</p>
            ) : (
              assignedEmployees.map((id) => (
                <div key={id} className="tickRow">
                  <span className="tick">✔</span>
                  Employee NAME : {getEmployeeName(id)}
                </div>
              ))
            )}

            <button
              className="closeBtn"
              onClick={() => setShowAssignModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= STYLE ================= */}
      <style>{`
        /* same as your existing CSS */
        .dashboard { padding: 25px; background: #f4f6f8; min-height: 100vh; font-family: Arial; }
        .toolbar { display: flex; gap: 15px; margin-bottom: 20px; }
        .btnTask { background: #2563eb; color: white; padding: 10px 18px; border: none; border-radius: 8px; cursor: pointer; }
        .btnSupport { background: #16a34a; color: white; padding: 10px 18px; border: none; border-radius: 8px; cursor: pointer; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .blue { border-left: 5px solid #2563eb; }
        .purple { border-left: 5px solid #7c3aed; }
        .green { border-left: 5px solid #16a34a; }
        .orange { border-left: 5px solid #ea580c; }
        .box { background: white; padding: 20px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 12px; border-bottom: 1px solid #ddd; }
        th { background: #f1f5f9; }
        .assignBtn { background: #7c3aed; color: white; padding: 6px 12px; border-radius: 6px; border: none; cursor: pointer; }
        .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
        .modalBox { background: white; padding: 25px; width: 360px; border-radius: 12px; }
        .subTitle { font-weight: bold; margin: 15px 0; }
        .tickRow { background: #ecfdf5; padding: 8px; border-radius: 6px; margin-bottom: 6px; display: flex; gap: 10px; align-items: center; }
        .tick { color: #16a34a; font-weight: bold; }
        .noAssign { color: #ef4444; font-weight: bold; }
        .closeBtn { margin-top: 15px; background: #ef4444; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; }
      `}</style>
    </div>
  );
}

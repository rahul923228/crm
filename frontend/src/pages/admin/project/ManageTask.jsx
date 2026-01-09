import axios from "axios";
import { useEffect, useState } from "react";

const ManageTasks = () => {

  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedEmpIds, setSelectedEmpIds] = useState([]);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /* ================= FETCH TASKS ================= */
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/getAllTask");
      setTasks(res.data);
    } catch (err) {
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH EMPLOYEES ================= */
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/emp/all");
      setEmployees(res.data);
    } catch (err) {
      alert("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  /* ================= DELETE ================= */
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await axios.delete(`http://localhost:8080/api/task/${id}`);
    fetchTasks();
  };

  /* ================= STATUS UPDATE ================= */
  const updateStatus = async (taskId, status) => {
  await axios.put(
    `http://localhost:8080/api/task/${taskId}/status`,
    null,
    { params: { status } }
  );

  if (status === "COMPLETED") {
    // 🔥 remove row from UI
    setTasks(prev => prev.filter(t => t.id !== taskId));
  } else {
    // normal update
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId ? { ...t, status } : t
      )
    );
  }
};

  /* ================= ASSIGN ================= */
  const assignEmployee = (taskId) => {
    setSelectedTaskId(taskId);
    setSelectedEmpIds([]);
    setSuccessMsg("");
    setErrorMsg("");
    setShowAssignModal(true);
  };

  const submitAssign = async () => {
    if (selectedEmpIds.length === 0) {
      setErrorMsg("Please select at least one employee");
      setSuccessMsg("");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/task/${selectedTaskId}`,
        selectedEmpIds
      );

      setSuccessMsg("Task assigned successfully");
      setErrorMsg("");

      setTimeout(() => {
        setShowAssignModal(false);
        setSuccessMsg("");
      }, 1500);

    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to assign task");
      setSuccessMsg("");
    }
  };

  return (
    <>
      <div className="manage-page">
        <h2 className="page-title">Manage Tasks</h2>
        <p className="page-subtitle">All tasks with actions</p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.name}</td>

                    <td>
                      <span className={`badge ${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </td>

                    <td>
                      <select
                        className="status-select"
                        value={task.status || "OPEN"}
                        onChange={(e) =>
                          updateStatus(task.id, e.target.value)
                        }
                      >
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </td>

                    <td>{task.deadline}</td>

                    <td className="actions">
                      <button
                        className="btn assign"
                        onClick={() => assignEmployee(task.id)}
                      >
                        Assign
                      </button>

                      <button
                        className="btn delete"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= ASSIGN MODAL ================= */}
      {showAssignModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Assign Employees</h3>

            {successMsg && <div className="msg success">{successMsg}</div>}
            {errorMsg && <div className="msg error">{errorMsg}</div>}

            <div className="emp-list">
              {employees.map(emp => (
                <label key={emp.basic.id} className="emp-item">
                  <input
                    type="checkbox"
                    checked={selectedEmpIds.includes(emp.basic.id)}
                    onChange={(e) => {
                      const id = emp.basic.id;
                      setSelectedEmpIds(prev =>
                        e.target.checked
                          ? [...prev, id]
                          : prev.filter(x => x !== id)
                      );
                    }}
                  />
                  {emp.basic.userName}
                </label>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn assign" onClick={submitAssign}>
                Assign
              </button>
              <button
                className="btn delete"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CSS ================= */}
      <style>{`
        .manage-page {
          padding: 30px;
          background: #f4f6f8;
          min-height: 100vh;
          font-family: Arial;
        }

        .page-title { font-size: 22px; font-weight: 600; }
        .page-subtitle { color: #666; margin-bottom: 20px; }

        .table-wrapper {
          background: white;
          border-radius: 8px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
        }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 14px; border-bottom: 1px solid #e5e7eb; }
        th { background: #f1f5f9; }

        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
        }

        .badge.high { background: #dc2626; }
        .badge.medium { background: #f59e0b; }
        .badge.low { background: #16a34a; }

        .actions { display: flex; gap: 8px; }

        .btn {
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }

        .btn.assign { background: #dcfce7; color: #166534; }
        .btn.delete { background: #fee2e2; color: #991b1b; }

        .status-select { padding: 6px; border-radius: 6px; }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          background: white;
          padding: 20px;
          width: 320px;
          border-radius: 8px;
        }

        .emp-list {
          max-height: 160px;
          overflow-y: auto;
          margin-top: 10px;
        }

        .emp-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0;
          font-weight: 600;
        }

        .modal-actions {
          margin-top: 15px;
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .msg {
          padding: 10px;
          border-radius: 6px;
          margin: 10px 0;
          font-weight: 600;
          font-size: 14px;
        }

        .msg.success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #86efac;
        }

        .msg.error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }
      `}</style>
    </>
  );
};

export default ManageTasks;

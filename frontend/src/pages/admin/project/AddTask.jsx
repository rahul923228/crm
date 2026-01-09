import axios from "axios";
import { useState } from "react";

const AddTask = () => {

  const userId = localStorage.getItem("id");

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "OPEN",
    dueDate: "",
    assignedBy: localStorage.getItem("userName") || "Admin",
    userId: userId
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔴 VERY IMPORTANT

    console.log("Submitting payload:", task);

    if (!task.title || !task.dueDate) {
      alert("Title and Due Date are required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:8080/api/addTask/${userId}/${1}`,
        task,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API RESPONSE:", response.data);
      alert("Task created successfully");

      setTask({
        title: "",
        description: "",
        priority: "MEDIUM",
        status: "OPEN",
        dueDate: "",
        assignedBy: task.assignedBy,
        userId: userId,
        remark:""
      });

    } catch (error) {
      console.error("API ERROR:", error);
      alert("API call failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="task-page">
        <div className="task-card">

          <h2 className="page-title">Create Task</h2>
          <p className="page-subtitle">
            Create task first. Assignment will be done later.
          </p>

          <form onSubmit={handleSubmit}>

            <label>Task Title *</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />

            <label>Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
            />

            <div className="row">
              <div>
                <label>Priority</label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                >
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>

             
            </div>

            <label>Due Date *</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
            />

             <label>Remark</label>
            <textarea
              name="remark"
              value={task.remark}
              onChange={handleChange}
              placeholder="......"
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Task"}
            </button>

          </form>
        </div>
      </div>

      {/* 🔽 CSS IN SAME FILE 🔽 */}
      <style>{`
        .task-page {
          min-height: 100vh;
          background: #f4f6f8;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
        }

        .task-card {
          background: #ffffff;
          width: 100%;
          max-width: 700px;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .page-title {
          margin: 0;
          font-size: 22px;
          font-weight: 600;
        }

        .page-subtitle {
          margin-bottom: 20px;
          color: #666;
          font-size: 14px;
        }

        label {
          display: block;
          margin: 15px 0 6px;
          font-weight: 600;
          font-size: 14px;
        }

        input,
        textarea,
        select {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        textarea {
          resize: vertical;
        }

        .row {
          display: flex;
          gap: 20px;
        }

        .row > div {
          flex: 1;
        }

        button {
          margin-top: 25px;
          width: 100%;
          padding: 12px;
          background: #2563eb;
          border: none;
          color: white;
          font-size: 15px;
          font-weight: 600;
          border-radius: 5px;
          cursor: pointer;
        }

        button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default AddTask;

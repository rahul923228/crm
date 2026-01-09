import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddQuery = () => {
  const { id: customerId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    projectName: "",
    discussion: "",
    call_date: "",
    deal_status: "",
    next_followup: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8080/api/addQuery/${customerId}`, form);
      setSuccessMsg("Query added successfully!");
      setErrorMsg("");

      setTimeout(() => {
        setSuccessMsg("");
        navigate("/admin/manageQuery");
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to add query. Please try again.");
      setSuccessMsg("");
    }
  };

  return (
    <div className="add-query-page">
      <h2 className="page-title">Add Query for Customer #{customerId}</h2>
      <p className="page-subtitle">Fill the details below to add a query</p>

      {successMsg && <div className="msg success">{successMsg}</div>}
      {errorMsg && <div className="msg error">{errorMsg}</div>}

      <form className="query-form" onSubmit={handleSubmit}>
        <label>
          Project Name
          <input
            type="text"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Discussion
          <textarea
            name="discussion"
            value={form.discussion}
            onChange={handleChange}
            rows="3"
            required
          />
        </label>

        <label>
          Call Date
          <input
            type="datetime-local"
            name="call_date"
            value={form.call_date}
            onChange={handleChange}
          />
        </label>

        <label>
          Deal Status
          <select
            name="deal_status"
            value={form.deal_status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Open">Open</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </label>

        <label>
          Next Followup
          <input
            type="datetime-local"
            name="next_followup"
            value={form.next_followup}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="btn submit-btn">Add Query</button>
      </form>

      {/* ================= CSS ================= */}
      <style>{`
        .add-query-page {
          padding: 40px;
          background: linear-gradient(to right, #e0f7fa, #f1f8e9);
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
        }

        .page-subtitle {
          color: #334155;
          margin-bottom: 25px;
          font-size: 16px;
        }

        .msg {
          padding: 12px;
          border-radius: 8px;
          margin: 12px 0;
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
          border: 1px solid #fca5a5;
        }

        .query-form {
          background: #ffffff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          max-width: 600px;
          transition: transform 0.2s;
        }

        .query-form:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.15);
        }

        label {
          display: flex;
          flex-direction: column;
          margin-bottom: 18px;
          font-weight: 600;
          font-size: 14px;
          color: #1e293b;
        }

        input, select, textarea {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #94a3b8;
          margin-top: 6px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
        }

        select {
          cursor: pointer;
        }

        textarea {
          resize: vertical;
        }

        .btn.submit-btn {
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          background: linear-gradient(to right, #3b82f6, #0ea5e9);
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          font-size: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn.submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default AddQuery;

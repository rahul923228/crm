import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
const QueryList = () => {
  const { id } = useParams();

  const [queries, setQueries] = useState([]);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();

const customerName = location.state?.customerName || "Customer";

  /* ================= HELPERS ================= */
  const formatDateTime = (dt) => {
    if (!dt) return "-";
    return new Date(dt).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  const isToday = (dateTime) => {
    if (!dateTime) return false;
    const today = new Date();
    const d = new Date(dateTime);

    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  /* ================= FETCH ================= */
  const fetchQueries = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/getQuery/${id}`
      );
      setQueries(res.data || []);
    } catch {
      alert("Failed to load queries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchQueries();
  }, [id]);

  /* ================= MODAL ================= */
  const openUpdateModal = (q) => {
    setSelectedQueryId(q.id);
    setFormData({
      projectName: q.projectName || "",
      discussion: q.discussion || "",
      deal_status: q.deal_status || "",
      call_date: q.call_date?.slice(0, 16) || "",
      next_followup: q.next_followup?.slice(0, 16) || ""
    });
  };

  const updateQuery = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/updateQuery/${selectedQueryId}`,
        formData
      );
      alert("Query updated successfully");
      setSelectedQueryId(null);
      fetchQueries();
    } catch {
      alert("Update failed");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="query-page">
      <div className="page-header">
        <h2>Customer Queries</h2>
        <h3>Customer Name - {customerName}</h3>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Discussion</th>
              <th>Call Date</th>
              <th>Status</th>
              <th>Next Follow-up</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {queries.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No queries found
                </td>
              </tr>
            )}

            {queries.map((q) => (
              <tr
                key={q.id}
                className={isToday(q.next_followup) ? "row-alert" : ""}
              >
                <td>{q.id}</td>
                <td className="bold">{q.projectName}</td>
                <td className="discussion">{q.discussion}</td>
                <td>{formatDateTime(q.call_date)}</td>

                <td>
                  <span className={`status ${q.deal_status?.toLowerCase()}`}>
                    {q.deal_status}
                  </span>
                </td>

                <td>
                  {formatDateTime(q.next_followup)}
                  {isToday(q.next_followup) && (
                    <div className="followup-alert">
                      ⚠ Follow-up Today
                    </div>
                  )}
                </td>

                <td>{formatDateTime(q.created_at)}</td>

                <td>
                  <button
                    className="btn edit-btn"
                    onClick={() => openUpdateModal(q)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {selectedQueryId && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Query</h3>

            <button
              className="close-btn"
              onClick={() => setSelectedQueryId(null)}
            >
              ✕
            </button>

            <label>Project Name</label>
            <input
              value={formData.projectName}
              onChange={(e) =>
                setFormData({ ...formData, projectName: e.target.value })
              }
            />

            <label>Discussion</label>
            <textarea
              rows="3"
              value={formData.discussion}
              onChange={(e) =>
                setFormData({ ...formData, discussion: e.target.value })
              }
            />

            <label>Status</label>
            <select
              value={formData.deal_status}
              onChange={(e) =>
                setFormData({ ...formData, deal_status: e.target.value })
              }
            >
              <option>Open</option>
              <option>Closed</option>
              <option>Won</option>
              <option>Lost</option>
            </select>

            <label>Call Date</label>
            <input
              type="datetime-local"
              value={formData.call_date}
              onChange={(e) =>
                setFormData({ ...formData, call_date: e.target.value })
              }
            />

            <label>Next Follow-up</label>
            <input
              type="datetime-local"
              value={formData.next_followup}
              onChange={(e) =>
                setFormData({ ...formData, next_followup: e.target.value })
              }
            />

            <button className="btn save-btn" onClick={updateQuery}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ================= CSS ================= */}
      <style>{`
        .query-page {
          padding: 30px;
          background: linear-gradient(135deg,#e0f2fe,#f8fafc);
          min-height: 100vh;
        }

        .page-header {
          background: linear-gradient(90deg,#2563eb,#3b82f6);
          color: white;
          padding: 16px 24px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .table-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background: #f1f5f9;
          padding: 14px;
          text-align: left;
        }

        td {
          padding: 14px;
          vertical-align: top;
        }

        tbody tr:nth-child(even) {
          background: #f9fafb;
        }

        tbody tr:hover {
          background: #eef2ff;
        }

        .row-alert {
          background: #fff1f2 !important;
        }

        .followup-alert {
          margin-top: 6px;
          display: inline-block;
          background: #fee2e2;
          color: #b91c1c;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
        }

        .discussion {
          max-width: 240px;
        }

        .bold {
          font-weight: 600;
        }

        .status {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .status.open { background: #dbeafe; color: #1d4ed8; }
        .status.closed { background: #fee2e2; color: #b91c1c; }
        .status.won { background: #dcfce7; color: #166534; }
        .status.lost { background: #fef3c7; color: #92400e; }

        .btn {
          padding: 6px 14px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }

        .edit-btn {
          background: #6366f1;
          color: white;
        }

        .save-btn {
          background: #22c55e;
          color: white;
          width: 100%;
          margin-top: 14px;
        }

        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: white;
          padding: 24px;
          border-radius: 14px;
          width: 520px;
          position: relative;
        }

        .modal-content label {
          font-weight: 600;
          margin-top: 10px;
          display: block;
        }

        input, textarea, select {
          width: 100%;
          padding: 10px;
          margin-top: 6px;
          border-radius: 8px;
          border: 1px solid #cbd5f5;
        }

        .close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          background: #ef4444;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
        }

        .loading {
          text-align: center;
          font-size: 18px;
          padding: 40px;
        }
      `}</style>
    </div>
  );
};

export default QueryList;

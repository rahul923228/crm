import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageQuery = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInactive, setShowInactive] = useState(false);

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [formData, setFormData] = useState({});
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();

  /* ================= SAFE DATE FORMAT ================= */
  const formatDateTime = (dt) => {
    if (!dt) return "-";
    const safe = dt.replace(" ", "T"); // FIX for backend format
    const d = new Date(safe);
    if (isNaN(d)) return "-";

    return d
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      })
      .replace(",", " |");
  };

  /* ================= FETCH CUSTOMERS ================= */
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/getNewCustomer"
      );
      console.log("CUSTOMERS =>", res.data); // DEBUG
      setCustomers(res.data || []);
    } catch (err) {
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  /* ================= STATUS UPDATE ================= */
  const updateStatus = async (customerId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/newCustomer/updateStatus/${customerId}`,
        null,
        { params: { status } }
      );
      fetchCustomers();
    } catch {
      alert("Status update failed");
    }
  };

  /* ================= VIEW QUERY ================= */
  const viewCustomerQueries = async (customerId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/findQuery/${customerId}`
      );

      if (!res.data || res.data.length === 0) {
        alert("No query found");
        return;
      }

      const q = res.data[0];
      setSelectedCustomerId(customerId);
      setFormData({
        projectName: q.projectName || "",
        discussion: q.discussion || "",
        call_date: q.call_date
          ? q.call_date.replace(" ", "T").slice(0, 16)
          : "",
        deal_status: q.deal_status || "",
        next_followup: q.next_followup
          ? q.next_followup.replace(" ", "T").slice(0, 16)
          : ""
      });
    } catch {
      alert("Failed to fetch query");
    }
  };

  /* ================= UPDATE QUERY ================= */
  const handleUpdateQuery = async () => {
    setUpdating(true);
    try {
      await axios.put(
        `http://localhost:8080/api/updateQuery/${selectedCustomerId}`,
        formData
      );
      alert("Query updated successfully");
      setSelectedCustomerId(null);
    } catch {
      alert("Query update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  /* ================= SAFE FILTER ================= */
  const activeCustomers = customers.filter(
    (c) => c.status?.toLowerCase() === "active"
  );

  const inactiveCustomers = customers.filter(
    (c) => c.status?.toLowerCase() === "inactive"
  );

  return (
    <div className="manage-page">
      <h2>Manage Customer Queries</h2>

      <button
        className="btn inactive-toggle"
        onClick={() => setShowInactive(!showInactive)}
      >
        Inactive Customers ({inactiveCustomers.length})
      </button>

      {/* ================= ACTIVE ================= */}
      <div className="table-wrapper">
        <h3>Active Customers</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Number</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeCustomers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.number}</td>
                <td>{c.email}</td>
                <td>
                  <span className="badge active">Active</span>
                </td>
                <td>{formatDateTime(c.created_at)}</td>
                <td>{formatDateTime(c.updated_at)}</td>
                <td className="actions">
                  <select
                    className="status-select"
                    value={c.status}
                    onChange={(e) =>
                      updateStatus(c.id, e.target.value)
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <button
                    className="btn view-query"
                    onClick={() =>
                      navigate(`/admin/query/${c.id}`)
                    }
                  >
                    Add Query
                  </button>

                  <button
                    className="btn view-query"
                    onClick={() =>
                      viewCustomerQueries(c.id)
                    }
                  >
                    View / Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= INACTIVE ================= */}
      {showInactive && (
        <div className="table-wrapper">
          <h3>Inactive Customers</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Number</th>
                <th>Email</th>
                <th>Status</th>
                
              </tr>
            </thead>
            <tbody>
              {inactiveCustomers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.number}</td>
                  <td>{c.email}</td>
                  <td>
                    <select
                      className="status-select"
                      value={c.status}
                      onChange={(e) =>
                        updateStatus(c.id, e.target.value)
                      }
                    >
                      <option value="Inactive">Inactive</option>
                      <option value="Active">Activate</option>
                    </select>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MODAL ================= */}
      {selectedCustomerId && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Query</h3>
            <button
              className="close-btn"
              onClick={() =>
                setSelectedCustomerId(null)
              }
            >
              X
            </button>

            {Object.keys(formData).map((key) => (
              <div className="form-group" key={key}>
                <label>{key.replace("_", " ")}</label>

                {key.includes("date") ||
                key.includes("followup") ? (
                  <input
                    type="datetime-local"
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [key]: e.target.value
                      })
                    }
                  />
                ) : key === "discussion" ? (
                  <textarea
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [key]: e.target.value
                      })
                    }
                  />
                ) : (
                  <input
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [key]: e.target.value
                      })
                    }
                  />
                )}
              </div>
            ))}

            <button
              className="btn update-query"
              onClick={handleUpdateQuery}
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Query"}
            </button>
          </div>
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style>{`
        .manage-page { padding:30px; background:#f4f6f8; min-height:100vh; }
        .table-wrapper { background:#fff; padding:15px; border-radius:8px; margin-top:15px; }
        table { width:100%; border-collapse:collapse; }
        th,td { padding:12px; border-bottom:1px solid #e5e7eb; }
        .badge { padding:4px 12px; border-radius:20px; color:#fff; font-size:12px; }
        .badge.active { background:#22c55e; }
        .actions { display:flex; gap:8px; }
        .btn { padding:6px 12px; border:none; border-radius:6px; cursor:pointer; font-weight:600; }
        .view-query { background:#3b82f6; color:#fff; }
        .update-query { background:#10b981; color:#fff; }
        .inactive-toggle { background:#6b7280; color:#fff; margin-bottom:10px; }
        .status-select { padding:6px; border-radius:6px; }
        .modal { position:fixed; inset:0; background:rgba(0,0,0,.5); display:flex; align-items:center; justify-content:center; }
        .modal-content { background:#fff; padding:20px; border-radius:8px; width:500px; position:relative; }
        .close-btn { position:absolute; top:10px; right:10px; background:#ef4444; color:#fff; border:none; padding:4px 8px; cursor:pointer; }
        .form-group { margin-bottom:12px; }
        input, textarea { width:100%; padding:6px; }
      `}</style>
    </div>
  );
};

export default ManageQuery;

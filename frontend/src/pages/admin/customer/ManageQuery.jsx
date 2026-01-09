import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageQuery = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInactive, setShowInactive] = useState(false);

  const navigate = useNavigate();

  /* ================= FETCH CUSTOMERS ================= */
  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/getNewCustomer");
      setCustomers(res.data || []);
    } catch {
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/newCustomer/updateStatus/${id}`,
        null,
        { params: { status } }
      );
      fetchCustomers();
    } catch {
      alert("Status update failed");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const activeCustomers = customers.filter(
    (c) => c.status?.toLowerCase() === "active"
  );

  const inactiveCustomers = customers.filter(
    (c) => c.status?.toLowerCase() === "inactive"
  );

  return (
    <div className="manage-page">
      <h2>Manage Customers</h2>

      <button
        className="btn inactive-toggle"
        onClick={() => setShowInactive(!showInactive)}
      >
        Inactive Customers ({inactiveCustomers.length})
      </button>

      {/* ================= ACTIVE CUSTOMERS ================= */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activeCustomers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.number}</td>
              <td>
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
              </td>
              <td className="action-col">
                <button
                  className="btn add-btn"
                  onClick={() =>
                    navigate(`/admin/query/${c.id}`)
                  }
                >
                  Add Query
                </button>

                <button
                  className="btn view-btn"
                  onClick={() =>
                    navigate(`/admin/list/${c.id}`)
                  }
                >
                  View Queries
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= INACTIVE CUSTOMERS ================= */}
      {showInactive && (
        <div className="inactive-section">
          <h3 className="inactive-title">Inactive Customers</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inactiveCustomers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
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

      {/* ================= CSS ================= */}
      <style>{`
        .manage-page {
          padding: 30px;
          background: #f4f6f8;
          min-height: 100vh;
        }

        h2 {
          margin-bottom: 15px;
          font-size: 22px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          margin-top: 10px;
        }

        th, td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          text-align: left;
          font-size: 14px;
        }

        th {
          background: #f1f5f9;
          font-weight: 600;
        }

        tr:hover {
          background: #f9fafb;
        }

        .btn {
          padding: 6px 14px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
        }

        .add-btn {
          background: #10b981;
          color: #ffffff;
        }

        .view-btn {
          background: #3b82f6;
          color: #ffffff;
        }

        .inactive-toggle {
          background: #6b7280;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .action-col {
          display: flex;
          gap: 8px;
        }

        .status-select {
          padding: 6px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          font-size: 13px;
        }

        .inactive-section {
          margin-top: 20px;
        }

        .inactive-title {
          margin-bottom: 8px;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .action-col {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ManageQuery;

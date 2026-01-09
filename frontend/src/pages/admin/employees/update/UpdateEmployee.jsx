import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  // 🔹 NEW STATES (ONLY ADDITION)
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [basic, setBasic] = useState({
    name: "",
    gender: "",
    dob: "",
    mobile_number: "",
    email: "",
    marital_status: "",
    date_of_joining: "",
    employee_status: ""
  });

  const [family, setFamily] = useState({
    father_name: "",
    mother_name: "",
    emergency_contect_name: "",
    emergency_contact_relation: "",
    emergency_contact_number: ""
  });

  const [work, setWork] = useState({
    department: "",
    designation: "",
    reporting_manager: "",
    employment_type: "",
    work_location: "",
    shift_timing: "",
    work_mode: ""
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:8080/api/emp/all/${id}`)
      .then(res => {
        const data = res.data;

        setBasic({
          ...basic,
          ...data.basic,
          dob: data.basic?.dob?.substring(0, 10),
          date_of_joining: data.basic?.date_of_joining?.substring(0, 10)
        });

        setFamily({ ...family, ...data.family });
        setWork({ ...work, ...data.work });
        setLoading(false);
      })
      .catch(() => {
        alert("Employee data load nahi hua");
        setLoading(false);
      });
  }, [id]);

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    const payload = { basic, family, work };

    try {
      await axios.put(
        `http://localhost:8080/api/emp/update/${id}`,
        payload
      );
      alert("Employee updated successfully");
      navigate("/admin/employees/manage");
    } catch {
      alert("Update failed");
    }
  };

  /* ================= STATUS CHANGE (DELETE API) ================= */
  const handleStatusChange = async () => {
    if (!selectedStatus) {
      alert("Please select status");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/emp/delete/${id}`,
        { status: selectedStatus }
      );
      alert("Employee status updated");
      navigate("/admin/employees/manage");
    } catch {
      alert("Status update failed");
    }
  };

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  /* ================= UI ================= */
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Update Employee</h2>

        {/* DELETE BUTTON (ONLY ADDITION) */}
        <button
          style={{ background: "red", color: "#fff", padding: "8px 16px", marginBottom: 10 }}
          onClick={() => setShowStatusModal(true)}
        >
          Delete
        </button>

        {/* STEPS */}
        <div style={styles.steps}>
          <div style={step === 1 ? styles.stepActive : styles.step}>Basic</div>
          <div style={step === 2 ? styles.stepActive : styles.step}>Family</div>
          <div style={step === 3 ? styles.stepActive : styles.step}>Work</div>
        </div>

        {step === 3 && (
          <div style={styles.actions}>
            <button style={styles.btnSuccess} onClick={handleUpdate}>
              Update Employee
            </button>
          </div>
        )}
      </div>

      {/* 🔹 STATUS MODAL (ONLY ADDITION) */}
      {showStatusModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3>Change Employee Status</h3>

            <select
              style={styles.input}
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>

            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button style={styles.btnSuccess} onClick={handleStatusChange}>
                Confirm
              </button>
              <button
                style={styles.btnSecondary}
                onClick={() => setShowStatusModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  wrapper: { display: "flex", justifyContent: "center", padding: 40 },
  card: {
    width: 700,
    background: "#fff",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,.1)"
  },
  title: { textAlign: "center", marginBottom: 20 },
  steps: { display: "flex", marginBottom: 20 },
  step: { flex: 1, padding: 10, background: "#e5e7eb", textAlign: "center" },
  stepActive: { flex: 1, padding: 10, background: "#2563eb", color: "#fff", textAlign: "center" },
  input: { padding: 8, borderRadius: 5, border: "1px solid #ccc" },
  actions: { display: "flex", justifyContent: "flex-end", marginTop: 20 },
  btnSuccess: { background: "#16a34a", color: "#fff", border: "none", padding: "10px 20px" },
  btnSecondary: { background: "#6b7280", color: "#fff", border: "none", padding: "10px 20px" }
};

const modalStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#fff",
    padding: 25,
    borderRadius: 8,
    width: 300
  }
};

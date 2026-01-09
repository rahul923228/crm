import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/emp/all/${id}`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error(err);
        alert("Employee details load failed");
      });
  }, [id]);

  if (!data) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const { basic, family, work } = data;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Employee Details</h2>

        {/* BASIC */}
        <h3>Basic Details</h3>
        <table style={styles.table}>
          <tbody>
            <Row label="Name" value={basic.userName} />
            <Row label="Gender" value={basic.gender} />
            <Row label="DOB" value={basic.dob?.substring(0,10)} />
            <Row label="Mobile" value={basic.mobile_number} />
            <Row label="Email" value={basic.email} />
            <Row label="Marital Status" value={basic.marital_status} />
            <Row label="Joining Date" value={basic.date_of_joining?.substring(0,10)} />
            <Row label="Status" value={basic.employee_status} />
          </tbody>
        </table>

        {/* FAMILY */}
        <h3>Family Details</h3>
        <table style={styles.table}>
          <tbody>
            <Row label="Father Name" value={family?.father_name} />
            <Row label="Mother Name" value={family?.mother_name} />
            <Row label="Emergency Contact" value={family?.emergency_contact_number} />
            <Row label="Relation" value={family?.emergency_contact_relation} />
          </tbody>
        </table>

        {/* WORK */}
        <h3>Work Details</h3>
        <table style={styles.table}>
          <tbody>
            <Row label="Department" value={work?.department} />
            <Row label="Designation" value={work?.designation} />
            <Row label="Manager" value={work?.reporting_manager} />
            <Row label="Employment Type" value={work?.employment_type} />
            <Row label="Work Location" value={work?.work_location} />
            <Row label="Shift" value={work?.shift_timing} />
            <Row label="Work Mode" value={work?.work_mode} />
          </tbody>
        </table>

        <button
          style={styles.backBtn}
          onClick={() => navigate("/admin/employees/manage")}
        >
          Back to Manage
        </button>
      </div>
    </div>
  );
}

/* ====== REUSABLE ROW ====== */
function Row({ label, value }) {
  return (
    <tr>
      <th style={styles.th}>{label}</th>
      <td style={styles.td}>{value || "-"}</td>
    </tr>
  );
}

/* ====== STYLES ====== */
const styles = {
  wrapper: { display: "flex", justifyContent: "center", padding: 40 },
  card: {
    width: 800,
    background: "#fff",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,.1)"
  },
  title: { textAlign: "center", marginBottom: 20 },
  table: { width: "100%", borderCollapse: "collapse", marginBottom: 20 },
  th: { textAlign: "left", padding: 8, background: "#f3f4f6", width: "35%" },
  td: { padding: 8, borderBottom: "1px solid #e5e7eb" },
  backBtn: {
    marginTop: 20,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 20px"
  }
};

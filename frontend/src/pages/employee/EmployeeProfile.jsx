import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeProfile = () => {
  // 👇 BASIC ID FROM URL
  const { basicId } = useParams();

  const [photo, setPhoto] = useState(null);
  const [document, setDocument] = useState(null);
  const [documentType, setDocumentType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!basicId) {
      alert("Employee Basic ID missing");
      return;
    }

    const formData = new FormData();
    if (photo) formData.append("photo", photo);
    if (document) formData.append("docoment", document);
    if (documentType) formData.append("docomentType", documentType);

    try {
      await axios.post(
        `http://localhost:8080/api/emp/addDocoment/${basicId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Employee Documents</h2>
        <p style={{ textAlign: "center", marginBottom: 10 }}>
          Basic ID: {basicId}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              style={styles.input}
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Document Type</label>
            <select
              style={styles.input}
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Select document</option>
              <option value="AADHAAR">Aadhaar</option>
              <option value="PAN">PAN</option>
              <option value="RESUME">Resume</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Upload Document</label>
            <input
              type="file"
              style={styles.input}
              onChange={(e) => setDocument(e.target.files[0])}
            />
          </div>

          <button type="submit" style={styles.button}>
            Save / Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeProfile;


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    backgroundColor: "#f4f6f8",
  },
  card: {
    width: "420px",
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
  },
  label: {
    fontWeight: 600,
    marginBottom: "6px",
    color: "#555",
  },
  input: {
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 600,
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

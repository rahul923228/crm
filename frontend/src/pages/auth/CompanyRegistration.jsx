import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyRegistration = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  

  /* ================= USER STATE ================= */

  const [user, setUser] = useState({
    userName: "",
    password: "",
    role: "ADMIN",
  });

  /* ================= COMPANY STATE ================= */

  const [company, setCompany] = useState({
    companyName: "",
    companyCode: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    industryType: "",
    status: "ACTIVE",
    createdDate: new Date().toISOString().split("T")[0],
  });

  /* ================= HANDLERS ================= */

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  /* ================= USER SUBMIT (STEP 1) ================= */

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/register",
        user,
        { headers: { "Content-Type": "application/json" } }
      );

      const newUserId = res?.data?.userId;
      localStorage.setItem("userId",newUserId);
      console.log("REGISTER RESPONSE =", res);
console.log("REGISTER RESPONSE DATA =", res.data);


  
      alert("Admin user created successfully!");
    } catch (error) {
      console.error(error);
      alert("User already exists or error creating user");
    } finally {
      setLoading(false);
    }
  };

  /* ================= COMPANY SUBMIT (STEP 2) ================= */

  const handleCompanySubmit = async (e) => {
    e.preventDefault();

  

  

    setLoading(true);

    try {
        const userId=localStorage.getItem("userId");
      const res = await axios.post(
        `http://localhost:8080/api/addUnit/${userId}`,
        company,
        { headers: { "Content-Type": "application/json" } }
      );

     alert("Company registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error creating company");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STYLES ================= */

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      backgroundColor: "#fff",
    },
    title: {
      textAlign: "center",
      marginBottom: "25px",
      fontSize: "24px",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    select: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "14px",
      marginTop: "20px",
      borderRadius: "8px",
      border: "none",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      background: "#007bff",
      color: "#fff",
    },
    disabledBtn: {
      background: "#aaa",
      cursor: "not-allowed",
    },
    section: {
      marginBottom: "40px",
    },
  };

  /* ================= UI ================= */

  return (
    <div style={styles.container}>
      <button
        onClick={() => navigate("/login")}
        style={{ ...styles.button, background: "#28a745" }}
      >
        Already have an account? Login
      </button>

      {/* ================= STEP 1: USER ================= */}
      <div style={styles.section}>
        <h2 style={styles.title}>Admin User Registration</h2>

        <form onSubmit={handleUserSubmit}>
          <input
            style={styles.input}
            name="userName"
            placeholder="Username"
            required
            onChange={handleUserChange}
          />

          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleUserChange}
          />

          <button
            type="submit"
            style={loading ? { ...styles.button, ...styles.disabledBtn } : styles.button}
            disabled={loading}
          >
            Create Admin User
          </button>
        </form>
      </div>

      {/* ================= STEP 2: COMPANY ================= */}
      <div style={styles.section}>
        <h2 style={styles.title}>Company Registration</h2>

        <form onSubmit={handleCompanySubmit}>
          <input style={styles.input} name="companyName" placeholder="Company Name" required onChange={handleCompanyChange} />
          <input style={styles.input} name="companyCode" placeholder="Company Code" onChange={handleCompanyChange} />
          <input style={styles.input} type="email" name="email" placeholder="Email" required onChange={handleCompanyChange} />
          <input style={styles.input} name="phone" placeholder="Phone" required onChange={handleCompanyChange} />
          <input style={styles.input} name="address" placeholder="Address" onChange={handleCompanyChange} />
          <input style={styles.input} name="website" placeholder="Website" onChange={handleCompanyChange} />

          <select style={styles.select} name="industryType" required onChange={handleCompanyChange}>
            <option value="">Select Industry</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
          </select>

          <select style={styles.select} name="status" onChange={handleCompanyChange}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>

          <button
            type="submit"
            style={styles.button}
          
          >
            Register Company
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistration;

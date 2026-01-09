import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
  const navigate = useNavigate();

  /* ================= CUSTOMER STATE ================= */
  const [customer, setCustomer] = useState({
    customerName: "",
    email: "",
    number: "",
    address: "",
    stutes: "ACTIVE",
    industryType: "",
    createdDate: new Date().toISOString().split("T")[0],
  });

  /* ================= LOGIN CREDENTIALS ================= */
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });

  const [usernameError, setUsernameError] = useState("");

  /* ================= HANDLERS ================= */

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleCredentialsChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "userName") {
      setUsernameError(""); // clear error while typing
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!adminId || !token) {
      alert("Admin not logged in");
      return;
    }

    try {
      /* ========= STEP 1: REGISTER CUSTOMER USER ========= */
      //const userId=localStorage.getItem("id");
    const res= await axios.post(`http://localhost:8080/api/register`, {
        userName: credentials.userName,
        password: credentials.password,
        role: "CUSTOMER",
      });

      /* ========= STEP 2: ADD CUSTOMER DETAILS ========= */
      const customerId=res.data.userId;
      console.log("customerid",customerId);
      await axios.post(
    
        `http://localhost:8080/api/addCustomer/${customerId}`,
        customer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Customer registered and added successfully");
    
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.message || "";

      if (
        error.response?.status === 400 ||
        message.toLowerCase().includes("exist")
      ) {
        setUsernameError("Username already exists");
        return;
      }

      alert("Failed to add customer");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add Customer</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* ===== LOGIN DETAILS ===== */}
          <div style={styles.field}>
            <label>Username</label>
            <input
              name="userName"
              value={credentials.userName}
              onChange={handleCredentialsChange}
              style={{
                ...styles.input,
                borderColor: usernameError ? "red" : "#ccc",
              }}
              required
            />
            {usernameError && (
              <span style={styles.error}>{usernameError}</span>
            )}
          </div>

          <Input
            label="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleCredentialsChange}
            required
          />

          {/* ===== CUSTOMER DETAILS ===== */}
          <Input
            label="Customer Name"
            name="customerName"
            value={customer.customerName}
            onChange={handleCustomerChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={customer.email}
            onChange={handleCustomerChange}
            required
          />

          <Input
            label="Phone Number"
            name="number"
            value={customer.number}
            onChange={handleCustomerChange}
            required
          />

          <Input
            label="Address"
            name="address"
            value={customer.address}
            onChange={handleCustomerChange}
          />

          <Select
            label="Industry Type"
            name="industryType"
            value={customer.industryType}
            onChange={handleCustomerChange}
            options={["IT", "Finance", "Healthcare", "Education", "Retail"]}
          />

          <Select
            label="Status"
            name="stutes"
            value={customer.stutes}
            onChange={handleCustomerChange}
            options={["ACTIVE", "INACTIVE"]}
          />

          <Input
            label="Created Date"
            type="date"
            name="createdDate"
            value={customer.createdDate}
            onChange={handleCustomerChange}
          />

          <button type="submit" style={styles.button}>
            Save Customer
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const Input = ({ label, ...props }) => (
  <div style={styles.field}>
    <label>{label}</label>
    <input {...props} style={styles.input} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div style={styles.field}>
    <label>{label}</label>
    <select {...props} style={styles.input}>
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: 40,
    background: "#f3f4f6",
  },
  card: {
    width: 650,
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 15,
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    gridColumn: "1 / -1",
    padding: 12,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    cursor: "pointer",
  },
};

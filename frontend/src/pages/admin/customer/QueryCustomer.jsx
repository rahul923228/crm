import React, { useState } from "react";
import axios from "axios";

export default function AddCustomer() {
  const [customer, setCustomer] = useState({
    name: "",
    number: "",
    email: "",
    status: ""
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/addNewCustomer", customer);
      setMessage("Customer added successfully!");
      setCustomer({ name: "", number: "", email: "", status: "" }); // clear form
    } catch (error) {
      console.error(error);
      setMessage("Error adding customer. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Customer</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Phone Number:
          <input
            type="text"
            name="number"
            value={customer.number}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Email:
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        {/* <label style={styles.label}>
          Status:
          <input
            type="text"
            name="status"
            value={customer.status}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label> */}

        <button type="submit" style={styles.button}>
          Save Customer
        </button>
      </form>
    </div>
  );
}

// Inline styles (simple clean UI)
const styles = {
  container: {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "2px 2px 12px rgba(0,0,0,0.1)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold"
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "5px"
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  message: {
    color: "green",
    fontWeight: "bold"
  }
};

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    password: "",
    role: "EMPLOYEE"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("/api/register", form);
      setSuccess("User registered successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2>Create User</h2>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            name="userName"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="EMPLOYEE">EMPLOYEE</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button type="submit" style={styles.button}>
            Register
          
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f6f8"
  },
  card: {
    width: 360,
    padding: 30,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },
  error: {
    background: "#ffe5e5",
    padding: 10,
    marginBottom: 10,
    color: "#c00",
    borderRadius: 6
  },
  success: {
    background: "#e6fffa",
    padding: 10,
    marginBottom: 10,
    color: "#065f46",
    borderRadius: 6
  }
};

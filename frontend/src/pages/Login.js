import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
const [userName, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();


const handleLogin = async (e) => {
e.preventDefault();
setError("");
try {

const res = await axios.post(`/api/login`, {
userName: userName,
password
});


const { token, role, userId, userName: loggedInUserName,customerId} = res.data;
localStorage.setItem("token", token);
localStorage.setItem("role", role);
localStorage.setItem("userId",userId)
localStorage.setItem("userName",loggedInUserName)
localStorage.setItem("customerId",customerId);

console.log("userId++",userId);
console.log("id++",customerId);
// console.log("Redirecting...");
// window.location.href = "/admin/customer/customer-panel";
if (role === "ADMIN"){
navigate("/admin");
} 
else if(role==="CUSTOMER"){
navigate("/customer/dashboard");
} 
else if(role==="SALES"){

  
}

else {
  navigate("/employee/dashboard");
}
} catch (err) {
if (err.response) {
// Backend se error message aaya hai
setError(err.response.data?.message || "Invalid username or password");
} else if (err.request) {
// Request gayi but response nahi aaya
setError("Server not responding. Please try again later.");
} else {
// Koi aur error
setError("Something went wrong. Please try again.");
}
}
};

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>CRM Login</h2>
        <p style={styles.subtitle}>Sign in to manage your system</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>
         <button
        onClick={() => navigate("/register")}
        style={{ ...styles.button, background: "#c81114ff" }}
      >
        No account? Register First
      </button>

        <div style={styles.footer}>© 2025 CRM System</div>
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
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  card: {
    width: 380,
    padding: 30,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
  },
  title: {
    marginBottom: 5,
    textAlign: "center"
  },
  subtitle: {
    marginBottom: 20,
    textAlign: "center",
    color: "#666"
  },
  field: {
    marginBottom: 15
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 500
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none"
  },
  button: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#711339ff",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer"
  },
  error: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ffe5e5",
    color: "#d8000c",
    borderRadius: 6,
    textAlign: "center"
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#999"
  }
};

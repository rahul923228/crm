import { NavLink, useNavigate } from "react-router-dom";

export default function CustomerSidebar() {
  const navigate = useNavigate(); // must be inside component

  const logout = () => {
    localStorage.clear();       // clear all local storage (token, username, etc.)
    navigate("/login");         // redirect to login page
  };

  return (
    <aside style={styles.sidebar}>
      {/* ===== HEADER ===== */}
      <div style={styles.header}>
        <h2 style={styles.title}>Customer Panel</h2>
        <p style={styles.subtitle}>Manage your work & support</p>
      </div>

      {/* ===== NAVIGATION ===== */}
      <nav style={styles.nav}>
        {/* DASHBOARD */}
        <NavLink
          to="/customer/dashboard"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          📊 Dashboard
        </NavLink>

        {/* PROJECT */}
        <NavLink
          to="/customer/add-project"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          📁 Add Project
        </NavLink>

        {/* TICKET */}
        <NavLink
          to="/customer/raise-ticket"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          🎫 Raise Ticket
        </NavLink>

        {/* ===== SUPPORT SECTION ===== */}
        <div style={styles.sectionLabel}>Support</div>

        <NavLink
          to="/customer/tickets"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          💬 All Chats
        </NavLink>

        <NavLink
          to="/customer/chats/closed"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          ✅ Closed Chats
        </NavLink>
      </nav>

      {/* ===== LOGOUT BUTTON ===== */}
      <button style={styles.logoutBtn} onClick={logout}>
        Logout
      </button>

      {/* ===== FOOTER ===== */}
      <div style={styles.footer}>
        <span style={styles.footerText}>CRM System © 2025</span>
      </div>
    </aside>
  );
}

/* ================= STYLES ================= */
const styles = {
  sidebar: {
    width: 250,
    background: "linear-gradient(180deg, #0f172a, #1e293b)",
    color: "#ffffff",
    padding: "24px 18px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "4px 0 15px rgba(0,0,0,0.25)",
  },
  logoutBtn: {
    marginTop: "auto",
    padding: 10,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },

  header: {
    marginBottom: 28,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: 16,
  },

  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#cbd5f5",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flexGrow: 1,
  },

  sectionLabel: {
    marginTop: 18,
    marginBottom: 6,
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    color: "#94a3b8",
    paddingLeft: 6,
  },

  link: {
    padding: "12px 14px",
    borderRadius: 10,
    textDecoration: "none",
    color: "#e5e7eb",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.2s ease",
  },

  activeLink: {
    padding: "12px 14px",
    borderRadius: 10,
    textDecoration: "none",
    background: "linear-gradient(to right, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 600,
    boxShadow: "0 6px 18px rgba(37,99,235,0.45)",
  },

  footer: {
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: 12,
    textAlign: "center",
  },

  footerText: {
    fontSize: 11,
    color: "#94a3b8",
  },
};

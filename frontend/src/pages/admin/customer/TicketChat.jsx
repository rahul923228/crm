import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function TicketChat() {
  const { ticketId } = useParams();
  const chatEndRef = useRef(null);

  const token = localStorage.getItem("token");

  /* ================= STATES ================= */
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    loadTicketAndChat();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= LOAD TICKET + CHAT ================= */
  const loadTicketAndChat = async () => {
    try {
      // 1️⃣ Load ticket details (ONLY ONCE)
      const customerId = localStorage.getItem("customerId");

      const ticketRes = await axios.get(
        `http://localhost:8080/api/getTicket/${customerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTicket(ticketRes.data);

      // 2️⃣ Load chat messages
      await fetchMessages();
    } catch (err) {
      console.error("Error loading ticket/chat", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD CHAT ================= */
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/getChat/${ticketId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data || []);
    } catch (err) {
      console.error("Error loading chat", err);
    }
  };

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = {
      sender: "CUSTOMER",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Optimistic UI
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      await axios.post(
        `http://localhost:8080/api/chat/upload/${ticketId}`,
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  /* ================= UI ================= */
  return (
    <div style={styles.page}>
      <div style={styles.chatCard}>
        {/* HEADER */}
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>
            Ticket #{ticketId}
            {ticket && ` - ${ticket.title}`}
          </h3>
          <span style={styles.subText}>Support Chat</span>
        </div>

        {/* CHAT BODY */}
        <div style={styles.chatBody}>
          {loading ? (
            <p>Loading chat...</p>
          ) : messages.length === 0 ? (
            <p>No messages yet</p>
          ) : (
            messages.map((msg, i) => {
              const sender = msg.sender || "CUSTOMER";

              return (
                <div
                  key={i}
                  style={{
                    ...styles.messageRow,
                    justifyContent:
                      sender === "CUSTOMER" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      ...styles.bubble,
                      background:
                        sender === "CUSTOMER" ? "#2563eb" : "#e5e7eb",
                      color:
                        sender === "CUSTOMER" ? "#fff" : "#111827",
                      borderTopRightRadius:
                        sender === "CUSTOMER" ? 4 : 16,
                      borderTopLeftRadius:
                        sender === "CUSTOMER" ? 16 : 4,
                    }}
                  >
                    <p style={{ margin: 0 }}>{msg.message}</p>
                    <span style={styles.createAt}>{msg.createdAt}</span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>

        {/* INPUT */}
        <div style={styles.inputBox}>
          <input
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button style={styles.sendBtn} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  chatCard: {
    width: "100%",
    maxWidth: 900,
    height: "85vh",
    background: "#fff",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
    overflow: "hidden",
  },
  header: {
    padding: "16px 20px",
    background: "linear-gradient(to right, #2563eb, #1e40af)",
    color: "#fff",
  },
  subText: {
    fontSize: 12,
    opacity: 0.85,
  },
  chatBody: {
    flex: 1,
    padding: 20,
    background: "#f1f5f9",
    overflowY: "auto",
  },
  messageRow: {
    display: "flex",
    marginBottom: 12,
  },
  bubble: {
    maxWidth: "65%",
    padding: "10px 14px",
    borderRadius: 16,
    fontSize: 14,
    lineHeight: 1.4,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  time: {
    display: "block",
    fontSize: 10,
    marginTop: 4,
    opacity: 0.7,
    textAlign: "right",
  },
  inputBox: {
    display: "flex",
    padding: 14,
    borderTop: "1px solid #e5e7eb",
    background: "#fff",
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: 20,
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: 14,
  },
  sendBtn: {
    marginLeft: 10,
    padding: "12px 20px",
    borderRadius: 20,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};

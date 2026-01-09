import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function TicketChat() {
  const { ticketId } = useParams(); // clicked ticket
  const chatEndRef = useRef(null);

  const token = localStorage.getItem("token");
  const myName = localStorage.getItem("userName"); // logged-in user

  const BACKEND_URL = "http://localhost:8080"; // Spring Boot server URL

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= LOAD CHATS =================
  useEffect(() => {
    loadMessages();
  }, [ticketId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const normalize = (v) => (v ? v.toString().trim().toLowerCase() : "");

  // ================= API =================
  const loadMessages = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/getChat/${ticketId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data || []);
    } catch (e) {
      console.error("Load messages failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    // Local preview before send
    const reader = new FileReader();
    reader.onload = (ev) => setFilePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return;

    if (!myName || !ticketId) {
      console.error("Cannot send message: missing senderName or ticketId");
      return;
    }

    const formData = new FormData();

    if (input.trim()) formData.append("message", input.trim());
    if (selectedFile) formData.append("file", selectedFile);

    // Attach logged-in user and ticket
    formData.append("senderName", myName);
    formData.append("ticketId", ticketId);

    // Instant UI update with local preview
    setMessages((prev) => [
      ...prev,
      {
        message: input.trim() || null,
        senderName: myName,
        createdAt: new Date().toISOString(),
        // For preview only, remove after refresh
        fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : null,
        fileName: selectedFile?.name || null,
        isLocalPreview: !!selectedFile,
      },
    ]);

    setInput("");
    setSelectedFile(null);
    setFilePreview(null);

    try {
      await axios.post(
        `${BACKEND_URL}/api/upload/${ticketId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      loadMessages(); // Refresh from backend
    } catch (err) {
      console.error("Send message failed:", err);
    }
  };

  // ================= UI =================
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.body}>
          {loading ? (
            <p>Loading chats...</p>
          ) : messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((m, i) => {
              const sender = normalize(m.senderName);
              const me = normalize(myName);

              const isSystem = sender === "system";
              const isMe = sender === me;

              const justify = isSystem
                ? "center"
                : isMe
                ? "flex-end"
                : "flex-start";
              const bgColor = isSystem
                ? "#d1d5db"
                : isMe
                ? "#2563eb"
                : "#16a34a";

              // Determine file URL
              const fileUrl = m.isLocalPreview
                ? m.fileUrl
                : m.fileUrl
                ? `${BACKEND_URL}${m.fileUrl}`
                : null;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: justify,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      ...styles.bubble,
                      background: bgColor,
                      color: isSystem ? "#000" : "#fff",
                    }}
                  >
                    {!isSystem && (
                      <div style={styles.sender}>{m.senderName}</div>
                    )}
                    {m.message && <div>{m.message}</div>}
                    {fileUrl && (
                      <div style={{ marginTop: 6 }}>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: isSystem ? "#000" : "#fff",
                            textDecoration: "underline",
                          }}
                        >
                          {m.fileName || "File"}
                        </a>
                      </div>
                    )}
                    <div style={styles.date}>
                      {new Date(m.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>

        {/* ================= Input Box ================= */}
        <div style={styles.inputBox}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <input
            type="file"
            style={styles.fileInput}
            onChange={handleFileChange}
          />
          <button onClick={sendMessage} style={styles.sendBtn}>
            Send
          </button>
        </div>

        {/* ================= File Preview ================= */}
        {filePreview && (
          <div style={styles.previewBox}>
            <img
              src={filePreview}
              alt="Preview"
              style={{ maxHeight: 100, maxWidth: 150 }}
            />
            <span>{selectedFile?.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  card: {
    width: "100%",
    maxWidth: 900,
    height: "85vh",
    background: "#fff",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  body: {
    flex: 1,
    padding: 16,
    overflowY: "auto",
    background: "#f1f5f9",
  },
  bubble: {
    maxWidth: "65%",
    padding: "10px 14px",
    borderRadius: 14,
    wordBreak: "break-word",
  },
  sender: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    opacity: 0.9,
  },
  date: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.7,
  },
  inputBox: {
    display: "flex",
    gap: 10,
    padding: 12,
    borderTop: "1px solid #ddd",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  fileInput: {
    cursor: "pointer",
  },
  sendBtn: {
  padding: "10px 20px", // top-bottom 10px, left-right 20px
  borderRadius: 8,
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: 14,         // optional: slightly bigger text
},
  previewBox: {
    padding: 10,
    borderTop: "1px solid #ddd",
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
};

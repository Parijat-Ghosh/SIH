
// // src/components/ChatBot.jsx
// import React, { useState, useRef, useEffect } from "react";

// export default function ChatBot({ onClose }) {
//   const [messages, setMessages] = useState([
//     { 
//       id: 1, 
//       role: "assistant", 
//       text: "Hello! I'm your healthcare assistant. How can I help you today? You can ask me about appointments, doctors, symptoms, or general health information." 
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);
//   const listRef = useRef(null);

//   // Auto-scroll to bottom when new messages are added
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, loading]);

//   const send = async () => {
//     if (!input.trim()) return;
    
//     const userMsg = { id: Date.now(), role: "user", text: input.trim() };
//     setMessages((m) => [...m, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/ai/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           message: userMsg.text,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error(`Server error: ${res.status}`);
//       }

//       const data = await res.json();
      
//       if (data.success) {
//         const botMsg = { 
//           id: Date.now() + 1, 
//           role: "assistant", 
//           text: data.data.response 
//         };
//         setMessages((m) => [...m, botMsg]);
//       } else {
//         throw new Error(data.error || "Failed to get response");
//       }
//     } catch (err) {
//       const errMsg = { 
//         id: Date.now() + 1, 
//         role: "assistant", 
//         text: "Sorry, I'm having trouble responding right now. Please try again later." 
//       };
//       setMessages((m) => [...m, errMsg]);
//       console.error("Chat error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onKey = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       send();
//     }
//   };

//   const clearChat = () => {
//     setMessages([
//       { 
//         id: 1, 
//         role: "assistant", 
//         text: "Hello! I'm your healthcare assistant. How can I help you today? You can ask me about appointments, doctors, symptoms, or general health information." 
//       },
//     ]);
//   };

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.card} role="dialog" aria-modal="true" aria-label="AI chat">
//         <div style={styles.header}>
//           <div style={styles.headerTitle}>
//             <span style={styles.botIcon}>🤖</span>
//             Healthcare Assistant
//           </div>
//           <div style={styles.headerActions}>
//             <button onClick={clearChat} style={styles.clearBtn} title="Clear chat">
//               🗑️
//             </button>
//             <button onClick={onClose} style={styles.closeBtn} title="Close chat">
//               ✕
//             </button>
//           </div>
//         </div>

//         <div style={styles.messageList} ref={listRef}>
//           {messages.map((m) => (
//             <div key={m.id} style={m.role === "user" ? styles.userMsg : styles.botMsg}>
//               <div style={styles.messageContent}>
//                 {m.role === "assistant" && (
//                   <div style={styles.botIndicator}>AI</div>
//                 )}
//                 <div style={styles.messageText}>{m.text}</div>
//                 {m.role === "user" && (
//                   <div style={styles.userIndicator}>You</div>
//                 )}
//               </div>
//             </div>
//           ))}
          
//           {loading && (
//             <div style={styles.botMsg}>
//               <div style={styles.messageContent}>
//                 <div style={styles.botIndicator}>AI</div>
//                 <div style={styles.thinking}>
//                   <span style={styles.thinkingDots}>...</span>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {/* Invisible element for auto-scrolling */}
//           <div ref={messagesEndRef} />
//         </div>

//         <div style={styles.inputArea}>
//           <textarea
//             placeholder="Ask me about appointments, doctors, symptoms, or general health information..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={onKey}
//             rows={2}
//             style={styles.textarea}
//             disabled={loading}
//           />
//           <button 
//             onClick={send} 
//             disabled={loading || !input.trim()} 
//             style={
//               loading || !input.trim() 
//                 ? { ...styles.sendBtn, ...styles.sendBtnDisabled } 
//                 : styles.sendBtn
//             }
//           >
//             {loading ? "Sending..." : "Send"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     display: "flex",
//     alignItems: "flex-end",
//     justifyContent: "flex-end",
//     padding: 20,
//     zIndex: 2000,
//     pointerEvents: "auto",
//     backgroundColor: "rgba(0, 0, 0, 0.3)",
//   },
//   card: {
//     width: 400,
//     maxWidth: "95vw",
//     height: 600,
//     borderRadius: 16,
//     background: "#fff",
//     boxShadow: "0 20px 60px rgba(2,6,23,0.2)",
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden",
//     border: "1px solid #e2e8f0",
//   },
//   header: {
//     padding: "16px 20px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     fontWeight: 700,
//     borderBottom: "1px solid #e2e8f0",
//     background: "linear-gradient(90deg, #6d28d9, #06b6d4)",
//     color: "white",
//   },
//   headerTitle: {
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//     fontSize: 16,
//   },
//   headerActions: {
//     display: "flex",
//     gap: 8,
//   },
//   botIcon: {
//     fontSize: 20,
//   },
//   clearBtn: {
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     fontSize: 14,
//     color: "white",
//     padding: "4px 8px",
//     borderRadius: 4,
//   },
//   closeBtn: {
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     fontSize: 16,
//     color: "white",
//     padding: "4px 8px",
//     borderRadius: 4,
//   },
//   messageList: {
//     padding: 16,
//     overflowY: "auto",
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     gap: 12,
//     background: "#f8fafc",
//   },
//   messageContent: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 4,
//   },
//   botIndicator: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#06b6d4",
//   },
//   userIndicator: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#6d28d9",
//     alignSelf: "flex-end",
//   },
//   userMsg: {
//     alignSelf: "flex-end",
//     background: "linear-gradient(135deg, #6d28d9, #06b6d4)",
//     color: "white",
//     padding: "12px 16px",
//     borderRadius: 16,
//     borderBottomRightRadius: 4,
//     maxWidth: "80%",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },
//   botMsg: {
//     alignSelf: "flex-start",
//     background: "white",
//     color: "#334155",
//     padding: "12px 16px",
//     borderRadius: 16,
//     borderBottomLeftRadius: 4,
//     maxWidth: "80%",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//     border: "1px solid #e2e8f0",
//   },
//   messageText: {
//     fontSize: 14,
//     lineHeight: 1.5,
//     whiteSpace: "pre-wrap",
//     wordBreak: "break-word",
//   },
//   thinking: {
//     display: "flex",
//     alignItems: "center",
//     minHeight: 20,
//   },
//   thinkingDots: {
//     fontSize: 24,
//     letterSpacing: 2,
//     color: "#64748b",
//   },
//   inputArea: {
//     padding: 16,
//     display: "flex",
//     gap: 12,
//     borderTop: "1px solid #e2e8f0",
//     background: "white",
//   },
//   textarea: {
//     flex: 1,
//     resize: "none",
//     padding: 12,
//     borderRadius: 8,
//     border: "1px solid #cbd5e1",
//     fontSize: 14,
//     fontFamily: "inherit",
//     outline: "none",
//     transition: "border-color 0.2s",
//   },
//   textareaFocus: {
//     borderColor: "#06b6d4",
//   },
//   sendBtn: {
//     padding: "12px 20px",
//     borderRadius: 8,
//     background: "linear-gradient(90deg, #6d28d9, #06b6d4)",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: 600,
//     fontSize: 14,
//     transition: "opacity 0.2s",
//     whiteSpace: "nowrap",
//   },
//   sendBtnDisabled: {
//     opacity: 0.6,
//     cursor: "not-allowed",
//   },
// };






// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function ChatBot({ onClose }) {
  const navigate = useNavigate(); // Initialize navigate function
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: "assistant", 
      text: "Hello! I'm your healthcare assistant. How can I help you today? You can ask me about appointments, doctors, symptoms, or general health information." 
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const listRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle close button click - redirect to /patient route
  const handleClose = () => {
    navigate("/health-records"); // Redirect to patient dashboard
    if (onClose) {
      onClose(); // Also call the original onClose prop if provided
    }
  };

  const send = async () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), role: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.success) {
        const botMsg = { 
          id: Date.now() + 1, 
          role: "assistant", 
          text: data.data.response 
        };
        setMessages((m) => [...m, botMsg]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (err) {
      const errMsg = { 
        id: Date.now() + 1, 
        role: "assistant", 
        text: "Sorry, I'm having trouble responding right now. Please try again later." 
      };
      setMessages((m) => [...m, errMsg]);
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        id: 1, 
        role: "assistant", 
        text: "Hello! I'm your healthcare assistant. How can I help you today? You can ask me about appointments, doctors, symptoms, or general health information." 
      },
    ]);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card} role="dialog" aria-modal="true" aria-label="AI chat">
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <span style={styles.botIcon}>🤖</span>
            Healthcare Assistant
          </div>
          <div style={styles.headerActions}>
            <button onClick={clearChat} style={styles.clearBtn} title="Clear chat">
              🗑️
            </button>
            {/* Updated close button to use handleClose */}
            <button onClick={handleClose} style={styles.closeBtn} title="Close chat">
              ✕
            </button>
          </div>
        </div>

        <div style={styles.messageList} ref={listRef}>
          {messages.map((m) => (
            <div key={m.id} style={m.role === "user" ? styles.userMsg : styles.botMsg}>
              <div style={styles.messageContent}>
                {m.role === "assistant" && (
                  <div style={styles.botIndicator}>AI</div>
                )}
                <div style={styles.messageText}>{m.text}</div>
                {m.role === "user" && (
                  <div style={styles.userIndicator}>You</div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div style={styles.botMsg}>
              <div style={styles.messageContent}>
                <div style={styles.botIndicator}>AI</div>
                <div style={styles.thinking}>
                  <span style={styles.thinkingDots}>...</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible element for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputArea}>
          <textarea
            placeholder="Ask me about appointments, doctors, symptoms, or general health information..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            rows={2}
            style={styles.textarea}
            disabled={loading}
          />
          <button 
            onClick={send} 
            disabled={loading || !input.trim()} 
            style={
              loading || !input.trim() 
                ? { ...styles.sendBtn, ...styles.sendBtnDisabled } 
                : styles.sendBtn
            }
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 20,
    zIndex: 2000,
    pointerEvents: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  card: {
    width: 400,
    maxWidth: "95vw",
    height: 600,
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 20px 60px rgba(2,6,23,0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  },
  header: {
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: 700,
    borderBottom: "1px solid #e2e8f0",
    background: "linear-gradient(90deg, #6d28d9, #06b6d4)",
    color: "white",
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 16,
  },
  headerActions: {
    display: "flex",
    gap: 8,
  },
  botIcon: {
    fontSize: 20,
  },
  clearBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    color: "white",
    padding: "4px 8px",
    borderRadius: 4,
    transition: "background-color 0.2s",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    color: "white",
    padding: "4px 8px",
    borderRadius: 4,
    transition: "background-color 0.2s",
  },
  messageList: {
    padding: 16,
    overflowY: "auto",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    background: "#f8fafc",
  },
  messageContent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  botIndicator: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#06b6d4",
  },
  userIndicator: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6d28d9",
    alignSelf: "flex-end",
  },
  userMsg: {
    alignSelf: "flex-end",
    background: "linear-gradient(135deg, #6d28d9, #06b6d4)",
    color: "white",
    padding: "12px 16px",
    borderRadius: 16,
    borderBottomRightRadius: 4,
    maxWidth: "80%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  botMsg: {
    alignSelf: "flex-start",
    background: "white",
    color: "#334155",
    padding: "12px 16px",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    maxWidth: "80%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
  },
  messageText: {
    fontSize: 14,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  thinking: {
    display: "flex",
    alignItems: "center",
    minHeight: 20,
  },
  thinkingDots: {
    fontSize: 24,
    letterSpacing: 2,
    color: "#64748b",
  },
  inputArea: {
    padding: 16,
    display: "flex",
    gap: 12,
    borderTop: "1px solid #e2e8f0",
    background: "white",
  },
  textarea: {
    flex: 1,
    resize: "none",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  },
  sendBtn: {
    padding: "12px 20px",
    borderRadius: 8,
    background: "linear-gradient(90deg, #6d28d9, #06b6d4)",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    transition: "opacity 0.2s",
    whiteSpace: "nowrap",
  },
  sendBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
};

// Add hover effects for buttons
styles.clearBtn = {
  ...styles.clearBtn,
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
};

styles.closeBtn = {
  ...styles.closeBtn,
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
};
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import '../../styles/Patient/PatientDashboard.css';
// import ChatBot from "./ChatBot"; // keep your working chatbot

// export default function PatientDashboard() {
//   const navigate = useNavigate();

//   const [reminders, setReminders] = useState([
//     { id: 1, name: "Paracetamol", time: "8:00 AM", status: "taken" },
//     { id: 2, name: "Vitamin D", time: "2:00 PM", status: "pending" },
//     { id: 3, name: "Blood Pressure", time: "8:00 PM", status: "pending" },
//   ]);
//   const [chatOpen, setChatOpen] = useState(false);

//   const markTaken = (id) => {
//     setReminders((prev) =>
//       prev.map((m) => (m.id === id ? { ...m, status: "taken" } : m))
//     );
//   };

//   const goTo = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-content">
//         {/* --- Header --- */}
//         <div className="dashboard-header">
//           <div className="header-content">
//             <div className="clinic-info">
//               <div className="clinic-icon">
//                 <span role="img" aria-label="heart" className="heart-icon">
//                   💙
//                 </span>
//               </div>
//               <div className="clinic-details">
//                 <h1 className="clinic-name">HealthCare Nabha</h1>
//                 <p className="clinic-location">Serving Nabha, Punjab</p>
//               </div>
//             </div>
//             <div className="header-actions">
//               <button className="notification-btn">🔔</button>
//               <button className="language-btn">🌐</button>
//               <button className="menu-btn">⚙️</button>
//             </div>
//           </div>
//         </div>

//         {/* --- SOS Emergency --- */}
//         <div className="sos-section">
//           <button
//             className="sos-button"
//             onClick={() => goTo("/SOSPg.jsx")}
//             type="button"
//           >
//             <span className="warning-icon">⚠️</span>
//             <div className="sos-text">
//               <div className="sos-title">SOS Emergency</div>
//               <div className="sos-subtitle">Call Ambulance</div>
//             </div>
//           </button>
//         </div>

//         {/* --- Quick Actions --- */}
//         <div className="quick-actions">
//           <div
//             className="action-card"
//             onClick={() => goTo("/BookConsultation.jsx")}
//           >
//             <div className="action-icon">📹</div>
//             <div className="action-label">Book Consultation</div>
//           </div>
//           {/* <Link to="/book-consultation" className="action-card">
//             <div className="action-icon">📹</div>
//             <div className="action-label">Book Consultation</div>
//           </Link> */}
//           <div
//             className="action-card"
//             onClick={() => goTo("/UploadsReports.jsx")}
//           >
//             <div className="action-icon">📤</div>
//             <div className="action-label">Upload Reports</div>
//           </div>
//         </div>

//         {/* --- Appointments --- */}
//         <div className="section">
//           <div className="section-header">
//             <span className="section-icon">📅</span>
//             <h2 className="section-title">Upcoming Appointments</h2>
//           </div>
//           <div className="appointment-card">
//             <div className="appointment-info">
//               <h3 className="doctor-name">Dr. Rajesh Kumar</h3>
//               <p className="specialty">General Medicine</p>
//               <div className="appointment-time">
//                 <span className="time-text">Today • 2:30 PM</span>
//               </div>
//             </div>
//             <div className="appointment-actions">
//               <span className="appointment-type video-call">Video Call</span>
//               <button className="call-button">📞</button>
//             </div>
//           </div>
//         </div>

//         {/* --- Medicine Reminders --- */}
//         <div className="section">
//           <div className="section-header">
//             <span className="section-icon">🔔</span>
//             <h2 className="section-title">Medicine Reminders</h2>
//           </div>
//           {reminders.map((med) => (
//             <div key={med.id} className="reminder-card">
//               <div
//                 className={`reminder-indicator ${
//                   med.status === "taken" ? "green" : "orange"
//                 }`}
//               />
//               <div className="reminder-info">
//                 <h4 className="medicine-name">{med.name}</h4>
//                 <p className="medicine-time">{med.time}</p>
//               </div>
//               {med.status === "taken" ? (
//                 <div className="reminder-status taken">✓ Taken</div>
//               ) : (
//                 <button
//                   className="reminder-status pending"
//                   onClick={() => markTaken(med.id)}
//                 >
//                   Mark Taken
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* --- Additional Services --- */}
//         <div className="section">
//           <h2 className="section-title">Additional Services</h2>
//           <div className="service-item" onClick={() => goTo("/prescriptions.jsx")}>
//             <div className="service-icon">💊</div>
//             <div className="service-name">Prescriptions</div>
//             <div className="service-arrow">→</div>
//           </div>
//           <div
//             className="service-item"
//             onClick={() => goTo("/health-records")}
//           >
//             <div className="service-icon">📋</div>
//             <div className="service-name">Health Records</div>
//             <div className="service-arrow">→</div>
//           </div>
//         </div>
//       </div>

//       {/* --- Fullscreen AI Chat overlay --- */}
//       {!chatOpen && (
//         <div
//           style={{
//             position: "fixed",
//             right: 20,
//             bottom: 20,
//             zIndex: 1000,
//           }}
//         >
//           <button
//             onClick={() => setChatOpen(true)}
//             style={{
//               background: "linear-gradient(135deg,#6d28d9,#06b6d4)",
//               color: "#fff",
//               border: "none",
//               borderRadius: 999,
//               padding: "12px 18px",
//               fontWeight: 600,
//               boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
//             }}
//           >
//             💬 AI Chat
//           </button>
//         </div>
//       )}

//       {chatOpen && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(255,255,255,0.98)",
//             zIndex: 2000,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div
//             style={{
//               padding: "10px",
//               textAlign: "right",
//               borderBottom: "1px solid #ddd",
//             }}
//           >
//             <button
//               onClick={() => setChatOpen(false)}
//               style={{
//                 background: "transparent",
//                 border: "none",
//                 fontSize: 20,
//                 cursor: "pointer",
//               }}
//             >
//               ✖
//             </button>
//           </div>
//           <div style={{ flex: 1, overflow: "auto" }}>
//             <ChatBot />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// // PatientDashboard.jsx (updated navigation)
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function PatientDashboard() {
//   const navigate = useNavigate();

//   // Ensure all navigations use the correct /patient prefix
//   const navigateTo = (path) => {
//     if (!path.startsWith('/patient')) {
//       navigate(`/patient${path}`);
//     } else {
//       navigate(path);
//     }
//   };

//   return (
//     <div style={styles.screen}>
//       <div style={styles.header}>
//         <div style={styles.h1}>Patient Dashboard</div>
//         <div style={styles.sub}>Welcome back!</div>
//       </div>

//       <div style={styles.body}>
//         <div style={styles.grid2}>
//           <button 
//             onClick={() => navigateTo('/book-consultation')} 
//             style={styles.card}
//           >
//             <div style={styles.emoji}>🩺</div>
//             <div style={styles.cardTitle}>Book Consultation</div>
//             <div style={styles.cardDesc}>Schedule with a doctor</div>
//           </button>

//           <button 
//             onClick={() => navigateTo('/prescriptions')} 
//             style={styles.card}
//           >
//             <div style={styles.emoji}>💊</div>
//             <div style={styles.cardTitle}>Prescriptions</div>
//             <div style={styles.cardDesc}>View your medications</div>
//           </button>

//           <button 
//             onClick={() => navigateTo('/health-records')} 
//             style={styles.card}
//           >
//             <div style={styles.emoji}>📋</div>
//             <div style={styles.cardTitle}>Health Records</div>
//             <div style={styles.cardDesc}>Medical history</div>
//           </button>

//           <button 
//             onClick={() => navigateTo('/upload-reports')} 
//             style={styles.card}
//           >
//             <div style={styles.emoji}>📄</div>
//             <div style={styles.cardTitle}>Upload Reports</div>
//             <div style={styles.cardDesc}>Share test results</div>
//           </button>

//           <button 
//             onClick={() => navigateTo('/sos')} 
//             style={{...styles.card, background: '#fee2e2'}}
//           >
//             <div style={styles.emoji}>🚨</div>
//             <div style={styles.cardTitle}>Emergency SOS</div>
//             <div style={styles.cardDesc}>Immediate help</div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   screen: { display: 'flex', flexDirection: 'column', minHeight: '100vh' },
//   header: { padding: '16px 16px 8px', background: '#ffffffcc', borderBottom: '1px solid #e5e7eb' },
//   h1: { fontSize: 22, fontWeight: 800 },
//   sub: { color: '#64748b', fontSize: 13, marginTop: 4 },
//   body: { padding: 14, flex: 1 },
//   grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
//   card: { 
//     background: '#fff', 
//     border: '1px solid #e5e7eb', 
//     borderRadius: 12, 
//     padding: 16, 
//     textAlign: 'center',
//     cursor: 'pointer',
//     transition: 'transform 0.2s',
//   },
//   emoji: { fontSize: 24, marginBottom: 8 },
//   cardTitle: { fontWeight: 700, fontSize: 14, marginBottom: 4 },
//   cardDesc: { fontSize: 12, color: '#64748b' }
// };


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Patient/PatientDashboard.css";
import ChatBot from "./ChatBot";

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([
    { id: 1, name: "Paracetamol", time: "8:00 AM", status: "taken" },
    { id: 2, name: "Vitamin D", time: "2:00 PM", status: "pending" },
    { id: 3, name: "Blood Pressure", time: "8:00 PM", status: "pending" },
  ]);
  const [chatOpen, setChatOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const markTaken = (id) => {
    setReminders((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "taken" } : m))
    );
  };

  const goTo = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Clear patient authentication data
    localStorage.removeItem("patientToken");
    localStorage.removeItem("patientPhoneNumber");
    localStorage.removeItem("patientData");

    // Clear any related data
    sessionStorage.clear();

    // Redirect directly to login page
    navigate("/login");

    // Optional: Show logout success message
    console.log("Patient logged out successfully");
  };

  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* --- Header --- */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="clinic-info">
              <div className="clinic-icon">
                <span role="img" aria-label="heart" className="heart-icon">
                  💙
                </span>
              </div>
              <div className="clinic-details">
                <h1 className="clinic-name">HealthCare Nabha</h1>
                <p className="clinic-location">Serving Nabha, Punjab</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="notification-btn">🔔</button>
              <button className="language-btn">🌐</button>
              {/* Logout Button */}
              <button
                className="logout-btn"
                onClick={confirmLogout}
                title="Logout"
              >
                🚪
              </button>
              <button className="menu-btn">⚙️</button>
            </div>
          </div>
        </div>

        {/* --- SOS Emergency --- */}
        <div className="sos-section">
          <button
            className="sos-button"
            onClick={() => goTo("/SOSPg.jsx")}
            type="button"
          >
            <span className="warning-icon">⚠️</span>
            <div className="sos-text">
              <div className="sos-title">SOS Emergency</div>
              <div className="sos-subtitle">Call Ambulance</div>
            </div>
          </button>
        </div>

        {/* --- Quick Actions --- */}
        <div className="quick-actions">
          <div
            className="action-card"
            onClick={() => goTo("/BookConsultation.jsx")}
          >
            <div className="action-icon">📹</div>
            <div className="action-label">Book Consultation</div>
          </div>
          <div
            className="action-card"
            onClick={() => goTo("/UploadsReports.jsx")}
          >
            <div className="action-icon">📤</div>
            <div className="action-label">Upload Reports</div>
          </div>
        </div>

        {/* --- Appointments --- */}
        <div className="section">
          <div className="section-header">
            <span className="section-icon">📅</span>
            <h2 className="section-title">Upcoming Appointments</h2>
          </div>
          <div className="appointment-card">
            <div className="appointment-info">
              <h3 className="doctor-name">Dr. Rajesh Kumar</h3>
              <p className="specialty">General Medicine</p>
              <div className="appointment-time">
                <span className="time-text">Today • 2:30 PM</span>
              </div>
            </div>
            <div className="appointment-actions">
              <span className="appointment-type video-call">Video Call</span>
              <button className="call-button">📞</button>
            </div>
          </div>
        </div>

        {/* --- Medicine Reminders --- */}
        <div className="section">
          <div className="section-header">
            <span className="section-icon">🔔</span>
            <h2 className="section-title">Medicine Reminders</h2>
          </div>
          {reminders.map((med) => (
            <div key={med.id} className="reminder-card">
              <div
                className={`reminder-indicator ${
                  med.status === "taken" ? "green" : "orange"
                }`}
              />
              <div className="reminder-info">
                <h4 className="medicine-name">{med.name}</h4>
                <p className="medicine-time">{med.time}</p>
              </div>
              {med.status === "taken" ? (
                <div className="reminder-status taken">✓ Taken</div>
              ) : (
                <button
                  className="reminder-status pending"
                  onClick={() => markTaken(med.id)}
                >
                  Mark Taken
                </button>
              )}
            </div>
          ))}
        </div>

        {/* --- Additional Services --- */}
        <div className="section">
          <h2 className="section-title">Additional Services</h2>
          <div
            className="service-item"
            onClick={() => goTo("/prescriptions.jsx")}
          >
            <div className="service-icon">💊</div>
            <div className="service-name">Prescriptions</div>
            <div className="service-arrow">→</div>
          </div>
          <div className="service-item" onClick={() => goTo("/health-records")}>
            <div className="service-icon">📋</div>
            <div className="service-name">Health Records</div>
            <div className="service-arrow">→</div>
          </div>
        </div>
      </div>

      {/* --- Logout Confirmation Modal --- */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="logout-modal">
            <div className="modal-header">
              <h3>Confirm Logout</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={cancelLogout}>
                Cancel
              </button>
              <button className="logout-confirm-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Fullscreen AI Chat overlay --- */}
      {!chatOpen && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setChatOpen(true)}
            style={{
              background: "linear-gradient(135deg,#6d28d9,#06b6d4)",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "12px 18px",
              fontWeight: 600,
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            }}
          >
            💬 AI Chat
          </button>
        </div>
      )}

      {chatOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.98)",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "10px",
              textAlign: "right",
              borderBottom: "1px solid #ddd",
            }}
          >
            <button
              onClick={() => setChatOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 20,
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <ChatBot />
          </div>
        </div>
      )}
    </div>
  );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../styles/Patient/HealthRecords.css";

// const familyMembers = [
//   {
//     id: "self",
//     label: "Rajesh\nSelf",
//     name: "Rajesh Kumar",
//     role: "Self",
//     dob: "6/15/1985",
//     blood: "B+",
//     record: "HR001",
//     allergies: ["Penicillin", "Peanuts"],
//     chronic: ["Hypertension"],
//     emergency: {
//       name: "Priya Kumar",
//       phone: "+91 98765 43210",
//       relation: "Spouse",
//     },
//     vitals: {
//       date: "1/15/2024",
//       pressure: "130/85 mmHg",
//       heartrate: "72 bpm",
//       weight: "75 kg",
//       height: `5'8"`,
//     },
//     history: [
//       {
//         title: "Hypertension",
//         date: "1/15/2024",
//         doctor: "Dr. Priya Singh",
//         notes: "Medication prescribed",
//       },
//       {
//         title: "Common Cold",
//         date: "12/20/2023",
//         doctor: "Dr. Rajesh Kumar",
//         notes: "Antibiotics and rest",
//       },
//     ],
//     vaccines: [
//       {
//         title: "COVID-19 Booster",
//         given: "11/15/2023",
//         nextDue: "11/15/2024",
//         overdue: true,
//       },
//       {
//         title: "Flu Shot",
//         given: "10/1/2023",
//         nextDue: "10/1/2024",
//         overdue: true,
//       },
//     ],
//   },
//   // Add more family members here as needed
// ];

// const TABS = ["Overview", "Vitals", "History", "Vaccines"];

// export default function HealthRecords() {
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState("self");
//   const [tab, setTab] = useState("Overview");
//   const person = familyMembers.find((x) => x.id === selected);

//   return (
//     <div className="records-root">
//       <div className="records-header">
//         <button
//           className="icon-btn"
//           aria-label="Back"
//           onClick={() => navigate("/")}
//         >
//           ←
//         </button>
//         <span>Health Records</span>
//         <div className="header-actions">
//           <button className="icon-btn" aria-label="Share">
//             🔗
//           </button>
//           <button className="icon-btn" aria-label="More">
//             ⋮
//           </button>
//         </div>
//       </div>

//       <div className="card family-card">
//         <div
//           className="section-label"
//           style={{ display: "flex", alignItems: "center", gap: 7 }}
//         >
//           <span
//             style={{ color: "#2950aa", fontSize: 19, display: "flex" }}
//           >
//             <svg
//               width="1em"
//               height="1em"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <circle cx="12" cy="8" r="4" fill="currentColor" />
//               <path
//                 d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </span>
//           Family Health Records
//         </div>
//         <div className="mini" style={{ marginLeft: 24 }}>
//           Select family member to view records
//         </div>
//         <div className="members-row">
//           {familyMembers.map((f) => (
//             <button
//               className={`member-btn${selected === f.id ? " active" : ""}`}
//               key={f.id}
//               onClick={() => {
//                 setSelected(f.id);
//                 setTab("Overview");
//               }}
//             >
//               <span className="member-icon" aria-hidden="true">
//                 <svg
//                   width="1em"
//                   height="1em"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <circle cx="12" cy="8" r="4" fill="currentColor" />
//                   <path
//                     d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//               </span>
//               <div className="member-name">{f.name.split(" ")[0]}</div>
//               <div className="member-meta">{f.role}</div>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="card profile-card">
//         <div className="profile-row">
//           <span className="avatar">{person.name.charAt(0)}</span>
//           <div>
//             <div className="profile-name">{person.name}</div>
//             <div className="profile-role">{person.role}</div>
//             <div className="mini">DOB: {person.dob}</div>
//           </div>
//         </div>
//         <div className="profile-id-row">
//           <span>
//             <b>Blood Type:</b> {person.blood}
//           </span>
//           <span style={{ flex: 1 }}></span>
//           <span>
//             <b>Record ID:</b> {person.record}
//           </span>
//         </div>
//       </div>

//       <div className="tabs-row">
//         {TABS.map((t) => (
//           <button
//             key={t}
//             className={`tab-btn${tab === t ? " active" : ""}`}
//             onClick={() => setTab(t)}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {tab === "Overview" && (
//         <>
//           <div className="card">
//             <div className="section-title">Allergies & Conditions</div>
//             <div className="line-head">Allergies:</div>
//             <div>
//               {person.allergies.length ? (
//                 person.allergies.map((a) => (
//                   <span className="pill allergy" key={a}>
//                     {a}
//                   </span>
//                 ))
//               ) : (
//                 <span className="mini">None</span>
//               )}
//             </div>
//             <div className="line-head" style={{ marginTop: 8 }}>
//               Chronic Conditions:
//             </div>
//             <div>
//               {person.chronic.length ? (
//                 person.chronic.map((c) => (
//                   <span className="pill chronic" key={c}>
//                     {c}
//                   </span>
//                 ))
//               ) : (
//                 <span className="mini">None</span>
//               )}
//             </div>
//           </div>
//           <div className="card">
//             <div className="section-title">Emergency Contact</div>
//             <table className="em-table">
//               <tbody>
//                 <tr>
//                   <td className="mini">
//                     <b>Name:</b>
//                   </td>
//                   <td className="mini" style={{ textAlign: "right" }}>
//                     {person.emergency.name}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="mini">
//                     <b>Phone:</b>
//                   </td>
//                   <td className="mini" style={{ textAlign: "right" }}>
//                     {person.emergency.phone}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="mini">
//                     <b>Relationship:</b>
//                   </td>
//                   <td className="mini" style={{ textAlign: "right" }}>
//                     {person.emergency.relation}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}

//       {tab === "Vitals" && (
//         <div className="card">
//           <div
//             className="section-title"
//             style={{ display: "flex", alignItems: "center", gap: 7 }}
//           >
//             <span style={{ color: "#c43d3d" }}>{"\u23F0"}</span>
//             Current Vitals
//           </div>
//           <div className="mini" style={{ marginBottom: 19 }}>
//             Last updated: {person.vitals.date}
//           </div>
//           <div className="vitals-row">
//             <div className="vital-box pressure">
//               <div className="vital-icon">❤️</div>
//               <div className="vital-label">Blood Pressure</div>
//               <div className="vital-value">{person.vitals.pressure}</div>
//             </div>
//             <div className="vital-box pulse">
//               <div className="vital-icon" style={{ color: "#3c77e8" }}>
//                 📈
//               </div>
//               <div className="vital-label">Heart Rate</div>
//               <div className="vital-value">{person.vitals.heartrate}</div>
//             </div>
//             <div className="vital-box weight">
//               <div className="vital-icon" style={{ color: "#38ad74" }}>🌿</div>
//               <div className="vital-label">Weight</div>
//               <div className="vital-value">{person.vitals.weight}</div>
//             </div>
//             <div className="vital-box height">
//               <div className="vital-icon" style={{ color: "#c39fec" }}>📏</div>
//               <div className="vital-label">Height</div>
//               <div className="vital-value">{person.vitals.height}</div>
//             </div>
//           </div>
//         </div>
//       )}

//       {tab === "History" && (
//         <div className="card">
//           <div
//             className="section-title"
//             style={{ display: "flex", alignItems: "center", gap: 8 }}
//           >
//             <span style={{ color: "#398944" }}>{"💚"}</span> Medical History
//           </div>
//           {person.history.map((entry) => (
//             <div className="history-item" key={entry.title + entry.date}>
//               <div className="history-title">{entry.title}</div>
//               <div className="mini">{entry.date}</div>
//               <div className="mini">
//                 Doctor: {entry.doctor}
//                 <br />
//                 {entry.notes}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {tab === "Vaccines" && (
//         <div className="card">
//           <div className="section-title">Vaccination Record</div>
//           {person.vaccines.map((v) => (
//             <div className="vaccine-row" key={v.title}>
//               <div>
//                 <div className="vaccine-title">{v.title}</div>
//                 <div className="mini">Given: {v.given}</div>
//                 <div className="mini">
//                   Next due:{" "}
//                   <span style={{ color: v.overdue ? "#ed3c65" : "#3c77e8" }}>
//                     {v.nextDue}
//                   </span>
//                 </div>
//               </div>
//               {v.overdue && <span className="vaccine-overdue">Overdue</span>}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="card btn-card">
//         <button className="main-btn">Download Complete Health Record</button>
//         <button className="outline-btn">Share with Healthcare Provider</button>
//       </div>
//       <div className="card notes-card">
//         <div className="notes-title">Important Notes</div>
//         <ul>
//           <li>Keep health records updated after each visit</li>
//           <li>Share records with doctors before appointments</li>
//           <li>Maintain emergency contact information</li>
//           <li>Track vaccination schedules for family</li>
//         </ul>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Patient/HealthRecords.css";

const TABS = ["Overview", "Vitals", "History"];

export default function HealthRecords() {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState("self");
  const [tab, setTab] = useState("Overview");

  // Check authentication and get token
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Redirect if not authenticated
  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
      return;
    }
  }, [token, user, navigate]);

  // Fetch patient data
  useEffect(() => {
    const fetchPatientData = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/patients/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setPatientData(data.data);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch patient data');
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setError('Network error. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [token]);

  // Loading state
  if (loading) {
    return (
      <div className="records-root">
        <div className="records-header">
          <button
            className="icon-btn"
            aria-label="Back"
            onClick={() => navigate("/patient")}
          >
            ←
          </button>
          <span>Health Records</span>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <div>Loading your health records...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="records-root">
        <div className="records-header">
          <button
            className="icon-btn"
            aria-label="Back"
            onClick={() => navigate("/patient")}
          >
            ←
          </button>
          <span>Health Records</span>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ color: '#dc3545', marginBottom: '1rem' }}>
            Error: {error}
          </div>
          <button 
            className="main-btn" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!patientData) {
    return null;
  }

  // Create family members array including self
  const familyMembers = [
    {
      id: "self",
      name: patientData.name,
      age: patientData.age,
      role: "Self",
      height: patientData.height || "Not specified",
      weight: patientData.weight || "Not specified",
      bloodGroup: patientData.bloodGroup || "Not specified",
      activeHealthStatus: patientData.activeHealthStatus || "No current issues",
      isSelf: true
    },
    ...patientData.familyMembers.map((member, index) => ({
      id: `member_${index}`,
      name: member.name,
      age: member.age,
      role: member.relation,
      height: member.height || "Not specified",
      weight: member.weight || "Not specified",
      bloodGroup: member.bloodGroup || "Not specified",
      activeHealthStatus: member.activeHealthStatus || "No current issues",
      isSelf: false
    }))
  ];

  const currentPerson = familyMembers.find(member => member.id === selected) || familyMembers[0];

  const handleAppointment = (person) => {
    // Navigate to appointment booking page with person details
    navigate('/book-appointment', { 
      state: { 
        patientName: person.name,
        patientAge: person.age,
        relationship: person.role,
        isMainPatient: person.isSelf
      }
    });
  };

  return (
    <div className="records-root">
      <div className="records-header">
        <button
          className="icon-btn"
          aria-label="Back"
          onClick={() => navigate("/patient")}
        >
          ←
        </button>
        <span>Health Records</span>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Share">
            🔗
          </button>
          <button className="icon-btn" aria-label="More">
            ⋮
          </button>
        </div>
      </div>

      <div className="card family-card">
        <div
          className="section-label"
          style={{ display: "flex", alignItems: "center", gap: 7 }}
        >
          <span style={{ color: "#2950aa", fontSize: 19, display: "flex" }}>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="4" fill="currentColor" />
              <path
                d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          Family Health Records
        </div>
        <div className="mini" style={{ marginLeft: 24 }}>
          Select family member to view records ({familyMembers.length} member{familyMembers.length !== 1 ? 's' : ''})
        </div>
        <div className="members-row">
          {familyMembers.map((member) => (
            <button
              className={`member-btn${selected === member.id ? " active" : ""}`}
              key={member.id}
              onClick={() => {
                setSelected(member.id);
                setTab("Overview");
              }}
            >
              <span className="member-icon" aria-hidden="true">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="8" r="4" fill="currentColor" />
                  <path
                    d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="member-name">{member.name.split(" ")[0]}</div>
              <div className="member-meta">{member.role}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card profile-card">
        <div className="profile-row">
          <span className="avatar">{currentPerson.name.charAt(0)}</span>
          <div>
            <div className="profile-name">{currentPerson.name}</div>
            <div className="profile-role">{currentPerson.role}</div>
            <div className="mini">Age: {currentPerson.age} years</div>
          </div>
        </div>
        <div className="profile-id-row">
          <span>
            <b>Blood Type:</b> {currentPerson.bloodGroup}
          </span>
          <span style={{ flex: 1 }}></span>
          {/* <button 
            className="main-btn"
            onClick={() => handleAppointment(currentPerson)}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              minWidth: 'auto'
            }}
          >
            Book Appointment
          </button> */}
        </div>
      </div>

      <div className="tabs-row">
        {TABS.map((t) => (
          <button
            key={t}
            className={`tab-btn${tab === t ? " active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <>
          <div className="card">
            <div className="section-title">Health Information</div>
            <div className="line-head">Current Health Status:</div>
            <div style={{ marginBottom: 12 }}>
              <span className="pill chronic" style={{ 
                backgroundColor: currentPerson.activeHealthStatus === "No current issues" ? "#38ad74" : "#f39c12",
                color: "white"
              }}>
                {currentPerson.activeHealthStatus}
              </span>
            </div>
            
            <div className="line-head">Physical Information:</div>
            <table className="em-table">
              <tbody>
                <tr>
                  <td className="mini"><b>Height:</b></td>
                  <td className="mini" style={{ textAlign: "right" }}>
                    {currentPerson.height}
                  </td>
                </tr>
                <tr>
                  <td className="mini"><b>Weight:</b></td>
                  <td className="mini" style={{ textAlign: "right" }}>
                    {currentPerson.weight}
                  </td>
                </tr>
                <tr>
                  <td className="mini"><b>Blood Group:</b></td>
                  <td className="mini" style={{ textAlign: "right" }}>
                    {currentPerson.bloodGroup}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {currentPerson.isSelf && (
            <div className="card">
              <div className="section-title">Account Information</div>
              <table className="em-table">
                <tbody>
                  <tr>
                    <td className="mini"><b>Phone Number:</b></td>
                    <td className="mini" style={{ textAlign: "right" }}>
                      {patientData.phoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="mini"><b>Member Since:</b></td>
                    <td className="mini" style={{ textAlign: "right" }}>
                      {new Date(patientData.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="mini"><b>Last Updated:</b></td>
                    <td className="mini" style={{ textAlign: "right" }}>
                      {new Date(patientData.updatedAt).toLocaleDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {tab === "Vitals" && (
        <div className="card">
          <div
            className="section-title"
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <span style={{ color: "#c43d3d" }}>⏰</span>
            Current Vitals
          </div>
          <div className="mini" style={{ marginBottom: 19 }}>
            Last updated: {new Date(patientData.updatedAt).toLocaleDateString()}
          </div>
          <div className="vitals-row">
            <div className="vital-box height">
              <div className="vital-icon" style={{ color: "#c39fec" }}>📏</div>
              <div className="vital-label">Height</div>
              <div className="vital-value">{currentPerson.height}</div>
            </div>
            <div className="vital-box weight">
              <div className="vital-icon" style={{ color: "#38ad74" }}>🌿</div>
              <div className="vital-label">Weight</div>
              <div className="vital-value">{currentPerson.weight}</div>
            </div>
            <div className="vital-box">
              <div className="vital-icon" style={{ color: "#dc3545" }}>🩸</div>
              <div className="vital-label">Blood Group</div>
              <div className="vital-value">{currentPerson.bloodGroup}</div>
            </div>
            <div className="vital-box">
              <div className="vital-icon" style={{ color: "#17a2b8" }}>💚</div>
              <div className="vital-label">Health Status</div>
              <div className="vital-value" style={{ fontSize: '12px' }}>
                {currentPerson.activeHealthStatus.length > 15 
                  ? currentPerson.activeHealthStatus.substring(0, 15) + '...'
                  : currentPerson.activeHealthStatus
                }
              </div>
            </div>
          </div>
          
          {(currentPerson.height === "Not specified" || 
            currentPerson.weight === "Not specified" || 
            currentPerson.bloodGroup === "Not specified") && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              backgroundColor: '#fff3cd',
              borderRadius: '4px',
              border: '1px solid #ffeaa7'
            }}>
              <div className="mini" style={{ color: '#856404' }}>
                📝 Some health information is missing. Consider updating the profile for more accurate records.
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "History" && (
        <div className="card">
          <div
            className="section-title"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{ color: "#398944" }}>💚</span> Medical History
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#6c757d'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>📋</div>
            <div className="mini">No medical history recorded yet</div>
            <div className="mini" style={{ marginTop: '0.5rem' }}>
              Medical history will appear here after consultations and treatments
            </div>
          </div>
        </div>
      )}

      <div className="card btn-card">
        <button 
          className="main-btn"
          onClick={() => handleAppointment(currentPerson)}
        >
          Book Appointment for {currentPerson.name}
        </button>
        <button 
          className="outline-btn"
          onClick={() => navigate('/update-health', {
            state: {
              memberName: currentPerson.isSelf ? null : currentPerson.name,
              isMainPatient: currentPerson.isSelf
            }
          })}
        >
          Update Health Information
        </button>
      </div>

      <div className="card notes-card">
        <div className="notes-title">Important Notes</div>
        <ul>
          <li>Keep health records updated after each visit</li>
          <li>Share records with doctors before appointments</li>
          <li>Maintain accurate information for all family members</li>
          <li>Book regular check-ups for preventive care</li>
          <li>Update emergency contact information as needed</li>
        </ul>
      </div>
    </div>
  );
}
// Dashboard.jsx (updated)
import React, { useState, useEffect } from "react";
import { Calendar, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctorData();
    fetchAppointments();
  }, []);

  const fetchDoctorData = async () => {
    try {
      const token = localStorage.getItem('doctorToken');
      const response = await fetch('http://localhost:5000/api/doctors/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDoctorData(data.data.doctor);
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('doctorToken');
      const response = await fetch('http://localhost:5000/api/appointments/doctor', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate) >= new Date() && !apt.isDeleted
  );
  
  const completedAppointments = appointments.filter(apt => 
    apt.isDeleted || new Date(apt.appointmentDate) < new Date()
  );

  const handleStartAppointment = (patientName, appointmentId) => {
    // For now, we'll use the mock call functionality
    navigate(`/doctor/call?p=${encodeURIComponent(patientName)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctorData');
    navigate('/doctor-login');
  };

  if (loading) {
    return (
      <div style={styles.screen}>
        <div style={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.screen}>
      <div style={styles.header}> 
        <div>
          <div style={styles.h1}>
            {doctorData?.name || 'Doctor Dashboard'}
          </div>
          <div style={styles.sub}>
            {doctorData?.specialization || 'Specialist'} • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={styles.body}>
        <div style={styles.grid2}>
          <div style={{...styles.statCard, background:'#eef2ff'}}>
            <div>
              <div style={styles.statLabel}>Today's Appointments</div>
              <div style={styles.statValue}>{upcomingAppointments.length}</div>
            </div>
            <Calendar size={20} color="#6366f1" />
          </div>
          <div style={{...styles.statCard, background:'#f3e8ff'}}>
            <div>
              <div style={styles.statLabel}>Patients Seen</div>
              <div style={styles.statValue}>{completedAppointments.length}</div>
            </div>
            <Users size={20} color="#a855f7" />
          </div>

          <button onClick={()=>navigate('/doctor/queue')} style={styles.linkCard}>
            <div>
              <div style={styles.statLabel}>Queue</div>
              <div style={styles.statValue}>Manage Waiting</div>
            </div>
            <Clock size={20} color="#a855f7" />
          </button>

          <button onClick={()=>navigate('/doctor/appointments')} style={styles.linkCard}>
            <div>
              <div style={styles.statLabel}>Appointments</div>
              <div style={styles.statValue}>View All</div>
            </div>
            <Calendar size={20} color="#6366f1" />
          </button>
        </div>

        <div style={styles.card}> 
          <div style={styles.sectionTitle}>Next Appointments</div>
          <div>
            {upcomingAppointments.slice(0, 3).map((appointment, index) => (
              <div key={index} style={styles.listRow}>
                <span>
                  {appointment.patientName} — {new Date(appointment.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  {appointment.diseaseOrHealthIssue && (
                    <span style={styles.note}> • {appointment.diseaseOrHealthIssue}</span>
                  )}
                </span>
                <button 
                  onClick={() => handleStartAppointment(appointment.patientName, appointment._id)}
                  style={styles.primary}
                >
                  Start
                </button>
              </div>
            ))}
            {upcomingAppointments.length === 0 && (
              <div style={styles.noData}>No upcoming appointments</div>
            )}
          </div>
        </div>

        <div style={styles.card}> 
          <div style={styles.sectionTitle}>Recent Completed</div>
          <div>
            {completedAppointments.slice(0, 3).map((appointment, index) => (
              <div key={index} style={styles.listRow}>
                <span>
                  {appointment.patientName} • {new Date(appointment.appointmentDate).toLocaleDateString()}
                  {appointment.diseaseOrHealthIssue && (
                    <span style={styles.note}> • {appointment.diseaseOrHealthIssue}</span>
                  )}
                </span>
                <span style={styles.completedBadge}>Completed</span>
              </div>
            ))}
            {completedAppointments.length === 0 && (
              <div style={styles.noData}>No completed appointments</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  screen: { display:'flex', flexDirection:'column', minHeight:'100vh' },
  header: { 
    padding:'16px 16px 8px 16px', 
    position:'sticky', 
    top:0, 
    background:'#ffffffcc', 
    backdropFilter:'blur(10px)', 
    borderBottom:'1px solid #e5e7eb', 
    zIndex:10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  body: { padding:14 },
  h1: { fontSize:22, fontWeight:800 },
  sub: { color:'#64748b', fontSize:13, marginTop:4 },
  grid2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 },
  statCard: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:12, borderRadius:12, border:'1px solid #e5e7eb' },
  linkCard: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:12, borderRadius:12, border:'1px solid #e5e7eb', background:'#fff', cursor:'pointer' },
  statLabel: { fontSize:12, fontWeight:600, color:'#334155' },
  statValue: { fontSize:18, fontWeight:800, color:'#0f172a' },
  card: { background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:14, boxShadow:'0 12px 30px rgba(2,6,23,0.08)', marginTop:12 },
  sectionTitle: { fontWeight:700, fontSize:14, color:'#374151', marginBottom: '10px' },
  listRow: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f1f5f9', fontSize:13 },
  primary: { padding:'6px 10px', borderRadius:8, background:'linear-gradient(90deg, #6366f1, #a855f7)', color:'#fff', border:'none', fontWeight:700, cursor: 'pointer' },
  note: { color: '#6b7280', fontSize: '12px' },
  completedBadge: { padding:'4px 8px', borderRadius:999, background:'#e5e7eb', color:'#475569', fontSize:11, fontWeight:700 },
  noData: { textAlign: 'center', color: '#6b7280', padding: '20px', fontSize: '14px' },
  logoutBtn: { padding:'8px 16px', borderRadius:8, background:'#ef4444', color:'white', border:'none', fontWeight:600, cursor:'pointer' },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px' }
};
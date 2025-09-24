import React, { useState } from "react";

export default function AppointmentsPage() {
  const [tab, setTab] = useState("upcoming");

  const upcoming = [
    { name: "Sarah Johnson", time: "10:30 AM • Video", status: "Confirmed", note: "Diabetes follow-up" },
    { name: "Michael Chen", time: "11:00 AM • Video", status: "Urgent", urgent: true, note: "Chest pain evaluation" },
    { name: "Emma Davis", time: "2:00 PM • Phone", status: "Confirmed", note: "Routine check-up" },
  ];

  const completed = [
    { name: "David Wilson", time: "9:00 AM • Video", status: "Completed", note: "Blood pressure check" },
    { name: "Sophia Brown", time: "9:45 AM • In-person", status: "Completed", note: "Prescription renewal" },
  ];

  const patients = tab === "upcoming" ? upcoming : completed;

  return (
    <div style={{display:'flex', flexDirection:'column', minHeight:'100vh'}}>
      <div style={{padding:'16px 16px 8px', position:'sticky', top:0, background:'#ffffffcc', borderBottom:'1px solid #e5e7eb', backdropFilter:'blur(10px)'}}>
        <div style={{fontWeight:800}}>Appointments</div>
        <div style={{fontSize:12, color:'#64748b'}}>City Centre Hospital</div>
      </div>

      <div style={{padding:14}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:12}}>
          <button onClick={()=>setTab('upcoming')} style={{padding:'10px', borderRadius:10, fontWeight:700, border:'1px solid #e5e7eb', background: tab==='upcoming' ? 'linear-gradient(90deg,#6366f1,#a855f7)' : '#f1f5f9', color: tab==='upcoming' ? '#fff' : '#111827'}}>Upcoming ({upcoming.length})</button>
          <button onClick={()=>setTab('completed')} style={{padding:'10px', borderRadius:10, fontWeight:700, border:'1px solid #e5e7eb', background: tab==='completed' ? 'linear-gradient(90deg,#6366f1,#a855f7)' : '#f1f5f9', color: tab==='completed' ? '#fff' : '#111827'}}>Completed ({completed.length})</button>
        </div>

        {patients.map((p, i) => (
          <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:12, marginBottom:10, boxShadow:'0 12px 30px rgba(2,6,23,0.08)'}}>
            <div>
              <div style={{fontWeight:600}}>{p.name}</div>
              <div style={{fontSize:13, color:'#6b7280'}}>{p.time}</div>
              <div style={{fontSize:12, color:'#94a3b8'}}>{p.note}</div>
            </div>
            <span style={{padding:'6px 8px', borderRadius:999, fontSize:12, fontWeight:700, background: p.urgent ? '#f3e8ff' : (tab==='completed' ? '#e5e7eb' : '#e0e7ff'), color: p.urgent ? '#7e22ce' : (tab==='completed' ? '#475569' : '#4338ca')}}>
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

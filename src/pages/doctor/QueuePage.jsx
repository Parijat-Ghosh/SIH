import React from "react";

export default function QueuePage() {
  const queue = [
    { name: "Emma Davis", waiting: "5 min" },
    { name: "Robert Wilson", waiting: "12 min" },
    { name: "Sophia Brown", waiting: "20 min" },
  ];

  const handleCall = (patient) => {
    alert(`Calling ${patient}`);
  };

  const handleView = (patient) => {
    alert(`Viewing details for ${patient}`);
  };

  const handleRemove = (patient) => {
    alert(`${patient} removed from queue`);
  };

  return (
    <div style={{display:'flex', flexDirection:'column', minHeight:'100vh'}}>
      <div style={{padding:'16px 16px 8px', position:'sticky', top:0, background:'#ffffffcc', borderBottom:'1px solid #e5e7eb', backdropFilter:'blur(10px)'}}>
        <div style={{fontWeight:800}}>Queue Management</div>
        <div style={{fontSize:12, color:'#64748b'}}>City Centre Hospital</div>
      </div>
      <div style={{padding:14}}>
        {queue.map((p, i) => (
          <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:12, marginBottom:10, boxShadow:'0 12px 30px rgba(2,6,23,0.08)'}}>
            <div>
              <div style={{fontWeight:600}}>{p.name}</div>
              <div style={{fontSize:12, color:'#6b7280'}}>Waiting {p.waiting}</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button onClick={()=>handleCall(p.name)} style={{padding:'6px 10px', borderRadius:8, background:'linear-gradient(90deg,#6366f1,#a855f7)', color:'#fff', border:'none', fontWeight:700}}>Call</button>
              <button onClick={()=>handleView(p.name)} style={{padding:'6px 10px', borderRadius:8, background:'#f8fafc', color:'#111827', border:'1px solid #e5e7eb', fontWeight:600}}>View</button>
              <button onClick={()=>handleRemove(p.name)} style={{padding:'6px 10px', borderRadius:8, background:'#ef4444', color:'#fff', border:'none', fontWeight:700}}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

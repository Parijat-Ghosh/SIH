// LandingPage.jsx (updated)
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.root}>
      <div style={styles.backdrop} />
      <div style={styles.card}>
        <div style={styles.header}>Hospital Portal</div>
        <div style={styles.sub}>Choose your role to continue</div>

        <div style={styles.grid}>
          <button style={{...styles.tile, background: '#eef2ff'}} onClick={() => navigate('/hospital')}>
            <div style={styles.emoji}>🏥</div>
            <div style={styles.title}>Hospital</div>
            <div style={styles.meta}>Manage patients & doctors</div>
          </button>

          <button style={{...styles.tile, background: '#ecfeff'}} onClick={() => navigate('/doctor-signup')}>
            <div style={styles.emoji}>👨‍⚕️</div>
            <div style={styles.title}>Doctor</div>
            <div style={styles.meta}>Queue and appointments</div>
          </button>

          <button style={{...styles.tile, background: '#f0fdf4'}} onClick={() => navigate('/patient')}>
            <div style={styles.emoji}>🧑</div>
            <div style={styles.title}>Patient</div>
            <div style={styles.meta}>Dashboard & health records</div>
          </button>
        </div>

        <div style={styles.note}>Demo login — no credentials required</div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
  },
  backdrop: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,0.7), transparent 70%), var(--bg-gradient)',
    zIndex: 0
  },
  card: {
    position: 'relative', zIndex: 1,
    width: 'min(92vw, 520px)', background: '#fff', borderRadius: 16, padding: 24,
    boxShadow: '0 20px 60px rgba(2,6,23,0.15)'
  },
  header: { fontSize: 22, fontWeight: 800, textAlign: 'center' },
  sub: { textAlign: 'center', color: '#64748b', marginTop: 6 },
  grid: { display: 'grid', gridTemplateColumns: '1fr', gap: 12, marginTop: 18 },
  tile: {
    border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, textAlign: 'left', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 12
  },
  emoji: { fontSize: 24 },
  title: { fontWeight: 700 },
  meta: { fontSize: 13, color: '#64748b' },
  note: { textAlign: 'center', marginTop: 16, fontSize: 12, color: '#94a3b8' }
};
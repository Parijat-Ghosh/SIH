import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CallPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const patient = params.get('p') || 'Patient';

  const videoRef = useRef(null);
  const selfRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let intervalId;
    async function start() {
      try {
        const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(media);
        if (videoRef.current) {
          videoRef.current.srcObject = media;
          await videoRef.current.play();
        }
        if (selfRef.current) {
          selfRef.current.srcObject = media;
          await selfRef.current.play();
        }
        intervalId = setInterval(() => setTimer((t) => t + 1), 1000);
      } catch (e) {
        alert('Camera/Microphone permission was denied.');
      }
    }
    start();
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const toggleMute = () => {
    if (!stream) return;
    stream.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
    setMuted((m) => !m);
  };

  const toggleCamera = () => {
    if (!stream) return;
    stream.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
    setCameraOn((c) => !c);
  };

  const endCall = () => {
    if (stream) stream.getTracks().forEach((t) => t.stop());
    navigate('/doctor/appointments');
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const r = (s % 60).toString().padStart(2, '0');
    return `${m}:${r}`;
  };

  return (
    <div style={styles.screen}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.back}>←</button>
        <div style={styles.title}>Call with {patient}</div>
        <div style={styles.timer}>{formatTime(timer)}</div>
      </div>

      <div style={styles.videoWrap}>
        <video ref={videoRef} playsInline muted style={styles.video} />
        {!cameraOn && <div style={styles.cameraOff}>Camera Off</div>}
        <video ref={selfRef} playsInline muted style={styles.selfView} />
      </div>

      <div style={styles.controls}>
        <button onClick={toggleMute} style={{...styles.circleBtn, background: muted ? '#fee2e2' : 'linear-gradient(135deg,#60a5fa,#a78bfa)'}}>{muted ? '🎙️' : '🔇'}</button>
        <button onClick={toggleCamera} style={{...styles.circleBtn, background: cameraOn ? 'linear-gradient(135deg,#34d399,#60a5fa)' : '#fef3c7'}}>{cameraOn ? '📷' : '🚫'}</button>
        <button onClick={endCall} style={{...styles.circleBtn, background:'linear-gradient(135deg,#f43f5e,#ef4444)'}}>⛔</button>
      </div>
    </div>
  );
}

const styles = {
  screen: { display:'flex', flexDirection:'column', minHeight:'100vh' },
  header: { position:'sticky', top:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'#ffffffcc', borderBottom:'1px solid #e5e7eb', backdropFilter:'blur(10px)', zIndex:10 },
  back: { background:'transparent', border:'1px solid #e5e7eb', borderRadius:8, padding:'4px 8px', cursor:'pointer' },
  title: { fontWeight:800, letterSpacing:0.2 },
  timer: { fontVariantNumeric:'tabular-nums', fontWeight:700, color:'#334155' },
  videoWrap: { position:'relative', margin:14, borderRadius:16, overflow:'hidden', border:'1px solid #e5e7eb', boxShadow:'0 20px 60px rgba(2,6,23,0.15)' },
  video: { width:'100%', height:'auto', display:'block', background:'#000' },
  cameraOff: { position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'#e2e8f0', background:'linear-gradient(135deg,#111827,#1f2937)' },
  selfView: { position:'absolute', right:10, bottom:10, width:100, height:140, background:'#000', borderRadius:12, border:'2px solid rgba(255,255,255,0.6)', objectFit:'cover' },
  controls: { display:'flex', alignItems:'center', justifyContent:'center', gap:14, padding:'12px 14px 18px' },
  circleBtn: { width:56, height:56, borderRadius:28, display:'flex', alignItems:'center', justifyContent:'center', border:'none', color:'#fff', fontSize:18, fontWeight:800, boxShadow:'0 10px 24px rgba(2,6,23,0.2)', cursor:'pointer' }
};



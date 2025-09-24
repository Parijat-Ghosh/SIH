


// Step3DateTime.jsx
import React, { useState } from "react";

export default function Step3DateTime({ nextStep, prevStep, setFormData }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [healthIssue, setHealthIssue] = useState("");

  const handleConfirm = () => {
    if (date && time && healthIssue) {
      setFormData((prev) => ({ ...prev, date, time, healthIssue }));
      nextStep();
    } else {
      alert("Please select date, time and describe your health issue");
    }
  };

  // Generate time slots from 9 AM to 8 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 20; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 20) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div>
      <h3>Describe Your Health Issue</h3>
      <textarea
        value={healthIssue}
        onChange={(e) => setHealthIssue(e.target.value)}
        placeholder="Please describe your symptoms or health concern..."
        rows={4}
        style={{ width: '100%', marginBottom: '20px', padding: '10px' }}
      />
      
      <h3>Select Date & Time</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]} // Disable past dates
        style={{ marginBottom: '20px', padding: '8px' }}
      />
      
      <div className="time-grid">
        {timeSlots.map((t) => (
          <button
            key={t}
            className={`time-slot ${time === t ? "selected" : ""}`}
            onClick={() => setTime(t)}
          >
            {t}
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={prevStep}>Back</button>
        <button onClick={handleConfirm}>Continue</button>
      </div>
    </div>
  );
}
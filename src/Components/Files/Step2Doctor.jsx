



// Step2Doctor.jsx - with better error handling
import React, { useState, useEffect } from "react";

// Fallback data based on your actual database doctor
const fallbackDoctors = {
  "Cardiology": [
    {
      _id: "68d28139d351bbf7deed243c",
      name: "Dr. John Smith",
      specialization: "Cardiology", 
      phoneNumber: "9876543210",
      uniqueId: "DOC001",
      available: true,
      image: "https://via.placeholder.com/80"
    }
  ]
};

export default function Step2Doctor({ nextStep, prevStep, setFormData, specialty }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctorsBySpecialization();
  }, [specialty]);

  const fetchDoctorsBySpecialization = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from API first
      const response = await fetch(`http://localhost:5000/api/doctors/all`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          // Filter doctors by specialization on client side
          const filteredDoctors = data.data.doctors.filter(doctor => 
            doctor.specialization === specialty
          );
          setDoctors(filteredDoctors);
        } else {
          throw new Error(data.message || 'Failed to fetch doctors');
        }
      } else {
        throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (err) {
      console.error('API Error:', err);
      // Use fallback data if API fails
      setDoctors(fallbackDoctors[specialty] || []);
      setError('Using offline data. Some features may be limited.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (doctor) => {
    setFormData((prev) => ({ ...prev, doctor }));
    nextStep();
  };

  if (loading) {
    return (
      <div>
        <h3>Select Doctor for {specialty}</h3>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Loading doctors...</p>
        </div>
        <button onClick={prevStep}>Back</button>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div>
        <h3>Select Doctor for {specialty}</h3>
        {error && (
          <div style={{ 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7',
            color: '#856404',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            ⚠️ {error}
          </div>
        )}
        <p>No doctors available for {specialty}. Please select a different specialty.</p>
        <button onClick={prevStep}>Back to Specialty</button>
        <button onClick={fetchDoctorsBySpecialization} style={{ marginLeft: '10px' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3>Select Doctor for {specialty}</h3>
      
      {error && (
        <div style={{ 
          background: '#fff3cd', 
          border: '1px solid #ffeaa7',
          color: '#856404',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          ⚠️ {error}
        </div>
      )}
      
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        Found {doctors.length} doctor(s) available
      </p>
      
      {doctors.map((doc) => (
        <div key={doc._id || doc.uniqueId} className="doctor-card" onClick={() => handleSelect(doc)}>
          <img 
            src={doc.image || "https://via.placeholder.com/80"} 
            alt={doc.name} 
            className="doctor-img" 
          />
          <div>
            <h4>{doc.name}</h4>
            <p>{doc.specialization}</p>
            <p>Experienced doctor</p>
            <p>⭐ 4.5 — ₹Consultation fee</p>
            <div>
              <span className="tag">English</span>
              <span className="tag">Hindi</span>
              <span className="tag available">Available</span>
            </div>
          </div>
        </div>
      ))}
      <button onClick={prevStep}>Back</button>
    </div>
  );
}
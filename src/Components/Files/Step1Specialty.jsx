

// Step1Specialty.jsx (updated to show real doctor counts)
import React, { useState, useEffect } from "react";

const defaultSpecialties = [
  { name: "General Medicine", icon: "🩺" },
  { name: "Cardiology", icon: "❤️" },
  { name: "Dermatology", icon: "🧴" },
  { name: "Pediatrics", icon: "👶" },
  { name: "Orthopedics", icon: "🦴" },
  { name: "Gynecology", icon: "👩‍⚕️" },
];

export default function Step1Specialty({ nextStep, setFormData }) {
  const [specialties, setSpecialties] = useState(defaultSpecialties);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctorCounts();
  }, []);

  const fetchDoctorCounts = async () => {
    try {
      // Fetch all doctors to count by specialization
      const response = await fetch("http://localhost:5000/api/doctors/all");
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          const doctors = data.data.doctors || [];
          
          // Count doctors by specialization
          const specialtyCounts = {};
          doctors.forEach(doctor => {
            const spec = doctor.specialization;
            specialtyCounts[spec] = (specialtyCounts[spec] || 0) + 1;
          });
          
          // Update specialties with real counts
          const updatedSpecialties = defaultSpecialties.map(spec => ({
            ...spec,
            doctors: specialtyCounts[spec.name] || 0
          }));
          
          setSpecialties(updatedSpecialties);
        }
      }
    } catch (error) {
      console.error("Error fetching doctor counts:", error);
      // If there's an error, use default counts (0)
      const updatedSpecialties = defaultSpecialties.map(spec => ({
        ...spec,
        doctors: 0
      }));
      setSpecialties(updatedSpecialties);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (specialty) => {
    setFormData((prev) => ({ ...prev, specialty }));
    nextStep();
  };

  return (
    <div>
      <h3>Select Specialty</h3>
      {loading && <p style={{ textAlign: 'center' }}>Loading specialties...</p>}
      <div className="grid">
        {specialties.map((s) => (
          <div key={s.name} className="card" onClick={() => handleSelect(s.name)}>
            <div className="icon">{s.icon}</div>
            <h4>{s.name}</h4>
            <span>{s.doctors} doctor{s.doctors !== 1 ? 's' : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
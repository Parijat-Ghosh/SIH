

// Step4Confirm.jsx (minor update for backend data structure)
import React, { useState } from "react";

export default function Step4Confirm({ prevStep, formData }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Please login first");
      }

      // Prepare appointment data according to your backend schema
      const appointmentData = {
        doctorUniqueId: formData.doctor.uniqueId,
        diseaseOrHealthIssue: formData.healthIssue,
        appointmentDate: new Date(formData.date).toISOString(),
        appointmentTime: formData.time
      };

      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to book consultation");
      }

      const result = await response.json();
      setSuccess(true);
      
      // Redirect to patient dashboard after 3 seconds
      setTimeout(() => {
        window.location.href = "http://localhost:5173/patient";
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h3>✅ Appointment Confirmed!</h3>
        <p>
          {formData.specialty} consultation with {formData.doctor?.name} on{" "}
          {new Date(formData.date).toLocaleDateString()} at {formData.time}.
        </p>
        <p>Redirecting to patient dashboard...</p>
        <button onClick={() => window.location.href = "http://localhost:5173/patient"}>
          Go to Dashboard Now
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3>Confirm Your Appointment</h3>
      
      <div className="confirmation-details">
        <p><b>Specialty:</b> {formData.specialty}</p>
        <p><b>Doctor:</b> {formData.doctor?.name}</p>
        <p><b>Specialization:</b> {formData.doctor?.specialization}</p>
        <p><b>Health Issue:</b> {formData.healthIssue}</p>
        <p><b>Date:</b> {new Date(formData.date).toLocaleDateString()}</p>
        <p><b>Time:</b> {formData.time}</p>
      </div>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div className="confirmation-buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </div>
    </div>
  );
}
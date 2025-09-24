// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import './App.css';

// // Hospital pages
// import HospitalDashboard from './pages/hospital/HospitalDashboard';
// import ManageDoctors from './pages/hospital/ManageDoctors';
// import UpdatePatient from './pages/hospital/UpdatePatient';
// import LandingPage from './pages/LandingPage';


// import PatientDashboard from './pages/Patient/PatientDashboard';
// import BookConsultation from './pages/Patient/BookConsultation';
// import Prescriptions from './pages/Patient/Prescriptions';
// import HealthRecords from './pages/Patient/HealthRecords';
// import SOSPg from './pages/Patient/SOSPg';
// import UploadReports from './pages/Patient/UploadReports';

// import DoctorDashboard from './pages/doctor/Dashboard';
// import QueuePage from './pages/doctor/QueuePage';
// import AppointmentsPage from './pages/doctor/AppointmentsPage';
// import CallPage from './pages/doctor/CallPage';
// import Login from './pages/Login';
// import Signup from './pages/Signup';

// function HospitalManageDoctorsRoute() {
//   const navigate = useNavigate();
//   return <ManageDoctors onBack={() => navigate(-1)} />;
// }

// function HospitalUpdatePatientRoute() {
//   const navigate = useNavigate();
//   return <UpdatePatient onBack={() => navigate(-1)} />;
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
      
//         <Route path="/" element={<LandingPage />} />

       
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

     
//         <Route path="/hospital" element={<HospitalDashboard />} />
//         <Route path="/hospital/manage-doctors" element={<HospitalManageDoctorsRoute />} />
//         <Route path="/hospital/update-patient" element={<HospitalUpdatePatientRoute />} />


//         <Route path="/patient" element={<PatientDashboard />} />
//         <Route path="/patient/book-consultation" element={<BookConsultation />} />
//         <Route path="/patient/prescriptions" element={<Prescriptions />} />
//         <Route path="/patient/health-records" element={<HealthRecords />} />
//         <Route path="/patient/sos" element={<SOSPg />} />
//         <Route path="/patient/upload-reports" element={<UploadReports />} />


//         <Route path="/SOSPg.jsx" element={<SOSPg />} />
//         <Route path="/BookConsultation.jsx" element={<BookConsultation />} />
//         <Route path="/UploadsReports.jsx" element={<UploadReports />} />
//         <Route path="/prescriptions.jsx" element={<Prescriptions />} />
//         <Route path="/health-records" element={<HealthRecords />} />

     
//         <Route path="/doctor" element={<DoctorDashboard />} />
//         <Route path="/doctor/queue" element={<QueuePage />} />
//         <Route path="/doctor/appointments" element={<AppointmentsPage />} />
//         <Route path="/doctor/call" element={<CallPage />} />

    
//         <Route path="/queue" element={<QueuePage />} />
//         <Route path="/appointments" element={<AppointmentsPage />} />

       
//         <Route path="*" element={<Navigate to="/hospital" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// App.jsx (corrected)
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// Hospital pages
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import ManageDoctors from './pages/hospital/ManageDoctors';
import UpdatePatient from './pages/hospital/UpdatePatient';
import LandingPage from './pages/LandingPage';

// Patient pages
import PatientDashboard from './pages/Patient/PatientDashboard';
import BookConsultation from './pages/Patient/BookConsultation';
import Prescriptions from './pages/Patient/Prescriptions';
import HealthRecords from './pages/Patient/HealthRecords';
import SOSPg from './pages/Patient/SOSPg';
import UploadReports from './pages/Patient/UploadReports';

// Doctor pages
import DoctorDashboard from './pages/doctor/Dashboard';
import QueuePage from './pages/doctor/QueuePage';
import AppointmentsPage from './pages/doctor/AppointmentsPage';
import CallPage from './pages/doctor/CallPage';
import DoctorSignup from './pages/DoctorSignup';
import DoctorLogin from './pages/DoctorLogin';

// Auth components
import Login from './pages/Login';
import Signup from './pages/Signup';

function HospitalManageDoctorsRoute() {
  const navigate = useNavigate();
  return <ManageDoctors onBack={() => navigate(-1)} />;
}

function HospitalUpdatePatientRoute() {
  const navigate = useNavigate();
  return <UpdatePatient onBack={() => navigate(-1)} />;
}

// Protected route for doctor
const DoctorProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('doctorToken');
  return token ? children : <Navigate to="/doctor-login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Doctor auth routes */}
        <Route path="/doctor-signup" element={<DoctorSignup />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />

        {/* Hospital routes */}
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/hospital/manage-doctors" element={<HospitalManageDoctorsRoute />} />
        <Route path="/hospital/update-patient" element={<HospitalUpdatePatientRoute />} />

        {/* Patient routes - FIXED: Added all patient routes */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/book-consultation" element={<BookConsultation />} />
        <Route path="/patient/prescriptions" element={<Prescriptions />} />
        <Route path="/patient/health-records" element={<HealthRecords />} />
        <Route path="/patient/sos" element={<SOSPg />} />
        <Route path="/patient/upload-reports" element={<UploadReports />} />

        {/* Legacy patient routes for backward compatibility */}
        <Route path="/BookConsultation.jsx" element={<BookConsultation />} />
        <Route path="/UploadsReports.jsx" element={<UploadReports />} />
        <Route path="/prescriptions.jsx" element={<Prescriptions />} />
        <Route path="/health-records" element={<HealthRecords />} />
        <Route path="/SOSPg.jsx" element={<SOSPg />} />

        {/* Doctor protected routes */}
        <Route 
          path="/doctor-dashboard" 
          element={
            <DoctorProtectedRoute>
              <DoctorDashboard />
            </DoctorProtectedRoute>
          } 
        />
        <Route 
          path="/doctor/queue" 
          element={
            <DoctorProtectedRoute>
              <QueuePage />
            </DoctorProtectedRoute>
          } 
        />
        <Route 
          path="/doctor/appointments" 
          element={
            <DoctorProtectedRoute>
              <AppointmentsPage />
            </DoctorProtectedRoute>
          } 
        />
        <Route 
          path="/doctor/call" 
          element={
            <DoctorProtectedRoute>
              <CallPage />
            </DoctorProtectedRoute>
          } 
        />

        {/* Redirects */}
        <Route path="/doctor" element={<Navigate to="/doctor-dashboard" replace />} />
        <Route path="/queue" element={<Navigate to="/doctor/queue" replace />} />
        <Route path="/appointments" element={<Navigate to="/doctor/appointments" replace />} />

        {/* Direct routes that might be used somewhere in the code */}
        <Route path="/book-consultation" element={<Navigate to="/patient/book-consultation" replace />} />
        <Route path="/UploadsReports.jsx" element={<Navigate to="/patient/upload-reports" replace />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// import React, { useState } from 'react';
// import '../styles/Signup.css';

// const Signup = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errors, setErrors] = useState({});

  

//   const validateForm = () => {
//     const newErrors = {};

//     // Phone number validation (basic format)
//     const phoneRegex = /^[+]?[\d\s\-()]+$/;
//     if (!phoneNumber) {
//       newErrors.phoneNumber = 'Phone number is required';
//     } else if (!phoneRegex.test(phoneNumber) || phoneNumber.length < 10) {
//       newErrors.phoneNumber = 'Please enter a valid phone number';
//     }

//     // Password validation
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!password) {
//       newErrors.password = 'Password is required';
//     } else if (!passwordRegex.test(password)) {
//       newErrors.password = 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
//     }

//     // Confirm password validation
//     if (!confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (password !== confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Signup attempt:', { phoneNumber, password });
//       // Add your registration logic here
//       alert('Account created successfully!');
//     }
//   };

//   const handleInputChange = (setter, field) => (e) => {
//     setter(e.target.value);
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-card">
//         <div className="signup-header">
//           <h1>Create Account</h1>
//           <p>Join Hospital Portal today</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="signup-form">
//           <div className="input-group">
//             <div className={`input-wrapper ${errors.phoneNumber ? 'error' : ''}`}>
//               <span className="input-icon">📱</span>
//               <input
//                 type="tel"
//                 placeholder="Phone Number"
//                 value={phoneNumber}
//                 onChange={handleInputChange(setPhoneNumber, 'phoneNumber')}
//                 className="input-field"
//                 required
//               />
//             </div>
//             {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
//           </div>

//           <div className="input-group">
//             <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
//               <span className="input-icon">🔒</span>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Password"
//                 value={password}
//                 onChange={handleInputChange(setPassword, 'password')}
//                 className="input-field"
//                 required
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? '🙈' : '👁️'}
//               </button>
//             </div>
//             {errors.password && <span className="error-message">{errors.password}</span>}
//           </div>

//           <div className="input-group">
//             <div className={`input-wrapper ${errors.confirmPassword ? 'error' : ''}`}>
//               <span className="input-icon">🔐</span>
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={handleInputChange(setConfirmPassword, 'confirmPassword')}
//                 className="input-field"
//                 required
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? '🙈' : '👁️'}
//               </button>
//             </div>
//             {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
//           </div>

//           <button type="submit" className="signup-button">
//             Create Account
//           </button>
//         </form>

//         <div className="login-link">
//           Already have an account? <a href="/login">Sign In</a>
//         </div>

//         <div className="demo-text">
//           Demo signup — create your account now
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;



// import React, { useState } from 'react';
// import '../styles/Signup.css';
// import { Link } from 'react-router-dom';

// const Signup = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       setIsLoading(true);
//       setErrors({}); // Clear any previous errors
      
//       try {
//         const response = await fetch('http://localhost:5000/signup', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             phoneNumber: phoneNumber,
//             password: password,
//           }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           alert('Account created successfully!');
//           // Clear form after successful signup
//           setPhoneNumber('');
//           setPassword('');
//           setConfirmPassword('');
//           // Optionally redirect to login page
//           // navigate('/login');
//         } else {
//           // Handle validation errors from backend
//           if (data.errors) {
//             setErrors(data.errors);
//           } else {
//             setErrors({ general: data.message || 'Signup failed. Please try again.' });
//           }
//         }
//       } catch (error) {
//         console.error('Network error:', error);
//         setErrors({ general: 'Network error. Please check your connection and try again.' });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleInputChange = (setter, field) => (e) => {
//     setter(e.target.value);
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//     // Clear general error when user makes changes
//     if (errors.general) {
//       setErrors(prev => ({ ...prev, general: '' }));
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-card">
//         <div className="signup-header">
//           <h1>Join Hospital Portal today</h1>
//           <p>Create your account to get started</p>
//         </div>

//         {/* General error display */}
//         {errors.general && (
//           <div className="error-message general-error">
//             {errors.general}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="signup-form">
//           <div className="form-group">
//             <label htmlFor="phoneNumber">Phone Number</label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               value={phoneNumber}
//               onChange={handleInputChange(setPhoneNumber, 'phoneNumber')}
//               placeholder="Enter your phone number"
//               className={errors.phoneNumber ? 'error' : ''}
//               disabled={isLoading}
//             />
//             {errors.phoneNumber && (
//               <span className="error-message">{errors.phoneNumber}</span>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <div className="password-input-container">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={handleInputChange(setPassword, 'password')}
//                 placeholder="Enter your password"
//                 className={errors.password ? 'error' : ''}
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//                 disabled={isLoading}
//               >
//                 {showPassword ? '👁️' : '🙈'}
//               </button>
//             </div>
//             {errors.password && (
//               <span className="error-message">{errors.password}</span>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <div className="password-input-container">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 value={confirmPassword}
//                 onChange={handleInputChange(setConfirmPassword, 'confirmPassword')}
//                 placeholder="Confirm your password"
//                 className={errors.confirmPassword ? 'error' : ''}
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 disabled={isLoading}
//               >
//                 {showConfirmPassword ? '👁️' : '🙈'}
//               </button>
//             </div>
//             {errors.confirmPassword && (
//               <span className="error-message">{errors.confirmPassword}</span>
//             )}
//           </div>

//           <button 
//             type="submit" 
//             className="signup-btn"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Creating Account...' : 'Sign Up'}
//           </button>
//         </form>

//         <div className="signup-footer">
//           <Link to="/signup" className="login-link">Sign up</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import '../styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 150) {
      newErrors.age = 'Please enter a valid age (1-150)';
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setErrors({}); // Clear any previous errors
      
      try {
        const response = await fetch('http://localhost:5000/api/patients/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            age: parseInt(formData.age),
            phoneNumber: formData.phoneNumber,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Account created successfully!');
          // Clear form after successful signup
          setFormData({
            name: '',
            age: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
          });
          // Redirect to login page
          navigate('/login');
        } else {
          // Handle validation errors from backend
          if (data.errors && Array.isArray(data.errors)) {
            const backendErrors = {};
            data.errors.forEach(error => {
              backendErrors[error.field] = error.message;
            });
            setErrors(backendErrors);
          } else {
            setErrors({ general: data.message || 'Signup failed. Please try again.' });
          }
        }
      } catch (error) {
        console.error('Network error:', error);
        setErrors({ general: 'Network error. Please check your connection and try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    // Clear general error when user makes changes
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Join Hospital Portal today</h1>
          <p>Create your account to get started</p>
        </div>

        {/* General error display */}
        {errors.general && (
          <div className="error-message general-error">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange('name')}
              placeholder="Enter your full name"
              className={errors.name ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={handleInputChange('age')}
              placeholder="Enter your age"
              className={errors.age ? 'error' : ''}
              disabled={isLoading}
              min="1"
              max="150"
            />
            {errors.age && (
              <span className="error-message">{errors.age}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange('phoneNumber')}
              placeholder="Enter your 10-digit phone number"
              className={errors.phoneNumber ? 'error' : ''}
              disabled={isLoading}
              maxLength="10"
            />
            {errors.phoneNumber && (
              <span className="error-message">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                placeholder="Enter your password"
                className={errors.password ? 'error' : ''}
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'error' : ''}
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? '👁️' : '🙈'}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="signup-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <Link to="/login" className="login-link">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setErrors({}); // Clear any previous errors
      
      try {
        const response = await fetch('http://localhost:5000/api/patients/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: formData.phoneNumber,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store token and user data in localStorage
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.patient));
          
          // Clear form
          setFormData({
            phoneNumber: '',
            password: ''
          });
          
          // Show success message
          alert('Login successful!');
          
          // Redirect to patient dashboard
          navigate('/patient');
        } else {
          // Handle validation errors from backend
          if (data.errors && Array.isArray(data.errors)) {
            const backendErrors = {};
            data.errors.forEach(error => {
              backendErrors[error.field] = error.message;
            });
            setErrors(backendErrors);
          } else {
            setErrors({ general: data.message || 'Login failed. Please try again.' });
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
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Hospital Portal</h1>
          <p>Welcome back! Please sign in to continue</p>
        </div>

        {/* General error display */}
        {errors.general && (
          <div className="error-message general-error">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange('phoneNumber')}
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
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
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

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
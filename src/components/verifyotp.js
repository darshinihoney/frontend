import React, { useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

import "./verifyOtp.css";

function VerifyOtp({ email }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  // const [email, setEmail] = useState('');
  // const [userEnteredOtp, setUserEnteredOtp] = useState('');
  const [loading, setLoading] = useState(false); 
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };


  const verifyOtp = async () => {
    try {
      setLoading(true);
      const userEnteredOtp = verificationCode.join('');
      console.log('Email:', email);
      console.log('User Entered OTP:', userEnteredOtp);
      // Enhanced error handling with specific message
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + 'verify-otp', { email, userEnteredOtp });
      console.log('Response:', response);
      if (response.status === 200 && response.data.success) {
        setMessage(response.data.message || 'OTP verification successful!');
        setTimeout(() => {
          navigate('/'); // Navigate after 2 seconds
        }, 2000);
      } else {
        const errorMessage = response.data.error || 'Invalid OTP'; // Use specific error from backend if available
        setMessage(errorMessage);
        console.log('errorMessage:', errorMessage);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setMessage('An error occurred during OTP verification. Please try again.');
    }finally {
      setLoading(false);}
  };

  return (
    <div className="verify-otp-container">
      <h1 className="verify-otp-heading">Verification Code</h1>
      <p>We have sent the verification code to your email address..! </p>
      <div className="verification-boxes">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={verificationCode[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <button onClick={verifyOtp} className="confirm-button">
        Confirm
      </button>
      {loading && <div className="loading-indicator">Loading...</div>} {/* Display loading indicator */}
      <p>{message}</p>
    </div>
  );
}

export default VerifyOtp;

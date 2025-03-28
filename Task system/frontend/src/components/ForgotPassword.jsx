import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Getopt,setGetotp]=useState('');  
  const navigate = useNavigate(); // Initialize navigate


  const getOtp=async()=>{
    try{
      const res = await axios.post('http://localhost:5000/task/getOtp',{email})
      console.log('Response:',res)
      alert('otp sent to your email')
    }catch(err){
      console.error('Error:',err)
      alert('Failed to send otp')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('New Password, Confirm Password, Getotp:',
      newPassword, confirmPassword,Getopt);

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/task/forgotPassword', { email, newPassword,otp:Getopt });
      console.log('Response:', res);
      alert('Password reset successful. Redirecting to login...');

      // Navigate to the login page after successful reset
      navigate('/login');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to reset password. Please check your email and try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>


        <div className="form-group">
          <label>otp</label>
          <input
            type="text"
            value={Getopt}
            onChange={(e) => setGetotp(e.target.value)} 
            required
          />
          
          <button type="button" onClick={getOtp}>get opt </button>
        </div>


        <button type="submit" className="reset-button">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;

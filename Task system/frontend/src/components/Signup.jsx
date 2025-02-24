// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';



// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     role: 'user',
//     address: '',
//     color: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('	http://localhost:5000/task/register', { ...formData })
//       .then((res) => {
//         console.log('Data saved', res);
//         navigate('/login');
//       })
//       .catch((err) => {
//         console.log('Error saving data', err);
//       });
//       alert('Data saved');
//     console.log('Form Data Submitted: ', formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Phone:</label>
//         <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Role:</label>
//         <select name="role" value={formData.role} onChange={handleChange} required>
//           <option value="admin">admin</option>
         
//           <option value="team_lead">team_lead</option>
//           <option value="developer">developer</option>
//         </select>
//       </div>
//       <div>
//         <label>Address:</label>
//         <input type="text" name="address" value={formData.address} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Favorite Color:</label>
//         <input type="color" name="color" value={formData.color} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//       </div>
//       <button type="submit">Sign Up</button>
//       <div>
//         <button type="button" onClick={() => navigate('/login')}>Already have an account?</button>
//       </div>
//     </form>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'admin',
    address: '',
    color: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/task/register', formData);
      console.log('Data saved', res);
      alert('Registration Successful!');
      navigate('/login');
    } catch (err) {
      console.log('Error saving data', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="admin">Admin</option>
            <option value="team_lead">Team Lead</option>
            <option value="developer">Developer</option>
          </select>
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Favorite Color:</label>
          <input type="color" name="color" value={formData.color} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
        <button type="button" className="login-button" onClick={() => navigate('/login')}>
          Already have an account?
        </button>
      </form>
    </div>
  );
};

export default Signup;

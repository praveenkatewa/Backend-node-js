

// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Signup.css'; // Import the CSS file

// const Signup = () => {
//   const navigate = useNavigate();
//   const [file,setFile]=useState(null)
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     role: 'admin',
//     address: '',
//     color: '',
//     password: ''
//   });


//   const handleChange = (e) => {

//     const { name, value,files} = e.target;

//     if (files) {
//       setFile(files[0]);  
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();


//     const data = new FormData();

    
//     Object.keys(formData).forEach(key => {
//       data.append(key, formData[key]);
//     });

   
//     if (file) {
//       data.append('file', file);
//     }
//     try {
//       const res = await axios.post('http://localhost:5000/task/register', data,);
//       console.log('Data saved', res);
//       alert('Registration Successful!');
//       navigate('/login');
//     } catch (err) {
//       console.log('Error saving data', err);
//       alert('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit} className="signup-form">
//         <div className="form-group">
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Phone:</label>
//           <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Role:</label>
//           <select name="role" value={formData.role} onChange={handleChange} required>
//             <option value="admin">Admin</option>
//             <option value="team_lead">Team Lead</option>
//             <option value="developer">Developer</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Address:</label>
//           <input type="text" name="address" value={formData.address} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Favorite Color:</label>
//           <input type="color" name="color" value={formData.color} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </div>



//         <div className="form-group">
//           <label>Upload Profile Picture:</label>
//           <input type="file" name="file"  accept="image/*" onChange={handleChange} required />
//         </div>
//         <button type="submit" className="submit-button">Sign Up</button>
//         <button type="button" className="login-button" onClick={() => navigate('/login')}>
//           Already have an account?
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;



import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
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
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFile(files[0]);  
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    console.log(formData)
    
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    if (file) {
      data.append('file', file);
    }

    try {
      const res = await axios.post('http://localhost:5000/task/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' } // ✅ Fix missing headers
      });

      console.log('Data saved', res);
      alert('Registration Successful!');
      navigate('/login');
    } catch (err) {
      console.error('Error saving data', err.response ? err.response.data : err);
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
        <div className="form-group">
          <label>Upload Profile Picture:</label>
          <input type="file" name="file" accept="image/*" onChange={handleChange} required />
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

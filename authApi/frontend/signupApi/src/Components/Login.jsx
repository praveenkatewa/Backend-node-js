import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const [dark,setDark]=useState(false)




  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
    try {
       const result=await axios.post('http://localhost:3000/std/login', { email, password })

     

       console.log('>>>>>result login>>>',result.data.token)

       localStorage.setItem('token', result.data.token) 

    
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      alert('login sussesful')
      navigate('/createStudent')

    } catch (error) {
      alert('get error')
    }
  };

  const darkmode=()=>{
    setDark(!dark)
    if(dark){
       document.querySelector('body').style.backgroundColor='black'


    }else{
      document.querySelector('body').style.backgroundColor='white'
    }

   
  }

  return (
    <div>
    <button onClick={darkmode}>dark</button>
      <h2>Login</h2>
      <form  style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', margin: '0 auto' }}
       onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';

// function Login() {

//     const [loginInfo, setLoginInfo] = useState({
//         name:'',
//         email: '',
//         password: ''
//     })

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name, value);
//         const copyLoginInfo = { ...loginInfo };
//         copyLoginInfo[name] = value;
//         setLoginInfo(copyLoginInfo);
//     }

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         const { name,email, password } = loginInfo;
//         if (!name|| !email || !password) {
//             return handleError('email and password are required')
//         }
//         try {
//             const url = `http://localhost:8090/auth/login`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(loginInfo)
//             });
//             const result = await response.json();
//             const { success, message, jwtToken, name, error } = result;
//             if (success) {
//                 handleSuccess(message);
//                 localStorage.setItem('token', jwtToken);
//                 localStorage.setItem('loggedInUser', name);
//                 setTimeout(() => {
//                     navigate('/home')
//                 }, 1000)
//             } else if (error) {
//                 const details = error?.details[0].message;
//                 handleError(details);
//             } else if (!success) {
//                 handleError(message);
//             }
//             console.log(result);
//         } catch (err) {
//             handleError(err);
//         }
//     }

//     return (
//         <div className='container'>
//             <h1>Login</h1>
//             <form onSubmit={handleLogin}>
//             <div>
//                     <label htmlFor='name'>Name</label>
//                     <input
//                         onChange={handleChange}
//                         type='name'
//                         name='name'
//                         placeholder='Enter your name...'
//                         value={loginInfo.name}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='email'>Email</label>
//                     <input
//                         onChange={handleChange}
//                         type='email'
//                         name='email'
//                         placeholder='Enter your email...'
//                         value={loginInfo.email}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='password'>Password</label>
//                     <input
//                         onChange={handleChange}
//                         type='password'
//                         name='password'
//                         placeholder='Enter your password...'
//                         value={loginInfo.password}
//                     />
//                 </div>
//                 <button type='submit'>Login</button>
//                 <span>Does't have an account ?
//                     <Link to="/signup">Signup</Link>
//                 </span>
//             </form>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Login




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        
        // Check if email and password are provided
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const url = `http://localhost:8090/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                const errorMessage = error?.details[0]?.message || message;
                handleError(errorMessage);
            }
        } catch (err) {
            handleError('Something went wrong. Please try again.');
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        placeholder='Enter your name...'
                        value={loginInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Doesn't have an account?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;

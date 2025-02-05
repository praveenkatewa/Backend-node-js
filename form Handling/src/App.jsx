import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {

  const [getdata,setGetData]=useState([])
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    age: ''
  });

  const dataform=async()=>{
    const result= await axios.get('http://localhost:6080/data')
    console.log('>>>>>>>>>data form>>',result.data)
    setGetData(result.data)
  }
     
  const  [Fetch,setFetch]=useState(false)
  
  useEffect(() => {
    dataform()
  
  }, [Fetch]);





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  


  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData); 

    alert('Form submitted');



    

    await axios.post('http://localhost:6080/form', formData)
    .then((response) => {
      console.log(response.data);
      setFormData({ name: '', email: '', password: '',  city: '', age: '' });
setFetch(p=>!p)
      alert('Form submitted ');
    })
    .catch((error) => {
      console.error(' error!', error);
      alert('Error ');
    });

  };


  
  const Delete=async(id)=>{
    
    await axios.post(`http://localhost:6080/Delete`,{id })
  setFetch(p=>!p)
  }
  
  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>


      <h2>Users List</h2>

     <div>
    {getdata.map((item, index) => (
      <li key={index}>
       Name: {item.name}, Email: {item.email}, City: {item.city}, Age: {item.age}
       <br></br>
       <button onClick={()=>Delete(item._id)} >delete</button>
   
      </li>
    ))}
     </div>

    </div>
  );
}

export default App;











// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [getdata, setGetData] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     city: '',
//     age: ''
//   });

//   const [Fetch, setFetch] = useState(false);
//   const [submitted, setSubmitted] = useState(false); 

//   const dataform = async () => {
//     const result = await axios.get('http://localhost:6080/data');
//     console.log('>>>>>>>>>data form>>', result.data);
//     setGetData(result.data);
//   };

//   useEffect(() => {
//     if (Fetch) {
//       dataform();
//       setSubmitted(true); 
//     }
//   }, [Fetch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);

//     await axios
//       .post('http://localhost:6080/form', formData)
//       .then((response) => {
//         console.log(response.data);
//         setFormData({ name: '', email: '', password: '', city: '', age: '' });
//         setFetch((p) => !p);
//         alert('Form submitted successfully');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         alert('Error occurred during form submission');
//       });
//   };

//   const Delete = async (id) => {
//     await axios.post(`http://localhost:6080/Delete`, { id });
//     setFetch((p) => !p);
//   };

//   return (
//     <div className="container">
//       <h1>Registration Form</h1>
//       <form onSubmit={handleSubmit} className="form">
//         <div className="input-group">
//           <div className="input-item">
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-item">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-item">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-item">
//             <label>City:</label>
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-item">
//             <label>Age:</label>
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>
//         <button type="submit" className="submit-button">Submit</button>
//       </form>

//       {submitted && (
//         <div className="table-container">
//           <h2>Users List</h2>
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>City</th>
//                 <th>Age</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {getdata.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.name}</td>
//                   <td>{item.email}</td>
//                   <td>{item.city}</td>
//                   <td>{item.age}</td>
//                   <td>
//                     <button onClick={() => Delete(item._id)} className="delete-button">
//                       Delete
//                     </button>
//                     <button  className="delete-button">
//                       update
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;








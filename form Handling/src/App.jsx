import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {

  const [getdata,setGetData]=useState([])
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
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
      setFormData({ name: '', email: '', password: '', gender: '', city: '', age: '' });
    setFetch(p=>!p)
      alert('Form submitted ');
    })
    .catch((error) => {
      console.error(' error!', error);
      alert('Error ');
    });
  };


  
  const Delete=async(id)=>{
    
    await axios.post(`http://localhost:6080/Delete`,{
      id
    })
  //  const a= getdata.filter(i=>i._id==id)
  setFetch(p=>!p)


    // setGetData(a)

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
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
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














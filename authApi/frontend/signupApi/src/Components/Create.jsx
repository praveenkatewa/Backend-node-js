
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Create.css';

const Create = () => {
  const [allStudenta, setAllStudenta] = useState([]);
  const [module, setModule] = useState(false);
  const [edituser, setEdituser] = useState(null);

  const getStudents = async () => {
    try {
      const result = await axios.get('http://localhost:3000/std/findAll');
      setAllStudenta(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents(); 
  }, []);

  const deleteStudent = async (id) => {
    try {
      await axios.delete('http://localhost:3000/std/delete/' + id);
      alert('Deleted successfully');
      getStudents(); // Refresh the data after deletion
    } catch (error) {
      console.log('Error', error);
    }
  };

  const updateStudent = async (id) => {
    try {
      const result = await axios.patch('http://localhost:3000/std/update', {
        id,
        ...edituser,
      });
      console.log(result);
      alert('Updated successfully');
      getStudents(); // Fetch updated data after update
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px',
        gap: '20px',
      }}
    >
      <div style={{ marginTop: '20px' }} id="table">
        <h1>All Students</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'lightgray' }}>
              <th scope="col" className="thcss">
                S.N.
              </th>
              <th scope="col" className="thcss">
                Name
              </th>
              <th scope="col" className="thcss">
                Email
              </th>
              <th scope="col" className="thcss">
                Update
              </th>
              <th scope="col" className="thcss">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {allStudenta.map((item, index) => (
              <tr key={item._id}>
                <th scope="row" className="thcss">
                  {index + 1}
                </th>
                <td className="thcss">{item.name}</td>
                <td className="thcss">{item.email}</td>
                <td className="thcss">
                  <button
                    className="updateButton"
                    onClick={() => {
                      setModule(true);
                      setEdituser(item);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td className="thcss">
                  <button
                    style={{
                      padding: '5px 10px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={() => deleteStudent(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {module && (
        <div style={{ width: '300px', color: 'white' }}>
          <form onSubmit={updateStudent}>
            <div className="popup-inner">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={edituser.name}
                onChange={(e) => setEdituser({ ...edituser, name: e.target.value })}
              />
            </div>
            <div className="popup-inner">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={edituser.email}
                onChange={(e) => setEdituser({ ...edituser, email: e.target.value })}
              />
            </div>
            <button onClick={() => setModule(false)}>Cancel</button>
            <button type="submit" onClick={() => updateStudent(edituser._id)}>
              Save Changes
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={getStudents}
          style={{
            padding: '10px 15px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#28a745',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default Create;



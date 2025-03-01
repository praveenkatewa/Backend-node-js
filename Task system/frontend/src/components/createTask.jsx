

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  select: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  secondaryButton: {
    marginTop: '10px',
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

const CreateTask = () => {
  const [task, setTask] = useState({
    title: '',
    dueDate: '',
    status: '',
    assignedTo: '',
    remark: '',
  });

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please log in first.');
          navigate('/login');
          return;
        }

        const { data } = await axios.get('http://localhost:5000/task/getuser', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in first.');
        navigate('/login');
        return;
      }

      if (!task.assignedTo) {
        alert('Please select a user to assign the task.');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/task/createTask',
        task,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // alert(response.data.msg || 'Task created successfully');
      alert('task created successfully')
      navigate('/Taskmanager');
    } catch (error) {
      console.error('Error creating task:', error);
      alert(error.response?.data?.msg || 'Failed to create task.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input type="text" name="title" value={task.title} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Due Date:</label>
          <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Status:</label>
          <select name="status" value={task.status} onChange={handleChange} style={styles.select} required>
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Assign To:</label>
          <select name="assignedTo" value={task.assignedTo} onChange={handleChange} style={styles.select} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Remark:</label>
          <textarea name="remark" value={task.remark} onChange={handleChange} style={styles.textarea} required></textarea>
        </div>

        <button type="submit" style={styles.button}>Create Task</button>
      </form>

      <button onClick={() => navigate('/taskmanager')} style={styles.secondaryButton}>View Tasks</button>
    </div>
  );
};

export default CreateTask;

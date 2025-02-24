

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [task, setTask] = useState({
    title: '',
    dueDate: '',
    status: '',
    assignedTo: '', // Store user ID
    remark: '',
  });

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users when component mounts
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handle form submission
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
        task, // Send the complete task object
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.msg || 'Task created successfully');
      navigate('/Taskmanager');
    } catch (error) {
      console.error('Error creating task:', error);
      alert(error.response?.data?.msg || 'Failed to create task.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={task.title} onChange={handleChange} required />
        </div>

        <div>
          <label>Due Date:</label>
          <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
        </div>

        <div>
          <label>Status:</label>
          <select name="status" value={task.status} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label>Assign To:</label>
          <select name="assignedTo" value={task.assignedTo} onChange={handleChange} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Remark:</label>
          <textarea name="remark" value={task.remark} onChange={handleChange} required></textarea>
        </div>

        <button type="submit">Create Task</button>
      </form>

      <button onClick={() => navigate('/taskmanager')}>View Tasks</button>
    </div>
  );
};

export default CreateTask;



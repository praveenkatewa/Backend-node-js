import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please log in first.');
          navigate('/login');
          return;
        }

        const [myTasksRes, myAssignedRes] = await Promise.all([
          axios.get('http://localhost:5000/task/myTasks', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/task/myAssignedTasks', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTasks(myTasksRes.data);
        setAssignedTasks(myAssignedRes.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Task Management</h1>

      <div style={styles.buttonContainer}>
        <button style={styles.createButton} onClick={() => navigate('/createtask')}>
          Create New Task
        </button>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2>My Tasks</h2>
      <TaskTable tasks={tasks} />

      <h2>My Assigned Tasks</h2>
      <TaskTable tasks={assignedTasks} />
    </div>
  );
};

const TaskTable = ({ tasks }) => (
  <table style={styles.table}>
    <thead>
      <tr>
        <th style={styles.th}>Title</th>
        <th style={styles.th}>Due Date</th>
        <th style={styles.th}>Status</th>
        <th style={styles.th}>Remark</th>
        <th style={styles.th}>Assigned By</th>
        <th style={styles.th}>Assigned To</th>
      </tr>
    </thead>
    <tbody>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <tr key={index}>
            <td style={styles.td}>{task.title}</td>
            <td style={styles.td}>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td style={{ ...styles.td, color: getStatusColor(task.status) }}>{task.status}</td>
            <td style={styles.td}>{task.remark}</td>
            <td style={styles.td}>{task.assignedBy?.name || 'N/A'}</td>
            <td style={styles.td}>{task.assignedTo?.name || 'N/A'}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" style={styles.td}>No tasks available</td>
        </tr>
      )}
    </tbody>
  </table>
);

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'orange';
    case 'In Progress': return 'blue';
    case 'Completed': return 'green';
    default: return 'black';
  }
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' },
  title: { textAlign: 'center', marginBottom: '20px' },
  buttonContainer: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
  createButton: { padding: '10px 15px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none' },
  logoutButton: { padding: '10px 15px', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none' },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: '20px' },
  th: { border: '1px solid #ddd', padding: '10px', background: '#f4f4f4' },
  td: { border: '1px solid #ddd', padding: '10px' },
};

export default TaskManager;

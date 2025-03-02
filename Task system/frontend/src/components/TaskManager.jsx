
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  // const [trashTasks, setTrashTasks] = useState([]);
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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignedTasks(assignedTasks.filter(task => task._id !== id));
      alert('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const handleUpdate = (task) => {
    setEditTask(task);
  };

  const handleSaveUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/task/${editTask._id}`, editTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAssignedTasks(assignedTasks.map(task => 
        task._id === editTask._id ? editTask : task
      ));

      setEditTask(null);
      alert('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const completedTask = async (task) => {
    console.log("Completing task:", task);

    if (!task._id) {
        alert("Invalid task ID");
        return;
    }

    try {
        const response = await axios.delete(
            `http://localhost:5000/task/completetask/${task._id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        if (response.status === 200) {
            // Remove task from UI
            setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
            alert("Task marked as completed and moved to trash");
        } else {
            alert("Failed to complete task");
        }
    } catch (error) {
        console.error("Error completing task:", error.response?.data || error);
        alert(error.response?.data?.msg || "Failed to complete task");
    }
};

  
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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

      <div style={styles.taskSection}>
        <h2>My Tasks</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Due Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Remark</th>
              <th style={styles.th}>Assigned By</th>
              <th style={styles.th}>Assigned To</th>
              <th style={styles.th}>Complete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td style={styles.td}>{task.title}</td>
                  <td style={styles.td}>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td style={{ ...styles.td, color: getStatusColor(task.status) }}>{task.status}</td>
                  <td style={styles.td}>{task.remark}</td>
                  <td style={styles.td}>{task.assignedBy?.name || 'N/A'}</td>
                  <td style={styles.td}>{task.assignedTo?.name || 'N/A'}</td>
                  <td>
                    <button style={styles.completeButton} onClick={() => completedTask(task)}>Complete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.td}>No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={styles.taskSection}>
        <h2>My Assigned Tasks</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Due Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Remark</th>
              <th style={styles.th}>Assigned By</th>
              <th style={styles.th}>Assigned To</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedTasks.length > 0 ? (
              assignedTasks.map((task) => (
                <tr key={task._id}>
                  <td style={styles.td}>{task.title}</td>
                  <td style={styles.td}>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td style={{ ...styles.td, color: getStatusColor(task.status) }}>{task.status}</td>
                  <td style={styles.td}>{task.remark}</td>
                  <td style={styles.td}>{task.assignedBy?.name || 'N/A'}</td>
                  <td style={styles.td}>{task.assignedTo?.name || 'N/A'}</td>
                  <td style={{ ...styles.td, display: 'flex', gap: '5px' }}>
                    <button style={styles.editButton} onClick={() => handleUpdate(task)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => handleDelete(task._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.td}>No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editTask && (
        <div style={styles.modal}>
          <h3>Edit Task</h3>
          <input
            type="text"
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
          />
          <input
            type="date"
            value={new Date(editTask.dueDate).toISOString().split('T')[0]}
            onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
          />
          <select
            value={editTask.status}
            onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleSaveUpdate}>Save</button>
          <button onClick={() => setEditTask(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

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
  td: { border: '1px solid #ddd', padding: '10px', textAlign: 'center' },
  editButton: { padding: '5px 10px', cursor: 'pointer', background: '#ffc107', border: 'none' },
  deleteButton: { padding: '5px 10px', cursor: 'pointer', background: '#dc3545', border: 'none', color: 'white' },
  completeButton: { padding: '5px 10px', cursor: 'pointer', background: '#28a745', color: 'white', border: 'none' },
  taskSection: { marginBottom: '30px' },
  modal: { 
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }
};

export default TaskManager;
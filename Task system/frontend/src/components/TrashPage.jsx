import React, { useEffect, useState } from "react";
import axios from "axios";

const TrashPage = () => {
    const [trashTasks, setTrashTasks] = useState([]);

    // Fetch trashed tasks
    const getTrashTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/task/trash", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setTrashTasks(response.data);
        } catch (error) {
            console.error("Error fetching trash tasks:", error);
            alert("Failed to load trash tasks.");
        }
    };

    // Restore a task
    const restoreTask = async (taskId) => {
        try {
            await axios.put(`http://localhost:5000/task/restore/${taskId}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            alert("Task restored successfully!");
            setTrashTasks(trashTasks.filter(task => task._id !== taskId)); // Remove from UI
        } catch (error) {
            console.error("Error restoring task:", error);
            alert("Failed to restore task.");
        }
    };

    useEffect(() => {
        getTrashTasks();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Trashed Tasks</h2>
            {trashTasks.length === 0 ? (
                <p style={styles.noTasks}>No tasks in trash</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Title</th>
                            <th style={styles.th}>Due Date</th>
                            <th style={styles.th}>Assigned By</th>
                            <th style={styles.th}>Assigned To</th>
                            <th style={styles.th}>Remark</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trashTasks.map((task) => (
                            <tr key={task._id}>
                                <td style={styles.td}>{task.title}</td>
                                <td style={styles.td}>{task.dueDate}</td>
                                <td style={styles.td}>{task.assignedBy}</td>
                                <td style={styles.td}>{task.assignedTo}</td>
                                <td style={styles.td}>{task.remark}</td>
                                <td style={styles.td}>{task.status}</td>
                                <td style={styles.td}>
                                    <button style={styles.button} onClick={() => restoreTask(task._id)}>
                                        Restore
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// ✅ Styles object for consistent styling
const styles = {
    container: {
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "15px",
    },
    noTasks: {
        fontSize: "18px",
        color: "#888",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#fff",
    },
    th: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px",
        border: "1px solid #ddd",
    },
    td: {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center",
    },
    button: {
        padding: "8px 12px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    }
};

export default TrashPage;

import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios to make HTTP requests
import "./styles.css";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editText, setEditText] = useState("");
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("https://authentication-appdev.onrender.com/api/tasks/");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleAddTask = async () => {
        if (newTask.trim() === "") return;
    
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");
    
        try {
            // Send the request with the Authorization header
            const response = await axios.post(
                "https://authentication-appdev.onrender.com/api/tasks/",
                { title: newTask, completed: false },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Attach the token in the request header
                    },
                }
            );
            console.log("Task added successfully:", response.data);
            setNewTask(""); // Clear the input field
            fetchTasks(); // Reload tasks to display the new one
        } catch (error) {
            console.error("There was an error adding the task!", error);
            console.error("Error details:", error.response || error.message);
        }
    };
    

    const handleToggleComplete = async (id, completed, title) => {
        try {
            await axios.put(`https://authentication-appdev.onrender.com/api/tasks/${id}/`, {
                title,
                completed: !completed,
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`https://authentication-appdev.onrender.com/api/tasks/${id}/`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setEditText(task.title);
    };

    const handleSaveEdit = async (id) => {
        if (editText.trim() === "") return;
        try {
            await axios.put(`https://authentication-appdev.onrender.com/api/tasks/${id}/`, {
                title: editText,
                completed: tasks.find(task => task.id === id).completed,
            });
            setEditingTaskId(null);
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className={`todo-container ${darkMode ? "dark-mode" : "light-mode"}`}>   
            <h1>TASK LIST</h1>
            <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀️" : "🌙"}
            </button>

            <input
                type="text"
                className="task-input"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
            />
            <button className="add-task" onClick={handleAddTask}>+</button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={task.completed ? "completed" : ""}>
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button className="save-task" onClick={() => handleSaveEdit(task.id)}>Save</button>
                                <button className="cancel-edit" onClick={() => setEditingTaskId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span>{task.title}</span>
                                <button className="complete-task" onClick={() => handleToggleComplete(task.id, task.completed, task.title)}>
                                    {task.completed ? "Undo" : "Complete"}
                                </button>
                                <button className="edit-task" onClick={() => handleEditClick(task)}>Edit</button>
                                <button className="delete-task" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;

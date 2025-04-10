import axios from 'axios';

const API_URL = 'https://mypit3.onrender.com/api/tasks/';  // ✅ This is required

// Optional: quick test to fetch tasks on import
axios.get(API_URL)
  .then(res => console.log("Fetched tasks:", res.data))
  .catch(err => console.error("Error fetching tasks:", err));

// API functions
export const getTasks = () => axios.get(API_URL);
export const addTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, task) => axios.put(`${API_URL}${id}/`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}${id}/`);

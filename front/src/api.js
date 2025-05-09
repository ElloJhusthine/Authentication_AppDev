import axios from 'axios';

const API_URL = "https://https://authentication-appdev.onrender.com/api/tasks/";

export const getTasks = () => axios.get(API_URL);
export const addTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, task) => axios.put(`${API_URL}${id}/`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}${id}/`);
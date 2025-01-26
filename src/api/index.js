import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const fetchExpenses = (username) => API.get(`/expenses/${username}`);
export const createExpense = (username, expenseData) => API.post(`/expenses/${username}`, expenseData);
export const updateExpense = (username, id, expenseData) => API.put(`/expenses/${username}`, expenseData);
export const deleteExpense = (username, id) => API.delete(`/expenses/${username}/${id}`);


import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});


export const register = (username, password) => {
  return api.post('/api/register', { username, password });
};

export const login = (username, password) => {
  return api.post('/api/login', { username, password });
};

export const getAllItems = () => {
  return api.get('/api/items');
};

export const getItem = (id) => {
  return api.get(`/api/items/${id}`);
};

export const getUserItems = (userId) => {
  return api.get(`/api/items/user/${userId}`);
};

export const createItem = (itemData) => {
  return api.post('/api/items', itemData);
};

export const updateItem = (id, itemData) => {
  return api.put(`/api/items/${id}`, itemData);
};

export const deleteItem = (id) => {
  return api.delete(`/api/items/${id}`);
};

export default api;

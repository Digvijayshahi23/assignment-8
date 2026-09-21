import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export const getTodos = async (search = '') => {
  const response = await axios.get(`${API_URL}?search=${search}`);
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await axios.post(API_URL, todoData);
  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await axios.put(`${API_URL}/${id}`, todoData);
  return response.data;
};

export const updateTodoStatus = async (id, status) => {
  const response = await axios.patch(`${API_URL}/${id}/status`, { status });
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

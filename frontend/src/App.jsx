import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodoStatus, deleteTodo } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Search } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [search]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getTodos(search);
      setTodos(res.data);
    } catch (err) {
      setError('Failed to fetch tasks. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const res = await createTodo(todoData);
      setTodos([res.data, ...todos]);
    } catch (err) {
      setError(err.response?.data?.error?.[0] || 'Failed to add task.');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      const res = await updateTodoStatus(id, newStatus);
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      setError('Failed to update task status.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>To-Do List App</h1>
        <p>Stay organized, stay productive.</p>
      </header>

      {error && <div className="error-msg">{error}</div>}

      <TodoForm onAdd={handleAddTodo} />

      <div className="search-container">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search tasks..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <TodoList 
          todos={todos} 
          onToggle={handleToggleStatus} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
}

export default App;

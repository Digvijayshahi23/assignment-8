import React, { useState } from 'react';
import { Plus } from 'lucide-react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          <Plus size={20} />
          Add
        </button>
      </div>
      <input
        type="text"
        className="todo-input"
        placeholder="Add details (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </form>
  );
}

export default TodoForm;

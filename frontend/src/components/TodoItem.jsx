import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

function TodoItem({ todo, onToggle, onDelete }) {
  const isCompleted = todo.status === 'completed';

  return (
    <div className={`todo-item ${isCompleted ? 'completed' : ''}`}>
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        {todo.description && (
          <span className="todo-desc">{todo.description}</span>
        )}
      </div>
      <div className="todo-actions">
        <button 
          className={`btn-icon ${isCompleted ? 'complete' : ''}`}
          onClick={() => onToggle(todo._id, todo.status)}
          title={isCompleted ? "Mark pending" : "Mark complete"}
        >
          {isCompleted ? <CheckCircle size={22} /> : <Circle size={22} />}
        </button>
        <button 
          className="btn-icon delete"
          onClick={() => onDelete(todo._id)}
          title="Delete task"
        >
          <Trash2 size={22} />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;

const todoService = require('../services/todoService');

// @desc    Get all todos (with optional search)
// @route   GET /api/todos
// @access  Public
const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos(req.query);
    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, error: 'Please add a title' });
    }

    const todo = await todoService.createTodo({ title, description });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Public
const updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update todo status
// @route   PATCH /api/todos/:id/status
// @access  Public
const updateTodoStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: 'Please provide a status' });
    }

    const todo = await todoService.updateTodoStatus(req.params.id, status);
    
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Public
const deleteTodo = async (req, res) => {
  try {
    const todo = await todoService.deleteTodo(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo
};

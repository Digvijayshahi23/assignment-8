const express = require('express');
const {
  getTodos,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
} = require('../controllers/todoController');

const router = express.Router();

router.route('/')
  .get(getTodos)
  .post(createTodo);

router.route('/:id')
  .put(updateTodo)
  .delete(deleteTodo);

router.route('/:id/status')
  .patch(updateTodoStatus);

module.exports = router;

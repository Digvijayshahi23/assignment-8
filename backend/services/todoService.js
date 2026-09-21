const Todo = require('../models/Todo');

class TodoService {
  async getAllTodos(query = {}) {
    const searchFilter = query.search
      ? {
          $or: [
            { title: { $regex: query.search, $options: 'i' } },
            { description: { $regex: query.search, $options: 'i' } },
          ],
        }
      : {};
    return await Todo.find(searchFilter).sort({ createdAt: -1 });
  }

  async getTodoById(id) {
    return await Todo.findById(id);
  }

  async createTodo(todoData) {
    return await Todo.create(todoData);
  }

  async updateTodo(id, todoData) {
    return await Todo.findByIdAndUpdate(id, todoData, {
      new: true,
      runValidators: true,
    });
  }

  async updateTodoStatus(id, status) {
    return await Todo.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async deleteTodo(id) {
    return await Todo.findByIdAndDelete(id);
  }
}

module.exports = new TodoService();

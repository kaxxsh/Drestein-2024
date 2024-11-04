// src/App.js
import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/todoService';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const todosList = await getTodos();
    setTodos(todosList);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      await createTodo({ title: newTodo, completed: false });
      setNewTodo('');
      fetchTodos();
    }
  };

  const handleUpdateTodo = async (id) => {
    if (editText.trim()) {
      await updateTodo(id, { title: editText, completed: false });
      setEditTodoId(null);
      setEditText('');
      fetchTodos();
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const toggleEdit = (todo) => {
    setEditTodoId(todo._id);
    setEditText(todo.title);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-blue-600">Todo App</h1>
        
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li key={todo._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              {editTodoId === todo._id ? (
                <div className="flex w-full">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <button
                    onClick={() => handleUpdateTodo(todo._id)}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-r-lg hover:bg-green-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditTodoId(null)}
                    className="ml-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-800">{todo.title}</span>
                  <div className="flex">
                    <button
                      onClick={() => toggleEdit(todo)}
                      className="px-3 py-1 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

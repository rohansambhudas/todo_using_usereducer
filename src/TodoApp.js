import React, { useReducer, useState } from 'react';

// Reducer function to manage state updates
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim() !== '') {
      dispatch({ type: 'ADD_TODO', payload: text });
      setText('');
    }
  };

  const toggleTodo = id => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = id => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

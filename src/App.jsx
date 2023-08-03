import React from "react";
import { useState } from "react";
import "./styles.css";

const App = () => {
  const [newItem, setNewItem] = useState("");

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
  };
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("");
  };

  const handleEnter = (e) => {
    return [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ];
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  const editTodo = (id) => {
    const editedTitle = prompt("Edit your Task :");
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: editedTitle,
          };
        }
        return todo;
      });
    });
  };

  const deleteAll = () => {
    return setTodos([]);
  };

  const toggleTodo = (id, completed) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed,
            title: <s>{todo.title}</s>,
          };
        }
        return todo;
      });
    });
  };

  return (
    <>
      <h1 className="logo">TaskConquer</h1>
      <div className="form-container">
        <form className="add-item-form" onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="item">Add a Task !</label>
            <input
              value={newItem}
              onChange={handleInputChange}
              type="text"
              id="item"
              placeholder="E.g : ' Pay bill by Saturday till 5pm'"
            />
          </div>
          <button className="btn" key={handleEnter}>
            Add
          </button>
        </form>
        <h1 className="header">Your Todo List</h1>
        <ul className="list">
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                  />
                  {todo.title}
                  <button
                    className="btn btn-edit"
                    onClick={() => editTodo(todo.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger "
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </label>
              </li>
            );
          })}
        </ul>

        {todos.length === 0 ? (
          "No Todos!"
        ) : (
          <button className="btn btn-danger " onClick={deleteAll}>
            Delete All
          </button>
        )}
      </div>
      <div
        className="app-footer
      "
      >
        <p>"Task Conquer" 🚀 - Your Personal Productivity Powerhouse!</p>
        <p>
          Made with ❤️ by{" "}
          <a href="https://github.com/Oba1d-Khan">Obaid Khan </a>
        </p>
      </div>
    </>
  );
};

export default App;

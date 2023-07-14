import React from "react";
import { useState } from "react";
import "./styles.css";

const App = () => {
  const [newItem, setNewItem] = useState(""); // This State is used to store the input typed in text field.

  const handleInputChange = (e) => {
    setNewItem(e.target.value); // where;  e = event,target = the property(input field) on which the event occured , value = represent the current value of input field
  };
  const [todos, setTodos] = useState([]); // This state is used to store a list of todo items.

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodos((currentTodos) => {
      // When we pass a callback function to the setter function, React automatically passes the current value of the state variable to the callback function as a parameter. This ensures that you are working with the most up-to-date value of the state variable
      return [
        ...currentTodos, //, and later we assign the already stored values of array using spread operator !
        { id: crypto.randomUUID(), title: newItem, completed: false }, // randomUUID() : random universally unique identifier, this function ensure every item has unique id.
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
                {/* It will give unique id to every li element added */}
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
    </>
  );
};

export default App;

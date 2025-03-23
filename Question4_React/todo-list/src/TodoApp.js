import React, { useEffect, useState } from "react";
import { AddTodo, FilterComponent, TodoList } from "./components/index.js";
import { toggleActions } from "./static.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoApp() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [list, setList] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("list")) || [];
    setList(storedTasks);
  }, []);

  const addTask = () => {
    if (task.trim()) {
      const updatedList = [
        ...list,
        { id: list.length, text: task, completed: false },
      ];
      setList(updatedList);
      localStorage.setItem("list", JSON.stringify(updatedList));
      setTask("");
    }
  };

  const toggleTask = (id, action = "") => {
    let updatedList = JSON.parse(JSON.stringify(list));
    switch (action) {
      case toggleActions.Delete:
        updatedList = updatedList.filter((el) => el.id !== id);
        break;

      default:
        updatedList = updatedList.map((el) =>
          el.id === id ? { ...el, completed: !el.completed } : el
        );
        break;
    }
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="card shadow p-4 border-0 rounded">
          <h1 className="text-center mb-4 text-primary">To-Do List</h1>
          <div className="input-group mb-3">
            <AddTodo task={task} setTask={setTask} addTask={addTask} />
          </div>
          <FilterComponent filter={filter} setFilter={setFilter} />
          <TodoList list={list} filter={filter} toggleTask={toggleTask} />
        </div>
      </div>
    </div>
  );
}

export default TodoApp;

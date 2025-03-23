import React, { useEffect, useState } from "react";
import { AddTodo, FilterComponent, TodoList } from "./components/index.js";
import { toggleActions } from "./static.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoApp() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   const storedTasks = JSON.parse(localStorage.getItem("list")) || [];
  //   setList(storedTasks);
  // }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = JSON.parse(localStorage.getItem("list"));
      if (storedTasks) {
        setList(storedTasks);
      } else {
        try {
          const response = await fetch("https://dummyjson.com/todos");
          const data = await response.json();
          setList(data.todos);
          localStorage.setItem("list", JSON.stringify(data.todos));
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (task.trim()) {
      const payload = {
        id: list[list.length - 1].id + 1,
        todo: task,
        completed: false,
        userId: Math.floor(Math.random() * 200),
      };
      const updatedList = [ ...list, payload ];
      try {
        await fetch("https://dummyjson.com/todos/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setList(updatedList);
        localStorage.setItem("list", JSON.stringify(updatedList));
        setTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }

    }
  };

  const toggleTask = async (id, action = "") => {
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
    
    try {
      const apiParams = {
        method: action === toggleActions.Delete ? "DELETE" : "PUT",
      }
      if(action !== toggleActions.Delete) {
        apiParams["headers"] = { "Content-Type": "application/json" }
        apiParams["body"] = JSON.stringify({ completed: !updatedList.find((t) => t.id === id).completed })
      }
      await fetch(`https://dummyjson.com/todos/${id}`, apiParams);
      setList(updatedList);
      localStorage.setItem("list", JSON.stringify(updatedList));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
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

import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ list, filter, toggleTask, loading }) {
  return (
    <ul className="list-group">
      {list
        .filter((el) =>
          filter.toLowerCase() === "completed"
            ? el.completed === true
            : filter.toLowerCase() === "pending"
            ? el.completed === false
            : true
        )
        .map((item) => (
          <TodoItem item={item} toggleTask={toggleTask} loading={loading} />
        ))}
    </ul>
  );
}

export default TodoList;

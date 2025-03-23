import React from "react";

function TodoItem({ item, toggleTask }) {
  return (
    <li
      key={item.id}
      className={`list-group-item d-flex justify-content-between align-items-center cursorPointer shadow-sm`}
    >
      <span className={`flex-grow-1 px-2 ${item.completed ? "text-decoration-line-through bg-light" : ""}`} onClick={() => toggleTask(item.id)}>{item.todo}</span>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => toggleTask(item.id, "delete")}
      >
        X
      </button>
    </li>
  );
}

export default TodoItem;

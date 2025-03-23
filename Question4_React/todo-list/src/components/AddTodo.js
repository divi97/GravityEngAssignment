import React from "react";

function AddTodo({ task, setTask, addTask }) {
  return (
    <>
      <input
        type="text"
        className="form-control rounded-start"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        maxLength={100}
      />
      <button
        className="btn btn-primary px-4"
        onClick={addTask}
      >
        Add
      </button>
    </>
  );
}

export default AddTodo;

import React from "react";

function AddTodo({ task, setTask, addTask, loading }) {
  return (
    <>
      <input
        type="text"
        className="form-control rounded-start"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        maxLength={100}
        disabled={loading}
      />
      <button
        className="btn btn-primary px-4"
        onClick={addTask}
        disabled={loading}
      >
        Add
      </button>
    </>
  );
}

export default AddTodo;

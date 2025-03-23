import React from "react";

function FilterComponent({ filter, setFilter }) {
  return (
    <div className="btn-group d-flex mb-3">
      <button
        className={`btn ${
          filter === "all" ? "btn-primary" : "btn-outline-primary"
        } flex-fill`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`btn ${
          filter === "completed" ? "btn-success" : "btn-outline-success"
        } flex-fill`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        className={`btn ${
          filter === "pending" ? "btn-warning" : "btn-outline-warning"
        } flex-fill`}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>
    </div>
  );
}

export default FilterComponent;

"use client";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos, todo, addTodo, deleteTodo, updateTodo, setTodo } = useTodoStore(
    (state) => state
  );

  return (
    <div id="wd-zustand-todo-list">
      <h2>Todo List</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <button
            onClick={() => addTodo(todo)}
            className="btn btn-success me-2"
            id="wd-add-todo-click">
            Add
          </button>
          <button
            onClick={() => updateTodo(todo)}
            className="btn btn-warning me-2"
            id="wd-update-todo-click">
            Update
          </button>
          <input
            className="form-control d-inline-block w-50"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </li>
        {todos.map((t) => (
          <li key={t.id} className="list-group-item d-flex align-items-center">
            <button
              onClick={() => deleteTodo(t.id)}
              className="btn btn-danger me-2"
              id="wd-delete-todo-click">
              Delete
            </button>
            <button
              onClick={() => setTodo(t)}
              className="btn btn-primary me-2"
              id="wd-set-todo-click">
              Edit
            </button>
            {t.title}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
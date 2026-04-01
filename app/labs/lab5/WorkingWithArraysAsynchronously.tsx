"use client";
import React, { useState, useEffect } from "react";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTodos = async () => {
    const t = await client.fetchTodos();
    setTodos(t);
  };

  const removeTodo = async (todo: any) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error deleting todo");
    }
  };

  const createNewTodo = async () => {
    const updatedTodos = await client.createNewTodo();
    setTodos(updatedTodos);
  };

  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({ title: "New Posted Todo", completed: false });
    setTodos([...todos, newTodo]);
  };

  const editTodo = (todo: any) => {
    setTodos(todos.map((t) => t.id === todo.id ? { ...todo, editing: true } : t));
  };

  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => t.id === todo.id ? todo : t));
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error updating todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {errorMessage && (
        <div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}

      <h4 className="d-flex justify-content-between align-items-center">
        Todos
        <span>
          <button id="wd-post-todo" className="btn btn-primary btn-sm me-2" onClick={postNewTodo}>
            + Post
          </button>
          <button id="wd-create-todo" className="btn btn-success btn-sm" onClick={createNewTodo}>
            + Create
          </button>
        </span>
      </h4>

      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex align-items-center">
            <input type="checkbox" className="form-check-input me-2"
              defaultChecked={todo.completed}
              onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })} />
            {!todo.editing ? (
              <span style={{ textDecoration: todo.completed ? "line-through" : "none", flex: 1 }}>
                {todo.title}
              </span>
            ) : (
              <input className="form-control w-50 me-2" defaultValue={todo.title}
                onKeyDown={(e) => { if (e.key === "Enter") updateTodo({ ...todo, editing: false }); }}
                onChange={(e) => updateTodo({ ...todo, title: e.target.value })} />
            )}
            <button className="btn btn-sm btn-outline-primary me-1" onClick={() => editTodo(todo)}>✏️</button>
            <button id="wd-delete-todo" className="btn btn-sm btn-outline-danger me-1" onClick={() => deleteTodo(todo)}>✕</button>
            <button id="wd-remove-todo" className="btn btn-sm btn-danger" onClick={() => removeTodo(todo)}>🗑</button>
          </li>
        ))}
      </ul>
      <hr/>
    </div>
  );
}
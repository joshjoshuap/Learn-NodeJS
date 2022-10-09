import express from "express";

import { Todo } from "../models/todo";

// checking data type of request, type casting
type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

const router = express.Router();

// Display Todo
router.get("/", (req, res) => {
  res.status(200).json({ todos: todos });
});

// Add Todo
router.post("/todo", (req, res) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  res.status(200).json({ message: "Added Todo", todo: newTodo, todos: todos });
});

// Edit Todo
router.put("/todo/:todoId", (req, res) => {
  const params = req.params as RequestParams;
  const todoId = params.todoId; // get the id of todo
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id == todoId);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: "Edited Sucessfully" });
  }
  res.status(404).json({ message: "No Todo Item found", todos: todos });
});

// Delete Todo
router.delete("/todo/:todoId", (req, res) => {
    const params = req.params as RequestParams;
    const todoId = params.todoId; // get the id of todo
  todos = todos.filter((todoItem) => todoItem.id !== todoId);
  res.status(200).json({
    message: "Deleted Sucessfully",
  });
});

export default router;

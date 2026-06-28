import asyncHandler from "../../utils/asynchandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

import {
  createTodo,
  getTodosByUserId,
  getTodoById,
  UpdateTodo,
  toggleTodoStatus,
  deleteTodo,
  findDuplicateTodo,
} from "../../models/todos/todo.model.js"

import {
  createTodoSchema,
  updateTodoSchema,
} from "../../validators/todo.validator.js";


const createTodoController = asyncHandler(async (req, res) => {
  const { error } = createTodoSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const { title, description, priority, dueDate } = req.body;

  // 👇 Title + Description dono check honge
  const existingTodo = await findDuplicateTodo(req.user.id, title, description);

  if (existingTodo) {
    throw new ApiError(409, "A todo with the same title and description already exists");
  }

  const todo = await createTodo(
    req.user.id,
    title,
    description,
    priority,
    dueDate
  );

  return res.status(201).json(
    new ApiResponse(201, todo, "Todo created successfully")
  );
});




// =====================================
// GET ALL TODOS (USER SPECIFIC)
// =====================================
 const getTodosController = asyncHandler(async (req, res) => {
  const todos = await getTodosByUserId(req.user.id);

  return res.status(200).json(
    new ApiResponse(200, todos, "Todos fetched successfully")
  );
});


// =====================================
// GET SINGLE TODO
// =====================================
 const getTodoController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await getTodoById(id, req.user.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  return res.status(200).json(
    new ApiResponse(200, todo, "Todo fetched successfully")
  );
});


// =====================================
// UPDATE TODO
// =====================================
 const updateTodoController = asyncHandler(async (req, res) => {
  const { error } = updateTodoSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const { id } = req.params;

  // Pehle existing todo nikalo
  const existingTodo = await getTodoById(id, req.user.id);

  if (!existingTodo) {
    throw new ApiError(404, "Todo not found");
  }

  // Jo field request mein aayi wo use karo, jo nahi aayi uski purani value rakho
  const title = req.body.title ?? existingTodo.title;
  const description = req.body.description ?? existingTodo.description;
  const priority = req.body.priority ?? existingTodo.priority;
  const dueDate = req.body.dueDate ?? existingTodo.due_date;
  const IsCompleted = req.body.IsCompleted ?? existingTodo.is_completed;

  const updatedTodo = await UpdateTodo(
    id,
    req.user.id,
    title,
    description,
    priority,
    dueDate,
    IsCompleted,
  );

  if (!updatedTodo) {
    throw new ApiError(404, "Todo not found or not updated");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedTodo, "Todo updated successfully")
  );
});


// =====================================
// TOGGLE TODO STATUS
// =====================================
 const toggleTodoController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await toggleTodoStatus(id, req.user.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  return res.status(200).json(
    new ApiResponse(200, todo, "Todo status updated")
  );
});


// =====================================
// DELETE TODO
// =====================================
 const deleteTodoController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await deleteTodo(id, req.user.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  return res.status(200).json(
    new ApiResponse(200, todo, "Todo deleted successfully")
  );
});
export {
    createTodoController,
    updateTodoController,
    getTodoController,
    toggleTodoController,
    deleteTodoController,
    getTodosController

}
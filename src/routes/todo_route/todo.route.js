import { Router } from "express";
import verifyJWT from "../../middleware/Auth_middleware/auth.middlware.js";
import {
  createTodoController,
  deleteTodoController,
  getTodoController,
  getTodosController,
  toggleTodoController,
  updateTodoController,
} from "../../controllers/todo/todo.controller.js";

const router = Router();
router.use(verifyJWT);

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 */

/**
 * @swagger
 * /api/v1/todos/CreateTodo:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy groceries
 *               description:
 *                 type: string
 *                 example: Milk, eggs, bread
 *               priority:
 *                 type: string
 *                 example: high
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-01
 *     responses:
 *       201:
 *         description: Todo created successfully
 */
router.post("/CreateTodo", createTodoController);

/**
 * @swagger
 * /api/v1/todos:
 *   get:
 *     summary: Get all todos of logged-in user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todos fetched successfully
 */
router.get("/", getTodosController);

/**
 * @swagger
 * /api/v1/todos/{id}:
 *   get:
 *     summary: Get a single todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo fetched successfully
 *       404:
 *         description: Todo not found
 */
router.get("/:id", getTodoController);

/**
 * @swagger
 * /api/v1/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               IsCompleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 */
router.put("/:id", updateTodoController);

/**
 * @swagger
 * /api/v1/todos/{id}/toggle:
 *   patch:
 *     summary: Toggle todo completed status
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo status updated
 *       404:
 *         description: Todo not found
 */
router.patch("/:id/toggle", toggleTodoController);

/**
 * @swagger
 * /api/v1/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
router.delete("/:id", deleteTodoController);

export default router;
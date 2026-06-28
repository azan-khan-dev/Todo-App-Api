import { Router } from "express"
import verifyJWT from "../../middleware/Auth_middleware/auth.middlware.js";
import { createTodoController, deleteTodoController, getTodoController, getTodosController, toggleTodoController, updateTodoController } from "../../controllers/todo/todo.controller.js";

const router=Router();
router.use(verifyJWT);

router.post("/CreateTodo",createTodoController);
router.get("/",getTodosController);
router.get("/:id",getTodoController);
router.put("/:id",updateTodoController);
router.patch("/:id/toggle",toggleTodoController);
router.delete("/:id",deleteTodoController);

export default router;


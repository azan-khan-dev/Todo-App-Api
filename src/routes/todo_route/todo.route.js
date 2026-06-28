import { Router } from "express"
import verifyJWT from "../../middleware/Auth_middleware/auth.middlware";
import { createTodoController, getTodoController, getTodosController } from "../../controllers/todo/todo.controller";

const router=Router();
router.use(verifyJWT);

router.post("/CreateTodo",createTodoController);
router.get("/",getTodosController);
router.get("/:id",getTodoController);
router.

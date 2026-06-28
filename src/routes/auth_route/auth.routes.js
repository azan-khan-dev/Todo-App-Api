import express from "express";
import { login, logout, register } from "../../controllers/auth/auth.controller.js";
import verifyJWT from "../../middleware/Auth_middleware/auth.middlware.js";

const router = express.Router();

router.post("/register", register);
router.post("/Login",login)
router.post("/logout",verifyJWT,logout)

export default router;
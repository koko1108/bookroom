import express from "express"
import { login, register } from "../RoutesController/auth.js";

const router = express.Router()

//註冊
router.post("/register",register);
//登入
router.post("/login",login)


export default router
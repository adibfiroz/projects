import express from "express";
import { googleLogin, login, register } from "../controller/auth.js";

const router = express.Router();

//CREATE A USER
router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);

export default router;

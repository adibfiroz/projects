import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllcat,
  getCategory,
} from "../controller/categories.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createCategory);

router.get("/", getAllcat);

router.get("/find/:id", getCategory);

router.delete("/:id", deleteCategory);

export default router;

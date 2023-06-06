import express from "express";
import {
  addReview,
  deleteReview,
  getAllReview,
  getReview,
} from "../controller/review.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", addReview);

router.get("/:softId", getReview);

router.delete("/:id", deleteReview);

router.get("/", getAllReview);

export default router;

import express from "express";
import {
  createSoftware,
  deleteSoftware,
  getAllSoftwareOfCat,
  getAllSoftwares,
  getCatofSoft,
  getSoftwares,
} from "../controller/software.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createSoftware);

// router.get("/", getAllSoftwares);

router.delete("/:id", deleteSoftware);

router.get("/find/:id", getSoftwares);

router.get("/cat/:id", getCatofSoft);

router.get("/", getAllSoftwareOfCat);

router.get("/getPopular", getAllSoftwares);

export default router;

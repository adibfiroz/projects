import express from "express";
import {
  deleteUser,
  getAllreview,
  getAllSoftwares,
  getAllUsers,
  getUser,
  likeReview,
  removeSoftware,
  saveSoftware,
  unlikeReview,
  updateUser,
} from "../controller/users.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthenticated", verifyToken, (req, res, next) => {
//   res.send("hello, you are logged in");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello, you are logged in and you can delete your account");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin, you are logged in and you can delete all account");
// });

router.put("/:id", updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.put("/save/:id", saveSoftware);

router.put("/remove/:id", removeSoftware);

router.put("/like/:id", likeReview);

router.put("/unlike/:id", unlikeReview);

router.get("/find/:id", getUser);

router.get("/", getAllUsers);

router.get("/reviews/:id", getAllreview);

router.get("/software/:id", getAllSoftwares);

export default router;

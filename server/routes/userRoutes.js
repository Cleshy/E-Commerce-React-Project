import expres from "express";
import {
  addUser,
  deleteUser,
  loginUser,
  getUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = expres.Router();

router.post("/signup", addUser);
router.post("/signin", loginUser);
router.get("/users", getAllUsers);
router.get("/profile", getUser);
router.delete("/user/delete/:id", deleteUser);

export default router;

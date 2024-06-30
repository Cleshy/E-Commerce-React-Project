import expres from "express";
import {
  addUser,
  loginUser,
  getUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = expres.Router();

router.post("/signup", addUser);
router.post("/signin", loginUser);
router.get("/users", getAllUsers);
router.get("/profile", getUser);

export default router;

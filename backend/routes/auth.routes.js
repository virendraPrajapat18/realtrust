import express from "express";
import {
  login,
  register,
  checkAuth,
  logout,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/check", checkAuth);

router.get("/users", requireAuth, getAllUsers);
router.delete("/users/:id", requireAuth, deleteUser);
router.put("/users/:id", requireAuth, updateUser);

export default router;

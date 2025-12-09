import express from "express";
import multer from "multer";

import {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);

router.post("/", requireAuth, upload.single("image"), addProject);
router.put("/:id", requireAuth, upload.single("image"), updateProject);
router.delete("/:id", requireAuth, deleteProject);

export default router;

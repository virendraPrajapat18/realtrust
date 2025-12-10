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

router.post("/",  upload.single("image"), addProject);
router.put("/:id",  upload.single("image"), updateProject);
router.delete("/:id",  deleteProject);

export default router;

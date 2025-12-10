import express from "express";
import {
  getAllClients,
  addClient,
  updateClient,
  deleteClient,
} from "../controllers/client.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllClients);
router.post("/", addClient); //requireAuth
router.put("/:id",  updateClient);
router.delete("/:id",  deleteClient);

export default router;

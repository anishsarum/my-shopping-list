import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} from "../controllers/itemsController";

const router = Router();

router.post("/", authenticateToken, createItem);
router.get("/", authenticateToken, getItems);
router.put("/:id", authenticateToken, updateItem);
router.delete("/:id", authenticateToken, deleteItem);

export default router;

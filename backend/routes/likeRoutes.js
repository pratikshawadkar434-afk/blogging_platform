import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { toggleLike } from "../controllers/likeController.js";

const router = express.Router();

router.post("/:id", protect, toggleLike);

export default router;

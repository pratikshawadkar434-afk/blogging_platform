import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addComment);
router.get("/:postId", getComments);

export default router;

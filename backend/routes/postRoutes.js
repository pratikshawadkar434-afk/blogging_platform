import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  upload,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", upload.single("image"), createPost);
router.get("/", getPosts);             
router.get("/:id", getPostById);
router.put("/:id", upload.single("image"), updatePost);
router.delete("/:id", deletePost);

export default router;

import express from "express";
import { createPost } from "../controller/postController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/create", protect, createPost);
router.delete("/:id", protect, deletePost);

export default router;
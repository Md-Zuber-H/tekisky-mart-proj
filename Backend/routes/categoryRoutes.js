import express from "express";
import { getCategories, createCategory,updateCategory,deleteCategory } from "../controllers/categoryController.js";
import { protect } from "../middleware/authMiddleware.js";
import {isAdmin} from "../middleware/adminMiddleware.js";
import multer from "multer"

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getCategories);
router.post("/", protect, isAdmin,upload.single("image"), createCategory);
router.put("/:id", protect, isAdmin,upload.single("image"), updateCategory);
router.delete("/:id", protect, isAdmin, deleteCategory);

export default router;

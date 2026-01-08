import express from "express";
import multer from "multer";
import {
  createBanner,
  getBanners,
  deleteBanner
} from "../controllers/bannerController.js";
import { protect } from "../middleware/authMiddleware.js";
import {isAdmin} from "../middleware/adminMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getBanners);
router.post("/", protect, isAdmin, upload.single("image"), createBanner);
router.delete("/:id", protect, isAdmin, deleteBanner);

export default router;

import express from "express";
import multer from "multer";
import {
  createBanner,
  getActiveBanners,
  getAllBanners,
  updateBanner,
  deleteBanner
} from "../controllers/bannerController.js";
import { protect } from "../middleware/authMiddleware.js";
import {isAdmin} from "../middleware/adminMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// USER
router.get("/", getActiveBanners);

// ADMIN
router.get("/admin", protect, isAdmin, getAllBanners);
router.post("/", protect, isAdmin, upload.single("image"), createBanner);
router.put("/:id", protect, isAdmin, upload.single("image"), updateBanner);
router.delete("/:id", protect, isAdmin, deleteBanner);

export default router;

import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  rateProduct,
  getSearchSuggestions,
  getAllRatings 
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import {isAdmin }from "../middleware/adminMiddleware.js";





const router = express.Router();

// multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ==============================
// PUBLIC
// ==============================
router.get("/", getProducts);
router.get("/suggestions", getSearchSuggestions);

// ==============================
// ADMIN
// ==============================
router.post(
  "/",
  protect,
  isAdmin,
  upload.array("images", 3),
  createProduct
);

router.put(
  "/:id",
  protect,
  isAdmin,
  upload.array("images", 3),
  updateProduct
);

router.get("/admin/ratings", protect, isAdmin, getAllRatings);

router.delete("/:id", protect, isAdmin, deleteProduct);

// ==============================
// USER (RATING)
// ==============================
router.post("/:id/rate", protect, rateProduct);

export default router;

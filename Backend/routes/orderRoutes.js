import express from "express";
import { placeOrder, getMyOrders, updateOrderStatus,getOrderById,cancelOrder,canUserRate } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";



const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.put("/:id", protect, isAdmin, updateOrderStatus);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/cancel", protect, cancelOrder);
router.get("/can-rate/:productId", protect, canUserRate);




export default router;

import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/user-orders", protect, getUserOrders);
// router.get("/all-orders", protect, admin, getAllOrders);
// router.put("/update-status/:orderId", protect, admin, updateOrderStatus);

export default router;

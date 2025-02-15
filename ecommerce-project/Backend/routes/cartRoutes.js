import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateCartItem);
router.put("/increase", protect, increaseQuantity);
router.put("/decrease", protect, decreaseQuantity);
router.delete("/remove/:productId", protect, removeCartItem);
router.delete("/clear", protect, clearCart);

export default router;

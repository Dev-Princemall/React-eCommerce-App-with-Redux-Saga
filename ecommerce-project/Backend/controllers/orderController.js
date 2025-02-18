import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

/**
 * Create a new order from cart
 */
export const createOrder = async (req, res) => {
  try {
    console.log("Inside createOrder");
    const userId = req.user; // Extract user ID from request

    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    console.log("cart found");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    // Extract delivery info & payment method from request body
    const { deliveryAddress, paymentMethod, totalAmount } = req.body;

    if (!deliveryAddress || !paymentMethod) {
      return res
        .status(400)
        .json({ message: "Delivery address and payment method are required" });
    }
    console.log("deliveryAddress & paymentMethod found");
    // Calculate total amount
    // let totalAmount = cart.items.reduce(
    //   (acc, item) => acc + item.quantity * item.productId.price,
    //   0
    // );

    // Create a new order
    const newOrder = new Order({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalAmount,
      paymentMethod,
      deliveryAddress,
    });

    await newOrder.save();

    // Clear user's cart after order is placed
    await Cart.findOneAndDelete({ userId });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get order history for a user
 */
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user; // Extract user ID from request
    const orders = await Order.find({ userId }).populate({path:"items.productId",select:"title image price"}).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get all orders (Admin Only)
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "fullName email")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update order status (Admin Only)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

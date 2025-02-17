import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get user's cart
export const getCart = async (req, res) => {
  const userId = req.user;
  try {
    const cart = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    }).populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add item to cart
// export const addToCart = async (req, res) => {
//   const { productId, userId, quantity } = req.body;
//   try {
//     const objectId = new mongoose.Types.ObjectId(productId);
//     const product = await Product.findById(objectId);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     alert("check1");
//     let cart = await Cart.findOne(new mongoose.Types.ObjectId(userId));
//     alert("check2");
//     if (!cart) {
//       cart = new Cart({ userId: req.user.id, items: [] });
//     }

//     const itemIndex = cart.items.findIndex((item) =>
//       item.productId.equals(productId)
//     );
//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }

//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const addToCart = async (req, res) => {
  const { productId, userId, quantity } = req.body;

  // Validate input
  if (!productId || !userId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    console.log("check1: Received request to add to cart");

    const productObjectId = new mongoose.Types.ObjectId(productId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Check if the product exists
    const product = await Product.findById(productObjectId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("check2: Product found");

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId: userObjectId });

    if (!cart) {
      console.log("check3: Cart not found, creating new cart");
      cart = new Cart({ userId: userObjectId, items: [] });
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productObjectId)
    );

    if (itemIndex > -1) {
      // Update the quantity if the product is already in the cart
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add the product to the cart if it's not already there
      cart.items.push({ productId: productObjectId, quantity });
    }

    // Save the updated cart
    await cart.save();
    console.log("check4: Cart updated successfully");

    // Return the updated cart
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  const { productId, userId, quantity } = req.body;
  try {
    console.log("For update cart item: Received");
    const cart = await Cart.findOne(new mongoose.Types.ObjectId(userId));
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.productId.equals(productId));
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Increase item quantity
export const increaseQuantity = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    console.log("For increase quantity: Received");
    const cart = await Cart.findOne({ userId });
    console.log("type converted");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    console.log("For increase quantity: Cart found");
    const item = cart.items.find((item) => item.productId.equals(productId));
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });
    console.log("For increase quantity: Item found");
    item.quantity += 1;
    await cart.save();
    console.log("For increase quantity: Cart updated successfully");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Decrease item quantity
export const decreaseQuantity = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.productId.equals(productId));
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter((i) => !i.productId.equals(productId));
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  const { productId, userId } = req.params;
  try {
    const cart = await Cart.findOne(new mongoose.Types.ObjectId(userId));
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => !item.productId.equals(productId));
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cart = await Cart.findOne(new mongoose.Types.ObjectId(userId));
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

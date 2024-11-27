const CartItemModel = require("../models/cartItem");
const UserService = require("../services/userservices");

async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    const item = await findCartItemById(cartItemId);

    const user = await UserService.findUserById(item.userId);
    if (!user) {
      throw new Error("user not found : ", userId);
    }

    if (user._id.toString() === userId.toString()) {
      if (!cartItemData.quantity || isNaN(cartItemData.quantity)) {
        throw new Error("Quantity is required and must be a valid number");
      }

      // Update the quantity
      item.quantity = cartItemData.quantity;

      // Calculate the price and discounted price based on the quantity
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;

      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("you can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  const user = await UserService.findUserById(cartItem.userId);

  if (user._id.toString() === userId.toString()) {
    return await CartItemModel.findByIdAndDelete(cartItemId);
  }
  throw new Error("you can't remove another user's item");
}

async function findCartItemById(cartItemId) {
  const cartItem = await CartItemModel.findById(cartItemId).populate("product");
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cartItem not found with id ", cartItemId);
  }
}

module.exports = {
  updateCartItem,
  removeCartItem,
  findCartItemById,
};

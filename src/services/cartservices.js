const CartModel = require("../models/cart");
const CartItemModel = require("../models/cartItem");
const ProductModel = require("../models/product");

async function createCart(user) {

  try {
    const cart = new CartModel({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
  
}

async function findUserCart(userId){
  try {
    let cart = await CartModel.findOne({user:userId})

    let cartItems = await CartItemModel.find({cart:cart._id}).populate("product");
    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for(let cartItem of cart.cartItems){
      totalPrice+=cartItem.price;
      totalDiscountedPrice+=cartItem.discountedPrice;
      totalItem+=cartItem.quantity;

    }

    cart.totalPrice = totalPrice;
    cart.totalItem=totalItem;
    cart.discount = totalPrice-totalDiscountedPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addCartItem(userId, req) {
  try {
    // Find the user's cart
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Find the product by its ID
    const product = await ProductModel.findById(req.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if the item is already present in the cart
    const isPresent = await CartItemModel.findOne({ cart: cart._id, product: product._id, userId, size:req.size });
    
    if (!isPresent) {
      // Create a new cart item
      const cartItem = new CartItemModel({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });

      // Save the cart item and add it to the cart
      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem._id);
      await cart.save();
      return "Item added to cart";
    } else {
      return "Item already in cart";
    }

  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = {createCart,findUserCart,addCartItem};
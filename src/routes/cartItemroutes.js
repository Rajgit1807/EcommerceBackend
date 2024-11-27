const express = require('express');
const router = express.Router();

const CartItemController = require("../controller/cartItemcontroller.js")

const authenticate = require("../middleware/authenticate.js");

router.put("/:id", authenticate, CartItemController.updateCartItem)
router.delete("/:id", authenticate, CartItemController.removeCartItem)

module.exports = router;
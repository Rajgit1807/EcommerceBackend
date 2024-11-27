const express = require('express');
const router = express.Router();

const CartController = require("../controller/cartcontroller");
const authenticate = require("../middleware/authenticate.js")

router.get("/",authenticate,CartController.findUserCart)
router.put("/add",authenticate,CartController.addItemToCart)

module.exports = router;
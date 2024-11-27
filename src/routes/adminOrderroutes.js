const express = require('express');
const router = express.Router();

const orderController = require("../controller/adminordercontroller.js")

const authenticate = require("../middleware/authenticate.js");

router.get("/",authenticate, orderController.getAllOrders);
router.put('/:orderId/confirmed', authenticate, orderController.confirmedOrders);
router.put('/:orderId/ship', authenticate,orderController.shippOrders);
router.put('/:orderId/deliver', authenticate,orderController.deliveredOrders)
router.put('/:orderId/cancel', authenticate,orderController.cancelledOrders)
router.put('/:orderId/outfordeliveryorder', authenticate,orderController.outForDeliveryOrders)
router.delete('/:orderId/delete', authenticate,orderController.deleteOrders)


module.exports = router;
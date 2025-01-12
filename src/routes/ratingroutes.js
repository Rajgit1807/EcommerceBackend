const express = require('express');
const router = express.Router();

const ratingController = require("../controller/ratingcontroller.js");
const authenticate = require ("../middleware/authenticate.js")

router.post("/create",authenticate,ratingController.createRating)
router.get("/product/:productId",authenticate,ratingController.getProductRating)

module.exports = router;
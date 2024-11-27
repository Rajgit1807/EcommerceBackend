const express = require('express');
const router = express.Router();

const addressController = require("../controller/addressController");

const authenticate = require('../middleware/authenticate');

router.get("/:id",authenticate,addressController.getAddressById);
router.get("/all",authenticate,addressController.findAllAddresses);
router.post("/create",addressController.createAddress);

module.exports = router;
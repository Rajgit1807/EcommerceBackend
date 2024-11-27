const RatingModel = require("../models/ratings");
const ProductService = require("../services/productservice");

async function createRating(req, user) {
  const product = await ProductService.findProductById(req.productId);
  const rating = new RatingModel({
    user: user._id,
    product: product._id,
    rating: req.rating,
    createdAt: new Date(),
  });
  return await rating.save();
}

async function getProductRating(productId) {
  return await RatingModel.find({ product: productId });
}

module.exports = {
  createRating,
  getProductRating,
};

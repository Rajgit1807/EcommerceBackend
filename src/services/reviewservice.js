const ReviewModel = require("../models/review");
const ProductService = require("../services/productservice");

async function createReview(reqData, user) {
  const product = await ProductService.findProductById(reqData.productId);
  const review = new ReviewModel({
    user: user._id,
    product: product._id,
    review: reqData.review,
    createdAt: new Date(),
  });

  await product.save();
  return await review.save();
}

async function getAllReview(productId) {
  const product = await ProductService.findProductById(reqData.productId);
  return await Review.find({ product: productId }).populate("user");
}

module.exports = {
  createReview,
  getAllReview,
};

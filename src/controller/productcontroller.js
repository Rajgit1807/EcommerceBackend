const ProductService = require("../services/productservice");

const createProduct = async (req, res) => {
  try {
    const product = await ProductService.createProduct(req.body);
    
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductService.deleteProduct(productId);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductService.updateProduct(productId, req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductById = async (req, res) => {
  
  const productId = req.params.id;
  try {
    const product = await ProductService.findProductById(productId);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts(req.query);
    return res.status(201).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createMultipleProduct = async (req, res) => {
  try {
    const products = await ProductService.createMultipleProduct(req.body);
    return res.status(201).send({ message: "Products Created Successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProduct,
};
 
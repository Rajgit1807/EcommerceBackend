const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");

async function createProduct(reqData) {
  let topLevel = await CategoryModel.findOne({
    name: reqData.topLevelCategory,
  });
  if (!topLevel) {
    topLevel = new CategoryModel({
      name: reqData.topLevelCategory,
      level: 1,
    });
    await topLevel.save()
  }
  let secondLevel = await  CategoryModel.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });
  if (!secondLevel) {
    secondLevel = new CategoryModel({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });
    await secondLevel.save()

  }
  let thirdLevel = await  CategoryModel.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });
  if (!thirdLevel) {
    thirdLevel = new CategoryModel({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
    await thirdLevel.save()

  }

  const product = new ProductModel({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPersent: reqData.discountPersent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    sizes: reqData.size,
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });

  return await product.save();
}

async function deleteProduct(productId) {
  const product = await findProductById(productId);

  await ProductModel.findByIdAndDelete(productId);
  return "Product deleted Successfully";
}

async function updateProduct(productId, reqData) {
  return await ProductModel.findByIdAndUpdate(productId, reqData);
}

async function findProductById(id) {
  const product = await ProductModel.findById(id).populate("category").exec();
  if (!product) {
    throw new Error("Product not found with id " + id);
  }

  return product;
}

// async function getAllProducts(reqQuery) {

//   let {
//     category,
//     color,
//     sizes,
//     minPrice,
//     maxPrice,
//     minDiscount,
//     sort,
//     stock,
//     pageNumber,
//     pageSize,
//   } = reqQuery;

// console.log(reqQuery);

//   pageSize = pageSize || 10;

//   let query = ProductModel.find().populate("category");
  
//   let category_id ; 

//   if (category) {
//     const existCategory = await CategoryModel.findOne({ name: category });
   
//     if (existCategory) {
//       category_id=existCategory._id
//       console.log(category_id, "asdfasdf")
//       query = query.where("category").equals(existCategory._id);
//     } else {
//       return { content: [], currentPage: 1, totalPages: 0 };
//     }
//   }
//   if (color) {
//     const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));

//     const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
//     query = query.where("color").regex(colorRegex);
//   }

//   if (sizes) {
//     const sizesSet = new Set(sizes);
//     query = query.where("sizes.name").in([...sizesSet]);
//   }

//   if (minPrice && maxPrice) {
//     query = query.where("dicountedPrice").gte(minPrice).lte(maxPrice);
//   }

//   if (minDiscount) {
//     query = query.where("discountPersent").gt(minDiscount);
//   }

//   if (stock) {
//     if (stock === "in_stock") {
//       query =  query.where("quantity").gt(0);
//     }
//      else if (stock === "out_of_stock") {
//       query = query.where("quantity").gt(1);
//     }
//   }
//   if(sort){
//     const sortDirection = sort === "price_high"?-1:1;
//     query = query.sort({discountedPrice:sortDirection});
//   }

//   const totalProducts = await ProductModel.countDocuments(query);
  
//   // const skip = (pageNumber-1)*pageSize;

//   // query = query.skip(skip).limit(pageSize);

//   // const products = await query.exec();
//   let queryObject = {};
//   if (category_id) {
//     queryObject.category = category_id;
//   }

//   const products = await ProductModel.find(queryObject).populate("category");
//    console.log(products)

//   const totalPages = Math.ceil(totalProducts/pageSize);

//   return {content:products,currentPage:pageNumber,totalPages}
// }

async function createMultipleProduct(products){
    for(let product of products){
        await createProduct(product);
    }
}

async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber, // Default to page 1 if not provided
    pageSize, // Default to 10 items per page if not provided
  } = reqQuery;

   pageSize = pageSize || 10;


  let queryObject = {};

  // Category Filter
  if (category) {
    const existCategory = await CategoryModel.findOne({ name: category });

    if (existCategory) {
      queryObject.category = existCategory._id; // Add category to queryObject
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  // Color Filter
  if (color) {
    const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
    const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

    if (colorRegex) {
      queryObject.color = { $regex: colorRegex };
    }
  }

  // Sizes Filter
  if (sizes) {
    const sizesSet = new Set(sizes.split(",").map(size => size.trim()));
    queryObject["sizes.name"] = { $in: [...sizesSet] };
  }

  // Price Filter
  if (minPrice || maxPrice) {
    queryObject.discountedPrice = {};
    if (minPrice) queryObject.discountedPrice.$gte = minPrice;
    if (maxPrice) queryObject.discountedPrice.$lte = maxPrice;
  }

  // Discount Filter
  if (minDiscount) {
    queryObject.discountPersent = { $gt: minDiscount };
  }

  // Stock Filter
  if (stock) {
    if (stock === "in_stock") {
      queryObject.quantity = { $gt: 0 };
    } else if (stock === "out_of_stock") {
      queryObject.quantity = { $lt: 1 }; // Assuming out of stock means less than 1 quantity
    }
  }

  // Sorting
  let sortOptions = {};
  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    sortOptions.discountedPrice = sortDirection;
  }

  // Pagination
  const skip = (pageNumber - 1) * pageSize;

  // Count total products matching the query
  const totalProducts = await ProductModel.countDocuments(queryObject);

  // Fetch products with applied filters, sorting, and pagination
  const products = await ProductModel.find(queryObject)
    .populate("category")
 
  const totalPages = Math.ceil(totalProducts / pageSize);

  return {
    content: products,
    currentPage: pageNumber,
    totalPages: totalPages,
  };
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct
}
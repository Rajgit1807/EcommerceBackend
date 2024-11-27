const express = require ('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/',(req,res)=>{
   return  res.status(200).send({message: "welcome to ecommerce api - node", status:true})
})

const authRouters = require("./routes/authroute.js")
app.use("/auth",authRouters)

const userRouters = require("./routes/userroute")
app.use("/api/users",userRouters)

const productRouters = require("./routes/productroutes.js")
app.use("/api/products",productRouters)

const adminProductRouters = require("./routes/adminProductroutes.js")
app.use("/api/admin/products",adminProductRouters)

const cartRouters = require("./routes/cartroutes.js")
app.use("/api/cart",cartRouters)

const cartItemRouters = require("./routes/cartItemroutes.js")
app.use("/api/cart_items",cartItemRouters)

const orderRouters = require("./routes/orderroutes.js")
app.use("/api/orders",orderRouters)

const adminOrderRouters = require("./routes/adminOrderroutes.js")
app.use("/api/admin/orders",adminOrderRouters)

const reviewRouters = require("./routes/reviewroutes.js")
app.use("/api/reviews",reviewRouters)

const ratingRouters = require("./routes/ratingroutes.js")
app.use("/api/ratings",ratingRouters)

const addressRouters = require("./routes/addressessRoutes.js")
app.use("/api/address",addressRouters)

module.exports = app;
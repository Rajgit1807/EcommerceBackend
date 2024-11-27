const mongoose  = require("mongoose")

const url = 'mongodb://localhost:27017/newecommerce';

const connectDb=()=>{
    return mongoose.connect(url);
}

module.exports = {connectDb};
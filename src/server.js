const app = require(".");
const { connectDb } = require("./config/db");

PORT = 5454;

app.listen(PORT, async()=>{
    await connectDb();
    console.log("Api listing to PORT",PORT);
})
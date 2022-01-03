const app= require("./index")
const connect= require("./configs/db")
require("dotenv").config();
app.listen(process.env.PORT || 2345,async function() {
    await connect();
    console.log("port 2345");
})
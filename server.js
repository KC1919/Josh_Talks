const express = require("express");  //importing express package
const app = express();       //initializing the express method
require("dotenv").config();

//Configuring express to parse json or urlencoded data from client side
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());

app.set('view engine', 'ejs');


const connectDB=require("./db");

//Running the server
app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("Sever started");
    connectDB();
})
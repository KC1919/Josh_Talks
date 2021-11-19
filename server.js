const express = require("express"); //importing express package
const app = express(); //initializing the express method
require("dotenv").config();


//Configuring express to parse json or urlencoded data from client side
app.use(express.urlencoded({
    extended: false
}))



app.use(express.json());
// app.set('view engine', 'ejs');


//making a router to get all documents and to get documents by searched term
const router = require("./routes/getData");
app.use("/", router);


const connectDB = require("./db");
const fetch = require("./routes/fetchData");



//Running the server
app.listen(process.env.PORT || 3000, async (req, res) => {
    console.log("Sever started");
    await connectDB();
    setInterval(fetch, 10000); //fetching the documents every 10 seconds from the Youtube api
});
const mongoose = require("mongoose"); //importing mongoose library, to configure database

//function to connect to database
const connectDB = async (req, res) => {
    try {
        const result = await mongoose.connect(process.env.DB_URL); //connection request

        if (result) //if connected successfully
            console.log("Connected to Database");
        else
            console.log("Failed to connect Database!");
            
    } catch (error) { //if some error occurred
        console.log("Error connecting to database", error);
    }
}

module.exports = connectDB;
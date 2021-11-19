const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//video data schema
const dataSchema = new Schema({
    "title": String,
    "description": String,
    "thumbnail": String,
    "publishedAt": Date,
    "videoUrl": {type:String}
})

const Data = mongoose.model("data", dataSchema);

module.exports = Data;